# Beasell Data Protection And Operations

Atualizado em 2026-06-03.

Este documento define os controlos minimos para operar a Beasell em producao sem expor dados sensiveis.

## Dados sensiveis

Dados tratados como sensiveis:

- Email, nome e perfil do aluno.
- Comprovativos de pagamento enviados por upload.
- Estado de pagamento, notas administrativas e referencias bancarias.
- Certificados, codigos de verificacao e historico de conclusao.
- Segredos de ambiente, tokens de deploy e chaves de autenticacao.

Regras:

- Segredos nunca entram no repositorio.
- Logs tecnicos nao devem incluir ficheiros de comprovativo, URLs de ficheiros, tokens, secrets ou conteudo integral de documentos.
- Audit logs podem guardar quem fez a acao, quando, qual recurso mudou e campos alterados, mas devem evitar payloads sensiveis.

## Comprovativos

Controlos atuais:

- Upload autenticado via Convex Storage.
- Tipos aceites: PDF, PNG, JPG e WEBP.
- Tamanho maximo: 8 MB.
- Admin abre o comprovativo, aprova ou rejeita.
- Rejeicao exige motivo para orientar o aluno.
- Novas submissoes por link externo sao bloqueadas; comprovativo novo deve entrar por upload.

Politica recomendada:

- Reter comprovativos por ate 180 dias apos aprovacao/rejeicao, salvo exigencia legal maior.
- Remover comprovativos antigos atraves de tarefa operacional planeada.
- Evitar reenviar comprovativos para servicos externos sem base legal e autorizacao do dono da plataforma.

## Auditoria

Eventos criticos que devem ser auditados:

- Criacao, edicao e remocao de cursos, modulos e aulas.
- Criacao e edicao de artigos do blog.
- Criacao, edicao e remocao de pacotes de preco.
- Submissao, aprovacao e rejeicao de pagamentos.
- Futuramente: alteracoes de perfil/role de utilizadores e revogacao de certificados.

Cada evento deve guardar:

- Utilizador/admin responsavel.
- Acao executada.
- Tipo e identificador do recurso.
- Resumo legivel.
- Metadados seguros, sem segredos nem comprovativos.
- Data/hora.

## Backups E Recuperacao

Antes de producao:

- Confirmar processo de backup do deployment Convex.
- Documentar como restaurar dados ou exportar tabelas criticas.
- Testar rollback de deploy Next.js.
- Nunca executar seed local em producao; as seed mutations destrutivas ficam bloqueadas fora de deployments Convex `local:` ou `anonymous:`.

Tabelas criticas:

- `users`
- `courses`
- `modules`
- `lessons`
- `enrollments`
- `payments`
- `certificates`
- `auditLogs`

## Certificados Publicos

- A verificacao publica por codigo deve expor apenas os dados necessarios para confirmar autenticidade.
- Nao devolver email do aluno, `userId`, `enrollmentId`, `courseId` ou outros IDs internos em respostas publicas.
- O nome do destinatario, curso, numero do certificado, datas e progresso sao suficientes para a pagina publica.

## Monitorizacao

Monitores minimos:

- Home publica.
- `/sign-in`
- `/plataforma/cursos`
- `/api/health`, que deve responder `ok` e apenas booleanos de configuracao.
- `/api/auth/get-session` no Convex site.
- Rotas admin anonimas devem redirecionar para login.
- Alertar se pagamentos submetidos ficarem acumulados sem revisao.

## Rate Limit De Autenticacao

Controlo atual:

- Better Auth rate limit fica sempre ativo.
- O contador e persistido na tabela local `betterAuth.rateLimit` do componente Convex.
- Login limita tentativas repetidas por IP em `/sign-in/*` e `/api/auth/sign-in/*`.
- Signup limita criacao repetida por IP em `/sign-up/*` e `/api/auth/sign-up/*`.
- O rate limit usa headers de proxy confiaveis, incluindo `x-forwarded-for`, `x-real-ip`, `x-vercel-forwarded-for`, `cf-connecting-ip`, `true-client-ip` e `x-client-ip`.

Validacao local:

```bash
npm run qa:auth-rate-limit
```

Nota operacional: se o runtime/proxy nao encaminhar um header de IP confiavel, o Better Auth ignora o rate limit por seguranca. Confirmar isto no deploy real antes do go-live.

Comando recomendado:

```bash
NEXT_PUBLIC_SITE_URL=https://<dominio> NEXT_PUBLIC_CONVEX_SITE_URL=https://<deployment>.convex.site npm run monitor:production
```

Se existir `BEASELL_MONITOR_WEBHOOK_URL`, o alerta deve receber apenas nomes de checks falhados, nunca emails, tokens, comprovativos ou payloads completos.

## Error Tracking Externo

Controlo atual:

- O projeto esta preparado para `@sentry/nextjs`.
- `sendDefaultPii` fica desligado.
- Eventos passam por scrubber para remover email de utilizador, IP, cookies, headers de autorizacao, tokens, secrets e campos relacionados a comprovativos.
- `/api/health` mostra apenas `sentryConfigured: true/false`, sem DSN, org, projeto ou token.

Variaveis recomendadas em producao:

```bash
NEXT_PUBLIC_SENTRY_DSN=<dsn-publico>
SENTRY_DSN=<dsn-servidor>
SENTRY_ORG=<org>
SENTRY_PROJECT=<project>
SENTRY_AUTH_TOKEN=<token-apenas-no-ambiente-seguro-de-build>
```

Validacao estrita:

```bash
NEXT_PUBLIC_SITE_URL=https://<dominio> NEXT_PUBLIC_CONVEX_SITE_URL=https://<deployment>.convex.site npm run monitor:production -- --require-sentry
```

## Gate De Producao

Antes de publicar:

```bash
npm run qa:env:production
npm run qa:auth-rate-limit
npm run lint
npm run test
NEXT_TELEMETRY_DISABLED=1 npm run build
NEXT_PUBLIC_SITE_URL=https://<dominio> NEXT_PUBLIC_CONVEX_SITE_URL=https://<deployment>.convex.site npm run qa:production-smoke
NEXT_PUBLIC_SITE_URL=https://<dominio> NEXT_PUBLIC_CONVEX_SITE_URL=https://<deployment>.convex.site npm run monitor:production
NEXT_PUBLIC_SITE_URL=https://<dominio> NEXT_PUBLIC_CONVEX_SITE_URL=https://<deployment>.convex.site npm run monitor:production -- --require-sentry
```

Tambem confirmar:

- Vercel verde.
- Convex deployment correto.
- `ADMIN_EMAILS` aponta para o email real do dono.
- `BETTER_AUTH_SECRET` forte, com pelo menos 32 caracteres.
- `BETTER_AUTH_TRUSTED_ORIGINS` contem apenas dominios esperados.
