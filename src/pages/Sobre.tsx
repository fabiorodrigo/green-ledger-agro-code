import { useLanguage } from "@/i18n/LanguageContext";
import { Shield, Target, Eye } from "lucide-react";

const Sobre = () => {
  const { t } = useLanguage();
  return (
    <div className="pt-20">
      <section className="gradient-hero text-primary-foreground py-20 md:py-28">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-4">
            {t("page.sobre.title")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.sobre.title")}</h1>
          <p className="mt-6 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.sobre.subtitle")}</p>
        </div>
      </section>
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Missão", desc: "Certificar créditos de carbono com rigor técnico e transparência, contribuindo para a integridade dos mercados de carbono." },
              { icon: Eye, title: "Visão", desc: "Ser referência global em certificação de carbono multissetorial, promovendo confiança e inovação." },
              { icon: Shield, title: "Valores", desc: "Integridade, transparência, rigor científico, independência e compromisso com o impacto ambiental positivo." },
            ].map((item) => (
              <div key={item.title} className="gradient-card rounded-xl p-8 border border-border shadow-card">
                <item.icon className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-heading font-semibold text-lg text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
