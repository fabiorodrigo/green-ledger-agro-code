import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

interface Comunicado {
  date: string;
  title: Record<string, string>;
  summary: Record<string, string>;
  content: Record<string, string>;
  category: string;
}

const comunicados: Comunicado[] = [
  {
    date: "2026-02-15", category: "Programa",
    title: { pt: "Green Ledger lança Programa Energy & Tech", en: "Green Ledger Launches Energy & Tech Program", es: "Green Ledger lanza Programa Energy & Tech" },
    summary: { pt: "Novo programa para certificação de projetos de eficiência energética e tecnologias limpas.", en: "New program for certifying energy efficiency and clean technology projects.", es: "Nuevo programa para certificación de proyectos de eficiencia energética y tecnologías limpias." },
    content: { pt: "A Green Ledger anuncia o lançamento do programa Energy & Tech, dedicado a projetos de redução de emissões por meio de biodigestores, eficiência energética, energias renováveis e tecnologias limpas. O programa conta com duas metodologias aprovadas (GL-ET-001 e GL-ET-002) e já está aberto para registro de projetos.", en: "Green Ledger announces the launch of the Energy & Tech program, dedicated to emission reduction projects through biodigesters, energy efficiency, renewable energy and clean technologies. The program has two approved methodologies (GL-ET-001 and GL-ET-002) and is now open for project registration.", es: "Green Ledger anuncia el lanzamiento del programa Energy & Tech, dedicado a proyectos de reducción de emisiones mediante biodigestores, eficiencia energética, energías renovables y tecnologías limpias. El programa cuenta con dos metodologías aprobadas (GL-ET-001 y GL-ET-002) y ya está abierto para registro de proyectos." },
  },
  {
    date: "2026-02-01", category: "Institucional",
    title: { pt: "Relatório Anual 2025 disponível para download", en: "2025 Annual Report available for download", es: "Informe Anual 2025 disponible para descarga" },
    summary: { pt: "Publicação do balanço completo de atividades, projetos e créditos emitidos em 2025.", en: "Publication of the complete activity report, projects and credits issued in 2025.", es: "Publicación del balance completo de actividades, proyectos y créditos emitidos en 2025." },
    content: { pt: "O Relatório Anual 2025 apresenta os principais resultados: 45 projetos registrados, mais de 100.000 créditos emitidos, credenciamento de 6 VVBs e expansão para 12 estados brasileiros.", en: "The 2025 Annual Report presents the main results: 45 registered projects, over 100,000 credits issued, 6 VVB accreditations and expansion to 12 Brazilian states.", es: "El Informe Anual 2025 presenta los principales resultados: 45 proyectos registrados, más de 100.000 créditos emitidos, acreditación de 6 VVBs y expansión a 12 estados brasileños." },
  },
  {
    date: "2026-01-20", category: "Consulta Pública",
    title: { pt: "Consulta pública aberta: Metodologia GL-SC-003", en: "Public consultation open: GL-SC-003 Methodology", es: "Consulta pública abierta: Metodología GL-SC-003" },
    summary: { pt: "Convidamos stakeholders a participar da revisão da nova metodologia para pastagens regenerativas.", en: "We invite stakeholders to participate in the review of the new regenerative pastures methodology.", es: "Invitamos a los stakeholders a participar en la revisión de la nueva metodología para pasturas regenerativas." },
    content: { pt: "A consulta estará aberta por 60 dias. Comentários podem ser enviados pelo portal ou por e-mail.", en: "The consultation will be open for 60 days. Comments can be submitted via the portal or by email.", es: "La consulta estará abierta por 60 días. Los comentarios pueden enviarse por el portal o por correo electrónico." },
  },
  {
    date: "2025-12-10", category: "VVBs",
    title: { pt: "Parceria com VVBs internacionais", en: "Partnership with international VVBs", es: "Alianza con VVBs internacionales" },
    summary: { pt: "Aprovação de três novos organismos de verificação para auditorias independentes.", en: "Approval of three new verification bodies for independent audits.", es: "Aprobación de tres nuevos organismos de verificación para auditorías independientes." },
    content: { pt: "A Green Ledger credenciou CarbonCheck International, TerraAssurance S.A. e ClimateGuard Verificações, elevando o total para 6 VVBs.", en: "Green Ledger accredited CarbonCheck International, TerraAssurance S.A. and ClimateGuard Verificações, bringing the total to 6 VVBs.", es: "Green Ledger acreditó a CarbonCheck International, TerraAssurance S.A. y ClimateGuard Verificações, elevando el total a 6 VVBs." },
  },
  {
    date: "2025-11-05", category: "Procedimento",
    title: { pt: "Atualização do Manual de Procedimentos v2.0", en: "Procedures Manual v2.0 Update", es: "Actualización del Manual de Procedimientos v2.0" },
    summary: { pt: "Versão 2.0 do manual de procedimentos de certificação disponível para download.", en: "Version 2.0 of the certification procedures manual available for download.", es: "Versión 2.0 del manual de procedimientos de certificación disponible para descarga." },
    content: { pt: "As principais alterações incluem digitalização do processo de submissão, novos critérios de elegibilidade e procedimentos de gestão de reclamações.", en: "Main changes include submission process digitization, new eligibility criteria and complaint management procedures.", es: "Los principales cambios incluyen digitalización del proceso de envío, nuevos criterios de elegibilidad y procedimientos de gestión de reclamaciones." },
  },
  {
    date: "2025-10-15", category: "Institucional",
    title: { pt: "Marco de 100.000 créditos emitidos", en: "100,000 credits issued milestone", es: "Hito de 100.000 créditos emitidos" },
    summary: { pt: "Green Ledger supera a marca de 100 mil créditos de carbono certificados.", en: "Green Ledger surpasses the 100,000 certified carbon credits mark.", es: "Green Ledger supera la marca de 100 mil créditos de carbono certificados." },
    content: { pt: "Os créditos foram gerados por projetos em 12 estados brasileiros, abrangendo reflorestamento, SAFs, plantio direto e biodigestores.", en: "The credits were generated by projects in 12 Brazilian states, covering reforestation, agroforestry, no-till farming and biodigesters.", es: "Los créditos fueron generados por proyectos en 12 estados brasileños, abarcando reforestación, SAFs, siembra directa y biodigestores." },
  },
  {
    date: "2025-09-01", category: "Plataforma",
    title: { pt: "Lançamento da Plataforma Digital — Fase 1", en: "Digital Platform Launch — Phase 1", es: "Lanzamiento de la Plataforma Digital — Fase 1" },
    summary: { pt: "Primeira fase com registro público de projetos e portal do desenvolvedor.", en: "First phase with public project registry and developer portal.", es: "Primera fase con registro público de proyectos y portal del desarrollador." },
    content: { pt: "A plataforma oferece rastreabilidade completa de créditos e dashboards de monitoramento.", en: "The platform offers complete credit traceability and monitoring dashboards.", es: "La plataforma ofrece trazabilidad completa de créditos y dashboards de monitoreo." },
  },
  {
    date: "2025-08-10", category: "Governança",
    title: { pt: "Alinhamento com ICVCM Core Carbon Principles", en: "Alignment with ICVCM Core Carbon Principles", es: "Alineamiento con ICVCM Core Carbon Principles" },
    summary: { pt: "Green Ledger conclui avaliação de conformidade com os princípios do ICVCM.", en: "Green Ledger completes compliance assessment with ICVCM principles.", es: "Green Ledger concluye evaluación de conformidad con los principios del ICVCM." },
    content: { pt: "A avaliação confirmou o alinhamento com os 10 princípios fundamentais de governança, emissões e desenvolvimento sustentável.", en: "The assessment confirmed alignment with the 10 fundamental principles of governance, emissions and sustainable development.", es: "La evaluación confirmó el alineamiento con los 10 principios fundamentales de gobernanza, emisiones y desarrollo sostenible." },
  },
];

