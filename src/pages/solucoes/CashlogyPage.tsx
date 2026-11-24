import { useTranslation } from "react-i18next";
import ProductPage from "./ProductPage";

export default function CashlogyPage() {
  const { t } = useTranslation("solutions");
  const { t: tc } = useTranslation("common");
  return (
    <ProductPage
      product={{
        name: "Cashlogy",
        category: t("cashlogy.category"),
        tagline: t("cashlogy.tagline"),
        description: t("cashlogy.description"),
        heroImage:
          "https://cashlogy.com/wp-content/uploads/2023/03/solution-2.png",
        accentColor: "#005FA8",
        leadForm: "payments",
        leadFormSource: "cashlogy",
        breadcrumb: [
          { label: tc("breadcrumb.solutions"), path: "/solucoes" },
          { label: tc("breadcrumb.payments"), path: "/solucoes/pagamentos" },
          { label: "Cashlogy", path: "/solucoes/pagamentos/cashlogy" },
        ],
        featuresTitle: t("cashlogy.featuresTitle"),
        ctaTitle: t("cashlogy.ctaTitle"),
        ctaDesc: t("cashlogy.ctaDesc"),
        features: t("cashlogy.features", { returnObjects: true }) as string[],
        applications: t("cashlogy.applications", {
          returnObjects: true,
        }) as string[],
      }}
    />
  );
}
