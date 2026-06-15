import { useState, useMemo } from "react";
import { FileText, Download, BookOpen, ClipboardList, Search, Shield, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

const categories = [
  {
    key: "methodologies",
    labelPt: "Metodologias",
    labelEn: "Methodologies",
    labelEs: "Metodologías",
    icon: FileText,
    items: [
      { title: "GL-AFOLU-001 — Reflorestamento e Restauração", titleEn: "GL-AFOLU-001 — Reforestation and Restoration", titleEs: "GL-AFOLU-001 — Reforestación y Restauración", version: "v2.1", tags: ["AFOLU", "Reflorestamento"] },
      { title: "GL-AFOLU-002 — Sistemas Agroflorestais", titleEn: "GL-AFOLU-002 — Agroforestry Systems", titleEs: "GL-AFOLU-002 — Sistemas Agroforestales", version: "v1.2", tags: ["AFOLU", "SAF"] },
      { title: "GL-AFOLU-003 — REDD+", titleEn: "GL-AFOLU-003 — REDD+", titleEs: "GL-AFOLU-003 — REDD+", version: "v1.0", tags: ["AFOLU", "REDD+"] },
      { title: "GL-SC-001 — Plantio Direto", titleEn: "GL-SC-001 — No-Till Farming", titleEs: "GL-SC-001 — Siembra Directa", version: "v1.3", tags: ["Soil Carbon"] },
      { title: "GL-SC-002 — ILPF", titleEn: "GL-SC-002 — CLFI", titleEs: "GL-SC-002 — ILPF", version: "v1.0", tags: ["Soil Carbon", "ILPF"] },
      { title: "GL-ET-001 — Biodigestores e Tratamento de Resíduos", titleEn: "GL-ET-001 — Biodigesters and Waste Treatment", titleEs: "GL-ET-001 — Biodigestores y Tratamiento de Residuos", version: "v2.0", tags: ["Energy & Tech"] },
      { title: "GL-ET-002 — Eficiência Energética", titleEn: "GL-ET-002 — Energy Efficiency", titleEs: "GL-ET-002 — Eficiencia Energética", version: "v1.0", tags: ["Energy & Tech"] },
    ],
  },
  {
    key: "templates",
    labelPt: "Templates",
    labelEn: "Templates",
    labelEs: "Plantillas",
    icon: ClipboardList,
    items: [
      { title: "Template — Documento de Concepção do Projeto (DCP)", titleEn: "Template — Project Design Document (PDD)", titleEs: "Plantilla — Documento de Diseño del Proyecto (DDP)", version: "v1.0", tags: ["Template"] },
      { title: "Template — Relatório de Monitoramento", titleEn: "Template — Monitoring Report", titleEs: "Plantilla — Informe de Monitoreo", version: "v1.0", tags: ["Template"] },
      { title: "Template — Relatório de Validação", titleEn: "Template — Validation Report", titleEs: "Plantilla — Informe de Validación", version: "v1.0", tags: ["Template"] },
      { title: "Template — Relatório de Verificação", titleEn: "Template — Verification Report", titleEs: "Plantilla — Informe de Verificación", version: "v1.0", tags: ["Template"] },
    ],
  },
  {
    key: "guides",
    labelPt: "Guias",
    labelEn: "Guides",
    labelEs: "Guías",
    icon: BookOpen,
    items: [
      { title: "Guia do Desenvolvedor de Projetos", titleEn: "Project Developer Guide", titleEs: "Guía del Desarrollador de Proyectos", version: "v1.0", tags: ["Guia"] },
      { title: "Guia de Credenciamento de Auditores", titleEn: "Auditor Accreditation Guide", titleEs: "Guía de Acreditación de Auditores", version: "v1.0", tags: ["Guia", "VVB"] },
      { title: "Manual do Portal do Cliente", titleEn: "Client Portal Manual", titleEs: "Manual del Portal del Cliente", version: "v1.0", tags: ["Guia"] },
      { title: "Guia de Consulta Pública", titleEn: "Public Consultation Guide", titleEs: "Guía de Consulta Pública", version: "v1.0", tags: ["Guia"] },
    ],
  },
  {
    key: "governance",
    labelPt: "Governança",
    labelEn: "Governance",
    labelEs: "Gobernanza",
    icon: Shield,
    items: [
      { title: "Política de Integridade", titleEn: "Integrity Policy", titleEs: "Política de Integridad", version: "v1.0", tags: ["Governança"] },
      { title: "Regimento do Conselho Técnico", titleEn: "Technical Council Rules", titleEs: "Reglamento del Consejo Técnico", version: "v1.0", tags: ["Governança"] },
      { title: "Procedimento de Reclamações e Apelações", titleEn: "Complaints and Appeals Procedure", titleEs: "Procedimiento de Reclamaciones y Apelaciones", version: "v1.0", tags: ["Governança"] },
    ],
  },
  {
    key: "procedures",
    labelPt: "Procedimentos",
    labelEn: "Procedures",
    labelEs: "Procedimientos",
    icon: Settings,
    items: [
      { title: "Procedimento de Registro de Projetos", titleEn: "Project Registration Procedure", titleEs: "Procedimiento de Registro de Proyectos", version: "v1.0", tags: ["Procedimento"] },
      { title: "Procedimento de Credenciamento de VVBs", titleEn: "VVB Accreditation Procedure", titleEs: "Procedimiento de Acreditación de VVBs", version: "v1.0", tags: ["Procedimento", "VVB"] },
      { title: "Procedimento de Emissão de Créditos", titleEn: "Credit Issuance Procedure", titleEs: "Procedimiento de Emisión de Créditos", version: "v1.0", tags: ["Procedimento"] },
    ],
  },
];

const Documentation = () => {
  const { t, tr } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return categories
      .filter((cat) => !activeCategory || cat.key === activeCategory)
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          const title = tr(item.title, item.titleEn, item.titleEs);
          return title.toLowerCase().includes(search.toLowerCase()) || item.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
        }),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [search, activeCategory, tr]);

  return (
    <div className="pt-20">
      <SEOHead
        title={t("doc.hero.title")}
        description={t("doc.hero.desc")}
        path="/documentacao"
      />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            {t("doc.hero.tag")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("doc.hero.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("doc.hero.desc")}</p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container max-w-5xl">
          {/* Search & filters */}
          <div className="mb-12 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("doc.search.placeholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!activeCategory ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                {t("doc.all")}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === cat.key ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                >
                  {tr(cat.labelPt, cat.labelEn, cat.labelEs)}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-12">
            {filtered.map((section) => (
              <AnimatedSection key={section.key}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <section.icon className="w-6 h-6 text-secondary" />
                    <h2 className="font-heading text-2xl font-bold text-primary">{tr(section.labelPt, section.labelEn, section.labelEs)}</h2>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{section.items.length}</span>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div
                        key={tr(item.title, item.titleEn, item.titleEs)}
                        className="flex items-center justify-between p-4 rounded-lg border border-border hover:shadow-card transition-shadow bg-card cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-primary">{tr(item.title, item.titleEn, item.titleEs)}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{item.version}</span>
                              {item.tags.map((tag) => (
                                <span key={tag} className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground">{tag}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Download className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <p className="text-xs text-muted-foreground italic text-center mt-12">
            {t("doc.placeholder")}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
