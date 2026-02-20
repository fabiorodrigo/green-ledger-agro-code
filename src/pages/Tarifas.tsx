import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Download, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

interface FAQ { q: string; a: string; }

interface TariffDoc {
  version: string;
  date: string;
  label: string;
  url: string;
}

const i18n = {
  pt: {
    seoTitle: "Tarifas de Serviço",
    seoDesc: "Consulte a tabela de tarifas dos serviços de certificação da Green Ledger.",
    badge: "Tarifas de Serviço",
    title: "Tarifas de Serviço",
    subtitle: "Conheça os custos associados aos nossos serviços de certificação.",
    transparencyBadge: "Compromisso com a Transparência",
    transparencyTitle: "Tabela de Tarifas",
    transparencyDesc: "A Green Ledger é comprometida com a transparência total de seus processos e custos. Nossa tabela de tarifas detalha todos os valores aplicáveis aos serviços de registro, validação, verificação, emissão de créditos e credenciamento de VVBs.",
    transparencyDesc2: "O documento é atualizado periodicamente e publicado em versões controladas. Consulte abaixo a versão vigente.",
    downloadLabel: "Acessar Tabela de Tarifas",
    docs: [
      { version: "v1.0", date: "Março/2026", label: "Acessar Tabela de Tarifas em Português (v1.0)", url: "#" },
    ] as TariffDoc[],
    previousTitle: "Versões Anteriores",
    previousEmpty: "Esta é a primeira versão publicada.",
    faqTitle: "Perguntas Frequentes",
    ctaTitle: "Precisa de um orçamento personalizado?",
    ctaDesc: "Entre em contato com nossa equipe comercial para um orçamento sob medida para o seu projeto.",
    ctaBtn: "Solicitar Orçamento",
    placeholder: "* Documento placeholder — a tabela de tarifas oficial será publicada em breve.",
    faqs: [
      { q: "As tarifas incluem impostos?", a: "Todos os valores apresentados são líquidos. Impostos serão acrescidos conforme legislação vigente." },
      { q: "Há desconto para projetos comunitários?", a: "Sim. Projetos de comunidades tradicionais ou ONGs podem solicitar redução de até 50% nas taxas de registro e emissão." },
      { q: "Como funciona o pagamento?", a: "Taxas em reais (BRL) via boleto ou transferência. Para clientes internacionais, wire transfer em USD com câmbio do dia." },
      { q: "O que está incluído na taxa de registro?", a: "Análise de completude, elegibilidade preliminar, publicação para consulta pública e abertura no sistema." },
      { q: "Com que frequência as tarifas são atualizadas?", a: "A tabela de tarifas é revisada semestralmente. Alterações são comunicadas com pelo menos 60 dias de antecedência." },
    ] as FAQ[],
  },
  en: {
    seoTitle: "Service Fees",
    seoDesc: "View the fee schedule for Green Ledger's certification services.",
    badge: "Service Fees",
    title: "Service Fees",
    subtitle: "Learn about the costs associated with our certification services.",
    transparencyBadge: "Commitment to Transparency",
    transparencyTitle: "Fee Schedule",
    transparencyDesc: "Green Ledger is committed to full transparency in its processes and costs. Our fee schedule details all applicable charges for registration, validation, verification, credit issuance and VVB accreditation services.",
    transparencyDesc2: "The document is updated periodically and published in controlled versions. See the current version below.",
    downloadLabel: "Access Fee Schedule",
    docs: [
      { version: "v1.0", date: "March/2026", label: "Access Fee Schedule in Portuguese (v1.0)", url: "#" },
    ] as TariffDoc[],
    previousTitle: "Previous Versions",
    previousEmpty: "This is the first published version.",
    faqTitle: "Frequently Asked Questions",
    ctaTitle: "Need a custom quote?",
    ctaDesc: "Contact our team for a tailored quote for your project.",
    ctaBtn: "Request Quote",
    placeholder: "* Placeholder document — the official fee schedule will be published soon.",
    faqs: [
      { q: "Do fees include taxes?", a: "All values shown are net. Applicable taxes will be added per current legislation." },
      { q: "Are there discounts for community projects?", a: "Yes. Projects by traditional communities or NGOs may request up to 50% reduction in registration and issuance fees." },
      { q: "How does payment work?", a: "Fees in BRL via bank slip or transfer. For international clients, wire transfer in USD at the day's exchange rate." },
      { q: "What's included in the registration fee?", a: "Completeness review, preliminary eligibility, public consultation publication and system registration." },
      { q: "How often are fees updated?", a: "The fee schedule is reviewed semi-annually. Changes are communicated at least 60 days in advance." },
    ] as FAQ[],
  },
  es: {
    seoTitle: "Tarifas de Servicio",
    seoDesc: "Consulte la tabla de tarifas de los servicios de certificación de Green Ledger.",
    badge: "Tarifas de Servicio",
    title: "Tarifas de Servicio",
    subtitle: "Conozca los costos asociados a nuestros servicios de certificación.",
    transparencyBadge: "Compromiso con la Transparencia",
    transparencyTitle: "Tabla de Tarifas",
    transparencyDesc: "Green Ledger se compromete con la transparencia total de sus procesos y costos. Nuestra tabla de tarifas detalla todos los valores aplicables a los servicios de registro, validación, verificación, emisión de créditos y acreditación de VVBs.",
    transparencyDesc2: "El documento se actualiza periódicamente y se publica en versiones controladas. Consulte a continuación la versión vigente.",
    downloadLabel: "Acceder a Tabla de Tarifas",
    docs: [
      { version: "v1.0", date: "Marzo/2026", label: "Acceder a Tabla de Tarifas en Portugués (v1.0)", url: "#" },
    ] as TariffDoc[],
    previousTitle: "Versiones Anteriores",
    previousEmpty: "Esta es la primera versión publicada.",
    faqTitle: "Preguntas Frecuentes",
    ctaTitle: "¿Necesita un presupuesto personalizado?",
    ctaDesc: "Contáctenos para un presupuesto a medida para su proyecto.",
    ctaBtn: "Solicitar Presupuesto",
    placeholder: "* Documento placeholder — la tabla de tarifas oficial será publicada próximamente.",
    faqs: [
      { q: "¿Las tarifas incluyen impuestos?", a: "Todos los valores presentados son netos. Los impuestos aplicables se agregarán según la legislación vigente." },
      { q: "¿Hay descuentos para proyectos comunitarios?", a: "Sí. Proyectos de comunidades tradicionales u ONGs pueden solicitar reducción de hasta 50% en tasas de registro y emisión." },
      { q: "¿Cómo funciona el pago?", a: "Tasas en reales (BRL) vía transferencia bancaria. Para clientes internacionales, transferencia en USD al tipo de cambio del día." },
      { q: "¿Qué incluye la tasa de registro?", a: "Análisis de completitud, elegibilidad preliminar, publicación para consulta pública y apertura en el sistema." },
      { q: "¿Con qué frecuencia se actualizan las tarifas?", a: "La tabla de tarifas se revisa semestralmente. Los cambios se comunican con al menos 60 días de anticipación." },
    ] as FAQ[],
  },
};

