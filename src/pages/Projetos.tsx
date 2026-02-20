import { Link } from "react-router-dom";
import { ArrowRight, FileCheck, ClipboardList, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const Projetos = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: ClipboardList, title: "Registro", desc: "O desenvolvedor submete a documentação do projeto (PDD) na plataforma Green Ledger." },
    { icon: FileCheck, title: "Validação", desc: "Um VVB aprovado realiza a análise de elegibilidade e verificação documental." },
    { icon: BarChart3, title: "Monitoramento", desc: "Acompanhamento contínuo com MRV (Mensuração, Relato e Verificação)." },
    { icon: Users, title: "Verificação", desc: "Auditoria independente dos resultados por organismo credenciado." },
  ];

  return (
    <div className="pt-20">
      <section className="gradient-hero text-primary-foreground py-20 md:py-28">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-4">
            {t("page.projetos.title")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.projetos.title")}</h1>
          <p className="mt-6 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">
            {t("page.projetos.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-3xl font-bold text-primary mb-10 text-center">Ciclo de Certificação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="gradient-card rounded-xl p-6 border border-border shadow-card">
                <s.icon className="w-8 h-8 text-secondary mb-3" />
                <h3 className="font-heading font-semibold text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="https://app.greenledger.com" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                {t("page.projetos.cta")} <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projetos;