const categories = [...new Set(comunicados.map((c) => c.category))];

const uiText = {
  pt: { all: "Todos", readMore: "Ler mais", close: "Fechar ↑", placeholder: "* Conteúdo placeholder — comunicados reais serão publicados conforme divulgação oficial.", seoTitle: "Comunicados e Notícias", seoDesc: "Comunicados oficiais e notícias da Green Ledger." },
  en: { all: "All", readMore: "Read more", close: "Close ↑", placeholder: "* Placeholder content — real announcements will be published as officially released.", seoTitle: "News & Announcements", seoDesc: "Official announcements and news from Green Ledger." },
  es: { all: "Todos", readMore: "Leer más", close: "Cerrar ↑", placeholder: "* Contenido placeholder — comunicados reales serán publicados según divulgación oficial.", seoTitle: "Comunicados y Noticias", seoDesc: "Comunicados oficiales y noticias de Green Ledger." },
};

const Comunicados = () => {
  const { t, locale } = useLanguage();
  const lang = locale as "pt" | "en" | "es";
  const u = uiText[lang] || uiText.pt;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = activeCategory ? comunicados.filter((c) => c.category === activeCategory) : comunicados;

  return (
    <div className="pt-20">
      <SEOHead title={u.seoTitle} description={u.seoDesc} path="/comunicados" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">{t("page.comunicados.title")}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.comunicados.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.comunicados.subtitle")}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-10">
            <button onClick={() => setActiveCategory(null)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!activeCategory ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{u.all}</button>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === cat ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{cat}</button>
            ))}
          </div>

          <div className="space-y-6">
            {filtered.map((c, i) => (
              <AnimatedSection key={c.date + c.title.pt} delay={i * 0.05}>
                <div className="border border-border rounded-xl p-6 md:p-8 hover:shadow-card transition-shadow bg-card">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {c.date}</span>
                    <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full inline-flex items-center gap-1"><Tag className="w-3 h-3" /> {c.category}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">{c.title[lang] || c.title.pt}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.summary[lang] || c.summary.pt}</p>
                  {expanded === c.title.pt ? (
                    <div className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4 mt-2">
                      {c.content[lang] || c.content.pt}
                      <button onClick={() => setExpanded(null)} className="text-secondary text-xs font-medium mt-3 block hover:underline">{u.close}</button>
                    </div>
                  ) : (
                    <button onClick={() => setExpanded(c.title.pt)} className="text-secondary text-xs font-medium hover:underline inline-flex items-center gap-1">
                      {u.readMore} <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic text-center mt-10">{u.placeholder}</p>
        </div>
      </section>
    </div>
  );
};

export default Comunicados;
