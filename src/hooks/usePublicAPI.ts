/**
 * GL Public API hooks
 *
 * Typed React hooks for the Green Ledger public API. All endpoints are
 * unauthenticated (no JWT required).
 *
 * The site was built (in Lovable) against a richer, differently-named contract
 * than the platform actually exposes. These hooks fetch the REAL platform shape
 * and run it through the pure mappers in `src/lib/publicApiAdapter.ts` (Task S1),
 * preserving the original `{ data, loading, error }` return shape so the pages
 * keep working unchanged.
 *
 * Spec: docs/specs/2026-06-13-public-api-adapter-design.md (§2 endpoints, §3
 * pagination, §4 field maps).
 */

import { useState, useEffect, useMemo } from "react";

// Re-export the site types so existing `import { PublicProject, ... } from
// "@/hooks/usePublicAPI"` call sites keep resolving (the types now live in the
// adapter — single source of truth).
export type {
  PublicProject,
  PublicProjectDetail,
  PublicProjectDocument,
  PublicMethodology,
  PublicMethodologyDetail,
  PublicVvb,
  PublicStatistics,
  PublicConsultation,
  PaginatedResponse,
} from "@/lib/publicApiAdapter";

import {
  mapProject,
  mapProjectDetail,
  mapMethodology,
  mapMethodologyDetail,
  mapVvb,
  mapStatistics,
  mapConsultation,
  toPaginated,
} from "@/lib/publicApiAdapter";

import type {
  PublicProject,
  PublicProjectDetail,
  PublicMethodology,
  PublicMethodologyDetail,
  PublicVvb,
  PublicStatistics,
  PublicConsultation,
  PaginatedResponse,
} from "@/lib/publicApiAdapter";

// Configurable base URL — overridable per-environment via Vite env, with the
// production platform API as the default.
const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "https://api.greenledger.eco.br/api";

// ---------------------------------------------------------------------------
// Raw platform shapes (minimal — only the fields the hooks pass to mappers).
// The mappers own the precise field-level typing; here we keep just enough to
// type `useFetch<T>` without resorting to `any`.
// ---------------------------------------------------------------------------

/** Flat pagination envelope returned by the platform list endpoints (§3). */
interface RawPaginated {
  data: Record<string, unknown>[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ---------------------------------------------------------------------------
// Generic fetch hook
// ---------------------------------------------------------------------------

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string | null): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: !!url,
    error: null,
  });

  useEffect(() => {
    if (!url) return;

    let cancelled = false;
    setState({ data: null, loading: true, error: null });

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled)
          setState({ data: null, loading: false, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}

/**
 * Apply a pure transform to a fetch result while preserving `loading`/`error`.
 * The mapped value is memoized on `state.data` so a stable reference is handed
 * to consumers across re-renders (avoids spurious downstream effects/renders).
 */
function useMapped<TRaw, TOut>(
  state: FetchState<TRaw>,
  transform: (raw: TRaw) => TOut,
): FetchState<TOut> {
  const data = useMemo(
    () => (state.data ? transform(state.data) : null),
    // `transform` is a module-level pure mapper (stable identity) — intentionally
    // depend only on the fetched data to avoid re-mapping every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.data],
  );
  return { data, loading: state.loading, error: state.error };
}

// ---------------------------------------------------------------------------
// Public hooks
// ---------------------------------------------------------------------------

/**
 * Fetch paginated list of publicly visible projects.
 *
 * NOTE: `solutionType` is accepted for backward-compat with call sites
 * (RegistroPublico) but intentionally NOT sent — the platform does not model
 * NBS/TBS classification yet (backlog, removed in S3).
 */
export function usePublicProjects(params?: {
  page?: number;
  limit?: number;
  solutionType?: string;
  search?: string;
}): FetchState<PaginatedResponse<PublicProject>> {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.search) query.set("search", params.search);
  const url = `${API_BASE}/public/projects?${query.toString()}`;
  const raw = useFetch<RawPaginated>(url);
  return useMapped(raw, (r) => toPaginated(r, mapProject));
}

/** Fetch a single project by its code (e.g. GL-PRJ-0001). */
export function usePublicProjectByCode(
  code: string | null,
): FetchState<PublicProjectDetail> {
  const url = code
    ? `${API_BASE}/public/projects/by-code/${encodeURIComponent(code)}`
    : null;
  const raw = useFetch<Record<string, unknown>>(url);
  return useMapped(raw, mapProjectDetail);
}

/** Fetch a single project by id. */
export function usePublicProject(
  id: string | null,
): FetchState<PublicProjectDetail> {
  const url = id ? `${API_BASE}/public/projects/${id}` : null;
  const raw = useFetch<Record<string, unknown>>(url);
  return useMapped(raw, mapProjectDetail);
}

/**
 * Fetch paginated list of published methodologies.
 *
 * NOTE: `solutionType` accepted-but-ignored — see `usePublicProjects`.
 */
export function usePublicMethodologies(params?: {
  page?: number;
  limit?: number;
  solutionType?: string;
  search?: string;
}): FetchState<PaginatedResponse<PublicMethodology>> {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.search) query.set("search", params.search);
  const url = `${API_BASE}/public/methodologies?${query.toString()}`;
  const raw = useFetch<RawPaginated>(url);
  return useMapped(raw, (r) => toPaginated(r, mapMethodology));
}

