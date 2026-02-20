import { useLanguage } from "@/i18n/LanguageContext";

const comunicados = [
  { date: "2026-02-15", title: "Green Ledger lança Programa Energy & Tech", summary: "Novo programa para certificação de projetos de eficiência energética e tecnologias limpas." },
  { date: "2026-01-20", title: "Consulta pública aberta: Metodologia GL-SC-003", summary: "Convidamos stakeholders a participar da revisão da nova metodologia para carbono no solo." },
  { date: "2025-12-10", title: "Parceria com VVBs internacionais", summary: "Anunciamos a aprovação de três novos organismos de verificação para auditorias independentes." },
  { date: "2025-11-05", title: "Atualização do Manual de Procedimentos", summary: "Versão 2.0 do manual de procedimentos de certificação já está disponível para download." },
];

const Comunicados = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      <section className="gradient-hero text-primary-foreground py-20 md:py-28">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-4">
            {t("page.comunicados.title")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.comunicados.title")}</h1>
          <p className="mt-6 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">
            {t("page.comunicados.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl space-y-6">
          {comunicados.map((c, i) => (
            <div key={i} className="border border-border rounded-xl p-6 hover:shadow-card transition-shadow">
              <span className="text-xs text-muted-foreground font-medium">{c.date}</span>
              <h3 className="font-heading text-lg font-semibold text-primary mt-1 mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Comunicados;
