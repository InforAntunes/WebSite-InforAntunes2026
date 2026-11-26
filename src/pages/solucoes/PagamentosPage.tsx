import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
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

const productPaths = [
  "/solucoes/pagamentos/cashlogy",
  "/solucoes/pagamentos/entrega",
]
const productColors = ["#005FA8", "#073B63", "#005FA8"]
const productImages = [
  "https://cashlogy.com/wp-content/uploads/2023/03/solution-2.png",
  "https://cashlogy.com/wp-content/uploads/2023/03/free-1.png",
  "https://cashlogy.com/wp-content/uploads/2023/03/free-1.png",
]

export default function PagamentosPage() {
  const { t } = useTranslation("solutions")
  const { t: tc } = useTranslation("common")

  const products = t("payments.products", { returnObjects: true }) as Array<{
    name: string
    desc: string
    features: string[]
  }>

  return (
    <div>
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
            <Link
              to="/solucoes"
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
              }}
            >
              {tc("breadcrumb.solutions")}
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
              /
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
              {tc("breadcrumb.payments")}
            </span>
          </div>
          <div style={{ maxWidth: "640px" }}>
            <h1
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                fontWeight: 800,
                letterSpacing: "-2px",
                lineHeight: 1.08,
                color: "#FFFFFF",
                marginBottom: "20px",
              }}
            >
              {t("payments.hero.title1")}
              <br />
              <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>
                {t("payments.hero.title2")}
              </span>
            </h1>
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {t("payments.hero.desc")}
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: "#FFFFFF", padding: "80px 0 120px" }}>
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px",
            }}
          >
            {products.map((prod, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div
                  style={{
                    background: "#F5F7F9",
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
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = "translateY(0)"
                    el.style.boxShadow = "none"
                  }}
                >
                  <div
                    style={{ height: "4px", background: productColors[i] }}
                  />
                  <img
                    src={productImages[i]}
                    alt={`${prod.name} — equipamento de pagamento automático`}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div style={{ padding: "28px" }}>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 800,
                        color: "#20252B",
                        letterSpacing: "-0.5px",
                        marginBottom: "10px",
                      }}
                    >
                      {prod.name}
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.65,
                        color: "#66717D",
                        marginBottom: "20px",
                      }}
                    >
                      {prod.desc}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        marginBottom: "24px",
                      }}
                    >
                      {prod.features.map((f, j) => (
                        <div
                          key={j}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "13px",
                            color: "#20252B",
                          }}
                        >
                          <div
                            style={{
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              background: productColors[i],
                              flexShrink: 0,
                            }}
                          />
                          {f}
                        </div>
                      ))}
                    </div>
                    <Link
                      to={productPaths[i]}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: productColors[i],
                        textDecoration: "none",
                      }}
                    >
                      {tc("cta.knowMore")} →
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#073B63", padding: "80px 0" }}>
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 32px",
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <FadeIn>
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 40px)",
                fontWeight: 800,
                letterSpacing: "-1px",
                color: "#FFFFFF",
                marginBottom: "16px",
              }}
            >
              {t("payments.ctaTitle")}
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "32px",
              }}
            >
              {t("payments.ctaDesc")}
            </p>
            <SolutionLeadModal
              type="payments"
              source="payments"
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
              {tc("cta.requestDemo")} →
            </SolutionLeadModal>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
