import assert from "node:assert/strict"
import { createServer } from "vite"
const vite = await createServer({
  configFile: false,
  optimizeDeps: { noDiscovery: true, include: [] },
  cacheDir: 'node_modules/.vite-lead-tests',
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
})
try {
  const { default: handle } = await vite.ssrLoadModule("/api/leads.ts")
  const { leadFormConfigs } = await vite.ssrLoadModule(
    "/src/components/leadFormConfigs.ts",
  )
  Object.assign(process.env, {
    RESEND_API_KEY: "test-only",
    CONTACT_FROM_EMAIL: "site@example.invalid",
    CONTACT_TO_EMAIL: "team@example.invalid",
    TURNSTILE_SECRET_KEY: "",
  })
  const messages = []
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails")
    messages.push(JSON.parse(options.body))
    return new Response(null, { status: 200 })
  }
  async function submit(source, values, extra = {}) {
    let status
    await handle(
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: {
          source,
          values,
          path: "/contactos",
          started: Date.now() - 5000,
          website: "",
          ...extra,
        },
      },
      {
        writeHead: (s) => {
          status = s
        },
        end() {},
      },
    )
    return status
  }
  const contact = {
    nome: "Teste",
    empresa: "",
    telefone: "",
    email: "visitor@example.invalid",
    mensagem: "Mensagem de teste",
  }
  assert.equal(await submit("contact", contact), 200)
  assert.equal(messages.length, 2)
  assert.equal(messages[0].to, process.env.CONTACT_TO_EMAIL)
  assert.equal(messages[1].to, contact.email)
  for (const [source, type] of Object.entries({
    robotics: "robotics",
    payments: "payments",
    cashlogy: "payments",
    compact: "payments",
    xd: "managementSoftware",
    winrest: "managementSoftware",
    zonesoft: "managementSoftware",
    services: "serviceQuote",
    "sistema-ponto": "timeTracking",
    "ciberseguranca-infraestrutura": "cybersecurityInfrastructure",
  })) {
    const values = Object.fromEntries(
      leadFormConfigs[type].fields.map((f) => [
        f.name,
        f.type === "multiselect"
          ? ["Teste"]
          : f.name === "phone"
            ? "912345678"
            : f.name === "email"
              ? contact.email
              : "Amostra",
      ]),
    )
    assert.equal(await submit(source, { ...values, consent: true }), 200)
    assert.match(messages.at(-2).text, /Consentimento prestado/)
    assert.equal(await submit(source, { ...values, consent: false }), 422)
  }
  const before = messages.length
  assert.equal(await submit("contact", contact, { website: "bot" }), 200)
  assert.equal(await submit("contact", contact, { started: Date.now() }), 422)
  assert.equal(await submit("contact", { ...contact, email: "inválido" }), 422)
  assert.equal(messages.length, before)
  globalThis.fetch = async () => new Response(null, { status: 502 })
  assert.equal(await submit("contact", contact), 502)
  console.log(
    "Validados 11 pedidos, notificações, consentimento, anti-spam e falha do fornecedor, sem envio de e-mail.",
  )
} finally {
  await vite.close()
}
