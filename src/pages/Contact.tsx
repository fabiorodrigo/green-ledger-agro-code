import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => (
  <div className="pt-20">
    <section className="gradient-hero text-primary-foreground py-20 md:py-28">
      <div className="container">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent rounded-full mb-4">
          Contato
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold max-w-3xl">Fale Conosco</h1>
        <p className="mt-6 text-primary-foreground/80 max-w-2xl leading-relaxed text-lg">
          Entre em contato para saber mais sobre nossos programas de certificação ou iniciar o registro do seu projeto.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="container max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <h2 className="font-heading text-2xl font-bold text-primary mb-6">Envie uma mensagem</h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary mb-1.5 block">Nome</label>
                  <Input placeholder="Seu nome" />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary mb-1.5 block">Email</label>
                  <Input type="email" placeholder="seu@email.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-primary mb-1.5 block">Assunto</label>
                <Input placeholder="Ex: Registro de projeto" />
              </div>
              <div>
                <label className="text-sm font-medium text-primary mb-1.5 block">Mensagem</label>
                <Textarea placeholder="Descreva seu projeto ou dúvida..." rows={5} />
              </div>
              <Button type="submit" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8">
                Enviar Mensagem
              </Button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl font-bold text-primary mb-6">Informações</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-primary">Email</p>
                  <p className="text-sm text-muted-foreground">contato@greenledger.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-primary">Telefone</p>
                  <p className="text-sm text-muted-foreground">+55 (11) 0000-0000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-primary">Endereço</p>
                  <p className="text-sm text-muted-foreground">São Paulo, SP — Brasil</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 gradient-card rounded-xl border border-border shadow-card">
              <h3 className="font-heading font-semibold text-primary mb-2">Portal do Produtor</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Já tem um projeto registrado? Acesse a área do produtor para acompanhar o status do seu projeto.
              </p>
              <a href="https://app.greenledger.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                  Acessar Portal
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Contact;