/** Fetch a single methodology by id. */
export function usePublicMethodology(
  id: string | null,
): FetchState<PublicMethodologyDetail> {
  const url = id ? `${API_BASE}/public/methodologies/${id}` : null;
  const raw = useFetch<Record<string, unknown>>(url);
  return useMapped(raw, mapMethodologyDetail);
}

/**
 * Fetch list of accredited VVBs.
 *
 * The platform returns a paginated envelope (`{ data, ... }`); the hook flattens
 * it to `PublicVvb[]` to preserve the original return shape (spec §4.4).
 */
export function usePublicVvbs(): FetchState<PublicVvb[]> {
  const url = `${API_BASE}/public/vvbs`;
  const raw = useFetch<RawPaginated>(url);
  return useMapped(raw, (r) => (r.data ?? []).map(mapVvb));
}

/** Fetch platform aggregate statistics. */
export function usePublicStatistics(): FetchState<PublicStatistics> {
  const url = `${API_BASE}/public/registry/stats`;
  const raw = useFetch<Record<string, unknown>>(url);
  return useMapped(raw, mapStatistics);
}

/**
 * Verify a carbon credit asset by serial number.
 *
 * Returns the raw platform verification response unchanged (no site-specific
 * mapper required — consumers read the platform shape directly).
 */
export function useVerifyAsset(serialNumber: string | null): FetchState<unknown> {
  const url = serialNumber
    ? `${API_BASE}/public/verify/asset/${encodeURIComponent(serialNumber)}`
    : null;
  return useFetch<unknown>(url);
}

// ---------------------------------------------------------------------------
// Public consultations (C3)
// ---------------------------------------------------------------------------

/**
 * Fetch paginated list of public consultations.
 *
 * `status` filters by consultation lifecycle (OPEN | CLOSED | RESPONSE_PUBLISHED);
 * omit it to list all. Comment content is never returned — only `commentCount`.
 */
export function usePublicConsultations(params?: {
  status?: string;
  page?: number;
  limit?: number;
}): FetchState<PaginatedResponse<PublicConsultation>> {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  const url = `${API_BASE}/public/consultations?${query.toString()}`;
  const raw = useFetch<RawPaginated>(url);
  return useMapped(raw, (r) => toPaginated(r, mapConsultation));
}

/** Fetch a single consultation by id. */
export function usePublicConsultation(
  id: string | null,
): FetchState<PublicConsultation> {
  const url = id ? `${API_BASE}/public/consultations/${id}` : null;
  const raw = useFetch<Record<string, unknown>>(url);
  return useMapped(raw, mapConsultation);
}

/**
 * Submit a public comment to a consultation.
 *
 * Plain async function (not a hook) — called imperatively from a form submit
 * handler. The platform returns 204 No Content on success. `organization` is
 * optional; an optional honeypot field may be added by the caller for spam
 * defense. The endpoint is throttled to 10 requests/min server-side.
 *
 * Throws an Error with a user-friendly (PT) message on any non-2xx response so
 * the form can surface it directly.
 */
export async function submitConsultationComment(
  id: string,
  body: { author: string; email: string; organization?: string; content: string },
): Promise<void> {
  const res = await fetch(`${API_BASE}/public/consultations/${id}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.ok) return;

  if (res.status === 429) {
    throw new Error(
      "Muitas tentativas. Tente novamente em instantes.",
    );
  }
  throw new Error(
    "Não foi possível enviar seu comentário. Tente novamente mais tarde.",
  );
}
