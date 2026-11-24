import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import SolutionLeadModal, {
  type LeadFormType,
  type LeadSource,
  type LeadSubmission,
} from "../../components/SolutionLeadModal"

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

export interface ProductConfig {
  name: string
  category: string
  tagline: string
  description: string
  heroImage: string
  heroImageAlt?: string
  features: string[]
  applications: string[]
  accentColor: string
  breadcrumb: {
  label: string
  path: string
}[]
  featuresTitle?: string
  sectorsTitle?: string
  ctaTitle?: string
  ctaDesc?: string
  platformsLabel?: string
  platformsTitle?: string
  platforms?: Array<{
  title: string
  description: string
  items: string[]
}>
  primaryCta?: string
  secondaryCta?: string
  interventionAreas?: {
  label: string
  title: string
  items: string[]
}
  otherSolutionsPath?: string
  leadForm?: LeadFormType
  leadFormSource?: LeadSource
  onSubmitLead?: (submission: LeadSubmission) => Promise<void> | void
}

export default function ProductPage({ product }: { product: ProductConfig }) {
  const { t } = useTranslation("solutions")
  const { t: tc } = useTranslation("common")
  const featureSections = [
    {
      label: t("productPage.featuresLabel"),
      title:
        product.featuresTitle ||
        `${t("productPage.ctaTitle")} ${product.name}.`,
      items: product.features,
    },
    ...(product.interventionAreas ? [product.interventionAreas] : []),
  ]

  return (
    <div>
      {/* HERO */}
      <section
        style={{
          background: `linear-gradient(135deg, #073B63 0%, ${product.accentColor} 100%)`,
          padding: "160px 0 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                style={{
                  position: "absolute",
                  top: `${10 + row * 22}%`,
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
              flexWrap: "wrap",
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
            {product.breadcrumb.map((bc, i) => (
              <span
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}
                >
                  /
                </span>
                {i < product.breadcrumb.length - 1 ? (
                  <Link
                    to={bc.path}
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                    }}
                  >
                    {bc.label}
                  </Link>
                ) : (
                  <span
                    style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}
                  >
                    {bc.label}
                  </span>
                )}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "64px",
              alignItems: "flex-end",
            }}
          >
            <div style={{ paddingBottom: "80px" }}>
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
                  marginBottom: "20px",
                }}
              >
                {product.category}
              </div>
              <h1
                style={{
                  fontSize: "clamp(44px, 5vw, 72px)",
                  fontWeight: 900,
                  letterSpacing: "-2.5px",
                  lineHeight: 1,
                  color: "#FFFFFF",
                  marginBottom: "20px",
                }}
              >
                {product.name}
              </h1>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: "12px",
                  lineHeight: 1.4,
                }}
              >
                {product.tagline}
              </p>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "36px",
                  maxWidth: "440px",
                }}
              >
                {product.description}
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {product.leadForm && product.leadFormSource ? (
                  <>
                    <SolutionLeadModal
                      type={product.leadForm}
                      source={product.leadFormSource}
                      onSubmitLead={product.onSubmitLead}
                      style={{
                        padding: "12px 24px",
                        background: "#C00000",
                        border: "none",
                        color: "#FFFFFF",
                        borderRadius: "10px",
                        fontFamily: "inherit",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: 700,
                        transition: "all 0.2s",
                      }}
                    >
                      {product.primaryCta || t("productPage.demoBtn")}
                    </SolutionLeadModal>
                    <SolutionLeadModal
                      type={product.leadForm}
                      source={product.leadFormSource}
                      onSubmitLead={product.onSubmitLead}
                      style={{
                        padding: "12px 24px",
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "#FFFFFF",
                        borderRadius: "10px",
                        fontFamily: "inherit",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: 600,
                        transition: "all 0.2s",
                      }}
                    >
                      {product.secondaryCta || t("productPage.specialistBtn")}
                    </SolutionLeadModal>
                  </>
                ) : (
                  <>
                    <Link
                      to="/contactos"
                      style={{
                        padding: "12px 24px",
                        background: "#C00000",
                        color: "#FFFFFF",
                        borderRadius: "10px",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: 700,
                        transition: "all 0.2s",
                      }}
                    >
                      {product.primaryCta || t("productPage.demoBtn")}
                    </Link>
                    <Link
                      to="/contactos"
                      style={{
                        padding: "12px 24px",
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "#FFFFFF",
                        borderRadius: "10px",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: 600,
                        transition: "all 0.2s",
                      }}
                    >
                      {product.secondaryCta || t("productPage.specialistBtn")}
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div style={{ alignSelf: "flex-end" }}>
              <div
                style={{
                  borderRadius: "20px 20px 0 0",
                  overflow: "hidden",
                  boxShadow: "0 -16px 48px rgba(0,0,0,0.2)",
                  background: "#0A4F84",
                }}
              >
                <img
                  src={product.heroImage}
                  alt={product.heroImageAlt || `${product.name} — interface`}
                  style={{
                    width: "100%",
                    height: "380px",
                    objectFit: "cover",
                    display: "block",
                    opacity: 0.9,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature and intervention cards share the product layout. */}
      {featureSections.map((section, sectionIndex) => (
        <section
          key={sectionIndex}
          className="product-feature-section"
          style={{ background: "#FFFFFF", padding: "100px 0" }}
        >
          <div
            style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
          >
            <FadeIn>
              <div style={{ marginBottom: "64px" }}>
                <div
                  style={{
                    display: "inline-block",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    background: "#EEF6FF",
                    color: product.accentColor,
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  {section.label}
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
                  {section.title}
                </h2>
              </div>
            </FadeIn>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              {section.items.map((feat, i) => (
                <FadeIn key={i} delay={i * 60}>
                  <div
                    style={{
                      padding: "24px",
                      borderRadius: "14px",
                      background: "#F5F7F9",
                      border: "1px solid #E2E8F0",
                      transition: "all 0.25s",
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.background = "#EEF6FF"
                      el.style.borderColor = product.accentColor
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.background = "#F5F7F9"
                      el.style.borderColor = "#E2E8F0"
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 6.5l2.5 2.5L10 3"
                          stroke={product.accentColor}
                          strokeWidth="1.8"
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
                        fontWeight: 500,
                      }}
                    >
                      {feat}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ))}

      {product.platforms && product.platforms.length > 0 && (
        <section style={{ background: "#F5F7F9", padding: "80px 0 100px" }}>
          <div
            style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
          >
            <FadeIn>
              <div style={{ marginBottom: "56px" }}>
                <div
                  style={{
                    display: "inline-block",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    background: "#EEF6FF",
                    color: product.accentColor,
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  {product.platformsLabel}
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
                  {product.platformsTitle}
                </h2>
              </div>
            </FadeIn>
            <div className="product-platform-grid">
              {product.platforms.map((platform, index) => (
                <FadeIn key={platform.title} delay={index * 80}>
                  <div className="product-platform-card">
                    <div className="product-platform-icon" aria-hidden="true">
                      {index === 0 ? (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <rect
                            x="6"
                            y="2"
                            width="12"
                            height="20"
                            rx="3"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          />
                          <path
                            d="M10 18h4"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="23"
                          height="23"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <rect
                            x="2"
                            y="3"
                            width="20"
                            height="15"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          />
                          <path
                            d="M8 22h8M12 18v4"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </div>
                    <h3>{platform.title}</h3>
                    <p>{platform.description}</p>
                    <div className="product-platform-items">
                      {platform.items.map((item) => (
                        <div key={item}>
                          <span aria-hidden="true" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* APPLICATIONS */}
      <section style={{ background: "#F5F7F9", padding: "80px 0 100px" }}>
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
                {t("productPage.sectorsLabel")}
              </div>
              <h2
                style={{
                  fontSize: "clamp(24px, 2.5vw, 36px)",
                  fontWeight: 800,
                  letterSpacing: "-0.8px",
                  lineHeight: 1.15,
                  color: "#20252B",
                }}
              >
                {product.sectorsTitle ||
                  `${t("productPage.forWhom")} ${product.name}?`}
              </h2>
            </div>
          </FadeIn>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            {product.applications.map((app, i) => (
              <FadeIn key={i} delay={i * 40}>
                <div
                  style={{
                    padding: "10px 20px",
                    borderRadius: "100px",
                    background: "#FFFFFF",
                    border: "1.5px solid #E2E8F0",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#20252B",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = product.accentColor
                    el.style.color = product.accentColor
                    el.style.background = "#EEF6FF"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = "#E2E8F0"
                    el.style.color = "#20252B"
                    el.style.background = "#FFFFFF"
                  }}
                >
                  {app}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
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
              {product.ctaTitle ||
                `${t("productPage.ctaTitle")} ${product.name}?`}
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "36px",
              }}
            >
              {product.ctaDesc || t("productPage.ctaDesc")}
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {product.leadForm && product.leadFormSource ? (
                <SolutionLeadModal
                  type={product.leadForm}
                  source={product.leadFormSource}
                  onSubmitLead={product.onSubmitLead}
                  style={{
                    padding: "14px 32px",
                    background: "#C00000",
                    border: "none",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    fontFamily: "inherit",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: 700,
                    transition: "all 0.2s",
                    boxShadow: "0 4px 16px rgba(192,0,0,0.4)",
                  }}
                >
                  {product.primaryCta || t("productPage.demoBtn")}
                </SolutionLeadModal>
              ) : (
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
                    boxShadow: "0 4px 16px rgba(192,0,0,0.4)",
                  }}
                >
                  {product.primaryCta || t("productPage.demoBtn")}
                </Link>
              )}
              <Link
                to={product.otherSolutionsPath || "/solucoes/softwares"}
                style={{
                  padding: "14px 32px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#FFFFFF",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontSize: "15px",
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
                {t("productPage.viewOthers")}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section:first-child > div > div:last-child { grid-template-columns: 1fr !important; }
          section:first-child > div > div:last-child > div:last-child { display: none; }
          .product-feature-section > div > div:last-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .product-feature-section > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
