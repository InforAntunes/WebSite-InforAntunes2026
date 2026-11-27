import { useState, useEffect, useRef } from "react"
import { deliver, SpamTrap } from '../components/LeadDelivery'
import TurnstileCaptcha from "../components/TurnstileCaptcha"
import {
  EMAIL_PATTERN,
  NAME_PATTERN,
  PHONE_PATTERN,
  isValidPhone,
} from "../components/leadValidation"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true)
      },
      { threshold },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

type FormState = "idle" | "loading" | "success" | "error"

export default function Contactos() {
  const { t } = useTranslation("contact")
  const { t: tc } = useTranslation("common")
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    mensagem: "",
  })
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  const [status, setStatus] = useState<FormState>("idle")
  const [captchaToken, setCaptchaToken] = useState("")
  const [captchaResetKey, setCaptchaResetKey] = useState(0)
  const started = useRef(Date.now())
  const [focused, setFocused] = useState<string | null>(null)

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (!form.nome.trim()) e.nome = t("form.errors.nameRequired")
    else if (!NAME_PATTERN.test(form.nome.trim()))
      e.nome = t("form.errors.nameInvalid")
    if (!form.email.trim() || !EMAIL_PATTERN.test(form.email.trim()))
      e.email = t("form.errors.emailInvalid")
    if (form.telefone.trim() && !isValidPhone(form.telefone.trim()))
      e.telefone = t("form.errors.phoneInvalid")
    if (!form.mensagem.trim()) e.mensagem = t("form.errors.messageRequired")
    return e
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    if (!captchaToken) {
      setStatus("error")
      return
    }
    setErrors({})
    setStatus("loading")
    try {
      await deliver('contact', form, started.current, ev.currentTarget as HTMLFormElement)
      setStatus('success')
    } catch {
      setCaptchaResetKey((current) => current + 1)
      setStatus('error')
    }
  }

  const inputStyle = (field: string) => ({
    width: "100%",
    padding: "14px 16px",
    borderRadius: "10px",
    border: `1.5px solid ${
      errors[(field as keyof typeof form)]
        ? "#C00000"
        : focused === field
          ? "#005FA8"
          : "#E2E8F0"
    }`,
    fontSize: "15px",
    color: "#20252B",
    outline: "none",
    transition: "border-color 0.2s",
    background: "#FFFFFF",
    fontFamily: "Inter, sans-serif",
  })

  const contactItems = [
    {
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
      label: t("info.address"),
      value: tc("footer.address"),
    },
    {
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
      label: t("info.phone"),
      value: tc("footer.phone"),
    },
    {
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      label: t("info.email"),
      value: tc("footer.email"),
    },
  ]

  return (
    <div>
      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(135deg, #073B63 0%, #005FA8 100%)",
          padding: "160px 0 100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                style={{
                  position: "absolute",
                  top: `${15 + row * 18}%`,
                  left: `${4 + col * 13}%`,
                  width: "2px",
                  height: "2px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                }}
              />
            )),
          )}
        </div>
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 32px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "48px",
            }}
          >
            <Link
              to="/"
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
              }}
            >
              {tc("breadcrumb.home")}
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
              /
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
              {tc("breadcrumb.contact")}
            </span>
          </div>
          <div style={{ maxWidth: "600px" }}>
            <div
              style={{
                display: "inline-block",
                padding: "5px 12px",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: "rgba(255,255,255,0.7)",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              {t("hero.badge")}
            </div>
            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 800,
                letterSpacing: "-2px",
                lineHeight: 1.08,
                color: "#FFFFFF",
                marginBottom: "20px",
              }}
            >
              {t("hero.title")}
              <br />
              <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>
                {t("hero.subtitle")}
              </span>
            </h1>
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {t("hero.desc")}
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ background: "#F5F7F9", padding: "80px 0 120px" }}>
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "64px",
              alignItems: "start",
            }}
          >
            {/* Info */}
            <FadeIn>
              <div>
                <h2
                  style={{
                    fontSize: "26px",
                    fontWeight: 800,
                    color: "#20252B",
                    letterSpacing: "-0.5px",
                    marginBottom: "32px",
                  }}
                >
                  {t("info.title")}
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "28px",
                    marginBottom: "48px",
                  }}
                >
                  {contactItems.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: "#EEF6FF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d={item.icon}
                            stroke="#005FA8"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "1px",
                            color: "#66717D",
                            textTransform: "uppercase",
                            marginBottom: "4px",
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#20252B",
                            lineHeight: 1.5,
                            whiteSpace: "pre-line",
                            fontWeight: 500,
                          }}
                        >
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    height: "220px",
                    background: "#E2E8F0",
                    position: "relative",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <iframe
                    title="InforAntunes localização"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24721.633461597714!2d-9.323616027831994!3d39.2382363990159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1f36873da40e53%3A0x5b997cb2b5801fec!2sInforAntunes%2C%20Lda.!5e0!3m2!1spt-PT!2spt!4v1789141959174!5m2!1spt-PT!2spt"
                    width="100%"
                    height="220"
                    style={{ border: "none", display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={120}>
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "48px",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                {status === "success" ? (
                  <div role="status" style={{ textAlign: "center", padding: "40px 0" }}>
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        background: "#ECFDF5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 24px",
                      }}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="#16A34A"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h2
                      style={{
                        fontSize: "24px",
                        fontWeight: 800,
                        color: "#20252B",
                        marginBottom: "12px",
                      }}
                    >
                      {t("form.success.title")}
                    </h2>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "#66717D",
                        lineHeight: 1.6,
                      }}
                    >
                      {t("form.success.desc")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate aria-busy={status === 'loading'}>
                    <SpamTrap />
                    <TurnstileCaptcha
                      onTokenChange={setCaptchaToken}
                      resetKey={captchaResetKey}
                    />
                    {status === 'error' && <p role="alert">{t('leadForms:common.errors.submit')}</p>}
                    <h2
                      style={{
                        fontSize: "22px",
                        fontWeight: 800,
                        color: "#20252B",
                        letterSpacing: "-0.5px",
                        marginBottom: "8px",
                      }}
                    >
                      {t("form.title")}
                    </h2>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#66717D",
                        marginBottom: "32px",
                      }}
                    >
                      {t("form.subtitle")}
                    </p>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      {[
                        {
                          field: "nome",
                          label: t("form.name"),
                          placeholder: t("form.namePlaceholder"),
                          type: "text",
                        },
                        {
                          field: "empresa",
                          label: t("form.company"),
                          placeholder: t("form.companyPlaceholder"),
                          type: "text",
                        },
                      ].map(({ field, label, placeholder, type }) => (
                        <div key={field}>
                          <label htmlFor={`contact-${field}`}
                            style={{
                              display: "block",
                              fontSize: "12px",
                              fontWeight: 700,
                              color: "#20252B",
                              marginBottom: "6px",
                              letterSpacing: "0.3px",
                            }}
                          >
                            {label}
                          </label>
                          <input
                            id={`contact-${field}`} name={field} required={field === 'nome' || field === 'email'} aria-invalid={!!errors[field as keyof typeof form]}
                            pattern={field === "nome" ? NAME_PATTERN.source : undefined}
                            maxLength={field === "nome" ? 100 : 250}
                            type={type}
                            placeholder={placeholder}
                            value={form[(field as keyof typeof form)]}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                [field]: e.target.value,
                              }))
                            }
                            onFocus={() => setFocused(field)}
                            onBlur={() => setFocused(null)}
                            style={inputStyle(field)}
                          />
                          {errors[(field as keyof typeof form)] && (
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#C00000",
                                marginTop: "4px",
                              }}
                            >
                              {errors[(field as keyof typeof form)]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      {[
                        {
                          field: "email",
                          label: t("form.email"),
                          placeholder: t("form.emailPlaceholder"),
                          type: "email",
                        },
                        {
                          field: "telefone",
                          label: t("form.phone"),
                          placeholder: t("form.phonePlaceholder"),
                          type: "tel",
                        },
                      ].map(({ field, label, placeholder, type }) => (
                        <div key={field}>
                          <label htmlFor={`contact-${field}`}
                            style={{
                              display: "block",
                              fontSize: "12px",
                              fontWeight: 700,
                              color: "#20252B",
                              marginBottom: "6px",
                              letterSpacing: "0.3px",
                            }}
                          >
                            {label}
                          </label>
                          <input
                            id={`contact-${field}`} name={field} required={field === 'nome' || field === 'email'} aria-invalid={!!errors[field as keyof typeof form]}
                            pattern={field === "email" ? EMAIL_PATTERN.source : PHONE_PATTERN.source}
                            maxLength={field === "email" ? 254 : 25}
                            type={type}
                            placeholder={placeholder}
                            value={form[(field as keyof typeof form)]}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                [field]: e.target.value,
                              }))
                            }
                            onFocus={() => setFocused(field)}
                            onBlur={() => setFocused(null)}
                            style={inputStyle(field)}
                          />
                          {errors[(field as keyof typeof form)] && (
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#C00000",
                                marginTop: "4px",
                              }}
                            >
                              {errors[(field as keyof typeof form)]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                      <label htmlFor="contact-mensagem"
                        style={{
                          display: "block",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#20252B",
                          marginBottom: "6px",
                          letterSpacing: "0.3px",
                        }}
                      >
                        {t("form.message")}
                      </label>
                      <textarea id="contact-mensagem" name="mensagem" required maxLength={5000} aria-invalid={!!errors.mensagem}
                        placeholder={t("form.messagePlaceholder")}
                        rows={5}
                        value={form.mensagem}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, mensagem: e.target.value }))
                        }
                        onFocus={() => setFocused("mensagem")}
                        onBlur={() => setFocused(null)}
                        style={{
                          ...inputStyle("mensagem"),
                          resize: "vertical",
                          minHeight: "120px",
                        }}
                      />
                      {errors.mensagem && (
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#C00000",
                            marginTop: "4px",
                          }}
                        >
                          {errors.mensagem}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading" || !captchaToken}
                      style={{
                        width: "100%",
                        padding: "15px",
                        background:
                          status === "loading" ? "#66717D" : "#C00000",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "15px",
                        fontWeight: 700,
                        cursor: status === "loading" ? "default" : "pointer",
                        transition: "all 0.2s",
                        letterSpacing: "-0.2px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                      onMouseEnter={(e) => {
                        if (status !== "loading")
                          (e.currentTarget as HTMLButtonElement).style.background =
                            "#A00000"
                      }}
                      onMouseLeave={(e) => {
                        if (status !== "loading")
                          (e.currentTarget as HTMLButtonElement).style.background =
                            "#C00000"
                      }}
                    >
                      {status === "loading" ? (
                        <>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ animation: "spin 1s linear infinite" }}
                            aria-hidden="true"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="rgba(255,255,255,0.3)"
                              strokeWidth="3"
                            />
                            <path
                              d="M12 2a10 10 0 0110 10"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                          {t("form.sending")}
                        </>
                      ) : (
                        t("form.submit")
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          section:nth-child(2) > div > div { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          form > div[style*="grid"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
