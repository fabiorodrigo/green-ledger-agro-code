import { Shield, Eye, FileSearch, Users, Scale, BookOpen, AlertTriangle } from "lucide-react";
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

const Governance = () => {
  const { t, locale } = useLanguage();
  const isEn = locale === "en";
  const sections = isEn ? sectionsEn : sectionsPt;

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
    </div>
  );
};

export default Governance;
