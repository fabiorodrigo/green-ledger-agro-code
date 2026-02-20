import { Link } from "react-router-dom";
import { ArrowRight, FileCheck, ClipboardList, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

const ui = {
  pt: {
    seoTitle: "Projetos", seoDesc: "Conheça o ciclo de certificação e registre seu projeto na Green Ledger.",
    badge: "Projetos", title: "Projetos", subtitle: "Conheça o ciclo de certificação e saiba como registrar seu projeto na Green Ledger.",
    cycleTitle: "Ciclo de Certificação", cta: "Área do Produtor",
    steps: [
      { icon: ClipboardList, title: "Registro", desc: "O desenvolvedor submete a documentação do projeto (PDD) na plataforma Green Ledger." },
      { icon: FileCheck, title: "Validação", desc: "Um VVB aprovado realiza a análise de elegibilidade e verificação documental." },
      { icon: BarChart3, title: "Monitoramento", desc: "Acompanhamento contínuo com MRV (Mensuração, Relato e Verificação)." },
      { icon: Users, title: "Verificação", desc: "Auditoria independente dos resultados por organismo credenciado." },
    ],
  },
  en: {
    seoTitle: "Projects", seoDesc: "Learn about the certification cycle and register your project at Green Ledger.",
    badge: "Projects", title: "Projects", subtitle: "Learn about the certification cycle and how to register your project at Green Ledger.",
    cycleTitle: "Certification Cycle", cta: "Producer Area",
    steps: [
      { icon: ClipboardList, title: "Registration", desc: "The developer submits the project documentation (PDD) on the Green Ledger platform." },
      { icon: FileCheck, title: "Validation", desc: "An approved VVB performs eligibility analysis and document verification." },
      { icon: BarChart3, title: "Monitoring", desc: "Continuous tracking with MRV (Measurement, Reporting and Verification)." },
      { icon: Users, title: "Verification", desc: "Independent audit of results by an accredited body." },
    ],
  },
  es: {
    seoTitle: "Proyectos", seoDesc: "Conozca el ciclo de certificación y registre su proyecto en Green Ledger.",
    badge: "Proyectos", title: "Proyectos", subtitle: "Conozca el ciclo de certificación y cómo registrar su proyecto en Green Ledger.",
    cycleTitle: "Ciclo de Certificación", cta: "Área del Productor",
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
  const d = ui[locale as keyof typeof ui] || ui.pt;

  return (
    <div className="pt-20">
      <SEOHead title={d.seoTitle} description={d.seoDesc} path="/projetos" />

      <section className="gradient-hero text-primary-foreground py-20 md:py-28">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-4">{d.badge}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{d.title}</h1>
          <p className="mt-6 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{d.subtitle}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-bold text-primary mb-10 text-center">{d.cycleTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {d.steps.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="gradient-card rounded-xl p-6 border border-border shadow-card">
                  <s.icon className="w-8 h-8 text-secondary mb-3" />
                  <h3 className="font-heading font-semibold text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="https://app.greenledger.com" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">{d.cta} <ArrowRight className="w-4 h-4" /></Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projetos;
