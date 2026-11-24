import { useTranslation } from "react-i18next";
import ProductPage from "./ProductPage";

export default function WinRestPage() {
  const { t } = useTranslation("solutions");
  const { t: tc } = useTranslation("common");
  return (
    <ProductPage
      product={{
        name: "WinRest",
        category: t("winrest.category"),
        tagline: t("winrest.tagline"),
        description: t("winrest.description"),
        heroImage:
          "https://img.magnific.com/fotos-premium/barista-africano-atraente-sorridente-em-pe-atras-do-balcao-de-uma-cafeteria_171337-98597.jpg?semt=ais_hybrid&w=740&q=80",
        accentColor: "#073B63",
        leadForm: "managementSoftware",
        leadFormSource: "winrest",
        breadcrumb: [
          { label: tc("breadcrumb.solutions"), path: "/solucoes" },
          { label: tc("breadcrumb.software"), path: "/solucoes/softwares" },
          { label: "WinRest", path: "/solucoes/softwares/winrest" },
        ],
        featuresTitle: t("winrest.featuresTitle"),
        ctaTitle: t("winrest.ctaTitle"),
        ctaDesc: t("winrest.ctaDesc"),
        features: t("winrest.features", { returnObjects: true }) as string[],
        applications: t("winrest.applications", {
          returnObjects: true,
        }) as string[],
      }}
    />
  );
}
