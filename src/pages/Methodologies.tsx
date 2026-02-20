import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

export const methodologiesData = [
  {
    code: "GL-AFOLU-001",
    slug: "gl-afolu-001",
    title: "Reflorestamento e Restauração de Vegetação Nativa",
    version: "v2.1",
    program: "AFOLU",
    summary: "Metodologia para quantificação do sequestro de carbono em projetos de reflorestamento com espécies nativas e exóticas em áreas degradadas ou desmatadas.",
    eligibility: "Áreas desmatadas há pelo menos 10 anos, com comprovação documental. Mínimo de 10 hectares.",
    mrv: "Inventário florestal anual, sensoriamento remoto e equações alométricas regionalizadas.",
    revisions: "v1.0 (2022), v2.0 (2023), v2.1 (2024)",
  },
  {
    code: "GL-AFOLU-002",
    slug: "gl-afolu-002",
    title: "Sistemas Agroflorestais (SAFs)",
    version: "v1.2",
    program: "AFOLU",
    summary: "Quantificação de carbono sequestrado em sistemas que integram espécies arbóreas com cultivos agrícolas e/ou pecuária.",
    eligibility: "Áreas com implantação de SAF em áreas previamente de uso agrícola convencional ou degradadas.",
    mrv: "Parcelas permanentes de monitoramento, análise de biomassa acima e abaixo do solo.",
    revisions: "v1.0 (2023), v1.2 (2024)",
  },
  {
    code: "GL-AFOLU-003",
    slug: "gl-afolu-003",
    title: "Redução de Desmatamento (REDD+)",
    version: "v1.0",
    program: "AFOLU",
    summary: "Quantificação de emissões evitadas por meio da proteção de áreas florestais ameaçadas de desmatamento.",
    eligibility: "Áreas florestais com risco demonstrável de desmatamento. Análise de adicionalidade obrigatória.",
    mrv: "Monitoramento por satélite, análise de mudança de uso do solo, verificação in loco.",
    revisions: "v1.0 (2024)",
  },
  {
    code: "GL-SC-001",
    slug: "gl-sc-001",
    title: "Plantio Direto e Manejo Conservacionista",
    version: "v1.3",
    program: "Soil Carbon",
    summary: "Quantificação do incremento de carbono orgânico no solo em sistemas de plantio direto sobre palha com rotação de culturas.",
    eligibility: "Transição de sistema convencional para plantio direto. Histórico mínimo de 3 anos de dados.",
    mrv: "Análises de solo em profundidade (0-30cm e 30-60cm), amostragem estratificada.",
    revisions: "v1.0 (2022), v1.1 (2023), v1.3 (2024)",
  },
  {
    code: "GL-SC-002",
    slug: "gl-sc-002",
    title: "Integração Lavoura-Pecuária-Floresta (ILPF)",
    version: "v1.0",
    program: "Soil Carbon",
    summary: "Metodologia para sistemas integrados que combinam lavoura, pecuária e componente florestal para incremento de carbono no solo e na biomassa.",
    eligibility: "Implementação de sistema ILPF em áreas de pastagem degradada ou monocultura.",
    mrv: "Monitoramento de carbono no solo, biomassa arbórea e emissões de metano entérico.",
    revisions: "v1.0 (2024)",
  },
  {
    code: "GL-ET-001",
    slug: "gl-et-001",
    title: "Biodigestores e Tratamento de Resíduos",
    version: "v2.0",
    program: "Energy & Tech",
    summary: "Quantificação de emissões evitadas pela captura e aproveitamento de metano proveniente de resíduos orgânicos e dejetos.",
    eligibility: "Instalações com sistema de tratamento de resíduos orgânicos e captura de biogás.",
    mrv: "Medição contínua de fluxo de biogás, análise de composição e registro de operação.",
    revisions: "v1.0 (2022), v1.5 (2023), v2.0 (2024)",
  },
  {
    code: "GL-ET-002",
    slug: "gl-et-002",
    title: "Eficiência Energética e Tecnologias Limpas",
    version: "v1.0",
    program: "Energy & Tech",
    summary: "Redução de emissões por meio de melhorias em eficiência energética, substituição de combustíveis fósseis e adoção de tecnologias limpas em operações industriais e comerciais.",
    eligibility: "Adoção de tecnologia comprovadamente superior à prática convencional, com dados de baseline disponíveis.",
    mrv: "Registros de consumo energético, dados de sensores, comparação com baseline setorial.",
    revisions: "v1.0 (2024)",
  },
];

const Methodologies = () => (
  <div className="pt-20">
    <section className="gradient-hero text-primary-foreground py-20 md:py-28">
      <div className="container">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-4">
          Metodologias
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">Metodologias Públicas</h1>
        <p className="mt-6 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">
          Todas as metodologias aprovadas pela Green Ledger são publicadas em acesso aberto e passam por revisão pública e científica antes da aprovação.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <div className="space-y-6">
          {methodologiesData.map((m) => (
            <div key={m.code} className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-card hover:shadow-elevated transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="font-heading font-bold text-secondary text-sm">{m.code}</span>
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{m.version}</span>
                    <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">{m.program}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-primary mb-2">{m.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{m.summary}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-primary text-xs uppercase tracking-wider">Elegibilidade</span>
                      <p className="text-muted-foreground mt-1">{m.eligibility}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-primary text-xs uppercase tracking-wider">MRV</span>
                      <p className="text-muted-foreground mt-1">{m.mrv}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-primary text-xs uppercase tracking-wider">Revisões</span>
                      <p className="text-muted-foreground mt-1">{m.revisions}</p>
                    </div>
                  </div>
                </div>
                <div className="shrink-0">
                  <Link to={`/metodologias/${m.slug}`}>
                    <Button variant="outline" size="sm" className="gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                      <FileText className="w-4 h-4" /> Ver Detalhes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Methodologies;
