import { Link } from "react-router-dom";
import { ShieldCheck, FlaskConical, Coins, ArrowRight, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

const programs = [
  {
    id: "certificacao",
    icon: ShieldCheck,
    title: {
      pt: "Programa de Certificacao",
      en: "Certification Program",
      es: "Programa de Certificacion",
    },
    description: {
      pt: "Define as regras, os processos e o ciclo de vida para a certificacao de projetos que geram ativos ambientais (creditos de carbono). E o guia mestre de como fazer.",
      en: "Defines the rules, processes and lifecycle for certifying projects that generate environmental assets (carbon credits). It is the master guide on how to do it.",
      es: "Define las reglas, los procesos y el ciclo de vida para la certificacion de proyectos que generan activos ambientales (creditos de carbono). Es la guia maestra de como hacer.",
    },
    docs: {
      pt: ["Programa de Certificacao (documento central)", "Manuais e diretrizes tecnicas", "Ferramentas de analise e estruturacao", "Modelos e declaracoes"],
      en: ["Certification Program (core document)", "Technical manuals and guidelines", "Analysis and structuring tools", "Templates and declarations"],
      es: ["Programa de Certificacion (documento central)", "Manuales y directrices tecnicas", "Herramientas de analisis y estructuracion", "Modelos y declaraciones"],
    },
    link: "/certificacao",
  },
  {
    id: "metodologias",
    icon: FlaskConical,
    title: {
      pt: "Programa de Metodologias",
      en: "Methodologies Program",
      es: "Programa de Metodologias",
    },
    description: {
      pt: "Estabelece o processo para o desenvolvimento, submissao, revisao e aprovacao de novas metodologias de quantificacao, garantindo a robustez tecnica e cientifica.",
      en: "Establishes the process for developing, submitting, reviewing and approving new quantification methodologies, ensuring technical and scientific robustness.",
      es: "Establece el proceso para el desarrollo, presentacion, revision y aprobacion de nuevas metodologias de cuantificacion, garantizando la solidez tecnica y cientifica.",
    },
    docs: {
      pt: ["Programa de Metodologias (documento central)", "Ferramentas de estruturacao de metodologia", "Criterios de aceitacao e avaliacao", "Procedimentos de consulta publica"],
      en: ["Methodologies Program (core document)", "Methodology structuring tools", "Acceptance and evaluation criteria", "Public consultation procedures"],
      es: ["Programa de Metodologias (documento central)", "Herramientas de estructuracion de metodologia", "Criterios de aceptacion y evaluacion", "Procedimientos de consulta publica"],
    },
    link: "/metodologias",
  },
  {
    id: "ativos",
    icon: Coins,
    title: {
      pt: "Programa de Ativos",
      en: "Assets Program",
      es: "Programa de Activos",
    },
    description: {
      pt: "Descreve os principios para a criacao, gestao e registro dos ativos ambientais digitais na plataforma Green Ledger, assegurando sua integridade e rastreabilidade.",
      en: "Describes the principles for creating, managing and registering digital environmental assets on the Green Ledger platform, ensuring their integrity and traceability.",
      es: "Describe los principios para la creacion, gestion y registro de los activos ambientales digitales en la plataforma Green Ledger, asegurando su integridad y trazabilidad.",
    },
    docs: {
      pt: ["Programa de Ativos (documento central)", "Politica de integridade de ativos", "Procedimentos do registro", "Processo de tokenizacao"],
      en: ["Assets Program (core document)", "Asset integrity policy", "Registry procedures", "Tokenization process"],
      es: ["Programa de Activos (documento central)", "Politica de integridad de activos", "Procedimientos del registro", "Proceso de tokenizacion"],
    },
    link: "/registro-publico",
  },
];

const ui = {
  pt: {
    seoTitle: "Programas Green Ledger",
    seoDesc: "Conheca os programas da Green Ledger: Certificacao, Metodologias e Ativos.",
    badge: "Programas",
    title: "Programas Green Ledger",
    subtitle: "O roteiro completo para desenvolvedores de projetos",
    archTitle: "Nossa Arquitetura Documental",
    archDesc: "A documentacao dos Programas Green Ledger e organizada de forma hierarquica para facilitar o entendimento. Temos tres Programas principais que funcionam como guarda-chuvas, cada um contendo seus proprios documentos auxiliares, como ferramentas, manuais e modelos.",
    docsIncluded: "Documentos incluidos",
    learnMore: "Saiba mais",
    ctaTitle: "Quer registrar um projeto?",
    ctaDesc: "Entre em contato para saber qual programa se aplica a sua atividade.",
    ctaBtn: "Fale Conosco",
    docSection: "Documentacao Vigente",
    docDesc: "Acesse os documentos essenciais e atualizados para o desenvolvimento do seu projeto na secao de documentacao.",
    docBtn: "Ver Documentacao",
  },
  en: {
    seoTitle: "Green Ledger Programs",
    seoDesc: "Learn about Green Ledger programs: Certification, Methodologies and Assets.",
    badge: "Programs",
    title: "Green Ledger Programs",
    subtitle: "The complete roadmap for project developers",
    archTitle: "Our Document Architecture",
    archDesc: "The Green Ledger Programs documentation is organized hierarchically for easy understanding. We have three main Programs that work as umbrellas, each containing its own auxiliary documents, such as tools, manuals and templates.",
    docsIncluded: "Included documents",
    learnMore: "Learn more",
    ctaTitle: "Want to register a project?",
    ctaDesc: "Contact us to find out which program applies to your activity.",
    ctaBtn: "Contact Us",
    docSection: "Current Documentation",
    docDesc: "Access the essential and up-to-date documents for developing your project in the documentation section.",
    docBtn: "View Documentation",
  },
  es: {
    seoTitle: "Programas Green Ledger",
    seoDesc: "Conozca los programas de Green Ledger: Certificacion, Metodologias y Activos.",
    badge: "Programas",
    title: "Programas Green Ledger",
    subtitle: "La hoja de ruta completa para desarrolladores de proyectos",
    archTitle: "Nuestra Arquitectura Documental",
    archDesc: "La documentacion de los Programas Green Ledger esta organizada de forma jerarquica para facilitar la comprension. Tenemos tres Programas principales que funcionan como paraguas, cada uno con sus propios documentos auxiliares, como herramientas, manuales y modelos.",
    docsIncluded: "Documentos incluidos",
    learnMore: "Mas informacion",
    ctaTitle: "Desea registrar un proyecto?",
    ctaDesc: "Contactenos para saber que programa aplica a su actividad.",
    ctaBtn: "Contactenos",
    docSection: "Documentacion Vigente",
    docDesc: "Acceda a los documentos esenciales y actualizados para el desarrollo de su proyecto en la seccion de documentacion.",
    docBtn: "Ver Documentacion",
  },
};

const Programs = () => {
  const { locale } = useLanguage();
  const lang = (locale as "pt" | "en" | "es") || "pt";
  const u = ui[lang] || ui.pt;

  return (
    <div className="pt-20">
      <SEOHead title={u.seoTitle} description={u.seoDesc} path="/programas" />

      <section className="gradient-hero text-primary-foreground py-20 md:py-28">
        <div className="container text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-4">
            {u.badge}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl mx-auto">
            {u.title}
          </h1>
          <p className="mt-6 text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed text-lg">
            {u.subtitle}
          </p>
        </div>
      </section>

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
            {programs.map((p, idx) => (
              <AnimatedSection key={p.id} delay={idx * 0.1}>
                <Card className="h-full border-border hover:border-secondary/40 transition-colors duration-300 hover:shadow-lg">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                      <p.icon className="w-7 h-7 text-secondary" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-primary mb-3">
                      {p.title[lang]}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                      {p.description[lang]}
                    </p>
                    <div className="border-t border-border pt-5">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        {u.docsIncluded}
                      </h4>
                      <ul className="space-y-2 mb-6">
                        {p.docs[lang].map((doc) => (
                          <li key={doc} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <FileText className="w-3.5 h-3.5 text-secondary mt-0.5 shrink-0" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                      <Link to={p.link}>
                        <Button variant="outline" size="sm" className="w-full gap-2 border-secondary/30 text-secondary hover:bg-secondary/10">
                          {u.learnMore} <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection>
        <section className="py-16 bg-muted/30">
          <div className="container text-center">
            <BookOpen className="w-10 h-10 text-secondary mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold text-primary mb-3">
              {u.docSection}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              {u.docDesc}
            </p>
            <Link to="/documentacao">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                {u.docBtn} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </AnimatedSection>

      <section className="py-16">
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
