import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Shield, Globe, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

interface VVB {
  name: string;
  country: string;
  accreditationDate: string;
  sectors: string[];
  status: "Ativo" | "Em Renovação";
  auditsCompleted: number;
}

const vvbs: VVB[] = [
  { name: "VerdeAudit Certificações Ltda.", country: "Brasil", accreditationDate: "2023-03-15", sectors: ["AFOLU", "Soil Carbon"], status: "Ativo", auditsCompleted: 18 },
  { name: "CarbonCheck International", country: "Brasil / EUA", accreditationDate: "2023-06-01", sectors: ["AFOLU", "Energy & Tech"], status: "Ativo", auditsCompleted: 12 },
  { name: "EcoVerify Brasil", country: "Brasil", accreditationDate: "2023-09-20", sectors: ["Soil Carbon", "Energy & Tech"], status: "Ativo", auditsCompleted: 9 },
  { name: "TerraAssurance S.A.", country: "Brasil / Colômbia", accreditationDate: "2024-01-10", sectors: ["AFOLU"], status: "Ativo", auditsCompleted: 7 },
  { name: "ClimateGuard Verificações", country: "Brasil", accreditationDate: "2024-04-22", sectors: ["AFOLU", "Soil Carbon", "Energy & Tech"], status: "Ativo", auditsCompleted: 5 },
  { name: "SustainProof Auditoria Ambiental", country: "Brasil", accreditationDate: "2024-08-05", sectors: ["AFOLU", "Soil Carbon"], status: "Em Renovação", auditsCompleted: 3 },
];

const requirements = [
  "Pessoa jurídica com registro ativo e idoneidade comprovada",
  "Equipe técnica com qualificação comprovada nos setores de atuação",
  "Experiência mínima de 3 anos em auditoria ambiental ou de carbono",
  "Sistema de gestão da qualidade documentado (ISO 14065 ou equivalente)",
  "Seguro de responsabilidade profissional vigente",
  "Declaração de independência e política de conflito de interesse",
  "Participação em programa de treinamento da Green Ledger",
  "Aprovação em avaliação de competência técnica setorial",
];

const process = [
  { step: "01", title: "Solicitação", desc: "O organismo interessado submete formulário de solicitação com documentação comprobatória de competência técnica e experiência." },
  { step: "02", title: "Avaliação Documental", desc: "A equipe da Green Ledger analisa a documentação, verifica referências e avalia a conformidade com os requisitos de credenciamento." },
  { step: "03", title: "Avaliação Técnica", desc: "Entrevista técnica com a equipe de auditoria e avaliação prática de competência por setor de atuação pretendido." },
  { step: "04", title: "Credenciamento", desc: "Aprovação pelo Comitê de Credenciamento, emissão do certificado e publicação no registro de VVBs aprovados." },
];

const VVBs = () => {
  const { t } = useLanguage();
  return (
    <div className="pt-20">
      <SEOHead title="VVBs Credenciados" description="Conheça os Organismos de Validação e Verificação credenciados pela Green Ledger e saiba como se credenciar." path="/vvbs" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            VVBs
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.vvbs.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.vvbs.subtitle")}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <span className="font-heading text-3xl font-bold text-secondary">{vvbs.length}</span>
              <p className="text-sm text-muted-foreground mt-1">VVBs Credenciados</p>
            </div>
            <div className="text-center">
              <span className="font-heading text-3xl font-bold text-secondary">{vvbs.reduce((s, v) => s + v.auditsCompleted, 0)}</span>
              <p className="text-sm text-muted-foreground mt-1">Auditorias Realizadas</p>
            </div>
            <div className="text-center">
              <span className="font-heading text-3xl font-bold text-secondary">3</span>
              <p className="text-sm text-muted-foreground mt-1">Setores Cobertos</p>
            </div>
          </div>
        </div>
      </section>

      {/* VVB List */}
      <section className="py-20">
        <div className="container max-w-5xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary mb-8">Organismos Credenciados</h2>
          </AnimatedSection>
          <div className="space-y-4">
            {vvbs.map((v, i) => (
              <AnimatedSection key={v.name} delay={i * 0.06}>
                <div className="border border-border rounded-xl p-6 hover:shadow-card transition-shadow bg-card">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-primary">{v.name}</h3>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><Globe className="w-3 h-3" /> {v.country}</span>
                          <span className="text-xs text-muted-foreground">Desde {v.accreditationDate}</span>
                          <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><Award className="w-3 h-3" /> {v.auditsCompleted} auditorias</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {v.sectors.map((s) => (
                            <span key={s} className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${v.status === "Ativo" ? "bg-secondary/20 text-secondary" : "bg-accent/20 text-accent-foreground"}`}>
                      {v.status}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation Process */}
      <section className="py-20 bg-muted/20">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary mb-4">Processo de Credenciamento</h2>
            <p className="text-muted-foreground mb-10">Para se tornar um VVB credenciado pela Green Ledger, o organismo deve seguir o processo abaixo.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {process.map((p, i) => (
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

      {/* Requirements */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary mb-8">Requisitos de Credenciamento</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requirements.map((r, i) => (
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

      {/* CTA */}
      <section className="py-16">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary mb-4">Quer se credenciar como VVB?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">Entre em contato para iniciar o processo de credenciamento junto à Green Ledger.</p>
            <Link to="/contato">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                Iniciar Credenciamento <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <p className="text-xs text-muted-foreground italic text-center py-8">* Dados placeholder — informações reais de VVBs serão publicadas após credenciamento.</p>
    </div>
  );
};

export default VVBs;
