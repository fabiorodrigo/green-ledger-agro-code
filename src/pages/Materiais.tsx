import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { FileText, Download, Video, BookOpen, Newspaper, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

interface Material {
  title: string;
  description: string;
  type: "PDF" | "Vídeo" | "Artigo" | "Infográfico" | "Webinar";
  category: string;
  date: string;
}

const typeIcons = {
  PDF: FileText,
  Vídeo: Video,
  Artigo: Newspaper,
  Infográfico: BookOpen,
  Webinar: Video,
};

const materials: Material[] = [
  { title: "Guia Completo: Como Registrar um Projeto na Green Ledger", description: "Passo a passo detalhado do processo de registro, desde a documentação inicial até a aprovação do projeto.", type: "PDF", category: "Guia", date: "2026-01-15" },
  { title: "Entendendo os Créditos de Carbono: Do Básico ao Avançado", description: "Material educativo sobre o mercado de carbono, tipos de créditos, padrões internacionais e funcionamento dos mercados voluntários.", type: "PDF", category: "Educacional", date: "2025-12-20" },
  { title: "Webinar: Metodologias AFOLU — Reflorestamento e REDD+", description: "Gravação do webinar com a equipe técnica sobre as metodologias de reflorestamento, restauração e desmatamento evitado.", type: "Webinar", category: "Webinar", date: "2026-02-05" },
  { title: "Infográfico: Ciclo de Certificação Green Ledger", description: "Representação visual das 6 etapas do processo de certificação, desde o registro até a emissão de créditos.", type: "Infográfico", category: "Visual", date: "2025-11-10" },
  { title: "Artigo Técnico: Adicionalidade em Projetos de Carbono no Solo", description: "Análise técnica dos testes de adicionalidade aplicáveis a projetos de carbono no solo, com exemplos práticos.", type: "Artigo", category: "Técnico", date: "2025-10-25" },
  { title: "Manual do Desenvolvedor de Projetos", description: "Guia abrangente para desenvolvedores de projetos com orientações sobre DCP, monitoramento, relatórios e verificação.", type: "PDF", category: "Guia", date: "2026-01-08" },
  { title: "Webinar: Integração Lavoura-Pecuária-Floresta e Créditos de Carbono", description: "Apresentação sobre as oportunidades de geração de créditos em sistemas ILPF, com casos reais.", type: "Webinar", category: "Webinar", date: "2025-12-15" },
  { title: "FAQ: Perguntas Frequentes sobre Certificação", description: "Compilação das perguntas mais comuns sobre o processo de certificação, tarifas, prazos e requisitos.", type: "PDF", category: "Educacional", date: "2025-11-20" },
  { title: "Artigo: O Papel dos VVBs na Integridade dos Créditos", description: "Discussão sobre a importância dos organismos de validação e verificação independentes no ecossistema de carbono.", type: "Artigo", category: "Técnico", date: "2025-09-30" },
  { title: "Infográfico: Salvaguardas Ambientais e Sociais", description: "Resumo visual das salvaguardas exigidas pela Green Ledger para proteção ambiental e direitos das comunidades.", type: "Infográfico", category: "Visual", date: "2026-01-22" },
  { title: "Webinar: Monitoramento com Sensoriamento Remoto", description: "Demonstração das técnicas de monitoramento por satélite utilizadas em projetos AFOLU e REDD+.", type: "Webinar", category: "Webinar", date: "2026-02-10" },
  { title: "Relatório Anual Green Ledger 2025", description: "Balanço das atividades, projetos registrados, créditos emitidos e evolução do programa no ano de 2025.", type: "PDF", category: "Relatório", date: "2026-02-01" },
];

const categories = [...new Set(materials.map((m) => m.category))];

const Materiais = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = materials.filter((m) => {
    const matchSearch = !search || m.title.toLowerCase().includes(search.toLowerCase()) || m.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = !activeCategory || m.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="pt-20">
      <SEOHead title="Central de Materiais" description="Acesse guias, webinars, artigos técnicos e materiais educativos sobre certificação de créditos de carbono." path="/materiais" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            {t("page.materiais.title")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.materiais.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.materiais.subtitle")}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          {/* Search + Filters */}
          <div className="mb-10 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar materiais..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCategory(null)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!activeCategory ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                Todos
              </button>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === cat ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((m, i) => {
              const Icon = typeIcons[m.type];
              return (
                <AnimatedSection key={m.title} delay={i * 0.04}>
                  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-shadow h-full flex flex-col cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-5 h-5 text-secondary" />
                      <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{m.type}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{m.date}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-primary text-sm mb-2 flex-1">{m.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{m.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">{m.category}</span>
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">Nenhum material encontrado com os filtros aplicados.</p>
          )}

          <p className="text-xs text-muted-foreground italic text-center mt-12">* Conteúdo placeholder — materiais reais serão disponibilizados em breve.</p>
        </div>
      </section>
    </div>
  );
};

export default Materiais;
