import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { LANGUAGES, setLanguage } from "../i18n"
import icon from "../../src/public/photos/icon.png"

export default function Header() {
  const { t, i18n } = useTranslation("common")
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSolOpen, setMobileSolOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const location = useLocation()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
    setLangOpen(false)
  }, [location.pathname])

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node))
        setLangOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleMegaEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setMegaOpen(true)
  }
  const handleMegaLeave = () => {
    timeoutRef.current = setTimeout(() => setMegaOpen(false), 120)
  }

  const currentLang =
    LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0]
  const isScrolledOrMobile = scrolled || mobileOpen

  const textColor = isScrolledOrMobile ? "#20252B" : "#FFFFFF"
  const titleColor = isScrolledOrMobile ? "#005FA8" : "#FFFFFF"
  const activeTextColor = isScrolledOrMobile ? "#005FA8" : "#FFFFFF"

  const solutions = {
    software: {
      label: t("mega.software"),
      items: [
        {
          name: t("names.winrest"),
          desc: t("mega.winrest_desc"),
          path: "/solucoes/softwares/winrest",
        },
        {
          name: t("names.xd"),
          desc: t("mega.xd_desc"),
          path: "/solucoes/softwares/xd",
        },
        {
          name: t("names.zonesoft"),
          desc: t("mega.zonesoft_desc"),
          path: "/solucoes/softwares/zonesoft",
        },
      ],
    },
    pagamentos: {
      label: t("mega.payments"),
      items: [
        {
          name: t("names.cashlogy"),
          desc: t("mega.cashlogy_desc"),
          path: "/solucoes/pagamentos/cashlogy",
        } /* 
        {
          name: "Caixa Automática Compact",
          desc: t("mega.compact_desc"),
          path: "/solucoes/pagamentos/compact",
        }, */,
        /* {
          name: "Instalação e Logística",
          desc: t("mega.entrega_desc"),
          path: "/solucoes/pagamentos/entrega",
        }, */
      ],
    },
    robotica: {
      label: t("mega.robotics"),
      items: [
        {
          name: t("names.pudu"),
          desc: t("mega.pudu_desc"),
          path: "/solucoes/robotica",
        },
      ],
    },

    cibersegurança: {
      label: t("names.ciberseguranca"),
      items: [
        {
          name: t("mega.cybersecurityInfrastructure"),
          desc: t("mega.cybersecurityInfrastructureDesc"),
          path: "/solucoes/ciberseguranca-infraestrutura",
        },
      ],
    },
    gestao: {
      label: t("names.sistema_ponto"),
      items: [
        {
          name: "Sistema Ponto",
          desc: t("mega.sistema_ponto_desc"),
          path: "/solucoes/sistema-ponto",
        },
      ],
    },
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolledOrMobile
            ? "rgba(255,255,255,0.96)"
            : "transparent",
          backdropFilter: isScrolledOrMobile ? "blur(12px)" : "none",
          borderBottom: isScrolledOrMobile
            ? "1px solid #E2E8F0"
            : "1px solid transparent",
          boxShadow: isScrolledOrMobile
            ? "0 1px 24px rgba(0,0,0,0.06)"
            : "none",
        }}
      >
        <div
          className="ia-header-container"
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "72px",
            }}
          >
            {/* Logo */}
            <Link
              to="/"
              aria-label="InforAntunes — Home"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  /* background: "#005FA8", */
                  background: "#F6F9FC",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
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
                  color: titleColor,
                }}
              >
                Infor<span style={{ color: "#C00000" }}>Antunes</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav
              aria-label="Navegação principal"
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
              className="ia-hidden-mobile"
            >
              {([
                { key: "home", path: "/" },
                { key: "about", path: "/sobre" },
                { key: "services", path: "/servicos" },
                { key: "contact", path: "/contactos" },
              ] as const).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 500,
                    transition: "all 0.2s",
                    color:
                      location.pathname === link.path
                        ? activeTextColor
                        : textColor,
                    background:
                      location.pathname === link.path && scrolled
                        ? "#EEF6FF"
                        : "transparent",
                    opacity:
                      location.pathname === link.path ? 1 : scrolled ? 1 : 0.9,
                  }}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}

              {/* Soluções mega menu */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={handleMegaEnter}
                onMouseLeave={handleMegaLeave}
              >
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: "none",
                    background:
                      megaOpen && scrolled ? "#EEF6FF" : "transparent",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: location.pathname.startsWith("/solucoes")
                      ? activeTextColor
                      : textColor,
                    transition: "all 0.2s",
                  }}
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                >
                  {t("nav.solutions")}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    style={{
                      transform: megaOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  >
                    <path
                      d="M2 4l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {megaOpen && (
                  <div
                    role="menu"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "680px",
                      background: "#FFFFFF",
                      borderRadius: "16px",
                      padding: "28px",
                      boxShadow: "0 24px 64px rgba(0,0,0,0.12)",
                      border: "1px solid #E2E8F0",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "24px",
                      animation: "ia-fadeInDown 0.18s ease",
                    }}
                    onMouseEnter={handleMegaEnter}
                    onMouseLeave={handleMegaLeave}
                  >
                    {Object.entries(solutions).map(([key, section]) => (
                      <div key={key}>
                        <div
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "1.5px",
                            color: "#66717D",
                            textTransform: "uppercase",
                            marginBottom: "12px",
                          }}
                        >
                          {section.label}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                          }}
                        >
                          {section.items.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              role="menuitem"
                              style={{ textDecoration: "none" }}
                            >
                              <div
                                style={{
                                  padding: "8px 10px",
                                  borderRadius: "8px",
                                  transition: "background 0.15s",
                                }}
                                onMouseEnter={(e) =>
                                  ((e.currentTarget as HTMLDivElement).style.background =
                                    "#F5F7F9")
                                }
                                onMouseLeave={(e) =>
                                  ((e.currentTarget as HTMLDivElement).style.background =
                                    "transparent")
                                }
                              >
                                <div
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "#20252B",
                                  }}
                                >
                                  {item.name}
                                </div>
                                <div
                                  style={{
                                    fontSize: "11px",
                                    color: "#66717D",
                                    marginTop: "1px",
                                  }}
                                >
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right: Lang switcher + CTA + mobile hamburger */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* Language switcher */}
              <div
                ref={langRef}
                style={{ position: "relative" }}
                className="ia-hidden-mobile"
              >
                <button
                  onClick={() => setLangOpen((o) => !o)}
                  aria-expanded={langOpen}
                  aria-label="Select language"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "7px 12px",
                    borderRadius: "8px",
                    border: `1px solid ${
                      scrolled ? "#E2E8F0" : "rgba(255,255,255,0.25)"
                    }`,
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    color: textColor,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLButtonElement).style.background =
                      scrolled ? "#F5F7F9" : "rgba(255,255,255,0.1)"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLButtonElement).style.background =
                      "transparent"
                  }}
                >
                  <span style={{ fontSize: "14px" }}>{currentLang.flag}</span>
                  {currentLang.short}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden="true"
                    style={{
                      transform: langOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  >
                    <path
                      d="M1.5 3.5l3.5 3.5 3.5-3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {langOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      background: "#FFFFFF",
                      borderRadius: "12px",
                      padding: "8px",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                      border: "1px solid #E2E8F0",
                      minWidth: "150px",
                      animation: "ia-fadeInDown 0.15s ease",
                    }}
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code)
                          setLangOpen(false)
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          width: "100%",
                          padding: "9px 12px",
                          borderRadius: "8px",
                          border: "none",
                          background:
                            i18n.language === lang.code
                              ? "#EEF6FF"
                              : "transparent",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: 600,
                          color:
                            i18n.language === lang.code ? "#005FA8" : "#20252B",
                          transition: "background 0.15s",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => {
                          if (i18n.language !== lang.code)
                            (e.currentTarget as HTMLButtonElement).style.background =
                              "#F5F7F9"
                        }}
                        onMouseLeave={(e) => {
                          if (i18n.language !== lang.code)
                            (e.currentTarget as HTMLButtonElement).style.background =
                              "transparent"
                        }}
                      >
                        <span style={{ fontSize: "18px" }}>{lang.flag}</span>
                        {lang.label}
                        {i18n.language === lang.code && (
                          <span
                            style={{ marginLeft: "auto", color: "#005FA8" }}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M2 6.5l2.5 2.5L10 3"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="https://github.com/InforAntunes/SupremoInforantunes/releases/download/v1.0.0/Inforantunes.exe"
                className="ia-support-cta"
                style={{
                  padding: "9px 20px",
                  background: "#C00000",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  transition: "all 0.2s",
                  letterSpacing: "-0.2px",
                  display: "inline-block",
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
                {t("nav.suportCta")}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="ia-show-mobile"
                style={{
                  display: "none",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "8px",
                  color: textColor,
                }}
                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileOpen}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  aria-hidden="true"
                >
                  {mobileOpen ? (
                    <>
                      <path
                        d="M4 4l14 14M18 4L4 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        d="M3 6h16M3 11h16M3 16h16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 40,
            background: "#FFFFFF",
            paddingTop: "80px",
            overflowY: "auto",
            animation: "ia-slideDown 0.25s ease",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <div style={{ padding: "24px 24px 48px" }}>
            {/* Lang switcher mobile */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "24px",
                paddingBottom: "24px",
                borderBottom: "1px solid #EEF1F4",
              }}
            >
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: "1.5px solid",
                    borderColor:
                      i18n.language === lang.code ? "#005FA8" : "#E2E8F0",
                    background:
                      i18n.language === lang.code ? "#EEF6FF" : "transparent",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: i18n.language === lang.code ? "#005FA8" : "#66717D",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>{lang.flag}</span>
                  {lang.short}
                </button>
              ))}
            </div>

            {([
              { key: "home", path: "/" },
              { key: "about", path: "/sobre" },
              { key: "services", path: "/servicos" },
              { key: "contact", path: "/contactos" },
            ] as const).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  display: "block",
                  padding: "16px 0",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#20252B",
                  textDecoration: "none",
                  borderBottom: "1px solid #EEF1F4",
                }}
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}

            <div>
              <button
                onClick={() => setMobileSolOpen((o) => !o)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "16px 0",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#20252B",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid #EEF1F4",
                  cursor: "pointer",
                }}
              >
                {t("nav.solutions")}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  style={{
                    transform: mobileSolOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s",
                  }}
                >
                  <path
                    d="M3 6l6 6 6-6"
                    stroke="#66717D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {mobileSolOpen && (
                <div style={{ paddingLeft: "16px" }}>
                  {Object.entries(solutions).map(([key, section]) => (
                    <div key={key} style={{ marginTop: "16px" }}>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "1.2px",
                          color: "#66717D",
                          textTransform: "uppercase",
                          marginBottom: "8px",
                        }}
                      >
                        {section.label}
                      </div>
                      {section.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          style={{
                            display: "block",
                            padding: "10px 0",
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "#20252B",
                            textDecoration: "none",
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contactos"
              style={{
                display: "block",
                marginTop: "32px",
                padding: "16px",
                background: "#C00000",
                color: "#FFFFFF",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {t("nav.contactCta")}
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ia-fadeInDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes ia-slideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .ia-hidden-mobile { display: none !important; }
          .ia-show-mobile { display: flex !important; }
        }
        @media (max-width: 380px) {
          .ia-header-container { padding: 0 16px !important; }
          .ia-support-cta {
            padding: 7px 10px !important;
            font-size: 12px !important;
            white-space: nowrap;
          }
        }
        @media (min-width: 901px) {
          .ia-show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
