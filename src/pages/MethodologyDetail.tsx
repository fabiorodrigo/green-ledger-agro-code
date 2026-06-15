import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, FileText, CheckCircle2, Shield, Target, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import ConsultationForm from "@/components/ConsultationForm";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { getSectorLabel, getActivityTypeLabel, getSolutionLabel, SDG_LABELS } from "@/constants/methodologyLabels";
import { usePublicMethodologies, usePublicMethodology } from "@/hooks/usePublicAPI";

const whyChoose = [
  {
    icon: Target,
    titlePt: "Abordagem Robusta",
    titleEn: "Robust Approach",
    titleEs: "Enfoque Robusto",
    descPt: "Construída sobre os princípios dos principais referenciais internacionais e alinhada com as melhores práticas do IPCC e padrões de integridade de mercado.",
    descEn: "Built on leading international frameworks and aligned with IPCC best practices and market integrity standards.",
    descEs: "Construida sobre los principios de los principales referenciales internacionales y alineada con las mejores prácticas del IPCC y los estándares de integridad del mercado.",
  },
  {
    icon: Shield,
    titlePt: "Credibilidade e Transparência",
    titleEn: "Credibility and Transparency",
    titleEs: "Credibilidad y Transparencia",
    descPt: "Processo de aprovação com consulta pública, revisão por pares e validação por VVBs independentes credenciados pela Green Ledger.",
    descEn: "Approval process with public consultation, peer review and validation by independent VVBs accredited by Green Ledger.",
    descEs: "Proceso de aprobación con consulta pública, revisión por pares y validación por VVBs independientes acreditadas por Green Ledger.",
  },
  {
    icon: Layers,
    titlePt: "Processo Estruturado",
    titleEn: "Structured Process",
    titleEs: "Proceso Estructurado",
    descPt: "Fornece um caminho claro e referenciado, conectando cada etapa do projeto às ferramentas e documentos necessários para a certificação.",
    descEn: "Provides a clear, referenced path connecting each project step to the tools and documents required for certification.",
    descEs: "Proporciona un camino claro y referenciado, conectando cada etapa del proyecto con las herramientas y documentos necesarios para la certificación.",
  },
];

const MethodologyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale, tr } = useLanguage();
  const lang = locale as "pt" | "en" | "es";

  // The route slug is the methodology *code* (e.g. "met001"). The platform has
  // no by-code methodology endpoint (only projects do), so we resolve in two
  // steps via the mapped hooks:
  //   1. search the (paginated) list by code to find the matching summary,
  //   2. fetch the full detail by its id.
  const { data: list, loading: listLoading, error: listError } =
    usePublicMethodologies({ search: slug, limit: 50 });

  const summary = list?.data.find(
    (item) => item.code.toLowerCase() === slug?.toLowerCase(),
  );

  const { data: m, loading: detailLoading, error: detailError } =
    usePublicMethodology(summary?.id ?? null);

  // Loading while the list is still resolving, or while we have a matched
  // summary whose detail is still in flight.
  const loading = listLoading || (!!summary && detailLoading);
  // Error if either request failed, or the list resolved with no code match
  // (genuine 404 — the methodology does not exist / is not published).
  const error =
    !!listError ||
    !!detailError ||
    (!listLoading && !!list && !summary);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{tr("Carregando metodologia...", "Loading methodology...", "Cargando metodología...")}</p>
      </div>
    );
  }

  if (error || !m) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-primary mb-4">
            {tr("Metodologia não encontrada", "Methodology not found", "Metodología no encontrada")}
          </h1>
          <Link to="/metodologias">
            <Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> {tr("Voltar", "Back", "Volver")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  // API-backed methodology content only has PT/EN variants; Spanish falls back
  // to EN (rule: do not invent ES API data). Use `locale === "en"` selection.
  const title = locale === "en" ? (m.nameEn ?? m.name) : m.name;
  const description = locale === "en" ? (m.descriptionEn ?? m.descriptionPt) : m.descriptionPt;
  const eligibility = locale === "en" ? (m.eligibilityEn ?? m.eligibilityPt) : m.eligibilityPt;
  const additionality = locale === "en" ? (m.additionalityEn ?? m.additionalityPt) : m.additionalityPt;
  const boundary = locale === "en" ? (m.boundaryEn ?? m.boundaryPt) : m.boundaryPt;
  const mrv = locale === "en" ? (m.mrvEn ?? m.mrvPt) : m.mrvPt;
  const qaqc = locale === "en" ? (m.qaqcEn ?? m.qaqcPt) : m.qaqcPt;
  const safeguards = locale === "en" ? (m.safeguardsEn ?? m.safeguardsPt) : m.safeguardsPt;

  const eligibilityItems = eligibility
    ? eligibility.split(". ").filter(Boolean).map((s) => s.replace(/\.$/, ""))
    : [];

  const processSteps = [
    {
      num: "01",
      titlePt: "Adicionalidade, Linha de Base e Vazamento",
      titleEn: "Additionality, Baseline and Leakage",
      titleEs: "Adicionalidad, Línea de Base y Fuga",
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
        es: [
          "Demuestre que el proyecto es adicional utilizando la Herramienta de Demostración de Adicionalidad",
          "Calcule las emisiones evitadas y/o remociones conforme a las ecuaciones y procedimientos de la metodología",
          "Evalúe y cuantifique el riesgo de fuga (leakage) utilizando la herramienta apropiada",
        ],
      },
    },
    {
      num: "02",
      titlePt: "Boundary e Escopo do Projeto",
      titleEn: "Project Boundary and Scope",
      titleEs: "Boundary y Alcance del Proyecto",
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
        es: [
          "Defina los límites geográficos y temporales del proyecto",
          "Identifique todas las fuentes, sumideros y reservorios relevantes",
          "Documente el alcance en el Documento de Diseño de Proyecto (DDP)",
        ],
      },
    },
    {
      num: "03",
      titlePt: "Monitoramento, Relato e Verificação (MRV)",
      titleEn: "Monitoring, Reporting and Verification (MRV)",
      titleEs: "Monitoreo, Reporte y Verificación (MRV)",
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
        es: [
          "Implemente el plan de monitoreo según lo especificado en la documentación técnica",
          "Mantenga registros durante al menos 5 años después del período de acreditación",
          "Verificación por organismos independientes (VVBs) acreditados por Green Ledger",
        ],
      },
    },
    {
      num: "04",
      titlePt: "Controle de Qualidade (QA/QC)",
      titleEn: "Quality Control (QA/QC)",
      titleEs: "Control de Calidad (QA/QC)",
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
        es: [
          "Siga los protocolos estandarizados de control de calidad",
          "Realice verificaciones cruzadas y revisiones internas antes de la presentación",
          "Garantice la trazabilidad completa de los datos y procedimientos",
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
            <ArrowLeft className="w-4 h-4" /> {tr("Voltar para Metodologias", "Back to Methodologies", "Volver a Metodologías")}
          </Link>

          <div className="text-sm text-primary-foreground/60 uppercase tracking-widest font-medium mb-2">
            {tr("Metodologia", "Methodology", "Metodología")}
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
            {m.code}
          </h1>
          <p className="text-xl md:text-2xl text-accent font-heading font-semibold mb-6">{title}</p>

          <div className="flex items-center gap-3 flex-wrap">
            {m.solutionType && (
              <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
                {getSolutionLabel(m.solutionType, lang)}
              </span>
            )}
            {m.sector && (
              <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
                {getSectorLabel(m.sector, lang)}
              </span>
            )}
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
                {tr(`Metodologia ${m.code}`, `Methodology ${m.code}`, `Metodología ${m.code}`)} — {title}
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
              {tr(`Por que escolher a ${m.code}?`, `Why choose ${m.code}?`, `¿Por qué elegir la ${m.code}?`)}
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              {tr(
                "Diferenciais que tornam esta metodologia referência para o seu tipo de projeto.",
                "Key differentiators that make this methodology a reference for its type of project.",
                "Diferenciales que hacen de esta metodología una referencia para su tipo de proyecto.",
              )}
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
                    {tr(item.titlePt, item.titleEn, item.titleEs)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tr(item.descPt, item.descEn, item.descEs)}
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
                {tr("Quem pode utilizar esta Metodologia?", "Who can use this Methodology?", "¿Quién puede utilizar esta Metodología?")}
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                {tr(
                  "Esta metodologia é aplicável a projetos que atendam aos seguintes critérios essenciais:",
                  "This methodology applies to projects meeting the following criteria:",
                  "Esta metodología es aplicable a proyectos que cumplan los siguientes criterios esenciales:",
                )}
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
                    {tr(
                      "Demonstra conformidade com as salvaguardas ambientais e sociais da Green Ledger.",
                      "Demonstrates compliance with Green Ledger's environmental and social safeguards.",
                      "Demuestra conformidad con las salvaguardas ambientales y sociales de Green Ledger.",
                    )}
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
                {tr("Objetivos de Desenvolvimento Sustentável", "Sustainable Development Goals", "Objetivos de Desarrollo Sostenible")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {m.sdgGoals.map((sdg) => (
                  <div key={sdg} className="bg-card border border-border rounded-lg p-4 text-center">
                    <span className="font-heading font-bold text-secondary text-lg block">ODS {sdg}</span>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {/* SDG_LABELS has no ES entries; Spanish falls back to EN. */}
                      {SDG_LABELS[sdg]?.[locale === "en" ? "en" : "pt"] ?? `SDG ${sdg}`}
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
                {tr("O Processo de Aplicação da Metodologia", "How to Apply this Methodology", "El Proceso de Aplicación de la Metodología")}
              </h2>
              <p className="text-muted-foreground mb-12 leading-relaxed">
                {tr(
                  "Sua jornada desde a concepção até a geração de créditos segue um fluxo lógico com ferramentas específicas.",
                  "Your journey from conception to credit generation follows a logical flow with specific tools at each step.",
                  "Su trayecto desde la concepción hasta la generación de créditos sigue un flujo lógico con herramientas específicas en cada etapa.",
                )}
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
                        {tr(step.titlePt, step.titleEn, step.titleEs)}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details[lang].map((d, j) => (
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
                {tr("Salvaguardas Ambientais e Sociais", "Environmental and Social Safeguards", "Salvaguardas Ambientales y Sociales")}
              </h2>
              <div className="bg-card border border-border rounded-xl p-8">
                <p className="text-muted-foreground leading-relaxed text-sm">{safeguards}</p>
                <p className="text-muted-foreground leading-relaxed text-sm mt-4">
                  {tr(
                    "A Green Ledger exige que todos os projetos realizem uma análise completa de salvaguardas socioambientais, garantindo que os benefícios do projeto se estendam às comunidades locais e que nenhum impacto negativo significativo seja gerado.",
                    "Green Ledger requires all projects to conduct a full socio-environmental safeguards analysis, ensuring project benefits extend to local communities with no significant negative impacts.",
                    "Green Ledger exige que todos los proyectos realicen un análisis completo de salvaguardas socioambientales, garantizando que los beneficios del proyecto se extiendan a las comunidades locales y que no se genere ningún impacto negativo significativo.",
                  )}
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
                {tr("Histórico de Revisões", "Version History", "Historial de Revisiones")}
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                {tr(
                  "Para garantir total transparência, mantemos um registro público de todas as versões desta metodologia.",
                  "Full transparency — we maintain a public record of all versions of this methodology.",
                  "Para garantizar total transparencia, mantenemos un registro público de todas las versiones de esta metodología.",
                )}
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
                        {tr("Versão", "Version", "Versión")} v{ver.versionNumber}
                        {" · "}
                        <span className="text-muted-foreground font-normal text-xs">{ver.revisionType}</span>
                      </p>
                      {ver.publishedAt && (
                        <p className="text-muted-foreground text-xs">
                          {tr("Publicada em", "Published", "Publicada en")} {new Date(ver.publishedAt).getFullYear()}
                        </p>
                      )}
                    </div>
                    {i === 0 && (
                      <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full font-medium">
                        {tr("Atual", "Current", "Actual")}
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

      {/* Public consultation comment form (C5) — only when one exists.
          Submit-only: no comment list is ever rendered. */}
      {m.consultation && (
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <AnimatedSection>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-2 text-center">
                {tr(
                  "Compartilhe suas Preocupações ou Sugestões",
                  "Share your Concerns or Suggestions",
                  "Comparta sus Inquietudes o Sugerencias",
                )}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed text-center">
                {tr(
                  "Esta metodologia está em consulta pública. Sua contribuição nos ajuda a melhorar continuamente.",
                  "This methodology is under public consultation. Your contribution helps us improve continuously.",
                  "Esta metodología está en consulta pública. Su contribución nos ayuda a mejorar continuamente.",
                )}
              </p>
              <ConsultationForm consultation={m.consultation} />
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
              {tr("Pronto para iniciar seu projeto?", "Ready to start your project?", "¿Listo para iniciar su proyecto?")}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              {tr(
                "Cadastre-se na plataforma e inicie um projeto usando esta metodologia, ou entre em contato com nossa equipe técnica.",
                "Register on the platform and start a project using this methodology, or contact our technical team.",
                "Regístrese en la plataforma e inicie un proyecto utilizando esta metodología, o póngase en contacto con nuestro equipo técnico.",
              )}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="https://plataforma.greenledger.eco.br/register" target="_blank" rel="noopener noreferrer">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                  {tr("Usar esta Metodologia", "Use this Methodology", "Usar esta Metodología")} <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Link to="/contato">
                <Button variant="outline" className="gap-2">
                  {tr("Entre em Contato", "Contact Us", "Contáctenos")}
                </Button>
              </Link>
              <Link to="/metodologias">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> {tr("Todas as Metodologias", "All Methodologies", "Todas las Metodologías")}
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
