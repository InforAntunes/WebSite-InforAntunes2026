import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}>
      {children}
    </div>
  );
}

const productImages = [
  "https://img.magnific.com/fotos-premium/barista-africano-atraente-sorridente-em-pe-atras-do-balcao-de-uma-cafeteria_171337-98597.jpg?semt=ais_hybrid&w=740&q=80",
  "https://img.magnific.com/fotos-gratis/trabalhador-de-supermercado-medindo-e-vendendo-carne-para-o-cliente_342744-1074.jpg?semt=ais_hybrid&w=740&q=80",
  "https://img.magnific.com/fotos-gratis/barista-feminina-com-tablet-fazendo-encomenda-em-uma-cafeteria_1303-31247.jpg?t=st=1790616663~exp=1790620263~hmac=0374af07ccbddc3e6f083e6f658c9dbdf8b94dc71f93f2cfb54f4f4dc0cdfc77&w=2000 2000w",
];
const productPaths = [
  "/solucoes/softwares/winrest",
  "/solucoes/softwares/xd",
  "/solucoes/softwares/zonesoft",
];
const productColors = ["#005FA8", "#073B63", "#005FA8", "#073B63"];

export default function SoftwaresPage() {
  const { t } = useTranslation("solutions");
  const { t: tc } = useTranslation("common");

  const products = t("software.products", { returnObjects: true }) as Array<{
    cat: string;
    name: string;
    desc: string;
    tags: string[];
  }>;

  return (
    <div>
      <section
        style={{
          background: "linear-gradient(135deg, #073B63 0%, #005FA8 100%)",
          padding: "160px 0 100px",
          position: "relative",
          overflow: "hidden",
        }}>
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
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "48px",
            }}>
            <Link
              to="/"
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
              }}>
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
              }}>
              {tc("breadcrumb.solutions")}
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
              /
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
              {tc("breadcrumb.software")}
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
              }}>
              {t("software.hero.title")}
            </h1>
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.65)",
              }}>
              {t("software.hero.desc")}
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: "#FFFFFF", padding: "80px 0 120px" }}>
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {products.map((prod, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "64px",
                    alignItems: "center",
                    direction: i % 2 === 0 ? "ltr" : "rtl",
                  }}>
                  <div style={{ direction: "ltr" }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "1.5px",
                        color: productColors[i],
                        textTransform: "uppercase",
                        marginBottom: "12px",
                      }}>
                      {prod.cat}
                    </div>
                    <h2
                      style={{
                        fontSize: "clamp(28px, 3vw, 44px)",
                        fontWeight: 800,
                        letterSpacing: "-1px",
                        color: "#20252B",
                        marginBottom: "16px",
                        lineHeight: 1.1,
                      }}>
                      {prod.name}
                    </h2>
                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.75,
                        color: "#66717D",
                        marginBottom: "24px",
                      }}>
                      {prod.desc}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginBottom: "28px",
                      }}>
                      {prod.tags.map((tag, j) => (
                        <div
                          key={j}
                          style={{
                            padding: "5px 12px",
                            borderRadius: "6px",
                            background:
                              productColors[i] === "#005FA8"
                                ? "#EEF6FF"
                                : "#EEF1F4",
                            color: productColors[i],
                            fontSize: "12px",
                            fontWeight: 700,
                          }}>
                          {tag}
                        </div>
                      ))}
                    </div>
                    <Link
                      to={productPaths[i]}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "12px 24px",
                        background: productColors[i],
                        color: "#FFFFFF",
                        borderRadius: "10px",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: 700,
                        transition: "all 0.2s",
                        opacity: 0.95,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.opacity =
                          "1";
                        (e.currentTarget as HTMLAnchorElement).style.transform =
                          "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.opacity =
                          "0.95";
                        (e.currentTarget as HTMLAnchorElement).style.transform =
                          "translateY(0)";
                      }}>
                      {t("software.ctaPrefix")} {prod.name} →
                    </Link>
                  </div>
                  <div
                    style={{
                      direction: "ltr",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
                      background: "#F5F7F9",
                    }}>
                    <img
                      src={productImages[i]}
                      alt={`${prod.name} — interface`}
                      style={{
                        width: "100%",
                        height: "340px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
                {i < products.length - 1 && (
                  <div
                    style={{
                      height: "1px",
                      background: "#EEF1F4",
                      marginTop: "48px",
                    }}
                  />
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .prod-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
        }
      `}</style>
    </div>
  );
}
