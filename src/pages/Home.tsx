import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import puduPhoto from "../../src/public/photos/pudu.png"
import infor from "../../src/public/photos/infor.jpeg"
import infor2 from "../../src/public/photos/infor2.jpeg"

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
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={className}
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

const softwareProductPaths = [
  //'/solucoes/softwares/eticadata',
  "/solucoes/softwares/winrest",
  "/solucoes/softwares/xd",
  "/solucoes/softwares/zonesoft",
]
const softwareColors = ["#005FA8", "#073B63", "#005FA8", "#073B63"]

const servicePaths = [
  "/solucoes/softwares",
  "/servicos",
  "/servicos",
  "/solucoes/pagamentos",
  "/solucoes/robotica",
  "/servicos",
]

export default function Home() {
  const { t } = useTranslation("home")
  const { t: tc } = useTranslation("common")
  const [heroVisible, setHeroVisible] = useState(false)
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(timer)
  }, [])

  const services = t("services.items", { returnObjects: true }) as Array<{
    num: string
    title: string
    desc: string
  }>
  const softwareProducts = t("software.products", {
    returnObjects: true,
  }) as Array<{
  cat: string
  name: string
  desc: string
  cta: string
}>
  const accompanimentSteps = t("accompaniment.steps", {
    returnObjects: true,
  }) as Array<{
  num: string
  title: string
  desc: string
}>
  const roboticsContexts = t("robotics.contexts", {
    returnObjects: true,
  }) as string[]

  return (
    <div>
      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #073B63 0%, #005FA8 60%, #0A6BC4 100%)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-10%",
              right: "-5%",
              width: "55%",
              height: "110%",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%",
              transform: "rotate(-15deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20%",
              right: "5%",
              width: "600px",
              height: "600px",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-30%",
              right: "8%",
              width: "800px",
              height: "800px",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "50%",
            }}
          />
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                style={{
                  position: "absolute",
                  top: `${15 + row * 14}%`,
                  left: `${5 + col * 12}%`,
                  width: "2px",
                  height: "2px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.12)",
                }}
              />
            )),
          )}
        </div>

        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "120px 32px 80px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
            }}
          >
            {/* Left: text */}
            <div>
              <div
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 14px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "100px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    color: "rgba(255,255,255,0.8)",
                    textTransform: "uppercase",
                    marginBottom: "32px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#C00000",
                      display: "inline-block",
                    }}
                  />
                  {t("hero.label")}
                </div>
              </div>

              <div
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.6s ease 0.12s, transform 0.6s ease 0.12s",
                }}
              >
                <h1
                  style={{
                    fontSize: "clamp(42px, 5vw, 68px)",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    lineHeight: 1.08,
                    letterSpacing: "-2px",
                    marginBottom: "24px",
                  }}
                >
                  {t("hero.title1")}
                  <br />
                  <span
                    style={{ color: "rgba(255,255,255,0.6)", fontWeight: 300 }}
                  >
                    {t("hero.title2")}
                  </span>
                  <br />
                  {t("hero.title3")}
                </h1>
              </div>

              <div
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.6s ease 0.22s, transform 0.6s ease 0.22s",
                }}
              >
                <p
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.7)",
                    maxWidth: "440px",
                    marginBottom: "40px",
                  }}
                >
                  {t("hero.description")}
                </p>
              </div>

              <div
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.6s ease 0.32s, transform 0.6s ease 0.32s",
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  to="/contactos"
                  style={{
                    padding: "14px 28px",
                    background: "#C00000",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: 700,
                    transition: "all 0.2s",
                    letterSpacing: "-0.3px",
                    boxShadow: "0 4px 20px rgba(192,0,0,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.background =
                      "#A00000"
                    ;(e.currentTarget as HTMLAnchorElement).style.transform =
                      "translateY(-1px)"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.background =
                      "#C00000"
                    ;(e.currentTarget as HTMLAnchorElement).style.transform =
                      "translateY(0)"
                  }}
                >
                  {tc("nav.contactCta")}
                </Link>
                <Link
                  to="/solucoes"
                  style={{
                    padding: "14px 28px",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: 600,
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,255,255,0.15)"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,255,255,0.1)"
                  }}
                >
                  {tc("cta.explore")} <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right: visual */}
            <div
              className="home-hero-visual"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "scale(1)" : "scale(0.96)",
                transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
                position: "relative",
              }}
            >
              <div
                className="home-hero-image"
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
                  background: "#0A4F84",
                }}
              >
                <img
                  src={infor}
                  //src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=580&fit=crop&auto=format"
                  alt="Profissional a trabalhar com tecnologia empresarial"
                  style={{
                    width: "100%",
                    height: "480px",
                    objectFit: "cover",
                    display: "block",
                    opacity: 0.85,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(7,59,99,0.6) 100%)",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "-28px",
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  padding: "14px 18px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
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
                  {tc("badge.pme_lider")}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#20252B",
                  }}
                >
                  {tc("badge.certified")}
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  right: "-28px",
                  background: "#C00000",
                  borderRadius: "12px",
                  padding: "14px 18px",
                  boxShadow: "0 8px 32px rgba(192,0,0,0.3)",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    color: "rgba(255,255,255,0.7)",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  {tc("badge.since")}
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    letterSpacing: "-1px",
                  }}
                >
                  1997
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "80px",
                  left: "-20px",
                  background: "rgba(7,59,99,0.95)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#22C55E",
                      boxShadow: "0 0 8px #22C55E",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {tc("badge.active_support")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            opacity: 0.5,
          }}
        >
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "rgba(255,255,255,0.5)",
            }}
          />
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "2px",
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            {tc("scroll")}
          </span>
        </div>

        <style>{`
          @media (max-width: 900px) {
            section:first-child > div > div { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* CREDIBILITY STRIP */}
      <section
        style={{ background: "#FFFFFF", borderBottom: "1px solid #EEF1F4" }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "48px 32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "#EEF1F4" }} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2px",
                color: "#66717D",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {t("credibility.label")}
            </span>
            <div style={{ flex: 1, height: "1px", background: "#EEF1F4" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "64px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {[
              {
                title: tc("badge.pme_lider"),
                sub: t("credibility.pme_lider_sub"),
                icon: "★",
              },
              {
                title: tc("badge.pme_excelencia"),
                sub: t("credibility.pme_excel_sub"),
                icon: "◆",
              },
              {
                title: tc("badge.pagamento_pontual"),
                sub: t("credibility.payment_sub"),
                icon: "✓",
              },
            ].map((badge, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#F5F7F9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    color: "#005FA8",
                    fontWeight: 700,
                  }}
                >
                  {badge.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#20252B",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {badge.title}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#66717D",
                      marginTop: "2px",
                    }}
                  >
                    {badge.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        style={{
          background: "#F5F7F9",
          padding: "120px 0",
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
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "-24px",
                    left: "-24px",
                    display: "grid",
                    gridTemplateColumns: "repeat(6,1fr)",
                    gap: "12px",
                    opacity: 0.4,
                  }}
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#005FA8",
                      }}
                    />
                  ))}
                </div>
                <div
                  className="home-about-image"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.12)",
                    transform: "rotate(-1.5deg)",
                    marginRight: "-24px",
                  }}
                >
                  <img
                    src={infor2}
                    //src="https://images.unsplash.com/photo-1761735485907-c59db6a69ccf?w=700&h=520&fit=crop&auto=format"
                    alt="Equipa InforAntunes a colaborar"
                    style={{
                      width: "100%",
                      height: "460px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-16px",
                    right: "0",
                    background: "#073B63",
                    color: "#FFFFFF",
                    borderRadius: "14px",
                    padding: "20px 24px",
                    boxShadow: "0 12px 32px rgba(7,59,99,0.3)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {tc("badge.since")}
                  </div>
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: 800,
                      letterSpacing: "-2px",
                    }}
                  >
                    1997
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div style={{ paddingLeft: "24px" }}>
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
                  {t("about.badge")}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(32px, 3.5vw, 48px)",
                    fontWeight: 800,
                    letterSpacing: "-1.5px",
                    lineHeight: 1.1,
                    color: "#20252B",
                    marginBottom: "24px",
                  }}
                >
                  {t("about.title1")}
                  <br />
                  <span style={{ color: "#005FA8" }}>{t("about.title2")}</span>
                  <br />
                  {t("about.title3")}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.75,
                    color: "#66717D",
                    marginBottom: "20px",
                  }}
                >
                  {t("about.p1")}
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.75,
                    color: "#66717D",
                    marginBottom: "36px",
                  }}
                >
                  {t("about.p2")}
                </p>
                <Link
                  to="/sobre"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    background: "#073B63",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.background =
                      "#005FA8"
                    ;(e.currentTarget as HTMLAnchorElement).style.transform =
                      "translateY(-1px)"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.background =
                      "#073B63"
                    ;(e.currentTarget as HTMLAnchorElement).style.transform =
                      "translateY(0)"
                  }}
                >
                  {t("about.cta")} →
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background: "#FFFFFF", padding: "120px 0" }}>
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          <FadeIn>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "64px",
                flexWrap: "wrap",
                gap: "24px",
              }}
            >
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
                  {t("services.badge")}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(32px, 3.5vw, 52px)",
                    fontWeight: 800,
                    letterSpacing: "-1.5px",
                    lineHeight: 1.1,
                    color: "#20252B",
                  }}
                >
                  {t("services.title1")}
                  <br />
                  <span style={{ color: "#66717D", fontWeight: 300 }}>
                    {t("services.title2")}
                  </span>
                </h2>
              </div>
              <Link
                to="/servicos"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#005FA8",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  transition: "gap 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.gap = "12px")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.gap = "8px")
                }
              >
                {t("services.viewAll")}
              </Link>
            </div>
          </FadeIn>

          <div>
            {services.map((svc, i) => (
              <FadeIn key={i} delay={i * 60}>
                <Link to={servicePaths[i]} style={{ textDecoration: "none" }}>
                  <div
                    className="home-service-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr auto",
                      alignItems: "center",
                      gap: "32px",
                      borderBottom: "1px solid #EEF1F4",
                      cursor: "pointer",
                      transition: "all 0.25s",
                      background:
                        hoveredService === i ? "#F5F7F9" : "transparent",
                      borderRadius: hoveredService === i ? "12px" : "0",
                      margin: hoveredService === i ? "0 -24px" : "0",
                      padding: hoveredService === i ? "28px 24px" : "28px 0",
                    }}
                    onMouseEnter={() => setHoveredService(i)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "1px",
                        color: "#66717D",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {svc.num}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "#20252B",
                          letterSpacing: "-0.5px",
                          marginBottom: "4px",
                        }}
                      >
                        {svc.title}
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#66717D",
                          lineHeight: 1.5,
                        }}
                      >
                        {svc.desc}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        color: "#C00000",
                        transform:
                          hoveredService === i
                            ? "translateX(8px)"
                            : "translateX(0)",
                        transition: "transform 0.25s",
                      }}
                    >
                      →
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SOFTWARE PRODUCTS */}
      <section
        style={{
          background: "#F5F7F9",
          padding: "120px 0",
          overflow: "hidden",
        }}
      >
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
                {t("software.badge")}
              </div>
              <h2
                style={{
                  fontSize: "clamp(32px, 3.5vw, 52px)",
                  fontWeight: 800,
                  letterSpacing: "-1.5px",
                  lineHeight: 1.1,
                  color: "#20252B",
                  marginBottom: "16px",
                }}
              >
                {t("software.title1")}
                <br />
                <span style={{ color: "#66717D", fontWeight: 300 }}>
                  {t("software.title2")}
                </span>
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#66717D",
                  maxWidth: "480px",
                  margin: "0 auto",
                }}
              >
                {t("software.desc")}
              </p>
            </div>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px",
            }}
          >
            {softwareProducts.map((prod, i) => (
              <FadeIn key={i} delay={i * 80}>
                <Link
                  to={softwareProductPaths[i]}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "20px",
                      overflow: "hidden",
                      border: "1px solid #E2E8F0",
                      transition: "all 0.3s",
                      height: "100%",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.transform = "translateY(-4px)"
                      el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.1)"
                      el.style.borderColor = softwareColors[i]
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.transform = "translateY(0)"
                      el.style.boxShadow = "none"
                      el.style.borderColor = "#E2E8F0"
                    }}
                  >
                    <div
                      style={{
                        height: "6px",
                        background: `linear-gradient(90deg, ${softwareColors[i]}, ${
                          softwareColors[i] === "#005FA8"
                            ? "#073B63"
                            : "#005FA8"
                        })`,
                      }}
                    />
                    <div style={{ padding: "32px" }}>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "1.5px",
                          color: softwareColors[i],
                          textTransform: "uppercase",
                          marginBottom: "12px",
                        }}
                      >
                        {prod.cat}
                      </div>
                      <div
                        style={{
                          fontSize: "28px",
                          fontWeight: 800,
                          color: "#20252B",
                          letterSpacing: "-1px",
                          marginBottom: "12px",
                        }}
                      >
                        {prod.name}
                      </div>
                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: 1.6,
                          color: "#66717D",
                          marginBottom: "28px",
                        }}
                      >
                        {prod.desc}
                      </p>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: softwareColors[i],
                        }}
                      >
                        {prod.cta}
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={200}>
            <div style={{ textAlign: "center", marginTop: "48px" }}>
              <Link
                to="/solucoes/softwares"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  border: "1.5px solid #005FA8",
                  color: "#005FA8",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 700,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.background =
                    "#005FA8"
                  ;(e.currentTarget as HTMLAnchorElement).style.color =
                    "#FFFFFF"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.background =
                    "transparent"
                  ;(e.currentTarget as HTMLAnchorElement).style.color =
                    "#005FA8"
                }}
              >
                {t("software.viewAll")}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PAYMENTS */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "120px 0",
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
                    background: "#FFF0F0",
                    color: "#C00000",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "24px",
                  }}
                >
                  {t("payments.badge")}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(32px, 3vw, 48px)",
                    fontWeight: 800,
                    letterSpacing: "-1.5px",
                    lineHeight: 1.1,
                    color: "#20252B",
                    marginBottom: "24px",
                  }}
                >
                  {t("payments.title1")}
                  <br />
                  <span style={{ color: "#005FA8" }}>
                    {t("payments.title2")}
                  </span>
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.75,
                    color: "#66717D",
                    marginBottom: "32px",
                  }}
                >
                  {t("payments.desc")}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    marginBottom: "36px",
                  }}
                >
                  {(t("payments.features", {
                    returnObjects: true,
                  }) as string[]).map((item, i) => (
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
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/solucoes/pagamentos/cashlogy"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    background: "#073B63",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.background =
                      "#005FA8")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.background =
                      "#073B63")
                  }
                >
                  {t("payments.cta")}
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={120}>
              <div style={{ position: "relative" }}>
                <div
                  className="home-payment-image"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "#F5F7F9",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src="https://cashlogy.com/wp-content/uploads/2023/03/solution-2.png"
                    alt="Sistema automático de gestão de pagamentos"
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "-16px",
                    right: "-16px",
                    background: "#C00000",
                    color: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "12px 20px",
                    boxShadow: "0 8px 24px rgba(192,0,0,0.3)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      opacity: 0.8,
                      textTransform: "uppercase",
                      marginBottom: "2px",
                    }}
                  >
                    Cashlogy
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700 }}>
                    {t("payments.floatLabel")}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ROBOTICS */}
      <section
        style={{
          background: "#073B63",
          padding: "120px 0",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-50%",
              right: "-20%",
              width: "800px",
              height: "800px",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-40%",
              left: "-10%",
              width: "600px",
              height: "600px",
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
                className="home-robotics-visual"
                style={{ position: "relative" }}
              >
                <div
                  className="home-robotics-image"
                  style={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
                  }}
                >
                  <img
                    src={puduPhoto}
                    alt="Robô de serviço Pudu Robotics"
                    style={{
                      width: "100%",
                      height: "560px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                {[
                  { label: "ROBÓTICA", top: "10%", left: "-24px" },
                  { label: "AUTOMAÇÃO", bottom: "25%", right: "-24px" },
                  { label: "EFICIÊNCIA", bottom: "10%", left: "10%" },
                ].map((l, i) => (
                  <div
                    key={i}
                    className="home-robotics-label"
                    style={{
                      position: "absolute",
                      ...(l.top ? { top: l.top } : {}),
                      ...(l.bottom ? { bottom: l.bottom } : {}),
                      ...(l.left ? { left: l.left } : {}),
                      ...(l.right ? { right: l.right } : {}),
                      padding: "6px 12px",
                      background: "rgba(0,95,168,0.9)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "6px",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "2px",
                      color: "#FFFFFF",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {l.label}
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={120}>
              <div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "24px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {t("robotics.badge")}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(32px, 3vw, 52px)",
                    fontWeight: 800,
                    letterSpacing: "-1.5px",
                    lineHeight: 1.1,
                    color: "#FFFFFF",
                    marginBottom: "24px",
                  }}
                >
                  {t("robotics.title1")}
                  <br />
                  <span
                    style={{ color: "rgba(255,255,255,0.5)", fontWeight: 300 }}
                  >
                    {t("robotics.title2")}
                  </span>
                  <br />
                  {t("robotics.title3")}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.65)",
                    marginBottom: "32px",
                  }}
                >
                  {t("robotics.desc")}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "36px",
                  }}
                >
                  {roboticsContexts.map((ctx, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "14px 16px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.8)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#C00000",
                        }}
                      />
                      {ctx}
                    </div>
                  ))}
                </div>
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
                  {t("robotics.cta")}
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ACCOMPANIMENT */}
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
                {t("accompaniment.badge")}
              </div>
              <h2
                style={{
                  fontSize: "clamp(32px, 3.5vw, 52px)",
                  fontWeight: 800,
                  letterSpacing: "-1.5px",
                  lineHeight: 1.1,
                  color: "#20252B",
                  marginBottom: "16px",
                }}
              >
                {t("accompaniment.title1")}
                <br />
                <span style={{ color: "#66717D", fontWeight: 300 }}>
                  {t("accompaniment.title2")}
                </span>
              </h2>
            </div>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid #EEF1F4",
            }}
          >
            {accompanimentSteps.map((step, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div
                  style={{
                    padding: "40px 32px",
                    background: i % 2 === 0 ? "#FFFFFF" : "#F5F7F9",
                    borderRight: i < 3 ? "1px solid #EEF1F4" : "none",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      color: "#C00000",
                      marginBottom: "20px",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {step.num}
                  </div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 800,
                      color: "#20252B",
                      letterSpacing: "-0.5px",
                      marginBottom: "12px",
                    }}
                  >
                    {step.title}
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.65,
                      color: "#66717D",
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          background: "#073B63",
          padding: "120px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "800px",
              height: "800px",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "1100px",
              height: "1100px",
              border: "1px solid rgba(255,255,255,0.02)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "400px",
              height: "4px",
              background: "linear-gradient(90deg, transparent, #C00000)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "400px",
              height: "4px",
              background: "linear-gradient(90deg, #C00000, transparent)",
            }}
          />
        </div>

        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 32px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <FadeIn>
            <div
              style={{
                display: "inline-block",
                padding: "5px 12px",
                borderRadius: "6px",
                background: "rgba(192,0,0,0.15)",
                color: "#FF6B6B",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "24px",
                border: "1px solid rgba(192,0,0,0.2)",
              }}
            >
              {t("finalCta.badge")}
            </div>
            <h2
              style={{
                fontSize: "clamp(36px, 4vw, 60px)",
                fontWeight: 800,
                letterSpacing: "-2px",
                lineHeight: 1.08,
                color: "#FFFFFF",
                marginBottom: "20px",
              }}
            >
              {t("finalCta.title")}
            </h2>
            <p
              style={{
                fontSize: "17px",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "48px",
                maxWidth: "480px",
                margin: "0 auto 48px",
              }}
            >
              {t("finalCta.desc")}
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
                  padding: "16px 36px",
                  background: "#C00000",
                  color: "#FFFFFF",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: 700,
                  transition: "all 0.2s",
                  letterSpacing: "-0.3px",
                  boxShadow: "0 4px 24px rgba(192,0,0,0.4)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.background =
                    "#A00000"
                  ;(e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.background =
                    "#C00000"
                  ;(e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(0)"
                }}
              >
                {tc("cta.talkSpecialist")}
              </Link>
              <Link
                to="/solucoes"
                style={{
                  padding: "16px 36px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#FFFFFF",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: 600,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,255,255,0.12)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,255,255,0.08)")
                }
              >
                {tc("cta.viewSolutions")}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
