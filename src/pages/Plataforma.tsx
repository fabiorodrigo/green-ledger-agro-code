import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Shield, Search, Globe, Layers, RefreshCcw, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

const icons = [Layers, Search, BarChart3, Shield, Lock, Globe, RefreshCcw, Zap];

const i18n = {
  pt: {
    seoTitle: "Plataforma Green Ledger",
    seoDesc: "Conheça a plataforma digital da Green Ledger.",
    featTitle: "Funcionalidades",
    featDesc: "Infraestrutura digital completa para o ciclo de vida dos créditos de carbono.",
    features: [
      { title: "Registro Digital de Projetos", desc: "Submissão e acompanhamento de projetos de forma 100% digital, com workflow automatizado para cada etapa do ciclo de certificação." },
      { title: "Registro Público Transparente", desc: "Base de dados aberta com todos os projetos registrados, status em tempo real e documentos de validação e verificação disponíveis." },
      { title: "Dashboard de Monitoramento", desc: "Painel personalizado para desenvolvedores com indicadores de desempenho, alertas de prazos e visualização de dados de MRV." },
      { title: "Rastreabilidade de Créditos", desc: "Cada crédito emitido recebe número de série único com rastreabilidade completa desde a emissão até aposentadoria ou cancelamento." },
      { title: "Segurança e Compliance", desc: "Infraestrutura segura com criptografia de dados, controle de acesso granular e conformidade com LGPD e padrões internacionais." },
      { title: "Integração com Marketplaces", desc: "Conexão direta com os principais marketplaces de créditos de carbono para facilitar comercialização e transferência." },
      { title: "API para Desenvolvedores", desc: "API RESTful documentada para integração com sistemas de terceiros, ERPs e plataformas de sustentabilidade corporativa." },
      { title: "Automação de Workflow", desc: "Notificações automáticas, lembretes de prazos, fluxos de aprovação e geração automatizada de relatórios padronizados." },
    ],
    roadTitle: "Roadmap",
    roadDesc: "Evolução planejada da plataforma para 2026.",
    roadmap: [
      { quarter: "Q1 2026", items: ["Lançamento do Registro Público v1.0", "Dashboard de Monitoramento para desenvolvedores", "Portal de submissão digital de DCPs"] },
      { quarter: "Q2 2026", items: ["Integração com marketplace CBL Markets", "API pública v1.0 para consultas", "Sistema de notificações automáticas"] },
      { quarter: "Q3 2026", items: ["App mobile para monitoramento de campo", "Integração com sensoriamento remoto", "Módulo de relatórios automáticos"] },
      { quarter: "Q4 2026", items: ["Marketplace próprio para créditos Green Ledger", "Rastreabilidade blockchain (piloto)", "Painel de impacto para compradores"] },
    ],
    ctaTitle: "Quer acesso antecipado?",
    ctaDesc: "Entre em contato para participar do programa de acesso antecipado à plataforma Green Ledger.",
    ctaBtn: "Solicitar Acesso",
    placeholder: "* Conteúdo placeholder — funcionalidades e roadmap serão atualizados.",
  },
  en: {
    seoTitle: "Green Ledger Platform",
    seoDesc: "Discover Green Ledger's digital platform.",
    featTitle: "Features",
    featDesc: "Complete digital infrastructure for the carbon credit lifecycle.",
    features: [
      { title: "Digital Project Registration", desc: "100% digital project submission and tracking with automated workflow for each certification cycle stage." },
      { title: "Transparent Public Registry", desc: "Open database with all registered projects, real-time status and available validation and verification documents." },
      { title: "Monitoring Dashboard", desc: "Personalized dashboard for developers with performance indicators, deadline alerts and MRV data visualization." },
      { title: "Credit Traceability", desc: "Each issued credit receives a unique serial number with complete traceability from issuance to retirement or cancellation." },
      { title: "Security and Compliance", desc: "Secure infrastructure with data encryption, granular access control and compliance with LGPD and international standards." },
      { title: "Marketplace Integration", desc: "Direct connection with major carbon credit marketplaces to facilitate trading and transfer." },
      { title: "Developer API", desc: "Documented RESTful API for integration with third-party systems, ERPs and corporate sustainability platforms." },
      { title: "Workflow Automation", desc: "Automatic notifications, deadline reminders, approval flows and automated standardized report generation." },
    ],
    roadTitle: "Roadmap",
    roadDesc: "Planned platform evolution for 2026.",
    roadmap: [
      { quarter: "Q1 2026", items: ["Public Registry v1.0 launch", "Monitoring Dashboard for developers", "Digital PDD submission portal"] },
      { quarter: "Q2 2026", items: ["CBL Markets marketplace integration", "Public API v1.0 for queries", "Automatic notification system"] },
      { quarter: "Q3 2026", items: ["Mobile app for field monitoring", "Remote sensing integration", "Automated report module"] },
      { quarter: "Q4 2026", items: ["Own marketplace for Green Ledger credits", "Blockchain traceability (pilot)", "Buyer impact dashboard"] },
    ],
    ctaTitle: "Want early access?",
    ctaDesc: "Contact us to join the early access program for Green Ledger's platform.",
    ctaBtn: "Request Access",
    placeholder: "* Placeholder content — features and roadmap will be updated.",
  },
  es: {
    seoTitle: "Plataforma Green Ledger",
    seoDesc: "Conozca la plataforma digital de Green Ledger.",
    featTitle: "Funcionalidades",
    featDesc: "Infraestructura digital completa para el ciclo de vida de los créditos de carbono.",
    features: [
      { title: "Registro Digital de Proyectos", desc: "Envío y seguimiento de proyectos 100% digital, con flujo de trabajo automatizado para cada etapa del ciclo de certificación." },
      { title: "Registro Público Transparente", desc: "Base de datos abierta con todos los proyectos registrados, estado en tiempo real y documentos de validación y verificación disponibles." },
      { title: "Dashboard de Monitoreo", desc: "Panel personalizado para desarrolladores con indicadores de desempeño, alertas de plazos y visualización de datos de MRV." },
      { title: "Trazabilidad de Créditos", desc: "Cada crédito emitido recibe un número de serie único con trazabilidad completa desde la emisión hasta el retiro o cancelación." },
      { title: "Seguridad y Compliance", desc: "Infraestructura segura con cifrado de datos, control de acceso granular y conformidad con LGPD y estándares internacionales." },
      { title: "Integración con Marketplaces", desc: "Conexión directa con los principales marketplaces de créditos de carbono para facilitar la comercialización y transferencia." },
      { title: "API para Desarrolladores", desc: "API RESTful documentada para integración con sistemas de terceros, ERPs y plataformas de sostenibilidad corporativa." },
      { title: "Automatización de Flujos", desc: "Notificaciones automáticas, recordatorios de plazos, flujos de aprobación y generación automatizada de informes estandarizados." },
    ],
    roadTitle: "Roadmap",
    roadDesc: "Evolución planificada de la plataforma para 2026.",
    roadmap: [
      { quarter: "Q1 2026", items: ["Lanzamiento del Registro Público v1.0", "Dashboard de Monitoreo para desarrolladores", "Portal de envío digital de DCPs"] },
      { quarter: "Q2 2026", items: ["Integración con marketplace CBL Markets", "API pública v1.0 para consultas", "Sistema de notificaciones automáticas"] },
      { quarter: "Q3 2026", items: ["App móvil para monitoreo de campo", "Integración con teledetección", "Módulo de informes automáticos"] },
      { quarter: "Q4 2026", items: ["Marketplace propio para créditos Green Ledger", "Trazabilidad blockchain (piloto)", "Panel de impacto para compradores"] },
    ],
    ctaTitle: "¿Desea acceso anticipado?",
    ctaDesc: "Contáctenos para participar del programa de acceso anticipado a la plataforma Green Ledger.",
    ctaBtn: "Solicitar Acceso",
    placeholder: "* Contenido placeholder — funcionalidades y roadmap serán actualizados.",
  },
};

