import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, Search, FileCheck, Activity, ShieldCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

const stepsPt = [
  { icon: ClipboardCheck, num: "01", title: "Registro do Projeto", description: "O desenvolvedor do projeto submete o Documento de Concepção do Projeto (DCP) à Green Ledger, incluindo descrição da atividade, análise de adicionalidade, delimitação do boundary do projeto e plano de monitoramento proposto.", details: ["Submissão do DCP conforme template da metodologia aplicável", "Documentação de titularidade ou direito de uso sobre a área/atividade", "Pagamento da taxa de registro conforme tabela de tarifas", "Análise de completude pela equipe técnica (prazo: 15 dias úteis)", "Publicação do projeto para consulta pública (30 dias)"] },
  { icon: Search, num: "02", title: "Avaliação de Elegibilidade", description: "A equipe técnica da Green Ledger avalia se o projeto atende aos critérios de elegibilidade definidos pela metodologia, incluindo adicionalidade, limites do projeto, conformidade regulatória e salvaguardas ambientais e sociais.", details: ["Verificação dos critérios de elegibilidade da metodologia", "Avaliação de adicionalidade conforme ferramenta de teste aplicável", "Análise da delimitação do boundary do projeto", "Avaliação de conformidade com salvaguardas ambientais e sociais", "Parecer técnico de elegibilidade (aprovação, solicitação de revisão ou rejeição)"] },
  { icon: FileCheck, num: "03", title: "Validação", description: "Um organismo de validação/verificação (VVB) independente, credenciado pela Green Ledger, realiza a análise técnica do projeto para confirmar a conformidade com os requisitos da metodologia e a robustez da quantificação proposta.", details: ["Designação de VVB independente credenciado pela Green Ledger", "Revisão documental e verificação da análise de adicionalidade", "Avaliação do plano de monitoramento e protocolos de QA/QC", "Visita técnica ao projeto (quando aplicável)", "Relatório de validação com parecer de conformidade"] },
  { icon: Activity, num: "04", title: "Monitoramento", description: "O desenvolvedor implementa o plano de monitoramento aprovado, coletando dados conforme os protocolos de Mensuração, Relato e Verificação (MRV) da metodologia ao longo do período de creditação. Todos os dados são registrados na plataforma blockchain da Green Ledger.", details: ["Implementação do plano de monitoramento conforme DCP aprovado", "Coleta de dados conforme protocolos de MRV da metodologia", "Aplicação de procedimentos de QA/QC para assegurar a qualidade dos dados", "Registro contínuo na plataforma blockchain da Green Ledger", "Preparação do relatório de monitoramento ao final de cada período de verificação"] },
  { icon: ShieldCheck, num: "05", title: "Verificação Independente", description: "Um VVB independente audita os dados de monitoramento, verifica a conformidade com a metodologia e confirma a quantidade de reduções ou remoções de emissões de GEE alcançadas no período.", details: ["Designação de VVB independente (distinto do validador quando aplicável)", "Auditoria dos dados e registros de monitoramento", "Verificação in loco com amostragem representativa", "Recálculo independente das reduções/remoções de GEE", "Relatório de verificação com quantificação confirmada"] },
  { icon: Award, num: "06", title: "Emissão de Créditos", description: "Após verificação positiva e revisão final, a Green Ledger emite os créditos de carbono certificados na plataforma blockchain, cada um com número de série único e registro imutável, garantindo rastreabilidade total e impossibilidade de dupla contagem.", details: ["Revisão final pela equipe técnica da Green Ledger", "Dedução da contribuição ao buffer pool (quando aplicável, para mitigação de risco de não-permanência)", "Emissão dos créditos com número de série único na blockchain", "Registro imutável na plataforma blockchain da Green Ledger", "Créditos disponíveis para transferência, aposentadoria ou cancelamento via smart contracts"] },
];

