import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ExternalLink, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-horizontal.png";

const megaMenuColumns = [
  {
    title: "Certificação",
    links: [
      { label: "Programas", to: "/programas" },
      { label: "Metodologias", to: "/metodologias" },
      { label: "Processo de Certificação", to: "/processo" },
      { label: "Consultas Públicas", to: "/consultas" },
    ],
  },
  {
    title: "Governança",
    links: [
      { label: "VVBs", to: "/vvbs" },
      { label: "Governança", to: "/governanca" },
      { label: "Integridade e Salvaguardas", to: "/integridade" },
      { label: "Auditorias", to: "/auditorias" },
    ],
  },
  {
    title: "Plataforma",
    links: [
      { label: "Plataforma Green Ledger", to: "/plataforma" },
      { label: "Registro de Projetos", to: "/registro" },
      { label: "Marketplace de Créditos", to: "/marketplace" },
      { label: "Transparência", to: "/transparencia" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Sobre a Green Ledger", to: "/sobre" },
      { label: "Central de Materiais", to: "/materiais" },
      { label: "Notícias", to: "/noticias" },
      { label: "Contato", to: "/contato" },
    ],
  },
];

const Navbar = () => {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedCol, setMobileExpandedCol] = useState<number | null>(null);
  const location = useLocation();
  const megaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Close mega menu on route change
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setMobileExpandedCol(null);
  }, [location.pathname]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        megaRef.current &&
        !megaRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLinkActive = (to: string) => location.pathname === to;
  const isColumnActive = (col: typeof megaMenuColumns[0]) =>
    col.links.some((link) => isLinkActive(link.to));

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    setMegaOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-md border-b border-border">
      {/* Top accent line when mega menu is open */}
      <div
        className={`h-[2px] bg-secondary transition-opacity duration-300 ${
          megaOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={logo}
            alt="Green Ledger"
            className="h-10 md:h-12 w-auto max-w-[180px] md:max-w-[200px] object-contain"
          />
        </Link>

        {/* Desktop mega menu trigger */}
        <nav className="hidden lg:flex items-center">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <button
              ref={triggerRef}
              onClick={() => setMegaOpen(!megaOpen)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium font-heading rounded-md transition-colors ${
                megaOpen
                  ? "text-secondary bg-secondary/5"
                  : "text-foreground hover:text-secondary"
              }`}
            >
              Green Ledger
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  megaOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://app.greenledger.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            >
              <ExternalLink className="w-4 h-4" />
              Área do Cliente
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Mega Menu Panel */}
      {megaOpen && (
        <div
          ref={megaRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="hidden lg:block absolute left-0 right-0 top-full bg-background border-b border-border shadow-elevated animate-fade-in z-50"
        >
          <div className="container py-10">
            <div className="grid grid-cols-4 gap-10">
              {megaMenuColumns.map((col) => (
                <div key={col.title}>
                  <h3
                    className={`text-xs font-heading font-semibold uppercase tracking-widest mb-5 pb-2 border-b ${
                      isColumnActive(col)
                        ? "text-secondary border-secondary"
                        : "text-muted-foreground border-border"
                    }`}
                  >
                    {col.title}
                  </h3>
                  <ul className="space-y-1">
                    {col.links.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className={`block px-3 py-2.5 text-sm rounded-md transition-colors ${
                            isLinkActive(link.to)
                              ? "text-secondary bg-secondary/5 font-medium"
                              : "text-foreground hover:text-secondary hover:bg-secondary/5"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in max-h-[80vh] overflow-y-auto">
          <nav className="container py-4 flex flex-col gap-1">
            {megaMenuColumns.map((col, idx) => (
              <div key={col.title}>
                <button
                  onClick={() =>
                    setMobileExpandedCol(mobileExpandedCol === idx ? null : idx)
                  }
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-heading font-semibold uppercase tracking-wider rounded-md transition-colors ${
                    isColumnActive(col)
                      ? "text-secondary"
                      : "text-foreground"
                  }`}
                >
                  {col.title}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileExpandedCol === idx ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {mobileExpandedCol === idx && (
                  <div className="ml-4 mb-2 border-l-2 border-border pl-2 animate-fade-in">
                    {col.links.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-2.5 text-sm rounded-md transition-colors ${
                          isLinkActive(link.to)
                            ? "text-secondary font-medium"
                            : "text-foreground hover:text-secondary"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-border">
              <a
                href="https://app.greenledger.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                >
                  <ExternalLink className="w-4 h-4" />
                  Área do Cliente
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