const Tarifas = () => {
  const { locale } = useLanguage();
  const d = i18n[locale as keyof typeof i18n] || i18n.pt;

  return (
    <div className="pt-20">
      <SEOHead title={d.seoTitle} description={d.seoDesc} path="/tarifas" />

      {/* Hero */}
      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">{d.badge}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{d.title}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{d.subtitle}</p>
        </div>
      </section>

      {/* Transparency + PDF Download */}
      <section className="py-20 md:py-28">
        <div className="container max-w-3xl">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary mb-4">{d.transparencyBadge}</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">{d.transparencyTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{d.transparencyDesc}</p>
              <p className="text-muted-foreground leading-relaxed">{d.transparencyDesc2}</p>
            </div>
          </AnimatedSection>

          {/* Current version download */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-4">
              {d.docs.map((doc) => (
                <a
                  key={doc.version}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 border border-border rounded-xl bg-card hover:shadow-card hover:border-secondary/40 transition-all group"
                >
                  <div className="w-14 h-14 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                    <FileText className="w-7 h-7 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-primary group-hover:text-secondary transition-colors">{doc.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{doc.date} — {doc.version}</p>
                  </div>
                  <Download className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Previous versions */}
          <AnimatedSection delay={0.15}>
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">{d.previousTitle}</h3>
              <p className="text-sm text-muted-foreground italic">{d.previousEmpty}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/20">
        <div className="container max-w-3xl">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="w-6 h-6 text-secondary" />
              <h2 className="font-heading text-2xl font-bold text-primary">{d.faqTitle}</h2>
            </div>
          </AnimatedSection>
          <div className="space-y-4">
            {d.faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <details className="group border border-border rounded-lg bg-card">
                  <summary className="cursor-pointer p-5 font-heading font-medium text-primary flex items-center justify-between text-sm">
                    {faq.q}
                    <span className="text-secondary transition-transform group-open:rotate-45 text-xl ml-4 shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary mb-4">{d.ctaTitle}</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">{d.ctaDesc}</p>
            <Link to="/contato"><Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">{d.ctaBtn} <ArrowRight className="w-4 h-4" /></Button></Link>
          </AnimatedSection>
        </div>
      </section>
      <p className="text-xs text-muted-foreground italic text-center py-8">{d.placeholder}</p>
    </div>
  );
};

export default Tarifas;
