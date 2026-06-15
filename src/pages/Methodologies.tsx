import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePublicMethodologies } from "@/hooks/usePublicAPI";
import { getSectorLabel, getActivityTypeLabel, getSolutionLabel } from "@/constants/methodologyLabels";

const Methodologies = () => {
  const { t, tr, locale } = useLanguage();
  const lang = locale as "pt" | "en" | "es";

  const [search, setSearch] = useState("");
  const [solutionFilter, setSolutionFilter] = useState<string>("");

  const { data: response, loading, error } = usePublicMethodologies({
    limit: 50,
    search: search || undefined,
    solutionType: solutionFilter || undefined,
  });

  const methodologies = response?.data ?? [];

  return (
    <div className="pt-20">
      <SEOHead
        title={t("meth.hero.title")}
        description={t("meth.hero.desc")}
        path="/metodologias"
      />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            {t("meth.hero.tag")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("meth.hero.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("meth.hero.desc")}</p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container">
          {/* Controls */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={tr(
                    "Buscar metodologias...",
                    "Search methodologies...",
                    "Buscar metodologías...",
                  )}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={solutionFilter}
                onChange={(e) => setSolutionFilter(e.target.value)}
                className="border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground"
              >
                <option value="">
                  {tr("Todas as Soluções", "All Solutions", "Todas las Soluciones")}
                </option>
                <option value="NBS">
                  {tr("Base Natural (NBS)", "Nature-Based (NBS)", "Base Natural (NBS)")}
                </option>
                <option value="TBS">
                  {tr("Base Tecnológica (TBS)", "Technology-Based (TBS)", "Base Tecnológica (TBS)")}
                </option>
              </select>
            </div>
            <a
              href="https://plataforma.greenledger.eco.br/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors shrink-0"
            >
              {tr("Propor Metodologia", "Propose Methodology", "Proponer Metodología")}{" "}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Loading / Error */}
          {loading && (
            <div className="text-center py-16 text-muted-foreground">
              {tr(
                "Carregando metodologias...",
                "Loading methodologies...",
                "Cargando metodologías...",
              )}
            </div>
          )}
          {error && (
            <div className="text-center py-16 text-muted-foreground text-sm">
              {tr(
                "Não foi possível carregar as metodologias no momento.",
                "Unable to load methodologies at this time.",
                "No fue posible cargar las metodologías en este momento.",
              )}
            </div>
          )}

          {/* Methodology Cards */}
          {!loading && !error && (
            <div className="space-y-8">
              {methodologies.length === 0 ? (
                <p className="text-center py-16 text-muted-foreground">
                  {tr(
                    "Nenhuma metodologia encontrada.",
                    "No methodologies found.",
                    "No se encontraron metodologías.",
                  )}
                </p>
              ) : (
                methodologies.map((m, i) => (
                  <AnimatedSection key={m.id} delay={i * 0.06}>
                    <div className="bg-card border border-border rounded-xl p-8 md:p-10">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <span className="font-heading font-bold text-secondary text-sm">{m.code}</span>
                            {m.currentVersion && (
                              <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                                v{m.currentVersion.versionNumber}
                              </span>
                            )}
                            {m.solutionType && (
                              <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">
                                {getSolutionLabel(m.solutionType, lang)}
                              </span>
                            )}
                            {m.sector && (
                              <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                                {getSectorLabel(m.sector, lang)}
                              </span>
                            )}
                            {m.activityType && (
                              <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent-foreground rounded-full">
                                {getActivityTypeLabel(m.activityType, lang)}
                              </span>
                            )}
                          </div>
                          <h3 className="font-heading font-semibold text-xl text-primary mb-3">
                            {/* API methodology content only ships PT/EN; ES falls back to PT. */}
                            {tr(m.name, m.nameEn ?? m.name, m.name)}
                          </h3>
                          {(m.descriptionPt || m.descriptionEn) && (
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                              {tr(
                                m.descriptionPt,
                                m.descriptionEn ?? m.descriptionPt,
                                m.descriptionPt,
                              )}
                            </p>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                            {(m.eligibilityPt || m.eligibilityEn) && (
                              <div>
                                <span className="font-semibold text-primary text-xs uppercase tracking-wider">{t("meth.eligibility")}</span>
                                <p className="text-muted-foreground mt-1.5 leading-relaxed">
                                  {tr(
                                    m.eligibilityPt,
                                    m.eligibilityEn ?? m.eligibilityPt,
                                    m.eligibilityPt,
                                  )}
                                </p>
                              </div>
                            )}
                            {(m.mrvPt || m.mrvEn) && (
                              <div>
                                <span className="font-semibold text-primary text-xs uppercase tracking-wider">{t("meth.mrv")}</span>
                                <p className="text-muted-foreground mt-1.5 leading-relaxed">
                                  {tr(m.mrvPt, m.mrvEn ?? m.mrvPt, m.mrvPt)}
                                </p>
                              </div>
                            )}
                            {(m.additionalityPt || m.additionalityEn) && (
                              <div>
                                <span className="font-semibold text-primary text-xs uppercase tracking-wider">{t("meth.additionality")}</span>
                                <p className="text-muted-foreground mt-1.5 leading-relaxed">
                                  {tr(
                                    m.additionalityPt,
                                    m.additionalityEn ?? m.additionalityPt,
                                    m.additionalityPt,
                                  )}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="shrink-0">
                          <Link to={`/metodologias/${m.code.toLowerCase()}`}>
                            <Button variant="outline" size="sm" className="gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                              <FileText className="w-4 h-4" /> {t("meth.details")}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))
              )}
            </div>
          )}

          {response?.meta && (
            <p className="text-xs text-muted-foreground text-center mt-6">
              {tr(
                `Exibindo ${methodologies.length} de ${response.meta.total} metodologias`,
                `Showing ${methodologies.length} of ${response.meta.total} methodologies`,
                `Mostrando ${methodologies.length} de ${response.meta.total} metodologías`,
              )}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Methodologies;
