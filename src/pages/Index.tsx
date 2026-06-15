import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Leaf, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePublicStatistics } from "@/hooks/usePublicAPI";
import heroBg from "@/assets/hero-bg.jpg";

const programs = [
  { titleKey: "Green Ledger AFOLU", descPt: "Projetos de reflorestamento, restauração de vegetação nativa, sistemas agroflorestais e redução de desmatamento (REDD+), com foco em adicionalidade e permanência do carbono sequestrado.", descEn: "Reforestation, native vegetation restoration, agroforestry systems and deforestation reduction (REDD+) projects, focused on additionality and permanence of sequestered carbon.", descEs: "Proyectos de reforestación, restauración de vegetación nativa, sistemas agroforestales y reducción de la deforestación (REDD+), con foco en la adicionalidad y la permanencia del carbono secuestrado.", icon: Leaf },
  { titleKey: "Green Ledger Soil Carbon", descPt: "Sequestro de carbono orgânico no solo por meio de práticas regenerativas, plantio direto, integração lavoura-pecuária-floresta e manejo conservacionista, com protocolos de MRV específicos.", descEn: "Soil organic carbon sequestration through regenerative practices, no-till farming, crop-livestock-forestry integration and conservation management, with specific MRV protocols.", descEs: "Secuestro de carbono orgánico en el suelo mediante prácticas regenerativas, siembra directa, integración agricultura-ganadería-bosque y manejo conservacionista, con protocolos de MRV específicos.", icon: Globe },
  { titleKey: "Green Ledger Energy & Tech", descPt: "Redução de emissões por meio de eficiência energética, biodigestores, energias renováveis e tecnologias limpas, com mensuração contínua e verificação independente.", descEn: "Emissions reduction through energy efficiency, biodigesters, renewable energy and clean technologies, with continuous measurement and independent verification.", descEs: "Reducción de emisiones mediante eficiencia energética, biodigestores, energías renovables y tecnologías limpias, con medición continua y verificación independiente.", icon: Zap },
];

const steps = [
  { num: "01", titlePt: "Registro", titleEn: "Registration", titleEs: "Registro", descPt: "Submissão do Documento de Concepção do Projeto e documentação técnica.", descEn: "Submission of Project Design Document and technical documentation.", descEs: "Presentación del Documento de Diseño del Proyecto y la documentación técnica." },
  { num: "02", titlePt: "Avaliação", titleEn: "Assessment", titleEs: "Evaluación", descPt: "Análise de elegibilidade e adicionalidade pela equipe técnica.", descEn: "Eligibility and additionality analysis by technical team.", descEs: "Análisis de elegibilidad y adicionalidad por el equipo técnico." },
  { num: "03", titlePt: "Validação", titleEn: "Validation", titleEs: "Validación", descPt: "Revisão independente por organismo de validação credenciado.", descEn: "Independent review by accredited validation body.", descEs: "Revisión independiente por un organismo de validación acreditado." },
  { num: "04", titlePt: "Monitoramento", titleEn: "Monitoring", titleEs: "Monitoreo", descPt: "Implementação do plano de MRV conforme protocolo da metodologia.", descEn: "Implementation of MRV plan per methodology protocol.", descEs: "Implementación del plan de MRV según el protocolo de la metodología." },
  { num: "05", titlePt: "Verificação", titleEn: "Verification", titleEs: "Verificación", descPt: "Auditoria independente dos dados de monitoramento e resultados.", descEn: "Independent audit of monitoring data and results.", descEs: "Auditoría independiente de los datos de monitoreo y los resultados." },
  { num: "06", titlePt: "Emissão", titleEn: "Issuance", titleEs: "Emisión", descPt: "Créditos certificados com número de série único e rastreabilidade.", descEn: "Certified credits with unique serial numbers and traceability.", descEs: "Créditos certificados con número de serie único y trazabilidad." },
];

const faqsPt = [
  { q: "O que são créditos de carbono certificados?", a: "São unidades verificadas que representam uma tonelada métrica de CO₂ equivalente removida ou evitada, emitidas após validação e verificação independentes conforme metodologias aprovadas por uma certificadora." },
  { q: "Quem pode registrar um projeto na Green Ledger?", a: "Desenvolvedores de projetos, empresas, cooperativas e organizações que implementem atividades de redução ou remoção de emissões de GEE em qualquer setor elegível, desde que atendam aos critérios de adicionalidade e elegibilidade das metodologias aplicáveis." },
  { q: "Quanto tempo leva o processo de certificação?", a: "O prazo varia conforme a complexidade do projeto e a disponibilidade de dados de baseline. Tipicamente, o ciclo completo — do registro à emissão dos primeiros créditos — leva entre 6 e 12 meses." },
  { q: "Como a Green Ledger garante a integridade dos créditos?", a: "Por meio de governança técnica independente, processos de validação e verificação por organismos credenciados, mecanismos de buffer contra reversões, consulta pública de metodologias e alinhamento com os Core Carbon Principles do ICVCM." },
  { q: "As metodologias da Green Ledger são públicas?", a: "Sim. Todas as metodologias aprovadas são publicadas em acesso aberto e passam por revisão por pares e consulta pública de 60 dias antes da aprovação pelo comitê técnico competente." },
];

