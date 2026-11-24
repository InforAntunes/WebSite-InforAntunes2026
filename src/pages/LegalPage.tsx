import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

interface LegalPageProps {
  titleKey: string;
  breadcrumbKey: string;
  paragraphKeys: string[];
  linkKeys?: string[];
}

export default function LegalPage({
  titleKey,
  breadcrumbKey,
  paragraphKeys,
  linkKeys = [],
}: LegalPageProps) {
  const { t } = useTranslation("legal");
  const { t: tc } = useTranslation("common");
  const pageKey = titleKey.slice(0, titleKey.lastIndexOf("."));
  const hasLinks = t(`${pageKey}.link`) === "True";

  return (
    <div>
      <section
        style={{
          background: "linear-gradient(135deg, #073B63 0%, #005FA8 100%)",
          padding: "140px 0 80px",
        }}>
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "32px",
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
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
              {t(breadcrumbKey)}
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              color: "#FFFFFF",
            }}>
            {t(titleKey)}
          </h1>
        </div>
      </section>
      <section style={{ background: "#FFFFFF", padding: "80px 0 120px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 32px" }}>
          <div
            style={{
              fontSize: "16px",
              lineHeight: 1.8,
              color: "#66717D",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}>
            {paragraphKeys.map((key, i) => {
              const paragraph = t(key);
              const containsLink = paragraph.includes("<linkExt>");
              const linkIndex = paragraphKeys
                .slice(0, i)
                .filter((paragraphKey) =>
                  t(paragraphKey).includes("<linkExt>"),
                ).length;
              const linkKey = linkKeys[linkIndex];

              return (
                <p key={key}>
                  {hasLinks && containsLink && linkKey ? (
                    <Trans
                      ns="legal"
                      i18nKey={key}
                      components={{
                        linkExt: (
                          <a
                            href={t(linkKey)}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#005FA8" }}
                          />
                        ),
                      }}
                    />
                  ) : (
                    paragraph
                  )}
                </p>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
