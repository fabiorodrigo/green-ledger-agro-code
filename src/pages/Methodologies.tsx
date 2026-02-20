import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const methodologiesData = [
  {
    code: "GL-AFOLU-001",
    slug: "gl-afolu-001",
    title: "Reflorestamento e Restauração de Vegetação Nativa",
    version: "v2.1",
    program: "AFOLU",
    summary: "Quantificação do sequestro de carbono em projetos de reflorestamento com espécies nativas e/ou exóticas em áreas degradadas ou desmatadas, com base em inventário florestal e equações alométricas regionalizadas.",
    eligibility: "Áreas desmatadas há pelo menos 10 anos, com comprovação documental. Mínimo de 10 hectares. Demonstração de adicionalidade obrigatória.",
    additionality: "Teste de adicionalidade por análise de barreiras e/ou teste de investimento, demonstrando que a atividade não ocorreria sem o incentivo de créditos de carbono.",
    boundary: "Área do projeto e leakage belt definida conforme orientações da metodologia. Inclui biomassa acima do solo, biomassa abaixo do solo e carbono orgânico no solo (quando aplicável).",
    mrv: "Inventário florestal anual com parcelas permanentes, sensoriamento remoto e equações alométricas regionalizadas. Relatório de monitoramento ao final de cada período de verificação.",
    qaqc: "Calibração de instrumentos, verificação cruzada de dados de campo, procedimentos de controle de qualidade para inventário florestal e revisão interna antes da submissão.",
    safeguards: "Avaliação de impactos ambientais e sociais, respeito a direitos de comunidades tradicionais, conformidade com legislação ambiental vigente e plano de mitigação de impactos adversos.",
    revisions: "v1.0 (2022), v2.0 (2023), v2.1 (2024)",
    documents: [
      "Documento da Metodologia (PDF)",
      "Template DCP",
      "Guia de Monitoramento",
      "Ferramenta de Adicionalidade",
      "Histórico de Revisões",
    ],
  },
  {
    code: "GL-AFOLU-002",
    slug: "gl-afolu-002",
    title: "Sistemas Agroflorestais (SAFs)",
    version: "v1.2",
    program: "AFOLU",
    summary: "Quantificação de carbono sequestrado em sistemas que integram espécies arbóreas com cultivos agrícolas e/ou pecuária, com protocolo de mensuração de biomassa e carbono no solo.",
    eligibility: "Implantação de SAF em áreas previamente de uso agrícola convencional ou degradadas. Mínimo de 5 hectares.",
    additionality: "Demonstração de que o SAF não seria implantado sob práticas convencionais, por análise de barreiras (financeiras, técnicas ou institucionais).",
    boundary: "Área de implantação do SAF. Pools de carbono: biomassa acima e abaixo do solo, carbono orgânico no solo.",
    mrv: "Parcelas permanentes de monitoramento, análise de biomassa acima e abaixo do solo, amostragem de solo em profundidade (0-30cm).",
    qaqc: "Padronização de protocolos de campo, treinamento de equipe, verificação cruzada de medições e revisão interna de relatórios.",
    safeguards: "Avaliação de impactos sobre biodiversidade, conformidade com zoneamento agroecológico e respeito a direitos de uso da terra.",
    revisions: "v1.0 (2023), v1.2 (2024)",
    documents: ["Documento da Metodologia (PDF)", "Template DCP", "Guia de Monitoramento", "Histórico de Revisões"],
  },
  {
    code: "GL-AFOLU-003",
    slug: "gl-afolu-003",
    title: "Redução de Desmatamento (REDD+)",
    version: "v1.0",
    program: "AFOLU",
    summary: "Quantificação de emissões evitadas por meio da proteção de áreas florestais ameaçadas de desmatamento, com base em análise de mudança de uso do solo e monitoramento por satélite.",
    eligibility: "Áreas florestais com risco demonstrável de desmatamento. Análise de adicionalidade obrigatória. Compliance com salvaguardas REDD+ de Cancún.",
    additionality: "Análise de cenário de referência demonstrando taxa de desmatamento projetada e comprovação de que a proteção não ocorreria sem créditos de carbono.",
    boundary: "Área do projeto e área de referência para construção do cenário baseline. Inclui biomassa acima e abaixo do solo.",
    mrv: "Monitoramento por satélite, análise de mudança de uso do solo, verificação in loco com amostragem representativa.",
    qaqc: "Validação de dados de sensoriamento remoto, verificação de campo e revisão independente de cálculos.",
    safeguards: "Compliance com salvaguardas REDD+ de Cancún, consulta livre, prévia e informada de comunidades, avaliação de impactos sobre biodiversidade.",
    revisions: "v1.0 (2024)",
    documents: ["Documento da Metodologia (PDF)", "Template DCP", "Guia de Monitoramento", "Histórico de Revisões"],
  },
  {
    code: "GL-SC-001",
    slug: "gl-sc-001",
    title: "Plantio Direto e Manejo Conservacionista",
    version: "v1.3",
    program: "Soil Carbon",
    summary: "Quantificação do incremento de carbono orgânico no solo em sistemas de plantio direto sobre palha com rotação de culturas, utilizando protocolos de amostragem estratificada.",
    eligibility: "Transição de sistema convencional para plantio direto. Histórico mínimo de 3 anos de dados de manejo. Mínimo de 50 hectares.",
    additionality: "Demonstração de que a adoção de plantio direto não ocorreria sem o incentivo financeiro dos créditos de carbono, por análise de barreiras.",
    boundary: "Camadas de solo de 0-30cm e 30-60cm de profundidade. Pool de carbono: carbono orgânico do solo (SOC).",
    mrv: "Análises de solo em profundidade (0-30cm e 30-60cm), amostragem estratificada com mínimo de 1 ponto por 20 hectares.",
    qaqc: "Laboratórios credenciados, duplicatas de amostras, padronização de métodos analíticos e calibração de equipamentos.",
    safeguards: "Avaliação de impactos sobre recursos hídricos, conformidade com práticas de conservação do solo e legislação ambiental.",
    revisions: "v1.0 (2022), v1.1 (2023), v1.3 (2024)",
    documents: ["Documento da Metodologia (PDF)", "Template DCP", "Guia de Monitoramento", "Protocolo de Amostragem", "Histórico de Revisões"],
  },
  {
    code: "GL-SC-002",
    slug: "gl-sc-002",
    title: "Integração Lavoura-Pecuária-Floresta (ILPF)",
    version: "v1.0",
    program: "Soil Carbon",
    summary: "Metodologia para sistemas integrados que combinam lavoura, pecuária e componente florestal, com quantificação de carbono no solo, na biomassa arbórea e emissões de metano entérico.",
    eligibility: "Implementação de sistema ILPF em áreas de pastagem degradada ou monocultura. Mínimo de 20 hectares.",
    additionality: "Análise de barreiras demonstrando que a integração ILPF não seria adotada sob condições convencionais.",
    boundary: "Área de implantação do ILPF. Pools: SOC, biomassa arbórea, emissões de metano entérico (desconto).",
    mrv: "Monitoramento de carbono no solo, biomassa arbórea (parcelas permanentes) e emissões de metano entérico (fatores de emissão IPCC).",
    qaqc: "Padronização de protocolos de campo, verificação cruzada de dados e controle de qualidade laboratorial.",
    safeguards: "Conformidade com legislação ambiental, avaliação de bem-estar animal e impactos sobre biodiversidade.",
    revisions: "v1.0 (2024)",
    documents: ["Documento da Metodologia (PDF)", "Template DCP", "Guia de Monitoramento", "Histórico de Revisões"],
  },
  {
    code: "GL-ET-001",
    slug: "gl-et-001",
    title: "Biodigestores e Tratamento de Resíduos",
    version: "v2.0",
    program: "Energy & Tech",
    summary: "Quantificação de emissões evitadas pela captura e aproveitamento de metano proveniente de resíduos orgânicos e dejetos, com medição contínua de fluxo e composição de biogás.",
    eligibility: "Instalações com sistema de tratamento de resíduos orgânicos e captura de biogás. Dados de baseline disponíveis ou mensuráveis.",
    additionality: "Análise de investimento e/ou barreiras tecnológicas demonstrando que a captura de biogás não ocorreria sem o incentivo de créditos.",
    boundary: "Sistema de tratamento de resíduos, captura de biogás e queima/aproveitamento energético. Fontes de emissão: metano evitado e emissões do projeto.",
    mrv: "Medição contínua de fluxo de biogás, análise de composição (CH₄, CO₂), registro de operação e manutenção do sistema.",
    qaqc: "Calibração periódica de medidores de fluxo, verificação cruzada de dados e manutenção preventiva de equipamentos.",
    safeguards: "Conformidade com normas de segurança, avaliação de impactos sobre comunidades vizinhas e gestão adequada de efluentes.",
    revisions: "v1.0 (2022), v1.5 (2023), v2.0 (2024)",
    documents: ["Documento da Metodologia (PDF)", "Template DCP", "Guia de Monitoramento", "Histórico de Revisões"],
  },
  {
    code: "GL-ET-002",
    slug: "gl-et-002",
    title: "Eficiência Energética e Tecnologias Limpas",
    version: "v1.0",
    program: "Energy & Tech",
    summary: "Redução de emissões por meio de melhorias em eficiência energética, substituição de combustíveis fósseis e adoção de tecnologias limpas, com baseline setorial e medição contínua.",
    eligibility: "Adoção de tecnologia comprovadamente superior à prática convencional, com dados de baseline disponíveis. Aplicável a setores industrial, comercial e agrícola.",
    additionality: "Teste de investimento e análise de barreiras para demonstrar que a melhoria tecnológica não seria adotada sem o incentivo de créditos.",
    boundary: "Limites operacionais da instalação. Fontes: consumo energético, emissões diretas e indiretas conforme escopo da metodologia.",
    mrv: "Registros de consumo energético, dados de sensores de processo, comparação com baseline setorial e fatores de emissão da rede.",
    qaqc: "Calibração de medidores, verificação cruzada de dados de consumo e procedimentos de controle de qualidade para registros operacionais.",
    safeguards: "Conformidade com normas técnicas e regulatórias, avaliação de impactos ambientais e plano de gestão de resíduos.",
    revisions: "v1.0 (2024)",
    documents: ["Documento da Metodologia (PDF)", "Template DCP", "Guia de Monitoramento", "Histórico de Revisões"],
  },
];

