import { useTranslation } from "react-i18next";
import ProductPage from "./ProductPage";

export default function ZonesoftPage() {
  const { t } = useTranslation("solutions");
  const { t: tc } = useTranslation("common");
  return (
    <ProductPage
      product={{
        name: "Zonesoft",
        category: t("zonesoft.category"),
        tagline: t("zonesoft.tagline"),
        description: t("zonesoft.description"),
        heroImage:
          "https://img.magnific.com/fotos-gratis/barista-feminina-com-tablet-fazendo-encomenda-em-uma-cafeteria_1303-31247.jpg?t=st=1790616663~exp=1790620263~hmac=0374af07ccbddc3e6f083e6f658c9dbdf8b94dc71f93f2cfb54f4f4dc0cdfc77&w=2000 2000w",
        accentColor: "#073B63",
        leadForm: "managementSoftware",
        leadFormSource: "zonesoft",
        breadcrumb: [
          { label: tc("breadcrumb.solutions"), path: "/solucoes" },
          { label: tc("breadcrumb.software"), path: "/solucoes/softwares" },
          { label: "Zonesoft", path: "/solucoes/softwares/zonesoft" },
        ],
        featuresTitle: t("zonesoft.featuresTitle"),
        ctaTitle: t("zonesoft.ctaTitle"),
        ctaDesc: t("zonesoft.ctaDesc"),
        features: t("zonesoft.features", { returnObjects: true }) as string[],
        applications: t("zonesoft.applications", {
          returnObjects: true,
        }) as string[],
      }}
    />
  );
}
