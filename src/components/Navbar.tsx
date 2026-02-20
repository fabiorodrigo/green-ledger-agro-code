import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { type Locale, localeLabels, localeFlags } from "@/i18n/translations";
import logo from "@/assets/logo-horizontal.png";

const dropdownLinks = [
  { key: "nav.programas", to: "/programas" },
  { key: "nav.metodologias", to: "/metodologias" },
  { key: "nav.consultas", to: "/consultas" },
  { key: "nav.tarifas", to: "/tarifas" },
  { key: "nav.plataforma", to: "/plataforma" },
  { key: "nav.vvbs", to: "/vvbs" },
  { key: "nav.governanca", to: "/governanca" },
  { key: "nav.sobre", to: "/sobre" },
  { key: "nav.materiais", to: "/materiais" },
  { key: "nav.contato", to: "/contato" },
];

const locales: Locale[] = ["pt", "en", "es"];

const Navbar = () => {
  const { locale, setLocale, t } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container flex items-center h-16 md:h-[72px]">
        {/* Logo - always visible */}
        <Link to="/" className="flex items-center shrink-0 mr-auto">
          <img src={logo} alt="Green Ledger" className="h-9 md:h-11 w-auto max-w-[160px] md:max-w-[200px] object-contain" />
        </Link>

        {/* Desktop nav - aligned right */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Green Ledger Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-1 px-3 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors hover:text-secondary ${dropdownOpen ? "text-secondary" : "text-foreground"}`}
            >
              {t("nav.greenledger")}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-0 bg-background border border-border rounded-lg shadow-elevated py-2 min-w-[220px] z-50">
                {dropdownLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-5 py-2.5 text-sm transition-colors hover:bg-muted/50 hover:text-secondary ${
                      location.pathname === link.to ? "text-secondary font-medium" : "text-foreground"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Direct links */}
          <Link
            to="/projetos"
            className={`px-3 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors hover:text-secondary ${
              location.pathname === "/projetos" ? "text-secondary" : "text-foreground"
            }`}
          >
            {t("nav.projetos")}
          </Link>
          <Link
            to="/comunicados"
            className={`px-3 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors hover:text-secondary ${
              location.pathname === "/comunicados" ? "text-secondary" : "text-foreground"
            }`}
          >
            {t("nav.comunicados")}
          </Link>

          {/* Separator */}
          <div className="w-px h-5 bg-border mx-2" />

          {/* Language selector */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md"
            >
              <span className="text-sm">{localeFlags[locale]}</span>
              <span className="uppercase text-xs font-semibold tracking-wide">{locale}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-1 bg-background border border-border rounded-lg shadow-elevated py-1 min-w-[150px] z-50">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 hover:bg-muted/50 transition-colors ${locale === l ? "text-secondary font-medium" : "text-foreground"}`}
                  >
                    <span className="text-sm">{localeFlags[l]}</span>
                    {localeLabels[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Login CTA */}
          <a
            href="https://app.greenledger.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 ml-2 px-5 py-2 text-[13px] font-semibold uppercase tracking-wide bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
          >
            {t("nav.login")}
            <ExternalLink className="w-3.5 h-3.5" />
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

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="container py-4 space-y-1">
            {/* Language selector mobile */}
            <div className="border-b border-border pb-3 mb-3">
              <button
                onClick={() => setMobileLangOpen(!mobileLangOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{localeFlags[locale]}</span>
                  {localeLabels[locale]}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileLangOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileLangOpen && (
                <div className="pl-4 space-y-1">
                  {locales.filter(l => l !== locale).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setMobileLangOpen(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-muted-foreground hover:text-secondary transition-colors"
                    >
                      <span className="text-base">{localeFlags[l]}</span>
                      {localeLabels[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Green Ledger accordion */}
            <div>
              <button
                onClick={() => setMobileAccordionOpen(!mobileAccordionOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold uppercase tracking-wide text-foreground"
              >
                {t("nav.greenledger")}
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordionOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileAccordionOpen && (
                <div className="pl-4 space-y-0.5 pb-2">
                  {dropdownLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-2.5 text-sm rounded-md transition-colors hover:bg-muted/50 ${
                        location.pathname === link.to ? "text-secondary font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {t(link.key)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct links */}
            <Link
              to="/projetos"
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                location.pathname === "/projetos" ? "text-secondary" : "text-foreground"
              }`}
            >
              {t("nav.projetos")}
            </Link>
            <Link
              to="/comunicados"
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                location.pathname === "/comunicados" ? "text-secondary" : "text-foreground"
              }`}
            >
              {t("nav.comunicados")}
            </Link>

            {/* Login CTA */}
            <div className="pt-3 border-t border-border mt-3">
              <a
                href="https://app.greenledger.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold uppercase tracking-wide bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
              >
                {t("nav.login")}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
