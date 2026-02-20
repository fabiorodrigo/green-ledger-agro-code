import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, Search, FileCheck, Activity, ShieldCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: ClipboardCheck,
    num: "01",
    title: "Registro do Projeto",
    description: "O desenvolvedor do projeto submete o Documento de Concepção do Projeto (DCP) à Green Ledger, incluindo descrição da atividade, análise de adicionalidade, delimitação do boundary do projeto e plano de monitoramento proposto.",
    details: [
      "Submissão do DCP conforme template da metodologia aplicável",
      "Documentação de titularidade ou direito de uso sobre a área/atividade",
      "Pagamento da taxa de registro conforme tabela de tarifas",
      "Análise de completude pela equipe técnica (prazo: 15 dias úteis)",
      "Publicação do projeto para consulta pública (30 dias)",
    ],
  },
  {
    icon: Search,
    num: "02",
    title: "Avaliação de Elegibilidade",
    description: "A equipe técnica da Green Ledger avalia se o projeto atende aos critérios de elegibilidade definidos pela metodologia, incluindo adicionalidade, limites do projeto, conformidade regulatória e salvaguardas ambientais e sociais.",
    details: [
      "Verificação dos critérios de elegibilidade da metodologia",
      "Avaliação de adicionalidade conforme ferramenta de teste aplicável",
      "Análise da delimitação do boundary do projeto",
      "Avaliação de conformidade com salvaguardas ambientais e sociais",
      "Parecer técnico de elegibilidade (aprovação, solicitação de revisão ou rejeição)",
    ],
  },
  {
    icon: FileCheck,
    num: "03",
    title: "Validação",
    description: "Um organismo de validação/verificação (VVB) independente, credenciado pela Green Ledger, realiza a análise técnica do projeto para confirmar a conformidade com os requisitos da metodologia e a robustez da quantificação proposta.",
    details: [
      "Designação de VVB independente credenciado pela Green Ledger",
      "Revisão documental e verificação da análise de adicionalidade",
      "Avaliação do plano de monitoramento e protocolos de QA/QC",
      "Visita técnica ao projeto (quando aplicável)",
      "Relatório de validação com parecer de conformidade",
    ],
  },
  {
    icon: Activity,
    num: "04",
    title: "Monitoramento",
    description: "O desenvolvedor implementa o plano de monitoramento aprovado, coletando dados conforme os protocolos de Mensuração, Relato e Verificação (MRV) da metodologia ao longo do período de creditação.",
    details: [
      "Implementação do plano de monitoramento conforme DCP aprovado",
      "Coleta de dados conforme protocolos de MRV da metodologia",
      "Aplicação de procedimentos de QA/QC para assegurar a qualidade dos dados",
      "Registro contínuo no sistema da Green Ledger",
      "Preparação do relatório de monitoramento ao final de cada período de verificação",
    ],
  },
  {
    icon: ShieldCheck,
    num: "05",
    title: "Verificação Independente",
    description: "Um VVB independente audita os dados de monitoramento, verifica a conformidade com a metodologia e confirma a quantidade de reduções ou remoções de emissões de GEE alcançadas no período.",
    details: [
      "Designação de VVB independente (distinto do validador quando aplicável)",
      "Auditoria dos dados e registros de monitoramento",
      "Verificação in loco com amostragem representativa",
      "Recálculo independente das reduções/remoções de GEE",
      "Relatório de verificação com quantificação confirmada",
    ],
  },
  {
    icon: Award,
    num: "06",
    title: "Emissão de Créditos",
    description: "Após verificação positiva e revisão final, a Green Ledger emite os créditos de carbono certificados, cada um com número de série único, registrados em sistema rastreável para evitar dupla contagem.",
    details: [
      "Revisão final pela equipe técnica da Green Ledger",
      "Dedução da contribuição ao buffer pool (quando aplicável, para mitigação de risco de não-permanência)",
      "Emissão dos créditos com número de série único",
      "Registro no sistema de rastreabilidade da Green Ledger",
      "Créditos disponíveis para transferência, aposentadoria ou cancelamento",
    ],
  },
];

const CertificationProcess = () => (
  <div className="pt-20">
    <section className="gradient-hero text-primary-foreground py-24 md:py-32">
      <div className="container">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
          Processo de Certificação
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">Processo de Certificação</h1>
        <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">
          O processo de certificação da Green Ledger segue um ciclo estruturado em seis etapas, projetado para assegurar a integridade ambiental, adicionalidade, permanência e rastreabilidade de cada crédito emitido.
        </p>
      </div>
    </section>

    <section className="py-24 md:py-32">
      <div className="container max-w-4xl">
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-20">
            {steps.map((step, i) => (
              <div key={step.title} className="relative flex gap-10">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center z-10 bg-background">
                    <step.icon className="w-5 h-5 text-secondary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="md:hidden flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center">
                      <step.icon className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Etapa {step.num}</span>
                  </div>
                  <span className="hidden md:inline-block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Etapa {step.num}</span>
                  <h3 className="font-heading text-2xl font-bold text-primary mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{step.description}</p>
                  <ul className="space-y-3">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
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

    {/* Principles sidebar */}
    <section className="py-16 bg-muted/20">
      <div className="container max-w-4xl">
        <h2 className="font-heading text-2xl font-bold text-primary mb-8">Princípios Orientadores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Adicionalidade", desc: "Créditos emitidos apenas para atividades que não ocorreriam sem o incentivo do mercado de carbono." },
            { title: "Permanência", desc: "Mecanismos de buffer pool e monitoramento de longo prazo para mitigar riscos de reversão." },
            { title: "Conservadorismo", desc: "Fatores de desconto e abordagens conservadoras na quantificação de emissões." },
            { title: "Rastreabilidade", desc: "Número de série único e registro em sistema que evita dupla contagem." },
          ].map((p) => (
            <div key={p.title} className="p-6 border border-border rounded-xl">
              <h4 className="font-heading font-semibold text-primary mb-2">{p.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16">
      <div className="container text-center">
        <h2 className="font-heading text-2xl font-bold text-primary mb-4">Inicie o Processo de Certificação</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Entre em contato com a equipe técnica para avaliar a elegibilidade do seu projeto e iniciar o registro.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contato">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
              Contato Institucional <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/documentacao">
            <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Documentação Técnica <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default CertificationProcess;
