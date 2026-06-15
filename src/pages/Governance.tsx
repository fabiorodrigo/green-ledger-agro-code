import { Shield, Eye, FileSearch, Users, Scale, BookOpen, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

const sectionsPt = [
  { icon: Users, title: "Conselho Técnico", description: "Órgão máximo de governança técnica da Green Ledger, composto por especialistas independentes com reconhecida competência em mudanças climáticas, ciência do carbono e verificação ambiental.", items: ["Composição mínima de 7 membros com mandato de 3 anos", "Seleção por competência técnica, diversidade geográfica e independência", "Declaração obrigatória de conflito de interesse e confidencialidade", "Reuniões ordinárias trimestrais com atas publicadas em acesso aberto", "Responsável pela aprovação de políticas, normas e diretrizes gerais"] },
  { icon: FileSearch, title: "Comitê de Metodologias", description: "Responsável pela avaliação técnica, aprovação e revisão periódica de todas as metodologias de quantificação da Green Ledger, assegurando rigor científico e alinhamento com melhores práticas.", items: ["Avaliação técnica de novas propostas de metodologia", "Revisão por pares com mínimo de 3 revisores independentes qualificados", "Consulta pública de 60 dias com resposta documentada a cada comentário", "Revisão periódica obrigatória a cada 3 anos ou quando necessário", "Aprovação formal com publicação de justificativa técnica"] },
  { icon: Scale, title: "Processo de Revisão", description: "Ciclo estruturado de revisão e atualização de metodologias, normas e procedimentos, garantindo que os padrões da Green Ledger permaneçam alinhados com avanços científicos e regulatórios.", items: ["Proposta de revisão por equipe técnica, stakeholders ou revisão periódica programada", "Avaliação de impacto e análise comparativa com padrões internacionais", "Revisão por pares e consulta pública conforme procedimento padrão", "Deliberação pelo Comitê de Metodologias com parecer fundamentado", "Publicação da versão atualizada com registro de alterações e justificativas"] },
  { icon: Shield, title: "Política de Integridade", description: "Princípios fundamentais que regem a emissão de créditos pela Green Ledger, assegurando que cada unidade certificada represente uma redução ou remoção real, mensurável, adicional e permanente.", items: ["Adicionalidade: testes rigorosos para comprovar que a atividade não ocorreria sem o incentivo do carbono", "Permanência: buffer pool e mecanismos de garantia contra reversões de longo prazo", "Conservadorismo: fatores de desconto e abordagens conservadoras na quantificação", "Evitar dupla contagem: rastreabilidade com número de série único e registro centralizado", "Salvaguardas ambientais e sociais: avaliação de impactos e respeito a direitos de comunidades"] },
  { icon: AlertTriangle, title: "Gestão de Risco", description: "Estrutura de identificação, avaliação e mitigação de riscos associados à integridade dos créditos, incluindo riscos de não-permanência, fraude, conflito de interesse e não-conformidade.", items: ["Avaliação de risco de não-permanência com contribuição ao buffer pool proporcional", "Due diligence de desenvolvedores de projetos e organismos de auditoria", "Mecanismo formal de reclamações, denúncias e apelação", "Procedimentos de suspensão, revogação e cancelamento de créditos", "Monitoramento contínuo de riscos sistêmicos e emergentes"] },
  { icon: Eye, title: "Independência de Auditoria", description: "Organismos de validação e verificação (VVBs) credenciados pela Green Ledger atuam com independência assegurada por requisitos de competência técnica, rotação e supervisão de qualidade.", items: ["Credenciamento com avaliação de competência técnica setorial e independência", "Rotação obrigatória de auditores a cada 5 anos por projeto", "Proibição de conflito de interesse entre validação, verificação e consultoria", "Supervisão da qualidade das auditorias por comitê independente", "Avaliação de desempenho e recertificação periódica dos VVBs"] },
  { icon: BookOpen, title: "Transparência", description: "Compromisso com a publicação em acesso aberto de todas as informações relevantes para assegurar a confiança dos mercados e stakeholders.", items: ["Registro público de todos os projetos certificados com dados de desempenho", "Metodologias aprovadas disponíveis para download sem restrições", "Relatórios de validação e verificação publicados integralmente", "Atas de reuniões dos comitês e decisões regulatórias documentadas", "Alinhamento com ICVCM Core Carbon Principles e marcos regulatórios nacionais"] },
];

const sectionsEn = [
  { icon: Users, title: "Technical Council", description: "Green Ledger's highest technical governance body, composed of independent specialists with recognized expertise in climate change, carbon science and environmental verification.", items: ["Minimum of 7 members with 3-year terms", "Selection by technical competence, geographic diversity and independence", "Mandatory conflict of interest and confidentiality declarations", "Quarterly meetings with minutes published openly", "Responsible for approving policies, standards and general guidelines"] },
  { icon: FileSearch, title: "Methodology Committee", description: "Responsible for technical assessment, approval and periodic review of all Green Ledger quantification methodologies, ensuring scientific rigor and alignment with best practices.", items: ["Technical assessment of new methodology proposals", "Peer review by minimum 3 qualified independent reviewers", "60-day public consultation with documented response to each comment", "Mandatory periodic review every 3 years or as needed", "Formal approval with published technical justification"] },
  { icon: Scale, title: "Review Process", description: "Structured review and update cycle for methodologies, standards and procedures, ensuring Green Ledger standards remain aligned with scientific and regulatory advances.", items: ["Revision proposal by technical team, stakeholders or scheduled periodic review", "Impact assessment and comparative analysis with international standards", "Peer review and public consultation per standard procedure", "Deliberation by Methodology Committee with reasoned opinion", "Updated version publication with change log and justifications"] },
  { icon: Shield, title: "Integrity Policy", description: "Fundamental principles governing credit issuance by Green Ledger, ensuring each certified unit represents a real, measurable, additional and permanent reduction or removal.", items: ["Additionality: rigorous tests to prove activity would not occur without carbon incentive", "Permanence: buffer pool and guarantee mechanisms against long-term reversals", "Conservatism: discount factors and conservative quantification approaches", "Avoiding double counting: traceability with unique serial numbers and centralized registry", "Environmental and social safeguards: impact assessment and respect for community rights"] },
  { icon: AlertTriangle, title: "Risk Management", description: "Framework for identifying, assessing and mitigating risks to credit integrity, including non-permanence, fraud, conflict of interest and non-compliance risks.", items: ["Non-permanence risk assessment with proportional buffer pool contribution", "Due diligence of project developers and audit bodies", "Formal complaints, whistleblowing and appeals mechanism", "Credit suspension, revocation and cancellation procedures", "Continuous monitoring of systemic and emerging risks"] },
  { icon: Eye, title: "Audit Independence", description: "Validation and verification bodies (VVBs) accredited by Green Ledger operate with independence ensured by technical competence, rotation and quality supervision requirements.", items: ["Accreditation with sectoral technical competence and independence assessment", "Mandatory auditor rotation every 5 years per project", "Prohibition of conflict of interest between validation, verification and consulting", "Audit quality supervision by independent committee", "Performance assessment and periodic VVB recertification"] },
  { icon: BookOpen, title: "Transparency", description: "Commitment to open access publication of all relevant information to ensure market and stakeholder confidence.", items: ["Public registry of all certified projects with performance data", "Approved methodologies available for unrestricted download", "Validation and verification reports published in full", "Committee meeting minutes and regulatory decisions documented", "Alignment with ICVCM Core Carbon Principles and national regulatory frameworks"] },
];

const sectionsEs = [
  { icon: Users, title: "Consejo Técnico", description: "Órgano máximo de gobernanza técnica de Green Ledger, compuesto por especialistas independientes con reconocida competencia en cambio climático, ciencia del carbono y verificación ambiental.", items: ["Composición mínima de 7 miembros con mandato de 3 años", "Selección por competencia técnica, diversidad geográfica e independencia", "Declaración obligatoria de conflicto de interés y confidencialidad", "Reuniones ordinarias trimestrales con actas publicadas en acceso abierto", "Responsable de la aprobación de políticas, normas y directrices generales"] },
  { icon: FileSearch, title: "Comité de Metodologías", description: "Responsable de la evaluación técnica, aprobación y revisión periódica de todas las metodologías de cuantificación de Green Ledger, asegurando rigor científico y alineación con las mejores prácticas.", items: ["Evaluación técnica de nuevas propuestas de metodología", "Revisión por pares con un mínimo de 3 revisores independientes calificados", "Consulta pública de 60 días con respuesta documentada a cada comentario", "Revisión periódica obligatoria cada 3 años o cuando sea necesario", "Aprobación formal con publicación de justificación técnica"] },
  { icon: Scale, title: "Proceso de Revisión", description: "Ciclo estructurado de revisión y actualización de metodologías, normas y procedimientos, garantizando que los estándares de Green Ledger permanezcan alineados con los avances científicos y regulatorios.", items: ["Propuesta de revisión por el equipo técnico, partes interesadas o revisión periódica programada", "Evaluación de impacto y análisis comparativo con estándares internacionales", "Revisión por pares y consulta pública conforme al procedimiento estándar", "Deliberación por el Comité de Metodologías con dictamen fundamentado", "Publicación de la versión actualizada con registro de cambios y justificaciones"] },
  { icon: Shield, title: "Política de Integridad", description: "Principios fundamentales que rigen la emisión de créditos por Green Ledger, asegurando que cada unidad certificada represente una reducción o remoción real, mensurable, adicional y permanente.", items: ["Adicionalidad: pruebas rigurosas para comprobar que la actividad no ocurriría sin el incentivo del carbono", "Permanencia: buffer pool y mecanismos de garantía contra reversiones a largo plazo", "Conservadurismo: factores de descuento y enfoques conservadores en la cuantificación", "Evitar la doble contabilidad: trazabilidad con número de serie único y registro centralizado", "Salvaguardas ambientales y sociales: evaluación de impactos y respeto a los derechos de las comunidades"] },
  { icon: AlertTriangle, title: "Gestión de Riesgos", description: "Estructura de identificación, evaluación y mitigación de riesgos asociados a la integridad de los créditos, incluyendo riesgos de no permanencia, fraude, conflicto de interés e incumplimiento.", items: ["Evaluación de riesgo de no permanencia con contribución proporcional al buffer pool", "Debida diligencia de desarrolladores de proyectos y organismos de auditoría", "Mecanismo formal de reclamaciones, denuncias y apelación", "Procedimientos de suspensión, revocación y cancelación de créditos", "Monitoreo continuo de riesgos sistémicos y emergentes"] },
  { icon: Eye, title: "Independencia de Auditoría", description: "Los organismos de validación y verificación (VVB) acreditados por Green Ledger actúan con independencia asegurada por requisitos de competencia técnica, rotación y supervisión de calidad.", items: ["Acreditación con evaluación de competencia técnica sectorial e independencia", "Rotación obligatoria de auditores cada 5 años por proyecto", "Prohibición de conflicto de interés entre validación, verificación y consultoría", "Supervisión de la calidad de las auditorías por un comité independiente", "Evaluación de desempeño y recertificación periódica de los VVB"] },
  { icon: BookOpen, title: "Transparencia", description: "Compromiso con la publicación en acceso abierto de toda la información relevante para asegurar la confianza de los mercados y las partes interesadas.", items: ["Registro público de todos los proyectos certificados con datos de desempeño", "Metodologías aprobadas disponibles para descarga sin restricciones", "Informes de validación y verificación publicados íntegramente", "Actas de reuniones de los comités y decisiones regulatorias documentadas", "Alineación con los ICVCM Core Carbon Principles y marcos regulatorios nacionales"] },
];

const Governance = () => {
  const { t, tr, locale } = useLanguage();
  const sections = locale === "en" ? sectionsEn : locale === "es" ? sectionsEs : sectionsPt;

  return (
    <div className="pt-20">
      <SEOHead
        title={t("gov.hero.title")}
        description={t("gov.hero.desc")}
        path="/governanca"
      />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            {t("gov.hero.tag")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("gov.hero.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("gov.hero.desc")}</p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container max-w-5xl">
          <div className="space-y-16">
            {sections.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.06}>
                <div className="flex flex-col md:flex-row gap-8">
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
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/20">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary mb-4">
              {tr("Registro Público", "Public Registry", "Registro Público")}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              {tr(
                "Acesse o registro público de projetos certificados e ativos de carbono verificados em nossa plataforma.",
                "Access the public registry of certified projects and verified carbon assets on our platform.",
                "Acceda al registro público de proyectos certificados y activos de carbono verificados en nuestra plataforma."
              )}
            </p>
            <a href="https://plataforma.greenledger.eco.br/public/assets" target="_blank" rel="noopener noreferrer">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                {tr("Acessar Registro Público", "Access Public Registry", "Acceder al Registro Público")} <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Governance;
