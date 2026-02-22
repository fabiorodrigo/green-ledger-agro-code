/**
 * GL-canonical project status labels and colors.
 *
 * Conformidade GL (GL-DC.CER.001):
 * - LISTED = "Listado" (not "Registrado" — "Registro" is reserved for the blockchain registry concept)
 * - Status values mirror the API ProjectStatus enum (9 publicly visible states)
 */

export const PROJECT_STATUS_LABELS: Record<string, { pt: string; en: string; es: string }> = {
  LISTED:          { pt: 'Listado',                  en: 'Listed',               es: 'Listado' },
  IN_VALIDATION:   { pt: 'Em Validação',             en: 'In Validation',        es: 'En Validación' },
  VALIDATED:       { pt: 'Validado',                 en: 'Validated',            es: 'Validado' },
  IN_EXECUTION:    { pt: 'Em Execução',              en: 'In Execution',         es: 'En Ejecución' },
  IN_MONITORING:   { pt: 'Em Monitoramento',         en: 'In Monitoring',        es: 'En Monitoreo' },
  IN_VERIFICATION: { pt: 'Em Verificação',           en: 'In Verification',      es: 'En Verificación' },
  VERIFIED:        { pt: 'Verificado',               en: 'Verified',             es: 'Verificado' },
  ACTIVE:          { pt: 'Ativo — Créditos Emitidos', en: 'Active — Credits Issued', es: 'Activo — Créditos Emitidos' },
  FINALIZED:       { pt: 'Finalizado',               en: 'Finalized',            es: 'Finalizado' },
  SUSPENDED:       { pt: 'Suspenso',                 en: 'Suspended',            es: 'Suspendido' },
  // Internal-only statuses (not publicly visible, included for completeness)
  DRAFT:           { pt: 'Rascunho',                 en: 'Draft',                es: 'Borrador' },
  CANCELLED:       { pt: 'Cancelado',                en: 'Cancelled',            es: 'Cancelado' },
};

export const PROJECT_STATUS_COLORS: Record<string, string> = {
  LISTED:          'bg-muted text-muted-foreground border-muted',
  IN_VALIDATION:   'bg-yellow-500/10 text-yellow-700 border-yellow-500/30',
  VALIDATED:       'bg-blue-500/10 text-blue-600 border-blue-500/30',
  IN_EXECUTION:    'bg-blue-500/10 text-blue-600 border-blue-500/30',
  IN_MONITORING:   'bg-secondary/10 text-secondary border-secondary/30',
  IN_VERIFICATION: 'bg-secondary/15 text-secondary border-secondary/30',
  VERIFIED:        'bg-secondary/20 text-secondary border-secondary/30',
  ACTIVE:          'bg-secondary/20 text-secondary border-secondary/30',
  FINALIZED:       'bg-secondary/25 text-secondary border-secondary/30',
  SUSPENDED:       'bg-destructive/10 text-destructive border-destructive/30',
  DRAFT:           'bg-muted text-muted-foreground border-muted',
  CANCELLED:       'bg-destructive/10 text-destructive border-destructive/30',
};

/** Returns the localized status label (defaults to PT if locale not found). */
export function getStatusLabel(status: string, locale: 'pt' | 'en' | 'es' = 'pt'): string {
  return PROJECT_STATUS_LABELS[status]?.[locale] ?? status;
}

/** Returns the Tailwind color classes for a given status. */
export function getStatusColor(status: string): string {
  return PROJECT_STATUS_COLORS[status] ?? 'bg-muted text-muted-foreground border-muted';
}
