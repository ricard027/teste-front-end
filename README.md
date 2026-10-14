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

## Verificações

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

## Estrutura

- `app/`: rota e metadados da aplicação
- `components/layout/`: cabeçalho e rodapé
- `components/products/`: vitrine, card e modal de produto
- `components/ui/`: elementos compartilhados
- `hooks/`: estado da consulta de produtos
- `services/`: integração e validação da API
- `styles/`: estilos SCSS responsivos
- `types/` e `utils/`: contratos de dados e formatação

## Dados e funcionalidades

Uma única consulta ao JSON configurado em `PRODUCTS_ENDPOINT` abastece as duas vitrines. A variável é lida exclusivamente pela rota executada no servidor e não utiliza o prefixo público `NEXT_PUBLIC_`. Como o servidor oficial não fornece cabeçalho CORS, essa rota interna do Next encaminha a requisição e valida a resposta; nenhum catálogo local ou fallback fictício é usado. A interface contempla carregamento, erro com nova tentativa e lista vazia. Os valores são formatados em BRL sem alterar os números recebidos.

Ao selecionar um card, o modal apresenta somente nome, descrição, imagem e preço reais do item. Ele fecha pelo botão, pela tecla Escape e pelo fundo, mantém o foco contido, bloqueia o conteúdo de fundo e devolve o foco ao acionador.

## Decisões e limitações

- Informações que não existem no JSON (preço anterior, parcelas, avaliações e estoque) não são inventadas.
- Os rótulos de categorias e blocos institucionais são elementos estáticos do layout; eles não filtram os produtos porque a API não fornece categorias.
- Os produtos são carregados no cliente, portanto não integram o HTML inicial para indexação. Uma aplicação de e-commerce real poderia consultar a API no servidor, mas o estado de carregamento pedido pelo teste foi priorizado.
- A miniatura pública do Figma e a imagem oficial da vitrine foram usadas como referência. Detalhes internos do arquivo que dependem de permissão de edição não puderam ser inspecionados.
