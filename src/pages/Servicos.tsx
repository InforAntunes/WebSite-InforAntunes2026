import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import SolutionLeadModal from "../components/SolutionLeadModal"

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

const servicePaths: Partial<Record<string, string>> = {
  "01": "/solucoes/softwares",
  "04": "/solucoes/pagamentos",
  "05": "/solucoes/robotica",
  "07": "/solucoes/ciberseguranca-infraestrutura",
  "08": "/solucoes/sistema-ponto",
}

export default function Servicos() {
  const { t } = useTranslation("services")
  const { t: tc } = useTranslation("common")
  const [expanded, setExpanded] = useState<string | null>(null)

  const services = t("items", { returnObjects: true }) as Array<{
    num: string
    category: string
    title: string
    desc: string
    items: string[]
  }>

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
              {tc("breadcrumb.services")}
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
              {t("hero.badge")}
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
                maxWidth: "540px",
              }}
            >
              {t("hero.desc")}
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES ACCORDION */}
      <section style={{ background: "#FFFFFF", padding: "80px 0 120px" }}>
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          {services.map((svc, i) => {
            const isExpanded = expanded === svc.num
            const path = servicePaths[svc.num]
            const triggerId = `service-${svc.num}-trigger`
            const panelId = `service-${svc.num}-panel`

            return (
              <FadeIn key={svc.num} delay={i * 50}>
                <article
                  className={`service-accordion-item ${
                    isExpanded ? "is-expanded" : ""
                  }`}
                >
                  <h2 style={{ margin: 0 }}>
                    <button
                      id={triggerId}
                      type="button"
                      className="service-accordion-trigger"
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => setExpanded(isExpanded ? null : svc.num)}
                    >
                      <span
                        className="service-accordion-number"
                        aria-hidden="true"
                      >
                        {svc.num}
                      </span>
                      <span>
                        <span className="service-accordion-category">
                          {svc.category}
                        </span>
                        <span className="service-accordion-title">
                          {svc.title}
                        </span>
                      </span>
                      <svg
                        className="service-accordion-arrow"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12h14m-6-6 6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </h2>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    hidden={!isExpanded}
                    className="service-accordion-panel"
                  >
                    {isExpanded && (
                      <>
                        <p className="service-accordion-description">
                          {svc.desc}
                        </p>
                        <ul className="service-accordion-highlights">
                          {svc.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        {path ? (
                          <Link to={path} className="service-accordion-cta">
                            {tc("cta.learnMore")}{" "}
                            <span aria-hidden="true">→</span>
                          </Link>
                        ) : (
                          <SolutionLeadModal
                            type="serviceQuote"
                            source="services"
                            className="service-accordion-cta"
                          >
                            {t("infra.cta")}
                          </SolutionLeadModal>
                        )}
                      </>
                    )}
                  </div>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </section>

      {/* INFRA SECTION */}
      <section
        style={{
          background: "#F5F7F9",
          padding: "100px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
            }}
          >
            <FadeIn>
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
                    marginBottom: "24px",
                  }}
                >
                  {t("infra.badge")}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(28px, 3vw, 44px)",
                    fontWeight: 800,
                    letterSpacing: "-1px",
                    lineHeight: 1.1,
                    color: "#20252B",
                    marginBottom: "20px",
                  }}
                >
                  {t("infra.title")}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.75,
                    color: "#66717D",
                    marginBottom: "32px",
                  }}
                >
                  {t("infra.desc")}
                </p>
                <SolutionLeadModal
                  type="serviceQuote"
                  source="services"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    background: "#073B63",
                    border: "none",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    fontFamily: "inherit",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "#005FA8")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "#073B63")
                  }
                >
                  {t("infra.cta")}
                </SolutionLeadModal>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 20px 56px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?w=700&h=500&fit=crop&auto=format"
                  alt="Infraestrutura de servidores e redes"
                  style={{
                    width: "100%",
                    height: "420px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#073B63", padding: "100px 0" }}>
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
                color: "#FFFFFF",
                marginBottom: "16px",
              }}
            >
              {t("cta.title")}
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "36px",
              }}
            >
              {t("cta.desc")}
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
                boxShadow: "0 4px 16px rgba(192,0,0,0.4)",
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
              {tc("nav.contactCta")} →
            </Link>
          </FadeIn>
        </div>
      </section>

      <style>{`
        .service-accordion-item { border-bottom: 1px solid #EEF1F4; transition: background 0.25s; }
        .service-accordion-item.is-expanded { background: #F5F7F9; border-radius: 12px; }
        .service-accordion-trigger { width: 100%; display: grid; grid-template-columns: 56px minmax(0, 1fr) 20px; align-items: center; gap: 32px; padding: 32px 24px; background: transparent; border: 0; border-radius: 12px; text-align: left; font-family: inherit; cursor: pointer; }
        .service-accordion-trigger:hover { background: #F5F7F9; }
        .service-accordion-trigger:focus-visible, .service-accordion-cta:focus-visible { outline: 3px solid #005FA8; outline-offset: 4px; }
        .service-accordion-number { font-size: 13px; font-weight: 700; letter-spacing: 1px; color: #66717D; }
        .service-accordion-category { display: block; color: #005FA8; font-size: 10px; font-weight: 800; letter-spacing: 1.4px; margin-bottom: 7px; }
        .service-accordion-title { display: block; font-size: 22px; font-weight: 700; color: #20252B; letter-spacing: -0.5px; }
        .service-accordion-arrow { color: #005FA8; transition: transform 0.25s; }
        .service-accordion-item.is-expanded .service-accordion-arrow { transform: rotate(90deg); }
        .service-accordion-panel { padding: 0 76px 32px 112px; animation: fadeIn 0.25s ease; }
        .service-accordion-description { font-size: 15px; line-height: 1.7; color: #66717D; margin: 0 0 20px; max-width: 600px; }
        .service-accordion-highlights { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0; margin: 0 0 22px; }
        .service-accordion-highlights li { padding: 6px 14px; border-radius: 100px; background: #EEF6FF; color: #005FA8; font-size: 13px; font-weight: 600; }
        .service-accordion-cta { display: inline-flex; align-items: center; gap: 6px; padding: 11px 20px; border: 0; border-radius: 9px; background: #005FA8; color: #FFFFFF; font-family: inherit; font-size: 13px; font-weight: 700; text-decoration: none; cursor: pointer; transition: background 0.2s; }
        .service-accordion-cta:hover { background: #073B63; }
        @media (max-width: 600px) {
          .service-accordion-trigger { grid-template-columns: 24px minmax(0, 1fr) 18px; gap: 14px; padding: 24px 12px; }
          .service-accordion-title { font-size: 19px; }
          .service-accordion-panel { padding: 0 12px 24px 50px; }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 900px) {
          section:nth-child(3) > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
