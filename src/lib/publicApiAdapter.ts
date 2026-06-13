/**
 * Public API adapter — pure mapping functions.
 *
 * The site (built in Lovable) was designed against a richer, differently-named
 * contract than the Green Ledger platform actually exposes. This module is the
 * single source of truth that translates the REAL platform responses into the
 * site's types (the field names the pages already read).
 *
 * Design rules:
 * - Pure functions only (no fetch). The hooks in `usePublicAPI.ts` (Task S2)
 *   call these after fetching. This keeps the mappers trivially unit-testable.
 * - Backlog fields (no data on the platform yet — see spec §9) are left
 *   `undefined`/`[]`. We NEVER invent values; the pages degrade gracefully.
 * - Field names returned here are the contract with the pages — do not rename.
 *
 * Spec: docs/specs/2026-06-13-public-api-adapter-design.md (§4 field maps,
 * §5 status map, §6 reshape).
 */

// ---------------------------------------------------------------------------
// Site types (moved verbatim from usePublicAPI.ts).
//
// Backlog fields the platform does not yet provide are relaxed to optional
// (strategy (a) from the plan) — cleaner than casting, and the pages already
// guard these with `?`/`??`. Fields the pages read remain present and named
// exactly as before.
// ---------------------------------------------------------------------------

export interface PublicProject {
  id: string;
  code: string;
  name: string;
  assetType: string;
  /** backlog — NBS/TBS classification not modelled on the platform yet */
  solutionType?: "NBS" | "TBS";
  scale?: string;
  /** backlog — rich sector taxonomy not modelled on the platform yet */
  sector?: string;
  afolouCategory?: string;
  status: string;
  country: string;
  locationDescription: string;
  /** backlog — total area not exposed by the platform yet */
  totalAreaHa?: number;
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
    value?: string;
    unit?: string;
    indicator: string;
    baseline: string;
    frequency: string;
    methodology: string;
  }>;
  properties?: Array<{
    municipality: string;
    state: string;
    latitude?: number;
    longitude?: number;
  }>;
  /** backlog — platform detail does not include updatedAt today */
  updatedAt?: string;
  organization: {
    id: string;
    name: string;
    /** backlog — organization type not exposed publicly yet */
    type?: string;
    publicWebsite?: string;
    email?: string;
  };
  methodology: {
    id: string;
    code: string;
    name: string;
    nameEn?: string;
    /** backlog — methodology solutionType not exposed publicly yet */
    solutionType?: string;
    /** backlog — methodology sector not exposed publicly yet */
    sector?: string;
    activityType?: string;
  };
  members: Array<{
    id?: string;
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
  /**
   * Certificates issued by the platform (validation/verification opinions and
   * blockchain-anchored certificates). Each is anchored in IPFS (`ipfsHash`)
   * and on-chain (`blockchainTxHash`) with a `sha256` content hash.
   */
  certificates: Array<{
    id: string;
    type: string;
    certificateNumber: string;
    issuedAt: string;
    ipfsHash?: string;
    blockchainTxHash?: string;
    sha256?: string;
  }>;
  /** DCP and other developer-submitted evidence visible per GL-DC.CER.001 — backlog */
  evidence: Array<{
    id: string;
    category: string;
    name: string;
    fileUrl: string;
    createdAt: string;
  }>;
  _count: { properties: number; issuances: number; assets: number };
}

export interface PublicMethodology {
  id: string;
  code: string;
  name: string;
  nameEn?: string;
  /** backlog — NBS/TBS classification not modelled on the platform yet */
  solutionType?: "NBS" | "TBS";
  /** backlog — single sector derived from sectors[] when the page needs it */
  sector?: string;
  /** sectors[] from the platform */
  sectors?: string[];
  activityType?: string;
  geeType?: string;
  assetType?: string;
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
    id?: string;
    versionNumber: string;
    revisionType?: string;
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
  updatedAt?: string;
  developerOrganization: { id: string; name: string; type?: string };
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
  /** backlog — assignment counts not exposed by the platform yet */
  _count?: { verificationAssignments: number };
}

