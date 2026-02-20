import { Link } from "react-router-dom";
import { ArrowRight, Shield, FileCheck, Users, Leaf, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";

const programs = [
  {
    title: "Green Ledger AFOLU",
    desc: "Projetos de reflorestamento, restauração de vegetação nativa, sistemas agroflorestais e redução de desmatamento (REDD+), com foco em adicionalidade e permanência do carbono sequestrado.",
    icon: Leaf,
  },
  {
    title: "Green Ledger Soil Carbon",
    desc: "Sequestro de carbono orgânico no solo por meio de práticas regenerativas, plantio direto, integração lavoura-pecuária-floresta e manejo conservacionista, com protocolos de MRV específicos.",
    icon: Globe,
  },
  {
    title: "Green Ledger Energy & Tech",
    desc: "Redução de emissões por meio de eficiência energética, biodigestores, energias renováveis e tecnologias limpas, com mensuração contínua e verificação independente.",
    icon: Zap,
  },
];

const steps = [
  { num: "01", title: "Registro", desc: "Submissão do Documento de Concepção do Projeto e documentação técnica." },
  { num: "02", title: "Avaliação", desc: "Análise de elegibilidade e adicionalidade pela equipe técnica." },
  { num: "03", title: "Validação", desc: "Revisão independente por organismo de validação credenciado." },
  { num: "04", title: "Monitoramento", desc: "Implementação do plano de MRV conforme protocolo da metodologia." },
  { num: "05", title: "Verificação", desc: "Auditoria independente dos dados de monitoramento e resultados." },
  { num: "06", title: "Emissão", desc: "Créditos certificados com número de série único e rastreabilidade." },
];

const principles = [
  { title: "Adicionalidade", desc: "Créditos emitidos exclusivamente para atividades que não ocorreriam sem o incentivo do mercado de carbono, conforme testes de adicionalidade definidos em cada metodologia." },
  { title: "Permanência", desc: "Mecanismos de buffer pool e monitoramento de longo prazo para mitigar riscos de reversão e assegurar a durabilidade das reduções e remoções certificadas." },
  { title: "Conservadorismo", desc: "Abordagens conservadoras na quantificação de emissões, com fatores de desconto aplicados para garantir que créditos emitidos não excedam as reduções reais." },
  { title: "Transparência", desc: "Registro público de projetos, metodologias publicadas em acesso aberto, atas de comitês e relatórios de auditoria disponíveis para consulta." },
];

const faqs = [
  { q: "O que são créditos de carbono certificados?", a: "São unidades verificadas que representam uma tonelada métrica de CO₂ equivalente removida ou evitada, emitidas após validação e verificação independentes conforme metodologias aprovadas por uma certificadora." },
  { q: "Quem pode registrar um projeto na Green Ledger?", a: "Desenvolvedores de projetos, empresas, cooperativas e organizações que implementem atividades de redução ou remoção de emissões de GEE em qualquer setor elegível, desde que atendam aos critérios de adicionalidade e elegibilidade das metodologias aplicáveis." },
  { q: "Quanto tempo leva o processo de certificação?", a: "O prazo varia conforme a complexidade do projeto e a disponibilidade de dados de baseline. Tipicamente, o ciclo completo — do registro à emissão dos primeiros créditos — leva entre 6 e 12 meses." },
  { q: "Como a Green Ledger garante a integridade dos créditos?", a: "Por meio de governança técnica independente, processos de validação e verificação por organismos credenciados, mecanismos de buffer contra reversões, consulta pública de metodologias e alinhamento com os Core Carbon Principles do ICVCM." },
  { q: "As metodologias da Green Ledger são públicas?", a: "Sim. Todas as metodologias aprovadas são publicadas em acesso aberto e passam por revisão por pares e consulta pública de 60 dias antes da aprovação pelo comitê técnico competente." },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Paisagem sustentável" className="w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero opacity-85" />
        </div>
        <div className="container relative z-10 py-32">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest bg-secondary/20 text-accent rounded-full mb-8 animate-fade-in">
              Certificadora Independente de Créditos de Carbono
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight animate-fade-in-up">
              Certificação de Carbono com Integridade Ambiental
            </h1>
            <p className="mt-8 text-lg text-primary-foreground/80 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              Metodologias cientificamente fundamentadas, governança técnica independente e processos de validação e verificação auditáveis para créditos de carbono de alta integridade.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/certificacao">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 text-base px-8">
                  Processo de Certificação <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/metodologias">
                <Button size="lg" variant="hero-outline" className="text-base px-8">
                  Metodologias Públicas
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
            {[
              { value: "3", label: "Programas de Certificação" },
              { value: "7", label: "Metodologias Aprovadas" },
              { value: "6", label: "Etapas de Certificação" },
              { value: "100%", label: "Transparência Pública" },
            ].map((stat) => (
              <div key={stat.label} className="border-l border-primary-foreground/20 pl-4">
                <span className="font-heading text-2xl md:text-3xl font-bold text-secondary">{stat.value}</span>
                <p className="text-xs text-primary-foreground/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 md:py-32">
        <div className="container">
          <SectionHeading
            tag="Princípios"
            title="Integridade Ambiental e Governança Técnica"
            description="Os princípios fundamentais que orientam todos os processos de certificação da Green Ledger, assegurando que cada crédito emitido represente uma redução ou remoção real, mensurável e verificável."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {principles.map((item) => (
              <div key={item.title} className="p-8 rounded-xl border border-border hover:shadow-card transition-shadow">
                <h3 className="font-heading font-semibold text-lg text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 md:py-32 bg-muted/20">
        <div className="container">
          <SectionHeading
            tag="Programas"
            title="Programas de Certificação"
            description="Programas setoriais com metodologias específicas, critérios de elegibilidade e protocolos de MRV adaptados às características de cada tipo de atividade."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {programs.map((p) => (
              <div key={p.title} className="bg-card rounded-xl p-8 border border-border hover:shadow-card transition-all">
                <p.icon className="w-10 h-10 text-secondary mb-6" />
                <h3 className="font-heading font-semibold text-lg text-primary mb-4">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">{p.desc}</p>
                <Link to="/programas" className="text-secondary text-sm font-medium hover:underline inline-flex items-center gap-1">
                  Ver detalhes <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Process */}
      <section className="py-24 md:py-32">
        <div className="container">
          <SectionHeading
            tag="Certificação"
            title="Processo de Certificação"
            description="Do registro à emissão, cada etapa assegura adicionalidade, integridade ambiental e conformidade com os requisitos das metodologias aplicáveis."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
            {steps.map((s, i) => (
              <div key={s.num} className="relative text-center p-6">
                <span className="font-heading text-4xl font-bold text-secondary/15">{s.num}</span>
                <h4 className="font-heading font-semibold text-primary mt-2 mb-3">{s.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 text-muted" />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/certificacao">
              <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Ver processo detalhado <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-24 md:py-32 gradient-hero text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
              Governança
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
              Governança Técnica e Independência
            </h2>
            <p className="text-primary-foreground/80 leading-relaxed mb-6">
              A estrutura de governança da Green Ledger assegura a imparcialidade e a qualidade dos créditos emitidos. Comitês técnicos independentes revisam e aprovam metodologias, organismos de validação e verificação credenciados auditam projetos, e todas as decisões são documentadas e publicadas.
            </p>
            <p className="text-primary-foreground/70 leading-relaxed mb-10 text-sm">
              Alinhamento com os Core Carbon Principles do Integrity Council for the Voluntary Carbon Market (ICVCM) e conformidade com marcos regulatórios nacionais e internacionais.
            </p>
            <Link to="/governanca">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                Estrutura de Governança <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="container max-w-3xl">
          <SectionHeading
            tag="Perguntas Frequentes"
            title="Dúvidas sobre Certificação"
          />
          <div className="space-y-4 mt-8">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-border rounded-lg">
                <summary className="cursor-pointer p-6 font-heading font-medium text-primary flex items-center justify-between">
                  {faq.q}
                  <span className="text-secondary transition-transform group-open:rotate-45 text-xl ml-4 shrink-0">+</span>
                </summary>
                <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-muted/20">
        <div className="container text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
            Registre seu Projeto
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Entre em contato com a equipe técnica da Green Ledger para iniciar o processo de registro e avaliação de elegibilidade do seu projeto.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contato">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 text-base px-8">
                Contato Institucional <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/documentacao">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base px-8">
                Documentação Técnica
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
