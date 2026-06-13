# Adapter do Site → API real — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) ou superpowers:executing-plans. Steps usam checkbox (`- [ ]`).

**Goal:** Adaptar o site (`green-ledger-agro-code`) para consumir a API pública real da plataforma, traduzindo o contrato no `usePublicAPI.ts` via um módulo de funções puras testáveis, com degradação graciosa dos campos de backlog.

**Architecture:** Funções puras de mapeamento em `src/lib/publicApiAdapter.ts` (testáveis sem `fetch`); `usePublicAPI.ts` faz fetch dos caminhos reais e aplica os mappers; páginas recebem guards mínimos.

**Tech Stack:** Vite + React + TS, vitest. **Repo:** `green-ledger-agro-code`, branch `feat/public-api-adapter`.

**Spec:** `docs/specs/2026-06-13-public-api-adapter-design.md`.

---

### Task S1: Módulo adapter (funções puras) + testes

**Files:**
- Create: `src/lib/publicApiAdapter.ts`
- Test: `src/lib/__tests__/publicApiAdapter.test.ts`

O módulo contém os **tipos do site** (movidos de `usePublicAPI.ts`) e as funções puras de mapeamento. Os hooks (S2) passarão a importar daqui.

- [ ] **Step 1: Escrever os testes que falham**

Create `src/lib/__tests__/publicApiAdapter.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { mapStatus, toPaginated, mapProject, mapStatistics } from "../publicApiAdapter";

describe("mapStatus", () => {
  it("maps workflow states to canonical site statuses", () => {
    expect(mapStatus("VALIDATION_PROJECT_LISTING")).toBe("LISTED");
    expect(mapStatus("VALIDATION_PROJECT_VALIDATION")).toBe("IN_VALIDATION");
    expect(mapStatus("VALIDATION_INTERNAL_VALIDATION")).toBe("IN_VALIDATION");
    expect(mapStatus("VALIDATION_REGISTRY_UPDATE")).toBe("VALIDATED");
    expect(mapStatus("ACTIVE")).toBe("IN_EXECUTION");
    expect(mapStatus("KPI_MONITORING")).toBe("IN_MONITORING");
    expect(mapStatus("VERIFICATION_EXTERNAL_REVIEW")).toBe("IN_VERIFICATION");
    expect(mapStatus("VERIFICATION_REGISTRY_UPDATE")).toBe("ACTIVE");
    expect(mapStatus("CONCLUDED")).toBe("FINALIZED");
    expect(mapStatus("SUSPENDED")).toBe("SUSPENDED");
  });
  it("passes unknown states through unchanged", () => {
    expect(mapStatus("WAT")).toBe("WAT");
  });
});

describe("toPaginated", () => {
  it("wraps a flat platform response into { data, meta }", () => {
    const raw = { data: [1, 2], total: 5, page: 1, limit: 2, totalPages: 3 };
    const out = toPaginated(raw, (n: number) => n * 10);
    expect(out.data).toEqual([10, 20]);
    expect(out.meta).toEqual({ total: 5, page: 1, limit: 2, totalPages: 3 });
  });
});

describe("mapProject", () => {
  it("maps platform fields to site shape and leaves backlog undefined", () => {
    const raw = {
      _id: "a1", code: "GL-PRJ-0001", name: "Projeto X", type: "VCU",
      status: "VALIDATION_PROJECT_LISTING", country: "BR", location: "Cerrado, MG",
      creditingPeriodStart: "2025-01-01", creditingPeriodEnd: "2030-01-01",
      createdAt: "2025-01-01",
      developer: { _id: "u1", name: "Fulano", organizationName: "Org Verde" },
      methodology: { _id: "m1", code: "MET001", name: "Reflorestamento", version: "v1" },
    };
    const p = mapProject(raw);
    expect(p.id).toBe("a1");
    expect(p.code).toBe("GL-PRJ-0001");
    expect(p.assetType).toBe("VCU");
    expect(p.status).toBe("LISTED");
    expect(p.locationDescription).toBe("Cerrado, MG");
    expect(p.organization).toEqual({ id: "u1", name: "Org Verde" });
    expect(p.methodology).toMatchObject({ id: "m1", code: "MET001", name: "Reflorestamento" });
    expect(p.solutionType).toBeUndefined();
    expect(p.sector).toBeUndefined();
  });
  it("falls back organization name to developer.name when no org name", () => {
    const p = mapProject({ _id: "a", developer: { _id: "u", name: "Solo" }, methodology: null });
    expect(p.organization).toEqual({ id: "u", name: "Solo" });
  });
});

describe("mapStatistics", () => {
  it("maps registry stats to site statistics", () => {
    const s = mapStatistics({
      totalProjects: 7, activeProjects: 3, totalVcuIssued: 100, totalVcsuIssued: 50,
      totalRetired: 20, totalCancelled: 1, totalBufferPool: 5, methodologyCount: 4, activeVvbCount: 2,
    });
    expect(s.totalProjects).toBe(7);
    expect(s.totalMethodologies).toBe(4);
    expect(s.totalCreditsIssued).toBe(150);
    expect(s.totalCreditsRetired).toBe(20);
    expect(s.totalOrganizations).toBeUndefined();
  });
});
```

