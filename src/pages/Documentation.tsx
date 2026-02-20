import { FileText, Download, BookOpen, ClipboardList } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const docs = [
  {
    category: "Metodologias",
    icon: FileText,
    items: [
      { title: "GL-AFOLU-001 — Reflorestamento e Restauração", version: "v2.1" },
      { title: "GL-AFOLU-002 — Sistemas Agroflorestais", version: "v1.2" },
      { title: "GL-AFOLU-003 — REDD+", version: "v1.0" },
      { title: "GL-SC-001 — Plantio Direto", version: "v1.3" },
      { title: "GL-SC-002 — ILPF", version: "v1.0" },
      { title: "GL-ET-001 — Biodigestores e Tratamento de Resíduos", version: "v2.0" },
      { title: "GL-ET-002 — Eficiência Energética e Tecnologias Limpas", version: "v1.0" },
    ],
  },
  {
    category: "Templates",
    icon: ClipboardList,
    items: [
      { title: "Template — Documento de Concepção do Projeto (DCP)", version: "v1.0" },
      { title: "Template — Relatório de Monitoramento", version: "v1.0" },
      { title: "Template — Relatório de Validação", version: "v1.0" },
      { title: "Template — Relatório de Verificação", version: "v1.0" },
    ],
  },
  {
    category: "Guias",
    icon: BookOpen,
    items: [
      { title: "Guia do Desenvolvedor de Projetos", version: "v1.0" },
      { title: "Guia de Credenciamento de Auditores", version: "v1.0" },
      { title: "Manual do Portal do Cliente", version: "v1.0" },
      { title: "Guia de Consulta Pública", version: "v1.0" },
    ],
  },
];

const Documentation = () => (
  <div>
    <section className="gradient-hero text-primary-foreground py-20 md:py-28">
      <div className="container">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-4">
          Documentação
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">Documentação e Recursos</h1>
        <p className="mt-6 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">
          Acesse todas as metodologias, templates e guias da Green Ledger. Toda documentação é pública e disponível para download.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="container max-w-4xl space-y-16">
        {docs.map((section) => (
          <div key={section.category}>
            <div className="flex items-center gap-3 mb-6">
              <section.icon className="w-6 h-6 text-secondary" />
              <h2 className="font-heading text-2xl font-bold text-primary">{section.category}</h2>
            </div>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:shadow-card transition-shadow bg-card cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-primary">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.version}</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="text-xs text-muted-foreground italic text-center">
          * Documentação placeholder — os arquivos serão disponibilizados em breve.
        </p>
      </div>
    </section>
  </div>
);

export default Documentation;
