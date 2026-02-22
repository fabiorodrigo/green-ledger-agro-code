import { Link } from "react-router-dom";
import { FileText, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

export const methodologiesData = [
  { code: "GL-AFOLU-001", slug: "gl-afolu-001", title: "Reflorestamento e Restauração de Vegetação Nativa", titleEn: "Reforestation and Native Vegetation Restoration", version: "v2.1", program: "AFOLU", summary: "Quantificação do sequestro de carbono em projetos de reflorestamento com espécies nativas e/ou exóticas em áreas degradadas ou desmatadas, com base em inventário florestal e equações alométricas regionalizadas.", summaryEn: "Carbon sequestration quantification in reforestation projects with native and/or exotic species in degraded or deforested areas, based on forest inventory and regionalized allometric equations.", eligibility: "Áreas desmatadas há pelo menos 10 anos, com comprovação documental. Mínimo de 10 hectares. Demonstração de adicionalidade obrigatória.", eligibilityEn: "Areas deforested for at least 10 years with documented proof. Minimum 10 hectares. Mandatory additionality demonstration.", additionality: "Teste de adicionalidade por análise de barreiras e/ou teste de investimento, demonstrando que a atividade não ocorreria sem o incentivo de créditos de carbono.", additionalityEn: "Additionality test through barrier analysis and/or investment test, demonstrating the activity would not occur without carbon credit incentives.", boundary: "Área do projeto e leakage belt definida conforme orientações da metodologia.", mrv: "Inventário florestal anual com parcelas permanentes, sensoriamento remoto e equações alométricas regionalizadas.", mrvEn: "Annual forest inventory with permanent plots, remote sensing and regionalized allometric equations.", qaqc: "Calibração de instrumentos, verificação cruzada de dados de campo, procedimentos de controle de qualidade para inventário florestal e revisão interna antes da submissão.", safeguards: "Avaliação de impactos ambientais e sociais, respeito a direitos de comunidades tradicionais, conformidade com legislação ambiental vigente e plano de mitigação de impactos adversos.", revisions: "v1.0 (2022), v2.0 (2023), v2.1 (2024)", documents: ["Documento da Metodologia (PDF)", "Template DCP", "Guia de Monitoramento", "Ferramenta de Adicionalidade", "Histórico de Revisões"] },
  { code: "GL-AFOLU-002", slug: "gl-afolu-002", title: "Sistemas Agroflorestais (SAFs)", titleEn: "Agroforestry Systems", version: "v1.2", program: "AFOLU", summary: "Quantificação de carbono sequestrado em sistemas que integram espécies arbóreas com cultivos agrícolas e/ou pecuária.", summaryEn: "Carbon sequestration quantification in systems integrating tree species with agricultural crops and/or livestock.", eligibility: "Implantação de SAF em áreas previamente de uso agrícola convencional ou degradadas. Mínimo de 5 hectares.", eligibilityEn: "SAF implementation in previously conventional agricultural or degraded areas. Minimum 5 hectares.", additionality: "Demonstração de que o SAF não seria implantado sob práticas convencionais, por análise de barreiras.", additionalityEn: "Demonstration that SAF would not be implemented under conventional practices, through barrier analysis.", boundary: "Área de implantação do SAF.", mrv: "Parcelas permanentes de monitoramento, análise de biomassa acima e abaixo do solo, amostragem de solo em profundidade.", mrvEn: "Permanent monitoring plots, above and below-ground biomass analysis, depth soil sampling.", qaqc: "Padronização de protocolos de campo, treinamento de equipe, verificação cruzada de medições.", safeguards: "Avaliação de impactos sobre biodiversidade, conformidade com zoneamento agroecológico.", revisions: "v1.0 (2023), v1.2 (2024)", documents: ["Documento da Metodologia (PDF)", "Template DCP", "Guia de Monitoramento", "Histórico de Revisões"] },
  { code: "GL-AFOLU-003", slug: "gl-afolu-003", title: "Redução de Desmatamento (REDD+)", titleEn: "Avoided Deforestation (REDD+)", version: "v1.0", program: "AFOLU", summary: "Quantificação de emissões evitadas por meio da proteção de áreas florestais ameaçadas de desmatamento.", summaryEn: "Quantification of avoided emissions through protection of forest areas threatened by deforestation.", eligibility: "Áreas florestais com risco demonstrável de desmatamento. Compliance com salvaguardas REDD+ de Cancún.", eligibilityEn: "Forest areas with demonstrable deforestation risk. Compliance with Cancún REDD+ safeguards.", additionality: "Análise de cenário de referência demonstrando taxa de desmatamento projetada.", additionalityEn: "Reference scenario analysis demonstrating projected deforestation rate.", boundary: "Área do projeto e área de referência.", mrv: "Monitoramento por satélite, análise de mudança de uso do solo, verificação in loco.", mrvEn: "Satellite monitoring, land use change analysis, on-site verification.", qaqc: "Validação de dados de sensoriamento remoto, verificação de campo.", safeguards: "Compliance com salvaguardas REDD+ de Cancún, consulta livre, prévia e informada.", revisions: "v1.0 (2024)", documents: ["Documento da Metodologia (PDF)", "Template DCP", "Guia de Monitoramento", "Histórico de Revisões"] },
  { code: "GL-SC-001", slug: "gl-sc-001", title: "Plantio Direto e Manejo Conservacionista", titleEn: "No-Till Farming and Conservation Management", version: "v1.3", program: "Soil Carbon", summary: "Quantificação do incremento de carbono orgânico no solo em sistemas de plantio direto sobre palha com rotação de culturas.", summaryEn: "Quantification of soil organic carbon increment in no-till systems with crop rotation.", eligibility: "Transição de sistema convencional para plantio direto. Mínimo de 50 hectares.", eligibilityEn: "Transition from conventional to no-till system. Minimum 50 hectares.", additionality: "Demonstração de que a adoção de plantio direto não ocorreria sem o incentivo financeiro.", additionalityEn: "Demonstration that no-till adoption would not occur without financial incentive.", boundary: "Camadas de solo de 0-30cm e 30-60cm.", mrv: "Análises de solo em profundidade, amostragem estratificada com mínimo de 1 ponto por 20 hectares.", mrvEn: "Depth soil analyses, stratified sampling with minimum 1 point per 20 hectares.", qaqc: "Laboratórios credenciados, duplicatas de amostras, padronização de métodos analíticos.", safeguards: "Avaliação de impactos sobre recursos hídricos.", revisions: "v1.0 (2022), v1.1 (2023), v1.3 (2024)", documents: ["Documento da Metodologia (PDF)", "Template DCP", "Guia de Monitoramento", "Protocolo de Amostragem", "Histórico de Revisões"] },
  { code: "GL-SC-002", slug: "gl-sc-002", title: "Integração Lavoura-Pecuária-Floresta (ILPF)", titleEn: "Crop-Livestock-Forestry Integration (CLFI)", version: "v1.0", program: "Soil Carbon", summary: "Metodologia para sistemas integrados que combinam lavoura, pecuária e componente florestal.", summaryEn: "Methodology for integrated systems combining crop, livestock and forestry components.", eligibility: "Implementação de sistema ILPF em áreas de pastagem degradada. Mínimo de 20 hectares.", eligibilityEn: "ILPF system implementation in degraded pasture areas. Minimum 20 hectares.", additionality: "Análise de barreiras demonstrando que a integração ILPF não seria adotada convencionalmente.", additionalityEn: "Barrier analysis demonstrating ILPF integration would not be adopted conventionally.", boundary: "Área de implantação do ILPF.", mrv: "Monitoramento de carbono no solo, biomassa arbórea e emissões de metano entérico.", mrvEn: "Soil carbon, tree biomass and enteric methane emissions monitoring.", qaqc: "Padronização de protocolos de campo, verificação cruzada de dados.", safeguards: "Conformidade com legislação ambiental, avaliação de bem-estar animal.", revisions: "v1.0 (2024)", documents: ["Documento da Metodologia (PDF)", "Template DCP", "Guia de Monitoramento", "Histórico de Revisões"] },
  { code: "GL-ET-001", slug: "gl-et-001", title: "Biodigestores e Tratamento de Resíduos", titleEn: "Biodigesters and Waste Treatment", version: "v2.0", program: "Energy & Tech", summary: "Quantificação de emissões evitadas pela captura e aproveitamento de metano proveniente de resíduos orgânicos.", summaryEn: "Quantification of avoided emissions from methane capture and utilization from organic waste.", eligibility: "Instalações com sistema de tratamento de resíduos orgânicos e captura de biogás.", eligibilityEn: "Facilities with organic waste treatment and biogas capture systems.", additionality: "Análise de investimento e/ou barreiras tecnológicas.", additionalityEn: "Investment and/or technology barrier analysis.", boundary: "Sistema de tratamento de resíduos, captura de biogás e queima/aproveitamento energético.", mrv: "Medição contínua de fluxo de biogás, análise de composição (CH₄, CO₂).", mrvEn: "Continuous biogas flow measurement, composition analysis (CH₄, CO₂).", qaqc: "Calibração periódica de medidores de fluxo, verificação cruzada de dados.", safeguards: "Conformidade com normas de segurança, avaliação de impactos sobre comunidades.", revisions: "v1.0 (2022), v1.5 (2023), v2.0 (2024)", documents: ["Documento da Metodologia (PDF)", "Template DCP", "Guia de Monitoramento", "Histórico de Revisões"] },
  { code: "GL-ET-002", slug: "gl-et-002", title: "Eficiência Energética e Tecnologias Limpas", titleEn: "Energy Efficiency and Clean Technologies", version: "v1.0", program: "Energy & Tech", summary: "Redução de emissões por meio de melhorias em eficiência energética, substituição de combustíveis fósseis e adoção de tecnologias limpas.", summaryEn: "Emissions reduction through energy efficiency improvements, fossil fuel substitution and clean technology adoption.", eligibility: "Adoção de tecnologia comprovadamente superior à prática convencional.", eligibilityEn: "Adoption of technology proven superior to conventional practice.", additionality: "Teste de investimento e análise de barreiras.", additionalityEn: "Investment test and barrier analysis.", boundary: "Limites operacionais da instalação.", mrv: "Registros de consumo energético, dados de sensores de processo.", mrvEn: "Energy consumption records, process sensor data.", qaqc: "Calibração de medidores, verificação cruzada de dados de consumo.", safeguards: "Conformidade com normas técnicas e regulatórias.", revisions: "v1.0 (2024)", documents: ["Documento da Metodologia (PDF)", "Template DCP", "Guia de Monitoramento", "Histórico de Revisões"] },
];

const Methodologies = () => {
  const { t, locale } = useLanguage();
  const isEn = locale === "en";

  return (
    <div className="pt-20">
      <SEOHead
        title={t("meth.hero.title")}
        description={t("meth.hero.desc")}
        path="/metodologias"
      />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            {t("meth.hero.tag")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("meth.hero.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("meth.hero.desc")}</p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container">
          <div className="flex justify-end mb-8">
            <a
              href="https://app.greenledger.eco.br/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
            >
              {isEn ? "Propose Methodology" : "Propor Metodologia"} <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="space-y-8">
            {methodologiesData.map((m, i) => (
              <AnimatedSection key={m.code} delay={i * 0.06}>
                <div className="bg-card border border-border rounded-xl p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className="font-heading font-bold text-secondary text-sm">{m.code}</span>
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{m.version}</span>
                        <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">{m.program}</span>
                      </div>
                      <h3 className="font-heading font-semibold text-xl text-primary mb-3">{isEn ? m.titleEn : m.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">{isEn ? m.summaryEn : m.summary}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div>
                          <span className="font-semibold text-primary text-xs uppercase tracking-wider">{t("meth.eligibility")}</span>
                          <p className="text-muted-foreground mt-1.5 leading-relaxed">{isEn ? m.eligibilityEn : m.eligibility}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-primary text-xs uppercase tracking-wider">{t("meth.mrv")}</span>
                          <p className="text-muted-foreground mt-1.5 leading-relaxed">{isEn ? m.mrvEn : m.mrv}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-primary text-xs uppercase tracking-wider">{t("meth.additionality")}</span>
                          <p className="text-muted-foreground mt-1.5 leading-relaxed">{isEn ? m.additionalityEn : m.additionality}</p>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Link to={`/metodologias/${m.slug}`}>
                        <Button variant="outline" size="sm" className="gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                          <FileText className="w-4 h-4" /> {t("meth.details")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Methodologies;
