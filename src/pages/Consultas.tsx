import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { MessageSquare, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { usePublicConsultations } from "@/hooks/usePublicAPI";

type Lang = "pt" | "en" | "es";

/**
 * Canonical consultation lifecycle states exposed by the public API (C3).
 * OPEN: accepting comments. CLOSED: comment window ended. RESPONSE_PUBLISHED:
 * the registry has published its response to the received comments.
 */
type ApiStatus = "OPEN" | "CLOSED" | "RESPONSE_PUBLISHED";

const STATUS_VALUES: readonly ApiStatus[] = ["OPEN", "RESPONSE_PUBLISHED", "CLOSED"] as const;

// Localized labels for the 3 API statuses (mirrors the old PT/EN/ES labels but
// keyed by the canonical API values instead of the former PT-only union).
const statusLabels: Record<Lang, Record<ApiStatus, string>> = {
  pt: { OPEN: "Aberta", CLOSED: "Encerrada", RESPONSE_PUBLISHED: "Resposta Publicada" },
  en: { OPEN: "Open", CLOSED: "Closed", RESPONSE_PUBLISHED: "Response Published" },
  es: { OPEN: "Abierta", CLOSED: "Cerrada", RESPONSE_PUBLISHED: "Respuesta Publicada" },
};

// Visual treatment per status — reuses the page's original badge palette/icons.
const statusConfig: Record<ApiStatus, { color: string; icon: typeof Clock }> = {
  OPEN: { color: "bg-secondary/20 text-secondary", icon: Clock },
  RESPONSE_PUBLISHED: { color: "bg-accent/20 text-accent-foreground", icon: AlertCircle },
  CLOSED: { color: "bg-muted text-muted-foreground", icon: CheckCircle2 },
};

const ui = {
  pt: { open: "Consultas Abertas", total: "Total de Consultas", commentLabel: "Comentários Recebidos", all: "Todas", participate: "Participar", opening: "Abertura", closing: "Encerramento", comments: "comentários", loading: "Carregando consultas...", error: "Não foi possível carregar as consultas no momento.", empty: "Nenhuma consulta pública disponível no momento.", seoTitle: "Consultas Públicas", seoDesc: "Participe das consultas públicas da Green Ledger." },
  en: { open: "Open Consultations", total: "Total Consultations", commentLabel: "Comments Received", all: "All", participate: "Participate", opening: "Opening", closing: "Closing", comments: "comments", loading: "Loading consultations...", error: "Unable to load consultations at this time.", empty: "No public consultations available at this time.", seoTitle: "Public Consultations", seoDesc: "Participate in Green Ledger's public consultations." },
  es: { open: "Consultas Abiertas", total: "Total de Consultas", commentLabel: "Comentarios Recibidos", all: "Todas", participate: "Participar", opening: "Apertura", closing: "Cierre", comments: "comentarios", loading: "Cargando consultas...", error: "No se pudieron cargar las consultas en este momento.", empty: "No hay consultas públicas disponibles en este momento.", seoTitle: "Consultas Públicas", seoDesc: "Participe en las consultas públicas de Green Ledger." },
};

const localeFor: Record<Lang, string> = { pt: "pt-BR", en: "en-GB", es: "es-ES" };

const Consultas = () => {
  const { t, locale } = useLanguage();
  const lang = (locale as Lang) || "pt";
  const u = ui[lang] || ui.pt;
  const sl = statusLabels[lang] || statusLabels.pt;

  const [filter, setFilter] = useState<ApiStatus | "">("");

  // Fetch a large page so the header stats and (status-agnostic) list reflect the
  // full set; filtering is applied client-side to keep the UI snappy and avoid a
  // refetch per chip click. `meta.total` still reflects the unfiltered total.
  const { data: response, loading, error } = usePublicConsultations({ limit: 100 });
  const consultas = response?.data ?? [];

  const filtered = filter ? consultas.filter((c) => c.status === filter) : consultas;
  const openCount = consultas.filter((c) => c.status === "OPEN").length;
  const totalCount = response?.meta.total ?? consultas.length;
  const totalComments = consultas.reduce((s, c) => s + c.commentCount, 0);

  const formatDate = (iso?: string): string =>
    iso ? new Date(iso).toLocaleDateString(localeFor[lang]) : "—";

  // Resolve the public site route for a consultation's attached entity, when present.
  const entityHref = (entity: NonNullable<(typeof consultas)[number]["entity"]>): string | null => {
    if (!entity.code) return null;
    if (entity.kind === "project") return `/projetos/${entity.code}`;
    if (entity.kind === "methodology") return `/metodologias/${entity.code}`;
    return null;
  };

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
            <div className="text-center"><span className="font-heading text-3xl font-bold text-secondary">{totalCount}</span><p className="text-sm text-muted-foreground mt-1">{u.total}</p></div>
            <div className="text-center"><span className="font-heading text-3xl font-bold text-secondary">{totalComments}</span><p className="text-sm text-muted-foreground mt-1">{u.commentLabel}</p></div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-10">
            {(["", ...STATUS_VALUES] as const).map((s) => (
              <button key={s || "all"} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === s ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {s ? sl[s] : u.all}
              </button>
            ))}
          </div>

          {loading && (
            <div className="text-center py-16 text-muted-foreground">{u.loading}</div>
          )}
          {error && (
            <div className="text-center py-16 text-muted-foreground text-sm">{u.error}</div>
          )}

          {!loading && !error && (
            filtered.length === 0 ? (
              <p className="text-center py-16 text-muted-foreground">{u.empty}</p>
            ) : (
              <div className="space-y-6">
                {filtered.map((c, i) => {
                  // Unknown statuses fall back to the CLOSED treatment so the badge
                  // still renders rather than crashing on a missing config entry.
                  const status = (STATUS_VALUES as readonly string[]).includes(c.status)
                    ? (c.status as ApiStatus)
                    : "CLOSED";
                  const StatusIcon = statusConfig[status].icon;
                  const href = c.entity ? entityHref(c.entity) : null;
                  return (
                    <AnimatedSection key={c.id} delay={i * 0.06}>
                      <div className="border border-border rounded-xl p-6 md:p-8 hover:shadow-card transition-shadow bg-card">
                        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                          {c.entity?.code && (
                            <span className="font-mono text-xs text-secondary font-medium">{c.entity.code}</span>
                          )}
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1 ml-auto ${statusConfig[status].color}`}>
                            <StatusIcon className="w-3 h-3" /> {sl[status]}
                          </span>
                        </div>
                        <h3 className="font-heading text-lg font-semibold text-primary mb-2">{c.title}</h3>
                        {c.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.description}</p>
                        )}
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{u.opening}: {formatDate(c.openDate)}</span>
                            <span>{u.closing}: {formatDate(c.closeDate)}</span>
                            <span className="inline-flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {c.commentCount} {u.comments}</span>
                          </div>
                          {href && (
                            <Link to={href}>
                              <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-1 text-xs">
                                {u.participate} <ArrowRight className="w-3 h-3" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Consultas;
