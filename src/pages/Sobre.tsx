import { useLanguage } from "@/i18n/LanguageContext";
import { Shield, Target, Eye, Award, Users, Globe, TrendingUp, Calendar } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

const timeline = [
  { year: "2021", title: "Fundação", desc: "A Green Ledger é fundada em São Paulo por um grupo de especialistas em mudanças climáticas, finanças verdes e governança ambiental." },
  { year: "2022", title: "Primeiras Metodologias", desc: "Lançamento das metodologias AFOLU e Soil Carbon após 12 meses de desenvolvimento técnico e consulta com stakeholders." },
  { year: "2023", title: "Credenciamento de VVBs", desc: "Credenciamento dos primeiros organismos de validação e verificação independentes e emissão dos primeiros créditos certificados." },
  { year: "2024", title: "Expansão de Programas", desc: "Lançamento do programa Energy & Tech e início de parcerias internacionais com registros e certificadoras globais." },
  { year: "2025", title: "Marco de 100k Créditos", desc: "Superamos 100.000 créditos emitidos, com projetos em 12 estados brasileiros e 3 países da América Latina." },
  { year: "2026", title: "Plataforma Digital", desc: "Lançamento da plataforma digital com registro público, rastreabilidade em tempo real e integração com marketplaces internacionais." },
];

const team = [
  { name: "Dra. Ana Beatriz Costa", role: "CEO & Co-fundadora", bio: "PhD em Ciências Ambientais pela USP. 15 anos de experiência em mercados de carbono e política climática." },
  { name: "Carlos Eduardo Mendes", role: "CTO", bio: "Engenheiro de software com especialização em blockchain e rastreabilidade. Ex-líder técnico em fintech climática." },
  { name: "Prof. Ricardo Oliveira", role: "Diretor Técnico", bio: "Professor titular de Engenharia Florestal na ESALQ/USP. Especialista em inventário florestal e carbono." },
  { name: "Mariana Santos", role: "Diretora de Governança", bio: "Advogada especializada em direito ambiental. Experiência em compliance e regulação de mercados voluntários." },
  { name: "Dr. Felipe Rocha", role: "Líder de Metodologias", bio: "PhD em Ecologia pela UNICAMP. Experiência em modelagem de carbono no solo e sistemas agroflorestais." },
  { name: "Juliana Ferreira", role: "Diretora de Operações", bio: "MBA em Gestão Ambiental. 10 anos de experiência em certificação e auditoria de projetos de carbono." },
];

const stats = [
  { value: "100k+", label: "Créditos Emitidos", icon: TrendingUp },
  { value: "45+", label: "Projetos Registrados", icon: Award },
  { value: "12", label: "Estados Atendidos", icon: Globe },
  { value: "25+", label: "Especialistas", icon: Users },
];

const Sobre = () => {
  const { t } = useLanguage();
  return (
    <div className="pt-20">
      <SEOHead title="Sobre a Green Ledger" description="Conheça a história, missão, valores e equipe da Green Ledger — certificadora de créditos de carbono com integridade ambiental." path="/sobre" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            {t("page.sobre.title")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.sobre.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.sobre.subtitle")}</p>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Missão", desc: "Certificar créditos de carbono com rigor técnico, transparência e integridade ambiental, contribuindo para a confiança dos mercados voluntários e a efetividade das ações climáticas no Brasil e no mundo." },
              { icon: Eye, title: "Visão", desc: "Ser a certificadora de referência na América Latina, reconhecida pela excelência técnica, governança independente e contribuição mensurável para a descarbonização da economia e a conservação de ecossistemas." },
              { icon: Shield, title: "Valores", desc: "Integridade científica. Transparência radical. Independência de governança. Compromisso com impacto ambiental real. Respeito às comunidades e à biodiversidade. Inovação responsável." },
            ].map((item) => (
              <AnimatedSection key={item.title}>
                <div className="gradient-card rounded-xl p-8 border border-border shadow-card h-full">
                  <item.icon className="w-10 h-10 text-secondary mb-4" />
                  <h3 className="font-heading font-semibold text-lg text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <AnimatedSection key={s.label}>
                <div className="text-center">
                  <s.icon className="w-8 h-8 text-secondary mx-auto mb-3" />
                  <span className="font-heading text-3xl font-bold text-primary">{s.value}</span>
                  <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-primary mb-12 text-center">Nossa Trajetória</h2>
          </AnimatedSection>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <AnimatedSection key={t.year} delay={i * 0.08}>
                  <div className="flex gap-8">
                    <div className="hidden md:flex flex-col items-center shrink-0">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center z-10 bg-background">
                        <Calendar className="w-5 h-5 text-secondary" />
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider">{t.year}</span>
                      <h3 className="font-heading text-lg font-semibold text-primary mt-1 mb-2">{t.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/20">
        <div className="container max-w-5xl">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-primary mb-4 text-center">Equipe de Liderança</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">Profissionais com experiência multidisciplinar em ciência do carbono, governança ambiental, tecnologia e regulação.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <AnimatedSection key={m.name} delay={i * 0.06}>
                <div className="bg-card rounded-xl p-6 border border-border hover:shadow-card transition-shadow">
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-heading font-semibold text-primary">{m.name}</h3>
                  <p className="text-xs text-secondary font-medium mb-2">{m.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-20">
        <div className="container max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">Alinhamento Internacional</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10">A Green Ledger alinha suas práticas com os principais marcos regulatórios e de integridade do mercado voluntário de carbono.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "ICVCM", desc: "Alinhamento com os Core Carbon Principles do Integrity Council for the Voluntary Carbon Market." },
              { title: "VCMI", desc: "Conformidade com as diretrizes do Voluntary Carbon Markets Integrity Initiative para uso de créditos." },
              { title: "SBTI & Paris", desc: "Compatibilidade com Science Based Targets e contribuição para as metas do Acordo de Paris." },
            ].map((p) => (
              <AnimatedSection key={p.title}>
                <div className="border border-border rounded-xl p-6">
                  <h3 className="font-heading font-semibold text-primary mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <p className="text-xs text-muted-foreground italic text-center py-8">* Conteúdo placeholder — será atualizado com informações reais.</p>
    </div>
  );
};

export default Sobre;