export interface PublicStatistics {
  totalProjects: number;
  totalMethodologies: number;
  totalCreditsIssued: number;
  totalCreditsRetired: number;
  /** backlog — distinct organization count not exposed by the platform yet */
  totalOrganizations?: number;
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
// Raw platform shapes (minimal — only the fields we read).
// ---------------------------------------------------------------------------

interface RawPaginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface RawOrgRef {
  _id?: string;
  id?: string;
  name?: string;
  organizationName?: string;
}

interface RawMethodologyRef {
  _id: string;
  code: string;
  name: string;
  version?: string;
}

// ---------------------------------------------------------------------------
// Status mapping (workflow state -> canonical site status). Spec §5.
// This is the ONLY place the workflow->canonical conversion happens.
// ---------------------------------------------------------------------------

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
  // Credits have been issued and registered — canonical "active" registry state.
  VERIFICATION_REGISTRY_UPDATE: "ACTIVE",
  CONCLUDED: "FINALIZED",
  SUSPENDED: "SUSPENDED",
};

/** Translate a platform workflow state to the canonical site status. */
export function mapStatus(state: string): string {
  // Unknown states pass through unchanged so getStatusLabel's fallback still works.
  return STATUS_MAP[state] ?? state;
}

// ---------------------------------------------------------------------------
// Pagination reshape. Spec §3.
// ---------------------------------------------------------------------------

