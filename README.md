# Teste Front-End Econverse

Implementação em React e TypeScript do desafio Front-End Jr da Econverse. A interface segue o layout fornecido e as vitrines consomem, em tempo de execução, o JSON oficial do teste.

## Tecnologias

- Next.js 16, React 19 e TypeScript
- Sass/SCSS
- Lucide React apenas para ícones
- Fetch API nativa

Não são utilizados frameworks de UI como Bootstrap, Foundation, Tailwind ou shadcn.
O build usa o compilador webpack do Next para manter a compilação de Sass compatível com ambientes restritos de CI.

## Como executar

Requer Node.js 20.9 ou superior e pnpm.

```bash
cp .env.example .env
pnpm install
pnpm dev
```

Acesse `http://localhost:3000`.

`PRODUCTS_ENDPOINT` é obrigatório. `SITE_URL` é opcional e deve receber somente
o domínio HTTPS definitivo de produção, sem caminhos adicionais. Quando essa
variável não está configurada, previews e ambientes locais recebem `noindex` e
não anunciam canonical ou URLs fictícias.

## Verificações

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

## Estrutura

- `app/`: páginas, rota da API, metadados, robots e sitemap
- `components/seo/`: dados estruturados JSON-LD
- `config/`: conteúdo compartilhado de SEO e configuração do domínio público
- `components/layout/`: cabeçalho e rodapé
- `components/products/`: vitrine, card e modal de produto
- `components/ui/`: elementos compartilhados
- `hooks/`: estado da consulta de produtos
- `services/`: integração e validação da API
- `styles/`: estilos SCSS responsivos
- `types/` e `utils/`: contratos de dados e formatação

## Dados e funcionalidades

Uma única consulta no servidor ao JSON configurado em `PRODUCTS_ENDPOINT` abastece as três vitrines e inclui os produtos no HTML inicial. A variável é lida exclusivamente no servidor e não utiliza o prefixo público `NEXT_PUBLIC_`. A rota interna do Next reutiliza o mesmo serviço para novas tentativas no cliente; nenhum catálogo local ou fallback fictício é usado. A interface contempla carregamento, erro com nova tentativa e lista vazia. O preço principal é formatado em BRL sem alterar o valor recebido.

Ao selecionar um card, o modal apresenta somente nome, descrição, imagem e preço reais do item. Ele fecha pelo botão, pela tecla Escape e pelo fundo, mantém o foco contido, bloqueia o conteúdo de fundo e devolve o foco ao acionador.

## Decisões e limitações

- Preço anterior e parcelamento são projeções exclusivamente visuais para reproduzir o layout; avaliações, estoque e disponibilidade não são declarados sem dados da API.
- Os rótulos de categorias e blocos institucionais são elementos estáticos do layout; eles não filtram os produtos porque a API não fornece categorias.
- Os metadados, Open Graph e Twitter Card compartilham uma configuração central. Canonical, `og:url`, sitemap e o schema `WebSite` só são publicados quando `SITE_URL` possui um domínio HTTPS definitivo.
- O JSON-LD descreve a vitrine como `ItemList` e utiliza `Product` apenas com nome, descrição, imagem e preço reais do JSON oficial. Não são declarados marca, SKU, avaliações, estoque, disponibilidade ou URLs de páginas de produto inexistentes.
- A vitrine não é uma página individual de produto; portanto, o JSON-LD não implica elegibilidade para rich results de produto.
- Não existe atualmente uma imagem social própria em 1200 × 630. `og:image` e `twitter:image` permanecem intencionalmente ausentes até haver um asset público adequado.
- Não é utilizado schema `Organization`, pois este projeto é uma implementação de teste e não há confirmação de que represente o site oficial da Econverse.
- A miniatura pública do Figma e a imagem oficial da vitrine foram usadas como referência. Detalhes internos do arquivo que dependem de permissão de edição não puderam ser inspecionados.
