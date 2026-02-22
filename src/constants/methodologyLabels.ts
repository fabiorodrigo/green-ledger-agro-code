/**
 * GL-canonical methodology display labels.
 *
 * Maps API solutionType / sector / activityType values to display text.
 * Per GL taxonomy (GL-DC.MET.001): Solution (NBS/TBS) + Sector + ActivityType
 * are distinct concepts — not "programs" like AFOLU/Soil Carbon/Energy & Tech.
 */

export const SOLUTION_TYPE_LABELS: Record<string, { pt: string; en: string; es: string }> = {
  NBS: { pt: 'Base Natural',    en: 'Nature-Based',    es: 'Base Natural' },
  TBS: { pt: 'Base Tecnológica', en: 'Technology-Based', es: 'Base Tecnológica' },
};

export const SECTOR_LABELS: Record<string, { pt: string; en: string; es: string }> = {
  AFOLU:        { pt: 'AFOLU',       en: 'AFOLU',       es: 'AFOLU' },
  Energia:      { pt: 'Energia',     en: 'Energy',      es: 'Energía' },
  'Resíduos':   { pt: 'Resíduos',   en: 'Waste',       es: 'Residuos' },
  Transporte:   { pt: 'Transporte',  en: 'Transport',   es: 'Transporte' },
  Industrial:   { pt: 'Industrial',  en: 'Industrial',  es: 'Industrial' },
};

export const ACTIVITY_TYPE_LABELS: Record<string, { pt: string; en: string; es: string }> = {
  'REDD+':                  { pt: 'REDD+',                      en: 'REDD+',                        es: 'REDD+' },
  ARR:                      { pt: 'Reflorestamento (ARR)',       en: 'Reforestation (ARR)',           es: 'Reforestación (ARR)' },
  ALM:                      { pt: 'Manejo de Terras Agrícolas',  en: 'Agricultural Land Management', es: 'Gestión de Tierras Agrícolas' },
  WRC:                      { pt: 'Conservação de Recursos Hídricos', en: 'Wetland Restoration and Conservation', es: 'Conservación de Recursos Hídricos' },
  ACoGS:                    { pt: 'Sequestro de Carbono Azul',   en: 'Coastal & Ocean Geology Sequestration', es: 'Secuestro Geológico Costero' },
  'Eficiência Energética':  { pt: 'Eficiência Energética',       en: 'Energy Efficiency',            es: 'Eficiencia Energética' },
  'Tratamento de Resíduos': { pt: 'Tratamento de Resíduos',     en: 'Waste Treatment',              es: 'Tratamiento de Residuos' },
  'Energia Renovável':      { pt: 'Energia Renovável',          en: 'Renewable Energy',             es: 'Energía Renovable' },
};

/** GEE type canonical values per GL-DC.MET.001. */
export const GEE_TYPE_LABELS: Record<string, { pt: string; en: string; es: string }> = {
  'Redução/Evitação': { pt: 'Redução/Evitação', en: 'Reduction/Avoidance', es: 'Reducción/Evitación' },
  'Remoção':          { pt: 'Remoção',          en: 'Removal',             es: 'Remoción' },
  'Estoque':          { pt: 'Estoque',          en: 'Stock',               es: 'Inventario' },
};

/** SDG labels (ODS 13 is excluded from project goals per GL-DC.MET.001 §6.1). */
export const SDG_LABELS: Record<number, { pt: string; en: string }> = {
  1:  { pt: 'ODS 1: Erradicação da Pobreza',       en: 'SDG 1: No Poverty' },
  2:  { pt: 'ODS 2: Fome Zero',                    en: 'SDG 2: Zero Hunger' },
  3:  { pt: 'ODS 3: Saúde e Bem-Estar',            en: 'SDG 3: Good Health' },
  4:  { pt: 'ODS 4: Educação de Qualidade',        en: 'SDG 4: Quality Education' },
  5:  { pt: 'ODS 5: Igualdade de Gênero',          en: 'SDG 5: Gender Equality' },
  6:  { pt: 'ODS 6: Água Potável e Saneamento',    en: 'SDG 6: Clean Water' },
  7:  { pt: 'ODS 7: Energia Acessível e Limpa',    en: 'SDG 7: Affordable Energy' },
  8:  { pt: 'ODS 8: Trabalho Decente',             en: 'SDG 8: Decent Work' },
  9:  { pt: 'ODS 9: Indústria e Inovação',         en: 'SDG 9: Industry & Innovation' },
  10: { pt: 'ODS 10: Redução das Desigualdades',   en: 'SDG 10: Reduced Inequalities' },
  11: { pt: 'ODS 11: Cidades Sustentáveis',        en: 'SDG 11: Sustainable Cities' },
  12: { pt: 'ODS 12: Consumo Responsável',         en: 'SDG 12: Responsible Consumption' },
  // 13 is excluded — it is a program prerequisite, not an eligible project goal
  14: { pt: 'ODS 14: Vida na Água',                en: 'SDG 14: Life Below Water' },
  15: { pt: 'ODS 15: Vida Terrestre',              en: 'SDG 15: Life on Land' },
  16: { pt: 'ODS 16: Paz e Justiça',               en: 'SDG 16: Peace & Justice' },
  17: { pt: 'ODS 17: Parcerias',                   en: 'SDG 17: Partnerships' },
};

/** Get localized label for solutionType. */
export function getSolutionLabel(value: string, locale: 'pt' | 'en' | 'es' = 'pt'): string {
  return SOLUTION_TYPE_LABELS[value]?.[locale] ?? value;
}

/** Get localized label for sector. */
export function getSectorLabel(value: string, locale: 'pt' | 'en' | 'es' = 'pt'): string {
  return SECTOR_LABELS[value]?.[locale] ?? value;
}

/** Get localized label for activityType. */
export function getActivityTypeLabel(value: string, locale: 'pt' | 'en' | 'es' = 'pt'): string {
  return ACTIVITY_TYPE_LABELS[value]?.[locale] ?? value;
}
