import type { IncomingMessage, ServerResponse } from "node:http"
import { z } from "zod"
import {
  leadFormConfigs,
  type LeadFormType,
} from "../src/components/leadFormConfigs.js"

const sources = {
  contact: ["contact", "Contacto geral", "Website"],
  robotics: ["robotics", "Pedido de demonstração", "Robótica"],
  payments: ["payments", "Pedido de demonstração", "Pagamentos automáticos"],
  cashlogy: ["payments", "Pedido de demonstração", "Cashlogy"],
  compact: ["payments", "Pedido de demonstração", "Compact"],
  xd: ["managementSoftware", "Pedido de demonstração", "XD"],
  winrest: ["managementSoftware", "Pedido de demonstração", "WinRest"],
  zonesoft: ["managementSoftware", "Pedido de demonstração", "ZoneSoft"],
  services: ["serviceQuote", "Pedido de orçamento", "Serviços"],
  "sistema-ponto": ["timeTracking", "Pedido de demonstração", "Sistema Ponto"],
  "ciberseguranca-infraestrutura": [
    "cybersecurityInfrastructure",
    "Pedido de avaliação",
    "Cibersegurança e Infraestrutura",
  ],
} as const
const labels: Record<string, string> = {
  nome: "Nome",
  empresa: "Empresa",
  telefone: "Telefone",
  mensagem: "Mensagem",
  email: "E-mail",
  contact: "Contacto",
  company: "Empresa",
  businessType: "Tipo de negócio",
  nif: "NIF",
  dailyRevenue: "Faturação diária",
  software: "Software atual",
  paymentPoints: "Pontos de venda ou pagamento",
  needs: "Necessidades",
  services: "Serviços",
  description: "Descrição",
  equipmentCount: "Equipamentos",
  employeeCount: "Colaboradores",
  phone: "Telefone",
}
const text = z.string().trim().max(250)
const envelope = z.object({
  source: z.enum(Object.keys(sources) as [keyof typeof sources]),
  path: z
    .string()
    .max(250)
    .regex(/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*\/?)?$/),
  started: z.number().int().positive(),
  website: z.string().max(250),
  values: z.record(z.string(), z.unknown()),
  token: z.string().max(2048).optional(),
})
const contact = z.strictObject({
  nome: text.min(1),
  empresa: text,
  email: z.email().max(254),
  telefone: text,
  mensagem: z.string().trim().min(1).max(5000),
})
function parseValues(type: string, values: unknown) {
  if (type === "contact") return contact.safeParse(values)
  const shape: Record<string, z.ZodType> = { consent: z.literal(true) }
  for (const field of leadFormConfigs[(type as LeadFormType)].fields) {
    const base = field.type === "textarea" ? z.string().trim().max(5000) : text
    shape[field.name] =
      field.type === "multiselect"
        ? z.array(text.min(1)).min(1).max(30)
        : field.type === "email"
          ? z.email().max(254)
          : field.type === "tel"
            ? text.refine((v) => v.replace(/\D/g, "").length >= 9)
            : field.required
              ? base.min(1)
              : base.optional()
  }
  return z.strictObject(shape).safeParse(values)
}
const LIMIT = 32768
async function body(req: IncomingMessage & { body?: unknown }) {
  if (req.body !== undefined) {
    const raw =
      typeof req.body === "string" ? req.body : JSON.stringify(req.body)
    if (Buffer.byteLength(raw) > LIMIT) throw Error()
    return JSON.parse(raw)
  }
  let size = 0
  const parts: Buffer[] = []
  for await (const part of req) {
    size += Buffer.byteLength(part)
    if (size > LIMIT) throw Error()
    parts.push(Buffer.from(part))
  }
  return JSON.parse(Buffer.concat(parts).toString())
}
export default async function leads(
  req: IncomingMessage & { body?: unknown },
  res: ServerResponse,
) {
  const reply = (status: number) => {
    res.writeHead(status, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    })
    res.end(JSON.stringify({ ok: status === 200 }))
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return reply(405)
  }
  if (req.headers["content-type"]?.split(";")[0] !== "application/json")
    return reply(415)
  if (req.headers["sec-fetch-site"] === "cross-site") return reply(403)
  let raw: unknown
  try {
    raw = await body(req)
  } catch {
    return reply(400)
  }
  const parsed = envelope.safeParse(raw)
  if (!parsed.success) return reply(422)
  const { source, path, values, started, website, token } = parsed.data
  if (website) return reply(200)
  const now = Date.now()
  if (now - started < 2000 || now - started > 86400000) return reply(422)
  const [type, kind, solution] = sources[source]
  const validated = parseValues(type, values)
  if (!validated.success) return reply(422)
  const {
    RESEND_API_KEY: key,
    CONTACT_FROM_EMAIL: from,
    CONTACT_TO_EMAIL: to,
    TURNSTILE_SECRET_KEY: secret,
  } = process.env
  if (!key || !from || !to) return reply(503)
  try {
    if (secret) {
      if (!token) return reply(422)
      const check = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: new URLSearchParams({ secret, response: token }),
          signal: AbortSignal.timeout(5000),
        },
      )
      if (!check.ok || !(await check.json()).success) return reply(422)
    }
    const data: Record<string, unknown> = validated.data
    const email = z.email().safeParse(data.email)
    const send = async (message: Record<string, unknown>) => {
      const result = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, ...message }),
        signal: AbortSignal.timeout(10000),
      })
      if (!result.ok) throw Error("delivery")
    }
    const subject = `[${kind}] ${solution}`
    const fields = Object.entries(data)
      .filter(([k, v]) => k !== "consent" && v !== "")
      .map(([k, v]) => `${labels[k]}: ${Array.isArray(v) ? v.join(", ") : v}`)
    await send({
      to,
      subject,
      ...(email.success ? { reply_to: email.data } : {}),
      text: [
        subject,
        `Página de origem: ${path}`,
        `Recebido em: ${new Date(now).toISOString()}`,
        `Privacidade: ${
          data.consent
            ? "Consentimento prestado"
            : "Não solicitado neste formulário"
        }`,
        "",
        ...fields,
      ].join("\n"),
    })
    if (email.success) {
      try {
        await send({
          to: email.data,
          subject: "Recebemos o seu contacto | Infor Antunes",
          text: "Obrigado pelo seu contacto. Entraremos em contacto consigo brevemente.\n\nInfor Antunes",
        })
      } catch {
        console.warn("Falha na confirmação do pedido já aceite.")
      }
    }
    return reply(200)
  } catch {
    return reply(502)
  }
}
