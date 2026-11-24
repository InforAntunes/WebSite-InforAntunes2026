import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import icon from "../../src/public/photos/icon.png"

export default function Footer() {
  const { t } = useTranslation("common")

  return (
    <footer style={{ background: "#073B63", color: "#FFFFFF" }}>
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "64px 32px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.2fr",
            gap: "48px",
            marginBottom: "56px",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "#F6F9FC",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={icon}
                  alt="InforAntunes Logo"
                  style={{ width: "1.8rem", height: "1.8rem" }}
                />
              </div>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "18px",
                  letterSpacing: "-0.5px",
                }}
              >
                Infor<span style={{ color: "#C00000" }}>Antunes</span>
              </span>
            </div>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.7",
                color: "rgba(255,255,255,0.6)",
                maxWidth: "280px",
                marginBottom: "24px",
              }}
            >
              {t("footer.tagline")}
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {[
                {
                  icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                  text: t("footer.address"),
                },
                {
                  icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                  text: t("footer.phone"),
                },
                {
                  icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  text: t("footer.email"),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ flexShrink: 0, marginTop: "2px" }}
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
                  <span
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: "1.5",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              {t("footer.company")}
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {([
                { key: "about", path: "/sobre" },
                { key: "services", path: "/servicos" },
                { key: "solutions", path: "/solucoes" },
                { key: "contact", path: "/contactos" },
              ] as const).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "#FFFFFF")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(255,255,255,0.7)")
                  }
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              {t("nav.solutions")}
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                {
                  label: t("breadcrumb.software"),
                  path: "/solucoes/softwares",
                },
                { label: "Cashlogy", path: "/solucoes/pagamentos/cashlogy" },
                { label: "Pudu Robotics", path: "/solucoes/robotica" },
                { label: "Sistema Ponto", path: "/solucoes/sistema-ponto" },
                {
                  label: t("mega.cybersecurityInfrastructure"),
                  path: "/solucoes/ciberseguranca-infraestrutura",
                },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "#FFFFFF")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(255,255,255,0.7)")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Recognitions */}
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              {t("footer.recognition")}
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                t("badge.pme_lider"),
                t("badge.pme_excelencia"),
                t("badge.pagamento_pontual"),
              ].map((badge) => (
                <div
                  key={badge}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#C00000",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} InforAntunes — {t("footer.allRights")}
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {([
              { key: "privacy", path: "/privacidade" },
              { key: "terms", path: "/termos" },
              { key: "cookies", path: "/cookies" },
              {
                key: "book",
                path: "https://www.livroreclamacoes.pt/inicio/",
              },
              { key: "consumer", path: "/informacoes-consumidor" },
            ] as const).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                target={link.key == "book" ? "_blank" : ""}
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(255,255,255,0.8)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(255,255,255,0.4)")
                }
              >
                {t(`footer.${link.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
