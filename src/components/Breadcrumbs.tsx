import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const routeLabels: Record<string, Record<string, string>> = {
  programas: { pt: "Programas", en: "Programs", es: "Programas" },
  metodologias: { pt: "Metodologias", en: "Methodologies", es: "Metodologías" },
  certificacao: { pt: "Certificação", en: "Certification", es: "Certificación" },
  governanca: { pt: "Governança", en: "Governance", es: "Gobernanza" },
  documentacao: { pt: "Documentação", en: "Documentation", es: "Documentación" },
  contato: { pt: "Contato", en: "Contact", es: "Contacto" },
  projetos: { pt: "Projetos", en: "Projects", es: "Proyectos" },
  comunicados: { pt: "Comunicados", en: "News", es: "Comunicados" },
  consultas: { pt: "Consultas Públicas", en: "Public Consultations", es: "Consultas Públicas" },
  tarifas: { pt: "Tarifas", en: "Fees", es: "Tarifas" },
  plataforma: { pt: "Plataforma", en: "Platform", es: "Plataforma" },
  vvbs: { pt: "VVBs", en: "VVBs", es: "VVBs" },
  sobre: { pt: "Sobre", en: "About", es: "Acerca de" },
  materiais: { pt: "Materiais", en: "Resources", es: "Materiales" },
  "registro-publico": { pt: "Registro Público", en: "Public Registry", es: "Registro Público" },
};

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const { locale } = useLanguage();
  const lang = locale as "pt" | "en" | "es";

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="fixed top-[68px] md:top-[80px] left-0 right-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border/50">
      <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <li>
          <Link to="/" className="hover:text-secondary transition-colors inline-flex items-center gap-1">
            <Home className="w-3 h-3" />
          </Link>
        </li>
        {segments.map((seg, i) => {
          const path = "/" + segments.slice(0, i + 1).join("/");
          const label = routeLabels[seg]?.[lang] || routeLabels[seg]?.pt || seg;
          const isLast = i === segments.length - 1;

          return (
            <li key={path} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
              {isLast ? (
                <span className="text-foreground font-medium">{label}</span>
              ) : (
                <Link to={path} className="hover:text-secondary transition-colors">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