- [ ] **Step 2: Rodar e confirmar FALHA**

Run: `npm test -- publicApiAdapter` (vitest). Expected: FAIL (module not found).

- [ ] **Step 3: Implementar o adapter**

Create `src/lib/publicApiAdapter.ts`. Mova para cá os tipos hoje em `usePublicAPI.ts` (`PublicProject`, `PublicProjectDetail`, `PublicProjectDocument`, `PublicMethodology`, `PublicMethodologyDetail`, `PublicVvb`, `PublicStatistics`, `PaginatedResponse`) e implemente:

```ts
// ----- Types (moved from usePublicAPI.ts; keep field names the pages already use) -----
// (paste the existing interfaces here verbatim)

// ----- Raw platform shapes (minimal, only what we read) -----
interface RawPaginated<T> { data: T[]; total: number; page: number; limit: number; totalPages: number; }
interface RawOrgRef { _id: string; name?: string; organizationName?: string; }
interface RawMethodologyRef { _id: string; code: string; name: string; version?: string; }

// ----- Status mapping (workflow -> canonical) -----
const STATUS_MAP: Record<string, string> = {
  VALIDATION_PROJECT_LISTING: "LISTED",
  VALIDATION_PROJECT_VALIDATION: "IN_VALIDATION",
  VALIDATION_INTERNAL_VALIDATION: "IN_VALIDATION",
  VALIDATION_REGISTRY_UPDATE: "VALIDATED",
  ACTIVE: "IN_EXECUTION",
  KPI_MONITORING: "IN_MONITORING",
  VERIFICATION_REQUEST: "IN_VERIFICATION",
  VERIFICATION_ACCEPTANCE: "IN_VERIFICATION",
  VERIFICATION_VVB_SELECTION: "IN_VERIFICATION",
  VERIFICATION_EXTERNAL_REVIEW: "IN_VERIFICATION",
  VERIFICATION_PROJECT_VERIFICATION: "IN_VERIFICATION",
  VERIFICATION_STOCK_VERIFICATION: "IN_VERIFICATION",
  VERIFICATION_MINTING: "IN_VERIFICATION",
  VERIFICATION_REGISTRY_UPDATE: "ACTIVE",
  CONCLUDED: "FINALIZED",
  SUSPENDED: "SUSPENDED",
};
export function mapStatus(state: string): string {
  return STATUS_MAP[state] ?? state;
}

export function toPaginated<TIn, TOut>(
  raw: RawPaginated<TIn>,
  mapItem: (item: TIn) => TOut,
): PaginatedResponse<TOut> {
  return {
    data: (raw?.data ?? []).map(mapItem),
    meta: {
      total: raw?.total ?? 0,
      page: raw?.page ?? 1,
      limit: raw?.limit ?? 0,
      totalPages: raw?.totalPages ?? 0,
    },
  };
}

function mapOrg(ref: RawOrgRef | null | undefined): { id: string; name: string } | undefined {
  if (!ref) return undefined;
  return { id: ref._id, name: ref.organizationName ?? ref.name ?? "" };
}

export function mapProject(raw: Record<string, unknown>): PublicProject {
  const r = raw as {
    _id: string; code?: string; name?: string; type?: string; status?: string;
    country?: string; location?: string; creditingPeriodStart?: string; creditingPeriodEnd?: string;
    createdAt?: string; developer?: RawOrgRef; methodology?: RawMethodologyRef;
  };
  return {
    id: r._id,
    code: r.code ?? "",
    name: r.name ?? "",
    assetType: r.type ?? "",
    solutionType: undefined as unknown as PublicProject["solutionType"], // backlog
    scale: undefined,
    sector: undefined as unknown as string, // backlog
    afolouCategory: undefined,
    status: r.status ? mapStatus(r.status) : "",
    country: r.country ?? "",
    locationDescription: r.location ?? "",
    totalAreaHa: undefined as unknown as number, // backlog
    estimatedReductions: undefined,
    creditingPeriodStart: r.creditingPeriodStart ?? "",
    creditingPeriodEnd: r.creditingPeriodEnd ?? "",
    createdAt: r.createdAt ?? "",
    organization: mapOrg(r.developer) ?? { id: "", name: "" },
    methodology: r.methodology
      ? { id: r.methodology._id, code: r.methodology.code, name: r.methodology.name }
      : (undefined as unknown as PublicProject["methodology"]),
  };
}

export function mapStatistics(raw: Record<string, unknown>): PublicStatistics {
  const r = raw as {
    totalProjects?: number; methodologyCount?: number; totalVcuIssued?: number;
    totalVcsuIssued?: number; totalRetired?: number;
  };
  return {
    totalProjects: r.totalProjects ?? 0,
    totalMethodologies: r.methodologyCount ?? 0,
    totalCreditsIssued: (r.totalVcuIssued ?? 0) + (r.totalVcsuIssued ?? 0),
    totalCreditsRetired: r.totalRetired ?? 0,
    totalOrganizations: undefined as unknown as number, // backlog
  };
}
```
Notas: para campos "backlog" obrigatórios no tipo, use `undefined as unknown as T` apenas onde o tipo do site marca como obrigatório; prefira tornar esses campos opcionais no tipo (mais limpo) se isso não quebrar as páginas. Mantenha nomes de campo idênticos aos que as páginas leem (ver spec §4).
> Também implemente, no mesmo arquivo e testados quando tiver lógica não-trivial: `mapProjectDetail`, `mapMethodology`, `mapMethodologyDetail`, `mapVvb`. Para `mapProjectDetail` siga o spec §4.2/§6 (incluir `properties`, `validationEvent` com `glOpinion ← opinion`, `verificationEvents` com `verificationNumber ← roundNumber` e `issuances: []` por evento, `issuances` de topo, `_count`, `members`, `overviewPt ← overview`, `methodologyVersion ← methodology.version`; backlog `undefined`/`[]`). Adicione testes ao menos para `mapProjectDetail` (properties + validationEvent.glOpinion + issuances top-level) e `mapVvb`.

