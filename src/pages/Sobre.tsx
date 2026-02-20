import { useLanguage } from "@/i18n/LanguageContext";
import { Shield, Target, Eye, Award, Users, Globe, TrendingUp, Calendar } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

const i18n = {
  pt: {
    seoTitle: "Sobre a Green Ledger",
    seoDesc: "Conheça a história, missão, valores e equipe da Green Ledger.",
    mission: { icon: Target, title: "Missão", desc: "Certificar créditos de carbono com rigor técnico, transparência e integridade ambiental, contribuindo para a confiança dos mercados voluntários e a efetividade das ações climáticas no Brasil e no mundo." },
    vision: { icon: Eye, title: "Visão", desc: "Ser a certificadora de referência na América Latina, reconhecida pela excelência técnica, governança independente e contribuição mensurável para a descarbonização da economia e a conservação de ecossistemas." },
    values: { icon: Shield, title: "Valores", desc: "Integridade científica. Transparência radical. Independência de governança. Compromisso com impacto ambiental real. Respeito às comunidades e à biodiversidade. Inovação responsável." },
    stats: [
      { value: "100k+", label: "Créditos Emitidos", icon: TrendingUp },
      { value: "45+", label: "Projetos Registrados", icon: Award },
      { value: "12", label: "Estados Atendidos", icon: Globe },
      { value: "25+", label: "Especialistas", icon: Users },
    ],
    timelineTitle: "Nossa Trajetória",
    timeline: [
      { year: "2021", title: "Fundação", desc: "A Green Ledger é fundada em São Paulo por um grupo de especialistas em mudanças climáticas, finanças verdes e governança ambiental." },
      { year: "2022", title: "Primeiras Metodologias", desc: "Lançamento das metodologias AFOLU e Soil Carbon após 12 meses de desenvolvimento técnico e consulta com stakeholders." },
      { year: "2023", title: "Credenciamento de VVBs", desc: "Credenciamento dos primeiros organismos de validação e verificação independentes e emissão dos primeiros créditos certificados." },
      { year: "2024", title: "Expansão de Programas", desc: "Lançamento do programa Energy & Tech e início de parcerias internacionais com registros e certificadoras globais." },
      { year: "2025", title: "Marco de 100k Créditos", desc: "Superamos 100.000 créditos emitidos, com projetos em 12 estados brasileiros e 3 países da América Latina." },
      { year: "2026", title: "Plataforma Digital", desc: "Lançamento da plataforma digital com registro público, rastreabilidade em tempo real e integração com marketplaces internacionais." },
    ],
    teamTitle: "Equipe de Liderança",
    teamDesc: "Profissionais com experiência multidisciplinar em ciência do carbono, governança ambiental, tecnologia e regulação.",
    team: [
      { name: "Dra. Ana Beatriz Costa", role: "CEO & Co-fundadora", bio: "PhD em Ciências Ambientais pela USP. 15 anos de experiência em mercados de carbono e política climática." },
      { name: "Carlos Eduardo Mendes", role: "CTO", bio: "Engenheiro de software com especialização em blockchain e rastreabilidade. Ex-líder técnico em fintech climática." },
      { name: "Prof. Ricardo Oliveira", role: "Diretor Técnico", bio: "Professor titular de Engenharia Florestal na ESALQ/USP. Especialista em inventário florestal e carbono." },
      { name: "Mariana Santos", role: "Diretora de Governança", bio: "Advogada especializada em direito ambiental. Experiência em compliance e regulação de mercados voluntários." },
      { name: "Dr. Felipe Rocha", role: "Líder de Metodologias", bio: "PhD em Ecologia pela UNICAMP. Experiência em modelagem de carbono no solo e sistemas agroflorestais." },
      { name: "Juliana Ferreira", role: "Diretora de Operações", bio: "MBA em Gestão Ambiental. 10 anos de experiência em certificação e auditoria de projetos de carbono." },
    ],
    alignTitle: "Alinhamento Internacional",
    alignDesc: "A Green Ledger alinha suas práticas com os principais marcos regulatórios e de integridade do mercado voluntário de carbono.",
    alignments: [
      { title: "ICVCM", desc: "Alinhamento com os Core Carbon Principles do Integrity Council for the Voluntary Carbon Market." },
      { title: "VCMI", desc: "Conformidade com as diretrizes do Voluntary Carbon Markets Integrity Initiative para uso de créditos." },
      { title: "SBTI & Paris", desc: "Compatibilidade com Science Based Targets e contribuição para as metas do Acordo de Paris." },
    ],
    placeholder: "* Conteúdo placeholder — será atualizado com informações reais.",
  },
  en: {
    seoTitle: "About Green Ledger",
    seoDesc: "Learn about Green Ledger's history, mission, values and team.",
    mission: { icon: Target, title: "Mission", desc: "Certify carbon credits with technical rigor, transparency and environmental integrity, contributing to the confidence of voluntary markets and the effectiveness of climate actions in Brazil and worldwide." },
    vision: { icon: Eye, title: "Vision", desc: "To be the reference certifier in Latin America, recognized for technical excellence, independent governance and measurable contribution to economic decarbonization and ecosystem conservation." },
    values: { icon: Shield, title: "Values", desc: "Scientific integrity. Radical transparency. Governance independence. Commitment to real environmental impact. Respect for communities and biodiversity. Responsible innovation." },
    stats: [
      { value: "100k+", label: "Credits Issued", icon: TrendingUp },
      { value: "45+", label: "Registered Projects", icon: Award },
      { value: "12", label: "States Covered", icon: Globe },
      { value: "25+", label: "Specialists", icon: Users },
    ],
    timelineTitle: "Our Journey",
    timeline: [
      { year: "2021", title: "Foundation", desc: "Green Ledger is founded in São Paulo by a group of specialists in climate change, green finance and environmental governance." },
      { year: "2022", title: "First Methodologies", desc: "Launch of AFOLU and Soil Carbon methodologies after 12 months of technical development and stakeholder consultation." },
      { year: "2023", title: "VVB Accreditation", desc: "Accreditation of the first independent validation and verification bodies and issuance of the first certified credits." },
      { year: "2024", title: "Program Expansion", desc: "Launch of the Energy & Tech program and beginning of international partnerships with global registries and certifiers." },
      { year: "2025", title: "100k Credits Milestone", desc: "We surpassed 100,000 credits issued, with projects in 12 Brazilian states and 3 Latin American countries." },
      { year: "2026", title: "Digital Platform", desc: "Launch of the digital platform with public registry, real-time traceability and integration with international marketplaces." },
    ],
    teamTitle: "Leadership Team",
    teamDesc: "Professionals with multidisciplinary experience in carbon science, environmental governance, technology and regulation.",
    team: [
      { name: "Dr. Ana Beatriz Costa", role: "CEO & Co-founder", bio: "PhD in Environmental Sciences from USP. 15 years of experience in carbon markets and climate policy." },
      { name: "Carlos Eduardo Mendes", role: "CTO", bio: "Software engineer specializing in blockchain and traceability. Former tech lead at a climate fintech." },
      { name: "Prof. Ricardo Oliveira", role: "Technical Director", bio: "Full professor of Forest Engineering at ESALQ/USP. Specialist in forest inventory and carbon." },
      { name: "Mariana Santos", role: "Governance Director", bio: "Lawyer specializing in environmental law. Experience in compliance and voluntary market regulation." },
      { name: "Dr. Felipe Rocha", role: "Methodology Lead", bio: "PhD in Ecology from UNICAMP. Experience in soil carbon modeling and agroforestry systems." },
      { name: "Juliana Ferreira", role: "Operations Director", bio: "MBA in Environmental Management. 10 years of experience in carbon project certification and auditing." },
    ],
    alignTitle: "International Alignment",
    alignDesc: "Green Ledger aligns its practices with the main regulatory and integrity frameworks of the voluntary carbon market.",
    alignments: [
      { title: "ICVCM", desc: "Alignment with the Core Carbon Principles of the Integrity Council for the Voluntary Carbon Market." },
      { title: "VCMI", desc: "Compliance with the Voluntary Carbon Markets Integrity Initiative guidelines for credit use." },
      { title: "SBTI & Paris", desc: "Compatibility with Science Based Targets and contribution to the Paris Agreement goals." },
    ],
    placeholder: "* Placeholder content — will be updated with real information.",
  },
  es: {
    seoTitle: "Acerca de Green Ledger",
    seoDesc: "Conozca la historia, misión, valores y equipo de Green Ledger.",
    mission: { icon: Target, title: "Misión", desc: "Certificar créditos de carbono con rigor técnico, transparencia e integridad ambiental, contribuyendo a la confianza de los mercados voluntarios y la efectividad de las acciones climáticas en Brasil y el mundo." },
    vision: { icon: Eye, title: "Visión", desc: "Ser la certificadora de referencia en América Latina, reconocida por la excelencia técnica, gobernanza independiente y contribución medible a la descarbonización económica y la conservación de ecosistemas." },
    values: { icon: Shield, title: "Valores", desc: "Integridad científica. Transparencia radical. Independencia de gobernanza. Compromiso con el impacto ambiental real. Respeto a las comunidades y la biodiversidad. Innovación responsable." },
    stats: [
      { value: "100k+", label: "Créditos Emitidos", icon: TrendingUp },
      { value: "45+", label: "Proyectos Registrados", icon: Award },
      { value: "12", label: "Estados Cubiertos", icon: Globe },
      { value: "25+", label: "Especialistas", icon: Users },
    ],
    timelineTitle: "Nuestra Trayectoria",
    timeline: [
      { year: "2021", title: "Fundación", desc: "Green Ledger se funda en São Paulo por un grupo de especialistas en cambio climático, finanzas verdes y gobernanza ambiental." },
      { year: "2022", title: "Primeras Metodologías", desc: "Lanzamiento de las metodologías AFOLU y Soil Carbon tras 12 meses de desarrollo técnico y consulta con stakeholders." },
      { year: "2023", title: "Acreditación de VVBs", desc: "Acreditación de los primeros organismos de validación y verificación independientes y emisión de los primeros créditos certificados." },
      { year: "2024", title: "Expansión de Programas", desc: "Lanzamiento del programa Energy & Tech e inicio de alianzas internacionales con registros y certificadoras globales." },
      { year: "2025", title: "Hito de 100k Créditos", desc: "Superamos 100.000 créditos emitidos, con proyectos en 12 estados brasileños y 3 países de América Latina." },
      { year: "2026", title: "Plataforma Digital", desc: "Lanzamiento de la plataforma digital con registro público, trazabilidad en tiempo real e integración con marketplaces internacionales." },
    ],
    teamTitle: "Equipo de Liderazgo",
    teamDesc: "Profesionales con experiencia multidisciplinaria en ciencia del carbono, gobernanza ambiental, tecnología y regulación.",
    team: [
      { name: "Dra. Ana Beatriz Costa", role: "CEO & Co-fundadora", bio: "PhD en Ciencias Ambientales por la USP. 15 años de experiencia en mercados de carbono y política climática." },
      { name: "Carlos Eduardo Mendes", role: "CTO", bio: "Ingeniero de software con especialización en blockchain y trazabilidad. Ex-líder técnico en fintech climática." },
      { name: "Prof. Ricardo Oliveira", role: "Director Técnico", bio: "Profesor titular de Ingeniería Forestal en ESALQ/USP. Especialista en inventario forestal y carbono." },
      { name: "Mariana Santos", role: "Directora de Gobernanza", bio: "Abogada especializada en derecho ambiental. Experiencia en compliance y regulación de mercados voluntarios." },
      { name: "Dr. Felipe Rocha", role: "Líder de Metodologías", bio: "PhD en Ecología por UNICAMP. Experiencia en modelado de carbono en el suelo y sistemas agroforestales." },
      { name: "Juliana Ferreira", role: "Directora de Operaciones", bio: "MBA en Gestión Ambiental. 10 años de experiencia en certificación y auditoría de proyectos de carbono." },
    ],
    alignTitle: "Alineamiento Internacional",
    alignDesc: "Green Ledger alinea sus prácticas con los principales marcos regulatorios y de integridad del mercado voluntario de carbono.",
    alignments: [
      { title: "ICVCM", desc: "Alineamiento con los Core Carbon Principles del Integrity Council for the Voluntary Carbon Market." },
      { title: "VCMI", desc: "Conformidad con las directrices de la Voluntary Carbon Markets Integrity Initiative para uso de créditos." },
      { title: "SBTI & París", desc: "Compatibilidad con Science Based Targets y contribución a las metas del Acuerdo de París." },
    ],
    placeholder: "* Contenido placeholder — será actualizado con información real.",
  },
};

