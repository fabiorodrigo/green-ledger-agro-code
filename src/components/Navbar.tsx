import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-horizontal.png";

const navLinks = [
  { label: "Programas", to: "/programas" },
  { label: "Metodologias", to: "/metodologias" },
  { label: "Certificação", to: "/certificacao" },
  { label: "Governança", to: "/governanca" },
  { label: "Documentação", to: "/documentacao" },
  { label: "Contato", to: "/contato" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="Green Ledger" className="h-10 md:h-12 w-auto max-w-[180px] md:max-w-[200px] object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-secondary hover:bg-secondary/5 ${
                location.pathname === link.to ? "text-secondary" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://app.greenledger.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
              <ExternalLink className="w-4 h-4" />
              Área do Cliente
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors hover:bg-secondary/5 ${
                  location.pathname === link.to ? "text-secondary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://app.greenledger.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2"
            >
              <Button variant="outline" size="sm" className="w-full gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                <ExternalLink className="w-4 h-4" />
                Área do Cliente
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
