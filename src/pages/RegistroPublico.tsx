import { useState, useMemo } from "react";
import { Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePublicProjects, usePublicStatistics } from "@/hooks/usePublicAPI";
import { getStatusLabel, getStatusColor } from "@/constants/projectStatus";
import { getSectorLabel } from "@/constants/methodologyLabels";

const PUBLIC_STATUSES = [
  "LISTED", "IN_VALIDATION", "VALIDATED", "IN_EXECUTION",
  "IN_MONITORING", "IN_VERIFICATION", "VERIFIED", "ACTIVE", "FINALIZED", "SUSPENDED",
];

const RegistroPublico = () => {
  const { t, locale } = useLanguage();
  const isEn = locale === "en";
  const lang = locale as "pt" | "en" | "es";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [solutionFilter, setSolutionFilter] = useState<string>("");

  const { data: projectsResponse, loading, error } = usePublicProjects({ limit: 100, search: search || undefined, solutionType: solutionFilter || undefined });
  const { data: stats } = usePublicStatistics();

  const projects = projectsResponse?.data ?? [];

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchStatus = !statusFilter || p.status === statusFilter;
      return matchStatus;
    });
  }, [projects, statusFilter]);

  return (
    <div className="pt-20">
      <SEOHead
        title={t("registry.hero.title")}
        description={t("registry.hero.desc")}
        path="/registro-publico"
      />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            {t("registry.hero.tag")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("registry.hero.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("registry.hero.desc")}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <span className="font-heading text-3xl font-bold text-secondary">
                {stats?.totalProjects ?? (loading ? "—" : projects.length)}
              </span>
              <p className="text-sm text-muted-foreground mt-1">{t("registry.total.projects")}</p>
            </div>
            <div className="text-center">
              <span className="font-heading text-3xl font-bold text-secondary">
                {stats?.totalCreditsIssued?.toLocaleString() ?? "—"}
              </span>
              <p className="text-sm text-muted-foreground mt-1">{t("registry.total.credits")}</p>
            </div>
            <div className="text-center">
              <span className="font-heading text-3xl font-bold text-secondary">
                {stats?.totalOrganizations ?? "—"}
              </span>
              <p className="text-sm text-muted-foreground mt-1">
                {isEn ? "Active Organizations" : "Organizações Ativas"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("registry.search.placeholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground"
            >
              <option value="">{t("registry.all.status")}</option>
              {PUBLIC_STATUSES.map((s) => (
                <option key={s} value={s}>{getStatusLabel(s, lang)}</option>
              ))}
            </select>
            <select
              value={solutionFilter}
              onChange={(e) => setSolutionFilter(e.target.value)}
              className="border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground"
            >
              <option value="">{t("registry.all.programs")}</option>
              <option value="NBS">{isEn ? "Nature-Based (NBS)" : "Base Natural (NBS)"}</option>
              <option value="TBS">{isEn ? "Technology-Based (TBS)" : "Base Tecnológica (TBS)"}</option>
            </select>
          </div>

          {/* Loading / Error */}
          {loading && (
            <div className="text-center py-16 text-muted-foreground">
              {isEn ? "Loading projects..." : "Carregando projetos..."}
            </div>
          )}
          {error && (
            <div className="text-center py-16 text-muted-foreground text-sm">
              {isEn
                ? "Unable to load projects from the platform at this time."
                : "Não foi possível carregar os projetos da plataforma no momento."}
            </div>
          )}

          {/* Table */}
          {!loading && !error && (
            <AnimatedSection>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border">
                      <th className="text-left p-4 font-semibold text-primary text-xs uppercase tracking-wider">{t("registry.id")}</th>
                      <th className="text-left p-4 font-semibold text-primary text-xs uppercase tracking-wider">{t("registry.project")}</th>
                      <th className="text-left p-4 font-semibold text-primary text-xs uppercase tracking-wider hidden md:table-cell">{t("registry.developer")}</th>
                      <th className="text-left p-4 font-semibold text-primary text-xs uppercase tracking-wider hidden lg:table-cell">
                        {isEn ? "Sector" : "Setor"}
                      </th>
                      <th className="text-left p-4 font-semibold text-primary text-xs uppercase tracking-wider">{t("registry.status")}</th>
                      <th className="text-right p-4 font-semibold text-primary text-xs uppercase tracking-wider hidden md:table-cell">{t("registry.credits")}</th>
                      <th className="text-center p-4 font-semibold text-primary text-xs uppercase tracking-wider">{t("registry.docs")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p) => (
                      <tr key={p.id} className="border-b border-border hover:bg-muted/10 transition-colors">
                        <td className="p-4 font-mono text-xs text-secondary font-medium">{p.code}</td>
                        <td className="p-4">
                          <div className="font-medium text-primary">{p.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {p.locationDescription} · {p.methodology?.code}
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground hidden md:table-cell">{p.organization?.name}</td>
                        <td className="p-4 hidden lg:table-cell">
                          <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">
                            {getSectorLabel(p.sector, lang)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getStatusColor(p.status)}`}>
                            {getStatusLabel(p.status, lang)}
                          </span>
                        </td>
                        <td className="p-4 text-right font-mono text-muted-foreground hidden md:table-cell">
                          {p.estimatedReductions ? p.estimatedReductions.toLocaleString() : "—"}
                        </td>
                        <td className="p-4 text-center">
                          <a
                            href={`https://app.greenledger.eco.br/public/assets?project=${p.code}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-secondary transition-colors inline-block"
                            title={isEn ? "View on platform" : "Ver na plataforma"}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && !loading && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-muted-foreground">
                          {isEn ? "No projects found matching the filters." : "Nenhum projeto encontrado com os filtros aplicados."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </AnimatedSection>
          )}

          {projectsResponse?.meta && (
            <p className="text-xs text-muted-foreground text-center mt-4">
              {isEn
                ? `Showing ${filtered.length} of ${projectsResponse.meta.total} projects`
                : `Exibindo ${filtered.length} de ${projectsResponse.meta.total} projetos`}
            </p>
          )}

          <div className="mt-12 text-center">
            <a
              href="https://app.greenledger.eco.br/public/assets"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                {isEn ? "View Full Registry on Platform" : "Ver Registro Completo na Plataforma"} <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistroPublico;
