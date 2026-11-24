import { useTranslation } from "react-i18next"
import ProductPage from "./ProductPage"

export default function CibersegurancaInfraestruturaPage() {
  const { t } = useTranslation("solutions")
  const { t: tc } = useTranslation("common")

  return (
    <ProductPage
      product={{
        name: t("cybersecurityInfrastructure.name"),
        category: t("cybersecurityInfrastructure.category"),
        tagline: t("cybersecurityInfrastructure.tagline"),
        description: t("cybersecurityInfrastructure.description"),
        heroImage:
          "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?w=900&h=700&fit=crop&auto=format",
        heroImageAlt: t("cybersecurityInfrastructure.heroImageAlt"),
        accentColor: "#005FA8",
        leadForm: "cybersecurityInfrastructure",
        leadFormSource: "ciberseguranca-infraestrutura",
        primaryCta: t("cybersecurityInfrastructure.primaryCta"),
        secondaryCta: t("cybersecurityInfrastructure.secondaryCta"),
        breadcrumb: [
          { label: tc("breadcrumb.solutions"), path: "/solucoes" },
          {
            label: t("cybersecurityInfrastructure.name"),
            path: "/solucoes/ciberseguranca-infraestrutura",
          },
        ],
        featuresTitle: t("cybersecurityInfrastructure.featuresTitle"),
        features: t("cybersecurityInfrastructure.features", {
          returnObjects: true,
        }) as string[],
        interventionAreas: {
          label: t("cybersecurityInfrastructure.areas.label"),
          title: t("cybersecurityInfrastructure.areas.title"),
          items: t("cybersecurityInfrastructure.areas.items", {
            returnObjects: true,
          }) as string[],
        },
        sectorsTitle: t("cybersecurityInfrastructure.sectorsTitle"),
        applications: t("cybersecurityInfrastructure.applications", {
          returnObjects: true,
        }) as string[],
        ctaTitle: t("cybersecurityInfrastructure.ctaTitle"),
        ctaDesc: t("cybersecurityInfrastructure.ctaDesc"),
        otherSolutionsPath: "/solucoes",
      }}
    />
  )
}
