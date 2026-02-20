import { Link } from "react-router-dom";
import { ShieldCheck, FlaskConical, Coins, ArrowRight, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import DocumentTable from "@/components/DocumentTable";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  commonDocuments,
  certificationProgram,
  methodologiesProgram,
  assetsProgram,
  allPrograms,
  type ProgramDetail,
} from "@/data/programsData";

const programIcons: Record<string, React.ElementType> = {
  certificacao: ShieldCheck,
  metodologias: FlaskConical,
  ativos: Coins,
};

const ui = {
  pt: {
    seoTitle: "Programas Green Ledger",
    seoDesc: "Conheça os programas da Green Ledger: Certificação, Metodologias e Ativos.",
    badge: "Programas",
    title: "Programas Green Ledger",
    subtitle: "O roteiro completo para desenvolvedores de projetos",
    archTitle: "Nossa Arquitetura Documental",
    archDesc: "A documentação dos Programas Green Ledger é organizada de forma hierárquica para facilitar o entendimento. Temos três Programas principais que funcionam como guarda-chuvas, cada um contendo seus próprios documentos auxiliares, como ferramentas, manuais e modelos.",
    docsTitle: "Documentação Vigente (Versão 1.0)",
    docsDesc: "Acesse abaixo os documentos essenciais e atualizados para o desenvolvimento do seu projeto. Para garantir a conformidade, utilize sempre os documentos desta seção.",
    commonTitle: "Documentos Comuns e de Consulta",
    commonDesc: "Estes documentos são transversais a todos os programas ou servem como modelos para interação com a Green Ledger.",
    auxDocs: "Documentos Auxiliares",
    coreDoc: "Documento Central",
    archiveTitle: "Arquivo de Versões Anteriores",
    archiveDesc: "Para fins de transparência, auditoria e consulta histórica, todas as versões anteriores dos nossos documentos de programas estarão disponíveis aqui.",
    archiveSoon: "Nenhuma versão anterior disponível no momento.",
    ctaTitle: "Quer registrar um projeto?",
    ctaDesc: "Entre em contato para saber qual programa se aplica à sua atividade.",
    ctaBtn: "Fale Conosco",
  },
  en: {
    seoTitle: "Green Ledger Programs",
    seoDesc: "Learn about Green Ledger programs: Certification, Methodologies and Assets.",
    badge: "Programs",
    title: "Green Ledger Programs",
    subtitle: "The complete roadmap for project developers",
    archTitle: "Our Document Architecture",
    archDesc: "The Green Ledger Programs documentation is organized hierarchically for easy understanding. We have three main Programs that work as umbrellas, each containing its own auxiliary documents, such as tools, manuals and templates.",
    docsTitle: "Current Documentation (Version 1.0)",
    docsDesc: "Access the essential and up-to-date documents for developing your project below. To ensure compliance, always use the documents in this section.",
    commonTitle: "Common and Consultation Documents",
    commonDesc: "These documents are cross-cutting to all programs or serve as templates for interaction with Green Ledger.",
    auxDocs: "Auxiliary Documents",
    coreDoc: "Core Document",
    archiveTitle: "Previous Versions Archive",
    archiveDesc: "For transparency, audit and historical consultation purposes, all previous versions of our program documents will be available here.",
    archiveSoon: "No previous versions available at this time.",
    ctaTitle: "Want to register a project?",
    ctaDesc: "Contact us to find out which program applies to your activity.",
    ctaBtn: "Contact Us",
  },
  es: {
    seoTitle: "Programas Green Ledger",
    seoDesc: "Conozca los programas de Green Ledger: Certificación, Metodologías y Activos.",
    badge: "Programas",
    title: "Programas Green Ledger",
    subtitle: "La hoja de ruta completa para desarrolladores de proyectos",
    archTitle: "Nuestra Arquitectura Documental",
    archDesc: "La documentación de los Programas Green Ledger está organizada de forma jerárquica para facilitar la comprensión. Tenemos tres Programas principales que funcionan como paraguas, cada uno con sus propios documentos auxiliares, como herramientas, manuales y modelos.",
    docsTitle: "Documentación Vigente (Versión 1.0)",
    docsDesc: "Acceda a los documentos esenciales y actualizados para el desarrollo de su proyecto a continuación. Para garantizar la conformidad, utilice siempre los documentos de esta sección.",
    commonTitle: "Documentos Comunes y de Consulta",
    commonDesc: "Estos documentos son transversales a todos los programas o sirven como modelos para la interacción con Green Ledger.",
    auxDocs: "Documentos Auxiliares",
    coreDoc: "Documento Central",
    archiveTitle: "Archivo de Versiones Anteriores",
    archiveDesc: "Para fines de transparencia, auditoría y consulta histórica, todas las versiones anteriores de nuestros documentos de programas estarán disponibles aquí.",
    archiveSoon: "Ninguna versión anterior disponible en este momento.",
    ctaTitle: "¿Desea registrar un proyecto?",
    ctaDesc: "Contáctenos para saber qué programa aplica a su actividad.",
    ctaBtn: "Contáctenos",
  },
};

