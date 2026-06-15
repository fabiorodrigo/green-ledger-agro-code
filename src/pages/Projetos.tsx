import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileCheck, ClipboardList, Users, BarChart3, MapPin, ShieldCheck, Building2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/i18n/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { usePublicProjects } from "@/hooks/usePublicAPI";
import { getStatusLabel, getStatusColor } from "@/constants/projectStatus";
import { getSectorLabel } from "@/constants/methodologyLabels";

const ui = {
  pt: {
    seoTitle: "Projetos", seoDesc: "Conheça os projetos certificados e em processo de certificação na Green Ledger.",
    badge: "Projetos", title: "Projetos", subtitle: "Conheça os projetos certificados e em processo de certificação na Green Ledger.",
    cycleTitle: "Ciclo de Certificação", cta: "Área do Produtor",
    registeredTitle: "Projetos Registrados", viewProject: "Ver Projeto",
    searchPlaceholder: "Buscar projetos...", noProjects: "Nenhum projeto encontrado.",
    loading: "Carregando projetos...", error: "Não foi possível carregar os projetos no momento.",
    registerProject: "Cadastrar Projeto",
    steps: [
      { icon: ClipboardList, title: "Registro", desc: "O desenvolvedor submete a documentação do projeto (DCP) na plataforma Green Ledger." },
      { icon: FileCheck, title: "Validação", desc: "Um VVB aprovado realiza a análise de elegibilidade e verificação documental." },
      { icon: BarChart3, title: "Monitoramento", desc: "Acompanhamento contínuo com MRV (Mensuração, Relato e Verificação)." },
      { icon: Users, title: "Verificação", desc: "Auditoria independente dos resultados por organismo credenciado." },
    ],
  },
  en: {
    seoTitle: "Projects", seoDesc: "Discover certified and in-progress projects at Green Ledger.",
    badge: "Projects", title: "Projects", subtitle: "Discover certified and in-progress projects at Green Ledger.",
    cycleTitle: "Certification Cycle", cta: "Producer Area",
    registeredTitle: "Registered Projects", viewProject: "View Project",
    searchPlaceholder: "Search projects...", noProjects: "No projects found.",
    loading: "Loading projects...", error: "Unable to load projects at this time.",
    registerProject: "Register Project",
    steps: [
      { icon: ClipboardList, title: "Registration", desc: "The developer submits the project documentation (PDD) on the Green Ledger platform." },
      { icon: FileCheck, title: "Validation", desc: "An approved VVB performs eligibility analysis and document verification." },
      { icon: BarChart3, title: "Monitoring", desc: "Continuous tracking with MRV (Measurement, Reporting and Verification)." },
      { icon: Users, title: "Verification", desc: "Independent audit of results by an accredited body." },
    ],
  },
  es: {
    seoTitle: "Proyectos", seoDesc: "Conozca los proyectos certificados y en proceso de certificación en Green Ledger.",
    badge: "Proyectos", title: "Proyectos", subtitle: "Conozca los proyectos certificados y en proceso de certificación en Green Ledger.",
    cycleTitle: "Ciclo de Certificación", cta: "Área del Productor",
    registeredTitle: "Proyectos Registrados", viewProject: "Ver Proyecto",
    searchPlaceholder: "Buscar proyectos...", noProjects: "No se encontraron proyectos.",
    loading: "Cargando proyectos...", error: "No se pudieron cargar los proyectos en este momento.",
    registerProject: "Registrar Proyecto",
    steps: [
      { icon: ClipboardList, title: "Registro", desc: "El desarrollador envía la documentación del proyecto (DDP) en la plataforma Green Ledger." },
      { icon: FileCheck, title: "Validación", desc: "Un VVB aprobado realiza el análisis de elegibilidad y verificación documental." },
      { icon: BarChart3, title: "Monitoreo", desc: "Seguimiento continuo con MRV (Medición, Reporte y Verificación)." },
      { icon: Users, title: "Verificación", desc: "Auditoría independiente de los resultados por organismo acreditado." },
    ],
  },
};

const Projetos = () => {
  const { locale } = useLanguage();
  const lang = locale as "pt" | "en" | "es";
  const d = ui[lang] || ui.pt;

  const [search, setSearch] = useState("");
  const { data: response, loading, error } = usePublicProjects({
    limit: 50,
    search: search || undefined,
  });

  const projects = response?.data ?? [];

  return (
    <div className="pt-20">
      <SEOHead title={d.seoTitle} description={d.seoDesc} path="/projetos" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">{d.badge}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{d.title}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{d.subtitle}</p>
        </div>
      </section>

      {/* Projects List */}
      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <h2 className="font-heading text-3xl font-bold text-primary">{d.registeredTitle}</h2>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={d.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {loading && (
            <div className="text-center py-16 text-muted-foreground">{d.loading}</div>
          )}
          {error && (
            <div className="text-center py-16 text-muted-foreground text-sm">{d.error}</div>
          )}

          {!loading && !error && (
            <div className="space-y-6">
              {projects.length === 0 ? (
                <p className="text-center py-16 text-muted-foreground">{d.noProjects}</p>
              ) : (
                projects.map((p, i) => (
                  <AnimatedSection key={p.id} delay={i * 0.08}>
                    <Link to={`/projetos/${p.code}`} className="block">
                      <div className="bg-card border border-border rounded-xl p-6 md:p-8 hover:shadow-card transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                              <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium ${getStatusColor(p.status)}`}>
                                <ShieldCheck className="w-3 h-3" />
                                {getStatusLabel(p.status, lang)}
                              </span>
                              {p.sector && (
                                <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                                  {getSectorLabel(p.sector, lang)}
                                </span>
                              )}
                              <span className="font-mono text-xs text-secondary/70">{p.code}</span>
                            </div>
                            <h3 className="font-heading font-semibold text-xl text-primary mb-2">{p.name}</h3>
                            <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {p.locationDescription}</span>
                              <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> {p.organization?.name}</span>
                            </div>
                            {p.methodology && (
                              <p className="text-sm text-muted-foreground mt-2">
                                {p.methodology.code} — {lang === "en" ? (p.methodology.nameEn ?? p.methodology.name) : p.methodology.name}
                              </p>
                            )}
                          </div>
                          <Button variant="outline" size="sm" className="gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground shrink-0">
                            {d.viewProject} <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))
              )}
            </div>
          )}

          {response?.meta && (
            <p className="text-xs text-muted-foreground text-center mt-6">
              {lang === "en"
                ? `Showing ${projects.length} of ${response.meta.total} projects`
                : `Exibindo ${projects.length} de ${response.meta.total} projetos`}
            </p>
          )}
        </div>
      </section>

      {/* Certification Cycle */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-bold text-primary mb-10 text-center">{d.cycleTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {d.steps.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-card rounded-xl p-6 border border-border shadow-card">
                  <s.icon className="w-8 h-8 text-secondary mb-3" />
                  <h3 className="font-heading font-semibold text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-12">
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://plataforma.greenledger.eco.br/login" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">{d.cta} <ArrowRight className="w-4 h-4" /></Button>
              </a>
              <a href="https://plataforma.greenledger.eco.br/register" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  {d.registerProject} <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projetos;
