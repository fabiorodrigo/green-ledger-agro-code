import { FileText, ExternalLink, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProgramDocument } from "@/data/programsData";

interface Props {
  documents: ProgramDocument[];
  lang: "pt" | "en" | "es";
}

const statusLabel = {
  active: { pt: "Ativo", en: "Active", es: "Activo" },
  archived: { pt: "Arquivado", en: "Archived", es: "Archivado" },
};

const DocumentTable = ({ documents, lang }: Props) => (
  <div className="overflow-x-auto rounded-lg border border-border">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-muted/50 text-left">
          <th className="px-4 py-3 font-semibold text-primary whitespace-nowrap">ID</th>
          <th className="px-4 py-3 font-semibold text-primary whitespace-nowrap">
            {lang === "pt" ? "Versão" : lang === "en" ? "Version" : "Versión"}
          </th>
          <th className="px-4 py-3 font-semibold text-primary">
            {lang === "pt" ? "Documento" : lang === "en" ? "Document" : "Documento"}
          </th>
          <th className="px-4 py-3 font-semibold text-primary">Status</th>
          <th className="px-4 py-3 font-semibold text-primary text-center">PT</th>
          <th className="px-4 py-3 font-semibold text-primary text-center">EN</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc) => (
          <tr key={doc.id} className="border-t border-border hover:bg-muted/20 transition-colors">
            <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{doc.id}</td>
            <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{doc.version}</td>
            <td className="px-4 py-3 text-foreground">{doc.name[lang]}</td>
            <td className="px-4 py-3">
              <Badge
                variant="outline"
                className={
                  doc.status === "active"
                    ? "border-secondary/40 text-secondary bg-secondary/5 gap-1"
                    : "border-muted-foreground/40 text-muted-foreground"
                }
              >
                {doc.status === "active" && <CheckCircle className="w-3 h-3" />}
                {statusLabel[doc.status][lang]}
              </Badge>
            </td>
            <td className="px-4 py-3 text-center">
              {doc.linkPt && (
                <a
                  href={doc.linkPt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-secondary hover:text-secondary/80 font-medium text-xs"
                >
                  {doc.type === "template" ? (
                    <>
                      <ExternalLink className="w-3.5 h-3.5" />
                      {lang === "pt" ? "Ver Modelo" : lang === "en" ? "View Template" : "Ver Modelo"}
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5" />
                      {lang === "pt" ? "Baixar PDF" : lang === "en" ? "Download PDF" : "Descargar PDF"}
                    </>
                  )}
                </a>
              )}
            </td>
            <td className="px-4 py-3 text-center">
              {doc.linkEn && (
                <a
                  href={doc.linkEn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-secondary hover:text-secondary/80 font-medium text-xs"
                >
                  {doc.type === "template" ? (
                    <>
                      <ExternalLink className="w-3.5 h-3.5" />
                      {lang === "en" ? "View Template" : lang === "pt" ? "Ver Modelo" : "Ver Modelo"}
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5" />
                      {lang === "en" ? "Download PDF" : lang === "pt" ? "Baixar PDF" : "Descargar PDF"}
                    </>
                  )}
                </a>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DocumentTable;
