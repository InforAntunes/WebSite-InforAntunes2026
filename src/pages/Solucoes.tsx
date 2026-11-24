import { useEffect, useRef, useState } from "react"
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

export default function Solucoes() {
  const { t } = useTranslation("solutions")
  const { t: tc } = useTranslation("common")

  const softwareCards = [
    //{ name: 'Eticadata', cat: 'ERP', path: '/solucoes/softwares/eticadata' },
    { name: "WinRest", cat: "POS", path: "/solucoes/softwares/winrest" },
    { name: "XD", cat: tc("mega.xd_desc"), path: "/solucoes/softwares/xd" },
    {
      name: "Zonesoft",
      cat: tc("mega.zonesoft_desc"),
      path: "/solucoes/softwares/zonesoft",
    },
    {
      name: "Sistema Ponto",
      cat: tc("mega.sistema_ponto_desc"),
      path: "/solucoes/sistema-ponto",
    },
  ]

  const paymentCards = [
    {
      name: "Cashlogy",
      desc: tc("mega.cashlogy_desc"),
      path: "/solucoes/pagamentos/cashlogy",
    } /* 
    { name: 'Caixa Automática Compact', desc: tc('mega.compact_desc'), path: '/solucoes/pagamentos/compact' }, */,
    {
      name: t("hub.entregaLabel") || "Instalação e Logística",
      desc: tc("mega.entrega_desc"),
      path: "/solucoes/pagamentos/entrega",
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
              {tc("breadcrumb.solutions")}
            </span>
          </div>
          <div style={{ maxWidth: "640px" }}>
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
              {t("hub.badge")}
            </div>
            <h1
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                fontWeight: 800,
                letterSpacing: "-2px",
                lineHeight: 1.08,
                color: "#FFFFFF",
                marginBottom: "24px",
              }}
            >
              {t("hub.title")}
              <br />
              <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>
                {t("hub.subtitle")}
              </span>
            </h1>
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {t("hub.desc")}
            </p>
          </div>
        </div>
      </section>

      {/* SOFTWARE */}
      <section style={{ background: "#FFFFFF", padding: "100px 0" }}>
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          <FadeIn>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.5fr",
                gap: "80px",
                alignItems: "center",
                marginBottom: "64px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    background: "#EEF6FF",
                    color: "#005FA8",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  {t("hub.cat01")}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(28px, 3vw, 44px)",
                    fontWeight: 800,
                    letterSpacing: "-1px",
                    lineHeight: 1.1,
                    color: "#20252B",
                    marginBottom: "16px",
                  }}
                >
                  {tc("mega.software")}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.75,
                    color: "#66717D",
                    marginBottom: "24px",
                  }}
                >
                  {t("hub.softwareDesc")}
                </p>
                <Link
                  to="/solucoes/softwares"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#005FA8",
                    textDecoration: "none",
                    transition: "gap 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.gap = "12px")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.gap = "8px")
                  }
                >
                  {t("hub.viewSoftware")}
                </Link>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                {softwareCards.map((p, i) => (
                  <Link key={i} to={p.path} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        padding: "24px",
                        borderRadius: "14px",
                        background: "#F5F7F9",
                        border: "1px solid #E2E8F0",
                        transition: "all 0.25s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.background = "#EEF6FF"
                        el.style.borderColor = "#005FA8"
                        el.style.transform = "translateY(-2px)"
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.background = "#F5F7F9"
                        el.style.borderColor = "#E2E8F0"
                        el.style.transform = "translateY(0)"
                      }}
                    >
                      <div
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "1px",
                          color: "#66717D",
                          textTransform: "uppercase",
                          marginBottom: "6px",
                        }}
                      >
                        {p.cat}
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: 800,
                          color: "#20252B",
                          letterSpacing: "-0.5px",
                        }}
                      >
                        {p.name}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#005FA8",
                          marginTop: "8px",
                          fontWeight: 600,
                        }}
                      >
                        {tc("cta.learnMore")} →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PAYMENTS */}
      <section style={{ background: "#F5F7F9", padding: "100px 0" }}>
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          <FadeIn>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1fr",
                gap: "80px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "16px",
                }}
              >
                {paymentCards.map((p, i) => (
                  <Link key={i} to={p.path} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        padding: "24px 28px",
                        borderRadius: "14px",
                        background: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        transition: "all 0.25s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.borderColor = "#073B63"
                        el.style.transform = "translateX(4px)"
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.borderColor = "#E2E8F0"
                        el.style.transform = "translateX(0)"
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: 700,
                            color: "#20252B",
                            letterSpacing: "-0.3px",
                            marginBottom: "4px",
                          }}
                        >
                          {p.name}
                        </div>
                        <div style={{ fontSize: "13px", color: "#66717D" }}>
                          {p.desc}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "18px",
                          color: "#073B63",
                          flexShrink: 0,
                        }}
                      >
                        →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    background: "#FFF0F0",
                    color: "#C00000",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  {t("hub.cat02")}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(28px, 3vw, 44px)",
                    fontWeight: 800,
                    letterSpacing: "-1px",
                    lineHeight: 1.1,
                    color: "#20252B",
                    marginBottom: "16px",
                  }}
                >
                  {tc("mega.payments")}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.75,
                    color: "#66717D",
                    marginBottom: "24px",
                  }}
                >
                  {t("hub.paymentsDesc")}
                </p>
                <Link
                  to="/solucoes/pagamentos"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#C00000",
                    textDecoration: "none",
                    transition: "gap 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.gap = "12px")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.gap = "8px")
                  }
                >
                  {t("hub.viewPayments")}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ROBOTICS */}
      <section
        style={{
          background: "#073B63",
          padding: "100px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "700px",
              height: "700px",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "50%",
            }}
          />
        </div>
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 32px",
            position: "relative",
          }}
        >
          <FadeIn>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "80px",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  {t("hub.cat03")}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(28px, 3vw, 44px)",
                    fontWeight: 800,
                    letterSpacing: "-1px",
                    lineHeight: 1.1,
                    color: "#FFFFFF",
                    marginBottom: "16px",
                  }}
                >
                  {tc("mega.robotics")}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.65)",
                    marginBottom: "24px",
                  }}
                >
                  {t("hub.roboticsDesc")}
                </p>
                <Link
                  to="/solucoes/robotica"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    background: "#C00000",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.background =
                      "#A00000")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.background =
                      "#C00000")
                  }
                >
                  {t("hub.viewRobotics")}
                </Link>
              </div>
              <div
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=700&h=500&fit=crop&auto=format"
                  alt="Pudu Robotics - robô de serviço"
                  style={{
                    width: "100%",
                    height: "420px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          <FadeIn>
            <Link
              to={"/solucoes/ciberseguranca-infraestrutura"}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  padding: "24px",
                  borderRadius: "14px",
                  background: "#F5F7F9",
                  border: "1px solid #E2E8F0",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.background = "#EEF6FF"
                  el.style.borderColor = "#005FA8"
                  el.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.background = "#F5F7F9"
                  el.style.borderColor = "#E2E8F0"
                  el.style.transform = "translateY(0)"
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    color: "#66717D",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  {tc("mega.cybersecurityInfrastructureDesc")}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#20252B",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {tc("mega.cybersecurityInfrastructure")}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#005FA8",
                    marginTop: "8px",
                    fontWeight: 600,
                  }}
                >
                  {tc("cta.learnMore")} →
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#FFFFFF", padding: "100px 0" }}>
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 32px",
            textAlign: "center",
          }}
        >
          <FadeIn>
            <h2
              style={{
                fontSize: "clamp(28px, 3vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-1px",
                color: "#20252B",
                marginBottom: "16px",
              }}
            >
              {t("hub.noSolution")}
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#66717D",
                marginBottom: "36px",
              }}
            >
              {t("hub.noSolutionDesc")}
            </p>
            <Link
              to="/contactos"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                background: "#C00000",
                color: "#FFFFFF",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 700,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  "#A00000")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  "#C00000")
              }
            >
              {tc("cta.talkSpecialist")}
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
