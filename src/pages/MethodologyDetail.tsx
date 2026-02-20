import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { methodologiesData } from "./Methodologies";

const MethodologyDetail = () => {
  const { slug } = useParams();
  const m = methodologiesData.find((d) => d.slug === slug);

  if (!m) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-primary mb-4">Metodologia não encontrada</h1>
          <Link to="/metodologias">
            <Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> Voltar</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="gradient-hero text-primary-foreground py-16 md:py-24">
        <div className="container">
          <Link to="/metodologias" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> Voltar para Metodologias
          </Link>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="font-heading font-bold text-accent">{m.code}</span>
            <span className="text-xs px-2 py-0.5 bg-primary-foreground/10 rounded-full">{m.version}</span>
            <span className="text-xs px-2 py-0.5 bg-secondary/20 text-accent rounded-full">{m.program}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold max-w-3xl">{m.title}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            {/* Overview */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">Visão Geral</h2>
              <p className="text-muted-foreground leading-relaxed">{m.summary}</p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Esta metodologia foi desenvolvida pelo comitê técnico da Green Ledger, revisada por especialistas independentes e aprovada após consulta pública. Ela estabelece os procedimentos para quantificação, monitoramento, reporte e verificação (MRV) das atividades elegíveis.
              </p>
            </div>

            {/* Scientific basis */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">Base Científica</h2>
              <p className="text-muted-foreground leading-relaxed">
                Fundamentada em literatura científica revisada por pares, diretrizes do IPCC para inventários nacionais de gases de efeito estufa e melhores práticas reconhecidas internacionalmente. Os fatores de emissão e equações utilizados são específicos para condições tropicais e subtropicais brasileiras.
              </p>
            </div>

            {/* Eligibility */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">Elegibilidade</h2>
              <div className="bg-muted/30 rounded-xl p-6 border border-border">
                <p className="text-muted-foreground leading-relaxed">{m.eligibility}</p>
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">Processo de Aplicação</h2>
              <ol className="space-y-4">
                {[
                  "Verificar elegibilidade do projeto conforme critérios da metodologia",
                  "Preparar Documento de Concepção do Projeto (DCP) seguindo o template da Green Ledger",
                  "Submeter DCP e documentação complementar pelo portal do cliente",
                  "Análise de completude e designação de validador/verificador",
                  "Validação técnica e aprovação para monitoramento",
                  "Implementação do plano de monitoramento conforme protocolo MRV",
                  "Verificação periódica e emissão de créditos",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-8 h-8 shrink-0 rounded-full bg-secondary/10 text-secondary font-heading font-bold text-sm flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-muted-foreground text-sm leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* MRV */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">Monitoramento, Reporte e Verificação (MRV)</h2>
              <div className="bg-muted/30 rounded-xl p-6 border border-border">
                <p className="text-muted-foreground leading-relaxed">{m.mrv}</p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  O plano de monitoramento deve ser implementado conforme especificado na documentação técnica, com registros mantidos por no mínimo 5 anos após o período de creditação. A verificação é realizada por auditores independentes credenciados pela Green Ledger.
                </p>
              </div>
            </div>

            {/* Documentation */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">Documentação</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Documento da Metodologia (PDF)", desc: "Versão completa da metodologia aprovada" },
                  { label: "Template DCP", desc: "Documento de Concepção do Projeto" },
                  { label: "Guia de Monitoramento", desc: "Instruções detalhadas para implementação do MRV" },
                  { label: "Histórico de Revisões", desc: "Registro de todas as alterações realizadas" },
                ].map((doc) => (
                  <div key={doc.label} className="flex items-start gap-3 p-4 rounded-lg border border-border hover:shadow-card transition-shadow cursor-pointer">
                    <FileText className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-primary">{doc.label}</p>
                      <p className="text-xs text-muted-foreground">{doc.desc}</p>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground ml-auto shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">* Documentação placeholder — links serão disponibilizados em breve.</p>
            </div>

            {/* Revisions */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">Histórico de Revisões</h2>
              <p className="text-muted-foreground text-sm">{m.revisions}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MethodologyDetail;
