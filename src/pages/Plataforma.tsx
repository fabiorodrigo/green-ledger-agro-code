import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Shield, Search, Globe, Layers, RefreshCcw, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

const features = [
  { icon: Layers, title: "Registro Digital de Projetos", desc: "Submissão e acompanhamento de projetos de forma 100% digital, com workflow automatizado para cada etapa do ciclo de certificação." },
  { icon: Search, title: "Registro Público Transparente", desc: "Base de dados aberta com todos os projetos registrados, status em tempo real, documentos de validação e verificação disponíveis para consulta." },
  { icon: BarChart3, title: "Dashboard de Monitoramento", desc: "Painel personalizado para desenvolvedores de projetos com indicadores de desempenho, alertas de prazos e visualização de dados de MRV." },
  { icon: Shield, title: "Rastreabilidade de Créditos", desc: "Cada crédito emitido recebe número de série único com rastreabilidade completa desde a emissão até aposentadoria ou cancelamento." },
  { icon: Lock, title: "Segurança e Compliance", desc: "Infraestrutura segura com criptografia de dados, controle de acesso granular e conformidade com LGPD e padrões internacionais." },
  { icon: Globe, title: "Integração com Marketplaces", desc: "Conexão direta com os principais marketplaces de créditos de carbono para facilitar a comercialização e transferência." },
  { icon: RefreshCcw, title: "API para Desenvolvedores", desc: "API RESTful documentada para integração com sistemas de terceiros, ERPs e plataformas de sustentabilidade corporativa." },
  { icon: Zap, title: "Automação de Workflow", desc: "Notificações automáticas, lembretes de prazos, fluxos de aprovação e geração automatizada de relatórios padronizados." },
];

const roadmap = [
  { quarter: "Q1 2026", items: ["Lançamento do Registro Público v1.0", "Dashboard de Monitoramento para desenvolvedores", "Portal de submissão digital de DCPs"] },
  { quarter: "Q2 2026", items: ["Integração com marketplace CBL Markets", "API pública v1.0 para consultas", "Sistema de notificações automáticas"] },
  { quarter: "Q3 2026", items: ["App mobile para monitoramento de campo", "Integração com sistemas de sensoriamento remoto", "Módulo de relatórios automáticos"] },
  { quarter: "Q4 2026", items: ["Marketplace próprio para créditos Green Ledger", "Rastreabilidade blockchain (piloto)", "Painel de impacto para compradores"] },
];

const Plataforma = () => {
  const { t } = useLanguage();
  return (
    <div className="pt-20">
      <SEOHead title="Plataforma Green Ledger" description="Conheça a plataforma digital da Green Ledger: registro de projetos, rastreabilidade de créditos, monitoramento e integração com marketplaces." path="/plataforma" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            {t("page.plataforma.title")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.plataforma.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.plataforma.subtitle")}</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-primary mb-4 text-center">Funcionalidades</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">Infraestrutura digital completa para o ciclo de vida dos créditos de carbono.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.05}>
                <div className="bg-card rounded-xl p-6 border border-border hover:shadow-card transition-shadow h-full">
                  <f.icon className="w-8 h-8 text-secondary mb-4" />
                  <h3 className="font-heading font-semibold text-primary mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-muted/20">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-primary mb-4 text-center">Roadmap</h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">Evolução planejada da plataforma para 2026.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmap.map((r, i) => (
              <AnimatedSection key={r.quarter} delay={i * 0.08}>
                <div className="border border-border rounded-xl p-6 bg-card">
                  <span className="font-heading font-bold text-secondary text-sm">{r.quarter}</span>
                  <ul className="mt-3 space-y-2">
                    {r.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary mb-4">Quer acesso antecipado?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">Entre em contato para participar do programa de acesso antecipado à plataforma Green Ledger.</p>
            <Link to="/contato">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                Solicitar Acesso <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <p className="text-xs text-muted-foreground italic text-center py-8">* Conteúdo placeholder — funcionalidades e roadmap serão atualizados.</p>
    </div>
  );
};

export default Plataforma;
