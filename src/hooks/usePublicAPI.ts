/**
 * GL Public API hooks
 * Provides typed React hooks for the Green Ledger public API endpoints.
 * All endpoints are unauthenticated (no JWT required).
 *
 * API base: https://app.greenledger.eco.br/api
 */

import { useState, useEffect } from "react";

const API_BASE = "https://app.greenledger.eco.br/api";

// ---------------------------------------------------------------------------
// Types mirroring the API responses
// ---------------------------------------------------------------------------

export interface PublicProject {
  id: string;
  code: string;
  name: string;
  assetType: string;
  solutionType: "NBS" | "TBS";
  scale?: string;
  sector: string;
  afolouCategory?: string;
  status: string;
  country: string;
  locationDescription: string;
  totalAreaHa: number;
  estimatedReductions?: number;
  creditingPeriodStart: string;
  creditingPeriodEnd: string;
  createdAt: string;
  organization: { id: string; name: string };
  methodology: { id: string; code: string; name: string; nameEn?: string };
}

export interface PublicProjectDocument {
  id: string;
  type: string;
  title: string;
  version: number;
  fileUrl?: string;
  signedFileUrl?: string;
  txHash?: string;
  createdAt: string;
}

export interface PublicProjectDetail extends PublicProject {
  methodologyVersion: string;
  coordinates?: { type: string; coordinates: [number, number] };
  startDate?: string;
  commitmentPeriodEnd?: string;
  landComplianceSeal?: string;
  sbceIntention?: boolean;
  biome?: string;
  crop?: string;
  geeType?: string;
  overviewPt?: string;
  overviewEn?: string;
  impact?: Array<{
    sdg: number;
    indicator: string;
    baseline: string;
    frequency: string;
    methodology: string;
  }>;
  updatedAt: string;
  organization: {
    id: string;
    name: string;
    type: string;
    publicWebsite?: string;
    email?: string;
  };
  methodology: {
    id: string;
    code: string;
    name: string;
    nameEn?: string;
    solutionType: string;
    sector: string;
    activityType?: string;
  };
  members: Array<{
    id: string;
    role: string;
    organization: { id: string; name: string };
  }>;
  validationEvent?: {
    completedAt?: string;
    glOpinion?: string;
    glReportUrl?: string;
  };
  verificationEvents: Array<{
    verificationNumber: number;
    monitoringPeriodStart: string;
    monitoringPeriodEnd: string;
    netIssuable?: number;
    vvbOpinion?: string;
    vvbReportUrl?: string;
    glDeclarationUrl?: string;
    completedAt?: string;
    verificationAssignment?: {
      vvbOrganization: { id: string; name: string };
    };
    issuances: Array<{
      vintageYear: number;
      issuedQuantity: number;
      txHash?: string;
    }>;
  }>;
  issuances: Array<{
    vintageYear: number;
    issuedQuantity: number;
    txHash?: string;
  }>;
  documents: PublicProjectDocument[];
  _count: { properties: number; issuances: number; assets: number };
}

export interface PublicMethodology {
  id: string;
  code: string;
  name: string;
  nameEn?: string;
  solutionType: "NBS" | "TBS";
  sector: string;
  activityType?: string;
  geeType?: string;
  assetType: string;
  status: string;
  descriptionPt?: string;
  descriptionEn?: string;
  eligibilityPt?: string;
  eligibilityEn?: string;
  mrvPt?: string;
  mrvEn?: string;
  additionalityPt?: string;
  additionalityEn?: string;
  sdgGoals?: number[];
  createdAt: string;
  developerOrganization: { id: string; name: string };
  currentVersion?: {
    id: string;
    versionNumber: string;
    revisionType: string;
    publishedAt?: string;
  };
}

export interface PublicMethodologyDetail extends PublicMethodology {
  boundaryPt?: string;
  boundaryEn?: string;
  qaqcPt?: string;
  qaqcEn?: string;
  safeguardsPt?: string;
  safeguardsEn?: string;
  licenseExpiresAt?: string;
  updatedAt: string;
  developerOrganization: { id: string; name: string; type: string };
  versions: Array<{
    id: string;
    versionNumber: string;
    revisionType: string;
    documentUrl: string;
    documentUrlEn?: string;
    changeLog?: string;
    publishedAt?: string;
    createdAt: string;
  }>;
  consultations: Array<{
    id: string;
    startDate: string;
    endDate: string;
    status: string;
    glOpinion?: string;
    _count: { comments: number };
  }>;
}

export interface PublicVvb {
  id: string;
  name: string;
  publicWebsite?: string;
  accreditationDate?: string;
  accreditedScales: string[];
  accreditedSectors: string[];
  accreditedActivityTypes: string[];
  accreditationStatus: string;
  _count: { verificationAssignments: number };
}

export interface PublicStatistics {
  totalProjects: number;
  totalMethodologies: number;
  totalCreditsIssued: number;
  totalCreditsRetired: number;
  totalOrganizations: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
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

// ---------------------------------------------------------------------------
// Public hooks
// ---------------------------------------------------------------------------

/** Fetch paginated list of publicly visible projects. */
export function usePublicProjects(params?: {
  page?: number;
  limit?: number;
  solutionType?: string;
  search?: string;
}) {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.solutionType) query.set("solutionType", params.solutionType);
  if (params?.search) query.set("search", params.search);
  const url = `${API_BASE}/public/projects?${query.toString()}`;
  return useFetch<PaginatedResponse<PublicProject>>(url);
}

/** Fetch a single project by its code (e.g. GL-PRJ-0001). */
export function usePublicProjectByCode(code: string | null) {
  const url = code
    ? `${API_BASE}/public/projects/by-code/${encodeURIComponent(code)}`
    : null;
  return useFetch<PublicProjectDetail>(url);
}

/** Fetch a single project by UUID. */
export function usePublicProject(id: string | null) {
  const url = id ? `${API_BASE}/public/projects/${id}` : null;
  return useFetch<PublicProjectDetail>(url);
}

/** Fetch paginated list of published methodologies. */
export function usePublicMethodologies(params?: {
  page?: number;
  limit?: number;
  solutionType?: string;
  search?: string;
}) {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.solutionType) query.set("solutionType", params.solutionType);
  if (params?.search) query.set("search", params.search);
  const url = `${API_BASE}/public/methodologies?${query.toString()}`;
  return useFetch<PaginatedResponse<PublicMethodology>>(url);
}

/** Fetch a single methodology by UUID. */
export function usePublicMethodology(id: string | null) {
  const url = id ? `${API_BASE}/public/methodologies/${id}` : null;
  return useFetch<PublicMethodologyDetail>(url);
}

/** Fetch list of accredited VVBs with active accreditation status. */
export function usePublicVvbs() {
  const url = `${API_BASE}/public/organizations/vvbs`;
  return useFetch<PublicVvb[]>(url);
}

/** Fetch platform aggregate statistics. */
export function usePublicStatistics() {
  const url = `${API_BASE}/public/statistics`;
  return useFetch<PublicStatistics>(url);
}

/** Verify a carbon credit asset by serial number. */
export function useVerifyAsset(serialNumber: string | null) {
  const url = serialNumber
    ? `${API_BASE}/public/assets/${encodeURIComponent(serialNumber)}`
    : null;
  return useFetch<unknown>(url);
}
