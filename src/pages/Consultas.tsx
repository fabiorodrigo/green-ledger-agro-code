import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { MessageSquare, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

type ConsultaStatus = "Aberta" | "Encerrada" | "Em Análise";

interface Consulta {
  id: string;
  title: string;
  description: string;
  status: ConsultaStatus;
  openDate: string;
  closeDate: string;
  comments: number;
  category: string;
}

const statusConfig: Record<ConsultaStatus, { color: string; icon: typeof Clock }> = {
  "Aberta": { color: "bg-secondary/20 text-secondary", icon: Clock },
  "Encerrada": { color: "bg-muted text-muted-foreground", icon: CheckCircle2 },
  "Em Análise": { color: "bg-accent/20 text-accent-foreground", icon: AlertCircle },
};

const consultas: Consulta[] = [
  {
    id: "CP-2026-003",
    title: "Revisão da Metodologia GL-AFOLU-001 v3.0",
    description: "Proposta de atualização da metodologia de reflorestamento para incluir novos fatores de emissão regionalizados para o bioma Cerrado e aprimorar os protocolos de amostragem de biomassa.",
    status: "Aberta",
    openDate: "2026-02-01",
    closeDate: "2026-04-02",
    comments: 12,
    category: "Metodologia",
  },
  {
    id: "CP-2026-002",
    title: "Nova Metodologia GL-SC-003 — Pastagens Regenerativas",
    description: "Metodologia para quantificação de carbono orgânico no solo em sistemas de pastagens manejadas com rotação intensiva e recuperação de pastagens degradadas.",
    status: "Aberta",
    openDate: "2026-01-15",
    closeDate: "2026-03-16",
    comments: 23,
    category: "Metodologia",
  },
  {
    id: "CP-2026-001",
    title: "Atualização do Procedimento de Credenciamento de VVBs",
    description: "Revisão dos requisitos de competência técnica setorial, critérios de rotação de auditores e procedimentos de supervisão de qualidade para organismos de validação e verificação.",
    status: "Em Análise",
    openDate: "2025-12-01",
    closeDate: "2026-01-30",
    comments: 34,
    category: "Procedimento",
  },
  {
    id: "CP-2025-008",
    title: "Política de Buffer Pool e Não-Permanência",
    description: "Proposta de revisão dos percentuais de contribuição ao buffer pool por tipo de projeto e risco de reversão, com introdução de mecanismo de liberação parcial.",
    status: "Encerrada",
    openDate: "2025-10-01",
    closeDate: "2025-11-30",
    comments: 45,
    category: "Política",
  },
  {
    id: "CP-2025-007",
    title: "Metodologia GL-ET-001 v2.0 — Biodigestores",
    description: "Revisão da metodologia de biodigestores para expandir elegibilidade a sistemas de co-digestão e incluir créditos por substituição de fertilizantes químicos.",
    status: "Encerrada",
    openDate: "2025-08-15",
    closeDate: "2025-10-14",
    comments: 28,
    category: "Metodologia",
  },
  {
    id: "CP-2025-006",
    title: "Salvaguardas Ambientais e Sociais — Diretrizes Atualizadas",
    description: "Atualização das diretrizes de salvaguardas para inclusão de requisitos de consulta livre, prévia e informada (CLPI) e avaliação de impactos sobre biodiversidade.",
    status: "Encerrada",
    openDate: "2025-07-01",
    closeDate: "2025-08-30",
    comments: 56,
    category: "Governança",
  },
];

const Consultas = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<ConsultaStatus | "">("");

  const filtered = filter ? consultas.filter((c) => c.status === filter) : consultas;
  const openCount = consultas.filter((c) => c.status === "Aberta").length;

  return (
    <div className="pt-20">
      <SEOHead title="Consultas Públicas" description="Participe das consultas públicas da Green Ledger. Transparência e participação na construção dos padrões de certificação de carbono." path="/consultas" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            {t("page.consultas.title")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.consultas.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.consultas.subtitle")}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <span className="font-heading text-3xl font-bold text-secondary">{openCount}</span>
              <p className="text-sm text-muted-foreground mt-1">Consultas Abertas</p>
            </div>
            <div className="text-center">
              <span className="font-heading text-3xl font-bold text-secondary">{consultas.length}</span>
              <p className="text-sm text-muted-foreground mt-1">Total de Consultas</p>
            </div>
            <div className="text-center">
              <span className="font-heading text-3xl font-bold text-secondary">{consultas.reduce((s, c) => s + c.comments, 0)}</span>
              <p className="text-sm text-muted-foreground mt-1">Comentários Recebidos</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {(["", "Aberta", "Em Análise", "Encerrada"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === s ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                {s || "Todas"}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="space-y-6">
            {filtered.map((c, i) => {
              const StatusIcon = statusConfig[c.status].icon;
              return (
                <AnimatedSection key={c.id} delay={i * 0.06}>
                  <div className="border border-border rounded-xl p-6 md:p-8 hover:shadow-card transition-shadow bg-card">
                    <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-secondary font-medium">{c.id}</span>
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{c.category}</span>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1 ${statusConfig[c.status].color}`}>
                        <StatusIcon className="w-3 h-3" /> {c.status}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-primary mb-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.description}</p>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Abertura: {c.openDate}</span>
                        <span>Encerramento: {c.closeDate}</span>
                        <span className="inline-flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {c.comments} comentários</span>
                      </div>
                      {c.status === "Aberta" && (
                        <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-1 text-xs">
                          Participar <ArrowRight className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground italic text-center mt-10">* Dados placeholder — consultas reais serão publicadas conforme abertura.</p>
        </div>
      </section>
    </div>
  );
};

export default Consultas;
