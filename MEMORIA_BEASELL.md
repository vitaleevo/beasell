# Memoria Beasell

Atualizado em 2026-06-03.

## Ultima etapa concluida: hardening profissional fase 5 local

Objetivo: iniciar o plano profissional + seguro do MVP com controlos reais de producao, sem tentar resolver todas as fases de uma vez.

Incremento fase 1.1:

- `/admin/pagamentos` ganhou pesquisa por aluno, email, curso, metodo, referencia, estado e nota do admin.
- `/admin/pagamentos` ganhou exportacao CSV operacional dos pagamentos visiveis.
- A exportacao nao inclui URLs de comprovativos, para reduzir risco de exposicao de ficheiros sensiveis.
- Validacao executada apos o incremento: `npm run lint`, `npm run test` e `NEXT_TELEMETRY_DISABLED=1 npm run build`.
- Browser QA autenticado confirmou a tela de pagamentos com pesquisa/exportacao renderizadas e sem overflow no viewport atual. O browser integrado nao suporta capturar evento de download, entao o download foi validado por codigo/build.

Incremento fase 2:

- Criado `/api/health` publico com estado operacional e apenas booleanos de configuracao, sem expor secrets, emails ou URLs sensiveis.
- Criado `scripts/monitor/production-health.mjs` e comando `npm run monitor:production` para checar health, home, redirect admin, headers de seguranca e Convex HTTP/Auth.
- Criado `scripts/qa/security-negative.mjs` e comando `npm run qa:security:negative`.
- Smoke negativo cria admin/alunos temporarios, bloqueia aluno em listagem/admin/pagamentos/cursos/saude operacional, confirma que aula paga nao abre antes da aprovacao e confirma acesso/conclusao depois da aprovacao.
- `scripts/qa/run-smokes.sh` e `scripts/qa/run-smokes-docker.sh` agora rodam o smoke negativo versionado por padrao; smokes antigos em `.tmp` ficaram opt-in com `RUN_LEGACY_TMP_SMOKES=1`.
- Documentacao atualizada com monitor operacional, webhook opcional de alerta e regra de nao vazar dados sensiveis.
- Validacao executada: sintaxe Node/shell, `npm run qa:env:example`, `npm run test`, `npm run lint`, `NEXT_TELEMETRY_DISABLED=1 npm run build`, `scripts/qa/run-smokes.sh`, `npm run monitor:production -- --base-url http://localhost:3002 --convex-site-url http://127.0.0.1:3211` e `qa:production-smoke`.

Incremento fase 3:

- Criada query admin `users.listStudentsForAdmin` com resumo seguro de alunos: cursos, pagamentos pendentes/rejeitados/aprovados, certificados, progresso medio, valor pago e ultima actividade.
- `/admin/alunos` virou painel operacional com cards de resumo, pesquisa, filtros por cursos/pagamentos/conclusoes e exportacao CSV.
- Exportacao de alunos nao inclui comprovativos, tokens, IDs internos de storage nem URLs sensiveis.
- `scripts/qa/visual-authenticated.mjs` foi corrigido para criar aula YouTube e pagamento `submitted`, alinhado com as regras atuais.
- Validacao executada: `npx convex codegen`, sintaxe Node, `npm run test`, `npm run lint`, `NEXT_TELEMETRY_DISABLED=1 npm run build`, `VISUAL_ROUTE_FILTER=admin-alunos scripts/qa/run-visual-docker.sh` e `qa:production-smoke`.

Incremento fase 4:

- Adicionado `@sentry/nextjs` com configuracao opcional para client, server e edge.
- Criados `src/instrumentation.ts`, `src/instrumentation-client.ts`, `src/sentry.server.config.ts`, `src/sentry.edge.config.ts` e scrubber `src/sentry.shared.ts`.
- `src/app/error.tsx` captura excecoes no Sentry quando DSN estiver configurado.
- `src/app/global-error.tsx` foi removido apos QA visual porque gerava erro de manifesto client no Next 16 local; a observabilidade fica em `app/error.tsx` e nos arquivos de instrumentation.
- `sendDefaultPii` fica desligado e o scrubber remove email, IP, cookies, headers de autorizacao, tokens, secrets e campos de comprovativo.
- `/api/health` agora mostra apenas booleanos de observabilidade, incluindo `sentryConfigured`, sem expor DSN, org, projeto ou token.
- `monitor:production` ganhou `--require-sentry` para exigir Sentry no ambiente real.
- Documentacao e templates de env foram atualizados com as variaveis Sentry opcionais e regra de nao enviar PII.
- Validacao executada: `npm run test`, `npm run lint`, `NEXT_TELEMETRY_DISABLED=1 npm run build`, `npm run qa:env:example`, `npm run monitor:production`, `npm run monitor:production -- --require-sentry --warn-only` e `qa:production-smoke`.

Incremento fase 5:

- QA visual ampla autenticada foi executada em ambiente Docker limpo cobrindo 26 rotas/cenarios em desktop e mobile.
- O runner `scripts/qa/visual-authenticated.mjs` ganhou retry controlado para paginas que ficam em loader durante recompilacao fria/HMR do Next dev, sem esconder falhas permanentes de renderizacao.
- A remocao de `src/app/global-error.tsx` eliminou os 500s e erros de manifest vistos na fase 4.
- Audit final de mutations reforcou rate limit e validacao server-side em cursos, modulos, aulas e artigos do blog.
- Seed mutations destrutivas foram bloqueadas fora de deployments Convex locais/anonimos.
- Novas submissoes por link externo de comprovativo foram bloqueadas; upload por storage continua sendo o caminho correto.
- Verificacao publica de certificados deixou de expor email do aluno e IDs internos.
- Validacao executada: `npx convex codegen`, `npm run test`, `npm run lint`, `NEXT_TELEMETRY_DISABLED=1 npm run build`, `scripts/qa/run-smokes.sh`, `qa:production-smoke`, `monitor:production`, `monitor:production -- --require-sentry --warn-only`, `VISUAL_ROUTE_FILTER=admin-alunos` no runner Docker, `VISUAL_ROUTE_FILTER=admin-settings` no runner Docker e `scripts/qa/run-visual-docker.sh` completo com `failedCount=0` em 26 cenarios.
- PR remoto confirmado em `https://github.com/vitaleevo/beasell/pull/1`, draft, mergeable, com Quality gate, Vercel, Vercel Preview Comments e CodeRabbit verdes no commit `128c7c8`.
- Preview Vercel mais recente: `https://beasell-p4bbpjomy-vitaleevos-projects.vercel.app`; smoke remoto anonimo retornou 401 por Vercel Deployment Protection.
- Scripts `qa:production-smoke` e `monitor:production` passaram a suportar `VERCEL_AUTOMATION_BYPASS_SECRET`/`--vercel-bypass-secret` e a reportar preview protegida de forma explicita.
- Criado workflow `.github/workflows/remote-smoke.yml` para validar previews Vercel por `deployment_status` e por disparo manual, usando `VERCEL_AUTOMATION_BYPASS_SECRET` quando configurado no GitHub. O check `Remote smoke` ja dispara e passa com notice controlado quando a preview protegida nao tem bypass configurado.

Foi feito:

- Criadas tabelas `auditLogs` e `rateLimits` no schema Convex.
- Criados helpers `convex/audit.ts`, `convex/auditLogs.ts` e `convex/rateLimit.ts`.
- Pagamentos agora tem rate limit para upload/submissao, transicoes mais seguras e auditoria de submissao/aprovacao/rejeicao.
- Aprovacao agora so aceita pagamento `submitted`; rejeicao exige motivo com minimo de 8 caracteres; pagamento aprovado/rejeitado bloqueia transicoes indevidas.
- Reenvio de comprovativo limpa nota/revisao anterior e volta para `submitted`.
- O aluno passa a ver a orientacao do admin quando o pagamento e rejeitado.
- Cursos, modulos e aulas geram auditoria em criacao/edicao/remocao e tem rate limit admin.
- Artigos do blog geram auditoria em criacao/edicao e tem rate limit admin.
- Novos comprovativos por URL externa sao bloqueados; o fallback de URL fica apenas para dados legados.
- `/admin/precos` passou a ter historico recente, confirmacao interna para alteracao de preco, modal de remocao e indicadores de controlo.
- `services` agora valida categoria/moeda/preco/features no backend, aplica rate limit admin e audita criacao/alteracao/remocao.
- Dashboard admin ganhou painel de saude operacional com pagamentos para rever, cursos publicados, pacotes de preco e auditoria 24h.
- Criado workflow `.github/workflows/ci.yml` com install, secret scan, env example, lint, tests e build.
- Criada politica operacional `docs/security/data-protection-and-operations.md` e ligada a checklist de producao.
- Adicionado teste `convex/audit.test.ts` para sanitizacao de audit metadata.

Arquivos principais:

- `convex/schema.ts`
- `convex/audit.ts`
- `convex/auditLogs.ts`
- `convex/rateLimit.ts`
- `convex/operations.ts`
- `convex/payments.ts`
- `convex/courses.ts`
- `convex/blog.ts`
- `convex/certificates.ts`
- `convex/paymentProof.ts`
- `convex/seed.ts`
- `scripts/deploy/production-smoke.mjs`
- `scripts/monitor/production-health.mjs`
- `.github/workflows/remote-smoke.yml`
- `convex/services.ts`
- `convex/users.ts`
- `src/instrumentation.ts`
- `src/instrumentation-client.ts`
- `src/sentry.shared.ts`
- `src/app/admin/dashboard/page.tsx`
- `src/app/admin/alunos/page.tsx`
- `src/app/admin/pagamentos/page.tsx`
- `src/app/admin/precos/page.tsx`
- `src/app/api/health/route.ts`
- `src/app/plataforma/cursos/[slug]/page.tsx`
- `.github/workflows/ci.yml`
- `docs/security/data-protection-and-operations.md`
- `docs/deploy/production-checklist.md`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- npx convex codegen
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- env NEXT_TELEMETRY_DISABLED=1 npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run qa:env
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run qa:env:example
wsl -d Ubuntu --cd /home/alexandre/beasell -- NEXT_PUBLIC_SITE_URL=http://localhost:3002 NEXT_PUBLIC_CONVEX_SITE_URL=http://127.0.0.1:3211 npm run qa:production-smoke
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/run-smokes.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run monitor:production -- --base-url http://localhost:3002 --convex-site-url http://127.0.0.1:3211
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run monitor:production -- --base-url http://localhost:3002 --convex-site-url http://127.0.0.1:3211 --require-sentry --warn-only
wsl -d Ubuntu --cd /home/alexandre/beasell -- scripts/qa/run-visual-docker.sh
Browser QA em `/admin/precos`, `/admin/pagamentos`, `/admin/dashboard` e runner visual Docker completo
```

Resultado:

- `convex codegen`: passou.
- `npm run lint`: passou.
- `npm run test`: 14 testes passaram.
- `npm run build`: passou.
- `qa:env` e `qa:env:example`: passaram.
- `qa:production-smoke`: passou usando `next start` local em `http://localhost:3002`.
- `scripts/qa/run-smokes.sh`: passou, incluindo bloqueios negativos de aluno contra admin/pagamentos/cursos/saude.
- `monitor:production`: passou com health, redirects, headers e Convex auth.
- `monitor:production -- --require-sentry --warn-only`: executou sem quebrar localmente e reportou `sentryConfigured=false`, esperado sem DSN local.
- `scripts/qa/run-visual-docker.sh`: passou com `failedCount=0` em 26 cenarios desktop/mobile.
- Smoke remoto na preview Vercel: check automatico `Remote smoke` passou com notice, mas foi bloqueado por Deployment Protection 401 sem bypass configurado; nao prova falha da aplicacao, mas impede declarar producao remota validada.
- Browser QA confirmou `/admin/precos` com controlo/historico e sem overflow no viewport atual.
- Browser QA confirmou `/admin/pagamentos` renderizando e botoes bloqueados para pagamentos que nao estao `submitted`.
- Browser QA confirmou dashboard com painel de saude e sem overflow no viewport atual.

Estado atual:

- As fases 1, 1.1, 2, 3, 4 e 5 local de hardening estao implementadas e validadas localmente.
- O objetivo maior ainda nao terminou apenas por dependencia externa: falta remover/fornecer bypass da Deployment Protection como secret GitHub/Vercel, configurar variaveis reais, dominio real e smoke no dominio publicado.
- O PR draft precisa ser atualizado com esta tranche fase 5.
- Continuam existindo alteracoes locais unstaged de ruido/logs/final de linha fora deste escopo; nao foram revertidas.

Estado do projeto:

- Fase/trilha atual: hardening profissional e seguranca de producao, fase 5 local concluida.
- Solido agora: auth, LMS, upload de comprovativos, aulas YouTube/Vimeo, auditoria base, rate limit base, CI, docs de dados sensiveis, dashboard de saude, smoke negativo versionado, `/api/health`, monitor operacional, Sentry opcional com scrubber e backoffice com exportacao/filtros em pagamentos e alunos.
- Falta imediato: fazer deploy remoto com smoke no dominio final ou preview com `VERCEL_AUTOMATION_BYPASS_SECRET`, configurar Sentry/Convex/Vercel reais e confirmar `ADMIN_EMAILS` do dono.
- Distancia do fim: MVP esta forte e validado localmente; producao real depende da publicacao remota e operacao externa.

## Proximo passo recomendado

Continuar com deploy remoto real: aplicar variaveis, obter bypass/abrir preview Vercel protegida, validar Convex/Vercel, configurar Sentry e rodar smoke no dominio final.

AVISO: O proximo passo e executar deploy remoto real do MVP Beasell com variaveis de producao, Convex/Vercel/Sentry configurados e smoke no dominio final. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

## Ultima etapa concluida: editor rico de cursos e aulas com YouTube/Vimeo

Objetivo: atualizar o backoffice para que a dona/professora da plataforma consiga criar cursos com mais detalhe e adicionar aulas em video a partir de links normais do YouTube ou Vimeo.

