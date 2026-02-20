import { useState, useMemo } from "react";
import { Search, FileText, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

type ProjectStatus = "Registrado" | "Validação" | "Verificação" | "Créditos Emitidos" | "Suspenso";

interface RegistryProject {
  id: string;
  name: string;
  nameEn: string;
  developer: string;
  program: string;
  methodology: string;
  status: ProjectStatus;
  credits: number;
  registrationDate: string;
  region: string;
}

const statusColors: Record<ProjectStatus, string> = {
  "Registrado": "bg-muted text-muted-foreground",
  "Validação": "bg-accent/20 text-accent-foreground",
  "Verificação": "bg-secondary/15 text-secondary",
  "Créditos Emitidos": "bg-secondary/20 text-secondary",
  "Suspenso": "bg-destructive/10 text-destructive",
};

const statusEn: Record<ProjectStatus, string> = {
  "Registrado": "Registered",
  "Validação": "Validation",
  "Verificação": "Verification",
  "Créditos Emitidos": "Credits Issued",
  "Suspenso": "Suspended",
};

const projects: RegistryProject[] = [
  { id: "GL-2024-001", name: "Restauração Florestal Serra da Mantiqueira", nameEn: "Serra da Mantiqueira Forest Restoration", developer: "Instituto Verde Vida", program: "AFOLU", methodology: "GL-AFOLU-001", status: "Créditos Emitidos", credits: 45200, registrationDate: "2024-01-15", region: "MG, Brasil" },
  { id: "GL-2024-002", name: "SAF Comunidades Ribeirinhas", nameEn: "Riverside Communities Agroforestry", developer: "Cooperativa AgroVerde", program: "AFOLU", methodology: "GL-AFOLU-002", status: "Verificação", credits: 0, registrationDate: "2024-03-22", region: "PA, Brasil" },
  { id: "GL-2024-003", name: "Proteção Florestal Amazônia Central", nameEn: "Central Amazon Forest Protection", developer: "Fundação Amazônia Viva", program: "AFOLU", methodology: "GL-AFOLU-003", status: "Validação", credits: 0, registrationDate: "2024-05-10", region: "AM, Brasil" },
  { id: "GL-2024-004", name: "Plantio Direto Cerrado", nameEn: "Cerrado No-Till Farming", developer: "Fazendas Sustentáveis S.A.", program: "Soil Carbon", methodology: "GL-SC-001", status: "Créditos Emitidos", credits: 18750, registrationDate: "2024-02-08", region: "GO, Brasil" },
  { id: "GL-2024-005", name: "ILPF Triângulo Mineiro", nameEn: "Triângulo Mineiro CLFI", developer: "Agropecuária Integra", program: "Soil Carbon", methodology: "GL-SC-002", status: "Registrado", credits: 0, registrationDate: "2024-07-19", region: "MG, Brasil" },
  { id: "GL-2024-006", name: "Biodigestor Suinocultura SC", nameEn: "SC Swine Biodigester", developer: "BioEnergy Resíduos", program: "Energy & Tech", methodology: "GL-ET-001", status: "Créditos Emitidos", credits: 32400, registrationDate: "2024-01-30", region: "SC, Brasil" },
  { id: "GL-2024-007", name: "Eficiência Energética Industrial SP", nameEn: "SP Industrial Energy Efficiency", developer: "TechClean Indústria", program: "Energy & Tech", methodology: "GL-ET-002", status: "Validação", credits: 0, registrationDate: "2024-06-12", region: "SP, Brasil" },
  { id: "GL-2024-008", name: "Restauração Mata Atlântica Litoral", nameEn: "Atlantic Forest Coast Restoration", developer: "ONG Floresta Viva", program: "AFOLU", methodology: "GL-AFOLU-001", status: "Verificação", credits: 0, registrationDate: "2024-04-05", region: "BA, Brasil" },
];

const allStatuses: ProjectStatus[] = ["Registrado", "Validação", "Verificação", "Créditos Emitidos", "Suspenso"];
const allPrograms = ["AFOLU", "Soil Carbon", "Energy & Tech"];

const RegistroPublico = () => {
  const { t, locale } = useLanguage();
  const isEn = locale === "en";
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [programFilter, setProgramFilter] = useState<string>("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const name = isEn ? p.nameEn : p.name;
      const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()) || p.developer.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || p.status === statusFilter;
      const matchProgram = !programFilter || p.program === programFilter;
      return matchSearch && matchStatus && matchProgram;
    });
  }, [search, statusFilter, programFilter, isEn]);

  const totalCredits = projects.filter((p) => p.status === "Créditos Emitidos").reduce((s, p) => s + p.credits, 0);

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
              <span className="font-heading text-3xl font-bold text-secondary">{projects.length}</span>
              <p className="text-sm text-muted-foreground mt-1">{t("registry.total.projects")}</p>
            </div>
            <div className="text-center">
              <span className="font-heading text-3xl font-bold text-secondary">{totalCredits.toLocaleString()}</span>
              <p className="text-sm text-muted-foreground mt-1">{t("registry.total.credits")}</p>
            </div>
            <div className="text-center">
              <span className="font-heading text-3xl font-bold text-secondary">{allPrograms.length}</span>
              <p className="text-sm text-muted-foreground mt-1">{t("registry.total.programs")}</p>
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
              {allStatuses.map((s) => (
                <option key={s} value={s}>{isEn ? statusEn[s] : s}</option>
              ))}
            </select>
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground"
            >
              <option value="">{t("registry.all.programs")}</option>
              {allPrograms.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <AnimatedSection>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="text-left p-4 font-semibold text-primary text-xs uppercase tracking-wider">{t("registry.id")}</th>
                    <th className="text-left p-4 font-semibold text-primary text-xs uppercase tracking-wider">{t("registry.project")}</th>
                    <th className="text-left p-4 font-semibold text-primary text-xs uppercase tracking-wider hidden md:table-cell">{t("registry.developer")}</th>
                    <th className="text-left p-4 font-semibold text-primary text-xs uppercase tracking-wider hidden lg:table-cell">{t("registry.program")}</th>
                    <th className="text-left p-4 font-semibold text-primary text-xs uppercase tracking-wider">{t("registry.status")}</th>
                    <th className="text-right p-4 font-semibold text-primary text-xs uppercase tracking-wider hidden md:table-cell">{t("registry.credits")}</th>
                    <th className="text-center p-4 font-semibold text-primary text-xs uppercase tracking-wider">{t("registry.docs")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-border hover:bg-muted/10 transition-colors">
                      <td className="p-4 font-mono text-xs text-secondary font-medium">{p.id}</td>
                      <td className="p-4">
                        <div className="font-medium text-primary">{isEn ? p.nameEn : p.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{p.region} · {p.methodology}</div>
                      </td>
                      <td className="p-4 text-muted-foreground hidden md:table-cell">{p.developer}</td>
                      <td className="p-4 hidden lg:table-cell">
                        <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">{p.program}</span>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[p.status]}`}>
                          {isEn ? statusEn[p.status] : p.status}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono text-muted-foreground hidden md:table-cell">
                        {p.credits > 0 ? p.credits.toLocaleString() : "—"}
                      </td>
                      <td className="p-4 text-center">
                        <button className="text-muted-foreground hover:text-secondary transition-colors" title={isEn ? "View documents" : "Ver documentos"}>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
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

          <p className="text-xs text-muted-foreground italic text-center mt-8">
            {isEn ? "* Placeholder data — real projects will be published upon registration." : "* Dados placeholder — projetos reais serão publicados após registro."}
          </p>
        </div>
      </section>
    </div>
  );
};

export default RegistroPublico;
