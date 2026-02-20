import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, Search, Activity, ShieldCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Registro",
    description: "O desenvolvedor do projeto submete a documentação inicial, incluindo o Documento de Concepção do Projeto (DCP), dados de elegibilidade e plano de monitoramento proposto.",
    details: [
      "Preenchimento do formulário de registro no portal",
      "Upload do DCP conforme template da metodologia aplicável",
      "Pagamento da taxa de registro",
      "Análise de completude pela equipe Green Ledger (prazo: 15 dias úteis)",
      "Publicação do projeto para consulta pública (30 dias)",
    ],
  },
  {
    icon: Search,
    title: "Validação",
    description: "Um organismo de validação independente, credenciado pela Green Ledger, realiza a análise técnica do projeto para confirmar que atende aos requisitos da metodologia aplicável.",
    details: [
      "Designação de validador independente credenciado",
      "Revisão documental e análise de adicionalidade",
      "Visita técnica ao projeto (quando aplicável)",
      "Parecer de validação e resposta a não-conformidades",
      "Aprovação formal e autorização para monitoramento",
    ],
  },
  {
    icon: Activity,
    title: "Monitoramento",
    description: "O desenvolvedor implementa o plano de monitoramento aprovado, coletando dados de campo conforme os protocolos MRV da metodologia aplicável ao longo do período de creditação.",
    details: [
      "Implementação do plano de monitoramento aprovado",
      "Coleta periódica de dados conforme protocolo MRV",
      "Registro contínuo em sistema da Green Ledger",
      "Reporte de monitoramento ao final de cada período",
      "Manutenção de registros por mínimo de 5 anos",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Verificação",
    description: "Um organismo de verificação independente audita os dados de monitoramento e confirma a quantidade de reduções/remoções de emissões alcançadas no período.",
    details: [
      "Designação de verificador independente",
      "Auditoria dos dados e registros de monitoramento",
      "Verificação in loco (amostragem)",
      "Cálculo independente das reduções/remoções",
      "Parecer de verificação com quantidade confirmada",
    ],
  },
  {
    icon: Award,
    title: "Emissão",
    description: "Após verificação positiva, a Green Ledger emite os créditos de carbono correspondentes, registrados em sistema rastreável com número de série único.",
    details: [
      "Revisão final pela equipe Green Ledger",
      "Emissão dos créditos com número de série único",
      "Registro no sistema de rastreabilidade",
      "Créditos disponíveis para transferência ou aposentadoria",
      "Publicação do relatório de verificação",
    ],
  },
];

const CertificationProcess = () => (
  <div>
    <section className="gradient-hero text-primary-foreground py-20 md:py-28">
      <div className="container">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-4">
          Certificação
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">Processo de Certificação</h1>
        <p className="mt-6 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">
          Do registro à emissão, cada etapa foi projetada para garantir a integridade, rastreabilidade e conformidade dos créditos de carbono emitidos pela Green Ledger.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="container max-w-4xl">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <div key={step.title} className="relative flex gap-8">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center z-10 bg-background">
                    <step.icon className="w-5 h-5 text-secondary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="md:hidden flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center">
                      <step.icon className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Etapa {i + 1}</span>
                  </div>
                  <span className="hidden md:inline-block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Etapa {i + 1}</span>
                  <h3 className="font-heading text-2xl font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="w-3 h-3 text-secondary mt-1.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 bg-muted/30">
      <div className="container text-center">
        <h2 className="font-heading text-2xl font-bold text-primary mb-4">Pronto para iniciar?</h2>
        <p className="text-muted-foreground mb-6">Registre seu projeto e inicie o processo de certificação.</p>
        <Link to="/contato">
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
            Fale Conosco <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>
  </div>
);

export default CertificationProcess;
