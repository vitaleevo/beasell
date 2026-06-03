# Beasell Production Checklist

Esta checklist prepara o LMS/backoffice para producao sem expor segredos no repositorio.

## 1. Estado local obrigatorio

Antes de publicar, estes comandos devem passar em Ubuntu + Docker:

```bash
RUN_VISUAL=1 bash scripts/deploy/preflight-docker.sh
```

Resultado esperado:

- Lint sem erros e sem warnings.
- Testes Convex verdes.
- Build Next.js verde.
- CI com secret scan, lint, testes, build e smoke local autenticado verde.
- Smokes autenticados, rate limit de auth e smoke negativo de seguranca verdes.
- QA visual autenticada com `failedCount=0`.

## 2. Variaveis de producao

Configure no ambiente remoto da aplicacao Next.js:

```bash
CONVEX_DEPLOYMENT=prod:<deployment-name>
SITE_URL=https://<dominio>
NEXT_PUBLIC_SITE_URL=https://<dominio>
BETTER_AUTH_TRUSTED_ORIGINS=https://<dominio>,https://aluno.<dominio>,https://professor.<dominio>
NEXT_PUBLIC_CONVEX_URL=https://<deployment>.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://<deployment>.convex.site
BETTER_AUTH_SECRET=<secret-com-pelo-menos-32-caracteres>
ADMIN_EMAILS=<email-do-dono>
BEASELL_MONITOR_WEBHOOK_URL=<opcional-webhook-de-alerta>
VERCEL_AUTOMATION_BYPASS_SECRET=<opcional-bypass-preview-vercel>
NEXT_PUBLIC_SENTRY_DSN=<opcional-dsn-publico-sentry>
SENTRY_DSN=<opcional-dsn-servidor-sentry>
SENTRY_ORG=<opcional-org-sentry>
SENTRY_PROJECT=<opcional-project-sentry>
SENTRY_AUTH_TOKEN=<opcional-token-upload-sourcemaps>
```

Use o inicializador seguro para gerar o ficheiro temporario fora do repositorio, com `BETTER_AUTH_SECRET` forte e permissoes `0600`:

```bash
npm run deploy:init-env -- --domain <dominio> --deployment <deployment> --owner-email <email-do-dono> --trusted-origin https://aluno.<dominio> --trusted-origin https://professor.<dominio>
```

O ficheiro padrao gerado e `/tmp/beasell.env.production`.

Tambem pode usar o template versionado como ponto de partida manual:

```bash
cp docs/deploy/env.production.example /tmp/beasell.env.production
```

Regras:

- `SITE_URL` e `NEXT_PUBLIC_SITE_URL` devem usar o dominio canonico publico em HTTPS.
- `BETTER_AUTH_TRUSTED_ORIGINS` deve incluir o dominio canonico e todos os subdominios que servem auth, aluno ou admin. Para o setup Beasell atual: `https://beasell.co.ao,https://aluno.beasell.co.ao,https://professor.beasell.co.ao`.
- `NEXT_PUBLIC_CONVEX_URL` deve apontar para o deployment Convex de producao.
- `NEXT_PUBLIC_CONVEX_SITE_URL` deve apontar para o endpoint HTTP do mesmo deployment.
- `ADMIN_EMAILS` deve conter o email unico do dono/professor.
- `BETTER_AUTH_SECRET` nunca deve ser colocado em ficheiros versionados.
- O deployment Convex deve incluir a tabela local `betterAuth.rateLimit`, usada pelo Better Auth para persistir tentativas de login/signup.
- O proxy/runtime deve preservar IP do cliente em `x-forwarded-for` ou outro header listado em `advanced.ipAddress.ipAddressHeaders`, senao o rate limit de login/signup e ignorado pelo Better Auth.
- `BEASELL_MONITOR_WEBHOOK_URL` e opcional; se usado, configurar apenas no ambiente seguro do monitor.
- `VERCEL_AUTOMATION_BYPASS_SECRET` e opcional e so deve existir no ambiente seguro que roda smokes contra previews Vercel protegidas.
- Sentry e opcional em local/CI, mas recomendado em producao. Usar `sendDefaultPii=false`; nunca enviar comprovativos, cookies, tokens ou emails em eventos.

