import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { methodologiesData } from "./Methodologies";

const MethodologyDetail = () => {
  const { slug } = useParams();
  const m = methodologiesData.find((d) => d.slug === slug);

  if (!m) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-primary mb-4">Metodologia não encontrada</h1>
          <Link to="/metodologias">
            <Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> Voltar</Button>
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    { title: "Visão Geral", content: m.summary + "\n\nEsta metodologia foi desenvolvida pelo comitê técnico da Green Ledger, revisada por especialistas independentes e aprovada após consulta pública de 60 dias. Estabelece os procedimentos para quantificação, monitoramento, reporte e verificação (MRV) das atividades elegíveis, em conformidade com os princípios de adicionalidade, conservadorismo e integridade ambiental." },
    { title: "Código e Versão", content: `Código: ${m.code}\nVersão atual: ${m.version}\nHistórico de revisões: ${m.revisions}` },
    { title: "Escopo", content: m.summary },
    { title: "Elegibilidade", content: m.eligibility },
    { title: "Adicionalidade", content: m.additionality },
    { title: "Boundary do Projeto", content: m.boundary },
    { title: "Mensuração, Relato e Verificação (MRV)", content: m.mrv + "\n\nO plano de monitoramento deve ser implementado conforme especificado na documentação técnica, com registros mantidos por no mínimo 5 anos após o período de creditação. A verificação é realizada por organismos de validação e verificação (VVBs) independentes credenciados pela Green Ledger." },
    { title: "QA/QC — Controle de Qualidade", content: m.qaqc },
    { title: "Salvaguardas Ambientais e Sociais", content: m.safeguards },
  ];

  return (
    <div className="pt-20">
      <section className="gradient-hero text-primary-foreground py-20 md:py-28">
        <div className="container">
          <Link to="/metodologias" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-8">
            <ArrowLeft className="w-4 h-4" /> Voltar para Metodologias
          </Link>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="font-heading font-bold text-accent">{m.code}</span>
            <span className="text-xs px-2 py-0.5 bg-primary-foreground/10 rounded-full">{m.version}</span>
            <span className="text-xs px-2 py-0.5 bg-secondary/20 text-accent rounded-full">{m.program}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold max-w-3xl">{m.title}</h1>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container max-w-4xl">
          <div className="space-y-16">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-heading text-xl font-bold text-primary mb-4 pb-3 border-b border-border">{s.title}</h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                  {s.content}
                </div>
              </div>
            ))}

            {/* Documentation */}
            <div>
              <h2 className="font-heading text-xl font-bold text-primary mb-4 pb-3 border-b border-border">Documentação</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {m.documents.map((doc) => (
                  <div key={doc} className="flex items-center gap-3 p-4 rounded-lg border border-border hover:shadow-card transition-shadow cursor-pointer">
                    <FileText className="w-5 h-5 text-secondary shrink-0" />
                    <p className="font-medium text-sm text-primary flex-1">{doc}</p>
                    <Download className="w-4 h-4 text-muted-foreground shrink-0" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">* Documentação placeholder — os arquivos serão disponibilizados em breve.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MethodologyDetail;
