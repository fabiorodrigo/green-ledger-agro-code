import { Link } from "react-router-dom";
import { ArrowRight, Shield, FileCheck, BarChart3, Users, Leaf, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";

const programs = [
  {
    title: "Green Ledger AFOLU",
    desc: "Agricultura, Florestas e Outros Usos do Solo. Cobertura integral de atividades de remoção e redução de emissões no setor agropecuário e florestal.",
    icon: Leaf,
  },
  {
    title: "Green Ledger Soil Carbon",
    desc: "Sequestro de carbono no solo por meio de práticas regenerativas, manejo conservacionista e sistemas integrados de produção.",
    icon: Globe,
  },
  {
    title: "Green Ledger AgroTech",
    desc: "Metodologias para tecnologias agrícolas inovadoras que reduzem emissões: biodigestores, fertirrigação inteligente e agricultura de precisão.",
    icon: BarChart3,
  },
];

const steps = [
  { num: "01", title: "Registro", desc: "Submissão do projeto e documentação inicial." },
  { num: "02", title: "Validação", desc: "Análise técnica e verificação de elegibilidade." },
  { num: "03", title: "Monitoramento", desc: "Acompanhamento contínuo com MRV." },
  { num: "04", title: "Verificação", desc: "Auditoria independente dos resultados." },
  { num: "05", title: "Emissão", desc: "Créditos de carbono certificados e rastreáveis." },
];

const faqs = [
  { q: "O que são créditos de carbono certificados?", a: "São unidades verificadas que representam uma tonelada métrica de CO₂ equivalente removida ou evitada, emitidas por uma certificadora independente seguindo metodologias rigorosas." },
  { q: "Quem pode registrar um projeto na Green Ledger?", a: "Produtores rurais, cooperativas, empresas do agronegócio e desenvolvedores de projetos que implementem atividades de redução ou remoção de emissões no setor agropecuário." },
  { q: "Quanto tempo leva o processo de certificação?", a: "O prazo varia conforme a complexidade do projeto, mas tipicamente entre 6 e 12 meses da submissão até a emissão dos primeiros créditos." },
  { q: "As metodologias da Green Ledger são públicas?", a: "Sim. Todas as metodologias aprovadas são publicadas em nosso repositório aberto e passam por revisão pública antes da aprovação." },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Paisagem agrícola sustentável" className="w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero opacity-85" />
        </div>
        <div className="container relative z-10 py-32">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest bg-secondary/20 text-accent rounded-full mb-6 animate-fade-in">
              Certificadora de Créditos de Carbono
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight animate-fade-in-up">
              Certificação de Carbono para o Agro com Rigor Técnico e Transparência
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              Metodologias robustas, governança independente e processos auditáveis para transformar práticas sustentáveis do agronegócio brasileiro em créditos de carbono de alta integridade.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/programas">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 text-base px-8">
                  Conheça os Programas <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/certificacao">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
                  Processo de Certificação
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 md:py-28">
        <div className="container">
          <SectionHeading
            tag="Sobre"
            title="O que é a Green Ledger"
            description="A Green Ledger é uma certificadora independente de créditos de carbono especializada no setor agropecuário. Desenvolvemos metodologias próprias, validadas por comitês científicos, e operamos com governança transparente para assegurar a integridade de cada crédito emitido."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: Shield, title: "Integridade", desc: "Processos auditáveis e rastreáveis do registro à emissão, garantindo credibilidade no mercado voluntário." },
              { icon: FileCheck, title: "Rigor Técnico", desc: "Metodologias baseadas em ciência, revisadas por pares e alinhadas com melhores práticas internacionais." },
              { icon: Users, title: "Governança Independente", desc: "Comitês consultivos, auditorias externas e consultas públicas garantem imparcialidade e transparência." },
            ].map((item) => (
              <div key={item.title} className="gradient-card rounded-xl p-8 shadow-card border border-border hover:shadow-elevated transition-shadow">
                <item.icon className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-heading font-semibold text-lg text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <SectionHeading
            tag="Programas"
            title="Programas de Certificação"
            description="Três programas desenhados para cobrir as principais atividades do agronegócio que geram redução ou remoção de emissões de gases de efeito estufa."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((p) => (
              <div key={p.title} className="bg-card rounded-xl p-8 shadow-card border border-border hover:shadow-elevated transition-all hover:-translate-y-1">
                <p.icon className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-heading font-semibold text-lg text-primary mb-3">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{p.desc}</p>
                <Link to="/programas" className="text-secondary text-sm font-medium hover:underline inline-flex items-center gap-1">
                  Saiba mais <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Process */}
      <section className="py-20 md:py-28">
        <div className="container">
          <SectionHeading
            tag="Certificação"
            title="Processo de Certificação"
            description="Do registro à emissão dos créditos, cada etapa é projetada para garantir qualidade, rastreabilidade e conformidade."
          />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
            {steps.map((s, i) => (
              <div key={s.num} className="relative text-center p-6">
                <span className="font-heading text-5xl font-bold text-secondary/15">{s.num}</span>
                <h4 className="font-heading font-semibold text-primary mt-2 mb-2">{s.title}</h4>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 text-muted" />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/certificacao">
              <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Ver processo completo <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-20 md:py-28 gradient-hero text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-4">
              Governança
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Governança Independente e Transparente
            </h2>
            <p className="text-primary-foreground/80 leading-relaxed mb-8">
              Nossa estrutura de governança garante a imparcialidade e a qualidade dos créditos emitidos. Comitês técnicos independentes revisam metodologias, auditorias externas validam processos e todas as decisões são documentadas publicamente.
            </p>
            <Link to="/governanca">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                Conheça nossa Governança <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container max-w-3xl">
          <SectionHeading
            tag="FAQ"
            title="Perguntas Frequentes"
          />
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-border rounded-lg">
                <summary className="cursor-pointer p-5 font-heading font-medium text-primary flex items-center justify-between">
                  {faq.q}
                  <span className="text-secondary transition-transform group-open:rotate-45 text-xl">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
            Pronto para certificar seus créditos de carbono?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Entre em contato com nossa equipe para iniciar o processo de registro do seu projeto agropecuário.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contato">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 text-base px-8">
                Fale Conosco <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/documentacao">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base px-8">
                Documentação
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
