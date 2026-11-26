export const site = "https://webinforantunes.vercel.app"
export const pages: Record<string, [string, string, string?]> = {
  "/": [
    "Tecnologia para empresas",
    "Conheça as soluções de software de gestão, pagamentos automáticos, robótica e infraestrutura da Infor Antunes.",
  ],
  "/sobre": [
    "Sobre nós",
    "Conheça a Infor Antunes e o trabalho da equipa que acompanha as empresas na escolha e implementação de tecnologia.",
  ],
  "/solucoes": [
    "Soluções para empresas",
    "Explore as soluções de gestão, pagamentos, robótica, assiduidade e cibersegurança para o seu negócio.",
  ],
  "/solucoes/softwares": [
    "Software de gestão",
    "Compare as soluções XD, WinRest e ZoneSoft e encontre o software de gestão adequado à sua atividade.",
  ],
  "/solucoes/softwares/xd": [
    "XD",
    "Conheça a plataforma de gestão XD e peça uma demonstração adaptada às necessidades do seu negócio.",
  ],
  "/solucoes/softwares/winrest": [
    "WinRest",
    "Explore o WinRest para gestão da restauração e peça uma demonstração à equipa da Infor Antunes.",
  ],
  "/solucoes/softwares/zonesoft": [
    "ZoneSoft",
    "Conheça o software ZoneSoft para restauração e fale com a equipa sobre a sua implementação.",
  ],
  "/solucoes/pagamentos": [
    "Pagamentos automáticos",
    "Descubra soluções para automatizar os pagamentos e gerir o numerário no ponto de venda.",
  ],
  "/solucoes/pagamentos/cashlogy": [
    "Cashlogy",
    "Saiba como o Cashlogy automatiza a gestão do dinheiro no seu ponto de venda.",
  ],
  "/solucoes/pagamentos/compact": [
    "Compact",
    "Conheça a solução Compact e avalie a sua integração no espaço de pagamento do seu estabelecimento.",
  ],
  "/solucoes/pagamentos/entrega": [
    "Entrega e instalação",
    "Conheça as etapas de entrega e instalação dos equipamentos de pagamento e solicite o acompanhamento da equipa.",
  ],
  "/solucoes/robotica": [
    "Robótica de serviço",
    "Descubra os robôs de serviço Pudu Robotics para hotelaria e restauração e peça uma demonstração.",
    "/partilha/robotica.webp",
  ],
  "/solucoes/sistema-ponto": [
    "Sistema Ponto",
    "Conheça o sistema de gestão de assiduidade e registo de ponto para acompanhar a sua equipa.",
    "/partilha/ponto.png",
  ],
  "/solucoes/ciberseguranca-infraestrutura": [
    "Cibersegurança e Infraestrutura",
    "Explore soluções de redes, segurança e continuidade do negócio e peça uma avaliação da sua infraestrutura.",
  ],
  "/servicos": [
    "Serviços de informática",
    "Consulte os serviços de informática da Infor Antunes e peça um orçamento para a sua empresa.",
  ],
  "/contactos": [
    "Contactos",
    "Consulte os contactos e a localização da Infor Antunes ou envie uma mensagem diretamente à equipa.",
  ],
  "/privacidade": [
    "Política de privacidade",
    "Consulte a informação sobre o tratamento de dados pessoais no website da Infor Antunes.",
  ],
  "/termos": [
    "Termos de utilização",
    "Consulte as condições de utilização do website da Infor Antunes.",
  ],
  "/cookies": [
    "Política de cookies",
    "Saiba como são utilizados os cookies no website da Infor Antunes.",
  ],
}
export function metadata(path: string, production: boolean) {
  const key = path.replace(/\/+$/, "") || "/"
  const page = Object.prototype.hasOwnProperty.call(pages, key)
    ? pages[key]
    : undefined
  const [label, description, image = "/partilha/infor-antunes.png"] = page ?? [
    "Página não encontrada",
    "A página solicitada não está disponível.",
  ]
  const title = `${label} | Infor Antunes`,
    url = site + key
  return {
    title,
    canonical: page ? url : null,
    tags: {
      description,
      robots: page && production ? "index, follow" : "noindex, nofollow",
      "og:type": "website",
      "og:locale": "pt_PT",
      "og:site_name": "Infor Antunes",
      "og:title": title,
      "og:description": description,
      "og:image": site + image,
      ...(page ? { "og:url": url } : {}),
      "twitter:card": image.endsWith("infor-antunes.png")
        ? "summary"
        : "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": site + image,
    },
  }
}