const ProgramSection = ({
  program,
  lang,
  u,
}: {
  program: ProgramDetail;
  lang: "pt" | "en" | "es";
  u: (typeof ui)["pt"];
}) => {
  const Icon = programIcons[program.id] ?? ShieldCheck;

  return (
    <AnimatedSection className="mb-16">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-secondary" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-primary">
          {program.title[lang]}
        </h3>
      </div>
      <p className="text-muted-foreground leading-relaxed mb-6 max-w-4xl">
        {program.description[lang]}
      </p>

      {/* Core document */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          {u.coreDoc}
        </h4>
        <DocumentTable documents={[program.coreDocument]} lang={lang} />
      </div>

      {/* Auxiliary sections */}
      {program.sections.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-primary mb-4">
            {u.auxDocs} — {program.title[lang]}
          </h4>
          {program.sections.map((section) => (
            <div key={section.title[lang]} className="mb-6">
              <h5 className="text-sm font-semibold text-muted-foreground mb-3">
                {section.title[lang]}
              </h5>
              <DocumentTable documents={section.documents} lang={lang} />
            </div>
          ))}
        </div>
      )}
    </AnimatedSection>
  );
};

const Programs = () => {
  const { locale } = useLanguage();
  const lang = (locale as "pt" | "en" | "es") || "pt";
  const u = ui[lang] || ui.pt;

  return (
    <div className="pt-20">
      <SEOHead title={u.seoTitle} description={u.seoDesc} path="/programas" />

      {/* Hero */}
      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            {u.badge}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">
            {u.title}
          </h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">
            {u.subtitle}
          </p>
        </div>
      </section>

      {/* Architecture overview – 3 cards */}
      <section className="py-20">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
                {u.archTitle}
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {u.archDesc}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allPrograms.map((p, idx) => {
              const Icon = programIcons[p.id] ?? ShieldCheck;
              return (
                <AnimatedSection key={p.id} delay={idx * 0.1}>
                  <Card className="h-full border-border hover:border-secondary/40 transition-colors duration-300 hover:shadow-lg">
                    <CardContent className="p-8 flex flex-col items-center text-center h-full">
                      <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-secondary" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-primary mb-3">
                        {p.title[lang]}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {p.description[lang]}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Documentation tables */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
                {u.docsTitle}
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {u.docsDesc}
              </p>
            </div>
          </AnimatedSection>

          {/* Common documents */}
          <AnimatedSection className="mb-16">
            <h3 className="font-heading text-2xl font-bold text-primary mb-2">
              {u.commonTitle}
            </h3>
            <p className="text-muted-foreground mb-6">{u.commonDesc}</p>
            {commonDocuments.map((section) => (
              <div key={section.title[lang]} className="mb-8">
                <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                  {section.title[lang]}
                </h4>
                {section.description && (
                  <p className="text-muted-foreground text-sm mb-3 max-w-3xl">
                    {section.description[lang]}
                  </p>
                )}
                <DocumentTable documents={section.documents} lang={lang} />
              </div>
            ))}
          </AnimatedSection>

          {/* Per-program sections */}
          <ProgramSection program={certificationProgram} lang={lang} u={u} />
          <ProgramSection program={methodologiesProgram} lang={lang} u={u} />
          <ProgramSection program={assetsProgram} lang={lang} u={u} />
        </div>
      </section>

      {/* Previous versions archive */}
      <AnimatedSection>
        <section className="py-16">
          <div className="container text-center">
            <Archive className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold text-primary mb-3">
              {u.archiveTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-2">
              {u.archiveDesc}
            </p>
            <p className="text-sm text-muted-foreground/70 italic">{u.archiveSoon}</p>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h2 className="font-heading text-2xl font-bold text-primary mb-4">
            {u.ctaTitle}
          </h2>
          <p className="text-muted-foreground mb-6">{u.ctaDesc}</p>
          <Link to="/contato">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
              {u.ctaBtn} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Programs;
