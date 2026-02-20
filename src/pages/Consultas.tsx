import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { MessageSquare, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

type ConsultaStatus = "Aberta" | "Encerrada" | "Em Análise";

interface Consulta {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  status: ConsultaStatus;
  openDate: string;
  closeDate: string;
  comments: number;
  category: string;
}

const statusLabels: Record<string, Record<ConsultaStatus, string>> = {
  pt: { "Aberta": "Aberta", "Encerrada": "Encerrada", "Em Análise": "Em Análise" },
  en: { "Aberta": "Open", "Encerrada": "Closed", "Em Análise": "Under Review" },
  es: { "Aberta": "Abierta", "Encerrada": "Cerrada", "Em Análise": "En Análisis" },
};

const statusConfig: Record<ConsultaStatus, { color: string; icon: typeof Clock }> = {
  "Aberta": { color: "bg-secondary/20 text-secondary", icon: Clock },
  "Encerrada": { color: "bg-muted text-muted-foreground", icon: CheckCircle2 },
  "Em Análise": { color: "bg-accent/20 text-accent-foreground", icon: AlertCircle },
};

const consultas: Consulta[] = [
  {
    id: "CP-2026-003",
    title: { pt: "Revisão da Metodologia GL-AFOLU-001 v3.0", en: "GL-AFOLU-001 v3.0 Methodology Review", es: "Revisión de la Metodología GL-AFOLU-001 v3.0" },
    description: { pt: "Proposta de atualização da metodologia de reflorestamento para incluir novos fatores de emissão regionalizados para o bioma Cerrado e aprimorar os protocolos de amostragem de biomassa.", en: "Proposed update to the reforestation methodology to include new regionalized emission factors for the Cerrado biome and improve biomass sampling protocols.", es: "Propuesta de actualización de la metodología de reforestación para incluir nuevos factores de emisión regionalizados para el bioma Cerrado y mejorar los protocolos de muestreo de biomasa." },
    status: "Aberta", openDate: "2026-02-01", closeDate: "2026-04-02", comments: 12, category: "Metodologia",
  },
  {
    id: "CP-2026-002",
    title: { pt: "Nova Metodologia GL-SC-003 — Pastagens Regenerativas", en: "New Methodology GL-SC-003 — Regenerative Pastures", es: "Nueva Metodología GL-SC-003 — Pasturas Regenerativas" },
    description: { pt: "Metodologia para quantificação de carbono orgânico no solo em sistemas de pastagens manejadas com rotação intensiva e recuperação de pastagens degradadas.", en: "Methodology for quantification of soil organic carbon in managed pasture systems with intensive rotation and degraded pasture recovery.", es: "Metodología para cuantificación de carbono orgánico en el suelo en sistemas de pasturas manejadas con rotación intensiva y recuperación de pasturas degradadas." },
    status: "Aberta", openDate: "2026-01-15", closeDate: "2026-03-16", comments: 23, category: "Metodologia",
  },
  {
    id: "CP-2026-001",
    title: { pt: "Atualização do Procedimento de Credenciamento de VVBs", en: "VVB Accreditation Procedure Update", es: "Actualización del Procedimiento de Acreditación de VVBs" },
    description: { pt: "Revisão dos requisitos de competência técnica setorial, critérios de rotação de auditores e procedimentos de supervisão de qualidade para organismos de validação e verificação.", en: "Review of sectoral technical competence requirements, auditor rotation criteria and quality supervision procedures for validation and verification bodies.", es: "Revisión de los requisitos de competencia técnica sectorial, criterios de rotación de auditores y procedimientos de supervisión de calidad para organismos de validación y verificación." },
    status: "Em Análise", openDate: "2025-12-01", closeDate: "2026-01-30", comments: 34, category: "Procedimento",
  },
  {
    id: "CP-2025-008",
    title: { pt: "Política de Buffer Pool e Não-Permanência", en: "Buffer Pool and Non-Permanence Policy", es: "Política de Buffer Pool y No-Permanencia" },
    description: { pt: "Proposta de revisão dos percentuais de contribuição ao buffer pool por tipo de projeto e risco de reversão.", en: "Proposed revision of buffer pool contribution percentages by project type and reversal risk.", es: "Propuesta de revisión de los porcentajes de contribución al buffer pool por tipo de proyecto y riesgo de reversión." },
    status: "Encerrada", openDate: "2025-10-01", closeDate: "2025-11-30", comments: 45, category: "Política",
  },
  {
    id: "CP-2025-007",
    title: { pt: "Metodologia GL-ET-001 v2.0 — Biodigestores", en: "GL-ET-001 v2.0 Methodology — Biodigesters", es: "Metodología GL-ET-001 v2.0 — Biodigestores" },
    description: { pt: "Revisão da metodologia de biodigestores para expandir elegibilidade a sistemas de co-digestão e incluir créditos por substituição de fertilizantes químicos.", en: "Biodigester methodology revision to expand eligibility to co-digestion systems and include credits for chemical fertilizer substitution.", es: "Revisión de la metodología de biodigestores para expandir elegibilidad a sistemas de co-digestión e incluir créditos por sustitución de fertilizantes químicos." },
    status: "Encerrada", openDate: "2025-08-15", closeDate: "2025-10-14", comments: 28, category: "Metodologia",
  },
  {
    id: "CP-2025-006",
    title: { pt: "Salvaguardas Ambientais e Sociais — Diretrizes Atualizadas", en: "Environmental and Social Safeguards — Updated Guidelines", es: "Salvaguardas Ambientales y Sociales — Directrices Actualizadas" },
    description: { pt: "Atualização das diretrizes de salvaguardas para inclusão de requisitos de CLPI e avaliação de impactos sobre biodiversidade.", en: "Safeguards guidelines update to include FPIC requirements and biodiversity impact assessment.", es: "Actualización de las directrices de salvaguardas para inclusión de requisitos de CLPI y evaluación de impactos sobre biodiversidad." },
    status: "Encerrada", openDate: "2025-07-01", closeDate: "2025-08-30", comments: 56, category: "Governança",
  },
];

const ui = {
  pt: { open: "Consultas Abertas", total: "Total de Consultas", commentLabel: "Comentários Recebidos", all: "Todas", participate: "Participar", opening: "Abertura", closing: "Encerramento", comments: "comentários", placeholder: "* Dados placeholder — consultas reais serão publicadas conforme abertura.", seoTitle: "Consultas Públicas", seoDesc: "Participe das consultas públicas da Green Ledger." },
  en: { open: "Open Consultations", total: "Total Consultations", commentLabel: "Comments Received", all: "All", participate: "Participate", opening: "Opening", closing: "Closing", comments: "comments", placeholder: "* Placeholder data — real consultations will be published as they open.", seoTitle: "Public Consultations", seoDesc: "Participate in Green Ledger's public consultations." },
  es: { open: "Consultas Abiertas", total: "Total de Consultas", commentLabel: "Comentarios Recibidos", all: "Todas", participate: "Participar", opening: "Apertura", closing: "Cierre", comments: "comentarios", placeholder: "* Datos placeholder — consultas reales serán publicadas según apertura.", seoTitle: "Consultas Públicas", seoDesc: "Participe en las consultas públicas de Green Ledger." },
};

const Consultas = () => {
  const { t, locale } = useLanguage();
  const lang = locale as "pt" | "en" | "es";
  const u = ui[lang] || ui.pt;
  const sl = statusLabels[lang] || statusLabels.pt;
  const [filter, setFilter] = useState<ConsultaStatus | "">("");

  const filtered = filter ? consultas.filter((c) => c.status === filter) : consultas;
  const openCount = consultas.filter((c) => c.status === "Aberta").length;

  return (
    <div className="pt-20">
      <SEOHead title={u.seoTitle} description={u.seoDesc} path="/consultas" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">{t("page.consultas.title")}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.consultas.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.consultas.subtitle")}</p>
        </div>
      </section>

      <section className="py-12 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center"><span className="font-heading text-3xl font-bold text-secondary">{openCount}</span><p className="text-sm text-muted-foreground mt-1">{u.open}</p></div>
            <div className="text-center"><span className="font-heading text-3xl font-bold text-secondary">{consultas.length}</span><p className="text-sm text-muted-foreground mt-1">{u.total}</p></div>
            <div className="text-center"><span className="font-heading text-3xl font-bold text-secondary">{consultas.reduce((s, c) => s + c.comments, 0)}</span><p className="text-sm text-muted-foreground mt-1">{u.commentLabel}</p></div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-10">
            {(["", "Aberta", "Em Análise", "Encerrada"] as const).map((s) => (
              <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === s ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {s ? sl[s] : u.all}
              </button>
            ))}
          </div>

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
                        <StatusIcon className="w-3 h-3" /> {sl[c.status]}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-primary mb-2">{c.title[lang] || c.title.pt}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.description[lang] || c.description.pt}</p>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{u.opening}: {c.openDate}</span>
                        <span>{u.closing}: {c.closeDate}</span>
                        <span className="inline-flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {c.comments} {u.comments}</span>
                      </div>
                      {c.status === "Aberta" && (
                        <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-1 text-xs">
                          {u.participate} <ArrowRight className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground italic text-center mt-10">{u.placeholder}</p>
        </div>
      </section>
    </div>
  );
};

export default Consultas;
