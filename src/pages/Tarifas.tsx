import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

interface TariffItem { service: string; value: string; note: string; }
interface TariffCategory { category: string; items: TariffItem[]; }
interface FAQ { q: string; a: string; }

const i18n = {
  pt: {
    seoTitle: "Tarifas e Taxas",
    seoDesc: "Consulte a tabela completa de tarifas e taxas dos serviços de certificação da Green Ledger.",
    thService: "Serviço", thValue: "Valor", thNote: "Observação",
    faqTitle: "Perguntas Frequentes",
    ctaTitle: "Precisa de um orçamento personalizado?",
    ctaDesc: "Entre em contato com nossa equipe comercial para um orçamento sob medida para o seu projeto.",
    ctaBtn: "Solicitar Orçamento",
    placeholder: "* Valores placeholder — tabela de tarifas será atualizada com valores reais.",
    tariffs: [
      { category: "Registro de Projeto", items: [
        { service: "Taxa de abertura de conta", value: "R$ 500", note: "Pagamento único" },
        { service: "Registro — micro (<1.000 tCO₂e/ano)", value: "R$ 3.000", note: "" },
        { service: "Registro — pequeno (1.000–10.000 tCO₂e/ano)", value: "R$ 7.500", note: "" },
        { service: "Registro — médio (10.001–100.000 tCO₂e/ano)", value: "R$ 15.000", note: "" },
        { service: "Registro — grande (>100.000 tCO₂e/ano)", value: "R$ 25.000", note: "" },
        { service: "Revisão de projeto (re-submissão)", value: "R$ 2.000", note: "Por re-submissão" },
      ]},
      { category: "Validação e Verificação", items: [
        { service: "Taxa de validação", value: "R$ 5.000 – R$ 20.000", note: "Variável conforme complexidade" },
        { service: "Taxa de verificação periódica", value: "R$ 5.000 – R$ 15.000", note: "Por período" },
        { service: "Verificação extraordinária", value: "R$ 8.000", note: "" },
      ]},
      { category: "Emissão de Créditos", items: [
        { service: "Taxa de emissão", value: "R$ 0,30/tCO₂e", note: "Sobre volume emitido" },
        { service: "Contribuição ao Buffer Pool", value: "5–20%", note: "Conforme risco" },
        { service: "Taxa de transferência", value: "R$ 0,05/tCO₂e", note: "Mín. R$ 50" },
        { service: "Taxa de aposentadoria/cancelamento", value: "R$ 0,02/tCO₂e", note: "Mín. R$ 25" },
      ]},
      { category: "Credenciamento de VVBs", items: [
        { service: "Credenciamento inicial", value: "R$ 10.000", note: "" },
        { service: "Renovação anual", value: "R$ 5.000", note: "" },
        { service: "Ampliação de escopo", value: "R$ 3.000", note: "Por setor" },
      ]},
      { category: "Serviços Adicionais", items: [
        { service: "Consulta técnica prévia", value: "R$ 1.500", note: "Opcional" },
        { service: "Treinamento para desenvolvedores", value: "R$ 2.500", note: "Por participante" },
        { service: "API (plano profissional)", value: "R$ 500/mês", note: "Uso comercial" },
      ]},
    ] as TariffCategory[],
    faqs: [
      { q: "As tarifas incluem impostos?", a: "Todos os valores apresentados são líquidos. Impostos serão acrescidos conforme legislação vigente." },
      { q: "Há desconto para projetos comunitários?", a: "Sim. Projetos de comunidades tradicionais ou ONGs podem solicitar redução de até 50% nas taxas de registro e emissão." },
      { q: "Como funciona o pagamento?", a: "Taxas em reais (BRL) via boleto ou transferência. Para clientes internacionais, wire transfer em USD com câmbio do dia." },
      { q: "O que está incluído na taxa de registro?", a: "Análise de completude, elegibilidade preliminar, publicação para consulta pública e abertura no sistema." },
    ] as FAQ[],
  },
  en: {
    seoTitle: "Fees and Pricing",
    seoDesc: "View the complete fee schedule for Green Ledger's certification services.",
    thService: "Service", thValue: "Fee", thNote: "Note",
    faqTitle: "Frequently Asked Questions",
    ctaTitle: "Need a custom quote?",
    ctaDesc: "Contact our team for a tailored quote for your project.",
    ctaBtn: "Request Quote",
    placeholder: "* Placeholder values — fee schedule will be updated with actual values.",
    tariffs: [
      { category: "Project Registration", items: [
        { service: "Account opening fee", value: "R$ 500", note: "One-time payment" },
        { service: "Registration — micro (<1,000 tCO₂e/yr)", value: "R$ 3,000", note: "" },
        { service: "Registration — small (1,000–10,000 tCO₂e/yr)", value: "R$ 7,500", note: "" },
        { service: "Registration — medium (10,001–100,000 tCO₂e/yr)", value: "R$ 15,000", note: "" },
        { service: "Registration — large (>100,000 tCO₂e/yr)", value: "R$ 25,000", note: "" },
        { service: "Project revision (re-submission)", value: "R$ 2,000", note: "Per re-submission" },
      ]},
      { category: "Validation and Verification", items: [
        { service: "Validation fee", value: "R$ 5,000 – R$ 20,000", note: "Varies by complexity" },
        { service: "Periodic verification fee", value: "R$ 5,000 – R$ 15,000", note: "Per period" },
        { service: "Extraordinary verification", value: "R$ 8,000", note: "" },
      ]},
      { category: "Credit Issuance", items: [
        { service: "Issuance fee", value: "R$ 0.30/tCO₂e", note: "On issued volume" },
        { service: "Buffer Pool contribution", value: "5–20%", note: "Based on risk" },
        { service: "Transfer fee", value: "R$ 0.05/tCO₂e", note: "Min. R$ 50" },
        { service: "Retirement/cancellation fee", value: "R$ 0.02/tCO₂e", note: "Min. R$ 25" },
      ]},
      { category: "VVB Accreditation", items: [
        { service: "Initial accreditation", value: "R$ 10,000", note: "" },
        { service: "Annual renewal", value: "R$ 5,000", note: "" },
        { service: "Scope expansion", value: "R$ 3,000", note: "Per sector" },
      ]},
      { category: "Additional Services", items: [
        { service: "Pre-registration technical consultation", value: "R$ 1,500", note: "Optional" },
        { service: "Developer training", value: "R$ 2,500", note: "Per participant" },
        { service: "API (professional plan)", value: "R$ 500/month", note: "Commercial use" },
      ]},
    ] as TariffCategory[],
    faqs: [
      { q: "Do fees include taxes?", a: "All values shown are net. Applicable taxes will be added per current legislation." },
      { q: "Are there discounts for community projects?", a: "Yes. Projects by traditional communities or NGOs may request up to 50% reduction in registration and issuance fees." },
      { q: "How does payment work?", a: "Fees in BRL via bank slip or transfer. For international clients, wire transfer in USD at the day's exchange rate." },
      { q: "What's included in the registration fee?", a: "Completeness review, preliminary eligibility, public consultation publication and system registration." },
    ] as FAQ[],
  },
  es: {
    seoTitle: "Tarifas y Precios",
    seoDesc: "Consulte la tabla completa de tarifas de los servicios de certificación de Green Ledger.",
    thService: "Servicio", thValue: "Valor", thNote: "Observación",
    faqTitle: "Preguntas Frecuentes",
    ctaTitle: "¿Necesita un presupuesto personalizado?",
    ctaDesc: "Contáctenos para un presupuesto a medida para su proyecto.",
    ctaBtn: "Solicitar Presupuesto",
    placeholder: "* Valores placeholder — tabla de tarifas será actualizada con valores reales.",
    tariffs: [
      { category: "Registro de Proyecto", items: [
        { service: "Tasa de apertura de cuenta", value: "R$ 500", note: "Pago único" },
        { service: "Registro — micro (<1.000 tCO₂e/año)", value: "R$ 3.000", note: "" },
        { service: "Registro — pequeño (1.000–10.000 tCO₂e/año)", value: "R$ 7.500", note: "" },
        { service: "Registro — mediano (10.001–100.000 tCO₂e/año)", value: "R$ 15.000", note: "" },
        { service: "Registro — grande (>100.000 tCO₂e/año)", value: "R$ 25.000", note: "" },
        { service: "Revisión de proyecto (re-envío)", value: "R$ 2.000", note: "Por re-envío" },
      ]},
      { category: "Validación y Verificación", items: [
        { service: "Tasa de validación", value: "R$ 5.000 – R$ 20.000", note: "Variable según complejidad" },
        { service: "Tasa de verificación periódica", value: "R$ 5.000 – R$ 15.000", note: "Por período" },
        { service: "Verificación extraordinaria", value: "R$ 8.000", note: "" },
      ]},
      { category: "Emisión de Créditos", items: [
        { service: "Tasa de emisión", value: "R$ 0,30/tCO₂e", note: "Sobre volumen emitido" },
        { service: "Contribución al Buffer Pool", value: "5–20%", note: "Según riesgo" },
        { service: "Tasa de transferencia", value: "R$ 0,05/tCO₂e", note: "Mín. R$ 50" },
        { service: "Tasa de retiro/cancelación", value: "R$ 0,02/tCO₂e", note: "Mín. R$ 25" },
      ]},
      { category: "Acreditación de VVBs", items: [
        { service: "Acreditación inicial", value: "R$ 10.000", note: "" },
        { service: "Renovación anual", value: "R$ 5.000", note: "" },
        { service: "Ampliación de alcance", value: "R$ 3.000", note: "Por sector" },
      ]},
      { category: "Servicios Adicionales", items: [
        { service: "Consulta técnica previa", value: "R$ 1.500", note: "Opcional" },
        { service: "Capacitación para desarrolladores", value: "R$ 2.500", note: "Por participante" },
        { service: "API (plan profesional)", value: "R$ 500/mes", note: "Uso comercial" },
      ]},
    ] as TariffCategory[],
    faqs: [
      { q: "¿Las tarifas incluyen impuestos?", a: "Todos los valores presentados son netos. Los impuestos aplicables se agregarán según la legislación vigente." },
      { q: "¿Hay descuentos para proyectos comunitarios?", a: "Sí. Proyectos de comunidades tradicionales u ONGs pueden solicitar reducción de hasta 50% en tasas de registro y emisión." },
      { q: "¿Cómo funciona el pago?", a: "Tasas en reales (BRL) vía transferencia bancaria. Para clientes internacionales, transferencia en USD al tipo de cambio del día." },
      { q: "¿Qué incluye la tasa de registro?", a: "Análisis de completitud, elegibilidad preliminar, publicación para consulta pública y apertura en el sistema." },
    ] as FAQ[],
  },
};

