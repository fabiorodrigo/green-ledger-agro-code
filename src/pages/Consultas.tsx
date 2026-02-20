import { useLanguage } from "@/i18n/LanguageContext";

const Consultas = () => {
  const { t } = useLanguage();
  return (
    <div className="pt-20">
      <section className="gradient-hero text-primary-foreground py-20 md:py-28">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-4">
            {t("page.consultas.title")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.consultas.title")}</h1>
          <p className="mt-6 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.consultas.subtitle")}</p>
        </div>
      </section>
      <section className="py-20">
        <div className="container max-w-3xl text-center">
          <p className="text-muted-foreground">Nenhuma consulta pública aberta no momento. Volte em breve.</p>
        </div>
      </section>
    </div>
  );
};

export default Consultas;
