# Beasell Next

Sistema da Beasell Angola para site publico, blog, backoffice e plataforma de cursos.

## Stack

- Next.js 16
- React 19
- Convex
- Better Auth
- Tailwind CSS 4
- shadcn/ui

## Configuracao Local

1. Copie `.env.example` para `.env.local`.
2. Preencha as variaveis do Convex e Better Auth.
3. Coloque o email do dono/professor em `ADMIN_EMAILS`.

Variaveis principais:

```bash
CONVEX_DEPLOYMENT=dev:your-deployment-name
SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BETTER_AUTH_TRUSTED_ORIGINS=http://localhost:3000
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://your-deployment.convex.site
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
ADMIN_EMAILS=admin@example.com
```

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Para validar a build:

```bash
npm run lint
npm run build
```

Para validar a configuracao sem expor segredos:

```bash
npm run qa:env
npm run qa:env:example
```

Para executar o preflight local em Docker:

```bash
npm run qa:preflight
```

Para incluir screenshots Playwright de todas as paginas principais:

```bash
RUN_VISUAL=1 npm run qa:preflight
```

## Backoffice

O painel fica em `/admin/dashboard`. O acesso depende de autenticar com um email listado em `ADMIN_EMAILS`; outros utilizadores entram como alunos.

Use `/admin/settings` para confirmar se o ambiente local tem as variaveis essenciais configuradas sem expor segredos.

## Producao

A checklist de publicacao fica em `docs/deploy/production-checklist.md`.

Antes de publicar, valide as variaveis de producao com:

```bash
npm run deploy:init-env -- --domain <dominio> --deployment <deployment> --owner-email <email-do-dono>
node scripts/deploy/check-env.mjs --file /tmp/beasell.env.production --mode production
```

Para conferir as variaveis Convex server-side sem escrever no remoto:

```bash
npm run deploy:convex:env -- /tmp/beasell.env.production
```

Depois de publicar, rode o smoke HTTP minimo do dominio:

```bash
NEXT_PUBLIC_SITE_URL=https://<dominio> NEXT_PUBLIC_CONVEX_SITE_URL=https://<deployment>.convex.site npm run qa:production-smoke
```

## Convex

As funcoes e o schema ficam em `convex/`.

Principais dominios:

- `courses`: cursos, modulos, aulas, inscricoes e conclusoes.
- `users`: utilizadores e estatisticas administrativas.
- `blog`: artigos e categorias.
- `services`: pacotes e precos.
