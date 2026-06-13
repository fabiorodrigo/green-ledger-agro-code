import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, MapPin, Building2, FileText, Download, ExternalLink,
  ShieldCheck, Leaf, Calendar, Hash, Globe, TreePine, BarChart3,
  Mail, Link as LinkIcon, CheckCircle2, Clock, Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePublicProjectByCode } from "@/hooks/usePublicAPI";
import { getStatusLabel, getStatusColor } from "@/constants/projectStatus";
import { getSectorLabel, getActivityTypeLabel, SDG_LABELS } from "@/constants/methodologyLabels";
import SEOHead from "@/components/SEOHead";

// -------------------------------------------------------------------------
// Lifecycle phases for the project status timeline
// Each phase has the statuses that mark it as "completed" or "current"
// -------------------------------------------------------------------------
interface LifecyclePhase {
  id: string;
  labelPt: string;
  labelEn: string;
  completedStatuses: string[];
  activeStatuses: string[];
}

const LIFECYCLE_PHASES: LifecyclePhase[] = [
  {
    id: "listed",
    labelPt: "Listado",
    labelEn: "Listed",
    completedStatuses: [
      "IN_VALIDATION","VALIDATED","IN_EXECUTION","IN_MONITORING",
      "IN_VERIFICATION","VERIFIED","ACTIVE","FINALIZED","SUSPENDED",
    ],
    activeStatuses: ["LISTED"],
  },
  {
    id: "validation",
    labelPt: "Validação",
    labelEn: "Validation",
    completedStatuses: [
      "VALIDATED","IN_EXECUTION","IN_MONITORING",
      "IN_VERIFICATION","VERIFIED","ACTIVE","FINALIZED",
    ],
    activeStatuses: ["IN_VALIDATION"],
  },
  {
    id: "execution",
    labelPt: "Execução",
    labelEn: "Execution",
    completedStatuses: [
      "IN_MONITORING","IN_VERIFICATION","VERIFIED","ACTIVE","FINALIZED",
    ],
    activeStatuses: ["VALIDATED","IN_EXECUTION"],
  },
  {
    id: "monitoring",
    labelPt: "Monitoramento",
    labelEn: "Monitoring",
    completedStatuses: ["IN_VERIFICATION","VERIFIED","ACTIVE","FINALIZED"],
    activeStatuses: ["IN_MONITORING"],
  },
  {
    id: "verification",
    labelPt: "Verificação",
    labelEn: "Verification",
    completedStatuses: ["VERIFIED","ACTIVE","FINALIZED"],
    activeStatuses: ["IN_VERIFICATION"],
  },
  {
    id: "credits",
    labelPt: "Emissão de Créditos",
    labelEn: "Credit Issuance",
    completedStatuses: ["FINALIZED"],
    activeStatuses: ["VERIFIED","ACTIVE"],
  },
  {
    id: "finalized",
    labelPt: "Finalizado",
    labelEn: "Finalized",
    completedStatuses: [],
    activeStatuses: ["FINALIZED"],
  },
];

// Statuses where the timeline is useful (not trivially empty and not just DRAFT)
const SHOW_TIMELINE_STATUSES = [
  "LISTED","IN_VALIDATION","VALIDATED","IN_EXECUTION","IN_MONITORING","IN_VERIFICATION",
];

// Human-readable labels for document types returned by the API
const DOC_TYPE_LABELS: Record<string, { pt: string; en: string }> = {
  DCP:                     { pt: "Documento de Concepção de Projeto",  en: "Project Design Document (DCP)" },
  VALIDATION_OPINION:      { pt: "Parecer de Validação (GL)",         en: "Validation Opinion (GL)" },
  VALIDATION_CERTIFICATE:  { pt: "Certificado de Validação",          en: "Validation Certificate" },
  MONITORING_REPORT:       { pt: "Relatório de Monitoramento",        en: "Monitoring Report" },
  GL_VERIFICATION_OPINION: { pt: "Parecer de Verificação (GL)",       en: "Verification Opinion (GL)" },
  VVB_VERIFICATION_OPINION:{ pt: "Parecer de Verificação (VVB)",      en: "Verification Opinion (VVB)" },
  VERIFICATION_CERTIFICATE:{ pt: "Certificado de Verificação",        en: "Verification Certificate" },
  ISSUANCE_STATEMENT:      { pt: "Declaração de Emissão de VCUs",     en: "VCU Issuance Statement" },
  RETIREMENT_CERTIFICATE:  { pt: "Certificado de Aposentadoria",      en: "Retirement Certificate" },
  // Platform `CertificateType` enum values surfaced from `certificates[]`.
  VALIDATION:              { pt: "Certificado de Validação",          en: "Validation Certificate" },
  VERIFICATION_OPINION:    { pt: "Parecer de Verificação",           en: "Verification Opinion" },
  VERIFICATION_BLOCKCHAIN: { pt: "Registro Blockchain da Verificação", en: "Verification Blockchain Record" },
};