Validacao local de um ficheiro de producao temporario:

```bash
node scripts/deploy/check-env.mjs --file /tmp/beasell.env.production --mode production
```

Preflight Docker com esse mesmo ficheiro:

```bash
PRODUCTION_ENV_FILE=/tmp/beasell.env.production RUN_VISUAL=1 bash scripts/deploy/preflight-docker.sh
```

Validacao dentro do ambiente remoto, quando as variaveis ja existem no processo:

```bash
npm run qa:env:production
```

## 3. Convex remoto

Passos:

1. Confirmar que o deployment remoto e de producao.
2. Rodar o dry-run de variaveis Convex. Este comando nao escreve valores:

```bash
bash scripts/deploy/apply-convex-env.sh /tmp/beasell.env.production
```

3. Aplicar variaveis Convex apenas depois de conferir o alvo:

```bash
APPLY=1 bash scripts/deploy/apply-convex-env.sh /tmp/beasell.env.production
```

Use `FORCE=1` apenas se precisar sobrescrever valores ja existentes.

4. Rodar o dry-run Convex:

```bash
bash scripts/deploy/convex-prod-dry-run.sh /tmp/beasell.env.production
```

5. Publicar funcoes/schema com o Convex CLI apenas depois do dry-run passar.
6. Confirmar que o endpoint `https://<deployment>.convex.site/api/auth/get-session` responde.

Nao correr seed local contra producao. O ficheiro `convex/seed.ts` ja bloqueia deployments que nao sejam locais/anonimos.

## 4. Deploy Next.js

Passos:

1. Confirmar que o PR/commit que sera publicado passou nos checks.
2. Publicar a aplicacao Next.js com as variaveis acima.
3. Confirmar que `/sign-in` carrega.
4. Criar/entrar com o email listado em `ADMIN_EMAILS`.
5. Confirmar acesso a `/admin/dashboard`.
6. Confirmar que um email fora de `ADMIN_EMAILS` entra como aluno.
7. Confirmar que `/admin` redireciona para `/admin/dashboard` e `/plataforma` redireciona para `/plataforma/meus-cursos`.

Estado publico verificado em 2026-06-03:

- `beasell.co.ao`, `www.beasell.co.ao`, `aluno.beasell.co.ao` e `professor.beasell.co.ao` resolvem para Vercel.
- O ultimo deployment GitHub marcado como `Production` era de 2026-04-21, portanto nao representa automaticamente o PR atual.
- A producao antiga ainda usava a camada Clerk em algumas rotas; antes de substituir por Better Auth, confirmar as variaveis `BETTER_AUTH_*`, `ADMIN_EMAILS` e URLs Convex no ambiente Vercel de producao.
- Chaves privadas SSH e tokens cPanel/API que tenham sido partilhados em chat devem ser revogados e recriados antes do go-live real.

## 5. Smoke manual pos-deploy

Validar no browser:

- `/admin/dashboard`
- `/admin/cursos`
- `/admin/alunos`
- `/admin/conteudos`
- `/admin/analise`
- `/admin/pagamentos`
- `/admin/precos`
- `/admin/settings`
- `/plataforma/cursos`
- `/plataforma/meus-cursos`

Smoke HTTP minimo:

```bash
NEXT_ORIGIN=https://<dominio> TRUSTED_ORIGIN=https://<dominio> npm run qa:auth-rate-limit
NEXT_PUBLIC_SITE_URL=https://<dominio> NEXT_PUBLIC_CONVEX_SITE_URL=https://<deployment>.convex.site npm run qa:production-smoke
```

Se a preview Vercel estiver protegida por Deployment Protection, configure `VERCEL_AUTOMATION_BYPASS_SECRET` no ambiente seguro do runner, ou passe `--vercel-bypass-secret <valor>` localmente sem gravar o valor no repositorio:

