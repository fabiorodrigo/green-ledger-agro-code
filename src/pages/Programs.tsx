import { Link } from "react-router-dom";
import { Leaf, Globe, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const programs = [
  {
    id: "afolu",
    icon: Leaf,
    title: "Green Ledger AFOLU",
    subtitle: "Agricultura, Florestas e Outros Usos do Solo",
    description: "Programa abrangente que cobre atividades de redução e remoção de emissões de GEE nos setores agropecuário e florestal, incluindo reflorestamento, restauração de vegetação nativa, sistemas agroflorestais, manejo florestal sustentável e proteção de ecossistemas.",
    scope: [
      "Reflorestamento e restauração florestal",
      "Sistemas agroflorestais (SAFs)",
      "Redução de desmatamento e degradação (REDD+)",
      "Manejo florestal sustentável",
      "Recuperação de áreas degradadas",
    ],
    eligibility: [
      "Áreas com potencial de sequestro ou redução comprovável",
      "Conformidade com legislação ambiental vigente",
      "Período mínimo de creditação: 20 anos",
      "Documentação de posse ou direito de uso da terra",
    ],
    methodologies: ["GL-AFOLU-001", "GL-AFOLU-002", "GL-AFOLU-003"],
  },
  {
    id: "soil",
    icon: Globe,
    title: "Green Ledger Soil Carbon",
    subtitle: "Carbono no Solo",
    description: "Programa dedicado ao sequestro de carbono orgânico no solo por meio de práticas regenerativas, sistemas de plantio direto, rotação de culturas, integração lavoura-pecuária-floresta (ILPF) e uso de plantas de cobertura.",
    scope: [
      "Plantio direto sobre palha",
      "Integração Lavoura-Pecuária-Floresta (ILPF)",
      "Uso de plantas de cobertura",
      "Rotação e consórcio de culturas",
      "Manejo conservacionista do solo",
    ],
    eligibility: [
      "Áreas com histórico de uso convencional do solo",
      "Dados de linha de base de carbono no solo disponíveis ou mensuráveis",
      "Compromisso com monitoramento de longo prazo (mínimo 10 anos)",
      "Implementação de práticas regenerativas verificáveis",
    ],
    methodologies: ["GL-SC-001", "GL-SC-002"],
  },
  {
    id: "energytech",
    icon: Zap,
    title: "Green Ledger Energy & Tech",
    subtitle: "Energia e Tecnologias Limpas",
    description: "Programa voltado para tecnologias inovadoras que reduzem emissões em diversos setores: biodigestores, energias renováveis, eficiência energética, tratamento de resíduos, substituição de combustíveis fósseis e processos industriais mais limpos.",
    scope: [
      "Biodigestores e tratamento de resíduos",
      "Substituição de combustíveis fósseis",
      "Eficiência energética industrial e comercial",
      "Energias renováveis (solar, eólica, biomassa)",
      "Otimização de processos e redução de emissões fugitivas",
    ],
    eligibility: [
      "Adoção de tecnologia comprovadamente superior à prática convencional",
      "Reduções de emissões mensuráveis e verificáveis",
      "Conformidade com padrões técnicos e regulatórios",
      "Dados de operação disponíveis para auditoria",
    ],
    methodologies: ["GL-ET-001", "GL-ET-002"],
  },
];

const Programs = () => {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="gradient-hero text-primary-foreground py-20 md:py-28">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-4">
            Programas
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">
            Programas de Certificação
          </h1>
          <p className="mt-6 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">
            Programas especializados cobrindo as principais atividades que geram redução ou remoção de emissões de gases de efeito estufa em múltiplos setores.
          </p>
        </div>
      </section>

      {/* Programs detail */}
      <section className="py-20">
        <div className="container space-y-20">
          {programs.map((p, idx) => (
            <div key={p.id} id={p.id} className="scroll-mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3 mb-4">
                    <p.icon className="w-8 h-8 text-secondary" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.subtitle}</span>
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-primary mb-4">{p.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">{p.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-heading font-semibold text-primary mb-3">Escopo</h3>
                      <ul className="space-y-2">
                        {p.scope.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-primary mb-3">Elegibilidade</h3>
                      <ul className="space-y-2">
                        {p.eligibility.map((e) => (
                          <li key={e} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-accent-foreground mt-0.5 shrink-0" />
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="gradient-card rounded-xl p-6 border border-border shadow-card">
                    <h3 className="font-heading font-semibold text-primary mb-4">Metodologias Vinculadas</h3>
                    <ul className="space-y-3 mb-6">
                      {p.methodologies.map((m) => (
                        <li key={m}>
                          <Link to="/metodologias" className="flex items-center gap-2 text-sm text-secondary hover:underline">
                            <ArrowRight className="w-3 h-3" />
                            {m}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <h3 className="font-heading font-semibold text-primary mb-3">Governança</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Cada programa possui comitê técnico próprio responsável pela aprovação de projetos e revisão periódica de metodologias.
                    </p>
                  </div>
                </div>
              </div>
              {idx < programs.length - 1 && <hr className="mt-20 border-border" />}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h2 className="font-heading text-2xl font-bold text-primary mb-4">Quer registrar um projeto?</h2>
          <p className="text-muted-foreground mb-6">Entre em contato para saber qual programa se aplica à sua atividade.</p>
          <Link to="/contato">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
              Fale Conosco <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Programs;
