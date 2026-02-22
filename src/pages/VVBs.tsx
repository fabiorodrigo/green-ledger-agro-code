import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Shield, Globe, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { usePublicVvbs } from "@/hooks/usePublicAPI";

const i18n = {
  pt: {
    seoTitle: "VVBs Credenciados", seoDesc: "Conheça os Organismos de Validação e Verificação credenciados pela Green Ledger.",
    statVvbs: "VVBs Credenciados", statAudits: "Verificações Realizadas", statSectors: "Setores Cobertos",
    accreditedTitle: "Organismos Credenciados",
    since: "Acreditado desde", audits: "verificações",
    scales: "Escalas", sectors: "Setores", activities: "Tipos de Atividade",
    processTitle: "Processo de Credenciamento", processDesc: "Para se tornar um VVB credenciado pela Green Ledger, o organismo deve seguir o processo abaixo.",
    process: [
      { step: "01", title: "Solicitação", desc: "O organismo interessado submete formulário de solicitação com documentação comprobatória de competência técnica e experiência." },
      { step: "02", title: "Avaliação Documental", desc: "A equipe da Green Ledger analisa a documentação, verifica referências e avalia a conformidade com os requisitos." },
      { step: "03", title: "Avaliação Técnica", desc: "Entrevista técnica com a equipe de auditoria e avaliação prática de competência por setor de atuação." },
      { step: "04", title: "Credenciamento", desc: "Aprovação pelo Comitê de Credenciamento, emissão do certificado e publicação no registro de VVBs." },
    ],
    reqTitle: "Requisitos de Credenciamento",
    requirements: [
      "Pessoa jurídica com registro ativo e idoneidade comprovada",
      "Equipe técnica com qualificação comprovada nos setores de atuação",
      "Experiência mínima de 3 anos em auditoria ambiental ou de carbono",
      "Sistema de gestão da qualidade documentado (ISO 14065 ou equivalente)",
      "Seguro de responsabilidade profissional vigente",
      "Declaração de independência e política de conflito de interesse",
      "Participação em programa de treinamento da Green Ledger",
      "Aprovação em avaliação de competência técnica setorial",
    ],
    ctaTitle: "Quer se credenciar como VVB?", ctaDesc: "Entre em contato para iniciar o processo de credenciamento.", ctaBtn: "Iniciar Credenciamento",
    loading: "Carregando VVBs...", noVvbs: "Nenhum VVB credenciado encontrado.", contactTeam: "Falar com a Equipe",
  },
  en: {
    seoTitle: "Accredited VVBs", seoDesc: "Learn about Validation and Verification Bodies accredited by Green Ledger.",
    statVvbs: "Accredited VVBs", statAudits: "Verifications Completed", statSectors: "Sectors Covered",
    accreditedTitle: "Accredited Bodies",
    since: "Accredited since", audits: "verifications",
    scales: "Scales", sectors: "Sectors", activities: "Activity Types",
    processTitle: "Accreditation Process", processDesc: "To become a Green Ledger-accredited VVB, the body must follow the process below.",
    process: [
      { step: "01", title: "Application", desc: "The interested body submits an application form with supporting documentation of technical competence and experience." },
      { step: "02", title: "Document Review", desc: "Green Ledger's team reviews documentation, verifies references and assesses compliance with requirements." },
      { step: "03", title: "Technical Assessment", desc: "Technical interview with the audit team and practical competence assessment by sector of operation." },
      { step: "04", title: "Accreditation", desc: "Approval by the Accreditation Committee, certificate issuance and publication in the VVB registry." },
    ],
    reqTitle: "Accreditation Requirements",
    requirements: [
      "Legal entity with active registration and proven integrity",
      "Technical team with proven qualifications in relevant sectors",
      "Minimum 3 years of experience in environmental or carbon auditing",
      "Documented quality management system (ISO 14065 or equivalent)",
      "Current professional liability insurance",
      "Independence declaration and conflict of interest policy",
      "Participation in Green Ledger's training program",
      "Approval in sectoral technical competence assessment",
    ],
    ctaTitle: "Want to become an accredited VVB?", ctaDesc: "Contact us to start the accreditation process.", ctaBtn: "Start Accreditation",
    loading: "Loading VVBs...", noVvbs: "No accredited VVBs found.", contactTeam: "Contact Us",
  },
  es: {
    seoTitle: "VVBs Acreditados", seoDesc: "Conozca los Organismos de Validación y Verificación acreditados por Green Ledger.",
    statVvbs: "VVBs Acreditados", statAudits: "Verificaciones Realizadas", statSectors: "Sectores Cubiertos",
    accreditedTitle: "Organismos Acreditados",
    since: "Acreditado desde", audits: "verificaciones",
    scales: "Escalas", sectors: "Sectores", activities: "Tipos de Actividad",
    processTitle: "Proceso de Acreditación", processDesc: "Para convertirse en un VVB acreditado por Green Ledger, el organismo debe seguir el proceso a continuación.",
    process: [
      { step: "01", title: "Solicitud", desc: "El organismo interesado envía el formulario de solicitud con documentación de competencia técnica y experiencia." },
      { step: "02", title: "Evaluación Documental", desc: "El equipo de Green Ledger analiza la documentación, verifica referencias y evalúa la conformidad con los requisitos." },
      { step: "03", title: "Evaluación Técnica", desc: "Entrevista técnica con el equipo de auditoría y evaluación práctica de competencia por sector de actuación." },
      { step: "04", title: "Acreditación", desc: "Aprobación por el Comité de Acreditación, emisión del certificado y publicación en el registro de VVBs." },
    ],
    reqTitle: "Requisitos de Acreditación",
    requirements: [
      "Persona jurídica con registro activo e idoneidad comprobada",
      "Equipo técnico con calificación comprobada en los sectores de actuación",
      "Experiencia mínima de 3 años en auditoría ambiental o de carbono",
      "Sistema de gestión de calidad documentado (ISO 14065 o equivalente)",
      "Seguro de responsabilidad profesional vigente",
      "Declaración de independencia y política de conflicto de interés",
      "Participación en programa de capacitación de Green Ledger",
      "Aprobación en evaluación de competencia técnica sectorial",
    ],
    ctaTitle: "¿Desea acreditarse como VVB?", ctaDesc: "Contáctenos para iniciar el proceso de acreditación.", ctaBtn: "Iniciar Acreditación",
    loading: "Cargando VVBs...", noVvbs: "No se encontraron VVBs acreditados.", contactTeam: "Contáctenos",
  },
};

