import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, FileText, CheckCircle2, Shield, Target, Layers, TreePine, Leaf, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { methodologiesData } from "./Methodologies";
import AnimatedSection from "@/components/AnimatedSection";

const programIcons: Record<string, React.ElementType> = {
  "AFOLU": TreePine,
  "Soil Carbon": Leaf,
  "Energy & Tech": Zap,
};

const MethodologyDetail = () => {
  const { slug } = useParams();
  const m = methodologiesData.find((d) => d.slug === slug);

  if (!m) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-primary mb-4">Metodologia não encontrada</h1>
          <Link to="/metodologias">
            <Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> Voltar</Button>
          </Link>
        </div>
      </div>
    );
  }

  const ProgramIcon = programIcons[m.program] || FileText;

  const whyChoose = [
    {
      icon: Target,
      title: "Abordagem Robusta",
      description: "Construída sobre os princípios dos principais referenciais internacionais e alinhada com as melhores práticas do IPCC e padrões de integridade de mercado.",
    },
    {
      icon: Shield,
      title: "Credibilidade e Transparência",
      description: "Processo de aprovação com consulta pública, revisão por pares e validação por VVBs independentes credenciados pela Green Ledger.",
    },
    {
      icon: Layers,
      title: "Processo Estruturado",
      description: "Fornece um caminho claro e referenciado, conectando cada etapa do projeto às ferramentas e documentos necessários para a certificação.",
    },
  ];

  const eligibilityItems = m.eligibility.split(". ").filter(Boolean).map(s => s.replace(/\.$/, ""));

  const revisionsList = m.revisions.split(", ").map((r) => {
    const match = r.match(/v([\d.]+)\s*\((\d{4})\)/);
    return match ? { version: `v${match[1]}`, year: match[2] } : { version: r, year: "" };
  });

  const steps = [
    {
      num: "01",
      title: "Adicionalidade, Linha de Base e Vazamento",
      description: m.additionality,
      details: [
        "Comprove que o projeto é adicional utilizando a Ferramenta de Demonstração de Adicionalidade",
        "Calcule as emissões evitadas e/ou remoções conforme as equações e procedimentos da metodologia",
        "Avalie e quantifique o risco de vazamento (leakage) utilizando a ferramenta apropriada",
      ],
    },
    {
      num: "02",
      title: "Boundary e Escopo do Projeto",
      description: m.boundary,
      details: [
        "Defina os limites geográficos e temporais do projeto",
        "Identifique todas as fontes, sumidouros e reservatórios relevantes",
        "Documente o escopo no Documento de Concepção de Projeto (DCP)",
      ],
    },
    {
      num: "03",
      title: "Monitoramento, Relato e Verificação (MRV)",
      description: m.mrv,
      details: [
        "Implemente o plano de monitoramento conforme especificado na documentação técnica",
        "Mantenha registros por no mínimo 5 anos após o período de creditação",
        "Verificação por organismos independentes (VVBs) credenciados pela Green Ledger",
      ],
    },
    {
      num: "04",
      title: "Controle de Qualidade (QA/QC)",
      description: m.qaqc,
      details: [
        "Siga os protocolos padronizados de controle de qualidade",
        "Realize verificações cruzadas e revisões internas antes da submissão",
        "Garanta rastreabilidade completa dos dados e procedimentos",
      ],
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="gradient-hero text-primary-foreground py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-cover bg-center" />
        <div className="container relative z-10">
          <Link
            to="/metodologias"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para Metodologias
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-primary-foreground/60 uppercase tracking-widest font-medium">Metodologia</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
            {m.code}
          </h1>
          <p className="text-xl md:text-2xl text-accent font-heading font-semibold mb-6">{m.title}</p>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
              <ProgramIcon className="w-3.5 h-3.5" /> {m.program}
            </span>
            <span className="text-xs px-3 py-1.5 bg-secondary/20 text-accent rounded-full border border-accent/20">
              {m.version}
            </span>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-16 md:py-20 border-b border-border">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
              Metodologia {m.code} — {m.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              {m.summary}
            </p>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mt-4">
              Desenvolvida em alinhamento com as melhores práticas do IPCC e padrões internacionais de integridade,
              esta metodologia oferece um caminho robusto e transparente para a geração de créditos de carbono
              verificados e registrados na plataforma blockchain da Green Ledger.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
              Por que escolher a {m.code}?
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Diferenciais que tornam esta metodologia referência para o seu tipo de projeto.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChoose.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-xl p-8 h-full hover:shadow-card transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
              Quem pode utilizar esta Metodologia?
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Esta metodologia é aplicável a projetos que atendam aos seguintes critérios essenciais. Sua iniciativa é elegível se:
            </p>
          </AnimatedSection>

          <div className="space-y-5">
            {eligibilityItems.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 bg-card border border-border rounded-lg p-5">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <p className="text-primary font-medium text-sm leading-relaxed">{item}.</p>
                </div>
              </AnimatedSection>
            ))}

            <AnimatedSection delay={eligibilityItems.length * 0.08}>
              <div className="flex items-start gap-4 bg-card border border-border rounded-lg p-5">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <p className="text-primary font-medium text-sm leading-relaxed">
                  Demonstra conformidade com as salvaguardas ambientais e sociais da Green Ledger.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={(eligibilityItems.length + 1) * 0.08}>
              <div className="flex items-start gap-4 bg-card border border-border rounded-lg p-5">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <p className="text-primary font-medium text-sm leading-relaxed">
                  A atividade é voluntária e não resulta de exigências legais ou compensações obrigatórias.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
              O Processo de Aplicação da Metodologia
            </h2>
            <p className="text-muted-foreground mb-12 leading-relaxed">
              Sua jornada desde a concepção até a geração de créditos segue um fluxo lógico. Cada etapa requer a aplicação de ferramentas específicas para garantir a precisão e a auditabilidade.
            </p>
          </AnimatedSection>

          <div className="space-y-10">
            {steps.map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 0.1}>
                <div className="relative pl-16 md:pl-20">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="font-heading font-bold text-primary-foreground text-sm">{step.num}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute left-6 top-12 w-px h-[calc(100%+1rem)] bg-border" />
                  )}
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-primary mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Safeguards */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
              Salvaguardas Ambientais e Sociais
            </h2>
            <div className="bg-card border border-border rounded-xl p-8">
              <p className="text-muted-foreground leading-relaxed text-sm">{m.safeguards}</p>
              <p className="text-muted-foreground leading-relaxed text-sm mt-4">
                A Green Ledger exige que todos os projetos realizem uma análise completa de salvaguardas socioambientais,
                garantindo que os benefícios do projeto se estendam às comunidades locais e que nenhum impacto negativo
                significativo seja gerado.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Documentation */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
              Documentação Essencial: {m.code}
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Aqui você encontra o documento principal da metodologia e os modelos associados diretamente à sua aplicação.
            </p>
          </AnimatedSection>

          {/* Main document */}
          <AnimatedSection delay={0.1}>
            <div className="bg-card border-2 border-secondary/30 rounded-xl p-8 mb-8">
              <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-secondary mb-4">
                Documento Principal
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="font-heading font-semibold text-primary mb-1">
                    {m.code} — {m.title}, {m.version}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    O documento completo com todas as diretrizes, equações e procedimentos.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2 shrink-0 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                  <Download className="w-4 h-4" /> PDF
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Related documents */}
          <AnimatedSection delay={0.2}>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Modelos e Ferramentas Relacionados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {m.documents.filter(d => d !== "Documento da Metodologia (PDF)").map((doc) => (
                <div
                  key={doc}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:shadow-card transition-shadow cursor-pointer"
                >
                  <FileText className="w-5 h-5 text-muted-foreground shrink-0" />
                  <p className="font-medium text-sm text-primary flex-1">{doc}</p>
                  <Download className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 italic">
              * Documentação placeholder — os arquivos serão disponibilizados em breve.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Revision History */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
              Histórico de Revisões
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Para garantir total transparência, mantemos um registro público de todas as versões desta metodologia.
            </p>
          </AnimatedSection>

          <div className="space-y-4">
            {revisionsList.map((rev, i) => (
              <AnimatedSection key={rev.version} delay={i * 0.08}>
                <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-heading font-bold text-primary text-xs">{rev.version}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-primary text-sm">Versão {rev.version}</p>
                    {rev.year && <p className="text-muted-foreground text-xs">Publicada em {rev.year}</p>}
                  </div>
                  {i === 0 && (
                    <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full font-medium">
                      Atual
                    </span>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
              Tem dúvidas sobre esta metodologia?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              Entre em contato com nossa equipe técnica para obter orientação sobre a aplicação desta metodologia ao seu projeto.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/contato">
                <Button className="gap-2">Entre em Contato</Button>
              </Link>
              <Link to="/metodologias">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Todas as Metodologias
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default MethodologyDetail;