Foi feito:

- `CourseForm` passou de um formulario basico para um editor rico com capa, instrutor, categoria, nivel, idioma, descricao curta, descricao completa, objetivos, requisitos, tags, preco/moeda, curso gratuito, pre-visualizacao, promocao, certificado e publicacao.
- `createCourse` e `updateCourse` em `convex/courses.ts` agora aceitam e guardam os metadados ricos ja existentes no schema.
- A criacao/edicao de aulas no `ModuleLessonManager` agora aceita YouTube e Vimeo, detecta a fonte ao colar o link e mostra o embed normalizado antes de guardar.
- Links comuns como `https://www.youtube.com/watch?v=...`, `https://youtu.be/...`, `https://vimeo.com/...` e `https://player.vimeo.com/video/...` passam a ser transformados para embed.
- As aulas guardam `videoProvider` (`youtube` ou `vimeo`), `isFree`, `isRequired` e `allowDownload`.
- O backend valida aulas de video para aceitar apenas URL de YouTube ou Vimeo.

Arquivos principais:

- `convex/courses.ts`
- `src/features/courses/components/admin/CourseForm.tsx`
- `src/features/courses/components/admin/ModuleLessonManager.tsx`
- `src/features/courses/lib/videoProviders.ts`
- `src/app/admin/cursos/novo/page.tsx`
- `src/app/admin/cursos/[id]/page.tsx`
- `MEMORIA_BEASELL.md`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- npx convex codegen
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- env NEXT_TELEMETRY_DISABLED=1 npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run qa:env
wsl -d Ubuntu --cd /home/alexandre/beasell -- NEXT_PUBLIC_SITE_URL=http://localhost:3002 NEXT_PUBLIC_CONVEX_SITE_URL=http://127.0.0.1:3211 npm run qa:production-smoke
Browser QA em `/admin/cursos/novo` e `/admin/cursos/<id>`
```

Resultado:

- `convex codegen`: passou.
- `npm run lint`: passou sem avisos.
- `npm run test`: 12 testes passaram.
- `npm run build`: passou.
- `qa:env`: passou.
- `qa:production-smoke`: passou na repeticao com timeout maior; a primeira tentativa excedeu 120s sem falha funcional observada.
- Browser QA confirmou campos ricos no novo curso e nas definicoes do curso existente.
- Browser QA confirmou modal de aula com YouTube/Vimeo, link comum de YouTube normalizado para `youtube-nocookie` e Vimeo normalizado para `player.vimeo.com`.
- Browser QA confirmou ausencia de overflow horizontal no viewport atual.

Estado atual:

- A dona/professora consegue criar cursos muito mais completos.
- As aulas de video podem vir do YouTube da plataforma ou do Vimeo sem exigir URL embed manual.
- O PR draft existente deve ser atualizado com esta tranche antes de revisao/merge.
- Continuam existindo alteracoes locais unstaged de ruido/logs/final de linha fora deste escopo; nao foram revertidas.

Estado do projeto:

- Fase/trilha atual: MVP funcional com backoffice LMS mais forte.
- Solido agora: auth, LMS, backoffice, pagamentos manuais com upload, certificados, editor rico de curso, aulas YouTube/Vimeo, scripts de QA/deploy e smoke HTTP local.
- Falta imediato: atualizar PR no GitHub, revisar/mergear, configurar dominio/deployment Convex `prod:`/email real do dono e executar deploy remoto.
- Distancia do fim: MVP local esta pronto; producao real depende da publicacao remota e smoke no dominio final.

## Proximo passo recomendado

Atualizar o PR draft no GitHub com esta tranche, revisar o diff e preparar deploy remoto real.

AVISO: O proximo passo e criar/implementar atualizacao/revisao do PR draft e publicacao remota real do MVP Beasell com `deploy:init-env`, aplicacao das variaveis Convex com `APPLY=1`, dry-run Convex remoto e smoke pos-deploy no dominio publicado. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

## Ultima etapa concluida: upload de comprovativo e PR draft no GitHub

Objetivo: alinhar o fluxo de pagamento ao pedido do utilizador, explicar as capacidades do dono/professor e aluno, e subir a tranche do MVP para GitHub com cuidado contra dados sensiveis.

Foi feito:

- O fluxo de comprovativo deixou de depender de "link do comprovativo" na UI do aluno e passou a usar upload real de ficheiro via Convex Storage.
- Criado `convex/paymentProof.ts` com validacao server-side de ficheiro: PDF, PNG, JPG ou WEBP ate 8 MB.
- Adicionada a mutation `payments.generateProofUploadUrl`, autenticada, para gerar URL curta de upload.
- `payments.submitProof` e `courses.enroll` agora aceitam `paymentProofStorageId`.
- `payments.listForAdmin` resolve a URL do ficheiro guardado para o admin abrir em `/admin/pagamentos`.
- `src/app/plataforma/cursos/[slug]/page.tsx` agora mostra input de ficheiro para comprovativo e envia o ficheiro antes de pedir inscricao/submeter pagamento.
- Criado branch `codex/beasell-mvp-upload-payments` e PR draft: `https://github.com/vitaleevo/beasell/pull/1`.
- Antes do commit, `.env.local`, `.env`, `.env.production`, `.tmp/` e logs locais foram mantidos fora do PR; foi executado scan de segredos no conteudo staged.

Arquivos principais:

- `convex/paymentProof.ts`
- `convex/payments.ts`
- `convex/courses.ts`
- `convex/schema.ts`
- `src/app/plataforma/cursos/[slug]/page.tsx`
- `src/app/admin/pagamentos/page.tsx`
- `MEMORIA_BEASELL.md`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- npx convex codegen
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run qa:env
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run qa:env:example
wsl -d Ubuntu --cd /home/alexandre/beasell -- env NEXT_TELEMETRY_DISABLED=1 npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/health-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- NEXT_PUBLIC_SITE_URL=http://localhost:3002 NEXT_PUBLIC_CONVEX_SITE_URL=http://127.0.0.1:3211 npm run qa:production-smoke
Browser QA em `http://localhost:3002/plataforma/cursos/mestres-vendas-mercado-angolano`
Scan local de segredos no conteudo staged
wsl -d Ubuntu --cd /home/alexandre/beasell -- git diff --cached --check
wsl -d Ubuntu --cd /home/alexandre/beasell -- git push -u origin codex/beasell-mvp-upload-payments
```

Resultado:

- `convex codegen`: passou.
- `npm run lint`: passou.
- `npm run test`: 12 testes passaram.
- `qa:env` e `qa:env:example`: passaram.
- `npm run build`: passou.
- `health-local-docker`: passou com `next=200` e `convex=200`.
- `qa:production-smoke`: passou com paginas publicas, redirects de rotas privadas, endpoint Convex auth e headers de seguranca.
- Browser QA confirmou input de upload com accept `application/pdf,image/png,image/jpeg,image/webp`, sem label antiga de link e sem overflow horizontal.
- Scan de segredos: passou em 164 paths staged; falso positivo do gerador de secret foi conferido e allowlistado porque nao continha valor real.
- PR draft criado: `https://github.com/vitaleevo/beasell/pull/1`.

Estado atual:

- O aluno envia comprovativo pela plataforma, como ficheiro, e nao precisa colar link externo.
- O admin/dono abre o comprovativo na pagina de pagamentos, aprova para liberar aulas ou rejeita para manter o acesso bloqueado e permitir novo envio.
- O MVP esta no GitHub em PR draft.
- Ha alteracoes locais unstaged deixadas fora do commit por serem ruido/logs ou final de linha de trabalho anterior; nao foram revertidas.

Estado do projeto:

- Fase/trilha atual: MVP local funcional publicado em branch/PR draft para revisao.
- Solido agora: auth, LMS, backoffice, pagamentos manuais com upload, certificados, scripts de QA/deploy, smoke HTTP local e protecao de rotas privadas.
- Falta imediato: revisar/mergear PR, configurar dominio/deployment Convex `prod:`/email real do dono e executar deploy remoto.
- Distancia do fim: MVP local esta pronto; producao real esta quase pronta, dependendo da publicacao remota e smoke no dominio final.

## Proximo passo recomendado

Revisar e mergear o PR draft, depois executar deploy remoto real com valores de producao.

AVISO: O proximo passo e criar/implementar merge/revisao do PR draft e publicacao remota real do MVP Beasell com `deploy:init-env`, aplicacao das variaveis Convex com `APPLY=1`, dry-run Convex remoto e smoke pos-deploy no dominio publicado. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

Plano inicial da proxima etapa:

- Abrir `https://github.com/vitaleevo/beasell/pull/1` e revisar diff/CI.
- Confirmar dominio final, deployment Convex `prod:` e email real do dono/professor.
- Rodar `npm run deploy:init-env -- --domain <dominio> --deployment <deployment-prod> --owner-email <email-do-dono>`.
- Rodar `APPLY=1 npm run deploy:convex:env -- /tmp/beasell.env.production`.
- Rodar `npm run deploy:convex:dry-run -- /tmp/beasell.env.production`.
- Publicar e executar `npm run qa:production-smoke` no dominio real.

Arquivos para investigar/abrir primeiro na proxima etapa:

- `MEMORIA_BEASELL.md`
- `convex/paymentProof.ts`
- `convex/payments.ts`
- `src/app/plataforma/cursos/[slug]/page.tsx`
- `src/app/admin/pagamentos/page.tsx`
- `docs/deploy/production-checklist.md`

## Ultima etapa concluida: polimento final da home e validacao MVP local

Objetivo: remover uma pendencia visivel da home ("Video em breve" e botao sem destino) e confirmar que o MVP local esta pronto e funcional com gates tecnicos e smoke HTTP.

Foi feito:

- Atualizada `src/features/marketing/components/home/VideoSection.tsx`.
- A secao deixou de prometer um video inexistente e passou a apresentar a metodologia Beasell com passos reais: diagnostico, treino aplicado e evolucao medida.
- Adicionados CTAs funcionais para `/plataforma/cursos` e `/contacto`.
- Validada a secao no navegador em desktop e mobile, sem overflow horizontal, sem texto "em breve" e com links corretos.

Arquivos principais:

- `src/features/marketing/components/home/VideoSection.tsx`
- `MEMORIA_BEASELL.md`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- npx prettier --write src/features/marketing/components/home/VideoSection.tsx
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run qa:env
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run qa:env:example
wsl -d Ubuntu --cd /home/alexandre/beasell -- env NEXT_TELEMETRY_DISABLED=1 npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/health-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- NEXT_PUBLIC_SITE_URL=http://localhost:3002 NEXT_PUBLIC_CONVEX_SITE_URL=http://127.0.0.1:3211 npm run qa:production-smoke
wsl -d Ubuntu --cd /home/alexandre/beasell -- git diff --check -- src/features/marketing/components/home/VideoSection.tsx
```

Resultado:

- `npm run lint`: passou.
- `npm run test`: 12 testes passaram.
- `npm run qa:env`: passou com `.env.local` apontado para Convex local.
- `npm run qa:env:example`: passou.
- `npm run build`: passou com Next.js 16.2.6 e todas as rotas principais geradas.
- `scripts/qa/health-local-docker.sh`: passou com `next=200` e `convex=200`.
- `qa:production-smoke`: passou com home, sign-in, sign-up e catalogo publico `200`, rotas admin/plataforma privadas redirecionando `307`, endpoint Convex auth `200` e headers de seguranca presentes.
- QA visual Browser: desktop `1280x720` e mobile `390x844` sem overflow horizontal na secao alterada, sem "Video em breve" e com CTAs corretos.
- `git diff --check`: passou no ficheiro alterado.

Estado atual:

- MVP local esta pronto e funcional em `http://localhost:3002`, com Convex local em `http://127.0.0.1:3211`.
- Fluxos publicos, protecao de rotas privadas, build, lint, testes, env readiness e smoke HTTP estao verdes localmente.
- A publicacao remota real ainda depende de dados externos: dominio final, deployment Convex de producao e email real do dono/professor.

Estado do projeto:

- Fase/trilha atual: MVP local validado e pronto para demonstracao/entrega local.
- Solido agora: site publico, catalogo LMS, backoffice, auth Better Auth + Convex, protecao server-side de rotas privadas, scripts de deploy/env e smoke local ampliado.
- Falta imediato: executar deploy remoto real quando existirem dominio, deployment Convex `prod:` e email unico do dono/professor.
- Distancia do fim: trilha MVP local esta pronta; produto publicado em producao esta quase pronto, bloqueado por configuracao/deploy remoto real.

## Proximo passo recomendado

Publicar o MVP no dominio real usando os scripts de deploy ja validados.

AVISO: O proximo passo e criar/implementar publicacao remota real do MVP Beasell com `deploy:init-env`, aplicacao das variaveis Convex com `APPLY=1`, dry-run Convex remoto e smoke pos-deploy no dominio publicado. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

Plano inicial da proxima etapa:

- Rodar `npm run deploy:init-env -- --domain <dominio> --deployment <deployment-prod> --owner-email <email-do-dono>`.
- Rodar `npm run deploy:convex:env -- /tmp/beasell.env.production`.
- Rodar `APPLY=1 npm run deploy:convex:env -- /tmp/beasell.env.production`.
- Rodar `npm run deploy:convex:dry-run -- /tmp/beasell.env.production`.
- Publicar Next.js/Convex e executar `npm run qa:production-smoke` no dominio real.

Arquivos para investigar/abrir primeiro na proxima etapa:

- `MEMORIA_BEASELL.md`
- `scripts/deploy/init-production-env.mjs`
- `scripts/deploy/apply-convex-env.sh`
- `scripts/deploy/convex-prod-dry-run.sh`
- `scripts/deploy/production-smoke.mjs`
- `docs/deploy/production-checklist.md`

## Ultima etapa concluida: smoke HTTP ampliado e protecao server-side da plataforma

