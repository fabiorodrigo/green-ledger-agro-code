import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, MapPin, Building2, FileText, Download, ExternalLink,
  ShieldCheck, CheckCircle2, Leaf, Calendar, Hash, Globe, TreePine, BarChart3,
  Mail, Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/projectsData";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";

const statusColors: Record<string, string> = {
  registered: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  validated: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  certified: "bg-secondary/10 text-secondary border-secondary/30",
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const { locale } = useLanguage();
  const isEn = locale === "en";
  const p = projectsData.find((d) => d.slug === slug);

  if (!p) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-primary mb-4">
            {isEn ? "Project not found" : "Projeto não encontrado"}
          </h1>
          <Link to="/projetos">
            <Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> {isEn ? "Back" : "Voltar"}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const infoItems = [
    { icon: ShieldCheck, label: "Status", value: isEn ? p.statusLabel.en : p.statusLabel.pt },
    { icon: MapPin, label: isEn ? "Location" : "Localização", value: `${p.location}, ${p.state}` },
    { icon: Building2, label: isEn ? "Developer" : "Desenvolvedor", value: p.developer.name },
    { icon: FileText, label: isEn ? "Methodology" : "Metodologia", value: `${p.methodology.code} — ${p.methodology.name}`, link: `/metodologias/${p.methodology.slug}` },
    { icon: Hash, label: isEn ? "Version" : "Versão", value: p.methodologyVersion },
    { icon: Leaf, label: isEn ? "Solution Type" : "Tipo de Solução", value: p.solutionType },
    { icon: TreePine, label: isEn ? "Program" : "Programa", value: p.program },
    { icon: Globe, label: isEn ? "Biome" : "Bioma", value: p.biome },
    ...(p.crop ? [{ icon: Leaf, label: isEn ? "Crop" : "Cultura", value: p.crop }] : []),
    { icon: BarChart3, label: isEn ? "Carbon Type" : "Tipo de Carbono", value: p.carbonType },
    { icon: Calendar, label: isEn ? "Crediting Period" : "Período de Creditação", value: p.creditingPeriod },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="gradient-hero text-primary-foreground py-24 md:py-32">
        <div className="container">
          <Link to="/projetos" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" /> {isEn ? "Back to Projects" : "Voltar para Projetos"}
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-primary-foreground/60 uppercase tracking-widest font-medium">
              {isEn ? "Project" : "Projeto"}
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">{p.name}</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <span className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border font-medium ${statusColors[p.status]}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              {isEn ? p.statusLabel.en : p.statusLabel.pt}
            </span>
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
              <MapPin className="w-3.5 h-3.5" /> {p.location}, {p.state}
            </span>
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 bg-primary-foreground/10 rounded-full border border-primary-foreground/20">
              <Building2 className="w-3.5 h-3.5" /> {p.developer.name}
            </span>
          </div>
        </div>
      </section>

      {/* Project Info Sidebar + Overview */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Overview */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                  {isEn ? "Overview" : "Visão Geral"}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                  {isEn ? p.overview.en : p.overview.pt}
                </p>
              </AnimatedSection>

              {/* Impact */}
              <AnimatedSection delay={0.2}>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6 mt-16">
                  {isEn ? "Positive Impact" : "Impacto Positivo"}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {isEn ? "Key environmental indicators demonstrating the project's positive impact." : "Confira os principais indicadores ambientais que evidenciam o impacto positivo do projeto."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {p.impact.map((item, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-6 text-center">
                      <p className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-2">{item.value}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {isEn ? item.label.en : item.label.pt}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.1}>
                <div className="bg-card border border-border rounded-xl p-6 sticky top-28">
                  <h3 className="font-heading font-semibold text-primary text-sm uppercase tracking-wider mb-6">
                    {isEn ? "Project Summary" : "Resumo do Projeto"}
                  </h3>
                  <div className="space-y-4">
                    {infoItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <item.icon className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                          {item.link ? (
                            <Link to={item.link} className="text-sm font-medium text-primary hover:text-secondary transition-colors">
                              {item.value}
                            </Link>
                          ) : (
                            <p className="text-sm font-medium text-primary">{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Developer contact */}
                  <div className="mt-6 pt-6 border-t border-border space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                      {isEn ? "Developer Contact" : "Contato do Desenvolvedor"}
                    </p>
                    {p.developer.website && (
                      <a href={p.developer.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:text-secondary transition-colors">
                        <LinkIcon className="w-3.5 h-3.5" /> Website
                      </a>
                    )}
                    {p.developer.email && (
                      <a href={`mailto:${p.developer.email}`} className="flex items-center gap-2 text-sm text-primary hover:text-secondary transition-colors">
                        <Mail className="w-3.5 h-3.5" /> {p.developer.email}
                      </a>
                    )}
                    {p.developer.contact && (
                      <p className="text-xs text-muted-foreground">{p.developer.contact}</p>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Project Documents */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-8">
              {isEn ? "Project Documents" : "Documentos do Projeto"}
            </h2>
          </AnimatedSection>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 font-semibold text-primary">{isEn ? "Document" : "Documento"}</th>
                    <th className="text-left p-4 font-semibold text-primary">{isEn ? "Version" : "Versão"}</th>
                    <th className="text-left p-4 font-semibold text-primary">{isEn ? "Date" : "Data"}</th>
                    <th className="text-center p-4 font-semibold text-primary">PT</th>
                    <th className="text-center p-4 font-semibold text-primary">EN</th>
                  </tr>
                </thead>
                <tbody>
                  {p.documents.map((doc, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4 text-primary font-medium">{doc.name}</td>
                      <td className="p-4 text-muted-foreground">{doc.version || "—"}</td>
                      <td className="p-4 text-muted-foreground">{doc.date || "—"}</td>
                      <td className="p-4 text-center">
                        <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary">
                          <Download className="w-4 h-4" />
                        </Button>
                      </td>
                      <td className="p-4 text-center">
                        <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary">
                          <Download className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic">
            * {isEn ? "Documentation placeholder — files will be available soon." : "Documentação placeholder — os arquivos serão disponibilizados em breve."}
          </p>
        </div>
      </section>

      {/* Validation */}
      {p.validation && (
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <AnimatedSection>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                {isEn ? "Project Validation" : "Validação do Projeto"}
              </h2>
              <div className="flex items-center gap-6 mb-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-xs text-muted-foreground">VVB</p>
                    <p className="text-sm font-medium text-primary">{p.validation.vvb}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{isEn ? "Date" : "Data"}</p>
                    <p className="text-sm font-medium text-primary">{p.validation.date}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h3 className="font-heading font-semibold text-lg text-primary mb-4">
                {isEn ? "Validation Documents" : "Documentos da Validação"}
              </h3>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left p-4 font-semibold text-primary">{isEn ? "Document" : "Documento"}</th>
                        <th className="text-left p-4 font-semibold text-primary">{isEn ? "Date" : "Data"}</th>
                        <th className="text-center p-4 font-semibold text-primary">PT</th>
                        <th className="text-center p-4 font-semibold text-primary">EN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.validation.documents.map((doc, i) => (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-4 text-primary font-medium">{doc.name}</td>
                          <td className="p-4 text-muted-foreground">{doc.date || "—"}</td>
                          <td className="p-4 text-center">
                            <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary"><Download className="w-4 h-4" /></Button>
                          </td>
                          <td className="p-4 text-center">
                            <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary"><Download className="w-4 h-4" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Verifications */}
      {p.verifications.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container max-w-4xl">
            {p.verifications.map((v, vi) => (
              <div key={vi} className={vi > 0 ? "mt-16" : ""}>
                <AnimatedSection>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                    {isEn ? "Project Verification" : "Verificação do Projeto"}
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-card border border-border rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">{isEn ? "Verification" : "Verificação"}</p>
                      <p className="text-sm font-semibold text-primary">{v.title}</p>
                    </div>
                    {v.credits && (
                      <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">{isEn ? "Credits" : "Créditos"}</p>
                        <p className="text-sm font-semibold text-secondary">{v.credits}</p>
                      </div>
                    )}
                    {v.vintage && (
                      <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">Vintage</p>
                        <p className="text-sm font-semibold text-primary">{v.vintage}</p>
                      </div>
                    )}
                    {v.period && (
                      <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">{isEn ? "Period" : "Período"}</p>
                        <p className="text-sm font-semibold text-primary">{v.period}</p>
                      </div>
                    )}
                    <div className="bg-card border border-border rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">VVB</p>
                      <p className="text-sm font-semibold text-primary">{v.vvb}</p>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">{isEn ? "Date" : "Data"}</p>
                      <p className="text-sm font-semibold text-primary">{v.date}</p>
                    </div>
                  </div>

                  {v.txHash && (
                    <div className="flex items-center gap-2 bg-card border border-secondary/30 rounded-lg p-4 mb-8">
                      <Hash className="w-4 h-4 text-secondary shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground mb-0.5">{isEn ? "Blockchain Record" : "Registro Blockchain"}</p>
                        <p className="text-xs font-mono text-primary truncate">{v.txHash}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-secondary shrink-0" />
                    </div>
                  )}
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                  <h3 className="font-heading font-semibold text-lg text-primary mb-4">
                    {isEn ? "Verification Documents" : "Documentos da Verificação"}
                  </h3>
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/50">
                            <th className="text-left p-4 font-semibold text-primary">{isEn ? "Document" : "Documento"}</th>
                            <th className="text-left p-4 font-semibold text-primary">{isEn ? "Verification" : "Verificação"}</th>
                            <th className="text-left p-4 font-semibold text-primary">{isEn ? "Date" : "Data"}</th>
                            <th className="text-center p-4 font-semibold text-primary">PT</th>
                            <th className="text-center p-4 font-semibold text-primary">EN</th>
                          </tr>
                        </thead>
                        <tbody>
                          {v.documents.map((doc, i) => (
                            <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                              <td className="p-4 text-primary font-medium">{doc.name}</td>
                              <td className="p-4 text-muted-foreground">{v.title}</td>
                              <td className="p-4 text-muted-foreground">{doc.date || "—"}</td>
                              <td className="p-4 text-center">
                                <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary"><Download className="w-4 h-4" /></Button>
                              </td>
                              <td className="p-4 text-center">
                                <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary"><Download className="w-4 h-4" /></Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
              {isEn ? "Questions about this project?" : "Dúvidas sobre este projeto?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              {isEn
                ? "Share your concerns or suggestions anonymously and help us improve continuously."
                : "Compartilhe suas preocupações ou sugestões de forma anônima e ajude-nos a melhorar continuamente."}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/contato">
                <Button className="gap-2">{isEn ? "Contact Us" : "Entre em Contato"}</Button>
              </Link>
              <Link to="/projetos">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> {isEn ? "All Projects" : "Todos os Projetos"}
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
