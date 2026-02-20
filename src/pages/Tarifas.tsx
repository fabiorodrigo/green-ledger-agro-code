import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

const tariffs = [
  {
    category: "Registro de Projeto",
    items: [
      { service: "Taxa de abertura de conta", value: "R$ 500", note: "Pagamento único" },
      { service: "Registro de novo projeto (micro: <1.000 tCO₂e/ano)", value: "R$ 3.000", note: "" },
      { service: "Registro de novo projeto (pequeno: 1.000–10.000 tCO₂e/ano)", value: "R$ 7.500", note: "" },
      { service: "Registro de novo projeto (médio: 10.001–100.000 tCO₂e/ano)", value: "R$ 15.000", note: "" },
      { service: "Registro de novo projeto (grande: >100.000 tCO₂e/ano)", value: "R$ 25.000", note: "" },
      { service: "Revisão de projeto (re-submissão após ajustes)", value: "R$ 2.000", note: "Por re-submissão" },
    ],
  },
  {
    category: "Validação e Verificação",
    items: [
      { service: "Taxa de validação (análise de elegibilidade)", value: "R$ 5.000 – R$ 20.000", note: "Variável conforme complexidade" },
      { service: "Taxa de verificação periódica", value: "R$ 5.000 – R$ 15.000", note: "Por período de verificação" },
      { service: "Verificação extraordinária (solicitação do desenvolvedor)", value: "R$ 8.000", note: "" },
    ],
  },
  {
    category: "Emissão de Créditos",
    items: [
      { service: "Taxa de emissão de créditos", value: "R$ 0,30/tCO₂e", note: "Sobre volume emitido" },
      { service: "Contribuição ao Buffer Pool", value: "5–20%", note: "Conforme avaliação de risco de não-permanência" },
      { service: "Taxa de transferência de créditos", value: "R$ 0,05/tCO₂e", note: "Mínimo R$ 50" },
      { service: "Taxa de aposentadoria/cancelamento", value: "R$ 0,02/tCO₂e", note: "Mínimo R$ 25" },
    ],
  },
  {
    category: "Credenciamento de VVBs",
    items: [
      { service: "Taxa de credenciamento inicial", value: "R$ 10.000", note: "" },
      { service: "Renovação anual de credenciamento", value: "R$ 5.000", note: "" },
      { service: "Ampliação de escopo setorial", value: "R$ 3.000", note: "Por setor adicional" },
    ],
  },
  {
    category: "Serviços Adicionais",
    items: [
      { service: "Consulta técnica prévia (pré-registro)", value: "R$ 1.500", note: "Opcional" },
      { service: "Treinamento para desenvolvedores de projetos", value: "R$ 2.500", note: "Por participante" },
      { service: "Acesso à API (plano profissional)", value: "R$ 500/mês", note: "Uso comercial" },
      { service: "Emissão de certificado de aposentadoria personalizado", value: "R$ 200", note: "Por certificado" },
    ],
  },
];

const faqs = [
  { q: "As tarifas incluem impostos?", a: "Todos os valores apresentados são líquidos. Impostos aplicáveis serão acrescidos conforme legislação vigente." },
  { q: "Há desconto para projetos comunitários ou de pequena escala?", a: "Sim. Projetos desenvolvidos por comunidades tradicionais, cooperativas familiares ou organizações sem fins lucrativos podem solicitar redução de até 50% nas taxas de registro e emissão." },
  { q: "Como funciona o pagamento?", a: "As taxas são faturadas em reais (BRL) com pagamento via boleto bancário ou transferência. Para clientes internacionais, aceitamos wire transfer em USD com câmbio do dia." },
  { q: "O que está incluído na taxa de registro?", a: "A taxa cobre a análise de completude documental, avaliação de elegibilidade preliminar, publicação para consulta pública e abertura do projeto no sistema da Green Ledger." },
];

const Tarifas = () => {
  const { t } = useLanguage();
  return (
    <div className="pt-20">
      <SEOHead title="Tarifas e Taxas" description="Consulte a tabela completa de tarifas e taxas dos serviços de certificação da Green Ledger." path="/tarifas" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            {t("page.tarifas.title")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.tarifas.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.tarifas.subtitle")}</p>
        </div>
      </section>

      {/* Tariff Tables */}
      <section className="py-20 md:py-28">
        <div className="container max-w-4xl space-y-12">
          {tariffs.map((cat, i) => (
            <AnimatedSection key={cat.category} delay={i * 0.06}>
              <div>
                <h2 className="font-heading text-xl font-bold text-primary mb-4 pb-3 border-b border-border">{cat.category}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left">
                        <th className="py-2 pr-4 text-xs uppercase tracking-wider text-muted-foreground font-semibold">Serviço</th>
                        <th className="py-2 pr-4 text-xs uppercase tracking-wider text-muted-foreground font-semibold text-right">Valor</th>
                        <th className="py-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold hidden md:table-cell">Observação</th>
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

      {/* FAQ */}
      <section className="py-16 bg-muted/20">
        <div className="container max-w-3xl">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="w-6 h-6 text-secondary" />
              <h2 className="font-heading text-2xl font-bold text-primary">Perguntas Frequentes</h2>
            </div>
          </AnimatedSection>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
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
            <h2 className="font-heading text-2xl font-bold text-primary mb-4">Precisa de um orçamento personalizado?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">Entre em contato com nossa equipe comercial para um orçamento sob medida para o seu projeto.</p>
            <Link to="/contato">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                Solicitar Orçamento <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <p className="text-xs text-muted-foreground italic text-center py-8">* Valores placeholder — tabela de tarifas será atualizada com valores reais. Vigência a partir de janeiro/2026.</p>
    </div>
  );
};

export default Tarifas;