```bash
NEXT_PUBLIC_SITE_URL=https://<preview-vercel> VERCEL_AUTOMATION_BYPASS_SECRET=<secret> npm run qa:production-smoke
```

O workflow `Beasell Remote Smoke` tambem roda automaticamente quando a Vercel publica uma preview e pode ser disparado manualmente em GitHub Actions. Para validar previews protegidas no CI remoto, adicione `VERCEL_AUTOMATION_BYPASS_SECRET` como secret do repositorio GitHub. Sem esse secret, o workflow detecta a protecao da Vercel e registra um notice em vez de tratar o 401 como falha da aplicacao.

Este smoke confirma:

- Home, sign-in, sign-up e listagem publica de cursos com HTTP 200.
- Rate limit de login retorna `429` apos tentativas repetidas do mesmo IP.
- Redirecionamento anonimo para sign-in em todas as rotas admin principais.
- Redirecionamento anonimo em `/plataforma/meus-cursos`.
- Endpoint HTTP/Auth do Convex em `/api/auth/get-session`.
- Headers de seguranca basicos: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` e `Strict-Transport-Security`.

Monitor operacional:

```bash
NEXT_PUBLIC_SITE_URL=https://<dominio> NEXT_PUBLIC_CONVEX_SITE_URL=https://<deployment>.convex.site npm run monitor:production
```

O monitor tambem aceita `VERCEL_AUTOMATION_BYPASS_SECRET` ou `--vercel-bypass-secret` para previews Vercel protegidas.

Para exigir Sentry no ambiente real:

```bash
NEXT_PUBLIC_SITE_URL=https://<dominio> NEXT_PUBLIC_CONVEX_SITE_URL=https://<deployment>.convex.site npm run monitor:production -- --require-sentry
```

Este monitor confirma:

- `/api/health` com estado `ok`, sem expor secrets ou emails.
- Estado de configuracao do Sentry sem expor DSN, org, projeto ou token.
- Home publica online.
- `/admin/dashboard` redireciona anonimos para login.
- Headers de seguranca continuam presentes.
- Endpoint HTTP/Auth do Convex responde.

Se `BEASELL_MONITOR_WEBHOOK_URL` estiver configurado, falhas enviam alerta com apenas nome dos checks falhados.

Fluxos minimos:

- Dono cria curso, modulo e aula.
- Aluno inscreve-se num curso pago.
- Dono aprova pagamento.
- Aluno consegue abrir aulas depois da aprovacao.
- Dono rejeita um pagamento e o aluno continua sem acesso.

## 6. Dados sensiveis, auditoria e operacao

Antes de liberar uso real, ler e aplicar `docs/security/data-protection-and-operations.md`.

Confirmar:

- Eventos criticos aparecem em `auditLogs`.
- Rejeicao de pagamento exige motivo e o aluno ve a orientacao.
- Alteracoes em `/admin/precos` ficam no historico.
- Comprovativos usam upload autenticado e validacao de tipo/tamanho.
- Smoke negativo `npm run qa:security:negative` bloqueia aluno em acoes admin e so libera aula apos aprovacao.
- Smoke de auth `npm run qa:auth-rate-limit` bloqueia tentativas repetidas de login pelo mesmo IP.
- `/api/health` nao devolve valores de variaveis, apenas booleanos de configuracao.
- Eventos Sentry passam por scrubber para remover headers/cookies/tokens/comprovativos e PII basica.
- O processo de backup/exportacao do deployment Convex esta conhecido pelo dono tecnico.
- Logs e audit metadata nao guardam tokens, secrets nem URLs de comprovativos.

## 7. Rollback

Se o deploy falhar:

- Reverter o deploy Next.js para a ultima versao verde.
- Manter o Convex deployment sem seed de teste.
- Rever `SITE_URL`, `BETTER_AUTH_TRUSTED_ORIGINS` e URLs Convex antes de nova tentativa.
- Reexecutar a checklist local antes de publicar novamente.
