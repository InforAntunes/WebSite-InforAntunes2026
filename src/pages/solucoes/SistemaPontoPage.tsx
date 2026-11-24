import { useTranslation } from "react-i18next"
import ProductPage from "./ProductPage"
import sistemaPontoMockup from "../../public/photos/sistema-ponto.svg"
import photoRel from "../../public/photos/relogio.png"

export default function SistemaPontoPage() {
  const { t } = useTranslation("solutions")
  const { t: tc } = useTranslation("common")

  return (
    <ProductPage
      product={{
        name: "Sistema Ponto",
        category: t("sistemaPonto.category"),
        tagline: t("sistemaPonto.tagline"),
        description: t("sistemaPonto.description"),
        heroImage: photoRel,
        heroImageAlt: t("sistemaPonto.heroImageAlt"),
        accentColor: "#005FA8",
        leadForm: "timeTracking",
        leadFormSource: "sistema-ponto",
        breadcrumb: [
          { label: tc("breadcrumb.solutions"), path: "/solucoes" },
          {
            label: "Sistema Ponto",
            path: "/solucoes/sistema-ponto",
          },
        ],
        featuresTitle: t("sistemaPonto.featuresTitle"),
        sectorsTitle: t("sistemaPonto.sectorsTitle"),
        ctaTitle: t("sistemaPonto.ctaTitle"),
        ctaDesc: t("sistemaPonto.ctaDesc"),
        platformsLabel: t("sistemaPonto.platforms.label"),
        platformsTitle: t("sistemaPonto.platforms.title"),
        platforms: t("sistemaPonto.platforms.items", {
          returnObjects: true,
        }) as Array<{
  title: string
  description: string
  items: string[]
}>,
        features: t("sistemaPonto.features", {
          returnObjects: true,
        }) as string[],
        applications: t("sistemaPonto.applications", {
          returnObjects: true,
        }) as string[],
        otherSolutionsPath: "/solucoes",
      }}
    />
  )
}