- [ ] **Step 4: Rodar e confirmar PASSA** → `npm test -- publicApiAdapter`.
- [ ] **Step 5: Build + lint** → `npm run build` e `npm run lint` (0 erros).
- [ ] **Step 6: Commit**
```bash
git add src/lib/publicApiAdapter.ts src/lib/__tests__/publicApiAdapter.test.ts
git commit -m "feat(adapter): pure mappers for real platform public API

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task S2: Reescrever `usePublicAPI.ts` para a API real + adapter

**Files:**
- Modify: `src/hooks/usePublicAPI.ts`

- [ ] **Step 1: Implementar**

Em `src/hooks/usePublicAPI.ts`:
- Remover as definições de tipo movidas para o adapter; **re-exportar** do adapter para não quebrar imports de páginas:
```ts
export type {
  PublicProject, PublicProjectDetail, PublicProjectDocument,
  PublicMethodology, PublicMethodologyDetail, PublicVvb, PublicStatistics, PaginatedResponse,
} from "@/lib/publicApiAdapter";
import {
  mapProject, mapProjectDetail, mapMethodology, mapMethodologyDetail,
  mapVvb, mapStatistics, toPaginated,
} from "@/lib/publicApiAdapter";
```
- Base configurável:
```ts
const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "https://api.greenledger.eco.br/api";
```
- Manter o `useFetch<T>` genérico. Cada hook agora busca o RAW e mapeia. Como o `useFetch` retorna `{data,loading,error}`, transforme aplicando o mapper sobre `data` (ex.: derivar `const mapped = raw ? transform(raw) : null`), mantendo o mesmo shape de retorno `{ data, loading, error }`. Padrão por hook:
  - `usePublicProjects`: fetch `${API_BASE}/public/projects?page&limit&search` (SEM `solutionType`); retornar `toPaginated(raw, mapProject)`.
  - `usePublicProjectByCode`: fetch `${API_BASE}/public/projects/by-code/:code`; `mapProjectDetail(raw)`.
  - `usePublicProject`: fetch `${API_BASE}/public/projects/:id`; `mapProjectDetail(raw)`.
  - `usePublicMethodologies`: `${API_BASE}/public/methodologies?...`; `toPaginated(raw, mapMethodology)`.
  - `usePublicMethodology`: `${API_BASE}/public/methodologies/:id`; `mapMethodologyDetail(raw)`.
  - `usePublicVvbs`: `${API_BASE}/public/vvbs`; a plataforma devolve paginado → `(raw?.data ?? []).map(mapVvb)` retornando `PublicVvb[]`.
  - `usePublicStatistics`: `${API_BASE}/public/registry/stats`; `mapStatistics(raw)`.
  - `useVerifyAsset`: `${API_BASE}/public/verify/asset/:serial` (caminho corrigido).
- Remover o parâmetro `solutionType` das assinaturas de `usePublicProjects`/`usePublicMethodologies` (ou aceitá-lo e ignorá-lo — preferir remover; ajustar chamadas nas páginas na Task S3).

Sugestão de implementação para mapear sem reescrever `useFetch`: criar um pequeno wrapper que aplica o transform via `useMemo` sobre o `data` retornado por `useFetch<Raw>`, preservando `loading`/`error`.

- [ ] **Step 2: Build + lint** → `npm run build` e `npm run lint` (0 erros). (Erros de tipo aqui apontam páginas que precisam de ajuste — anote para S3, mas não reescreva layout.)
- [ ] **Step 3: Commit**
```bash
git add src/hooks/usePublicAPI.ts
git commit -m "feat(adapter): wire hooks to real platform endpoints via mappers

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task S3: Guards de degradação nas páginas

