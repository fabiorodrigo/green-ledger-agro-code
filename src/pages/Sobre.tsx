import { useLanguage } from "@/i18n/LanguageContext";
import { Shield, Target, Eye, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

const i18n = {
  pt: {
    seoTitle: "Sobre a Green Ledger",
    seoDesc: "Conheça a missão, visão e valores da Green Ledger.",
    mission: { icon: Target, title: "Missão", desc: "Certificar créditos de carbono com rigor técnico, transparência e integridade ambiental, contribuindo para a confiança dos mercados voluntários e a efetividade das ações climáticas no Brasil e no mundo." },
    vision: { icon: Eye, title: "Visão", desc: "Ser a certificadora de referência na América Latina, reconhecida pela excelência técnica, governança independente e contribuição mensurável para a descarbonização da economia e a conservação de ecossistemas." },
    values: { icon: Shield, title: "Valores", desc: "Integridade científica. Transparência radical. Independência de governança. Compromisso com impacto ambiental real. Respeito às comunidades e à biodiversidade. Inovação responsável." },
  },
  en: {
    seoTitle: "About Green Ledger",
    seoDesc: "Learn about Green Ledger's mission, vision and values.",
    mission: { icon: Target, title: "Mission", desc: "Certify carbon credits with technical rigor, transparency and environmental integrity, contributing to the confidence of voluntary markets and the effectiveness of climate actions in Brazil and worldwide." },
    vision: { icon: Eye, title: "Vision", desc: "To be the reference certifier in Latin America, recognized for technical excellence, independent governance and measurable contribution to economic decarbonization and ecosystem conservation." },
    values: { icon: Shield, title: "Values", desc: "Scientific integrity. Radical transparency. Governance independence. Commitment to real environmental impact. Respect for communities and biodiversity. Responsible innovation." },
  },
  es: {
    seoTitle: "Acerca de Green Ledger",
    seoDesc: "Conozca la misión, visión y valores de Green Ledger.",
    mission: { icon: Target, title: "Misión", desc: "Certificar créditos de carbono con rigor técnico, transparencia e integridad ambiental, contribuyendo a la confianza de los mercados voluntarios y la efectividad de las acciones climáticas en Brasil y el mundo." },
    vision: { icon: Eye, title: "Visión", desc: "Ser la certificadora de referencia en América Latina, reconocida por la excelencia técnica, gobernanza independiente y contribución medible a la descarbonización económica y la conservación de ecosistemas." },
    values: { icon: Shield, title: "Valores", desc: "Integridad científica. Transparencia radical. Independencia de gobernanza. Compromiso con el impacto ambiental real. Respeto a las comunidades y la biodiversidad. Innovación responsable." },
  },
};

const Sobre = () => {
  const { t, locale } = useLanguage();
  const d = i18n[locale] || i18n.pt;
  const mvv = [d.mission, d.vision, d.values];

  return (
    <div className="pt-20">
      <SEOHead title={d.seoTitle} description={d.seoDesc} path="/sobre" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            {t("page.sobre.title")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.sobre.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.sobre.subtitle")}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mvv.map((item) => (
              <AnimatedSection key={item.title}>
                <div className="gradient-card rounded-xl p-8 border border-border shadow-card h-full">
                  <item.icon className="w-10 h-10 text-secondary mb-4" />
                  <h3 className="font-heading font-semibold text-lg text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/20">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary mb-4">
              {locale === "en" ? "Explore the Platform" : locale === "es" ? "Explore la Plataforma" : "Conheça a Plataforma"}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              {locale === "en"
                ? "Access the Green Ledger certification platform and discover how we work in practice."
                : locale === "es"
                ? "Acceda a la plataforma de certificación Green Ledger y descubra cómo trabajamos en la práctica."
                : "Acesse a plataforma de certificação Green Ledger e veja como trabalhamos na prática."}
            </p>
            <a href="https://app.greenledger.eco.br" target="_blank" rel="noopener noreferrer">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                {locale === "en" ? "Access Platform" : locale === "es" ? "Acceder a la Plataforma" : "Acessar Plataforma"} <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
