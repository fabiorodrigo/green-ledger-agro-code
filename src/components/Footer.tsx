import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/logo-horizontal.png";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="gradient-hero text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={logo} alt="Green Ledger" className="h-10 w-auto max-w-[180px] object-contain mb-4 brightness-0 invert" />
            <p className="text-sm opacity-80 leading-relaxed">
              {t("footer.descricao")}
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 opacity-70">{t("footer.institucional")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/sobre" className="opacity-80 hover:opacity-100 transition-opacity">{t("nav.sobre")}</Link></li>
              <li><Link to="/programas" className="opacity-80 hover:opacity-100 transition-opacity">{t("nav.programas")}</Link></li>
              <li><Link to="/metodologias" className="opacity-80 hover:opacity-100 transition-opacity">{t("nav.metodologias")}</Link></li>
              <li><Link to="/governanca" className="opacity-80 hover:opacity-100 transition-opacity">{t("nav.governanca")}</Link></li>
              <li><Link to="/vvbs" className="opacity-80 hover:opacity-100 transition-opacity">{t("nav.vvbs")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 opacity-70">{t("footer.recursos")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/projetos" className="opacity-80 hover:opacity-100 transition-opacity">{t("nav.projetos")}</Link></li>
              <li><Link to="/comunicados" className="opacity-80 hover:opacity-100 transition-opacity">{t("nav.comunicados")}</Link></li>
              <li><Link to="/materiais" className="opacity-80 hover:opacity-100 transition-opacity">{t("nav.materiais")}</Link></li>
              <li><Link to="/consultas" className="opacity-80 hover:opacity-100 transition-opacity">{t("nav.consultas")}</Link></li>
              <li><Link to="/tarifas" className="opacity-80 hover:opacity-100 transition-opacity">{t("nav.tarifas")}</Link></li>
              <li><a href="https://app.greenledger.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">{t("footer.portal")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 opacity-70">{t("footer.contato")}</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>contato@greenledger.com</li>
              <li>São Paulo, Brasil</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-sm opacity-60 text-center">
          © {new Date().getFullYear()} Green Ledger. {t("footer.direitos")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
