# Adapter do Site Público → API real da plataforma Green Ledger

**Data:** 2026-06-13
**Repo:** `green-ledger-agro-code` (site Lovable, Vite+React+TS).
**Objetivo:** Fazer o site consumir a API pública **real** da plataforma certificadora, traduzindo no `usePublicAPI.ts` o contrato real para os tipos que as páginas já esperam, e degradando graciosamente os campos sem dado.

---

## 1. Contexto

O site já está 100% ligado à API pública via `src/hooks/usePublicAPI.ts`, mas foi construído (no Lovable) contra um contrato **mais rico e com nomes diferentes** do que a plataforma expõe. A plataforma foi expandida (PRs #56/#57) para fornecer o máximo de dado real (incl. `code`, `by-code`, properties com coordenadas, validação/verificação/emissões, `_count`, members). Resta **adaptar o site** ao contrato real.

**Divisão acordada:** toda a tradução vive no site, concentrada em `usePublicAPI.ts` (1 arquivo). A plataforma fica intacta. **Mapeamento de status workflow→canônico também no site** (decisão do usuário).

**Princípio:** manter as **assinaturas e os tipos exportados** dos hooks (`PublicProject`, `PublicProjectDetail`, etc.) para que as páginas mudem o mínimo. O hook passa a transformar a resposta real da plataforma nesses tipos; campos sem dado ficam `undefined` e as páginas (que em sua maioria já usam `?`/`??`) degradam.

---

## 2. Base URL e endpoints

- `API_BASE`: trocar a constante hardcoded por `import.meta.env.VITE_API_BASE_URL ?? 'https://api.greenledger.eco.br/api'`. Documentar a env no Lovable.
- Correções de caminho (real da plataforma):
  | Hook | Caminho atual (errado) | Caminho real |
  |---|---|---|
  | `usePublicVvbs` | `/public/organizations/vvbs` | `/public/vvbs` |
  | `usePublicStatistics` | `/public/statistics` | `/public/registry/stats` |
  | `useVerifyAsset` | `/public/assets/:serial` | `/public/verify/asset/:serial` |
  | `usePublicProjectByCode` | `/public/projects/by-code/:code` | **igual** (já existe) ✅ |
  | `usePublicProjects` / `usePublicProject` / `usePublicMethodolog*` | `/public/projects` etc. | **iguais** ✅ |

- Filtro de query: a plataforma usa `type` (VCU|VCSU), não `solutionType`. O parâmetro `solutionType` dos hooks deve ser **ignorado/removido** (é backlog); manter `page`/`limit`/`search`.

---

## 3. Tradução de paginação

A plataforma devolve `{ data, total, page, limit, totalPages }` (flat). Os hooks de lista devem reembrulhar para o que as páginas leem: `{ data: T[], meta: { total, page, limit, totalPages } }`. Implementar uma função `toPaginated<T>(raw, mapItem)` que aplica o map item-a-item e monta `meta`.

---

## 4. Mapeamento de campos (plataforma → tipos do site)

### 4.1 Projeto (lista — `PublicProject`)
| Site | Plataforma |
|---|---|
| `id` | `_id` |
| `code` | `code` |
| `name` | `name` |
| `assetType` | `type` (VCU/VCSU) |
| `status` | `mapStatus(status)` — ver §5 |
| `country` | `country` |
| `locationDescription` | `location` |
| `creditingPeriodStart/End` | idem |
| `createdAt` | `createdAt` |
| `organization` | `{ id: developer._id, name: developer.organizationName ?? developer.name }` |
| `methodology` | `{ id, code, name }` (de `methodology`; `nameEn` ausente) |
| `solutionType`, `sector`, `afolouCategory`, `totalAreaHa`, `estimatedReductions`, `scale` | **backlog → `undefined`** |

### 4.2 Projeto (detalhe — `PublicProjectDetail`)
Tudo de 4.1, mais (da resposta rica da plataforma):
| Site | Plataforma |
|---|---|
| `properties[]` | `properties[]` (`municipality`, `state`, `latitude`, `longitude`) ✅ |
| `validationEvent` | de `validationEvent`: `{ glOpinion: opinion, completedAt, glReportUrl: reportDocumentId? }` (ver nota docs §7) |
| `verificationEvents[]` | de `verificationEvents[]`: `{ verificationNumber: roundNumber, monitoringPeriodStart, monitoringPeriodEnd, netIssuable, vvbOpinion, verificationAssignment: { vvbOrganization: vvb }, issuances: [] }` — ver reshape §6 |
| `issuances[]` | de `issuances[]`: `{ vintageYear, issuedQuantity, txHash: mintTxHash }` |
| `documents[]` | de `documents[]` (mapear nomes: `title: originalName`, `type`, `createdAt`) |
| `_count` | `_count` (`properties`, `issuances`, `assets`) |
| `members[]` | de `members[]`: `{ role, organization }` ✅ |
| `methodologyVersion` | `methodology.version` |
| `overviewPt` | `overview` |
| `coordinates`, `landComplianceSeal` | `cadTrustUrl`→`landComplianceSeal` (opcional); `coordinates` de `properties[0]` (opcional) |
| `crop, geeType, sbceIntention, overviewEn, impact[], biome*` | `biome` existe ✅; resto **backlog → `undefined`** |
| `organization.type/publicWebsite/email` | **backlog → `undefined`** (a página já guarda com `?`) |
| `evidence[]` | **backlog → `[]`** |

### 4.3 Metodologia (`PublicMethodology` / `PublicMethodologyDetail`)
| Site | Plataforma |
|---|---|
| `id, code, name` | idem |
| `status` | `status` (mapear se necessário; metodologia tem enum próprio) |
| `descriptionPt` | `description` |
| `sector`/`sectors` | `sectors[]` (primeiro item p/ `sector`, se a página usar) |
| `developerOrganization` | `{ id, name }` de `developer` |
| `currentVersion` | `{ versionNumber: version }` |
| `nameEn, solutionType, activityType, geeType, *En, sdgGoals, consultations[], versions[]` | **backlog → `undefined`/`[]`** |

### 4.4 VVBs (`PublicVvb[]`)
A plataforma `/public/vvbs` devolve **paginado** (`{data,...}`). O hook deve devolver `data` mapeado a `PublicVvb[]`:
| Site | Plataforma |
|---|---|
| `id` | `_id` |
| `name` | `organizationName` |
| `accreditationStatus` | `status` |
| `publicWebsite, accreditationDate, accreditedScales/Sectors/ActivityTypes, _count` | **backlog → `undefined`/`[]`** |

### 4.5 Estatísticas (`PublicStatistics`)
De `/public/registry/stats` (`RegistryStats`):
| Site | Plataforma |
|---|---|
| `totalProjects` | `totalProjects` |
| `totalMethodologies` | `methodologyCount` |
| `totalCreditsIssued` | `totalVcuIssued + totalVcsuIssued` |
| `totalCreditsRetired` | `totalRetired` |
| `totalOrganizations` | **backlog → `undefined`** (a página degrada) |

---

## 5. Mapeamento de status (workflow → canônico do site)

Função `mapStatus(workflowState: string): string` no adapter. Tabela:
| Estado de workflow (plataforma) | Status canônico (site) |
|---|---|
| `VALIDATION_PROJECT_LISTING` | `LISTED` |
| `VALIDATION_PROJECT_VALIDATION`, `VALIDATION_INTERNAL_VALIDATION` | `IN_VALIDATION` |
| `VALIDATION_REGISTRY_UPDATE` | `VALIDATED` |
| `ACTIVE` | `IN_EXECUTION` |
| `KPI_MONITORING` | `IN_MONITORING` |
| `VERIFICATION_REQUEST`, `VERIFICATION_ACCEPTANCE`, `VERIFICATION_VVB_SELECTION`, `VERIFICATION_EXTERNAL_REVIEW`, `VERIFICATION_PROJECT_VERIFICATION`, `VERIFICATION_STOCK_VERIFICATION`, `VERIFICATION_MINTING` | `IN_VERIFICATION` |
| `VERIFICATION_REGISTRY_UPDATE` | `ACTIVE` (créditos emitidos) |
| `CONCLUDED` | `FINALIZED` |
| `SUSPENDED` | `SUSPENDED` |
| (qualquer outro) | passa cru (fallback de `getStatusLabel`) |

> Os valores canônicos já existem em `src/constants/projectStatus.ts` e na timeline do detalhe. O `mapStatus` é o único ponto de verdade dessa conversão.

---

## 6. Reshape estrutural

- **`verificationEvents[]`**: a plataforma expõe `issuances[]` no **topo** do detalhe (não aninhado por round). O detalhe do site lê `v.issuances?.[0]?.vintageYear/txHash` dentro de cada verification event. Reshape: para cada verification event, anexar `issuances` correlacionadas por vintage/round quando possível; se não houver correlação confiável, anexar `issuances: []` e deixar o site usar o `issuances[]` de topo para o bloco de emissões. **Decisão de implementação:** manter `issuances[]` de topo (bloco "Emissões") e, em cada verification event, `issuances: []` (degradação) — evita correlação frágil. Confirmar visualmente.
- **`validationEvent`**: site lê `glOpinion`; plataforma dá `opinion`. Mapear `glOpinion ← opinion`. `glReportUrl` fica `undefined` (só temos `reportDocumentId`, sem URL pública de doc — backlog).

---

## 7. Degradação graciosa nas páginas

A maioria já usa `?`/`??`/`?? []`. Ajustes pontuais necessários (esconder linha quando valor ausente):
- `ProjectDetail.tsx`: a linha "Tipo de Solução" (`solutionType`) e "Setor" (`sector`) são renderizadas sem guarda → envolver em `...(p.solutionType ? [...] : [])` e `...(p.sector ? [...] : [])`, no mesmo padrão das linhas `crop`/`geeType` já guardadas.
- `Projetos.tsx`: o card mostra `getSectorLabel(p.sector)` → renderizar só se `p.sector` (ou aceitar vazio).
- `RegistroPublico.tsx`: filtro por `solutionType` não tem efeito (backlog) → ocultar/desabilitar o controle de filtro de solução, ou removê-lo; `stats.totalOrganizations` → esconder card se `undefined`.
- `Index.tsx`: cards de estatística que dependem de `totalOrganizations` → esconder/“—” se `undefined`.
- `VVBs.tsx`: campos de acreditação ausentes → já condicionais; revisar.

Manter mudanças de página **mínimas e cosméticas** (guards), sem reescrever layout.

---

## 8. Testes

Há vitest configurado (`src/test/`). Adicionar testes unitários do adapter (funções puras de mapeamento — extrair `mapProject`, `mapProjectDetail`, `mapStatus`, `toPaginated`, `mapStatistics`, `mapVvb` como funções testáveis, separadas dos hooks de fetch):
- `mapStatus` cobre os estados da §5 + fallback.
- `mapProject`/`mapProjectDetail` mapeiam nomes corretamente e deixam backlog `undefined`.
- `toPaginated` embrulha `meta`.
- `mapStatistics`/`mapVvb` mapeiam + backlog.

Isolar as funções puras facilita teste sem mockar `fetch`.

---

## 9. Fora de escopo (backlog — sem dado na plataforma)

`solutionType (NBS/TBS)`, `sector`/`afolouCategory` ricos, conteúdo bilíngue EN, `impact[]` (ODS), `totalAreaHa`, `crop`, `geeType`, `sbceIntention`, `organization.type/publicWebsite/email`, `evidence[]`, `accredited*` de VVB, `totalOrganizations`, `consultations[]`/`versions[]` de metodologia. Ficam `undefined`/`[]` e a UI degrada. Cada um depende de modelagem futura na plataforma.

---

## 10. Critérios de aceite

- [ ] `usePublicAPI.ts` consome os caminhos reais; `solutionType` removido das queries; base via env.
- [ ] Listas funcionam com a paginação real (via `toPaginated`); `Projetos`/`RegistroPublico`/`Methodologies` renderizam dados reais.
- [ ] Detalhe (`/projetos/:code`) carrega via `by-code` e exibe status mapeado, properties (mapa), validação, verificações, emissões, `_count`, members.
- [ ] `mapStatus` converte todos os estados de workflow para os rótulos canônicos (sem strings cruas na UI).
- [ ] Campos de backlog ficam `undefined`/`[]` e as seções correspondentes não quebram nem mostram rótulos vazios.
- [ ] Testes do adapter passam (`npm test`); build (`npm run build`) e lint limpos.
- [ ] Nenhuma chamada a endpoint inexistente (sem 404 de `/organizations/vvbs`, `/statistics`, `/assets/:serial`).