**Files:**
- Modify: `src/pages/ProjectDetail.tsx`, `src/pages/Projetos.tsx`, `src/pages/RegistroPublico.tsx`, `src/pages/Index.tsx`, `src/pages/VVBs.tsx` (conforme necessário)

- [ ] **Step 1: Aplicar guards mínimos (cosméticos)**

- `ProjectDetail.tsx`: as linhas "Tipo de Solução" (`value: p.solutionType`) e "Setor" (`value: getSectorLabel(p.sector, lang)`) são renderizadas sem guarda — envolver no mesmo padrão condicional já usado por `crop`/`geeType`:
```tsx
...(p.solutionType ? [{ icon: Leaf, label: isEn ? "Solution Type" : "Tipo de Solução", value: p.solutionType }] : []),
...(p.sector ? [{ icon: TreePine, label: isEn ? "Sector" : "Setor", value: getSectorLabel(p.sector, lang) }] : []),
```
- `Projetos.tsx`: o badge de setor (`getSectorLabel(p.sector, lang)`) só deve renderizar se `p.sector` existir (envolver o `<span>` num `{p.sector && (...)}`).
- `RegistroPublico.tsx`: remover o parâmetro `solutionType` da chamada `usePublicProjects(...)`; **ocultar** o controle de filtro de solução (`<select>` em ~L108) e o estado `solutionFilter` (backlog). `stats?.totalOrganizations ?? "—"` já degrada — manter.
- `Index.tsx`: o contador `totalOrganizations` (L122) usa `AnimatedCounter end={stats.totalOrganizations}` — proteger contra `undefined` (ex.: `end={stats.totalOrganizations ?? 0}` ou ocultar o card de organizações). Escolher ocultar o card se `undefined` para não exibir "0" enganoso.
- `VVBs.tsx`: revisar campos de acreditação ausentes (já condicionais na maioria); ajustar só o que quebrar.

Mantenha tudo cosmético — sem reescrever layout.

- [ ] **Step 2: Build + lint + testes** → `npm run build`, `npm run lint` (0 erros), `npm test` (verde).
- [ ] **Step 3: Commit**
```bash
git add src/pages/
git commit -m "fix(pages): graceful degradation for backlog fields

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Verificação final

- [ ] `npm test` verde (adapter mappers).
- [ ] `npm run build` e `npm run lint` limpos.
- [ ] Revisão visual (se possível com `npm run dev` apontando `VITE_API_BASE_URL` para a API real/staging): listas e detalhe carregam, status legível, sem 404 de endpoints, sem rótulos vazios de backlog.

## Cobertura do spec

- Endpoints/base/paginação (spec §2,§3) → S2.
- Mapeamentos de campo (spec §4) + status (spec §5) + reshape (spec §6) → S1 (+ S2 fiação).
- Degradação graciosa (spec §7) → S3.
- Testes (spec §8) → S1.
