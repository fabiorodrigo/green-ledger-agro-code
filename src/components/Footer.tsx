import { Link } from "react-router-dom";
import logo from "@/assets/logo-horizontal.png";

const Footer = () => (
  <footer className="gradient-hero text-primary-foreground">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <img src={logo} alt="Green Ledger" className="h-10 w-auto max-w-[180px] object-contain mb-4 brightness-0 invert" />
          <p className="text-sm opacity-80 leading-relaxed">
            Certificadora de créditos de carbono para o setor agropecuário brasileiro. Rigor técnico, transparência e integridade ambiental.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 opacity-70">Institucional</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/programas" className="opacity-80 hover:opacity-100 transition-opacity">Programas</Link></li>
            <li><Link to="/metodologias" className="opacity-80 hover:opacity-100 transition-opacity">Metodologias</Link></li>
            <li><Link to="/certificacao" className="opacity-80 hover:opacity-100 transition-opacity">Processo de Certificação</Link></li>
            <li><Link to="/governanca" className="opacity-80 hover:opacity-100 transition-opacity">Governança</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 opacity-70">Recursos</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/documentacao" className="opacity-80 hover:opacity-100 transition-opacity">Documentação</Link></li>
            <li><Link to="/contato" className="opacity-80 hover:opacity-100 transition-opacity">Contato</Link></li>
            <li><a href="https://app.greenledger.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">Área do Produtor</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 opacity-70">Contato</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>contato@greenledger.com</li>
            <li>São Paulo, Brasil</li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-sm opacity-60 text-center">
        © {new Date().getFullYear()} Green Ledger. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
