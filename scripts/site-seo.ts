import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import type { Plugin } from "vite"
import { metadata, pages, site } from "../src/seo"
import common from "../src/locales/pt/common.json"

const escape = (v: string) =>
  v.replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(
  pages,
)
  .map((p) => `<url><loc>${site}${p}</loc></url>`)
  .join("")}</urlset>`
export function siteSeo(): Plugin {
  const production = process.env.VERCEL_ENV === "production"
  const robots = production
    ? `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /.figma/\nSitemap: ${site}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n"
  function head(path: string) {
    const { title, canonical, tags } = metadata(path, production)
    return (
      `<title>${escape(title)}</title>\n${
        canonical ? `<link rel="canonical" href="${canonical}">` : ""
      }\n` +
      Object.entries(tags)
        .map(
          ([key, value]) =>
            `<meta ${
              key.startsWith("og:") ? "property" : "name"
            }="${key}" content="${escape(value!)}">`,
        )
        .join("\n") +
      '\n<script type="application/ld+json">' +
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Infor Antunes",
        url: site,
        logo: site + "/partilha/infor-antunes.png",
        telephone: common.footer.phone,
        email: common.footer.email,
        address: common.footer.address,
      }) +
      "</script>"
    )
  }
  let out = "dist",
    build = false
  return {
    name: "public-page-seo",
    enforce: "post",
    configResolved(c) {
      build = c.command === "build"
      out = resolve(c.root, c.build.outDir)
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const p = req.url?.split("?")[0]
        if (p !== "/sitemap.xml" && p !== "/robots.txt") return next()
        res.setHeader(
          "Content-Type",
          p === "/robots.txt" ? "text/plain" : "application/xml",
        )
        res.end(p === "/robots.txt" ? robots : sitemap)
      })
    },
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        return html.replace(
          "<!-- page:seo -->",
          `<!-- seo:start -->${head(ctx.path === "/index.html" ? "/" : ctx.path)}<!-- seo:end -->`,
        )
      },
    },
    closeBundle() {
      if (!build) return
      const shell = readFileSync(resolve(out, "index.html"), "utf8")
      for (const path of [...Object.keys(pages), "/404"]) {
        const dest = resolve(
          out,
          path === "/" ? "index.html" : path.slice(1) + ".html",
        )
        mkdirSync(dirname(dest), { recursive: true })
        writeFileSync(
          dest,
          shell.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, () =>
            head(path),
          ),
        )
      }
      writeFileSync(resolve(out, "robots.txt"), robots)
      writeFileSync(resolve(out, "sitemap.xml"), sitemap)
    },
    apply: undefined,
  }
}
