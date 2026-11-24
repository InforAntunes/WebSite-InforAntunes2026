# Revisão de traduções e implementação

## Âmbito

Revisão estática do código e dos oito namespaces registados em `src/i18n.ts`.
O português foi usado como referência editorial. Não foram testados serviços externos,
entregas de email, publicação nem todas as interações em dispositivos reais.

## Traduções atualizadas

- Nomes do menu, suporte remoto, Livro de Reclamações e informações ao consumidor.
- Morada, telefone e email alinhados com os contactos portugueses da Lourinhã.
- História revista: início em 1997, constituição da empresa em 2001 e referência a CPM Informática.
- Oito serviços da Home nos quatro idiomas.
- Catálogo e ordem de WinRest, XD e Zone Soft alinhados entre idiomas. A ordem importa:
  Home, Softwares e Pagamentos associam os cartões às rotas através do índice.
- Removidas das listagens ES/FR as entradas antigas que já não constavam das listas PT:
  Eticadata e o cartão Compact. Foram preservados os seus blocos de tradução legados.
- Zone Soft traduzido como POS para restauração, incluindo funcionalidades e setores,
  em vez do antigo conteúdo de reservas e gestão hoteleira.
- Conteúdo de consumidor traduzido para ES/FR e email de privacidade corrigido.
- As traduções recentes dos serviços, Sistema Ponto, Cibersegurança e modais foram
  verificadas quanto a chaves, listas e estrutura.

`src/locales/pt/consumidor.json` contém apenas um objeto vazio e não está registado.
O conteúdo efetivo encontra-se em `legal.consumidor`; não foi criado um namespace redundante.

## Prioridade alta

### 1. Envio real dos formulários

- `src/pages/Contactos.tsx`: `handleSubmit` aguarda um temporizador e apresenta sucesso,
  sem enviar a mensagem.
- `src/components/SolutionLeadModal.tsx`: quando não existe `onSubmitLead`, o envio
  também é simulado. Não foi encontrada implementação de envio ligada às páginas.
- Falta decidir a integração, implementar o processamento seguro no servidor,
  tratamento de erros e proteção contra abuso. Os formulários não devem ser apresentados
  como canais de envio reais enquanto esta etapa não estiver concluída.
- A ausência de envio externo nos modais respeita o requisito anterior de os manter
  preparados para integração futura.

### 2. Rota de informações ao consumidor

- O rodapé aponta para `/informacoes-consumidor`.
- `src/App.tsx` não regista essa rota; o destino cai na página 404.
- O conteúdo já existe em `legal.consumidor`, nos quatro idiomas.
  Falta ligar uma página `LegalPage` com os quatro parágrafos e os dois links externos.
- Validar os dados jurídicos e de contacto com a empresa antes de publicar.

### 3. Página Compact ainda acessível mas incompleta

- `/solucoes/pagamentos/compact` continua registada em `src/App.tsx`.
- `CompactPage.tsx` pede `solutions:compact.*`, inexistente em PT e EN.
- A referência portuguesa já não inclui o produto nas listagens.
- Decidir entre retirar/redirecionar a rota ou restaurar conteúdo aprovado nos quatro idiomas.
  A verificação de paridade não substitui esta decisão: não pode traduzir conteúdo ausente da base PT.

## Prioridade média

### 4. Ligações dos novos serviços na Home

`Home.tsx` apresenta oito serviços, mas `servicePaths` tem seis destinos e é usado
como `servicePaths[i]`. Faltam as rotas explícitas da Cibersegurança e do Sistema Ponto.

### 5. Internacionalização técnica

- `setLanguage` muda o i18next e o localStorage, mas não sincroniza `document.documentElement.lang`.
- Existem textos de interface fixos no JSX (por exemplo textos alternativos e alguns breadcrumbs).
  Nomes de marcas podem permanecer iguais; textos descritivos devem entrar nos namespaces.
- Faltam testes automatizados que percorram rotas, mudem de idioma e detetem chaves cruas
  ou retornos indesejados ao português.

### 6. SEO e publicação

O Vite usa metadados globais geridos pela configuração Make. Não foi encontrada
uma implementação de metadados específicos por página/idioma, canonical e hreflang.
Confirmar títulos, descrições, indexação, sitemap e comportamento de rotas diretas
no ambiente publicado. O build avisa também sobre o tamanho do bundle;
avaliar carregamento diferido das páginas.

### 7. Privacidade e testes de interface

- Rever consentimento/informação de tratamento no formulário de Contactos antes de ativar o envio.
- Rever o mapa Google incorporado e quaisquer cookies/recursos de terceiros; implementar
  controlo de consentimento caso os serviços efetivamente utilizados o exijam.
- Há seletores responsivos globais baseados na posição das secções em `ProductPage`;
  testar em mobile e preferir seletores locais numa futura revisão.
- Imagens remotas devem ser verificadas no ambiente publicado, incluindo URLs com parâmetros temporários.

## Conteúdo legado

`EticadataPage.tsx` permanece no repositório, mas não está registado nas rotas e não
tem base de tradução PT. Decidir se deve ser removido ou recuperado; não foi reativado.

## Verificação repetível

```sh
node scripts/check-translations.mjs
pnpm exec tsc --noEmit
pnpm build
```

A verificação de traduções cobre chaves portuguesas, tipos, quantidades e ordem
estrutural das listas, valores vazios, interpolação e marcação. Não prova equivalência
semântica nem valida marcas, factos comerciais ou texto fixo no JSX.