const Plataforma = () => {
  const { t, locale } = useLanguage();
  const d = i18n[locale as keyof typeof i18n] || i18n.pt;

  return (
    <div className="pt-20">
      <SEOHead title={d.seoTitle} description={d.seoDesc} path="/plataforma" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">{t("page.plataforma.title")}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.plataforma.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.plataforma.subtitle")}</p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-primary mb-4 text-center">{d.featTitle}</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">{d.featDesc}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {d.features.map((f, i) => {
              const Icon = icons[i];
              return (
                <AnimatedSection key={f.title} delay={i * 0.05}>
                  <div className="bg-card rounded-xl p-6 border border-border hover:shadow-card transition-shadow h-full">
                    <Icon className="w-8 h-8 text-secondary mb-4" />
                    <h3 className="font-heading font-semibold text-primary mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/20">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-primary mb-4 text-center">{d.roadTitle}</h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">{d.roadDesc}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {d.roadmap.map((r, i) => (
              <AnimatedSection key={r.quarter} delay={i * 0.08}>
                <div className="border border-border rounded-xl p-6 bg-card">
                  <span className="font-heading font-bold text-secondary text-sm">{r.quarter}</span>
                  <ul className="mt-3 space-y-2">
                    {r.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary mb-4">{d.ctaTitle}</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">{d.ctaDesc}</p>
            <Link to="/contato">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">{d.ctaBtn} <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
      <p className="text-xs text-muted-foreground italic text-center py-8">{d.placeholder}</p>
    </div>
  );
};

export default Plataforma;