Objetivo: fortalecer o smoke pos-deploy e corrigir rotas privadas da plataforma que ainda respondiam HTTP 200 antes da protecao cliente carregar.

Foi feito:

- Ampliado `scripts/deploy/production-smoke.mjs` para validar home, sign-in, sign-up, catalogo publico, todas as rotas admin principais, `/plataforma/meus-cursos`, uma rota de aula privada e o endpoint HTTP/Auth do Convex.
- O smoke ampliado encontrou uma falha real: `/plataforma/meus-cursos` retornava `200` para utilizador anonimo.
- Criado `src/app/plataforma/meus-cursos/layout.tsx` com redirect server-side para `/sign-in?redirect=/plataforma/meus-cursos`.
- Criado `src/app/plataforma/cursos/[slug]/aulas/[lessonId]/layout.tsx` com redirect server-side para a aula privada original.
- Atualizada `docs/deploy/production-checklist.md` para documentar a cobertura do smoke HTTP.

Arquivos principais:

- `scripts/deploy/production-smoke.mjs`
- `src/app/plataforma/meus-cursos/layout.tsx`
- `src/app/plataforma/cursos/[slug]/aulas/[lessonId]/layout.tsx`
- `docs/deploy/production-checklist.md`
- `MEMORIA_BEASELL.md`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --network host --user 1000:1000 -v /home/alexandre/beasell:/app -w /app -e NEXT_PUBLIC_SITE_URL=http://localhost:3002 -e NEXT_PUBLIC_CONVEX_SITE_URL=http://127.0.0.1:3211 node:22-alpine npm run qa:production-smoke
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine node --check scripts/deploy/production-smoke.mjs
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/start-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --network host --user 1000:1000 -v /home/alexandre/beasell:/app -w /app -e NEXT_PUBLIC_SITE_URL=http://localhost:3002 -e NEXT_PUBLIC_CONVEX_SITE_URL=http://127.0.0.1:3211 node:22-alpine npm run qa:production-smoke
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/stop-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app -e NEXT_TELEMETRY_DISABLED=1 node:22-alpine npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/start-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/health-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- git diff --check -- MEMORIA_BEASELL.md docs/deploy/production-checklist.md scripts/deploy/production-smoke.mjs src/app/plataforma/meus-cursos/layout.tsx src/app/plataforma/cursos/[slug]/aulas/[lessonId]/layout.tsx
```

Resultado:

- Smoke inicial ampliado falhou corretamente ao detectar `/plataforma/meus-cursos` com `200` anonimo.
- Depois da correcao, `qa:production-smoke` passou com 15 verificacoes: 4 paginas publicas `200`, 8 rotas admin com redirect `307`, `/plataforma/meus-cursos` com redirect `307`, aula privada com redirect `307` e Convex auth endpoint `200`.
- `node --check`: passou.
- `npm run lint`: passou sem erros e sem warnings.
- `npm run test`: 12 testes passaram.
- `npm run build`: passou.
- `scripts/qa/health-local-docker.sh`: passou com `next=200` e `convex=200`.
- `git diff --check`: passou nos ficheiros desta etapa.

Estado atual:

- Rotas privadas da plataforma agora tem protecao no HTTP inicial, nao apenas no cliente.
- O smoke pos-deploy cobre mais superficies criticas e apanha regressao de auth anonima em rotas privadas.
- O ambiente Docker local esta online em `http://localhost:3002`, com Convex local em `http://127.0.0.1:3211`.
- O deploy remoto real continua pendente ate existirem dominio, deployment Convex e email real do dono/professor.

Estado do projeto:

- Fase/trilha atual: hardening de auth/deploy smoke concluido.
- Solido agora: protecao server-side das rotas privadas principais, smoke HTTP ampliado, QA local, build, lint e testes.
- Falta imediato: gerar `/tmp/beasell.env.production` com dados reais, aplicar variaveis Convex com `APPLY=1`, rodar dry-run Convex remoto, publicar e validar o dominio real.
- Distancia do fim: trilha LMS/backoffice local esta perto de 96/100; produto completo para producao esta perto de 85/100 por faltar execucao remota real e smoke no dominio publicado.

## Proximo passo recomendado

Gerar `/tmp/beasell.env.production` com dados reais e executar aplicacao/dry-run Convex, agora com smoke HTTP mais forte para validar o dominio publicado.

AVISO: O proximo passo e criar/implementar geracao real de `/tmp/beasell.env.production` com `deploy:init-env`, aplicacao das variaveis Convex com `APPLY=1`, dry-run Convex remoto e smoke pos-deploy no dominio publicado. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

Plano inicial da proxima etapa:

- Rodar `npm run deploy:init-env -- --domain <dominio> --deployment <deployment> --owner-email <email-do-dono>`.
- Rodar `npm run deploy:convex:env -- /tmp/beasell.env.production`.
- Rodar `APPLY=1 npm run deploy:convex:env -- /tmp/beasell.env.production`.
- Rodar `npm run deploy:convex:dry-run -- /tmp/beasell.env.production`.
- Se passar, publicar Convex/Next.js e executar `npm run qa:production-smoke` no dominio final.

Arquivos para investigar/abrir primeiro na proxima etapa:

- `MEMORIA_BEASELL.md`
- `scripts/deploy/init-production-env.mjs`
- `scripts/deploy/apply-convex-env.sh`
- `scripts/deploy/convex-prod-dry-run.sh`
- `scripts/deploy/production-smoke.mjs`
- `docs/deploy/production-checklist.md`

## Ultima etapa concluida: inicializador seguro do env de producao

Objetivo: remover o risco de criar manualmente `/tmp/beasell.env.production` com placeholders, permissoes largas ou segredo fraco antes do deploy remoto.

Foi feito:

- Criado `scripts/deploy/init-production-env.mjs`.
- O script exige dominio publico, deployment Convex e email unico do dono/professor.
- O script gera automaticamente `BETTER_AUTH_SECRET` forte, grava o ficheiro fora do repositorio com modo `0600` e valida a saida com `check-env.mjs --mode production`.
- Adicionado script npm `deploy:init-env`.
- Atualizados `README.md` e `docs/deploy/production-checklist.md` para usar o inicializador seguro antes de aplicar variaveis Convex.
- Expandido `scripts/deploy/deploy-scripts.test.ts` de 3 para 5 testes, cobrindo criacao segura do env e bloqueio de escrita dentro do repositorio.

Arquivos principais:

- `scripts/deploy/init-production-env.mjs`
- `scripts/deploy/deploy-scripts.test.ts`
- `docs/deploy/production-checklist.md`
- `README.md`
- `package.json`
- `MEMORIA_BEASELL.md`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine node --check scripts/deploy/init-production-env.mjs
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run deploy:init-env -- --help
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npx vitest run scripts/deploy/deploy-scripts.test.ts
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/stop-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app -e NEXT_TELEMETRY_DISABLED=1 node:22-alpine npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker wait vibrant_payne
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/start-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/health-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- git diff --check -- MEMORIA_BEASELL.md README.md package.json docs/deploy/production-checklist.md scripts/deploy/init-production-env.mjs scripts/deploy/deploy-scripts.test.ts
```

Resultado:

- `node --check`: passou.
- `deploy:init-env -- --help`: passou.
- Teste focado `deploy-scripts.test.ts`: 5 testes passaram.
- `npm run lint`: passou sem erros e sem warnings.
- `npm run test`: 12 testes passaram.
- `npm run build`: a chamada inicial excedeu o timeout da ferramenta, mas o container Docker continuou e `docker wait vibrant_payne` devolveu exit code `0`.
- `scripts/qa/health-local-docker.sh`: passou com `next=200` e `convex=200`.
- `git diff --check`: passou nos ficheiros desta etapa.

Estado atual:

- Ainda nao existe `/tmp/beasell.env.production` real nesta maquina.
- Agora existe um caminho seguro para gerar esse ficheiro sem versionar segredos:
  `npm run deploy:init-env -- --domain <dominio> --deployment <deployment> --owner-email <email-do-dono>`.
- O ambiente Docker local esta online em `http://localhost:3002`, com Convex local em `http://127.0.0.1:3211`.
- O deploy remoto real continua pendente ate existirem dominio, deployment Convex e email real do dono/professor.

Estado do projeto:

- Fase/trilha atual: pre-deploy operacional pronto para receber valores reais de producao.
- Solido agora: geracao segura de env, scripts de deploy testados, env readiness, QA local, build, lint e testes.
- Falta imediato: gerar `/tmp/beasell.env.production` com dados reais, aplicar variaveis Convex com `APPLY=1`, rodar dry-run Convex remoto, publicar e validar o dominio real.
- Distancia do fim: trilha LMS/backoffice local esta perto de 95/100; produto completo para producao esta perto de 84/100 por faltar execucao remota real e smoke no dominio publicado.

## Proximo passo recomendado

Gerar `/tmp/beasell.env.production` com dados reais e executar o dry-run/aplicacao Convex conforme a checklist.

AVISO: O proximo passo e criar/implementar geracao real de `/tmp/beasell.env.production` com `deploy:init-env`, aplicacao das variaveis Convex com `APPLY=1`, dry-run Convex remoto e smoke pos-deploy no dominio publicado. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

Plano inicial da proxima etapa:

- Rodar `npm run deploy:init-env -- --domain <dominio> --deployment <deployment> --owner-email <email-do-dono>`.
- Rodar `npm run deploy:convex:env -- /tmp/beasell.env.production`.
- Rodar `APPLY=1 npm run deploy:convex:env -- /tmp/beasell.env.production`.
- Rodar `npm run deploy:convex:dry-run -- /tmp/beasell.env.production`.
- Se passar, publicar Convex/Next.js e executar smoke no dominio final.

Arquivos para investigar/abrir primeiro na proxima etapa:

- `MEMORIA_BEASELL.md`
- `scripts/deploy/init-production-env.mjs`
- `scripts/deploy/apply-convex-env.sh`
- `scripts/deploy/convex-prod-dry-run.sh`
- `docs/deploy/production-checklist.md`

## Ultima etapa concluida: testes dos scripts de deploy/env

Objetivo: proteger os scripts de readiness/deploy com testes automatizados e confirmar novamente build, lint, testes e ambiente Docker local antes de avancar para o deploy remoto real.

Foi feito:

- Criado `scripts/deploy/deploy-scripts.test.ts` para validar regressao dos scripts de deploy/env.
- Coberto o validador de producao para aceitar valores reais/falsos seguros e mascarar valores sensiveis.
- Coberta a rejeicao de `localhost` e deployment nao-producao quando o modo e `production`.
- Coberto o filtro de variaveis Convex para emitir apenas chaves server-side e escapar apostrofos com seguranca.
- Reexecutados os gates principais em Docker: lint, testes completos, build e health local.

Arquivos principais:

- `scripts/deploy/deploy-scripts.test.ts`
- `scripts/deploy/check-env.mjs`
- `scripts/deploy/filter-convex-env.mjs`
- `scripts/deploy/apply-convex-env.sh`
- `docs/deploy/production-checklist.md`
- `MEMORIA_BEASELL.md`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npx vitest run scripts/deploy/deploy-scripts.test.ts
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/stop-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app -e NEXT_TELEMETRY_DISABLED=1 node:22-alpine npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/start-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/health-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- git diff --check -- MEMORIA_BEASELL.md README.md package.json docs/deploy/production-checklist.md docs/deploy/env.production.example scripts/deploy/apply-convex-env.sh scripts/deploy/filter-convex-env.mjs scripts/deploy/deploy-scripts.test.ts
```

Resultado:

- Teste focado `deploy-scripts.test.ts`: 3 testes passaram.
- `npm run lint`: passou sem erros e sem warnings.
- `npm run test`: 10 testes passaram.
- `npm run build`: passou com todas as rotas geradas.
- `scripts/qa/health-local-docker.sh`: passou com `next=200` e `convex=200`.
- `git diff --check`: passou nos ficheiros desta etapa.

Estado atual:

- Os scripts de deploy/env agora tem cobertura automatizada contra regressao.
- O ambiente Docker local esta online em `http://localhost:3002`, com Convex local em `http://127.0.0.1:3211`.
- O deploy remoto real ainda nao foi executado porque falta o ficheiro `/tmp/beasell.env.production` com valores reais e a aplicacao efetiva das variaveis no Convex/hosting.

Estado do projeto:

- Fase/trilha atual: hardening operacional de pre-deploy concluido; deploy remoto ainda pendente.
- Solido agora: scripts de deploy testados, env readiness, dry-run de variaveis Convex, QA local, build, lint e testes.
- Falta imediato: preencher `/tmp/beasell.env.production`, aplicar variaveis Convex com `APPLY=1`, rodar dry-run Convex remoto, publicar e validar o dominio real.
- Distancia do fim: trilha LMS/backoffice local esta perto de 95/100; produto completo para producao esta perto de 83/100 por faltar execucao remota real e smoke no dominio publicado.

## Proximo passo recomendado

Usar valores reais de producao para aplicar variaveis Convex, rodar o dry-run remoto e publicar apenas depois dos gates passarem.

AVISO: O proximo passo e criar/implementar aplicacao real das variaveis Convex com `APPLY=1`, dry-run Convex remoto e smoke pos-deploy no dominio publicado. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

Plano inicial da proxima etapa:

- Copiar `docs/deploy/env.production.example` para `/tmp/beasell.env.production` e preencher com valores reais.
- Rodar `bash scripts/deploy/apply-convex-env.sh /tmp/beasell.env.production`.
- Rodar `APPLY=1 bash scripts/deploy/apply-convex-env.sh /tmp/beasell.env.production`.
- Rodar `bash scripts/deploy/convex-prod-dry-run.sh /tmp/beasell.env.production`.
- Se passar, publicar Convex/Next.js e executar smoke no dominio final.

Arquivos para investigar/abrir primeiro na proxima etapa:

- `MEMORIA_BEASELL.md`
- `docs/deploy/env.production.example`
- `scripts/deploy/apply-convex-env.sh`
- `scripts/deploy/convex-prod-dry-run.sh`
- `scripts/deploy/production-smoke.mjs`
- `docs/deploy/production-checklist.md`

## Ultima etapa concluida: dry-run de variaveis Convex de producao

Objetivo: preparar a configuracao server-side do Convex para producao com um fluxo seguro, validavel e sem exposicao de segredos antes do deploy real.

Foi feito:

- Criado `scripts/deploy/filter-convex-env.mjs` para extrair apenas as variaveis server-side usadas pelo Convex:
  - `SITE_URL`
  - `BETTER_AUTH_TRUSTED_ORIGINS`
  - `BETTER_AUTH_SECRET`
  - `ADMIN_EMAILS`
- Criado `scripts/deploy/apply-convex-env.sh`, que valida o env de producao, gera um ficheiro temporario filtrado e por padrao faz apenas dry-run.
- A aplicacao real das variaveis no Convex fica protegida por `APPLY=1`.
- Criado `docs/deploy/env.production.example` como template versionado para copiar para `/tmp/beasell.env.production`.
- Adicionado `deploy:convex:env` ao `package.json`.
- Atualizados `README.md` e `docs/deploy/production-checklist.md` com o fluxo de variaveis Convex.

Arquivos principais:

- `scripts/deploy/filter-convex-env.mjs`
- `scripts/deploy/apply-convex-env.sh`
- `docs/deploy/env.production.example`
- `docs/deploy/production-checklist.md`
- `README.md`
- `package.json`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- ./node_modules/.bin/convex env set --help
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash -n scripts/deploy/apply-convex-env.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine node --check scripts/deploy/filter-convex-env.mjs
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/deploy/apply-convex-env.sh --help
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine node scripts/deploy/check-env.mjs --file docs/deploy/env.production.example --mode example
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/deploy/apply-convex-env.sh /tmp/beasell-prod-test.env
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app -e NEXT_TELEMETRY_DISABLED=1 node:22-alpine npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/start-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/health-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- git diff --check -- README.md package.json docs/deploy/production-checklist.md docs/deploy/env.production.example scripts/deploy/apply-convex-env.sh scripts/deploy/filter-convex-env.mjs
```

Resultado:

- Ajuda do `convex env set`: confirmada a sintaxe `convex env --deployment <target> set --from-file <file>`.
- Scripts bash/Node: sintaxe OK.
- Template `docs/deploy/env.production.example`: passou em modo example.
- Dry-run `apply-convex-env.sh` com env falso temporario em `/tmp`: passou, mostrando apenas chaves e mascarando valores sensiveis.
- `npm run lint`: passou sem erros e sem warnings.
- `npm run test`: 7 testes passaram.
- `npm run build`: passou.
- `scripts/qa/health-local-docker.sh`: passou com `next=200`, `convex=200`.
- `git diff --check`: passou nos ficheiros desta etapa.

Estado atual:

- As variaveis Convex de producao podem agora ser conferidas em dry-run antes de serem escritas.
- O projeto evita enviar variaveis publicas de Next para o ambiente Convex; apenas as server-side necessarias sao filtradas.
- O ambiente Docker local continua vivo em `http://localhost:3002`.
- O deploy remoto real ainda nao foi executado porque falta o ficheiro `/tmp/beasell.env.production` com valores reais e acesso Convex/hosting.

Estado do projeto:

- Fase/trilha atual: preparacao operacional de deploy remoto quase completa.
- Solido agora: preflight, env readiness, dry-run de variaveis Convex, QA local, smokes, build, lint e testes.
- Falta imediato: preencher `/tmp/beasell.env.production` com valores reais, aplicar `APPLY=1` no Convex, rodar `convex-prod-dry-run.sh`, publicar e validar o dominio.
- Distancia do fim: trilha LMS/backoffice local esta perto de 95/100; produto completo para producao esta perto de 82/100 por faltar execucao remota real.

## Proximo passo recomendado

Usar valores reais de producao para aplicar variaveis Convex, rodar o dry-run de deploy e publicar apenas depois dos dois passos passarem.

AVISO: O proximo passo e criar/implementar aplicacao real das variaveis Convex com `APPLY=1` e dry-run/deploy Convex remoto. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

Plano inicial da proxima etapa:

- Copiar `docs/deploy/env.production.example` para `/tmp/beasell.env.production` e preencher com valores reais.
- Rodar `bash scripts/deploy/apply-convex-env.sh /tmp/beasell.env.production`.
- Rodar `APPLY=1 bash scripts/deploy/apply-convex-env.sh /tmp/beasell.env.production`.
- Rodar `bash scripts/deploy/convex-prod-dry-run.sh /tmp/beasell.env.production`.
- Se passar, publicar Convex e depois executar smoke no dominio final.

Arquivos para investigar/abrir primeiro na proxima etapa:

- `MEMORIA_BEASELL.md`
- `docs/deploy/env.production.example`
- `scripts/deploy/apply-convex-env.sh`
- `scripts/deploy/convex-prod-dry-run.sh`
- `docs/deploy/production-checklist.md`

## Ultima etapa concluida: preflight Docker executavel e smoke de dominio

Objetivo: transformar a checklist de producao em comandos repetiveis para reduzir risco no deploy remoto, sem publicar ainda e sem expor credenciais.

Foi feito:

- Criado `scripts/deploy/preflight-docker.sh`, que executa validacao de env, lint, testes, build, smokes autenticados e health em Docker.
- Criado `scripts/deploy/production-smoke.mjs`, um smoke HTTP minimo para validar dominio publicado ou ambiente local equivalente.
- Criado `scripts/deploy/convex-prod-dry-run.sh`, que valida o ficheiro de producao e roda `convex deploy --dry-run --typecheck enable`.
- Adicionados scripts `qa:preflight`, `qa:production-smoke` e `deploy:convex:dry-run` ao `package.json`.
- Atualizados `README.md` e `docs/deploy/production-checklist.md` com os novos comandos.
- Confirmada a ajuda local do Convex CLI para `deploy --dry-run`, `env` e `deployment`.

Arquivos principais:

- `scripts/deploy/preflight-docker.sh`
- `scripts/deploy/production-smoke.mjs`
- `scripts/deploy/convex-prod-dry-run.sh`
- `docs/deploy/production-checklist.md`
- `README.md`
- `package.json`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- ./node_modules/.bin/convex deploy --help
wsl -d Ubuntu --cd /home/alexandre/beasell -- ./node_modules/.bin/convex env --help
wsl -d Ubuntu --cd /home/alexandre/beasell -- ./node_modules/.bin/convex deployment --help
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash -n scripts/deploy/preflight-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash -n scripts/deploy/convex-prod-dry-run.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine node --check scripts/deploy/production-smoke.mjs
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/start-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --network host --user 1000:1000 -v /home/alexandre/beasell:/app -w /app -e NEXT_PUBLIC_SITE_URL=http://localhost:3002 -e NEXT_PUBLIC_CONVEX_SITE_URL=http://127.0.0.1:3211 node:22-alpine npm run qa:production-smoke
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/deploy/preflight-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/deploy/convex-prod-dry-run.sh --help
wsl -d Ubuntu --cd /home/alexandre/beasell -- git diff --check -- README.md package.json docs/deploy/production-checklist.md scripts/deploy/preflight-docker.sh scripts/deploy/production-smoke.mjs scripts/deploy/convex-prod-dry-run.sh
```

Resultado:

- Scripts bash e Node: sintaxe OK.
- `qa:production-smoke` contra `http://localhost:3002`: passou, validando `/`, `/sign-in`, `/plataforma/cursos`, redirect anonimo de `/admin/dashboard` e endpoint Convex auth local.
- `scripts/deploy/preflight-docker.sh`: passou com env example/local, lint, 7 testes, build, smokes autenticados e health local Docker.
- `convex-prod-dry-run.sh --help`: passou e documenta o uso seguro com ficheiro temporario.
- `git diff --check`: passou nos ficheiros desta etapa.

Estado atual:

- O projeto tem agora um comando unico de preflight local: `bash scripts/deploy/preflight-docker.sh`.
- A QA visual completa continua disponivel com `RUN_VISUAL=1 bash scripts/deploy/preflight-docker.sh`.
- O dry-run Convex esta preparado, mas ainda nao foi executado contra producao porque falta um ficheiro temporario com valores reais e credenciais Convex.

Estado do projeto:

- Fase/trilha atual: pre-deploy operacional concluido; deploy remoto pendente.
- Solido agora: preflight Docker agregado, smoke HTTP de dominio, env readiness, QA local, smokes, build, lint e testes.
- Falta imediato: fornecer/configurar valores reais de producao, executar `convex-prod-dry-run.sh`, publicar Convex/Next e validar no dominio real.
- Distancia do fim: trilha LMS/backoffice local esta perto de 94/100; produto completo para producao esta perto de 80/100 por faltar execucao remota e validacao pos-deploy.

## Proximo passo recomendado

Criar fora do repositorio o ficheiro `/tmp/beasell.env.production` com valores reais, executar o dry-run Convex e depois publicar apenas se o dry-run passar.

AVISO: O proximo passo e criar/implementar dry-run Convex remoto com `/tmp/beasell.env.production` e depois deploy/smoke pos-deploy no dominio publicado. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

Plano inicial da proxima etapa:

- Preencher `/tmp/beasell.env.production` com valores reais, sem versionar.
- Rodar `bash scripts/deploy/convex-prod-dry-run.sh /tmp/beasell.env.production`.
- Se o dry-run passar, configurar variaveis reais no hosting/Convex e publicar.
- Rodar `npm run qa:production-smoke` contra o dominio final.

Arquivos para investigar/abrir primeiro na proxima etapa:

- `MEMORIA_BEASELL.md`
- `docs/deploy/production-checklist.md`
- `scripts/deploy/convex-prod-dry-run.sh`
- `scripts/deploy/preflight-docker.sh`
- `scripts/deploy/production-smoke.mjs`

## Ultima etapa concluida: readiness de producao e checklist de deploy

Objetivo: preparar o proximo passo de deploy/sync Convex remoto com validacao segura de variaveis, sem expor segredos e sem publicar ainda em ambiente remoto.

Foi feito:

- Criado `scripts/deploy/check-env.mjs` para validar `.env.local`, `.env.example` e ambiente de producao sem imprimir valores privados.
- Adicionados scripts `qa:env`, `qa:env:example` e `qa:env:production` ao `package.json`.
- `.env.example` passou a documentar `NEXT_PUBLIC_SITE_URL`, usado pelo SEO/canonical URL.
- Criada `docs/deploy/production-checklist.md` com ordem de publicacao: gates locais, variaveis, Convex remoto, deploy Next.js, smoke manual e rollback.
- `README.md` foi atualizado com comandos de validacao de ambiente e link para checklist.
- `package.json` foi normalizado para LF depois de alterar scripts.

Arquivos principais:

- `scripts/deploy/check-env.mjs`
- `docs/deploy/production-checklist.md`
- `.env.example`
- `README.md`
- `package.json`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run qa:env:example
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run qa:env
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app -e CONVEX_DEPLOYMENT=prod:beasell -e SITE_URL=https://beasell.ao -e NEXT_PUBLIC_SITE_URL=https://beasell.ao -e BETTER_AUTH_TRUSTED_ORIGINS=https://beasell.ao -e NEXT_PUBLIC_CONVEX_URL=https://beasell.convex.cloud -e NEXT_PUBLIC_CONVEX_SITE_URL=https://beasell.convex.site -e BETTER_AUTH_SECRET='<secret-falso-para-teste>' -e ADMIN_EMAILS=owner@beasell.ao node:22-alpine npm run qa:env:production
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app -e NEXT_TELEMETRY_DISABLED=1 node:22-alpine npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/run-smokes-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/health-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- git diff --check -- .env.example README.md package.json scripts/deploy/check-env.mjs docs/deploy/production-checklist.md
```

Resultado:

- `qa:env:example`: passou e confirmou que o exemplo documenta todas as chaves exigidas.
- `qa:env`: passou com `.env.local` e valores sensiveis mascarados.
- `qa:env:production`: passou com variaveis falsas de producao injetadas no container, provando as regras do validador.
- `npm run lint`: passou sem erros e sem warnings.
- `npm run test`: 7 testes passaram.
- `npm run build`: passou.
- `scripts/qa/run-smokes-docker.sh`: passou com pagamentos, detalhe de aluno, redirect sem sessao e 11 rotas admin autenticadas.
- `scripts/qa/health-local-docker.sh`: passou com `next=200`, `convex=200`.
- `git diff --check`: passou nos ficheiros desta etapa.

Estado atual:

- Existe agora um caminho documentado e verificavel para preparar producao sem revelar segredos.
- O ambiente local continua vivo em Docker em `http://localhost:3002`.
- O deploy remoto ainda nao foi executado porque depende das credenciais/ambiente de hosting e de valores reais de producao.

Estado do projeto:

- Fase/trilha atual: readiness de producao preparado; publicacao remota ainda pendente.
- Solido agora: gates locais, QA visual anterior, smokes autenticados, build, lint, testes e validacao de env.
- Falta imediato: inserir valores reais de producao no hosting/Convex, executar deploy/sync remoto e fazer smoke manual no dominio publicado.
- Distancia do fim: trilha LMS/backoffice local esta perto de 93/100; produto completo para producao esta perto de 78/100 porque o ambiente remoto ainda nao foi publicado/verificado.

## Proximo passo recomendado

Executar o deploy/sync Convex remoto com as credenciais reais, configurar variaveis de producao no hosting Next.js e validar o dominio publicado com a checklist.

AVISO: O proximo passo e criar/implementar deploy/sync Convex remoto e smoke pos-deploy no dominio publicado. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

Plano inicial da proxima etapa:

- Criar um ficheiro temporario fora do repositorio com as variaveis reais de producao e rodar `check-env.mjs --mode production`.
- Configurar as mesmas variaveis no Convex/hosting sem versionar segredos.
- Publicar Convex e Next.js.
- Fazer smoke manual do dono, aluno, curso pago e aprovacao/rejeicao de pagamento no dominio final.

Arquivos para investigar/abrir primeiro na proxima etapa:

- `MEMORIA_BEASELL.md`
- `docs/deploy/production-checklist.md`
- `scripts/deploy/check-env.mjs`
- `convex/http.ts`
- `convex/betterAuth/auth.ts`

## Ultima etapa concluida: QA visual autenticada e responsividade admin

Objetivo: validar visualmente as paginas autenticadas do backoffice/plataforma em Docker, corrigir os problemas reportados na imagem do sidebar/layout e fechar os gates principais depois das correcções.

Foi feito:

- Criado `scripts/qa/visual-authenticated.mjs` para gerar admin/aluno/curso temporarios, autenticar no browser headless e capturar desktop/mobile das rotas principais.
- Criado `scripts/qa/run-visual-docker.sh` com Playwright em Docker, cache fora do workspace e relatorio/screenshot em `/tmp/beasell-visual-qa`.
- `scripts/qa/start-local-docker.sh` e `scripts/qa/start-local.sh` passaram a usar `next dev --webpack`, evitando panic/intermitencia do Turbopack em volume WSL.
- O dashboard admin recebeu reforços de `min-w-0`, `overflow-x-hidden`, texto quebravel em actividade recente e remocao de decoracao que saía do viewport.
- `AdminPageShell` e `SidebarInset` foram reforcados para nao deixar conteudo vazar horizontalmente.
- `/admin/alunos`, `/admin/conteudos` e `/admin/pagamentos` ganharam versoes mobile em cards; as tabelas ficam apenas em `md+`.

Arquivos principais:

- `scripts/qa/visual-authenticated.mjs`
- `scripts/qa/run-visual-docker.sh`
- `scripts/qa/start-local-docker.sh`
- `scripts/qa/start-local.sh`
- `src/shared/components/layout/AdminPageShell.tsx`
- `src/shared/components/ui/sidebar.tsx`
- `src/app/admin/dashboard/page.tsx`
- `src/app/admin/alunos/page.tsx`
- `src/app/admin/conteudos/page.tsx`
- `src/app/admin/pagamentos/page.tsx`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/run-visual-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app -e NEXT_TELEMETRY_DISABLED=1 node:22-alpine npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/run-smokes-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/start-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/health-local-docker.sh
```

Resultado:

- QA visual autenticada em Docker: 26/26 paginas passaram (`failedCount=0`), cobrindo desktop e mobile de dashboard, cursos, aluno/detalhe, conteudos, analise, pagamentos, precos, definicoes e plataforma.
- `npm run lint` em Docker: passou sem erros e sem warnings.
- `npm run test` em Docker: 7 testes passaram.
- `npm run build` em Docker: passou com Next.js 16.2.6 e TypeScript OK.
- `scripts/qa/run-smokes-docker.sh`: passou validando pagamentos manuais, detalhe do aluno, redirect sem sessao e 11 rotas admin autenticadas.
- Ambiente Docker local reaberto em `http://localhost:3002`; health check passou com `next=200`, `convex=200`.

Estado atual:

- As paginas que tinham risco de sidebar/overflow em mobile agora passam no detector visual.
- Backoffice e plataforma estao validados localmente com auth real, dados temporarios e screenshots headless.
- O relatorio visual mais recente fica em `/tmp/beasell-visual-qa/visual-report.json` e os screenshots em `/tmp/beasell-visual-qa/screenshots`.
- Ainda falta preparar/sincronizar o ambiente remoto Convex/deploy e fazer uma revisao manual final no browser.

Estado do projeto:

- Fase/trilha atual: hardening visual e QA local autenticada concluida.
- Solido agora: build, lint, testes, smokes, health Docker e QA visual desktop/mobile das rotas centrais.
- Falta imediato: deploy/sync Convex remoto, checklist de variaveis de producao, revisao manual final e eventual PR/commit.
- Distancia do fim: trilha LMS/backoffice local esta perto de 91/100; produto completo para producao esta perto de 74/100 por ainda depender de ambiente remoto e checklist de entrega.

## Proximo passo recomendado

Preparar o deploy/sync Convex remoto e checklist de producao, reutilizando os smokes Docker como prova local antes de publicar.

AVISO: O proximo passo e criar/implementar deploy/sync Convex remoto e checklist de producao. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

Plano inicial da proxima etapa:

- Rever variaveis `.env.local` e equivalentes de producao sem expor segredos.
- Preparar comandos Convex remoto/deploy e confirmar trusted origins.
- Rodar smokes Docker finais depois de qualquer ajuste remoto.
- Fazer revisao manual no browser em `http://localhost:3002` antes de entrega.

Arquivos para investigar/abrir primeiro na proxima etapa:

- `MEMORIA_BEASELL.md`
- `.env.example`
- `convex/auth.config.ts`
- `convex/http.ts`
- `scripts/qa/run-smokes-docker.sh`
- `scripts/qa/visual-authenticated.mjs`

## Ultima etapa concluida: QA Docker persistente e lint totalmente verde

Objetivo: estabilizar o ambiente local de QA para que Convex e Next continuem vivos fora da chamada WSL, validar os smokes autenticados em Docker e fechar o lint sem warnings em codigo gerado.

Foi feito:

- `eslint.config.mjs` agora ignora tambem `convex/betterAuth/_generated/**`, evitando warnings de `eslint-disable` em codigo automaticamente gerado.
- `scripts/qa/start-local.sh` passou a usar a `backendVersion` local de `.convex/local/default/config.json`, evitando a consulta de "latest backend version" que falhava antes.
- Criados scripts Docker persistentes:
  - `scripts/qa/start-local-docker.sh`
  - `scripts/qa/stop-local-docker.sh`
  - `scripts/qa/health-local-docker.sh`
  - `scripts/qa/run-smokes-docker.sh`
- Criado `scripts/qa/run-smokes.sh` para rodar os smokes sequenciais no ambiente local.
- O smoke de rotas admin agora inclui explicitamente `/admin/pagamentos`.
- Confirmado que os containers `beasell-qa-convex` e `beasell-qa-next` permanecem vivos apos a shell WSL terminar.

Arquivos principais:

- `eslint.config.mjs`
- `scripts/qa/start-local.sh`
- `scripts/qa/run-smokes.sh`
- `scripts/qa/start-local-docker.sh`
- `scripts/qa/stop-local-docker.sh`
- `scripts/qa/health-local-docker.sh`
- `scripts/qa/run-smokes-docker.sh`
- `.tmp/admin-route-smoke.mjs`
- `.tmp/run-convex-persistent.sh`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app -e NEXT_TELEMETRY_DISABLED=1 node:22-alpine npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/run-smokes-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash scripts/qa/health-local-docker.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash -lc "git diff --check -- <ficheiros-tocados>"
```

Resultado:

- `npm run lint` em Docker: passou sem erros e sem warnings.
- `npm run test` em Docker: 7 testes passaram.
- `npm run build` em Docker: passou com Next.js 16.2.6 e TypeScript OK.
- `scripts/qa/run-smokes-docker.sh`: passou validando pagamentos manuais, detalhe do aluno, redirect sem sessao e 11 rotas admin autenticadas, incluindo `/admin/pagamentos`.
- `scripts/qa/health-local-docker.sh`: passou com `next=200`, `convex=200`; containers `beasell-qa-next` e `beasell-qa-convex` ativos.
- `git diff --check`: passou.

Estado atual:

- O ambiente de QA persistente agora funciona melhor via Docker detached do que via `nohup` dentro de WSL.
- `http://localhost:3002` fica disponivel para teste manual/browser enquanto os containers Docker estiverem ativos.
- O backend Convex local usa a versao fixa `precompiled-2026-05-27-e85ff37`, evitando falha de fetch da versao mais recente.
- Ainda existem avisos runtime informativos do Better Auth sobre IP em ambiente local e warnings Node `MODULE_TYPELESS_PACKAGE_JSON` nos smokes, mas nao bloqueiam lint/test/build/smoke.

Estado do projeto:

- Fase/trilha atual: hardening local e QA tecnica persistente.
- Solido agora: lint totalmente verde, testes unitarios, build, smokes de pagamentos, detalhe de aluno e rotas admin autenticadas, incluindo pagamentos.
- Falta imediato: QA visual real no browser usando o ambiente Docker vivo, validar responsividade/sidebar nas paginas admin/plataforma, e deploy/sync Convex remoto.
- Distancia do fim: trilha LMS/backoffice local esta perto de 86/100; produto completo para producao esta perto de 68/100 por ainda faltar QA visual e ambiente remoto.

## Proximo passo recomendado

Usar o browser em `http://localhost:3002` para QA visual autenticada das rotas principais e depois preparar deploy/sync Convex remoto.

AVISO: O proximo passo e criar/implementar QA visual autenticada no browser e deploy/sync Convex remoto. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

Plano inicial da proxima etapa:

- Entrar no browser em `http://localhost:3002/sign-in`.
- Validar visualmente sidebar, mobile/desktop e conteudo de `/admin/dashboard`, `/admin/cursos`, `/admin/alunos`, `/admin/conteudos`, `/admin/analise`, `/admin/pagamentos`, `/admin/precos`, `/admin/settings`, `/plataforma/cursos` e `/plataforma/meus-cursos`.
- Corrigir qualquer sobreposicao, overflow, layout quebrado ou fluxo confuso encontrado.
- Preparar checklist de variaveis e deploy/sync Convex remoto.

Arquivos para investigar/abrir primeiro na proxima etapa:

- `MEMORIA_BEASELL.md`
- `scripts/qa/start-local-docker.sh`
- `scripts/qa/run-smokes-docker.sh`
- `src/shared/components/layout/AdminSidebar.tsx`
- `src/app/admin/pagamentos/page.tsx`
- `src/app/admin/cursos/page.tsx`

## Ultima etapa concluida: limpeza de warnings legados simples

Objetivo: reduzir a divida de lint que restava depois da limpeza de imagens, removendo imports mortos, `any` simples e contratos pequenos sem alterar o comportamento central do LMS.

Foi feito:

- Removidos imports nao usados em componentes de marketing, header, desktop nav, contact hero e newsletter.
- `PageHero` agora usa `ctaLink` quando a prop e fornecida, em vez de aceitar a prop e ignorar.
- `StatsSection` passou a tipar os cards de estatisticas com `LucideIcon`, removendo `any` e imports de hooks nao usados.
- `ContactForm` passou a usar `useWatch` para observar apenas o campo `service`.
- Alinhado o tipo partilhado `ContactInterest` com as opcoes reais do formulario (`curso` e `outro` incluidos).
- Removidos casts `any` do envio de contacto e do `trigger` do React Hook Form.
- Tipados casos simples de `Record<string, unknown>` e erro de validacao visual.
- `chart.tsx` recebeu tipos leves para payload de tooltip/legend, removendo `any` sem alterar o padrao visual do componente.
- Corrigidos tipos shadcn simples em `command`, `textarea` e `use-toast`.

Arquivos principais:

