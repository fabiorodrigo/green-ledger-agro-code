import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, MapPin, Building2, FileText, ExternalLink,
  ShieldCheck, Leaf, Calendar, Hash, Globe, TreePine, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePublicProjectByCode } from "@/hooks/usePublicAPI";
import { getStatusLabel, getStatusColor } from "@/constants/projectStatus";
import { getSectorLabel, getActivityTypeLabel, SDG_LABELS } from "@/constants/methodologyLabels";
import SEOHead from "@/components/SEOHead";

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
    ? new Date(p.creditingPeriodStart).getFullYear()
    : "—";
  const creditingEnd = p.creditingPeriodEnd
    ? new Date(p.creditingPeriodEnd).getFullYear()
    : "—";

  const infoItems = [
    { icon: ShieldCheck, label: "Status", value: getStatusLabel(p.status, lang) },
    { icon: MapPin, label: isEn ? "Location" : "Localização", value: p.locationDescription },
    { icon: Building2, label: isEn ? "Developer" : "Desenvolvedor", value: p.organization?.name },
    { icon: FileText, label: isEn ? "Methodology" : "Metodologia", value: `${p.methodology?.code} — ${isEn ? (p.methodology?.nameEn ?? p.methodology?.name) : p.methodology?.name}`, link: p.methodology ? `/metodologias/${p.methodology.code.toLowerCase()}` : undefined },
    { icon: Leaf, label: isEn ? "Solution Type" : "Tipo de Solução", value: p.solutionType },
    { icon: TreePine, label: isEn ? "Sector" : "Setor", value: getSectorLabel(p.sector, lang) },
    ...(p.methodology?.activityType ? [{ icon: Hash, label: isEn ? "Activity Type" : "Tipo de Atividade", value: getActivityTypeLabel(p.methodology.activityType, lang) }] : []),
    ...(p.biome ? [{ icon: Globe, label: isEn ? "Biome" : "Bioma", value: p.biome }] : []),
    ...(p.crop ? [{ icon: Leaf, label: isEn ? "Crop / Land Use" : "Cultura / Uso do Solo", value: p.crop }] : []),
    ...(p.geeType ? [{ icon: BarChart3, label: isEn ? "GEE Type" : "Tipo de GEE", value: p.geeType }] : []),
    { icon: Calendar, label: isEn ? "Crediting Period" : "Período de Creditação", value: `${creditingStart} — ${creditingEnd}` },
    ...(p.totalAreaHa ? [{ icon: MapPin, label: isEn ? "Total Area" : "Área Total", value: `${Number(p.totalAreaHa).toLocaleString()} ha` }] : []),
    ...(p.estimatedReductions ? [{ icon: BarChart3, label: isEn ? "Estimated Reductions" : "Reduções Estimadas", value: `${p.estimatedReductions.toLocaleString()} tCO₂e` }] : []),
  ];

  const overview = isEn ? (p.overviewEn ?? p.overviewPt) : p.overviewPt;
  const impact = p.impact ?? [];
  const verifications = p.verificationEvents ?? [];
  const issuances = p.issuances ?? [];
  const totalIssued = issuances.reduce((s, i) => s + (i.issuedQuantity ?? 0), 0);

  return (
    <div className="pt-20">
      <SEOHead title={p.name} description={overview ?? p.locationDescription} path={`/projetos/${p.code}`} />

      {/* Hero */}
      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <Link to="/projetos" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-10">
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
              <MapPin className="w-3.5 h-3.5" /> {p.locationDescription}
            </span>
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
              <Building2 className="w-3.5 h-3.5" /> {p.organization?.name}
            </span>
          </div>
        </div>
      </section>

      {/* Project Info Sidebar + Overview */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Overview */}
            <div className="lg:col-span-2">
              {overview && (
                <AnimatedSection>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                    {isEn ? "Overview" : "Visão Geral"}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{overview}</p>
                </AnimatedSection>
              )}

              {/* SDG Impact */}
              {impact.length > 0 && (
                <AnimatedSection delay={0.2}>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6 mt-16">
                    {isEn ? "Sustainable Development Goals" : "Objetivos de Desenvolvimento Sustentável"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {impact.map((item, i) => (
                      <div key={i} className="bg-card border border-border rounded-xl p-5">
                        <div className="flex items-start gap-3">
                          <span className="text-secondary font-heading font-bold text-sm shrink-0">
                            ODS {item.sdg}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground font-medium">
                              {SDG_LABELS[item.sdg]?.[isEn ? "en" : "pt"] ?? `SDG ${item.sdg}`}
                            </p>
                            <p className="text-sm text-primary mt-1">{item.indicator}</p>
                            {item.baseline && (
                              <p className="text-xs text-muted-foreground mt-0.5">{isEn ? "Baseline:" : "Linha de base:"} {item.baseline}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Issuances summary */}
              {totalIssued > 0 && (
                <AnimatedSection delay={0.3}>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6 mt-16">
                    {isEn ? "Credits Issued" : "Créditos Emitidos"}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {issuances.map((iss, i) => (
                      <div key={i} className="bg-card border border-secondary/30 rounded-xl p-4 text-center">
                        <p className="font-heading text-2xl font-bold text-secondary">{iss.issuedQuantity?.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground mt-1">VCU · Vintage {iss.vintageYear}</p>
                        {iss.txHash && (
                          <p className="text-xs font-mono text-muted-foreground truncate mt-1" title={iss.txHash}>
                            {iss.txHash.slice(0, 8)}...
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.1}>
                <div className="bg-card border border-border rounded-xl p-6 sticky top-28">
                  <h3 className="font-heading font-semibold text-primary text-sm uppercase tracking-wider mb-6">
                    {isEn ? "Project Summary" : "Resumo do Projeto"}
                  </h3>
                  <div className="space-y-4">
                    {infoItems.filter((item) => item.value && item.value !== "—").map((item, i) => (
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

      {/* Verification Events */}
      {verifications.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            {verifications.map((v, vi) => (
              <div key={vi} className={vi > 0 ? "mt-16" : ""}>
                <AnimatedSection>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                    {isEn ? `Verification #${v.verificationNumber}` : `Verificação #${v.verificationNumber}`}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {v.netIssuable != null && (
                      <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">{isEn ? "Net Issuable" : "Emissível Líquido"}</p>
                        <p className="text-sm font-semibold text-secondary">{v.netIssuable.toLocaleString()} tCO₂e</p>
                      </div>
                    )}
                    {v.monitoringPeriodStart && (
                      <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">{isEn ? "Period" : "Período"}</p>
                        <p className="text-sm font-semibold text-primary">
                          {new Date(v.monitoringPeriodStart).getFullYear()} — {new Date(v.monitoringPeriodEnd).getFullYear()}
                        </p>
                      </div>
                    )}
                    {v.verificationAssignment?.vvbOrganization && (
                      <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">VVB</p>
                        <p className="text-sm font-semibold text-primary">{v.verificationAssignment.vvbOrganization.name}</p>
                      </div>
                    )}
                    {v.vvbOpinion && (
                      <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">{isEn ? "VVB Opinion" : "Parecer VVB"}</p>
                        <p className="text-sm font-semibold text-primary">{v.vvbOpinion}</p>
                      </div>
                    )}
                    {v.completedAt && (
                      <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">{isEn ? "Completed" : "Concluído"}</p>
                        <p className="text-sm font-semibold text-primary">{new Date(v.completedAt).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
              {isEn ? "Questions about this project?" : "Dúvidas sobre este projeto?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              {isEn
                ? "Contact us for more information or to consult our public registry."
                : "Entre em contato para mais informações ou consulte nosso registro público."}
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

export default ProjectDetail;
