import { Shield, Eye, FileSearch, Users, Scale, BookOpen, AlertTriangle } from "lucide-react";

const sections = [
  {
    icon: Users,
    title: "Conselho Técnico",
    description: "Órgão máximo de governança técnica da Green Ledger, composto por especialistas independentes com reconhecida competência em mudanças climáticas, ciência do carbono e verificação ambiental.",
    items: [
      "Composição mínima de 7 membros com mandato de 3 anos",
      "Seleção por competência técnica, diversidade geográfica e independência",
      "Declaração obrigatória de conflito de interesse e confidencialidade",
      "Reuniões ordinárias trimestrais com atas publicadas em acesso aberto",
      "Responsável pela aprovação de políticas, normas e diretrizes gerais",
    ],
  },
  {
    icon: FileSearch,
    title: "Comitê de Metodologias",
    description: "Responsável pela avaliação técnica, aprovação e revisão periódica de todas as metodologias de quantificação da Green Ledger, assegurando rigor científico e alinhamento com melhores práticas.",
    items: [
      "Avaliação técnica de novas propostas de metodologia",
      "Revisão por pares com mínimo de 3 revisores independentes qualificados",
      "Consulta pública de 60 dias com resposta documentada a cada comentário",
      "Revisão periódica obrigatória a cada 3 anos ou quando necessário",
      "Aprovação formal com publicação de justificativa técnica",
    ],
  },
  {
    icon: Scale,
    title: "Processo de Revisão",
    description: "Ciclo estruturado de revisão e atualização de metodologias, normas e procedimentos, garantindo que os padrões da Green Ledger permaneçam alinhados com avanços científicos e regulatórios.",
    items: [
      "Proposta de revisão por equipe técnica, stakeholders ou revisão periódica programada",
      "Avaliação de impacto e análise comparativa com padrões internacionais",
      "Revisão por pares e consulta pública conforme procedimento padrão",
      "Deliberação pelo Comitê de Metodologias com parecer fundamentado",
      "Publicação da versão atualizada com registro de alterações e justificativas",
    ],
  },
  {
    icon: Shield,
    title: "Política de Integridade",
    description: "Princípios fundamentais que regem a emissão de créditos pela Green Ledger, assegurando que cada unidade certificada represente uma redução ou remoção real, mensurável, adicional e permanente.",
    items: [
      "Adicionalidade: testes rigorosos para comprovar que a atividade não ocorreria sem o incentivo do carbono",
      "Permanência: buffer pool e mecanismos de garantia contra reversões de longo prazo",
      "Conservadorismo: fatores de desconto e abordagens conservadoras na quantificação",
      "Evitar dupla contagem: rastreabilidade com número de série único e registro centralizado",
      "Salvaguardas ambientais e sociais: avaliação de impactos e respeito a direitos de comunidades",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Gestão de Risco",
    description: "Estrutura de identificação, avaliação e mitigação de riscos associados à integridade dos créditos, incluindo riscos de não-permanência, fraude, conflito de interesse e não-conformidade.",
    items: [
      "Avaliação de risco de não-permanência com contribuição ao buffer pool proporcional",
      "Due diligence de desenvolvedores de projetos e organismos de auditoria",
      "Mecanismo formal de reclamações, denúncias e apelação",
      "Procedimentos de suspensão, revogação e cancelamento de créditos",
      "Monitoramento contínuo de riscos sistêmicos e emergentes",
    ],
  },
  {
    icon: Eye,
    title: "Independência de Auditoria",
    description: "Organismos de validação e verificação (VVBs) credenciados pela Green Ledger atuam com independência assegurada por requisitos de competência técnica, rotação e supervisão de qualidade.",
    items: [
      "Credenciamento com avaliação de competência técnica setorial e independência",
      "Rotação obrigatória de auditores a cada 5 anos por projeto",
      "Proibição de conflito de interesse entre validação, verificação e consultoria",
      "Supervisão da qualidade das auditorias por comitê independente",
      "Avaliação de desempenho e recertificação periódica dos VVBs",
    ],
  },
  {
    icon: BookOpen,
    title: "Transparência",
    description: "Compromisso com a publicação em acesso aberto de todas as informações relevantes para assegurar a confiança dos mercados e stakeholders.",
    items: [
      "Registro público de todos os projetos certificados com dados de desempenho",
      "Metodologias aprovadas disponíveis para download sem restrições",
      "Relatórios de validação e verificação publicados integralmente",
      "Atas de reuniões dos comitês e decisões regulatórias documentadas",
      "Alinhamento com ICVCM Core Carbon Principles e marcos regulatórios nacionais",
    ],
  },
];

const Governance = () => (
  <div className="pt-20">
    <section className="gradient-hero text-primary-foreground py-24 md:py-32">
      <div className="container">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
          Governança
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">Governança Técnica e Integridade</h1>
        <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">
          A estrutura de governança da Green Ledger é projetada para assegurar independência, transparência e qualidade em todos os processos, desde a aprovação de metodologias até a emissão e rastreabilidade dos créditos de carbono.
        </p>
      </div>
    </section>

    <section className="py-24 md:py-32">
      <div className="container max-w-5xl">
        <div className="space-y-16">
          {sections.map((s, i) => (
            <div key={s.title} className="flex flex-col md:flex-row gap-8">
              <div className="shrink-0 flex items-start">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <s.icon className="w-7 h-7 text-secondary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-xl font-bold text-primary mb-4">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{s.description}</p>
                <ul className="space-y-3">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Governance;
