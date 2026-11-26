import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Sobre from "./pages/Sobre"
import Solucoes from "./pages/Solucoes"
import Servicos from "./pages/Servicos"
import Contactos from "./pages/Contactos"
import SoftwaresPage from "./pages/solucoes/SoftwaresPage"
import WinRestPage from "./pages/solucoes/WinRestPage"
import XDPage from "./pages/solucoes/XDPage"
import ZonesoftPage from "./pages/solucoes/ZonesoftPage"
import PagamentosPage from "./pages/solucoes/PagamentosPage"
import CashlogyPage from "./pages/solucoes/CashlogyPage"
import CompactPage from "./pages/solucoes/CompactPage"
import EntregaPage from "./pages/solucoes/EntregaPage"
import RoboticaPage from "./pages/solucoes/RoboticaPage"
import SistemaPontoPage from "./pages/solucoes/SistemaPontoPage"
import CibersegurancaInfraestruturaPage from "./pages/solucoes/CibersegurancaInfraestruturaPage"
import LegalPage from "./pages/LegalPage"

import PageMetadata from './components/PageMetadata'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  )
}

function NotFound() {
  const { t } = useTranslation("common")
  return (
    <Layout>
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 32px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "80px",
              fontWeight: 900,
              color: "#E2E8F0",
              letterSpacing: "-4px",
              lineHeight: 1,
            }}
          >
            404
          </div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "#20252B",
              marginBottom: "12px",
            }}
          >
            {t("notFound.title")}
          </h1>
          <p
            style={{ fontSize: "16px", color: "#66717D", marginBottom: "32px" }}
          >
            {t("notFound.desc")}
          </p>
          <Link
            to="/"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              background: "#005FA8",
              color: "#FFFFFF",
              borderRadius: "10px",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            {t("notFound.back")}
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageMetadata />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/sobre"
          element={
            <Layout>
              <Sobre />
            </Layout>
          }
        />
        <Route
          path="/solucoes"
          element={
            <Layout>
              <Solucoes />
            </Layout>
          }
        />
        <Route
          path="/solucoes/softwares"
          element={
            <Layout>
              <SoftwaresPage />
            </Layout>
          }
        />

        <Route
          path="/solucoes/softwares/winrest"
          element={
            <Layout>
              <WinRestPage />
            </Layout>
          }
        />
        <Route
          path="/solucoes/softwares/xd"
          element={
            <Layout>
              <XDPage />
            </Layout>
          }
        />
        <Route
          path="/solucoes/softwares/zonesoft"
          element={
            <Layout>
              <ZonesoftPage />
            </Layout>
          }
        />
        <Route
          path="/solucoes/pagamentos"
          element={
            <Layout>
              <PagamentosPage />
            </Layout>
          }
        />
        <Route
          path="/solucoes/pagamentos/cashlogy"
          element={
            <Layout>
              <CashlogyPage />
            </Layout>
          }
        />
        <Route
          path="/solucoes/pagamentos/compact"
          element={
            <Layout>
              <CompactPage />
            </Layout>
          }
        />
        <Route
          path="/solucoes/pagamentos/entrega"
          element={
            <Layout>
              <EntregaPage />
            </Layout>
          }
        />
        <Route
          path="/solucoes/robotica"
          element={
            <Layout>
              <RoboticaPage />
            </Layout>
          }
        />
        <Route
          path="/solucoes/sistema-ponto"
          element={
            <Layout>
              <SistemaPontoPage />
            </Layout>
          }
        />
        <Route
          path="/solucoes/ciberseguranca-infraestrutura"
          element={
            <Layout>
              <CibersegurancaInfraestruturaPage />
            </Layout>
          }
        />
        <Route
          path="/servicos"
          element={
            <Layout>
              <Servicos />
            </Layout>
          }
        />
        <Route
          path="/contactos"
          element={
            <Layout>
              <Contactos />
            </Layout>
          }
        />
        <Route
          path="/privacidade"
          element={
            <Layout>
              <LegalPage
                titleKey="privacy.title"
                breadcrumbKey="privacy.breadcrumb"
                paragraphKeys={["privacy.p1", "privacy.p2", "privacy.p3"]}
              />
            </Layout>
          }
        />
        <Route
          path="/termos"
          element={
            <Layout>
              <LegalPage
                titleKey="terms.title"
                breadcrumbKey="terms.breadcrumb"
                paragraphKeys={["terms.p1", "terms.p2"]}
              />
            </Layout>
          }
        />
        <Route
          path="/cookies"
          element={
            <Layout>
              <LegalPage
                titleKey="cookies.title"
                breadcrumbKey="cookies.breadcrumb"
                paragraphKeys={["cookies.p1", "cookies.p2"]}
              />
            </Layout>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
