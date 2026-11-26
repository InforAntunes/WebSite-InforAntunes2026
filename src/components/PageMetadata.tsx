import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { metadata } from "../seo"
export default function PageMetadata() {
  const { pathname } = useLocation()
  useEffect(() => {
    const { title, canonical, tags } = metadata(
      pathname,
      import.meta.env.VITE_INDEX_PUBLIC === "yes",
    )
    document.title = title
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) {
      if (!link) {
        link = document.createElement("link")
        link.rel = "canonical"
        document.head.append(link)
      }
      link.href = canonical
    } else {
      link?.remove()
      document.querySelector('meta[property="og:url"]')?.remove()
    }
    for (const [key, value] of Object.entries(tags)) {
      const attr = key.startsWith("og:") ? "property" : "name"
      let meta = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`,
      )
      if (!meta) {
        meta = document.createElement("meta")
        meta.setAttribute(attr, key)
        document.head.append(meta)
      }
      meta.content = value!
    }
  }, [pathname])
  return null
}