const Tarifas = () => {
  const { t, locale } = useLanguage();
  const d = i18n[locale as keyof typeof i18n] || i18n.pt;

  return (
    <div className="pt-20">
      <SEOHead title={d.seoTitle} description={d.seoDesc} path="/tarifas" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">{t("page.tarifas.title")}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.tarifas.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.tarifas.subtitle")}</p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container max-w-4xl space-y-12">
          {d.tariffs.map((cat, i) => (
            <AnimatedSection key={cat.category} delay={i * 0.06}>
              <div>
                <h2 className="font-heading text-xl font-bold text-primary mb-4 pb-3 border-b border-border">{cat.category}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left">
                        <th className="py-2 pr-4 text-xs uppercase tracking-wider text-muted-foreground font-semibold">{d.thService}</th>
                        <th className="py-2 pr-4 text-xs uppercase tracking-wider text-muted-foreground font-semibold text-right">{d.thValue}</th>
                        <th className="py-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold hidden md:table-cell">{d.thNote}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.items.map((item) => (
                        <tr key={item.service} className="border-t border-border/50">
                          <td className="py-3 pr-4 text-primary">{item.service}</td>
                          <td className="py-3 pr-4 text-right font-mono text-secondary font-medium whitespace-nowrap">{item.value}</td>
                          <td className="py-3 text-muted-foreground hidden md:table-cell">{item.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

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
