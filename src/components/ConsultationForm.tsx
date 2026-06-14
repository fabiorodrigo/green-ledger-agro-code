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
  isEn: boolean;
}

/** Format an ISO date for the consultation period line; empty string if absent. */
function formatDate(iso: string | undefined, isEn: boolean): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString(isEn ? "en-GB" : "pt-BR");
}

/** Whether the consultation still accepts contributions. */
function isOpen(status: string): boolean {
  return status.toUpperCase() === "OPEN";
}

const ConsultationForm = ({ consultation, isEn }: ConsultationFormProps) => {
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [content, setContent] = useState("");
  // Honeypot — must remain empty; bots that auto-fill it are silently rejected.
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const open = isOpen(consultation.status);
  const period = [formatDate(consultation.openDate, isEn), formatDate(consultation.closeDate, isEn)]
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
        isEn
          ? "Thank you! Your contribution was submitted."
          : "Obrigado! Sua contribuição foi enviada.",
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
          : isEn
            ? "Could not submit your contribution. Please try again later."
            : "Não foi possível enviar sua contribuição. Tente novamente mais tarde.";
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
            {consultation.title || (isEn ? "Public Consultation" : "Consulta Pública")}
          </h3>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              open
                ? "bg-secondary/15 text-secondary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {open ? (isEn ? "Open" : "Aberta") : isEn ? "Closed" : "Encerrada"}
          </span>
        </div>
        {period && (
          <p className="text-sm text-muted-foreground mt-1">
            {isEn ? "Period" : "Período"}: {period}
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-1">
          {consultation.commentCount}{" "}
          {isEn ? "contributions received" : "contribuições recebidas"}
        </p>
      </div>

      {submitted ? (
        <div className="flex items-start gap-3 rounded-lg bg-secondary/10 border border-secondary/20 p-4">
          <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <p className="text-sm text-primary">
            {isEn
              ? "Your contribution was submitted. Thank you for participating!"
              : "Sua contribuição foi enviada. Obrigado por participar!"}
          </p>
        </div>
      ) : open ? (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="consultation-author">
                {isEn ? "Name" : "Nome"} <span className="text-destructive">*</span>
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
                {isEn ? "Email" : "E-mail"} <span className="text-destructive">*</span>
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
              {isEn ? "Organization (optional)" : "Organização (opcional)"}
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
              {isEn ? "Message" : "Mensagem"} <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="consultation-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={submitting}
              rows={5}
              placeholder={
                isEn
                  ? "Share your concerns or suggestions..."
                  : "Compartilhe suas preocupações ou sugestões..."
              }
            />
          </div>

          {/* Honeypot — visually hidden, off the tab order, ignored by humans. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="consultation-honeypot">
              {isEn ? "Leave this field empty" : "Deixe este campo vazio"}
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
              ? isEn
                ? "Submitting..."
                : "Enviando..."
              : isEn
                ? "Submit Contribution"
                : "Enviar Contribuição"}
          </Button>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">
          {isEn
            ? "This consultation is closed and no longer accepts contributions."
            : "Esta consulta está encerrada e não aceita mais contribuições."}
        </p>
      )}
    </div>
  );
};

export default ConsultationForm;