/** Wrap a flat platform `{data,total,page,limit,totalPages}` into `{data, meta}`. */
export function toPaginated<TIn, TOut>(
  raw: RawPaginated<TIn> | null | undefined,
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

// ---------------------------------------------------------------------------
// Shared helpers.
// ---------------------------------------------------------------------------

/** Normalize a platform org/developer reference to `{ id, name }`. */
function mapOrg(ref: RawOrgRef | null | undefined): { id: string; name: string } {
  if (!ref) return { id: "", name: "" };
  return {
    id: ref._id ?? ref.id ?? "",
    name: ref.organizationName ?? ref.name ?? "",
  };
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

// ---------------------------------------------------------------------------
// Project (list). Spec §4.1.
// ---------------------------------------------------------------------------

export function mapProject(raw: Record<string, unknown>): PublicProject {
  const r = raw as {
    _id: string;
    code?: string;
    name?: string;
    type?: string;
    status?: string;
    country?: string;
    location?: string;
    creditingPeriodStart?: string;
    creditingPeriodEnd?: string;
    createdAt?: string;
    developer?: RawOrgRef;
    methodology?: RawMethodologyRef | null;
  };
  return {
    id: r._id,
    code: r.code ?? "",
    name: r.name ?? "",
    assetType: r.type ?? "",
    // backlog fields (spec §4.1 / §9) — never invented:
    solutionType: undefined,
    scale: undefined,
    sector: undefined,
    afolouCategory: undefined,
    status: r.status ? mapStatus(r.status) : "",
    country: r.country ?? "",
    locationDescription: r.location ?? "",
    totalAreaHa: undefined,
    estimatedReductions: undefined,
    creditingPeriodStart: r.creditingPeriodStart ?? "",
    creditingPeriodEnd: r.creditingPeriodEnd ?? "",
    createdAt: r.createdAt ?? "",
    organization: mapOrg(r.developer),
    methodology: r.methodology
      ? { id: r.methodology._id, code: r.methodology.code, name: r.methodology.name }
      : { id: "", code: "", name: "" },
  };
}

// ---------------------------------------------------------------------------
// Project (detail). Spec §4.2 + reshape §6.
// ---------------------------------------------------------------------------

interface RawProperty {
  municipality?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
}

interface RawValidationEvent {
  opinion?: string;
  completedAt?: string;
  reportDocumentId?: string;
}

interface RawVerificationEvent {
  roundNumber?: number;
  monitoringPeriodStart?: string;
  monitoringPeriodEnd?: string;
  netIssuable?: number;
  vvbOpinion?: string;
  vvbReportUrl?: string;
  glDeclarationUrl?: string;
  completedAt?: string;
  verificationAssignment?: { vvb?: RawOrgRef };
}

interface RawIssuance {
  vintageYear?: number;
  issuedQuantity?: number;
  mintTxHash?: string;
}

interface RawDocument {
  _id?: string;
  id?: string;
  type?: string;
  originalName?: string;
  title?: string;
  version?: number;
  fileUrl?: string;
  signedFileUrl?: string;
  txHash?: string;
  createdAt?: string;
}

interface RawMember {
  _id?: string;
  id?: string;
  role?: string;
  organization?: RawOrgRef;
}

interface RawCertificate {
  _id?: string;
  id?: string;
  type?: string;
  certificateNumber?: string;
  issuedAt?: string;
  ipfsHash?: string;
  blockchainTxHash?: string;
  sha256?: string;
}

function mapCertificate(c: RawCertificate): PublicProjectDetail["certificates"][number] {
  return {
    id: c._id ?? c.id ?? "",
    type: c.type ?? "",
    certificateNumber: c.certificateNumber ?? "",
    issuedAt: c.issuedAt ?? "",
    ipfsHash: c.ipfsHash,
    blockchainTxHash: c.blockchainTxHash,
    sha256: c.sha256,
  };
}

function mapDocument(d: RawDocument): PublicProjectDocument {
  return {
    id: d._id ?? d.id ?? "",
    type: d.type ?? "",
    // Platform stores the human-readable file name under `originalName`.
    title: d.title ?? d.originalName ?? "",
    version: d.version ?? 1,
    fileUrl: d.fileUrl,
    signedFileUrl: d.signedFileUrl,
    txHash: d.txHash,
    createdAt: d.createdAt ?? "",
  };
}

function mapTopIssuance(i: RawIssuance): PublicProjectDetail["issuances"][number] {
  return {
    vintageYear: i.vintageYear ?? 0,
    issuedQuantity: i.issuedQuantity ?? 0,
    // Reshape §4.2: site reads `txHash`; platform exposes `mintTxHash`.
    txHash: i.mintTxHash,
  };
}

function mapVerificationEvent(
  e: RawVerificationEvent,
): PublicProjectDetail["verificationEvents"][number] {
  const vvb = e.verificationAssignment?.vvb;
  return {
    // Reshape §6: site reads `verificationNumber`; platform exposes `roundNumber`.
    verificationNumber: e.roundNumber ?? 0,
    monitoringPeriodStart: e.monitoringPeriodStart ?? "",
    monitoringPeriodEnd: e.monitoringPeriodEnd ?? "",
    netIssuable: e.netIssuable,
    vvbOpinion: e.vvbOpinion,
    vvbReportUrl: e.vvbReportUrl,
    glDeclarationUrl: e.glDeclarationUrl,
    completedAt: e.completedAt,
    verificationAssignment: vvb ? { vvbOrganization: mapOrg(vvb) } : undefined,
    // Reshape §6 decision: avoid fragile per-round correlation. The platform
    // exposes issuances only at the top level, so each event gets `[]` and the
    // detail page uses the top-level `issuances[]` for the emissions block.
    issuances: [],
  };
}

export function mapProjectDetail(raw: Record<string, unknown>): PublicProjectDetail {
  const base = mapProject(raw);
  const r = raw as {
    overview?: string;
    biome?: string;
    cadTrustUrl?: string;
    methodology?: RawMethodologyRef | null;
    properties?: RawProperty[];
    validationEvent?: RawValidationEvent | null;
    verificationEvents?: RawVerificationEvent[];
    issuances?: RawIssuance[];
    documents?: RawDocument[];
    certificates?: RawCertificate[];
    members?: RawMember[];
    _count?: { properties?: number; issuances?: number; assets?: number };
  };

  const properties = (r.properties ?? []).map((p) => ({
    municipality: p.municipality ?? "",
    state: p.state ?? "",
    latitude: p.latitude,
    longitude: p.longitude,
  }));

  const firstProp = r.properties?.[0];
  const coordinates =
    firstProp && typeof firstProp.longitude === "number" && typeof firstProp.latitude === "number"
      ? { type: "Point", coordinates: [firstProp.longitude, firstProp.latitude] as [number, number] }
      : undefined;

  const validationEvent = r.validationEvent
    ? {
        completedAt: r.validationEvent.completedAt,
        // Reshape §6: site reads `glOpinion`; platform exposes `opinion`.
        glOpinion: r.validationEvent.opinion,
        // Only `reportDocumentId` exists (no public URL) — backlog.
        glReportUrl: undefined,
      }
    : undefined;

  return {
    ...base,
    methodologyVersion: r.methodology?.version ?? "",
    coordinates,
    landComplianceSeal: asString(r.cadTrustUrl) || undefined,
    biome: r.biome,
    // backlog detail fields (spec §4.2 / §9) — never invented:
    startDate: undefined,
    commitmentPeriodEnd: undefined,
    sbceIntention: undefined,
    crop: undefined,
    geeType: undefined,
    overviewPt: r.overview,
    overviewEn: undefined,
    impact: undefined,
    properties,
    updatedAt: undefined,
    organization: {
      ...base.organization,
      type: undefined,
      publicWebsite: undefined,
      email: undefined,
    },
    methodology: {
      ...base.methodology,
      nameEn: undefined,
      solutionType: undefined,
      sector: undefined,
      activityType: undefined,
    },
    members: (r.members ?? []).map((m) => ({
      id: m._id ?? m.id,
      role: m.role ?? "",
      organization: mapOrg(m.organization),
    })),
    validationEvent,
    verificationEvents: (r.verificationEvents ?? []).map(mapVerificationEvent),
    issuances: (r.issuances ?? []).map(mapTopIssuance),
    documents: (r.documents ?? []).map(mapDocument),
    certificates: (r.certificates ?? []).map(mapCertificate),
    evidence: [], // backlog (spec §9)
    _count: {
      properties: r._count?.properties ?? properties.length,
      issuances: r._count?.issuances ?? (r.issuances?.length ?? 0),
      assets: r._count?.assets ?? 0,
    },
  };
}

// ---------------------------------------------------------------------------
// Methodology. Spec §4.3.
// ---------------------------------------------------------------------------

export function mapMethodology(raw: Record<string, unknown>): PublicMethodology {
  const r = raw as {
    _id: string;
    code?: string;
    name?: string;
    status?: string;
    description?: string;
    sectors?: string[];
    version?: string;
    createdAt?: string;
    developer?: RawOrgRef;
  };
  return {
    id: r._id,
    code: r.code ?? "",
    name: r.name ?? "",
    nameEn: undefined,
    // backlog (spec §4.3 / §9):
    solutionType: undefined,
    sector: r.sectors?.[0],
    sectors: r.sectors ?? [],
    activityType: undefined,
    geeType: undefined,
    assetType: undefined,
    status: r.status ?? "",
    descriptionPt: r.description,
    descriptionEn: undefined,
    sdgGoals: undefined,
    createdAt: r.createdAt ?? "",
    developerOrganization: mapOrg(r.developer),
    currentVersion: r.version ? { versionNumber: r.version } : undefined,
  };
}

export function mapMethodologyDetail(raw: Record<string, unknown>): PublicMethodologyDetail {
  const base = mapMethodology(raw);
  const r = raw as {
    developer?: RawOrgRef;
  };
  return {
    ...base,
    updatedAt: undefined,
    developerOrganization: { ...mapOrg(r.developer), type: undefined },
    // backlog collections (spec §4.3 / §9):
    versions: [],
    consultations: [],
  };
}

// ---------------------------------------------------------------------------
// VVB. Spec §4.4.
// ---------------------------------------------------------------------------

export function mapVvb(raw: Record<string, unknown>): PublicVvb {
  const r = raw as {
    _id?: string;
    id?: string;
    organizationName?: string;
    name?: string;
    status?: string;
  };
  return {
    id: r._id ?? r.id ?? "",
    name: r.organizationName ?? r.name ?? "",
    accreditationStatus: r.status ?? "",
    // backlog (spec §4.4 / §9):
    publicWebsite: undefined,
    accreditationDate: undefined,
    accreditedScales: [],
    accreditedSectors: [],
    accreditedActivityTypes: [],
    _count: undefined,
  };
}

// ---------------------------------------------------------------------------
// Statistics. Spec §4.5.
// ---------------------------------------------------------------------------

export function mapStatistics(raw: Record<string, unknown>): PublicStatistics {
  const r = raw as {
    totalProjects?: number;
    methodologyCount?: number;
    totalVcuIssued?: number;
    totalVcsuIssued?: number;
    totalRetired?: number;
  };
  return {
    totalProjects: r.totalProjects ?? 0,
    totalMethodologies: r.methodologyCount ?? 0,
    totalCreditsIssued: (r.totalVcuIssued ?? 0) + (r.totalVcsuIssued ?? 0),
    totalCreditsRetired: r.totalRetired ?? 0,
    totalOrganizations: undefined, // backlog (spec §4.5 / §9)
  };
}