- `src/shared/components/forms/ContactForm.tsx`
- `src/shared/types/contact.ts`
- `src/shared/services/emailService.ts`
- `src/shared/components/ui/chart.tsx`
- `src/shared/components/ui/form-validation.tsx`
- `src/features/marketing/components/home/StatsSection.tsx`
- `src/features/marketing/components/heroes/PageHero.tsx`
- `src/shared/components/layout/Header.tsx`
- `src/shared/components/layout/header/DesktopNav.tsx`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app -e NEXT_TELEMETRY_DISABLED=1 node:22-alpine npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash -lc "git diff --check -- <ficheiros-tocados>"
```

Resultado:

- `npm run lint` em Docker: passou com 0 erros e 2 warnings restantes apenas em ficheiros gerados `convex/betterAuth/_generated/*`.
- `npm run test` em Docker: 7 testes passaram.
- `npm run build` em Docker: passou com Next.js 16.2.6 e TypeScript OK.
- `git diff --check`: passou.

Estado atual:

- Lint do codigo editavel esta praticamente limpo; os unicos warnings restantes estao em codigo gerado automaticamente pelo Better Auth/Convex.
- O contrato do formulario de contacto esta mais correto e nao depende mais de `any` para mapear servicos.
- Build/test/lint foram validados em Docker dentro do Ubuntu.
- Ainda falta QA visual autenticada longa e deploy/sync Convex remoto.

Estado do projeto:

- Fase/trilha atual: hardening local e preparacao de entrega.
- Solido agora: LMS/backoffice compila, testes passam, lint sem erros, imagens sem `<img>`, pagamentos manuais e certificados continuam cobertos por smokes/memoria anterior.
- Falta imediato: decidir se o ESLint deve ignorar `_generated`, rodar QA browser autenticada continua, validar `/admin/pagamentos` visualmente, sincronizar/publicar Convex remoto e preparar entrega/PR.
- Distancia do fim: trilha LMS/backoffice local esta perto de 84/100; produto completo para producao continua perto de 66/100 por depender de ambiente remoto e QA visual real.

## Proximo passo recomendado

Estabilizar QA browser persistente e validar visualmente as rotas autenticadas principais, especialmente `/admin/pagamentos`, `/admin/cursos`, `/admin/analise`, `/admin/alunos/[id]`, `/plataforma/cursos` e `/plataforma/meus-cursos`.

AVISO: O proximo passo e criar/implementar QA browser autenticada persistente e deploy/sync Convex remoto. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

Plano inicial da proxima etapa:

- Subir Convex/Next local persistente em Ubuntu de forma estavel.
- Abrir browser e validar screenshots/fluxos autenticados das rotas admin e plataforma.
- Conferir especificamente sidebar, responsividade, pagamentos, cursos, alunos, blog, analise, precos e definicoes.
- Sincronizar/publicar Convex remoto e validar variaveis de ambiente.

Arquivos para investigar/abrir primeiro na proxima etapa:

- `MEMORIA_BEASELL.md`
- `.tmp/start-beasell-local.sh`
- `.tmp/run-convex-persistent.sh`
- `.tmp/run-next-3002-persistent.sh`
- `src/app/admin/pagamentos/page.tsx`
- `src/shared/components/layout/AdminSidebar.tsx`

## Ultima etapa concluida: hardening de imagens e warnings criticos de UI

Objetivo: remover os warnings de `<img>` nas rotas e componentes principais do LMS/backoffice/publico, mantendo as imagens remotas funcionais sem depender ainda de configurar dominios para `next/image`.

Foi feito:

- Criado o componente reutilizavel `RemoteImageFrame`, com normalizacao segura de URL, suporte a imagem decorativa e texto alternativo via `role="img"`.
- Substituidas capas/thumbnails nas paginas criticas do LMS: `/admin/cursos`, `/admin/conteudos`, `/plataforma/cursos`, `/plataforma/cursos/[slug]`, `/plataforma/meus-cursos` e `/conteudos/[slug]`.
- Substituidas imagens nos cards publicos reutilizados de blog, marketing, cursos, testemunhos e servicos.
- Removidos imports nao usados revelados pelo lint nos dois `EnhancedPostCard`.
- Confirmado que nao restam ocorrencias de `<img>` em `src/app`, `src/features` e `src/shared`.

Arquivos principais:

- `src/shared/components/ui/remote-image-frame.tsx`
- `src/app/admin/cursos/page.tsx`
- `src/app/admin/conteudos/page.tsx`
- `src/app/plataforma/cursos/page.tsx`
- `src/app/plataforma/cursos/[slug]/page.tsx`
- `src/app/plataforma/meus-cursos/page.tsx`
- `src/app/(public)/conteudos/[slug]/page.tsx`
- `src/features/blog/components/blog/PostCard.tsx`
- `src/features/blog/components/blog/EnhancedPostCard.tsx`
- `src/features/marketing/components/blog/PostCard.tsx`
- `src/features/marketing/components/blog/EnhancedPostCard.tsx`
- `src/features/marketing/components/training/TrainingCourses.tsx`
- `src/features/marketing/components/training/TrainingTestimonials.tsx`
- `src/features/marketing/components/services/ServiceCard.tsx`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker pull node:22-alpine
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app node:22-alpine npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- docker run --rm --user 1000:1000 -v /home/alexandre/beasell:/app -w /app -e NEXT_TELEMETRY_DISABLED=1 node:22-alpine npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash -lc "rg -n -e '\\x3cimg' src/app src/features src/shared"
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash -lc "git diff --check -- <ficheiros-tocados>"
```

Resultado:

- `npm run lint` em Docker: passou com 0 erros e 39 warnings restantes; warnings de imagem `<img>` removidos.
- `npm run test` em Docker: 7 testes passaram.
- `npm run build` em Docker: passou com Next.js 16.2.6 e rotas admin/plataforma/certificados incluidas.
- Busca por `<img>`: sem ocorrencias em `src/app`, `src/features` e `src/shared`.
- `git diff --check`: passou.

Estado atual:

- A divida de imagem que aparecia no lint foi resolvida nas areas principais.
- As imagens continuam visiveis via `background-image`, sem precisar liberar dominios remotos no `next.config.ts` neste momento.
- Ainda existem 39 warnings legados de imports nao usados, `any`, componentes shadcn e React Hook Form; nenhum deles e de imagem.
- Ainda falta QA visual autenticada longa em browser real e sincronizacao/publicacao Convex remoto.

Estado do projeto:

- Fase/trilha atual: hardening final local do LMS/backoffice.
- Solido agora: build, lint sem erros, testes unitarios, pagamentos manuais, certificados, rotas admin principais, dashboard e paginas de plataforma continuam a compilar.
- Falta imediato: limpar warnings legados restantes por grupos, estabilizar QA browser persistente, validar visualmente `/admin/pagamentos` e sincronizar/deploy Convex remoto.
- Distancia do fim: a trilha LMS/backoffice local esta perto de 82/100; produto completo para producao ainda fica perto de 65/100 porque falta ambiente remoto, QA visual continua e checklist de deploy.

## Proximo passo recomendado

Limpar os warnings legados restantes por grupos pequenos, comecando por imports nao usados em marketing/layout e depois `any`/React Hook Form, mantendo lint/test/build em Docker.

AVISO: O proximo passo e criar/implementar limpeza dos warnings legados restantes e QA browser persistente. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

Plano inicial da proxima etapa:

- Agrupar warnings restantes por tipo: imports nao usados, `any`, componentes shadcn e React Hook Form.
- Corrigir primeiro warnings simples sem alterar comportamento visual.
- Rodar `npm run lint`, `npm run test` e `npm run build` em Docker.
- Retomar QA browser autenticada nas rotas admin/plataforma.

Arquivos para investigar/abrir primeiro na proxima etapa:

- `MEMORIA_BEASELL.md`
- `src/features/marketing/components/Contact.tsx`
- `src/features/marketing/components/Services.tsx`
- `src/features/marketing/components/Testimonials.tsx`
- `src/shared/components/forms/ContactForm.tsx`
- `src/shared/components/ui/chart.tsx`

## Ultima etapa concluida: pagamentos manuais e estados de acesso

Objetivo: implementar um fluxo funcional de pagamento para o LMS, adequado ao dono/professor unico: aluno pede inscricao em curso pago, submete referencia/comprovativo, o dono aprova ou rejeita no backoffice, e o acesso às aulas fica bloqueado ate aprovacao.

Foi feito:

- Adicionados campos de pagamento em `enrollments`: `paymentStatus`, `accessGranted`, `amountDue`, `paymentReference`, `paymentProofUrl`, `paymentNotes`, datas de submissao/revisao e admin revisor.
- Adicionada a tabela `payments` no Convex com estado `pending`/`submitted`/`approved`/`rejected`, valor, moeda, metodo, referencia, comprovativo e auditoria basica.
- `courses:enroll` agora cria inscricoes gratuitas com acesso imediato e inscricoes pagas como `pending_payment`/`accessGranted=false`.
- `payments:submitProof` permite ao aluno enviar metodo, referencia e comprovativo.
- `payments:listForAdmin`, `payments:approve` e `payments:reject` permitem ao dono/professor gerir pagamentos no backoffice.
- `courses:getLearningSession` e `courses:toggleCompletion` bloqueiam aulas/conclusoes em curso pago sem pagamento aprovado.
- `courses:getCourseOverviewBySlug` e `courses:getMyCourses` devolvem resumo de pagamento/acesso para a UI.
- Criada a pagina `/admin/pagamentos` com filtro por estado, tabela de comprovativos e botoes de aprovar/rejeitar.
- O sidebar admin ganhou a entrada `Pagamentos`.
- A pagina de curso da plataforma mostra instrucoes de pagamento manual, campos de referencia/comprovativo e estado de validacao.
- `Meus cursos` mostra pagamentos pendentes/rejeitados e envia o aluno para a pagina do curso em vez de liberar aulas.
- A pagina de aula mostra mensagem propria quando o pagamento ainda esta em validacao.
- O detalhe admin do aluno mostra o estado de pagamento por curso.

Arquivos principais:

- `convex/schema.ts`
- `convex/courses.ts`
- `convex/payments.ts`
- `src/app/admin/pagamentos/page.tsx`
- `src/shared/components/layout/AdminSidebar.tsx`
- `src/app/plataforma/cursos/[slug]/page.tsx`
- `src/app/plataforma/cursos/[slug]/aulas/[lessonId]/page.tsx`
- `src/app/plataforma/meus-cursos/page.tsx`
- `src/app/admin/alunos/[id]/page.tsx`

Verificacao executada:

```bash
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && npx convex codegen'
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && bash .tmp/run-payment-smoke.sh'
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && npm run test'
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && npm run lint'
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && env NEXT_TELEMETRY_DISABLED=1 npm run build'
```

Resultado:

- `npx convex codegen`: passou e regenerou bindings/tipos.
- Smoke runtime Ubuntu/sandbox: passou confirmando curso pago bloqueado antes da aprovacao, comprovativo visivel ao admin, aprovacao liberando aulas, rejeicao mantendo acesso bloqueado.
- `npm run test`: 7 testes passaram.
- `npm run lint`: 0 erros; 58 warnings legados.
- `npm run build`: passou com Next.js 16.2.6 e incluiu a nova rota `/admin/pagamentos`.

Estado actual:

- O LMS ja tem fluxo manual real de pagamento e bloqueio/desbloqueio de acesso.
- Receita/analytics passam a usar `amountPaid`, que so e preenchido apos aprovacao do pagamento.
- Ainda nao ha integracao com gateway externo; o fluxo actual e manual/comprovativo, suficiente para operacao inicial do dono/professor.
- Ainda falta QA visual autenticada em browser real e deploy/sync Convex remoto.

Estado do projeto:

- Fase/trilha atual: LMS e backoffice em hardening funcional, com pagamentos manuais e certificados implementados.
- Solido agora: auth Better Auth + Convex local, rotas admin protegidas, catalogo LMS, inscricao, pagamentos manuais, bloqueio de acesso, aulas, progresso, analytics reais, actividade recente real, detalhe real do aluno, certificados reais e smokes runtime.
- Falta imediato: QA visual autenticada em browser real, deploy/sync Convex remoto, limpar warnings relevantes, preparar entrega/PR e decidir se precisa gateway externo ou se pagamento manual basta para MVP.
- Distancia do fim: trilha LMS/backoffice esta em cerca de 83/100 localmente; produto completo para producao esta perto de 68/100 por ainda faltar deploy remoto, QA visual, limpeza de warnings e estabilizacao final.

## Proximo passo recomendado

Fazer hardening final para entrega: limpar warnings mais relevantes, validar visualmente UI autenticada no browser real, e preparar deploy/sync Convex remoto com checklist de ambiente.

AVISO: O proximo passo e criar/implementar hardening final, QA visual autenticada e deploy Convex remoto. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

## Ultima etapa concluida: QA UI admin autenticada e hardening UX

Objetivo: iniciar a QA visual/autenticada do backoffice, corrigir problemas reais encontrados no browser e fechar com build/testes/smokes respeitando as regras atuais de pagamento e certificados.

Foi feito:

- Validado login admin temporario no browser e acesso autenticado ao backoffice.
- Corrigida falha de hidratacao no `UserNav` causada por diferenca SSR/client no estado de sessao, usando `useSyncExternalStore` para render inicial estavel.
- Corrigida `/admin/cursos` no mobile: tabela larga foi substituida por cards compactos em telas pequenas, mantendo tabela em desktop.
- Adicionados nomes acessiveis aos menus de acao de cursos e `alt` descritivo nas capas dos cursos.
- Corrigida `/admin/analise`: seletor de periodo agora tem label, o CTA "Exportar CSV" gera CSV real, e os graficos foram protegidos com `ChartFrame`.
- Removida dependencia de `next/font/google` no layout raiz e trocada por stack de fonte local/sistema, eliminando falha de build por resolucao de fonte externa.
- Atualizados smokes temporarios para aprovar pagamento antes de concluir aula em curso pago.

Arquivos principais:

- `src/shared/components/layout/header/UserNav.tsx`
- `src/app/admin/cursos/page.tsx`
- `src/app/admin/analise/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `.tmp/admin-route-smoke.mjs`
- `.tmp/student-detail-smoke.mjs`
- `.tmp/browser-admin-seed.mjs`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- npx eslint src/app/layout.tsx src/app/admin/analise/page.tsx src/app/admin/cursos/page.tsx src/shared/components/layout/header/UserNav.tsx
wsl -d Ubuntu --cd /home/alexandre/beasell -- env NEXT_TELEMETRY_DISABLED=1 npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash .tmp/run-admin-route-smoke.sh
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash .tmp/run-student-detail-smoke.sh
```

Resultado:

- `npm run test`: 7 testes passaram.
- ESLint focado: 0 erros; ficaram 2 warnings conhecidos de `<img>` em `src/app/admin/cursos/page.tsx`.
- `npm run build`: passou com Next.js 16.2.6 e incluiu rotas publicas, admin, plataforma e certificados.
- Smoke admin autenticado: passou; rota sem sessao redirecionou para `/sign-in`, admin teve papel `admin`, dados reais bateram e 10 rotas admin responderam 200.
- Smoke detalhe do aluno: passou com pagamento aprovado, progresso 100%, 1 curso, 1 aula concluida e valor pago esperado.
- Browser QA encontrou e guiou correcoes reais; a revalidacao browser longa ainda depende de estabilizar processos locais persistentes de Convex/Next fora do comando WSL.

Estado atual:

- A QA admin autenticada ja produziu melhorias concretas de UX, acessibilidade, responsividade e robustez de build.
- `/admin/cursos` esta melhor para mobile e menus de acao ja tem nome acessivel.
- `/admin/analise` usa dados reais, exporta CSV e nao depende de CTA falso.
- Build de producao ja nao depende de download de fonte externa.
- Ainda falta uma sessao browser longa e limpa apos estabilizar o start local persistente, alem de sync/deploy Convex remoto.

Estado do projeto:

- Fase/trilha atual: LMS/backoffice em hardening funcional, UX e preparacao de entrega.
- Solido agora: auth Better Auth + Convex local, rotas admin principais, analytics reais, detalhe real do aluno, certificados, regra de pagamento para conclusao, build local e smokes autenticados.
- Falta imediato: estabilizar scripts/processos locais persistentes para QA browser continua, publicar/sincronizar Convex remoto, validar `/admin/pagamentos`, limpar warnings relevantes de imagem e preparar entrega/PR.
- Distancia do fim: trilha LMS/backoffice esta em cerca de 80/100 localmente; produto completo para producao esta perto de 64/100 por ainda faltar Convex remoto, QA browser continua, validacao de pagamentos em ambiente real e estabilizacao final.

## Proximo passo recomendado

Estabilizar o ambiente local persistente de QA e sincronizar/publicar Convex remoto, depois validar `/admin/pagamentos`, `/admin/analise`, `/admin/cursos` e detalhe de aluno numa sessao browser continua.

AVISO: O proximo passo e criar/implementar estabilizacao do ambiente local persistente de QA e deploy Convex remoto. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

Plano inicial da proxima etapa:

- Investigar por que `.tmp/start-beasell-local.sh` e os scripts persistentes nao mantem Convex/Next vivos fora do comando WSL.
- Ajustar scripts de dev persistente ou criar alternativa confiavel para QA browser.
- Sincronizar/publicar funcoes Convex remotas e validar variaveis de ambiente.
- Repetir QA browser nas rotas admin, incluindo pagamentos.

Arquivos para investigar/abrir primeiro na proxima etapa:

- `MEMORIA_BEASELL.md`
- `.tmp/start-beasell-local.sh`
- `.tmp/run-convex-persistent.sh`
- `.tmp/run-next-3002-persistent.sh`
- `convex/payments.ts`
- `src/app/admin/pagamentos/page.tsx`

## Ultima etapa concluida: certificados reais de conclusao

Objetivo: adicionar uma peca essencial do LMS completo: certificados reais emitidos automaticamente quando o aluno conclui um curso, com consulta pelo aluno, visibilidade no backoffice e verificacao publica por codigo.

Foi feito:

- Adicionada a tabela `certificates` no schema Convex, com codigo de verificacao, numero do certificado, aluno, curso, inscricao, datas, progresso e estado `active`/`revoked`.
- `courses:toggleCompletion` agora emite certificado automaticamente quando o progresso chega a 100% e o curso permite certificado.
- A emissao e idempotente enquanto o certificado esta activo; ao desmarcar uma aula e baixar o progresso, o certificado activo e revogado e a inscricao volta a `certificateIssued=false`.
- Criadas queries `certificates:getMyCertificates`, `certificates:verifyByCode` e `certificates:listByStudent`.
- `courses:getMyCourses`, `courses:getLearningSession` e `courses:getCourseOverviewBySlug` agora devolvem certificado activo quando existir.
- O formulario de curso ganhou a opcao `Emitir certificado`, activa por defeito em cursos novos e tratada como activa em cursos antigos sem o campo.
- A area do aluno mostra link para o certificado em `Meus cursos` e na pagina de aula quando o certificado existe.
- Criada a pagina publica `/certificados/[code]` para validar autenticidade do certificado.
- O detalhe admin do aluno mostra quantidade de certificados e link para o certificado por curso.
- Corrigido um erro de tipo no export CSV de `/admin/analise`, que usava campos antigos (`name`/`students`) em vez de `course`/`enrolled`.

Arquivos principais:

- `convex/schema.ts`
- `convex/courses.ts`
- `convex/certificates.ts`
- `convex/users.ts`
- `src/features/courses/components/admin/CourseForm.tsx`
- `src/app/(public)/certificados/[code]/page.tsx`
- `src/app/plataforma/meus-cursos/page.tsx`
- `src/app/plataforma/cursos/[slug]/aulas/[lessonId]/page.tsx`
- `src/app/admin/alunos/[id]/page.tsx`
- `src/app/admin/cursos/[id]/page.tsx`
- `src/app/admin/analise/page.tsx`

Verificacao executada:

```bash
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && npx convex codegen'
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && bash .tmp/run-certificate-smoke.sh'
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && npm run test'
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && npm run lint'
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && env NEXT_TELEMETRY_DISABLED=1 npm run build'
```

Resultado:

- `npx convex codegen`: passou e regenerou bindings/tipos.
- Smoke runtime Ubuntu/sandbox: passou com emissao de certificado, verificacao publica por codigo, revogacao ao desmarcar aula e reemissao ao concluir novamente.
- `npm run test`: 7 testes passaram.
- `npm run lint`: 0 erros; 58 warnings ainda existentes, sobretudo imagens `<img>`, imports antigos e tipos `any` legados.
- `npm run build`: passou com Next.js 16.2.6 e incluiu a nova rota `/certificados/[code]`.

Estado actual:

- O LMS ja consegue emitir e verificar certificados reais de conclusao.
- O aluno consegue encontrar certificado nos cursos concluídos; o dono/professor consegue ver certificados no detalhe do aluno.
- O certificado tem pagina publica verificavel por codigo, mas ainda falta QA visual autenticada em browser real por causa do bloqueio anterior do runtime do browser.
- Ainda nao ha fluxo real de pagamento externo; `amountPaid` continua derivado da inscricao/preco local.

Estado do projeto:

- Fase/trilha atual: LMS e backoffice em hardening funcional, com certificados agora implementados.
- Solido agora: auth Better Auth + Convex local, rotas admin protegidas, catalogo LMS, inscricao, aulas, progresso, analytics reais, actividade recente real, detalhe real do aluno, smoke autenticado das paginas admin e certificados reais.
- Falta imediato: pagamentos reais/estados de pagamento, QA visual autenticada em browser real, deploy/sync Convex remoto, limpeza de warnings relevantes e preparacao de entrega/PR.
- Distancia do fim: trilha LMS/backoffice esta em cerca de 79/100 localmente; produto completo para producao esta perto de 62/100 por ainda faltar pagamentos, deploy remoto, QA visual autenticada e estabilizacao final.

## Proximo passo recomendado

Implementar pagamentos/estado de pagamento no LMS: estados `pending`/`paid`/`failed`, comprovativo ou metodo manual para o dono aprovar, bloqueio/desbloqueio de acesso conforme pagamento, e reflexo no backoffice.

AVISO: O proximo passo e criar/implementar pagamentos e estados de pagamento no LMS. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

## Ultima etapa concluida: smoke autenticado das rotas admin

Objetivo: reduzir a lacuna de QA autenticada validando o backoffice com uma sessao admin real no Next local e dados reais no Convex local, mesmo sem automacao visual do browser.

Foi feito:

- Criado o smoke local `.tmp/admin-route-smoke.mjs` para autenticar um admin via Better Auth, criar um aluno real, curso, modulo, aula, inscricao e conclusao no Convex local.
- Criado o wrapper `.tmp/run-admin-route-smoke.sh` para usar Convex/Next local e executar o smoke em Ubuntu/sandbox.
- O smoke passou a validar redirect sem sessao para `/sign-in?redirect=/admin/dashboard`.
- O smoke passou a validar as rotas admin autenticadas principais: `/admin/dashboard`, `/admin/cursos`, `/admin/cursos/novo`, `/admin/cursos/[id]`, `/admin/alunos`, `/admin/alunos/[id]`, `/admin/conteudos`, `/admin/analise`, `/admin/precos` e `/admin/settings`.
- Como o HTML inicial das paginas admin e hidratado no cliente, o smoke valida status/redirect server-side e confirma os dados reais pelas queries Convex que alimentam as paginas.

Arquivos principais:

- `.tmp/admin-route-smoke.mjs`
- `.tmp/run-admin-route-smoke.sh`
- `MEMORIA_BEASELL.md`

Verificacao executada:

```bash
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && bash .tmp/run-admin-route-smoke.sh'
```

Resultado:

- Sem sessao: `/admin/dashboard` respondeu `307` para `/sign-in?redirect=/admin/dashboard`.
- Com sessao admin: 10 rotas admin responderam `200`.
- Dados reais confirmados: `adminRole=admin`, aluno criado como `student`, progresso medio do aluno `100`, 1 aula concluida, analytics com cursos, actividade recente com eventos de `completion`, `enrollment` e `user`.
- A automacao visual do browser continua bloqueada pelo runtime do browser no sandbox do Windows; esta etapa cobre auth/rotas/dados, mas nao substitui revisao visual com browser real.

Estado actual:

- O backoffice responde com autenticacao real em todas as paginas principais e subpaginas criticas testadas.
- Os dados principais usados por dashboard, cursos, alunos, detalhe do aluno e analise foram confirmados via queries Convex autenticadas.
- Ainda falta validar visualmente a UI hidratada num browser real e sincronizar/publicar o Convex remoto.

Estado do projeto:

- Fase/trilha atual: LMS e backoffice em hardening funcional e QA local.
- Solido agora: auth Better Auth + Convex local, rotas admin protegidas, catalogo LMS, inscricao, aulas, progresso, analytics reais, actividade recente real, detalhe real do aluno e smoke autenticado das paginas admin principais.
- Falta imediato: QA visual autenticada em browser real, deploy/sync Convex remoto, pagamentos/certificados, limpeza de warnings relevantes e preparacao de entrega/PR.
- Distancia do fim: trilha LMS/backoffice esta em cerca de 76/100 localmente; produto completo para producao esta perto de 59/100 por ainda faltar deploy remoto, QA visual autenticada, pagamentos/certificados e estabilizacao final.

## Proximo passo recomendado

Validar visualmente a UI hidratada num browser real com sessao admin e depois preparar/sincronizar o Convex remoto para ambiente de producao/staging.

AVISO: O proximo passo e criar/implementar QA visual autenticada no browser real e deploy Convex remoto. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

## Ultima etapa concluida: detalhes reais do aluno no backoffice

Objetivo: transformar o botao "Detalhes" da lista de alunos numa pagina real, com historico do aluno, cursos inscritos, progresso, aulas concluidas e valores pagos vindos do Convex.

Foi feito:

- Adicionada a query admin `users:getStudentDetail`, protegida por `validateAdmin`, para devolver perfil, estatisticas, inscricoes, curso, aulas e conclusoes reais de um aluno.
- Criada a rota `src/app/admin/alunos/[id]/page.tsx` com cabecalho admin, card de perfil, resumo financeiro/progresso, indicadores e lista de cursos do aluno.
- `src/app/admin/alunos/page.tsx` agora liga o botao "Detalhes" para `/admin/alunos/[id]`.
- Regenerados os tipos Convex com `npx convex codegen`.
- Criado smoke local em `.tmp/student-detail-smoke.mjs` e `.tmp/run-student-detail-smoke.sh` para validar a query com dados temporarios reais no Convex local.

Arquivos principais:

- `convex/users.ts`
- `src/app/admin/alunos/page.tsx`
- `src/app/admin/alunos/[id]/page.tsx`
- `convex/_generated/api.d.ts`
- `convex/_generated/api.js`

Verificacao executada:

```bash
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && npx convex codegen'
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && npm run test'
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && npm run lint'
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && env NEXT_TELEMETRY_DISABLED=1 npm run build'
wsl -d Ubuntu --exec bash -lc 'cd /home/alexandre/beasell && bash .tmp/run-student-detail-smoke.sh'
```

Resultado:

- `npm run test`: 7 testes passaram.
- `npm run lint`: 0 erros; 57 warnings legados.
- `npm run build`: passou e incluiu a rota dinamica `/admin/alunos/[id]`.
- Smoke runtime Ubuntu/sandbox: `users:getStudentDetail` respondeu com `adminRole=admin`, `studentRole=student`, 1 curso, 1 curso concluido, 1 aula concluida, progresso medio 100%, valor pago 17500 AOA e 1 aula no curso.
- Ambiente local iniciado em Ubuntu: Convex em `http://127.0.0.1:3210`/`3211` e Next em `http://localhost:3002`.
- A automacao da aba do browser nao foi concluida porque o runtime do browser caiu no sandbox do Windows; por isso a QA visual autenticada continua como proximo passo.

Estado actual:

- A lista de alunos ja permite abrir um perfil real de cada aluno.
- O backoffice ja tem dashboard, actividade recente, analytics e detalhe de aluno com dados reais do Convex.
- Ainda falta validar a interface autenticada no browser com sessao admin real, sincronizar/publicar Convex remoto, completar pagamentos/certificados e organizar a tranche grande antes de commit/PR.

Estado do projeto:

- Fase/trilha atual: LMS e backoffice em hardening funcional.
- Solido agora: auth Better Auth + Convex, backoffice, catalogo LMS, inscricao, aulas, progresso, gestao de cursos/aulas, analytics reais, actividade recente real e detalhe real do aluno.
- Falta imediato: validacao UI admin autenticada no browser, deploy/sync Convex remoto, pagamentos/certificados, limpeza de warnings relevantes e preparacao de entrega/PR.
- Distancia do fim: trilha LMS/backoffice esta em cerca de 74/100 localmente; produto completo para producao esta perto de 58/100 por ainda faltar deploy remoto, QA autenticada, pagamentos/certificados e estabilizacao final.

## Proximo passo recomendado

Validar a UI admin autenticada no browser, especialmente `/admin/dashboard`, `/admin/alunos`, `/admin/alunos/[id]`, `/admin/cursos`, `/admin/analise`, e depois sincronizar/publicar o Convex remoto.

AVISO: O proximo passo e criar/implementar validacao UI admin autenticada e deploy Convex remoto. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

## Revisao de estado: 2026-06-02

Objetivo: responder o estado real do projecto de 0 a 100 e corrigir a fotografia operacional apos confirmar o codigo actual.

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run build
```

Resultado:

- `npm run test`: 7 testes passaram.
- `npm run lint`: 0 erros; 57 warnings legados.
- `npm run build`: passou com Next.js 16.2.6 e listou todas as rotas publicas, admin e plataforma.

Estado actual:

- O dashboard admin ja consome `users:getRecentActivity` em `src/app/admin/dashboard/page.tsx`.
- `convex/users.ts` ja agrega eventos recentes de inscricoes, conclusoes, novos utilizadores e posts.
- A arvore Git continua grande e suja: cerca de 200 ficheiros modificados/novos/removidos em relacao a `origin/main`.
- O nucleo local esta funcional, mas ainda falta validacao autenticada completa no browser, sincronizacao/deploy remoto do Convex, pagamentos/certificados e arrumacao da tranche antes de PR/entrega.

Estado do projeto:

- Fase/trilha atual: LMS e backoffice em hardening funcional.
- Solido agora: auth Better Auth + Convex, backoffice, catalogo LMS, inscricao, aulas, progresso, gestao de cursos/aulas, analytics reais e actividade recente real no dashboard.
- Falta imediato: validar UI admin autenticada no browser, publicar/sincronizar Convex remoto, limpar warnings/priorizar warnings relevantes, e preparar commit/PR com a arvore grande.
- Distancia do fim: trilha LMS/backoffice esta em cerca de 70/100 localmente; produto completo para producao esta mais perto de 55/100 por ainda faltar deploy remoto, QA autenticada, pagamentos/certificados e estabilizacao final.

## Proximo passo recomendado

Validar UI admin autenticada no browser e sincronizar/publicar Convex remoto.

AVISO: O proximo passo e criar/implementar validacao UI admin autenticada e deploy Convex remoto. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

## Ultima etapa concluida: actividade recente real no dashboard admin

Objetivo: substituir a lista ficticia de "Actividade Recente" do dashboard por eventos reais do LMS/backoffice.

Foi feito:

- Adicionada a query admin `users:getRecentActivity`, protegida por `validateAdmin`, juntando eventos reais de inscricoes, conclusoes de aulas, novos alunos e posts publicados.
- `src/app/admin/dashboard/page.tsx` passou a consumir `api.users.getRecentActivity`, com estados de loading/vazio e links para os recursos relevantes.
- O schema de `completions` agora aceita `completedAt` opcional e `courses:toggleCompletion` passa a gravar esse timestamp nas conclusoes novas.
- `authorization:getOrCreateCurrentAppUser` passou a gravar `createdAt` e `updatedAt`, permitindo eventos reais de novos alunos daqui para frente.
- Regenerados os tipos Convex com `npx convex codegen`.

Arquivos principais:

- `convex/users.ts`
- `convex/courses.ts`
- `convex/schema.ts`
- `convex/authorization.ts`
- `src/app/admin/dashboard/page.tsx`
- `convex/_generated/api.d.ts`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- npx convex codegen
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- env NEXT_TELEMETRY_DISABLED=1 npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- bash .tmp/run-recent-activity-smoke.sh
```

Resultado:

- `npm run test`: 7 testes passaram.
- `npm run lint`: 0 erros; 57 warnings legados.
- `npm run build`: passou depois de limpar um build anterior que ficou preso no timeout.
- Smoke runtime Ubuntu/sandbox: `users:getRecentActivity` respondeu com `adminRole=admin`, `studentRole=student`, 7 eventos, e confirmou eventos de inscricao, conclusao, novo aluno e post. `ADMIN_EMAILS` foi restaurado no fim.

Estado atual:

- O dashboard admin ja nao usa os nomes ficticios Manuel Silva/Ana Paula/Ricardo Jorge.
- Eventos antigos sem `createdAt`/`completedAt` podem nao aparecer como actividade recente, mas os novos eventos passam a ser rastreaveis.
- O Convex local foi usado para validar a query; nao ha processo `convex dev` pendurado apos a limpeza.
- O deployment remoto ainda precisa receber/publicar as funcoes novas antes de validacao fora do ambiente local.
- O utilizador pediu para usar sempre Ubuntu nos comandos deste projecto.

Estado do projeto:

- Fase/trilha atual: LMS e backoffice em hardening funcional.
- Solido agora: auth local Better Auth + Convex, sidebar/admin layout, catalogo, detalhe, inscricao, aula, progresso, gestao de modulos/aulas, analytics reais e actividade recente real.
- Falta imediato: criar detalhes historicos do aluno, validar UI admin autenticada no browser quando o Next local estiver activo, publicar/sincronizar Convex remoto, e avançar pagamentos/certificados.
- Distancia do fim: esta trilha esta em fase avancada no nucleo LMS local; o produto completo ainda precisa de pagamentos, certificados, deploy remoto e QA visual autenticado.

## Proximo passo recomendado

Implementar detalhes reais do aluno no backoffice: perfil, cursos inscritos, progresso por curso, conclusoes e datas relevantes.

AVISO: O proximo passo e criar/implementar detalhes reais do aluno no backoffice. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

Plano inicial da proxima etapa:

- Investigar `src/app/admin/alunos/page.tsx`, `convex/users.ts`, `convex/courses.ts` e schema de `enrollments`/`completions`.
- Criar query admin para detalhe de aluno com cursos, progresso e conclusoes.
- Adicionar UI de detalhe/modal ou subpagina sem recriar o layout.
- Verificar com `npm run test`, `npm run lint`, `npm run build` e smoke Ubuntu/sandbox.

## Etapa anterior: analytics reais do LMS no backoffice

Objetivo: substituir os dados ficticios da pagina `/admin/analise` por metricas reais vindas do Convex, para o dono/professor acompanhar alunos, cursos, inscricoes, receita e progresso.

Foi feito:

- Adicionada a query admin `courses:getAdminAnalytics`, protegida por `validateAdmin`, agregando alunos, cursos, posts, inscricoes, receita por periodo, progresso medio, taxa de conclusao, distribuicao de cursos e engajamento por curso.
- A pagina `src/app/admin/analise/page.tsx` passou a consumir essa query com o seletor de periodo (`7d`, `30d`, `90d`, `1y`) e removeu os arrays mockados de receita, planos, utilizadores e cursos.
- Regenerados os tipos Convex com `npx convex codegen`.

Arquivos principais:

- `convex/courses.ts`
- `src/app/admin/analise/page.tsx`
- `convex/_generated/api.d.ts`
- `convex/_generated/api.js`

Verificacao executada:

```bash
wsl -d Ubuntu --cd /home/alexandre/beasell -- npx convex codegen
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run test
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run lint
wsl -d Ubuntu --cd /home/alexandre/beasell -- npm run build
wsl -d Ubuntu --cd /home/alexandre/beasell -- node .tmp/analytics-smoke.mjs
```

Resultado:

- `npm run test`: 7 testes passaram.
- `npm run lint`: 0 erros; 57 warnings legados.
- `npm run build`: passou e manteve `/admin/analise` nas rotas server-rendered.
- Smoke runtime Ubuntu/sandbox: `courses:getAdminAnalytics` respondeu com `adminRole=admin`, 6 buckets de receita, 7 buckets de actividade, distribuicao de cursos e engajamento por curso. `ADMIN_EMAILS` foi restaurado no fim.

Estado atual:

- O backoffice ja nao mostra numeros ficticios em `/admin/analise`.
- O Convex local foi usado para validar a query; nao ha processo `convex dev` pendurado apos a limpeza.
- O deployment remoto ainda precisa receber/publicar as funcoes novas antes de validacao fora do ambiente local.
- O utilizador pediu para usar sempre Ubuntu nos comandos deste projecto.

Estado do projeto:

- Fase/trilha atual: LMS e backoffice em hardening funcional.
- Solido agora: auth local Better Auth + Convex, sidebar/admin layout, catalogo, detalhe, inscricao, aula, progresso, gestao de modulos/aulas e analytics reais do LMS.
- Falta imediato: trocar actividade recente do dashboard por eventos reais, criar detalhes historicos do aluno, validar UI admin autenticada no browser quando o Next local estiver activo, e publicar/sincronizar Convex remoto.
- Distancia do fim: esta trilha esta em fase media/avancada; o nucleo do LMS funciona localmente, mas ainda falta observabilidade/eventos, pagamentos/certificados e validacao remota.

## Proximo passo recomendado

Implementar actividade recente real no dashboard admin usando eventos derivados de inscricoes, conclusoes, novos utilizadores e posts.

AVISO: O proximo passo e criar/implementar actividade recente real no dashboard admin. Antes de iniciar, leia `MEMORIA_BEASELL.md` para continuar exatamente de onde o projeto parou, entender o que ja foi feito e integrar a solucao com o sistema atual sem reler todo o repositorio.

Plano inicial da proxima etapa:

- Investigar `src/app/admin/dashboard/page.tsx`, `convex/users.ts`, `convex/courses.ts`, `convex/blog.ts` e schema de `enrollments`/`completions`.
- Criar uma query admin para retornar eventos recentes normalizados.
- Trocar o array `recentActivity` mockado por dados reais com estados de loading/vazio.
- Verificar com `npm run test`, `npm run lint`, `npm run build` e smoke Ubuntu/sandbox se houver Convex local activo.

## Estado atual

- Clerk foi removido do fluxo da aplicacao e substituido por Better Auth com Convex.
- Nesta validacao, `.env.local` foi apontado para o Convex local anonimo (`127.0.0.1:3210/3211`), e continua ignorado pelo Git.
- As variaveis de servidor exigidas pelo Better Auth foram gravadas no Convex local para permitir signup/signin e JWT Convex.
- `BETTER_AUTH_TRUSTED_ORIGINS` aceita as origens locais de dev configuradas.
- Os tipos em `convex/_generated` foram regenerados; o deployment remoto ainda precisa receber as novas funcoes antes da validacao fora do ambiente local.
- O schema Convex foi tornado compativel com dados legados ja existentes em cursos, modulos, aulas, matriculas e usuarios.
- O email administrativo deve ser controlado por `ADMIN_EMAILS`; o primeiro login/signup com esse email passa a receber papel admin.

## Verificacao

- `npm run build`: passou.
- `npm run lint`: passou com 0 erros e avisos legados restantes.
- `npm run test`: passou com 4 testes de autorizacao.
- `npm audit --audit-level=moderate --omit=dev`: passou com 0 vulnerabilidades.
- Smoke API: signup e signin do admin Better Auth retornaram 200.

## Proximo passo recomendado

Entrar pela tela `/sign-in` com o email configurado em `ADMIN_EMAILS`, depois abrir `/admin/dashboard` e validar manualmente login, logout, permissao admin e bloqueio de usuario comum.

## Observacoes

- O campo `clerkId` continua aceito no schema apenas para nao quebrar documentos antigos; a aplicacao nao usa Clerk.
- A dependencia `convex` ainda traz pacotes Clerk transitivos para integracoes opcionais internas, mas nao ha imports Clerk no codigo da aplicacao.
- O deploy Convex informou remocao de indices antigos que nao existem no schema local atual.
- Corrigido mismatch de hydration na home removendo `Button asChild` do CTA do `AboutSection` e renderizando o `Link` diretamente.
- Corrigido o layout do backoffice para usar `SidebarInset`, evitando que o conteudo do dashboard entre por baixo da sidebar.
- Adicionado `overflow-x-hidden` ao `body` e ao provider do admin para impedir a barra horizontal vista no dashboard.
- Criada a rota `/admin/settings` com verificacao segura das variaveis de ambiente sem expor segredos.
- README substituido pelo guia local do projeto, incluindo Convex, Better Auth e acesso do dono via `ADMIN_EMAILS`.
- Verificacao final: `npm run lint` passou com 0 erros e warnings legados; `npm run build` passou e incluiu `/admin/settings`.
- O backoffice agora usa `AdminPageShell`/`AdminPageHeader` em Dashboard, Cursos, Alunos, Blog, Analise, Precos, Definicoes e subpaginas de curso.
- O sidebar admin foi redesenhado em tema escuro, com grupos de navegacao e estado activo em subrotas como `/admin/cursos/novo`.
- Tabelas de Cursos, Alunos e Blog foram colocadas em wrappers `overflow-x-auto` para evitar o scroll horizontal global visto na imagem.
- O formulario de curso exporta `CourseFormValues` e converte o preco numericamento antes de submeter.
- Verificacao 2026-06-02: `npm run lint` passou com 0 erros, `npm run build` passou, `npm run test` passou com 4 testes, e o Browser confirmou redirecionamento admin para login sem overflow horizontal quando nao ha sessao.
- Primeira fatia E2E do LMS implementada: funcoes Convex para overview do curso, sessao de aprendizagem, inscricao, edicao de modulos/aulas e progresso por aula; rotas `/plataforma/cursos`, `/plataforma/cursos/[slug]`, `/plataforma/cursos/[slug]/aulas/[lessonId]` e `/plataforma/meus-cursos`; admin de aulas com editor real de conteudo/duracao; links de cursos publicos apontam para o catalogo real.
- Validacao local do LMS em 2026-06-02: Convex local rodou em `127.0.0.1:3210/3211`, Next rodou em `localhost:3002`, o catalogo foi seedado com `seed:seedLocalCourseCatalog`, signup Better Auth retornou 200, o JWT Convex autenticou as queries/mutations, `courses:enroll` matriculou um aluno novo, `courses:getMyCourses` retornou o curso, `courses:getLearningSession` abriu a primeira aula e `courses:toggleCompletion` elevou o progresso para 25%.
- Validacao local do dono/professor em 2026-06-02: um admin temporario em `ADMIN_EMAILS` foi criado apenas no Convex local, `users:ensureCurrentUser` atribuiu papel `admin`, `courses:createCourse`, `courses:addModule`, `courses:addLesson`, `courses:updateModule`, `courses:updateLesson`, `courses:updateCourse` e `courses:getFullCourse` passaram; um aluno comum recebeu bloqueio ao tentar `courses:createCourse`.
- Verificacao da fatia LMS: `npm run lint` passou com 0 erros, `npm run build` passou e listou as novas rotas de plataforma, `npm run test` passou com 7 testes, Browser confirmou `/plataforma/cursos` e `/plataforma/cursos/[slug]` com dados reais e sem overflow horizontal, `git diff --check` passou nos ficheiros tocados.
- Observacao de ambiente: o deployment remoto Convex ainda precisa receber as novas funcoes para validar fora do ambiente local. O Browser embutido carregou as paginas, mas a automacao de typing/captura ficou limitada pelo clipboard virtual; a validacao autenticada foi feita por HTTP + Convex JWT real.