const faqsEn = [
  { q: "What are certified carbon credits?", a: "Verified units representing one metric ton of CO₂ equivalent removed or avoided, issued after independent validation and verification according to methodologies approved by a certifier." },
  { q: "Who can register a project at Green Ledger?", a: "Project developers, companies, cooperatives and organizations implementing GHG emission reduction or removal activities in any eligible sector, provided they meet the additionality and eligibility criteria of applicable methodologies." },
  { q: "How long does the certification process take?", a: "The timeline varies depending on project complexity and baseline data availability. Typically, the full cycle — from registration to first credit issuance — takes 6 to 12 months." },
  { q: "How does Green Ledger ensure credit integrity?", a: "Through independent technical governance, validation and verification by accredited bodies, buffer mechanisms against reversals, public methodology consultations and alignment with ICVCM Core Carbon Principles." },
  { q: "Are Green Ledger's methodologies public?", a: "Yes. All approved methodologies are published openly and undergo peer review and a 60-day public consultation before approval by the competent technical committee." },
];

const faqsEs = [
  { q: "¿Qué son los créditos de carbono certificados?", a: "Son unidades verificadas que representan una tonelada métrica de CO₂ equivalente removida o evitada, emitidas tras una validación y verificación independientes conforme a metodologías aprobadas por una certificadora." },
  { q: "¿Quién puede registrar un proyecto en Green Ledger?", a: "Desarrolladores de proyectos, empresas, cooperativas y organizaciones que implementen actividades de reducción o remoción de emisiones de GEI en cualquier sector elegible, siempre que cumplan los criterios de adicionalidad y elegibilidad de las metodologías aplicables." },
  { q: "¿Cuánto tarda el proceso de certificación?", a: "El plazo varía según la complejidad del proyecto y la disponibilidad de datos de línea base. Normalmente, el ciclo completo — del registro a la emisión de los primeros créditos — toma entre 6 y 12 meses." },
  { q: "¿Cómo garantiza Green Ledger la integridad de los créditos?", a: "Mediante una gobernanza técnica independiente, procesos de validación y verificación por organismos acreditados, mecanismos de buffer contra reversiones, consulta pública de metodologías y alineación con los Core Carbon Principles del ICVCM." },
  { q: "¿Las metodologías de Green Ledger son públicas?", a: "Sí. Todas las metodologías aprobadas se publican en acceso abierto y pasan por revisión por pares y una consulta pública de 60 días antes de su aprobación por el comité técnico competente." },
];

