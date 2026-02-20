import { Shield, Eye, FileSearch, Users, Scale, BookOpen } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const pillars = [
  {
    icon: Users,
    title: "Comitês Técnicos Independentes",
    description: "Cada programa de certificação possui um comitê técnico composto por especialistas independentes sem vínculos com desenvolvedores de projetos. Os comitês são responsáveis por aprovar novas metodologias, revisar metodologias existentes e avaliar questões técnicas complexas.",
    items: [
      "Membros selecionados por competência técnica e independência",
      "Mandatos de 3 anos com limite de recondução",
      "Declaração de conflito de interesse obrigatória",
      "Reuniões trimestrais com atas publicadas",
    ],
  },
  {
    icon: FileSearch,
    title: "Revisão de Metodologias",
    description: "As metodologias da Green Ledger passam por um processo rigoroso de revisão antes da aprovação, incluindo análise técnica por pares, consulta pública e deliberação do comitê competente.",
    items: [
      "Desenvolvimento por equipe técnica qualificada",
      "Revisão por pares (mínimo 3 revisores independentes)",
      "Consulta pública de 60 dias com resposta documentada",
      "Aprovação pelo comitê técnico do programa",
      "Revisão periódica a cada 3 anos ou quando necessário",
    ],
  },
  {
    icon: Scale,
    title: "Auditoria e Conformidade",
    description: "Auditores independentes credenciados pela Green Ledger realizam validações e verificações de projetos. O credenciamento segue critérios rigorosos de competência técnica e independência.",
    items: [
      "Credenciamento com avaliação de competência técnica",
      "Rotação obrigatória de auditores a cada 5 anos",
      "Supervisão da qualidade das auditorias",
      "Mecanismo de reclamação e apelação",
    ],
  },
  {
    icon: Eye,
    title: "Transparência",
    description: "Todas as informações relevantes são publicadas em acesso aberto, incluindo projetos registrados, metodologias aprovadas, relatórios de validação e verificação e atas de reuniões dos comitês.",
    items: [
      "Registro público de todos os projetos certificados",
      "Metodologias aprovadas disponíveis em acesso aberto",
      "Relatórios de validação e verificação publicados",
      "Atas de comitês e decisões documentadas",
    ],
  },
  {
    icon: Shield,
    title: "Integridade Ambiental",
    description: "A Green Ledger adota princípios fundamentais para garantir que cada crédito emitido represente uma redução ou remoção real, mensurável, adicional e permanente de emissões.",
    items: [
      "Adicionalidade: créditos apenas para atividades que não ocorreriam sem o incentivo do carbono",
      "Permanência: mecanismos de buffer e garantia contra reversões",
      "Conservadorismo: fatores de desconto e abordagens conservadoras",
      "Evitar dupla contagem: rastreabilidade e registro único",
    ],
  },
  {
    icon: BookOpen,
    title: "Conformidade Regulatória",
    description: "Alinhamento com marcos regulatórios nacionais e internacionais, incluindo o Sistema Nacional de Registro de Créditos de Carbono e as diretrizes do Artigo 6 do Acordo de Paris.",
    items: [
      "Conformidade com legislação ambiental brasileira",
      "Alinhamento com ICVCM Core Carbon Principles",
      "Compatibilidade com mercados voluntário e regulado",
      "Acompanhamento contínuo de atualizações regulatórias",
    ],
  },
];

const Governance = () => (
  <div>
    <section className="gradient-hero text-primary-foreground py-20 md:py-28">
      <div className="container">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-4">
          Governança
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">Governança e Integridade</h1>
        <p className="mt-6 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">
          Nossa estrutura de governança garante independência, transparência e qualidade em todos os processos, desde a aprovação de metodologias até a emissão de créditos.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p) => (
            <div key={p.title} className="gradient-card rounded-xl p-8 border border-border shadow-card">
              <p.icon className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-heading text-xl font-bold text-primary mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.description}</p>
              <ul className="space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Governance;
