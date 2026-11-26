# Website Infor Antunes

Website React/Vite. Os formulários de contacto, orçamento e demonstração usam a função Vercel `POST /api/leads`. Não é criada uma base de dados. Os pedidos são enviados por e-mail, não são registados nos logs e a confirmação ao visitante não inclui os dados que submeteu.

## Configurar o envio

1. Verifique no Resend o domínio do remetente (registos DNS indicados em **Domains**) e crie uma chave com permissão de envio.
2. Em **Vercel → webinforantunes → Settings → Environment Variables**, defina `RESEND_API_KEY` (chave de envio), `CONTACT_FROM_EMAIL` (remetente do domínio verificado) e `CONTACT_TO_EMAIL` (caixa da equipa). Não use o prefixo `VITE_` nestes segredos.
3. Use **Production** para o site público. Para testar entregas numa **Preview**, configure separadamente as três variáveis e use endereços controlados para a equipa e para o visitante de teste. Faça um novo deployment após alterações.
4. Submeta um formulário, confirme a receção interna e a confirmação ao visitante. Se apenas a confirmação falhar, o pedido já aceite não volta a ser enviado.

## Desenvolvimento

`pnpm install --frozen-lockfile`, `pnpm dev`, `pnpm exec tsc --noEmit` e `pnpm build`. Para testar e-mails localmente, copie `.env.example` para `.env.development.local` e utilize credenciais de teste. Sem configuração a API devolve erro, nunca simula uma entrega.

A API valida os campos por tipo de pedido, limita o tamanho do corpo e verifica o honeypot e o tempo de preenchimento. Para uma futura integração Turnstile, os formulários já encaminham `cf-turnstile-response`. Adicione o widget em ambos antes de configurar `TURNSTILE_SECRET_KEY`: quando esta chave existe, o servidor exige um token validado pela Cloudflare. Não é necessária na configuração atual.

## SEO

`src/seo.ts` contém as rotas públicas, os metadados em pt-PT e o domínio canónico de produção. A compilação produz HTML por rota, `404.html`, `sitemap.xml` e `robots.txt` a partir deste catálogo. Mantenha-o sincronizado com `src/App.tsx`. Pré-visualizações e desenvolvimento usam noindex; só `VERCEL_ENV=production` permite indexação. Se o domínio público mudar, atualize `site`, sem o substituir pelo URL de cada deployment.
