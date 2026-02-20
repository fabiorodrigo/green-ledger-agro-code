import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { FileText, Download, Video, BookOpen, Newspaper, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

type MatType = "PDF" | "Vídeo" | "Artigo" | "Infográfico" | "Webinar";

interface Material {
  title: Record<string, string>;
  description: Record<string, string>;
  type: MatType;
  category: Record<string, string>;
  date: string;
}

const typeIcons: Record<MatType, typeof FileText> = { PDF: FileText, Vídeo: Video, Artigo: Newspaper, Infográfico: BookOpen, Webinar: Video };

const materials: Material[] = [
  { title: { pt: "Guia Completo: Como Registrar um Projeto na Green Ledger", en: "Complete Guide: How to Register a Project at Green Ledger", es: "Guía Completa: Cómo Registrar un Proyecto en Green Ledger" }, description: { pt: "Passo a passo detalhado do processo de registro, desde a documentação inicial até a aprovação do projeto.", en: "Step-by-step detailed registration process, from initial documentation to project approval.", es: "Paso a paso detallado del proceso de registro, desde la documentación inicial hasta la aprobación del proyecto." }, type: "PDF", category: { pt: "Guia", en: "Guide", es: "Guía" }, date: "2026-01-15" },
  { title: { pt: "Entendendo os Créditos de Carbono: Do Básico ao Avançado", en: "Understanding Carbon Credits: From Basics to Advanced", es: "Entendiendo los Créditos de Carbono: De lo Básico a lo Avanzado" }, description: { pt: "Material educativo sobre o mercado de carbono, tipos de créditos e padrões internacionais.", en: "Educational material about the carbon market, credit types and international standards.", es: "Material educativo sobre el mercado de carbono, tipos de créditos y estándares internacionales." }, type: "PDF", category: { pt: "Educacional", en: "Educational", es: "Educativo" }, date: "2025-12-20" },
  { title: { pt: "Webinar: Metodologias AFOLU — Reflorestamento e REDD+", en: "Webinar: AFOLU Methodologies — Reforestation and REDD+", es: "Webinar: Metodologías AFOLU — Reforestación y REDD+" }, description: { pt: "Gravação do webinar com a equipe técnica sobre metodologias de reflorestamento e desmatamento evitado.", en: "Webinar recording with the technical team on reforestation and avoided deforestation methodologies.", es: "Grabación del webinar con el equipo técnico sobre metodologías de reforestación y deforestación evitada." }, type: "Webinar", category: { pt: "Webinar", en: "Webinar", es: "Webinar" }, date: "2026-02-05" },
  { title: { pt: "Infográfico: Ciclo de Certificação Green Ledger", en: "Infographic: Green Ledger Certification Cycle", es: "Infografía: Ciclo de Certificación Green Ledger" }, description: { pt: "Representação visual das 6 etapas do processo de certificação.", en: "Visual representation of the 6 certification process stages.", es: "Representación visual de las 6 etapas del proceso de certificación." }, type: "Infográfico", category: { pt: "Visual", en: "Visual", es: "Visual" }, date: "2025-11-10" },
  { title: { pt: "Artigo Técnico: Adicionalidade em Projetos de Carbono no Solo", en: "Technical Article: Additionality in Soil Carbon Projects", es: "Artículo Técnico: Adicionalidad en Proyectos de Carbono en el Suelo" }, description: { pt: "Análise técnica dos testes de adicionalidade aplicáveis a projetos de carbono no solo.", en: "Technical analysis of additionality tests applicable to soil carbon projects.", es: "Análisis técnico de las pruebas de adicionalidad aplicables a proyectos de carbono en el suelo." }, type: "Artigo", category: { pt: "Técnico", en: "Technical", es: "Técnico" }, date: "2025-10-25" },
  { title: { pt: "Manual do Desenvolvedor de Projetos", en: "Project Developer Manual", es: "Manual del Desarrollador de Proyectos" }, description: { pt: "Guia abrangente para desenvolvedores com orientações sobre DCP, monitoramento e verificação.", en: "Comprehensive guide for developers with guidance on PDD, monitoring and verification.", es: "Guía integral para desarrolladores con orientaciones sobre DCP, monitoreo y verificación." }, type: "PDF", category: { pt: "Guia", en: "Guide", es: "Guía" }, date: "2026-01-08" },
  { title: { pt: "Webinar: ILPF e Créditos de Carbono", en: "Webinar: CLFI and Carbon Credits", es: "Webinar: ILPF y Créditos de Carbono" }, description: { pt: "Apresentação sobre oportunidades de geração de créditos em sistemas ILPF.", en: "Presentation on credit generation opportunities in CLFI systems.", es: "Presentación sobre oportunidades de generación de créditos en sistemas ILPF." }, type: "Webinar", category: { pt: "Webinar", en: "Webinar", es: "Webinar" }, date: "2025-12-15" },
  { title: { pt: "FAQ: Perguntas Frequentes sobre Certificação", en: "FAQ: Certification Frequently Asked Questions", es: "FAQ: Preguntas Frecuentes sobre Certificación" }, description: { pt: "Compilação das perguntas mais comuns sobre o processo de certificação.", en: "Compilation of the most common questions about the certification process.", es: "Compilación de las preguntas más comunes sobre el proceso de certificación." }, type: "PDF", category: { pt: "Educacional", en: "Educational", es: "Educativo" }, date: "2025-11-20" },
  { title: { pt: "Artigo: O Papel dos VVBs na Integridade dos Créditos", en: "Article: The Role of VVBs in Credit Integrity", es: "Artículo: El Papel de los VVBs en la Integridad de los Créditos" }, description: { pt: "Discussão sobre a importância dos VVBs independentes no ecossistema de carbono.", en: "Discussion on the importance of independent VVBs in the carbon ecosystem.", es: "Discusión sobre la importancia de los VVBs independientes en el ecosistema de carbono." }, type: "Artigo", category: { pt: "Técnico", en: "Technical", es: "Técnico" }, date: "2025-09-30" },
  { title: { pt: "Infográfico: Salvaguardas Ambientais e Sociais", en: "Infographic: Environmental and Social Safeguards", es: "Infografía: Salvaguardas Ambientales y Sociales" }, description: { pt: "Resumo visual das salvaguardas exigidas pela Green Ledger.", en: "Visual summary of safeguards required by Green Ledger.", es: "Resumen visual de las salvaguardas exigidas por Green Ledger." }, type: "Infográfico", category: { pt: "Visual", en: "Visual", es: "Visual" }, date: "2026-01-22" },
  { title: { pt: "Webinar: Monitoramento com Sensoriamento Remoto", en: "Webinar: Monitoring with Remote Sensing", es: "Webinar: Monitoreo con Teledetección" }, description: { pt: "Demonstração das técnicas de monitoramento por satélite em projetos AFOLU.", en: "Demonstration of satellite monitoring techniques in AFOLU projects.", es: "Demostración de técnicas de monitoreo por satélite en proyectos AFOLU." }, type: "Webinar", category: { pt: "Webinar", en: "Webinar", es: "Webinar" }, date: "2026-02-10" },
  { title: { pt: "Relatório Anual Green Ledger 2025", en: "Green Ledger Annual Report 2025", es: "Informe Anual Green Ledger 2025" }, description: { pt: "Balanço de atividades, projetos registrados e créditos emitidos em 2025.", en: "Summary of activities, registered projects and credits issued in 2025.", es: "Balance de actividades, proyectos registrados y créditos emitidos en 2025." }, type: "PDF", category: { pt: "Relatório", en: "Report", es: "Informe" }, date: "2026-02-01" },
];

const ui = {
  pt: { seoTitle: "Central de Materiais", seoDesc: "Guias, webinars, artigos técnicos e materiais educativos.", search: "Buscar materiais...", all: "Todos", empty: "Nenhum material encontrado com os filtros aplicados.", placeholder: "* Conteúdo placeholder — materiais reais serão disponibilizados em breve." },
  en: { seoTitle: "Resource Center", seoDesc: "Guides, webinars, technical articles and educational materials.", search: "Search materials...", all: "All", empty: "No materials found matching the filters.", placeholder: "* Placeholder content — real materials will be available soon." },
  es: { seoTitle: "Centro de Materiales", seoDesc: "Guías, webinars, artículos técnicos y materiales educativos.", search: "Buscar materiales...", all: "Todos", empty: "No se encontraron materiales con los filtros aplicados.", placeholder: "* Contenido placeholder — materiales reales serán disponibilizados pronto." },
};

const Materiais = () => {
  const { t, locale } = useLanguage();
  const lang = locale as "pt" | "en" | "es";
  const u = ui[lang] || ui.pt;
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [...new Set(materials.map((m) => m.category[lang] || m.category.pt))];

  const filtered = materials.filter((m) => {
    const title = m.title[lang] || m.title.pt;
    const desc = m.description[lang] || m.description.pt;
    const cat = m.category[lang] || m.category.pt;
    const matchSearch = !search || title.toLowerCase().includes(search.toLowerCase()) || desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = !activeCategory || cat === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="pt-20">
      <SEOHead title={u.seoTitle} description={u.seoDesc} path="/materiais" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">{t("page.materiais.title")}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.materiais.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.materiais.subtitle")}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <div className="mb-10 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder={u.search} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCategory(null)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!activeCategory ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{u.all}</button>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === cat ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{cat}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((m, i) => {
              const Icon = typeIcons[m.type];
              return (
                <AnimatedSection key={m.title.pt} delay={i * 0.04}>
                  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-shadow h-full flex flex-col cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-5 h-5 text-secondary" />
                      <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{m.type}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{m.date}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-primary text-sm mb-2 flex-1">{m.title[lang] || m.title.pt}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{m.description[lang] || m.description.pt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">{m.category[lang] || m.category.pt}</span>
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">{u.empty}</p>}
          <p className="text-xs text-muted-foreground italic text-center mt-12">{u.placeholder}</p>
        </div>
      </section>
    </div>
  );
};

export default Materiais;
