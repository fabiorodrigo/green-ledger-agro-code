import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, FileText, CheckCircle2, Shield, Target, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { getSectorLabel, getActivityTypeLabel, getSolutionLabel, SDG_LABELS } from "@/constants/methodologyLabels";

const API_BASE = "https://api.greenledger.eco.br";

// We look up by code (slug is just the lowercased code)
interface MethodologyDetail {
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
  additionalityPt?: string;
  additionalityEn?: string;
  boundaryPt?: string;
  boundaryEn?: string;
  mrvPt?: string;
  mrvEn?: string;
  qaqcPt?: string;
  qaqcEn?: string;
  safeguardsPt?: string;
  safeguardsEn?: string;
  sdgGoals?: number[];
  developerOrganization: { id: string; name: string };
  currentVersion?: {
    id: string;
    versionNumber: string;
    revisionType: string;
    publishedAt?: string;
  };
  versions: Array<{
    id: string;
    versionNumber: string;
    revisionType: string;
    documentUrl?: string;
    documentUrlEn?: string;
    changeLog?: string;
    publishedAt?: string;
    createdAt: string;
  }>;
}

const whyChoose = [
  {
    icon: Target,
    titlePt: "Abordagem Robusta",
    titleEn: "Robust Approach",
    descPt: "Construída sobre os princípios dos principais referenciais internacionais e alinhada com as melhores práticas do IPCC e padrões de integridade de mercado.",
    descEn: "Built on leading international frameworks and aligned with IPCC best practices and market integrity standards.",
  },
  {
    icon: Shield,
    titlePt: "Credibilidade e Transparência",
    titleEn: "Credibility and Transparency",
    descPt: "Processo de aprovação com consulta pública, revisão por pares e validação por VVBs independentes credenciados pela Green Ledger.",
    descEn: "Approval process with public consultation, peer review and validation by independent VVBs accredited by Green Ledger.",
  },
  {
    icon: Layers,
    titlePt: "Processo Estruturado",
    titleEn: "Structured Process",
    descPt: "Fornece um caminho claro e referenciado, conectando cada etapa do projeto às ferramentas e documentos necessários para a certificação.",
    descEn: "Provides a clear, referenced path connecting each project step to the tools and documents required for certification.",
  },
];

const MethodologyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLanguage();
  const isEn = locale === "en";
  const lang = locale as "pt" | "en" | "es";

  const [m, setM] = useState<MethodologyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setLoading(true);
    setError(false);

    // Slug is the code lowercased (e.g. "gl-afolu-001")
    // We search by code (uppercased) via the list endpoint
    const upperCode = slug.toUpperCase();
    fetch(`${API_BASE}/public/methodologies?search=${encodeURIComponent(upperCode)}&limit=5`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const list = data?.data ?? [];
        const found = list.find((item: { code: string }) => item.code.toUpperCase() === upperCode);
        if (!found) {
          setError(true);
          setLoading(false);
          return;
        }
        // Fetch full detail
        return fetch(`${API_BASE}/public/methodologies/${found.id}`)
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          })
          .then((detail) => {
            if (!cancelled) {
              setM(detail);
              setLoading(false);
            }
          });
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{isEn ? "Loading methodology..." : "Carregando metodologia..."}</p>
      </div>
    );
  }

  if (error || !m) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-primary mb-4">
            {isEn ? "Methodology not found" : "Metodologia não encontrada"}
          </h1>
          <Link to="/metodologias">
            <Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> {isEn ? "Back" : "Voltar"}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = isEn ? (m.nameEn ?? m.name) : m.name;
  const description = isEn ? (m.descriptionEn ?? m.descriptionPt) : m.descriptionPt;
  const eligibility = isEn ? (m.eligibilityEn ?? m.eligibilityPt) : m.eligibilityPt;
  const additionality = isEn ? (m.additionalityEn ?? m.additionalityPt) : m.additionalityPt;
  const boundary = isEn ? (m.boundaryEn ?? m.boundaryPt) : m.boundaryPt;
  const mrv = isEn ? (m.mrvEn ?? m.mrvPt) : m.mrvPt;
  const qaqc = isEn ? (m.qaqcEn ?? m.qaqcPt) : m.qaqcPt;
  const safeguards = isEn ? (m.safeguardsEn ?? m.safeguardsPt) : m.safeguardsPt;

  const eligibilityItems = eligibility
    ? eligibility.split(". ").filter(Boolean).map((s) => s.replace(/\.$/, ""))
    : [];

  const processSteps = [
    {
      num: "01",
      titlePt: "Adicionalidade, Linha de Base e Vazamento",
      titleEn: "Additionality, Baseline and Leakage",
      description: additionality,
      details: {
        pt: [
          "Comprove que o projeto é adicional utilizando a Ferramenta de Demonstração de Adicionalidade",
          "Calcule as emissões evitadas e/ou remoções conforme as equações e procedimentos da metodologia",
          "Avalie e quantifique o risco de vazamento (leakage) utilizando a ferramenta apropriada",
        ],
        en: [
          "Prove additionality using the Additionality Demonstration Tool",
          "Calculate avoided emissions and/or removals per methodology equations and procedures",
          "Assess and quantify leakage risk using the appropriate tool",
        ],
      },
    },
    {
      num: "02",
      titlePt: "Boundary e Escopo do Projeto",
      titleEn: "Project Boundary and Scope",
      description: boundary,
      details: {
        pt: [
          "Defina os limites geográficos e temporais do projeto",
          "Identifique todas as fontes, sumidouros e reservatórios relevantes",
          "Documente o escopo no Documento de Concepção de Projeto (DCP)",
        ],
        en: [
          "Define the geographical and temporal project boundaries",
          "Identify all relevant sources, sinks and reservoirs",
          "Document the scope in the Project Design Document (PDD)",
        ],
      },
    },
    {
      num: "03",
      titlePt: "Monitoramento, Relato e Verificação (MRV)",
      titleEn: "Monitoring, Reporting and Verification (MRV)",
      description: mrv,
      details: {
        pt: [
          "Implemente o plano de monitoramento conforme especificado na documentação técnica",
          "Mantenha registros por no mínimo 5 anos após o período de creditação",
          "Verificação por organismos independentes (VVBs) credenciados pela Green Ledger",
        ],
        en: [
          "Implement the monitoring plan as specified in the technical documentation",
          "Maintain records for at least 5 years after the crediting period",
          "Verification by independent bodies (VVBs) accredited by Green Ledger",
        ],
      },
    },
    {
      num: "04",
      titlePt: "Controle de Qualidade (QA/QC)",
      titleEn: "Quality Control (QA/QC)",
      description: qaqc,
      details: {
        pt: [
          "Siga os protocolos padronizados de controle de qualidade",
          "Realize verificações cruzadas e revisões internas antes da submissão",
          "Garanta rastreabilidade completa dos dados e procedimentos",
        ],
        en: [
          "Follow standardized quality control protocols",
          "Perform cross-checks and internal reviews before submission",
          "Ensure full data and procedure traceability",
        ],
      },
    },
  ].filter((s) => s.description); // only show steps with content

  return (
    <div className="pt-20">
      <SEOHead title={`${m.code} — ${title}`} description={description ?? ""} path={`/metodologias/${slug}`} />

      {/* Hero Banner */}
      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <Link
            to="/metodologias"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> {isEn ? "Back to Methodologies" : "Voltar para Metodologias"}
          </Link>

          <div className="text-sm text-primary-foreground/60 uppercase tracking-widest font-medium mb-2">
            {isEn ? "Methodology" : "Metodologia"}
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
            {m.code}
          </h1>
          <p className="text-xl md:text-2xl text-accent font-heading font-semibold mb-6">{title}</p>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
              {getSolutionLabel(m.solutionType, lang)}
            </span>
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
              {getSectorLabel(m.sector, lang)}
            </span>
            {m.activityType && (
              <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
                {getActivityTypeLabel(m.activityType, lang)}
              </span>
            )}
            {m.currentVersion && (
              <span className="text-xs px-3 py-1.5 bg-secondary/20 text-accent rounded-full border border-accent/20">
                v{m.currentVersion.versionNumber}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Overview */}
      {description && (
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container max-w-4xl">
            <AnimatedSection>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                {isEn ? `Methodology ${m.code}` : `Metodologia ${m.code}`} — {title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{description}</p>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Why Choose */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
              {isEn ? `Why choose ${m.code}?` : `Por que escolher a ${m.code}?`}
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              {isEn
                ? "Key differentiators that make this methodology a reference for its type of project."
                : "Diferenciais que tornam esta metodologia referência para o seu tipo de projeto."}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChoose.map((item, i) => (
              <AnimatedSection key={item.titlePt} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-xl p-8 h-full hover:shadow-card transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-primary mb-3">
                    {isEn ? item.titleEn : item.titlePt}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {isEn ? item.descEn : item.descPt}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      {eligibilityItems.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <AnimatedSection>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
                {isEn ? "Who can use this Methodology?" : "Quem pode utilizar esta Metodologia?"}
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                {isEn
                  ? "This methodology applies to projects meeting the following criteria:"
                  : "Esta metodologia é aplicável a projetos que atendam aos seguintes critérios essenciais:"}
              </p>
            </AnimatedSection>

            <div className="space-y-5">
              {eligibilityItems.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="flex items-start gap-4 bg-card border border-border rounded-lg p-5">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <p className="text-primary font-medium text-sm leading-relaxed">{item}.</p>
                  </div>
                </AnimatedSection>
              ))}
              <AnimatedSection delay={eligibilityItems.length * 0.08}>
                <div className="flex items-start gap-4 bg-card border border-border rounded-lg p-5">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <p className="text-primary font-medium text-sm leading-relaxed">
                    {isEn
                      ? "Demonstrates compliance with Green Ledger's environmental and social safeguards."
                      : "Demonstra conformidade com as salvaguardas ambientais e sociais da Green Ledger."}
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* SDG Goals */}
      {m.sdgGoals && m.sdgGoals.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <AnimatedSection>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                {isEn ? "Sustainable Development Goals" : "Objetivos de Desenvolvimento Sustentável"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {m.sdgGoals.map((sdg) => (
                  <div key={sdg} className="bg-card border border-border rounded-lg p-4 text-center">
                    <span className="font-heading font-bold text-secondary text-lg block">ODS {sdg}</span>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {SDG_LABELS[sdg]?.[isEn ? "en" : "pt"] ?? `SDG ${sdg}`}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Process Steps */}
      {processSteps.length > 0 && (
        <section className={`py-16 md:py-24 ${m.sdgGoals && m.sdgGoals.length > 0 ? "bg-muted/30" : ""}`}>
          <div className="container max-w-4xl">
            <AnimatedSection>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
                {isEn ? "How to Apply this Methodology" : "O Processo de Aplicação da Metodologia"}
              </h2>
              <p className="text-muted-foreground mb-12 leading-relaxed">
                {isEn
                  ? "Your journey from conception to credit generation follows a logical flow with specific tools at each step."
                  : "Sua jornada desde a concepção até a geração de créditos segue um fluxo lógico com ferramentas específicas."}
              </p>
            </AnimatedSection>

            <div className="space-y-10">
              {processSteps.map((step, i) => (
                <AnimatedSection key={step.num} delay={i * 0.1}>
                  <div className="relative pl-16 md:pl-20">
                    <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <span className="font-heading font-bold text-primary-foreground text-sm">{step.num}</span>
                    </div>
                    {i < processSteps.length - 1 && (
                      <div className="absolute left-6 top-12 w-px h-[calc(100%+1rem)] bg-border" />
                    )}
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-primary mb-2">
                        {isEn ? step.titleEn : step.titlePt}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {(isEn ? step.details.en : step.details.pt).map((d, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Safeguards */}
      {safeguards && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            <AnimatedSection>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                {isEn ? "Environmental and Social Safeguards" : "Salvaguardas Ambientais e Sociais"}
              </h2>
              <div className="bg-card border border-border rounded-xl p-8">
                <p className="text-muted-foreground leading-relaxed text-sm">{safeguards}</p>
                <p className="text-muted-foreground leading-relaxed text-sm mt-4">
                  {isEn
                    ? "Green Ledger requires all projects to conduct a full socio-environmental safeguards analysis, ensuring project benefits extend to local communities with no significant negative impacts."
                    : "A Green Ledger exige que todos os projetos realizem uma análise completa de salvaguardas socioambientais, garantindo que os benefícios do projeto se estendam às comunidades locais e que nenhum impacto negativo significativo seja gerado."}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Version History */}
      {m.versions && m.versions.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <AnimatedSection>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
                {isEn ? "Version History" : "Histórico de Revisões"}
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                {isEn
                  ? "Full transparency — we maintain a public record of all versions of this methodology."
                  : "Para garantir total transparência, mantemos um registro público de todas as versões desta metodologia."}
              </p>
            </AnimatedSection>

            <div className="space-y-4">
              {[...m.versions].reverse().map((ver, i) => (
                <AnimatedSection key={ver.id} delay={i * 0.08}>
                  <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-5">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-heading font-bold text-primary text-xs">v{ver.versionNumber}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-primary text-sm">
                        {isEn ? "Version" : "Versão"} v{ver.versionNumber}
                        {" · "}
                        <span className="text-muted-foreground font-normal text-xs">{ver.revisionType}</span>
                      </p>
                      {ver.publishedAt && (
                        <p className="text-muted-foreground text-xs">
                          {isEn ? "Published" : "Publicada em"} {new Date(ver.publishedAt).getFullYear()}
                        </p>
                      )}
                    </div>
                    {i === 0 && (
                      <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full font-medium">
                        {isEn ? "Current" : "Atual"}
                      </span>
                    )}
                    {ver.documentUrl && (
                      <a
                        href={ver.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-secondary hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" /> PDF
                      </a>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
              {isEn ? "Ready to start your project?" : "Pronto para iniciar seu projeto?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              {isEn
                ? "Register on the platform and start a project using this methodology, or contact our technical team."
                : "Cadastre-se na plataforma e inicie um projeto usando esta metodologia, ou entre em contato com nossa equipe técnica."}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="https://app.greenledger.eco.br/register" target="_blank" rel="noopener noreferrer">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                  {isEn ? "Use this Methodology" : "Usar esta Metodologia"} <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Link to="/contato">
                <Button variant="outline" className="gap-2">
                  {isEn ? "Contact Us" : "Entre em Contato"}
                </Button>
              </Link>
              <Link to="/metodologias">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> {isEn ? "All Methodologies" : "Todas as Metodologias"}
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default MethodologyDetail;