const stepsEn = [
  { icon: ClipboardCheck, num: "01", title: "Project Registration", description: "The project developer submits the Project Design Document (PDD) to Green Ledger, including activity description, additionality analysis, project boundary delineation and proposed monitoring plan.", details: ["PDD submission per applicable methodology template", "Documentation of ownership or rights over the area/activity", "Registration fee payment per fee schedule", "Completeness review by technical team (15 business days)", "Project publication for public consultation (30 days)"] },
  { icon: Search, num: "02", title: "Eligibility Assessment", description: "Green Ledger's technical team assesses whether the project meets the eligibility criteria defined by the methodology, including additionality, project boundaries, regulatory compliance and environmental and social safeguards.", details: ["Verification of methodology eligibility criteria", "Additionality assessment per applicable testing tool", "Project boundary delineation analysis", "Compliance with environmental and social safeguards", "Technical eligibility opinion (approval, revision request or rejection)"] },
  { icon: FileCheck, num: "03", title: "Validation", description: "An independent validation/verification body (VVB), accredited by Green Ledger, performs the technical analysis of the project to confirm compliance with methodology requirements and the robustness of proposed quantification.", details: ["Assignment of Green Ledger-accredited independent VVB", "Document review and additionality analysis verification", "Monitoring plan and QA/QC protocol assessment", "Technical site visit (when applicable)", "Validation report with compliance opinion"] },
  { icon: Activity, num: "04", title: "Monitoring", description: "The developer implements the approved monitoring plan, collecting data per the Measurement, Reporting and Verification (MRV) protocols of the methodology throughout the crediting period. All data is recorded on Green Ledger's blockchain platform.", details: ["Monitoring plan implementation per approved PDD", "Data collection per methodology MRV protocols", "QA/QC procedures to ensure data quality", "Continuous recording on Green Ledger's blockchain platform", "Monitoring report at end of each verification period"] },
  { icon: ShieldCheck, num: "05", title: "Independent Verification", description: "An independent VVB audits the monitoring data, verifies compliance with the methodology and confirms the quantity of GHG emission reductions or removals achieved in the period.", details: ["Assignment of independent VVB (distinct from validator when applicable)", "Audit of monitoring data and records", "On-site verification with representative sampling", "Independent recalculation of GHG reductions/removals", "Verification report with confirmed quantification"] },
  { icon: Award, num: "06", title: "Credit Issuance", description: "After positive verification and final review, Green Ledger issues the certified carbon credits on the blockchain platform, each with a unique serial number and immutable record, ensuring full traceability and prevention of double counting.", details: ["Final review by Green Ledger's technical team", "Buffer pool contribution deduction (when applicable, for non-permanence risk mitigation)", "Credit issuance with unique serial number on blockchain", "Immutable registration on Green Ledger's blockchain platform", "Credits available for transfer, retirement or cancellation via smart contracts"] },
];

