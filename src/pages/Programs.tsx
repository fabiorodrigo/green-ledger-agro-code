import { Link } from "react-router-dom";
import { Leaf, Globe, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

const programs = [
  {
    id: "afolu", icon: Leaf,
    title: { pt: "Green Ledger AFOLU", en: "Green Ledger AFOLU", es: "Green Ledger AFOLU" },
    subtitle: { pt: "Agricultura, Florestas e Outros Usos do Solo", en: "Agriculture, Forestry and Other Land Uses", es: "Agricultura, Bosques y Otros Usos del Suelo" },
    description: { pt: "Programa abrangente que cobre atividades de redução e remoção de emissões de GEE nos setores agropecuário e florestal, incluindo reflorestamento, restauração de vegetação nativa, sistemas agroflorestais, manejo florestal sustentável e proteção de ecossistemas.", en: "Comprehensive program covering GHG emission reduction and removal activities in agriculture and forestry sectors, including reforestation, native vegetation restoration, agroforestry systems, sustainable forest management and ecosystem protection.", es: "Programa integral que cubre actividades de reducción y remoción de emisiones de GEI en los sectores agropecuario y forestal, incluyendo reforestación, restauración de vegetación nativa, sistemas agroforestales, manejo forestal sostenible y protección de ecosistemas." },
    scope: {
      pt: ["Reflorestamento e restauração florestal", "Sistemas agroflorestais (SAFs)", "Redução de desmatamento e degradação (REDD+)", "Manejo florestal sustentável", "Recuperação de áreas degradadas"],
      en: ["Reforestation and forest restoration", "Agroforestry systems", "Reduced deforestation and degradation (REDD+)", "Sustainable forest management", "Degraded area recovery"],
      es: ["Reforestación y restauración forestal", "Sistemas agroforestales", "Reducción de deforestación y degradación (REDD+)", "Manejo forestal sostenible", "Recuperación de áreas degradadas"],
    },
    eligibility: {
      pt: ["Áreas com potencial de sequestro ou redução comprovável", "Conformidade com legislação ambiental vigente", "Período mínimo de creditação: 20 anos", "Documentação de posse ou direito de uso da terra"],
      en: ["Areas with provable sequestration or reduction potential", "Compliance with current environmental legislation", "Minimum crediting period: 20 years", "Land ownership or use rights documentation"],
      es: ["Áreas con potencial de secuestro o reducción comprobable", "Conformidad con legislación ambiental vigente", "Período mínimo de acreditación: 20 años", "Documentación de posesión o derecho de uso de la tierra"],
    },
    methodologies: ["GL-AFOLU-001", "GL-AFOLU-002", "GL-AFOLU-003"],
  },
  {
    id: "soil", icon: Globe,
    title: { pt: "Green Ledger Soil Carbon", en: "Green Ledger Soil Carbon", es: "Green Ledger Soil Carbon" },
    subtitle: { pt: "Carbono no Solo", en: "Soil Carbon", es: "Carbono en el Suelo" },
    description: { pt: "Programa dedicado ao sequestro de carbono orgânico no solo por meio de práticas regenerativas, sistemas de plantio direto, rotação de culturas, integração lavoura-pecuária-floresta (ILPF) e uso de plantas de cobertura.", en: "Program dedicated to soil organic carbon sequestration through regenerative practices, no-till systems, crop rotation, crop-livestock-forestry integration (CLFI) and cover crops.", es: "Programa dedicado al secuestro de carbono orgánico en el suelo mediante prácticas regenerativas, siembra directa, rotación de cultivos, integración labranza-ganadería-bosque y uso de plantas de cobertura." },
    scope: {
      pt: ["Plantio direto sobre palha", "Integração Lavoura-Pecuária-Floresta (ILPF)", "Uso de plantas de cobertura", "Rotação e consórcio de culturas", "Manejo conservacionista do solo"],
      en: ["No-till farming", "Crop-Livestock-Forestry Integration (CLFI)", "Cover crop usage", "Crop rotation and intercropping", "Conservation soil management"],
      es: ["Siembra directa sobre rastrojo", "Integración Labranza-Ganadería-Bosque", "Uso de plantas de cobertura", "Rotación y asociación de cultivos", "Manejo conservacionista del suelo"],
    },
    eligibility: {
      pt: ["Áreas com histórico de uso convencional do solo", "Dados de linha de base de carbono no solo disponíveis ou mensuráveis", "Compromisso com monitoramento de longo prazo (mínimo 10 anos)", "Implementação de práticas regenerativas verificáveis"],
      en: ["Areas with conventional soil use history", "Soil carbon baseline data available or measurable", "Long-term monitoring commitment (minimum 10 years)", "Implementation of verifiable regenerative practices"],
      es: ["Áreas con historial de uso convencional del suelo", "Datos de línea base de carbono en suelo disponibles o medibles", "Compromiso con monitoreo a largo plazo (mínimo 10 años)", "Implementación de prácticas regenerativas verificables"],
    },
    methodologies: ["GL-SC-001", "GL-SC-002"],
  },
  {
    id: "energytech", icon: Zap,
    title: { pt: "Green Ledger Energy & Tech", en: "Green Ledger Energy & Tech", es: "Green Ledger Energy & Tech" },
    subtitle: { pt: "Energia e Tecnologias Limpas", en: "Energy and Clean Technologies", es: "Energía y Tecnologías Limpias" },
    description: { pt: "Programa voltado para tecnologias inovadoras que reduzem emissões em diversos setores: biodigestores, energias renováveis, eficiência energética, tratamento de resíduos, substituição de combustíveis fósseis e processos industriais mais limpos.", en: "Program focused on innovative technologies that reduce emissions across sectors: biodigesters, renewable energy, energy efficiency, waste treatment, fossil fuel substitution and cleaner industrial processes.", es: "Programa enfocado en tecnologías innovadoras que reducen emisiones en diversos sectores: biodigestores, energías renovables, eficiencia energética, tratamiento de residuos, sustitución de combustibles fósiles y procesos industriales más limpios." },
    scope: {
      pt: ["Biodigestores e tratamento de resíduos", "Substituição de combustíveis fósseis", "Eficiência energética industrial e comercial", "Energias renováveis (solar, eólica, biomassa)", "Otimização de processos e redução de emissões fugitivas"],
      en: ["Biodigesters and waste treatment", "Fossil fuel substitution", "Industrial and commercial energy efficiency", "Renewable energy (solar, wind, biomass)", "Process optimization and fugitive emission reduction"],
      es: ["Biodigestores y tratamiento de residuos", "Sustitución de combustibles fósiles", "Eficiencia energética industrial y comercial", "Energías renovables (solar, eólica, biomasa)", "Optimización de procesos y reducción de emisiones fugitivas"],
    },
    eligibility: {
      pt: ["Adoção de tecnologia comprovadamente superior à prática convencional", "Reduções de emissões mensuráveis e verificáveis", "Conformidade com padrões técnicos e regulatórios", "Dados de operação disponíveis para auditoria"],
      en: ["Adoption of technology demonstrably superior to conventional practice", "Measurable and verifiable emission reductions", "Compliance with technical and regulatory standards", "Operational data available for auditing"],
      es: ["Adopción de tecnología demostrablemente superior a la práctica convencional", "Reducciones de emisiones medibles y verificables", "Conformidad con estándares técnicos y regulatorios", "Datos de operación disponibles para auditoría"],
    },
    methodologies: ["GL-ET-001", "GL-ET-002"],
  },
];

const ui = {
  pt: { seoTitle: "Programas de Certificação", seoDesc: "Conheça os programas de certificação da Green Ledger.", badge: "Programas", title: "Programas de Certificação", subtitle: "Programas especializados cobrindo as principais atividades que geram redução ou remoção de emissões de gases de efeito estufa em múltiplos setores.", scope: "Escopo", eligibility: "Elegibilidade", methodologies: "Metodologias Vinculadas", governance: "Governança", govDesc: "Cada programa possui comitê técnico próprio responsável pela aprovação de projetos e revisão periódica de metodologias.", ctaTitle: "Quer registrar um projeto?", ctaDesc: "Entre em contato para saber qual programa se aplica à sua atividade.", ctaBtn: "Fale Conosco" },
  en: { seoTitle: "Certification Programs", seoDesc: "Learn about Green Ledger's certification programs.", badge: "Programs", title: "Certification Programs", subtitle: "Specialized programs covering the main activities that generate reduction or removal of greenhouse gas emissions across multiple sectors.", scope: "Scope", eligibility: "Eligibility", methodologies: "Linked Methodologies", governance: "Governance", govDesc: "Each program has its own technical committee responsible for project approval and periodic methodology review.", ctaTitle: "Want to register a project?", ctaDesc: "Contact us to find out which program applies to your activity.", ctaBtn: "Contact Us" },
  es: { seoTitle: "Programas de Certificación", seoDesc: "Conozca los programas de certificación de Green Ledger.", badge: "Programas", title: "Programas de Certificación", subtitle: "Programas especializados que cubren las principales actividades que generan reducción o remoción de emisiones de gases de efecto invernadero en múltiples sectores.", scope: "Alcance", eligibility: "Elegibilidad", methodologies: "Metodologías Vinculadas", governance: "Gobernanza", govDesc: "Cada programa cuenta con un comité técnico propio responsable de la aprobación de proyectos y revisión periódica de metodologías.", ctaTitle: "¿Desea registrar un proyecto?", ctaDesc: "Contáctenos para saber qué programa aplica a su actividad.", ctaBtn: "Contáctenos" },
};

const Programs = () => {
  const { locale } = useLanguage();
  const lang = (locale as "pt" | "en" | "es") || "pt";
  const u = ui[lang] || ui.pt;

  return (
    <div className="pt-20">
      <SEOHead title={u.seoTitle} description={u.seoDesc} path="/programas" />

      <section className="gradient-hero text-primary-foreground py-20 md:py-28">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-4">{u.badge}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{u.title}</h1>
          <p className="mt-6 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{u.subtitle}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container space-y-20">
          {programs.map((p, idx) => (
            <AnimatedSection key={p.id} delay={idx * 0.08}>
              <div id={p.id} className="scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-3 mb-4">
                      <p.icon className="w-8 h-8 text-secondary" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.subtitle[lang]}</span>
                    </div>
                    <h2 className="font-heading text-3xl font-bold text-primary mb-4">{p.title[lang]}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-8">{p.description[lang]}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-heading font-semibold text-primary mb-3">{u.scope}</h3>
                        <ul className="space-y-2">
                          {p.scope[lang].map((s) => (
                            <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />{s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-primary mb-3">{u.eligibility}</h3>
                        <ul className="space-y-2">
                          {p.eligibility[lang].map((e) => (
                            <li key={e} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-accent-foreground mt-0.5 shrink-0" />{e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="gradient-card rounded-xl p-6 border border-border shadow-card">
                      <h3 className="font-heading font-semibold text-primary mb-4">{u.methodologies}</h3>
                      <ul className="space-y-3 mb-6">
                        {p.methodologies.map((m) => (
                          <li key={m}><Link to="/metodologias" className="flex items-center gap-2 text-sm text-secondary hover:underline"><ArrowRight className="w-3 h-3" />{m}</Link></li>
                        ))}
                      </ul>
                      <h3 className="font-heading font-semibold text-primary mb-3">{u.governance}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{u.govDesc}</p>
                    </div>
                  </div>
                </div>
                {idx < programs.length - 1 && <hr className="mt-20 border-border" />}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h2 className="font-heading text-2xl font-bold text-primary mb-4">{u.ctaTitle}</h2>
          <p className="text-muted-foreground mb-6">{u.ctaDesc}</p>
          <Link to="/contato"><Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">{u.ctaBtn} <ArrowRight className="w-4 h-4" /></Button></Link>
        </div>
      </section>
    </div>
  );
};

export default Programs;
