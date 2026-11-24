import { useTranslation } from "react-i18next";
import ProductPage from "./ProductPage";

export default function XDPage() {
  const { t } = useTranslation("solutions");
  const { t: tc } = useTranslation("common");
  return (
    <ProductPage
      product={{
        name: "XD",
        category: t("xd.category"),
        tagline: t("xd.tagline"),
        description: t("xd.description"),
        heroImage:
          "https://img.magnific.com/fotos-gratis/trabalhador-de-supermercado-medindo-e-vendendo-carne-para-o-cliente_342744-1074.jpg?semt=ais_hybrid&w=740&q=80",
        accentColor: "#005FA8",
        leadForm: "managementSoftware",
        leadFormSource: "xd",
        breadcrumb: [
          { label: tc("breadcrumb.solutions"), path: "/solucoes" },
          { label: tc("breadcrumb.software"), path: "/solucoes/softwares" },
          { label: "XD", path: "/solucoes/softwares/xd" },
        ],
        featuresTitle: t("xd.featuresTitle"),
        ctaTitle: t("xd.ctaTitle"),
        ctaDesc: t("xd.ctaDesc"),
        features: t("xd.features", { returnObjects: true }) as string[],
        applications: t("xd.applications", { returnObjects: true }) as string[],
      }}
    />
  );
}
