import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/i18n/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

const ui = {
  pt: {
    seoTitle: "Contato", seoDesc: "Entre em contato com a Green Ledger.",
    badge: "Contato", title: "Fale Conosco", subtitle: "Entre em contato para saber mais sobre nossos programas de certificação ou iniciar o registro do seu projeto.",
    formTitle: "Envie uma mensagem", name: "Nome", namePh: "Seu nome", email: "Email", emailPh: "seu@email.com",
    subject: "Assunto", subjectPh: "Ex: Registro de projeto", message: "Mensagem", messagePh: "Descreva seu projeto ou dúvida...", send: "Enviar Mensagem",
    infoTitle: "Informações", portalTitle: "Portal do Cliente", portalDesc: "Já tem um projeto registrado? Acesse a área do cliente para acompanhar o status do seu projeto.", portalBtn: "Acessar Portal",
  },
  en: {
    seoTitle: "Contact", seoDesc: "Get in touch with Green Ledger.",
    badge: "Contact", title: "Contact Us", subtitle: "Get in touch to learn more about our certification programs or start registering your project.",
    formTitle: "Send a message", name: "Name", namePh: "Your name", email: "Email", emailPh: "your@email.com",
    subject: "Subject", subjectPh: "E.g.: Project registration", message: "Message", messagePh: "Describe your project or question...", send: "Send Message",
    infoTitle: "Information", portalTitle: "Client Portal", portalDesc: "Already have a registered project? Access the client area to track your project status.", portalBtn: "Access Portal",
  },
  es: {
    seoTitle: "Contacto", seoDesc: "Póngase en contacto con Green Ledger.",
    badge: "Contacto", title: "Contáctenos", subtitle: "Contáctenos para conocer más sobre nuestros programas de certificación o iniciar el registro de su proyecto.",
    formTitle: "Envíe un mensaje", name: "Nombre", namePh: "Su nombre", email: "Email", emailPh: "su@email.com",
    subject: "Asunto", subjectPh: "Ej: Registro de proyecto", message: "Mensaje", messagePh: "Describa su proyecto o consulta...", send: "Enviar Mensaje",
    infoTitle: "Información", portalTitle: "Portal del Cliente", portalDesc: "¿Ya tiene un proyecto registrado? Acceda al área del cliente para acompañar el estado de su proyecto.", portalBtn: "Acceder al Portal",
  },
};

const Contact = () => {
  const { locale } = useLanguage();
  const d = ui[locale as keyof typeof ui] || ui.pt;

  return (
    <div className="pt-20">
      <SEOHead title={d.seoTitle} description={d.seoDesc} path="/contato" />

      <section className="gradient-hero text-primary-foreground py-20 md:py-28">
        <div className="container">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-4">{d.badge}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">{d.title}</h1>
          <p className="mt-6 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">{d.subtitle}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <AnimatedSection>
                <h2 className="font-heading text-2xl font-bold text-primary mb-6">{d.formTitle}</h2>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-sm font-medium text-primary mb-1.5 block">{d.name}</label><Input placeholder={d.namePh} /></div>
                    <div><label className="text-sm font-medium text-primary mb-1.5 block">{d.email}</label><Input type="email" placeholder={d.emailPh} /></div>
                  </div>
                  <div><label className="text-sm font-medium text-primary mb-1.5 block">{d.subject}</label><Input placeholder={d.subjectPh} /></div>
                  <div><label className="text-sm font-medium text-primary mb-1.5 block">{d.message}</label><Textarea placeholder={d.messagePh} rows={5} /></div>
                  <Button type="submit" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8">{d.send}</Button>
                </form>
              </AnimatedSection>
            </div>
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.1}>
                <h2 className="font-heading text-2xl font-bold text-primary mb-6">{d.infoTitle}</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4"><Mail className="w-5 h-5 text-secondary mt-0.5" /><div><p className="font-medium text-sm text-primary">Email</p><p className="text-sm text-muted-foreground">contato@greenledger.com</p></div></div>
                  <div className="flex items-start gap-4"><Phone className="w-5 h-5 text-secondary mt-0.5" /><div><p className="font-medium text-sm text-primary">{locale === "en" ? "Phone" : locale === "es" ? "Teléfono" : "Telefone"}</p><p className="text-sm text-muted-foreground">+55 (11) 0000-0000</p></div></div>
                  <div className="flex items-start gap-4"><MapPin className="w-5 h-5 text-secondary mt-0.5" /><div><p className="font-medium text-sm text-primary">{locale === "en" ? "Address" : locale === "es" ? "Dirección" : "Endereço"}</p><p className="text-sm text-muted-foreground">São Paulo, SP — Brasil</p></div></div>
                </div>
                <div className="mt-10 p-6 gradient-card rounded-xl border border-border shadow-card">
                  <h3 className="font-heading font-semibold text-primary mb-2">{d.portalTitle}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{d.portalDesc}</p>
                  <a href="https://app.greenledger.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">{d.portalBtn}</Button>
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