const Index = () => {
  const { t, tr, locale } = useLanguage();
  const faqs = ({ pt: faqsPt, en: faqsEn, es: faqsEs } as const)[locale] ?? faqsPt;
  const { data: stats } = usePublicStatistics();

  return (
    <>
      <SEOHead
        title={tr("Certificação de Carbono com Integridade Ambiental", "Carbon Certification with Environmental Integrity", "Certificación de Carbono con Integridad Ambiental")}
        description={t("index.hero.desc")}
        path="/"
      />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Paisagem sustentável" className="w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero opacity-85" />
        </div>
        <div className="container relative z-10 py-32">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest bg-secondary/20 text-accent rounded-full mb-8 animate-fade-in">
              {t("index.hero.tag")}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight animate-fade-in-up">
              {t("index.hero.title")}
            </h1>
            <p className="mt-8 text-lg text-primary-foreground/80 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              {t("index.hero.desc")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/certificacao">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 text-base px-8">
                  {t("index.hero.cta1")} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/metodologias">
                <Button size="lg" variant="hero-outline" className="text-base px-8">
                  {t("index.hero.cta2")}
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Statistics */}
      {stats && (
        <section className="py-12 border-b border-border bg-muted/20">
          <div className="container">
            <div className={`grid grid-cols-2 gap-8 text-center ${stats.totalOrganizations != null ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
              <AnimatedSection>
                <p className="font-heading text-3xl md:text-4xl font-bold text-secondary">
                  <AnimatedCounter end={stats.totalProjects} />
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {tr("Projetos", "Projects", "Proyectos")}
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <p className="font-heading text-3xl md:text-4xl font-bold text-secondary">
                  <AnimatedCounter end={stats.totalMethodologies} />
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {tr("Metodologias", "Methodologies", "Metodologías")}
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="font-heading text-3xl md:text-4xl font-bold text-secondary">
                  <AnimatedCounter end={stats.totalCreditsIssued} />
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {tr("Créditos Emitidos (tCO₂e)", "Credits Issued (tCO₂e)", "Créditos Emitidos (tCO₂e)")}
                </p>
              </AnimatedSection>
              {/* Organizations stat hidden when backlog (totalOrganizations undefined) to avoid a misleading "0" */}
              {stats.totalOrganizations != null && (
                <AnimatedSection delay={0.3}>
                  <p className="font-heading text-3xl md:text-4xl font-bold text-secondary">
                    <AnimatedCounter end={stats.totalOrganizations} />
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {tr("Organizações", "Organizations", "Organizaciones")}
                  </p>
                </AnimatedSection>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Principles */}
      <section className="py-24 md:py-32">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              tag={t("index.principles.tag")}
              title={t("index.principles.title")}
              description={t("index.principles.desc")}
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {([
              { title: t("index.principles.additionality"), desc: t("index.principles.additionality.desc") },
              { title: t("index.principles.permanence"), desc: t("index.principles.permanence.desc") },
              { title: t("index.principles.conservatism"), desc: t("index.principles.conservatism.desc") },
              { title: t("index.principles.transparency"), desc: t("index.principles.transparency.desc") },
            ]).map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="p-8 rounded-xl border border-border hover:shadow-card transition-shadow">
                  <h3 className="font-heading font-semibold text-lg text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 md:py-32 bg-muted/20">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              tag={t("index.programs.tag")}
              title={t("index.programs.title")}
              description={t("index.programs.desc")}
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {programs.map((p, i) => (
              <AnimatedSection key={p.titleKey} delay={i * 0.1}>
                <div className="bg-card rounded-xl p-8 border border-border hover:shadow-card transition-all h-full">
                  <p.icon className="w-10 h-10 text-secondary mb-6" />
                  <h3 className="font-heading font-semibold text-lg text-primary mb-4">{p.titleKey}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">{tr(p.descPt, p.descEn, p.descEs)}</p>
                  <Link to="/programas" className="text-secondary text-sm font-medium hover:underline inline-flex items-center gap-1">
                    {tr("Ver detalhes", "View details", "Ver detalles")} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Process */}
      <section className="py-24 md:py-32">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              tag={t("index.cert.tag")}
              title={t("index.cert.title")}
              description={t("index.cert.desc")}
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
            {steps.map((s, i) => (
              <AnimatedSection key={s.num} delay={i * 0.08}>
                <div className="relative text-center p-6">
                  <span className="font-heading text-4xl font-bold text-secondary/15">{s.num}</span>
                  <h4 className="font-heading font-semibold text-primary mt-2 mb-3">{tr(s.titlePt, s.titleEn, s.titleEs)}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tr(s.descPt, s.descEn, s.descEs)}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 text-muted" />
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <div className="text-center mt-16">
              <Link to="/certificacao">
                <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  {t("index.cert.cta")} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Governance */}
      <section className="py-24 md:py-32 gradient-hero text-primary-foreground">
        <div className="container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
                {t("index.gov.tag")}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
                {t("index.gov.title")}
              </h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-6">
                {t("index.gov.desc")}
              </p>
              <p className="text-primary-foreground/70 leading-relaxed mb-10 text-sm">
                {t("index.gov.desc2")}
              </p>
              <Link to="/governanca">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                  {t("index.gov.cta")} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="container max-w-3xl">
          <AnimatedSection>
            <SectionHeading
              tag={t("index.faq.tag")}
              title={t("index.faq.title")}
            />
          </AnimatedSection>
          <div className="space-y-4 mt-8">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <details className="group border border-border rounded-lg">
                  <summary className="cursor-pointer p-6 font-heading font-medium text-primary flex items-center justify-between">
                    {faq.q}
                    <span className="text-secondary transition-transform group-open:rotate-45 text-xl ml-4 shrink-0">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-muted/20">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
              {t("index.cta.title")}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              {t("index.cta.desc")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contato">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 text-base px-8">
                  {t("index.cta.btn1")} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/documentacao">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base px-8">
                  {t("index.cta.btn2")}
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Index;