const Sobre = () => {
  const { t, locale } = useLanguage();
  const d = i18n[locale] || i18n.pt;
  const mvv = [d.mission, d.vision, d.values];

  return (
    <div className="pt-20">
      <SEOHead title={d.seoTitle} description={d.seoDesc} path="/sobre" />

      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-6">
            {t("page.sobre.title")}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{t("page.sobre.title")}</h1>
          <p className="mt-8 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{t("page.sobre.subtitle")}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mvv.map((item) => (
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

      <section className="py-16 bg-muted/20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {d.stats.map((s) => (
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

      <section className="py-20">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-primary mb-12 text-center">{d.timelineTitle}</h2>
          </AnimatedSection>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-10">
              {d.timeline.map((item, i) => (
                <AnimatedSection key={item.year} delay={i * 0.08}>
                  <div className="flex gap-8">
                    <div className="hidden md:flex flex-col items-center shrink-0">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center z-10 bg-background">
                        <Calendar className="w-5 h-5 text-secondary" />
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider">{item.year}</span>
                      <h3 className="font-heading text-lg font-semibold text-primary mt-1 mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/20">
        <div className="container max-w-5xl">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-primary mb-4 text-center">{d.teamTitle}</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">{d.teamDesc}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {d.team.map((m, i) => (
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

      <section className="py-20">
        <div className="container max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">{d.alignTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10">{d.alignDesc}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {d.alignments.map((p) => (
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

      <p className="text-xs text-muted-foreground italic text-center py-8">{d.placeholder}</p>
    </div>
  );
};

export default Sobre;