const VVBs = () => {
  const { t, locale } = useLanguage();
  const d = i18n[locale as keyof typeof i18n] || i18n.pt;

  const { data: vvbs, loading, error } = usePublicVvbs();

  const totalAudits = vvbs?.reduce((s, v) => s + (v._count?.verificationAssignments ?? 0), 0) ?? 0;
  const allSectors = [...new Set(vvbs?.flatMap((v) => v.accreditedSectors) ?? [])];

  return (
    <div className="pt-20">
      <SEOHead title={d.seoTitle} description={d.seoDesc} path="/vvbs" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">VVBs</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.vvbs.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.vvbs.subtitle")}</p>
        </div>
      </section>

      <section className="py-12 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <span className="font-heading text-3xl font-bold text-secondary">{loading ? "—" : (vvbs?.length ?? 0)}</span>
              <p className="text-sm text-muted-foreground mt-1">{d.statVvbs}</p>
            </div>
            <div className="text-center">
              <span className="font-heading text-3xl font-bold text-secondary">{loading ? "—" : totalAudits}</span>
              <p className="text-sm text-muted-foreground mt-1">{d.statAudits}</p>
            </div>
            <div className="text-center">
              <span className="font-heading text-3xl font-bold text-secondary">{loading ? "—" : allSectors.length}</span>
              <p className="text-sm text-muted-foreground mt-1">{d.statSectors}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-5xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary mb-8">{d.accreditedTitle}</h2>
          </AnimatedSection>

          {loading && (
            <p className="text-muted-foreground text-center py-8">{d.loading}</p>
          )}
          {(error || (!loading && vvbs?.length === 0)) && (
            <p className="text-muted-foreground text-center py-8">{d.noVvbs}</p>
          )}

          <div className="space-y-4">
            {(vvbs ?? []).map((v, i) => (
              <AnimatedSection key={v.id} delay={i * 0.06}>
                <div className="border border-border rounded-xl p-6 hover:shadow-card transition-shadow bg-card">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-primary">
                          {v.publicWebsite ? (
                            <a href={v.publicWebsite} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                              {v.name}
                            </a>
                          ) : v.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-muted-foreground">
                          {v.accreditationDate && (
                            <span className="inline-flex items-center gap-1">
                              <Globe className="w-3 h-3" /> {d.since} {new Date(v.accreditationDate).getFullYear()}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1">
                            <Award className="w-3 h-3" /> {v._count?.verificationAssignments ?? 0} {d.audits}
                          </span>
                        </div>
                        {v.accreditedSectors?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {v.accreditedSectors.map((s) => (
                              <span key={s} className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">{s}</span>
                            ))}
                          </div>
                        )}
                        {v.accreditedActivityTypes?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {v.accreditedActivityTypes.map((a) => (
                              <span key={a} className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">{a}</span>
                            ))}
                          </div>
                        )}
                        {v.accreditedScales?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {v.accreditedScales.map((s) => (
                              <span key={s} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{s}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium shrink-0 bg-secondary/20 text-secondary">
                      {v.accreditationStatus}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/20">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary mb-4">{d.processTitle}</h2>
            <p className="text-muted-foreground mb-10">{d.processDesc}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {d.process.map((p, i) => (
              <AnimatedSection key={p.step} delay={i * 0.08}>
                <div className="border border-border rounded-xl p-6 bg-card">
                  <span className="font-heading text-2xl font-bold text-secondary/20">{p.step}</span>
                  <h3 className="font-heading font-semibold text-primary mt-2 mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary mb-8">{d.reqTitle}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {d.requirements.map((r, i) => (
              <AnimatedSection key={i} delay={i * 0.04}>
                <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
                  <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">{r}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary mb-4">{d.ctaTitle}</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">{d.ctaDesc}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://app.greenledger.eco.br/register" target="_blank" rel="noopener noreferrer">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                  {d.ctaBtn} <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Link to="/contato">
                <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  {d.contactTeam} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default VVBs;
