/**
 * ConsultationForm — public consultation comment submission (C5).
 *
 * Rendered on project/methodology detail pages when the entity has a public
 * consultation. SUBMIT-ONLY by design: the public API never returns comment
 * *content* (comments are write-only), so this component renders no list — only
 * the consultation metadata, the contribution count, and a submission form.
 *
 * Anti-spam: a hidden honeypot field (`honeypot`) is included; legitimate users
 * never fill it. The server also throttles the endpoint (10 req/min) and
 * `submitConsultationComment` surfaces the 429 as a friendly message.
 */

import { useState } from "react";
import { toast } from "sonner";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitConsultationComment } from "@/hooks/usePublicAPI";
import { useLanguage } from "@/i18n/LanguageContext";

interface ConsultationSummary {
  id: string;
  status: string;
  openDate?: string;
  closeDate?: string;
  title?: string;
  commentCount: number;
}

interface ConsultationFormProps {
  consultation: ConsultationSummary;
}

/** Format an ISO date for the consultation period line; empty string if absent. */
function formatDate(iso: string | undefined, locale: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  const dateLocale = locale === "en" ? "en-GB" : locale === "es" ? "es-ES" : "pt-BR";
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString(dateLocale);
}

/** Whether the consultation still accepts contributions. */
function isOpen(status: string): boolean {
  return status.toUpperCase() === "OPEN";
}

const ConsultationForm = ({ consultation }: ConsultationFormProps) => {
  const { tr, locale } = useLanguage();
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [content, setContent] = useState("");
  // Honeypot — must remain empty; bots that auto-fill it are silently rejected.
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const open = isOpen(consultation.status);
  const period = [formatDate(consultation.openDate, locale), formatDate(consultation.closeDate, locale)]
    .filter(Boolean)
    .join(" — ");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    // Honeypot tripped: pretend success without hitting the API (don't tip off bots).
    if (honeypot.trim() !== "") {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    try {
      await submitConsultationComment(consultation.id, {
        author: author.trim(),
        email: email.trim(),
        organization: organization.trim() || undefined,
        content: content.trim(),
      });
      toast.success(
        tr(
          "Obrigado! Sua contribuição foi enviada.",
          "Thank you! Your contribution was submitted.",
          "¡Gracias! Su contribución fue enviada.",
        ),
      );
      setAuthor("");
      setEmail("");
      setOrganization("");
      setContent("");
      setSubmitted(true);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : tr(
              "Não foi possível enviar sua contribuição. Tente novamente mais tarde.",
              "Could not submit your contribution. Please try again later.",
              "No fue posible enviar su contribución. Inténtelo de nuevo más tarde.",
            );
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8 text-left">
      {/* Consultation metadata header */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h3 className="font-heading font-semibold text-lg text-primary">
            {consultation.title ||
              tr("Consulta Pública", "Public Consultation", "Consulta Pública")}
          </h3>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              open
                ? "bg-secondary/15 text-secondary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {open
              ? tr("Aberta", "Open", "Abierta")
              : tr("Encerrada", "Closed", "Cerrada")}
          </span>
        </div>
        {period && (
          <p className="text-sm text-muted-foreground mt-1">
            {tr("Período", "Period", "Período")}: {period}
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-1">
          {consultation.commentCount}{" "}
          {tr(
            "contribuições recebidas",
            "contributions received",
            "contribuciones recibidas",
          )}
        </p>
      </div>

      {submitted ? (
        <div className="flex items-start gap-3 rounded-lg bg-secondary/10 border border-secondary/20 p-4">
          <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <p className="text-sm text-primary">
            {tr(
              "Sua contribuição foi enviada. Obrigado por participar!",
              "Your contribution was submitted. Thank you for participating!",
              "Su contribución fue enviada. ¡Gracias por participar!",
            )}
          </p>
        </div>
      ) : open ? (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="consultation-author">
                {tr("Nome", "Name", "Nombre")} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="consultation-author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                disabled={submitting}
                autoComplete="name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="consultation-email">
                {tr("E-mail", "Email", "Correo electrónico")}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="consultation-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={submitting}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="consultation-organization">
              {tr(
                "Organização (opcional)",
                "Organization (optional)",
                "Organización (opcional)",
              )}
            </Label>
            <Input
              id="consultation-organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              disabled={submitting}
              autoComplete="organization"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="consultation-content">
              {tr("Mensagem", "Message", "Comentario")}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="consultation-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={submitting}
              rows={5}
              placeholder={tr(
                "Compartilhe suas preocupações ou sugestões...",
                "Share your concerns or suggestions...",
                "Comparta sus inquietudes o sugerencias...",
              )}
            />
          </div>

          {/* Honeypot — visually hidden, off the tab order, ignored by humans. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="consultation-honeypot">
              {tr(
                "Deixe este campo vazio",
                "Leave this field empty",
                "Deje este campo vacío",
              )}
            </label>
            <input
              id="consultation-honeypot"
              name="honeypot"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={submitting} className="gap-2">
            <Send className="w-4 h-4" />
            {submitting
              ? tr("Enviando...", "Submitting...", "Enviando...")
              : tr("Enviar Contribuição", "Submit Contribution", "Enviar contribución")}
          </Button>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">
          {tr(
            "Esta consulta está encerrada e não aceita mais contribuições.",
            "This consultation is closed and no longer accepts contributions.",
            "Esta consulta está cerrada y ya no acepta contribuciones.",
          )}
        </p>
      )}
    </div>
  );
};

export default ConsultationForm;