const Methodologies = () => (
  <div className="pt-20">
    <section className="gradient-hero text-primary-foreground py-24 md:py-32">
      <div className="container">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
          Metodologias
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">Metodologias Públicas</h1>
        <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">
          Todas as metodologias aprovadas pela Green Ledger são publicadas em acesso aberto, revisadas por pares e submetidas a consulta pública de 60 dias antes da aprovação pelo Comitê de Metodologias.
        </p>
      </div>
    </section>

    <section className="py-24 md:py-32">
      <div className="container">
        <div className="space-y-8">
          {methodologiesData.map((m) => (
            <div key={m.code} className="bg-card border border-border rounded-xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="font-heading font-bold text-secondary text-sm">{m.code}</span>
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{m.version}</span>
                    <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">{m.program}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-primary mb-3">{m.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{m.summary}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div>
                      <span className="font-semibold text-primary text-xs uppercase tracking-wider">Elegibilidade</span>
                      <p className="text-muted-foreground mt-1.5 leading-relaxed">{m.eligibility}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-primary text-xs uppercase tracking-wider">MRV</span>
                      <p className="text-muted-foreground mt-1.5 leading-relaxed">{m.mrv}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-primary text-xs uppercase tracking-wider">Adicionalidade</span>
                      <p className="text-muted-foreground mt-1.5 leading-relaxed">{m.additionality}</p>
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