const stepsEs = [
  { icon: ClipboardCheck, num: "01", title: "Registro del Proyecto", description: "El desarrollador del proyecto presenta el Documento de Concepción del Proyecto (DCP) a Green Ledger, incluyendo descripción de la actividad, análisis de adicionalidad, delimitación del boundary del proyecto y plan de monitoreo propuesto.", details: ["Presentación del DCP conforme a la plantilla de la metodología aplicable", "Documentación de titularidad o derecho de uso sobre el área/actividad", "Pago de la tasa de registro conforme a la tabla de tarifas", "Análisis de completitud por el equipo técnico (plazo: 15 días hábiles)", "Publicación del proyecto para consulta pública (30 días)"] },
  { icon: Search, num: "02", title: "Evaluación de Elegibilidad", description: "El equipo técnico de Green Ledger evalúa si el proyecto cumple con los criterios de elegibilidad definidos por la metodología, incluyendo adicionalidad, límites del proyecto, conformidad regulatoria y salvaguardas ambientales y sociales.", details: ["Verificación de los criterios de elegibilidad de la metodología", "Evaluación de adicionalidad conforme a la herramienta de prueba aplicable", "Análisis de la delimitación del boundary del proyecto", "Evaluación de conformidad con salvaguardas ambientales y sociales", "Dictamen técnico de elegibilidad (aprobación, solicitud de revisión o rechazo)"] },
  { icon: FileCheck, num: "03", title: "Validación", description: "Un organismo de validación/verificación (VVB) independiente, acreditado por Green Ledger, realiza el análisis técnico del proyecto para confirmar la conformidad con los requisitos de la metodología y la robustez de la cuantificación propuesta.", details: ["Designación de VVB independiente acreditado por Green Ledger", "Revisión documental y verificación del análisis de adicionalidad", "Evaluación del plan de monitoreo y protocolos de QA/QC", "Visita técnica al proyecto (cuando sea aplicable)", "Informe de validación con dictamen de conformidad"] },
  { icon: Activity, num: "04", title: "Monitoreo", description: "El desarrollador implementa el plan de monitoreo aprobado, recopilando datos conforme a los protocolos de Medición, Reporte y Verificación (MRV) de la metodología a lo largo del período de creditación. Todos los datos se registran en la plataforma blockchain de Green Ledger.", details: ["Implementación del plan de monitoreo conforme al DCP aprobado", "Recopilación de datos conforme a los protocolos de MRV de la metodología", "Aplicación de procedimientos de QA/QC para asegurar la calidad de los datos", "Registro continuo en la plataforma blockchain de Green Ledger", "Preparación del informe de monitoreo al final de cada período de verificación"] },
  { icon: ShieldCheck, num: "05", title: "Verificación Independiente", description: "Un VVB independiente audita los datos de monitoreo, verifica la conformidad con la metodología y confirma la cantidad de reducciones o remociones de emisiones de GEI alcanzadas en el período.", details: ["Designación de VVB independiente (distinto del validador cuando sea aplicable)", "Auditoría de los datos y registros de monitoreo", "Verificación in situ con muestreo representativo", "Recálculo independiente de las reducciones/remociones de GEI", "Informe de verificación con cuantificación confirmada"] },
  { icon: Award, num: "06", title: "Emisión de Créditos", description: "Tras la verificación positiva y la revisión final, Green Ledger emite los créditos de carbono certificados en la plataforma blockchain, cada uno con número de serie único y registro inmutable, garantizando trazabilidad total e imposibilidad de doble contabilidad.", details: ["Revisión final por el equipo técnico de Green Ledger", "Deducción de la contribución al buffer pool (cuando sea aplicable, para mitigación de riesgo de no permanencia)", "Emisión de los créditos con número de serie único en la blockchain", "Registro inmutable en la plataforma blockchain de Green Ledger", "Créditos disponibles para transferencia, retiro o cancelación vía smart contracts"] },
];

const CertificationProcess = () => {
  const { t, tr, locale } = useLanguage();
  const steps = locale === "en" ? stepsEn : locale === "es" ? stepsEs : stepsPt;

  return (
    <div className="pt-20">
      <SEOHead
        title={t("cert.hero.title")}
        description={t("cert.hero.desc")}
        path="/certificacao"
      />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            {t("cert.hero.tag")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("cert.hero.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("cert.hero.desc")}</p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container max-w-4xl">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-20">
              {steps.map((step, i) => (
                <AnimatedSection key={step.num} delay={i * 0.08}>
                  <div className="relative flex gap-10">
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
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("cert.step")} {step.num}</span>
                      </div>
                      <span className="hidden md:inline-block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{t("cert.step")} {step.num}</span>
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
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/20">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary mb-8">{t("cert.principles.title")}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {([
              { title: t("cert.principles.additionality"), desc: t("cert.principles.additionality.desc") },
              { title: t("cert.principles.permanence"), desc: t("cert.principles.permanence.desc") },
              { title: t("cert.principles.conservatism"), desc: t("cert.principles.conservatism.desc") },
              { title: t("cert.principles.traceability"), desc: t("cert.principles.traceability.desc") },
            ]).map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.1}>
                <div className="p-6 border border-border rounded-xl">
                  <h4 className="font-heading font-semibold text-primary mb-2">{p.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary mb-4">{t("cert.cta.title")}</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{t("cert.cta.desc")}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://plataforma.greenledger.eco.br/register"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                  {tr("Iniciar Certificação", "Start Certification", "Iniciar Certificación")} <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Link to="/contato">
                <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  {t("cert.cta.btn1")} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/documentacao">
                <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  {t("cert.cta.btn2")} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default CertificationProcess;
