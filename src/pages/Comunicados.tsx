import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

interface Comunicado {
  date: string;
  title: string;
  summary: string;
  category: string;
  content: string;
}

const comunicados: Comunicado[] = [
  {
    date: "2026-02-15",
    title: "Green Ledger lança Programa Energy & Tech",
    summary: "Novo programa para certificação de projetos de eficiência energética e tecnologias limpas.",
    category: "Programa",
    content: "A Green Ledger anuncia o lançamento do programa Energy & Tech, dedicado a projetos de redução de emissões por meio de biodigestores, eficiência energética, energias renováveis e tecnologias limpas. O programa conta com duas metodologias aprovadas (GL-ET-001 e GL-ET-002) e já está aberto para registro de projetos. A aprovação foi precedida por consulta pública de 60 dias com participação de mais de 40 stakeholders.",
  },
  {
    date: "2026-02-01",
    title: "Relatório Anual 2025 disponível para download",
    summary: "Publicação do balanço completo de atividades, projetos e créditos emitidos em 2025.",
    category: "Institucional",
    content: "O Relatório Anual 2025 da Green Ledger está disponível para download na Central de Materiais. O documento apresenta os principais resultados do ano: 45 projetos registrados, mais de 100.000 créditos emitidos, credenciamento de 6 VVBs e expansão para 12 estados brasileiros. O relatório inclui análise de impacto ambiental e social, demonstrando a contribuição efetiva para a descarbonização.",
  },
  {
    date: "2026-01-20",
    title: "Consulta pública aberta: Metodologia GL-SC-003",
    summary: "Convidamos stakeholders a participar da revisão da nova metodologia para pastagens regenerativas.",
    category: "Consulta Pública",
    content: "A Green Ledger abre consulta pública para a nova metodologia GL-SC-003 — Pastagens Regenerativas, que estabelece procedimentos para quantificação de carbono orgânico no solo em sistemas de pastagens manejadas com rotação intensiva. A consulta estará aberta por 60 dias. Comentários podem ser enviados pelo portal ou por e-mail.",
  },
  {
    date: "2025-12-10",
    title: "Parceria com VVBs internacionais",
    summary: "Anunciamos a aprovação de três novos organismos de verificação para auditorias independentes.",
    category: "VVBs",
    content: "A Green Ledger credenciou três novos organismos de validação e verificação: CarbonCheck International (Brasil/EUA), TerraAssurance S.A. (Brasil/Colômbia) e ClimateGuard Verificações (Brasil). Com isso, o total de VVBs credenciados chega a 6, ampliando a capacidade de auditoria e a cobertura geográfica e setorial.",
  },
  {
    date: "2025-11-05",
    title: "Atualização do Manual de Procedimentos v2.0",
    summary: "Versão atualizada do manual de procedimentos de certificação disponível para download.",
    category: "Procedimento",
    content: "O Manual de Procedimentos de Certificação foi atualizado para a versão 2.0, incorporando melhorias nos fluxos de registro, validação e verificação. As principais alterações incluem: digitalização completa do processo de submissão, novos critérios de avaliação de elegibilidade e procedimentos atualizados de gestão de reclamações e apelações.",
  },
  {
    date: "2025-10-15",
    title: "Marco de 100.000 créditos emitidos",
    summary: "Green Ledger supera a marca de 100 mil créditos de carbono certificados.",
    category: "Institucional",
    content: "A Green Ledger celebra a emissão de mais de 100.000 créditos de carbono certificados, representando a remoção ou redução verificada de 100 mil toneladas de CO₂ equivalente. Os créditos foram gerados por projetos distribuídos em 12 estados brasileiros, abrangendo reflorestamento, sistemas agroflorestais, plantio direto e biodigestores.",
  },
  {
    date: "2025-09-01",
    title: "Lançamento da Plataforma Digital — Fase 1",
    summary: "Primeira fase da plataforma digital com registro público de projetos e portal do desenvolvedor.",
    category: "Plataforma",
    content: "A Green Ledger lança a primeira fase de sua plataforma digital, incluindo o Registro Público de Projetos com dados de todos os projetos certificados, e o Portal do Desenvolvedor para submissão e acompanhamento de projetos. A plataforma oferece rastreabilidade completa de créditos e dashboards de monitoramento.",
  },
  {
    date: "2025-08-10",
    title: "Alinhamento com ICVCM Core Carbon Principles",
    summary: "Green Ledger conclui avaliação de conformidade com os princípios do ICVCM.",
    category: "Governança",
    content: "A Green Ledger concluiu a avaliação de conformidade com os Core Carbon Principles (CCPs) do Integrity Council for the Voluntary Carbon Market (ICVCM). A avaliação confirmou o alinhamento com os 10 princípios fundamentais de governança, emissões e desenvolvimento sustentável, reforçando a integridade dos créditos emitidos.",
  },
];

const categories = [...new Set(comunicados.map((c) => c.category))];

const Comunicados = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = activeCategory ? comunicados.filter((c) => c.category === activeCategory) : comunicados;

  return (
    <div className="pt-20">
      <SEOHead title="Comunicados e Notícias" description="Acompanhe os comunicados oficiais, notícias e atualizações da Green Ledger." path="/comunicados" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            {t("page.comunicados.title")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.comunicados.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.comunicados.subtitle")}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button onClick={() => setActiveCategory(null)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!activeCategory ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              Todos
            </button>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === cat ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="space-y-6">
            {filtered.map((c, i) => (
              <AnimatedSection key={c.date + c.title} delay={i * 0.05}>
                <div className="border border-border rounded-xl p-6 md:p-8 hover:shadow-card transition-shadow bg-card">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {c.date}</span>
                    <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full inline-flex items-center gap-1"><Tag className="w-3 h-3" /> {c.category}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.summary}</p>
                  {expanded === c.title ? (
                    <div className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4 mt-2">
                      {c.content}
                      <button onClick={() => setExpanded(null)} className="text-secondary text-xs font-medium mt-3 block hover:underline">
                        Fechar ↑
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setExpanded(c.title)} className="text-secondary text-xs font-medium hover:underline inline-flex items-center gap-1">
                      Ler mais <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          <p className="text-xs text-muted-foreground italic text-center mt-10">* Conteúdo placeholder — comunicados reais serão publicados conforme divulgação oficial.</p>
        </div>
      </section>
    </div>
  );
};

export default Comunicados;
