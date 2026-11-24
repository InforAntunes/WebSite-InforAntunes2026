import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import photoPudo from "../../../src/public/photos/pudu.png"

import photoPudo2 from "../../../src/public/photos/robosPudu.jpeg"
import SolutionLeadModal from "../../components/SolutionLeadModal"

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

export default function RoboticaPage() {
  const { t } = useTranslation("solutions")
  const { t: tc } = useTranslation("common")

  const heroTags = t("robotics.hero.tags", { returnObjects: true }) as string[]
  const contexts = t("robotics.contexts.items", {
    returnObjects: true,
  }) as Array<{
  icon: string
  title: string
  desc: string
}>
  const benefits = t("robotics.benefits.items", {
    returnObjects: true,
  }) as string[]

  return (
    <div>
      {/* HERO — dark immersive */}
      <section
        style={{
          background: "#073B63",
          padding: "160px 0 0",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "800px",
              height: "800px",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-30%",
              right: "-20%",
              width: "1100px",
              height: "1100px",
              border: "1px solid rgba(255,255,255,0.02)",
              borderRadius: "50%",
            }}
          />
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                style={{
                  position: "absolute",
                  top: `${10 + row * 18}%`,
                  left: `${4 + col * 13}%`,
                  width: "2px",
                  height: "2px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
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
            flex: 1,
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
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
              }}
            >
              {tc("breadcrumb.home")}
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
              /
            </span>
            <Link
              to="/solucoes"
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
              }}
            >
              {tc("breadcrumb.solutions")}
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
              /
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
              {tc("breadcrumb.robotics")}
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "64px",
              alignItems: "flex-end",
              paddingBottom: "0",
            }}
          >
            <div style={{ paddingBottom: "80px" }}>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginBottom: "24px",
                }}
              >
                {heroTags.map((tag) => (
                  <div
                    key={tag}
                    style={{
                      padding: "4px 10px",
                      background: "rgba(0,95,168,0.8)",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      color: "#FFFFFF",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <h1
                style={{
                  fontSize: "clamp(44px, 5.5vw, 76px)",
                  fontWeight: 900,
                  letterSpacing: "-2.5px",
                  lineHeight: 1,
                  color: "#FFFFFF",
                  marginBottom: "24px",
                }}
              >
                Pudu
                <br />
                Robotics
              </h1>
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}
              >
                {t("robotics.hero.tagline")}
              </p>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: "36px",
                  maxWidth: "440px",
                }}
              >
                {t("robotics.hero.desc")}
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <SolutionLeadModal
                  type="robotics"
                  source="robotics"
                  style={{
                    padding: "13px 24px",
                    background: "#C00000",
                    border: "none",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 700,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: "0 4px 16px rgba(192,0,0,0.4)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "#A00000")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "#C00000")
                  }
                >
                  {t("productPage.demoBtn")}
                </SolutionLeadModal>
                <SolutionLeadModal
                  type="robotics"
                  source="robotics"
                  style={{
                    padding: "13px 24px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(255,255,255,0.12)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(255,255,255,0.08)")
                  }
                >
                  {tc("cta.learnMore")}
                </SolutionLeadModal>
              </div>

              {/* Partner badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "48px",
                  padding: "16px 20px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  width: "fit-content",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "#005FA8",
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
                      d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("robotics.hero.partnerLabel")}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                    }}
                  >
                    Pudu Robotics · {t("robotics.hero.partnerCountry")}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ position: "relative", alignSelf: "flex-end" }}>
              <div
                style={{
                  borderRadius: "20px 20px 0 0",
                  overflow: "hidden",
                  background: "#0A4F84",
                }}
              >
                <img
                  src={photoPudo}
                  alt="Robô de serviço Pudu Robotics"
                  style={{
                    width: "100%",
                    height: "540px",
                    objectFit: "cover",
                    display: "block",
                    opacity: 0.9,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(7,59,99,0.7) 100%)",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  right: "-20px",
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: "12px",
                  padding: "14px 18px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    color: "#66717D",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  {tc("badge.official_partner")}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "#20252B",
                    letterSpacing: "-0.3px",
                  }}
                >
                  Pudu Robotics
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#005FA8",
                    marginTop: "2px",
                    fontWeight: 600,
                  }}
                >
                  {tc("badge.portugal")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTEXTS */}
      <section style={{ background: "#FFFFFF", padding: "100px 0" }}>
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
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
                {t("robotics.contexts.badge")}
              </div>
              <h2
                style={{
                  fontSize: "clamp(28px, 3vw, 44px)",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  lineHeight: 1.1,
                  color: "#20252B",
                }}
              >
                {t("robotics.contexts.title")}
              </h2>
            </div>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {contexts.map((ctx, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div
                  style={{
                    padding: "32px 24px",
                    borderRadius: "16px",
                    background: "#F5F7F9",
                    border: "1px solid #E2E8F0",
                    textAlign: "center",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.background = "#EEF6FF"
                    el.style.borderColor = "#005FA8"
                    el.style.transform = "translateY(-4px)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.background = "#F5F7F9"
                    el.style.borderColor = "#E2E8F0"
                    el.style.transform = "translateY(0)"
                  }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "12px" }}>
                    {ctx.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#20252B",
                      marginBottom: "8px",
                    }}
                  >
                    {ctx.title}
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "#66717D",
                    }}
                  >
                    {ctx.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section style={{ background: "#F5F7F9", padding: "80px 0 100px" }}>
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
              <div
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={photoPudo2}
                  alt="Robô de serviço em funcionamento"
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </FadeIn>
            <FadeIn delay={120}>
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
                    marginBottom: "20px",
                  }}
                >
                  {t("robotics.benefits.badge")}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(24px, 2.5vw, 36px)",
                    fontWeight: 800,
                    letterSpacing: "-0.8px",
                    lineHeight: 1.15,
                    color: "#20252B",
                    marginBottom: "24px",
                  }}
                >
                  {t("robotics.benefits.title")}
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {benefits.map((b, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: "#EEF6FF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "1px",
                        }}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M1.5 5l2.5 2.5L8.5 2"
                            stroke="#005FA8"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#20252B",
                          lineHeight: 1.5,
                        }}
                      >
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
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
              {t("robotics.cta.title")}
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "36px",
              }}
            >
              {t("robotics.cta.desc")}
            </p>
            <SolutionLeadModal
              type="robotics"
              source="robotics"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                background: "#C00000",
                border: "none",
                color: "#FFFFFF",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: "inherit",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 4px 16px rgba(192,0,0,0.4)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#A00000")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#C00000")
              }
            >
              {t("productPage.demoBtn")}
            </SolutionLeadModal>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section:first-child > div > div:last-child > div:last-child { display: none; }
        }
      `}</style>
    </div>
  )
}