function docLabel(type: string, isEn: boolean): string {
  const entry = DOC_TYPE_LABELS[type];
  if (!entry) return type;
  return isEn ? entry.en : entry.pt;
}

const ProjectDetail = () => {
  const { code } = useParams<{ code: string }>();
  const { locale } = useLanguage();
  const isEn = locale === "en";
  const lang = locale as "pt" | "en" | "es";

  const { data: p, loading, error } = usePublicProjectByCode(code ?? null);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{isEn ? "Loading project..." : "Carregando projeto..."}</p>
      </div>
    );
  }

  if (error || !p) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-primary mb-4">
            {isEn ? "Project not found" : "Projeto não encontrado"}
          </h1>
          <Link to="/projetos">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> {isEn ? "Back" : "Voltar"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const creditingStart = p.creditingPeriodStart
    ? new Date(p.creditingPeriodStart).toLocaleDateString(isEn ? "en-GB" : "pt-BR", { month: "2-digit", year: "numeric" })
    : "—";
  const creditingEnd = p.creditingPeriodEnd
    ? new Date(p.creditingPeriodEnd).toLocaleDateString(isEn ? "en-GB" : "pt-BR", { month: "2-digit", year: "numeric" })
    : "—";

  const infoItems = [
    { icon: ShieldCheck, label: "Status",                                                          value: getStatusLabel(p.status, lang) },
    { icon: Building2,   label: isEn ? "Developer" : "Desenvolvedor",                             value: p.organization?.name },
    { icon: FileText,    label: isEn ? "Methodology" : "Metodologia",
      value: `${p.methodology?.code} — ${isEn ? (p.methodology?.nameEn ?? p.methodology?.name) : p.methodology?.name}`,
      link: p.methodology ? `/metodologias/${p.methodology.code.toLowerCase()}` : undefined },
    ...(p.solutionType
      ? [{ icon: Leaf, label: isEn ? "Solution Type" : "Tipo de Solução", value: p.solutionType }]
      : []),
    ...(p.sector
      ? [{ icon: TreePine, label: isEn ? "Sector" : "Setor", value: getSectorLabel(p.sector, lang) }]
      : []),
    ...(p.methodology?.activityType
      ? [{ icon: Hash, label: isEn ? "Activity Type" : "Tipo de Atividade",                       value: getActivityTypeLabel(p.methodology.activityType, lang) }]
      : []),
    ...(p.biome   ? [{ icon: Globe, label: isEn ? "Biome" : "Bioma",                              value: p.biome }] : []),
    ...(p.crop    ? [{ icon: Leaf,  label: isEn ? "Crop / Land Use" : "Cultura / Uso do Solo",    value: p.crop  }] : []),
    ...(p.geeType ? [{ icon: BarChart3, label: isEn ? "GEE Type" : "Tipo de GEE",                 value: p.geeType }] : []),
    { icon: Calendar,    label: isEn ? "Crediting Period" : "Período de Creditação",               value: `${creditingStart} — ${creditingEnd}` },
    ...(p.totalAreaHa
      ? [{ icon: MapPin, label: isEn ? "Total Area" : "Área Total",                               value: `${Number(p.totalAreaHa).toLocaleString()} ha` }]
      : []),
    ...(p.estimatedReductions
      ? [{ icon: BarChart3, label: isEn ? "Estimated Reductions" : "Reduções Estimadas",          value: `${p.estimatedReductions.toLocaleString()} tCO₂e` }]
      : []),
  ];

  const overview      = isEn ? (p.overviewEn ?? p.overviewPt) : p.overviewPt;
  const impact        = p.impact ?? [];
  const verifications = p.verificationEvents ?? [];
  const issuances     = p.issuances ?? [];
  const documents     = p.documents ?? [];
  const evidence      = p.evidence ?? [];
  const totalIssued   = issuances.reduce((s, i) => s + (i.issuedQuantity ?? 0), 0);

  // DCP from evidence + any platform docs of type EVIDENCE grouped as "Project Documents"
  const dcpRows: DocRow[] = evidence.map((e) => ({
    id: e.id,
    type: "DCP",
    title: e.name,
    version: 1,
    fileUrl: e.fileUrl,
    createdAt: e.createdAt,
  }));

  // Platform-issued certificates (IPFS + on-chain anchored). The local
  // DocumentTable renders the name from `docLabel(type)`; we still set `title`
  // (with the certificate number) to satisfy DocRow and aid future use.
  const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
  const certToRow = (c: (typeof p.certificates)[number]): DocRow => ({
    id: c.id,
    type: c.type,
    title: `${docLabel(c.type, isEn)} — ${c.certificateNumber}`,
    version: 1,
    fileUrl: c.ipfsHash ? `${IPFS_GATEWAY}${c.ipfsHash}` : undefined,
    txHash: c.blockchainTxHash,
    createdAt: c.issuedAt,
  });
  const certs = p.certificates ?? [];
  const validationCerts = certs
    .filter((c) => ["VALIDATION_OPINION", "VALIDATION"].includes(c.type))
    .map(certToRow);
  const verificationCerts = certs
    .filter((c) => ["VERIFICATION_OPINION", "VERIFICATION_BLOCKCHAIN"].includes(c.type))
    .map(certToRow);

  // Separate platform documents by lifecycle phase, then merge in certificates
  // so the existing Validation/Verification sections render them.
  const validationDocs: DocRow[] = [
    ...documents.filter((d) => ["VALIDATION_OPINION", "VALIDATION_CERTIFICATE"].includes(d.type)),
    ...validationCerts,
  ];
  const verificationDocs: DocRow[] = [
    ...documents.filter((d) =>
      ["GL_VERIFICATION_OPINION", "VVB_VERIFICATION_OPINION", "VERIFICATION_CERTIFICATE",
       "ISSUANCE_STATEMENT", "MONITORING_REPORT"].includes(d.type)
    ),
    ...verificationCerts,
  ];

  // "Project Documents" section = DCP (from evidence) + any remaining platform docs not in other sections
  const usedTypes = new Set([
    ...validationDocs.map((d) => d.type),
    ...verificationDocs.map((d) => d.type),
  ]);
  const otherPlatformDocs = documents.filter((d) => !usedTypes.has(d.type));
  const projectDocs: DocRow[] = [...dcpRows, ...otherPlatformDocs];

  return (
    <div className="pt-20">
      <SEOHead title={p.name} description={overview ?? p.locationDescription} path={`/projetos/${p.code}`} />

      {/* ===================================================================
          Hero
      =================================================================== */}
      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <Link
            to="/projetos"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> {isEn ? "Back to Projects" : "Voltar para Projetos"}
          </Link>

          <div className="text-sm text-primary-foreground/60 uppercase tracking-widest font-medium mb-2">
            {p.code}
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">{p.name}</h1>

          <div className="flex items-center gap-4 flex-wrap">
            <span className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border font-medium ${getStatusColor(p.status)}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              {getStatusLabel(p.status, lang)}
            </span>
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
              <MapPin className="w-3.5 h-3.5" />
              {p.properties?.[0]
                ? `${p.properties[0].municipality}, ${p.properties[0].state}`
                : p.country}
            </span>
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
              <Building2 className="w-3.5 h-3.5" /> {p.organization?.name}
            </span>
          </div>
        </div>
      </section>

      {/* ===================================================================
          Lifecycle Progress Timeline (only for in-progress projects)
      =================================================================== */}
      {SHOW_TIMELINE_STATUSES.includes(p.status) && (
        <section className="border-b border-border bg-muted/20">
          <div className="container py-8">
            <AnimatedSection>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-5">
                {isEn ? "Project Phase" : "Fase do Projeto"}
              </p>
              <div className="flex items-start gap-0 overflow-x-auto pb-2">
                {LIFECYCLE_PHASES.map((phase, idx) => {
                  const isCompleted = phase.completedStatuses.includes(p.status);
                  const isCurrent  = phase.activeStatuses.includes(p.status);
                  const isLast     = idx === LIFECYCLE_PHASES.length - 1;
                  return (
                    <div key={phase.id} className="flex items-center shrink-0">
                      {/* Node */}
                      <div className="flex flex-col items-center gap-1.5 min-w-[80px] max-w-[100px] text-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                          isCompleted
                            ? "bg-secondary border-secondary text-primary-foreground"
                            : isCurrent
                            ? "bg-background border-secondary text-secondary animate-pulse"
                            : "bg-background border-muted-foreground/30 text-muted-foreground/40"
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : isCurrent ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <Circle className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <span className={`text-[10px] font-medium leading-tight ${
                          isCompleted
                            ? "text-secondary"
                            : isCurrent
                            ? "text-primary font-semibold"
                            : "text-muted-foreground/50"
                        }`}>
                          {isEn ? phase.labelEn : phase.labelPt}
                        </span>
                      </div>
                      {/* Connector line */}
                      {!isLast && (
                        <div className={`h-0.5 w-8 md:w-12 shrink-0 mx-0 transition-colors ${
                          isCompleted ? "bg-secondary" : "bg-muted-foreground/20"
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ===================================================================
          Overview + Sidebar
      =================================================================== */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main column */}
            <div className="lg:col-span-2 space-y-16">

              {/* Overview */}
              {overview && (
                <AnimatedSection>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                    {isEn ? "Overview" : "Visão Geral"}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{overview}</p>
                </AnimatedSection>
              )}

              {/* Impact metrics — Tero Carbon-style highlight numbers */}
              {impact.length > 0 && (
                <AnimatedSection delay={0.1}>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
                    {isEn ? "Positive Impact" : "Impacto Positivo"}
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    {isEn
                      ? "Key environmental and social indicators tracked throughout the project lifecycle."
                      : "Principais indicadores ambientais e sociais acompanhados ao longo do ciclo do projeto."}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {impact.map((item, i) => (
                      <div
                        key={i}
                        className="bg-card border border-border rounded-xl p-6 flex flex-col gap-3"
                      >
                        {/* ODS badge */}
                        <div className="inline-flex items-center gap-1.5 self-start text-xs px-2.5 py-1 rounded-full bg-secondary/10 text-secondary font-semibold">
                          {isEn ? "SDG" : "ODS"} {item.sdg}
                          {SDG_LABELS[item.sdg] && (
                            <span className="font-normal opacity-75">
                              · {SDG_LABELS[item.sdg][isEn ? "en" : "pt"]}
                            </span>
                          )}
                        </div>

                        {/* Highlight number (when available) */}
                        {item.value && (
                          <div>
                            <p className="font-heading text-4xl md:text-5xl font-bold text-primary leading-none">
                              {item.value}
                            </p>
                            {item.unit && (
                              <p className="text-sm font-medium text-secondary mt-1">{item.unit}</p>
                            )}
                          </div>
                        )}

                        {/* Indicator description */}
                        <p className="text-sm text-muted-foreground leading-snug">{item.indicator}</p>

                        {/* Baseline */}
                        {item.baseline && (
                          <p className="text-xs text-muted-foreground/60">
                            <span className="font-medium">{isEn ? "Baseline:" : "Linha de base:"}</span>{" "}
                            {item.baseline}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Credits issued summary */}
              {totalIssued > 0 && (
                <AnimatedSection delay={0.2}>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                    {isEn ? "Credits Issued" : "Créditos Emitidos"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {issuances.map((iss, i) => (
                      <div key={i} className="bg-card border border-secondary/30 rounded-xl p-5 text-center">
                        <p className="font-heading text-3xl md:text-4xl font-bold text-secondary">
                          {iss.issuedQuantity?.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">VCU · Vintage {iss.vintageYear}</p>
                        {iss.txHash && (
                          <p className="text-xs font-mono text-muted-foreground truncate mt-1" title={iss.txHash}>
                            {iss.txHash.slice(0, 10)}...
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.1}>
                <div className="bg-card border border-border rounded-xl p-6 sticky top-28">
                  <h3 className="font-heading font-semibold text-primary text-sm uppercase tracking-wider mb-6">
                    {isEn ? "Project Summary" : "Resumo do Projeto"}
                  </h3>

                  <div className="space-y-4">
                    {infoItems.filter((item) => item.value && String(item.value) !== "—").map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <item.icon className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                          {item.link ? (
                            <Link to={item.link} className="text-sm font-medium text-primary hover:text-secondary transition-colors">
                              {item.value}
                            </Link>
                          ) : (
                            <p className="text-sm font-medium text-primary">{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Developer contact */}
                  {(p.organization?.publicWebsite || p.organization?.email) && (
                    <div className="mt-6 pt-6 border-t border-border space-y-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                        {isEn ? "Developer Contact" : "Contato do Desenvolvedor"}
                      </p>
                      {p.organization.publicWebsite && (
                        <a
                          href={p.organization.publicWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary hover:text-secondary transition-colors"
                        >
                          <LinkIcon className="w-3.5 h-3.5" /> Website
                        </a>
                      )}
                      {p.organization.email && (
                        <a
                          href={`mailto:${p.organization.email}`}
                          className="flex items-center gap-2 text-sm text-primary hover:text-secondary transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" /> {p.organization.email}
                        </a>
                      )}
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-border">
                    <a
                      href={`https://app.greenledger.eco.br/projects/${p.code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-secondary hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {isEn ? "View on Platform" : "Ver na Plataforma"}
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          Project Documents (DCP, Declarations)
      =================================================================== */}
      {projectDocs.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <AnimatedSection>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-8">
                {isEn ? "Project Documents" : "Documentos do Projeto"}
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <DocumentTable docs={projectDocs} isEn={isEn} />
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ===================================================================
          Validation
      =================================================================== */}
      {(p.validationEvent || validationDocs.length > 0) && (
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <AnimatedSection>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                {isEn ? "Project Validation" : "Validação do Projeto"}
              </h2>

              {p.validationEvent && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {p.validationEvent.glOpinion && (
                    <div className="bg-card border border-border rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">{isEn ? "GL Opinion" : "Parecer GL"}</p>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                        <p className="text-sm font-semibold text-primary capitalize">
                          {p.validationEvent.glOpinion.replace(/_/g, " ").toLowerCase()}
                        </p>
                      </div>
                    </div>
                  )}
                  {p.validationEvent.completedAt && (
                    <div className="bg-card border border-border rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">{isEn ? "Completed" : "Concluída em"}</p>
                      <p className="text-sm font-semibold text-primary">
                        {new Date(p.validationEvent.completedAt).toLocaleDateString(isEn ? "en-GB" : "pt-BR")}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {validationDocs.length > 0 && (
                <>
                  <h3 className="font-heading font-semibold text-lg text-primary mb-4">
                    {isEn ? "Validation Documents" : "Documentos da Validação"}
                  </h3>
                  <DocumentTable docs={validationDocs} isEn={isEn} />
                </>
              )}
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ===================================================================
          Verification Events
      =================================================================== */}
      {verifications.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            {verifications.map((v, vi) => (
              <div key={vi} className={vi > 0 ? "mt-16" : ""}>
                <AnimatedSection>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                    {isEn ? `Verification #${v.verificationNumber}` : `${v.verificationNumber}ª Verificação`}
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {v.netIssuable != null && (
                      <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">{isEn ? "Credits" : "Créditos"}</p>
                        <p className="text-sm font-semibold text-secondary">
                          {v.netIssuable.toLocaleString()} tCO₂e
                        </p>
                      </div>
                    )}
                    {v.monitoringPeriodStart && v.monitoringPeriodEnd && (
                      <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">{isEn ? "Period" : "Período"}</p>
                        <p className="text-sm font-semibold text-primary">
                          {new Date(v.monitoringPeriodStart).toLocaleDateString(isEn ? "en-GB" : "pt-BR", { month: "2-digit", year: "numeric" })}
                          {" — "}
                          {new Date(v.monitoringPeriodEnd).toLocaleDateString(isEn ? "en-GB" : "pt-BR", { month: "2-digit", year: "numeric" })}
                        </p>
                      </div>
                    )}
                    {v.verificationAssignment?.vvbOrganization && (
                      <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">VVB</p>
                        <p className="text-sm font-semibold text-primary">
                          {v.verificationAssignment.vvbOrganization.name}
                        </p>
                      </div>
                    )}
                    {v.vvbOpinion && (
                      <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">{isEn ? "VVB Opinion" : "Parecer VVB"}</p>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                          <p className="text-sm font-semibold text-primary capitalize">
                            {v.vvbOpinion.replace(/_/g, " ").toLowerCase()}
                          </p>
                        </div>
                      </div>
                    )}
                    {v.completedAt && (
                      <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">{isEn ? "Completed" : "Concluída em"}</p>
                        <p className="text-sm font-semibold text-primary">
                          {new Date(v.completedAt).toLocaleDateString(isEn ? "en-GB" : "pt-BR")}
                        </p>
                      </div>
                    )}
                    {/* Vintage year from linked issuance */}
                    {v.issuances?.[0]?.vintageYear && (
                      <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">Vintage</p>
                        <p className="text-sm font-semibold text-primary">{v.issuances[0].vintageYear}</p>
                      </div>
                    )}
                  </div>

                  {/* Blockchain record — txHash from the linked issuance */}
                  {v.issuances?.[0]?.txHash && (
                    <div className="flex items-center gap-2 bg-card border border-secondary/30 rounded-lg p-4 mb-8">
                      <Hash className="w-4 h-4 text-secondary shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          {isEn ? "Blockchain Record" : "Registro Blockchain"}
                        </p>
                        <p className="text-xs font-mono text-primary truncate">{v.issuances[0].txHash}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-secondary shrink-0" />
                    </div>
                  )}
                </AnimatedSection>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===================================================================
          Verification Documents (certificates, opinions)
      =================================================================== */}
      {verificationDocs.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <AnimatedSection>
              <h3 className="font-heading font-semibold text-lg text-primary mb-4">
                {isEn ? "Verification Documents" : "Documentos da Verificação"}
              </h3>
              <DocumentTable docs={verificationDocs} isEn={isEn} />
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ===================================================================
          CTA
      =================================================================== */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
              {isEn ? "Questions about this project?" : "Dúvidas sobre este projeto?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              {isEn
                ? "Share your concerns or suggestions anonymously and help us improve continuously."
                : "Compartilhe suas preocupações ou sugestões de forma anônima e ajude-nos a melhorar continuamente."}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/contato">
                <Button className="gap-2">{isEn ? "Contact Us" : "Entre em Contato"}</Button>
              </Link>
              <Link to="/projetos">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> {isEn ? "All Projects" : "Todos os Projetos"}
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Reusable document table component
// ---------------------------------------------------------------------------
interface DocRow {
  id: string;
  type: string;
  title: string;
  version: number;
  fileUrl?: string;
  signedFileUrl?: string;
  txHash?: string;
  createdAt: string;
}

function DocumentTable({ docs, isEn }: { docs: DocRow[]; isEn: boolean }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 font-semibold text-primary">{isEn ? "Document" : "Documento"}</th>
              <th className="text-left p-4 font-semibold text-primary">{isEn ? "Version" : "Versão"}</th>
              <th className="text-left p-4 font-semibold text-primary">{isEn ? "Date" : "Data"}</th>
              <th className="text-center p-4 font-semibold text-primary">PT</th>
              <th className="text-center p-4 font-semibold text-primary">EN</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => {
              const url = doc.signedFileUrl ?? doc.fileUrl;
              return (
                <tr key={doc.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-primary font-medium">
                    {docLabel(doc.type, isEn)}
                    {doc.txHash && (
                      <span className="ml-2 text-xs text-secondary font-mono" title={doc.txHash}>
                        ⛓ {doc.txHash.slice(0, 8)}…
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-muted-foreground">v{doc.version}</td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(doc.createdAt).toLocaleDateString(isEn ? "en-GB" : "pt-BR")}
                  </td>
                  <td className="p-4 text-center">
                    {url ? (
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary">
                          <Download className="w-4 h-4" />
                        </Button>
                      </a>
                    ) : (
                      <Button variant="ghost" size="sm" className="text-muted-foreground/40" disabled>
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <Button variant="ghost" size="sm" className="text-muted-foreground/40" disabled>
                      <Download className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectDetail;
