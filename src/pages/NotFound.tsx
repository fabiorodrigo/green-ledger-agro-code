import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const i18n = {
  pt: {
    title: "Página não encontrada",
    desc: "A página que você procura não existe ou foi movida. Confira os links abaixo para encontrar o que precisa.",
    home: "Ir para Início",
    back: "Voltar",
    registry: "Registro Público",
    docs: "Documentação",
    contact: "Fale Conosco",
    helpTitle: "Links úteis",
  },
  en: {
    title: "Page not found",
    desc: "The page you're looking for doesn't exist or has been moved. Check the links below to find what you need.",
    home: "Go to Home",
    back: "Go Back",
    registry: "Public Registry",
    docs: "Documentation",
    contact: "Contact Us",
    helpTitle: "Useful links",
  },
  es: {
    title: "Página no encontrada",
    desc: "La página que busca no existe o fue movida. Consulte los enlaces a continuación para encontrar lo que necesita.",
    home: "Ir al Inicio",
    back: "Volver",
    registry: "Registro Público",
    docs: "Documentación",
    contact: "Contáctenos",
    helpTitle: "Enlaces útiles",
  },
};

const NotFound = () => {
  const location = useLocation();
  const { locale } = useLanguage();
  const d = i18n[locale as keyof typeof i18n] || i18n.pt;

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-background">
      <div className="container max-w-lg text-center py-20">
        {/* Big 404 */}
        <div className="relative mb-8">
          <span className="font-heading text-[10rem] md:text-[12rem] font-bold text-secondary/10 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-16 h-16 text-secondary/40" />
          </div>
        </div>

        <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
          {d.title}
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
          {d.desc}
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Link to="/">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
              <Home className="w-4 h-4" /> {d.home}
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()} className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <ArrowLeft className="w-4 h-4" /> {d.back}
          </Button>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">{d.helpTitle}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/registro-publico" className="text-sm text-secondary hover:underline inline-flex items-center gap-1">
              <FileText className="w-3 h-3" /> {d.registry}
            </Link>
            <span className="text-border">·</span>
            <Link to="/documentacao" className="text-sm text-secondary hover:underline inline-flex items-center gap-1">
              <FileText className="w-3 h-3" /> {d.docs}
            </Link>
            <span className="text-border">·</span>
            <Link to="/contato" className="text-sm text-secondary hover:underline inline-flex items-center gap-1">
              <FileText className="w-3 h-3" /> {d.contact}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
