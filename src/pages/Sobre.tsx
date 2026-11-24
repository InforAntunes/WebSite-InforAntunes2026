import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import infor from "../../src/public/photos/infor.jpeg"

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

export default function Sobre() {
  const { t } = useTranslation("about")
  const { t: tc } = useTranslation("common")

  const values = t("values.items", { returnObjects: true }) as Array<{
    icon: string
    title: string
    desc: string
  }>
  const timelineItems = t("timeline.items", { returnObjects: true }) as Array<{
    year: string
    title: string
    desc: string
  }>
  const recognitionItems = t("recognition.items", {
    returnObjects: true,
  }) as Array<{
  title: string
  sub: string
  desc: string
}>

  return (
    <div>
      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(135deg, #073B63 0%, #005FA8 100%)",
          padding: "160px 0 120px",
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
              {tc("breadcrumb.about")}
            </span>
          </div>
          <div style={{ maxWidth: "700px" }}>
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
                maxWidth: "560px",
              }}
            >
              {t("hero.desc")}
            </p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section style={{ background: "#FFFFFF", padding: "120px 0" }}>
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
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    left: "-20px",
                    width: "200px",
                    height: "200px",
                    background: "#F5F7F9",
                    borderRadius: "50%",
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.1)",
                    position: "relative",
                  }}
                >
                  <img
                    src={infor}
                    alt="Infraestrutura tecnológica InforAntunes"
                    style={{
                      width: "100%",
                      height: "460px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={120}>
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
                  {t("story.badge")}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontWeight: 800,
                    letterSpacing: "-1px",
                    lineHeight: 1.15,
                    color: "#20252B",
                    marginBottom: "24px",
                  }}
                >
                  {t("story.title")}
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.75,
                      color: "#66717D",
                    }}
                  >
                    {t("story.p1")}
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.75,
                      color: "#66717D",
                    }}
                  >
                    {t("story.p2")}
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.75,
                      color: "#66717D",
                    }}
                  >
                    {t("story.p3")}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ background: "#F5F7F9", padding: "120px 0" }}>
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "72px" }}>
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
                {t("values.badge")}
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
                {t("values.title")}
              </h2>
            </div>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
          >
            {values.map((v, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "32px",
                    border: "1px solid #E2E8F0",
                    transition: "all 0.3s",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = "translateY(-4px)"
                    el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = "translateY(0)"
                    el.style.boxShadow = "none"
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      color: "#005FA8",
                      marginBottom: "16px",
                    }}
                  >
                    {v.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#20252B",
                      marginBottom: "10px",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {v.title}
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.65,
                      color: "#66717D",
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ background: "#FFFFFF", padding: "120px 0" }}>
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "72px" }}>
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
                {t("timeline.badge")}
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
                {t("timeline.title")}
              </h2>
            </div>
          </FadeIn>

          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: "1px",
                background: "#EEF1F4",
                transform: "translateX(-50%)",
              }}
            />
            {timelineItems.map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "48px",
                    marginBottom: "56px",
                    alignItems: "start",
                  }}
                >
                  {i % 2 === 0 ? (
                    <>
                      <div style={{ textAlign: "right", paddingRight: "40px" }}>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "1.5px",
                            color: "#C00000",
                            textTransform: "uppercase",
                            marginBottom: "8px",
                          }}
                        >
                          {item.year}
                        </div>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#20252B",
                            letterSpacing: "-0.3px",
                            marginBottom: "8px",
                          }}
                        >
                          {item.title}
                        </div>
                        <p
                          style={{
                            fontSize: "14px",
                            lineHeight: 1.65,
                            color: "#66717D",
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                      <div style={{ paddingLeft: "40px" }}>
                        <div
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: "#005FA8",
                            border: "3px solid #FFFFFF",
                            boxShadow: "0 0 0 2px #005FA8",
                            marginLeft: "-6px",
                            marginTop: "16px",
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          paddingRight: "40px",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: "#C00000",
                            border: "3px solid #FFFFFF",
                            boxShadow: "0 0 0 2px #C00000",
                            marginRight: "-6px",
                            marginTop: "16px",
                          }}
                        />
                      </div>
                      <div style={{ paddingLeft: "40px" }}>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "1.5px",
                            color: "#005FA8",
                            textTransform: "uppercase",
                            marginBottom: "8px",
                          }}
                        >
                          {item.year}
                        </div>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#20252B",
                            letterSpacing: "-0.3px",
                            marginBottom: "8px",
                          }}
                        >
                          {item.title}
                        </div>
                        <p
                          style={{
                            fontSize: "14px",
                            lineHeight: 1.65,
                            color: "#66717D",
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* RECOGNITIONS */}
      <section style={{ background: "#073B63", padding: "100px 0" }}>
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <h2
                style={{
                  fontSize: "clamp(28px, 3vw, 44px)",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  color: "#FFFFFF",
                  marginBottom: "12px",
                }}
              >
                {t("recognition.title")}
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.55)" }}>
                {t("recognition.subtitle")}
              </p>
            </div>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {recognitionItems.map((badge, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "16px",
                    padding: "32px",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      color: "#C00000",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    {badge.sub}
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      letterSpacing: "-0.5px",
                      marginBottom: "12px",
                    }}
                  >
                    {badge.title}
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.65,
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {badge.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
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
              {t("cta.title")}
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#66717D",
                marginBottom: "36px",
                maxWidth: "440px",
                margin: "0 auto 36px",
              }}
            >
              {t("cta.desc")}
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/contactos"
                style={{
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
                {t("cta.primary")}
              </Link>
              <Link
                to="/solucoes"
                style={{
                  padding: "14px 32px",
                  border: "1.5px solid #E2E8F0",
                  color: "#20252B",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 600,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "#005FA8")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "#E2E8F0")
                }
              >
                {t("cta.secondary")}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
