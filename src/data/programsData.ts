export interface ProgramDocument {
  id: string;
  version: string;
  name: { pt: string; en: string; es: string };
  status: "active" | "archived";
  linkPt?: string;
  linkEn?: string;
  type?: "pdf" | "template";
}

export interface DocumentSection {
  title: { pt: string; en: string; es: string };
  description?: { pt: string; en: string; es: string };
  documents: ProgramDocument[];
}

export interface ProgramDetail {
  id: string;
  slug: string;
  title: { pt: string; en: string; es: string };
  description: { pt: string; en: string; es: string };
  coreDocument: ProgramDocument;
  sections: DocumentSection[];
}

// ── Documentos Comuns ──────────────────────────────────────────────
export const commonDocuments: DocumentSection[] = [
  {
    title: {
      pt: "Definições",
      en: "Definitions",
      es: "Definiciones",
    },
    description: {
      pt: "O glossário central da Green Ledger. Consolida e padroniza todos os termos técnicos e acrônimos utilizados em nossa documentação.",
      en: "Green Ledger's central glossary. Consolidates and standardizes all technical terms and acronyms used in our documentation.",
      es: "El glosario central de Green Ledger. Consolida y estandariza todos los términos técnicos y acrónimos utilizados en nuestra documentación.",
    },
    documents: [
      {
        id: "DC.COM.001",
        version: "1.0",
        name: { pt: "Definições", en: "Definitions", es: "Definiciones" },
        status: "active",
        linkPt: "#",
        linkEn: "#",
        type: "pdf",
      },
    ],
  },
  {
    title: {
      pt: "Documentos de Consulta Pública",
      en: "Public Consultation Documents",
      es: "Documentos de Consulta Pública",
    },
    description: {
      pt: "Modelos e procedimentos utilizados durante os processos de consulta pública de programas, metodologias ou projetos.",
      en: "Templates and procedures used during public consultation processes for programs, methodologies or projects.",
      es: "Modelos y procedimientos utilizados durante los procesos de consulta pública de programas, metodologías o proyectos.",
    },
    documents: [
      {
        id: "DC.COM.003",
        version: "1.0",
        name: {
          pt: "Procedimento de Consulta a Stakeholders",
          en: "Stakeholder Consultation Procedure",
          es: "Procedimiento de Consulta a Stakeholders",
        },
        status: "active",
        linkPt: "#",
        linkEn: "#",
        type: "pdf",
      },
      {
        id: "TP.COM.001",
        version: "1.0",
        name: {
          pt: "Resposta aos Comentários da Consulta Pública",
          en: "Response to Public Consultation Comments",
          es: "Respuesta a los Comentarios de Consulta Pública",
        },
        status: "active",
        linkPt: "#",
        linkEn: "#",
        type: "template",
      },
    ],
  },
];

// ── Programa de Certificação ───────────────────────────────────────
export const certificationProgram: ProgramDetail = {
  id: "certificacao",
  slug: "certificacao",
  title: {
    pt: "Programa de Certificação",
    en: "Certification Program",
    es: "Programa de Certificación",
  },
  description: {
    pt: "Define as regras, os processos e o ciclo de vida para a certificação de projetos que geram ativos ambientais (créditos de carbono). É o guia mestre do 'como fazer'.",
    en: "Defines the rules, processes and lifecycle for certifying projects that generate environmental assets (carbon credits). It is the master guide on 'how to do it'.",
    es: "Define las reglas, los procesos y el ciclo de vida para la certificación de proyectos que generan activos ambientales (créditos de carbono). Es la guía maestra del 'cómo hacer'.",
  },
  coreDocument: {
    id: "DC.CER.001",
    version: "1.0",
    name: {
      pt: "Programa de Certificação",
      en: "Certification Program",
      es: "Programa de Certificación",
    },
    status: "active",
    linkPt: "#",
    linkEn: "#",
    type: "pdf",
  },
  sections: [
    {
      title: {
        pt: "Manuais e Diretrizes",
        en: "Manuals and Guidelines",
        es: "Manuales y Directrices",
      },
      documents: [
        {
          id: "DC.CER.002",
          version: "1.0",
          name: {
            pt: "Manual de Conformidade Fundiária e Selos Green Ledger para Projetos NBS",
            en: "Land Tenure Compliance Manual and Green Ledger Seals for NBS Projects",
            es: "Manual de Conformidad Fundiaria y Sellos Green Ledger para Proyectos NBS",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "pdf",
        },
        {
          id: "DC.CER.003",
          version: "1.0",
          name: {
            pt: "Diretrizes Técnicas para Quantificação de Carbono em Projetos AFOLU",
            en: "Technical Guidelines for Carbon Quantification in AFOLU Projects",
            es: "Directrices Técnicas para Cuantificación de Carbono en Proyectos AFOLU",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "pdf",
        },
      ],
    },
    {
      title: {
        pt: "Ferramentas (FR)",
        en: "Tools (FR)",
        es: "Herramientas (FR)",
      },
      documents: [
        {
          id: "FR.CER.001",
          version: "1.0",
          name: {
            pt: "Ferramenta de Análise de Escala de Projeto",
            en: "Project Scale Analysis Tool",
            es: "Herramienta de Análisis de Escala de Proyecto",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "pdf",
        },
        {
          id: "FR.CER.002",
          version: "1.0",
          name: {
            pt: "Ferramenta de Análise das Salvaguardas Socioambientais",
            en: "Social and Environmental Safeguards Analysis Tool",
            es: "Herramienta de Análisis de las Salvaguardas Socioambientales",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "pdf",
        },
        {
          id: "FR.CER.003",
          version: "1.0",
          name: {
            pt: "Ferramenta de Demonstração de Adicionalidade de Projeto",
            en: "Project Additionality Demonstration Tool",
            es: "Herramienta de Demostración de Adicionalidad de Proyecto",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "pdf",
        },
        {
          id: "FR.CER.004",
          version: "1.0",
          name: {
            pt: "Ferramenta de Análise do Risco de Não Permanência e Mecanismo de Garantia",
            en: "Non-Permanence Risk Analysis and Guarantee Mechanism Tool",
            es: "Herramienta de Análisis del Riesgo de No Permanencia y Mecanismo de Garantía",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "pdf",
        },
        {
          id: "FR.CER.005",
          version: "1.0",
          name: {
            pt: "Ferramenta de Estruturação de DCP",
            en: "PDD Structuring Tool",
            es: "Herramienta de Estructuración de DCP",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "pdf",
        },
      ],
    },
    {
      title: {
        pt: "Modelos (TP)",
        en: "Templates (TP)",
        es: "Modelos (TP)",
      },
      documents: [
        {
          id: "TP.CER.001",
          version: "1.0",
          name: {
            pt: "Declaração de Implementação Voluntária e Unicidade",
            en: "Declaration of Voluntary Implementation and Uniqueness",
            es: "Declaración de Implementación Voluntaria y Unicidad",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "template",
        },
        {
          id: "TP.CER.002",
          version: "1.0",
          name: {
            pt: "Declaração de Nomeação de Principal Proponente",
            en: "Declaration of Main Proponent Nomination",
            es: "Declaración de Nominación de Proponente Principal",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "template",
        },
        {
          id: "TP.CER.003",
          version: "1.0",
          name: {
            pt: "Declaração de Desmatamento Zero",
            en: "Zero Deforestation Declaration",
            es: "Declaración de Deforestación Cero",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "template",
        },
      ],
    },
  ],
};

// ── Programa de Metodologias ───────────────────────────────────────
export const methodologiesProgram: ProgramDetail = {
  id: "metodologias",
  slug: "metodologias",
  title: {
    pt: "Programa de Metodologias",
    en: "Methodologies Program",
    es: "Programa de Metodologías",
  },
  description: {
    pt: "Estabelece o processo e os critérios para o desenvolvimento, submissão, revisão e aprovação de novas metodologias de quantificação de carbono, garantindo que sejam robustas, transparentes e alinhadas com as melhores práticas científicas.",
    en: "Establishes the process and criteria for developing, submitting, reviewing and approving new carbon quantification methodologies, ensuring they are robust, transparent and aligned with best scientific practices.",
    es: "Establece el proceso y los criterios para el desarrollo, presentación, revisión y aprobación de nuevas metodologías de cuantificación de carbono, garantizando que sean robustas, transparentes y alineadas con las mejores prácticas científicas.",
  },
  coreDocument: {
    id: "DC.MET.001",
    version: "1.0",
    name: {
      pt: "Programa de Metodologias",
      en: "Methodologies Program",
      es: "Programa de Metodologías",
    },
    status: "active",
    linkPt: "#",
    linkEn: "#",
    type: "pdf",
  },
  sections: [
    {
      title: {
        pt: "Ferramentas (FR)",
        en: "Tools (FR)",
        es: "Herramientas (FR)",
      },
      documents: [
        {
          id: "FR.MET.001",
          version: "1.0",
          name: {
            pt: "Ferramenta de Estruturação de Metodologia",
            en: "Methodology Structuring Tool",
            es: "Herramienta de Estructuración de Metodología",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "pdf",
        },
        {
          id: "FR.MET.002",
          version: "1.0",
          name: {
            pt: "Ferramenta de Análise dos Critérios de Aceitação de Metodologia",
            en: "Methodology Acceptance Criteria Analysis Tool",
            es: "Herramienta de Análisis de los Criterios de Aceptación de Metodología",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "pdf",
        },
      ],
    },
  ],
};

// ── Programa de Ativos ─────────────────────────────────────────────
export const assetsProgram: ProgramDetail = {
  id: "ativos",
  slug: "registro-publico",
  title: {
    pt: "Programa de Ativos",
    en: "Assets Program",
    es: "Programa de Activos",
  },
  description: {
    pt: "Define os princípios e a governança dos ativos ambientais digitais e de seu registro na blockchain. Estabelece as bases para a integridade, unicidade e rastreabilidade de cada ativo emitido pela Green Ledger.",
    en: "Defines the principles and governance of digital environmental assets and their registration on the blockchain. Establishes the foundations for the integrity, uniqueness and traceability of each asset issued by Green Ledger.",
    es: "Define los principios y la gobernanza de los activos ambientales digitales y su registro en la blockchain. Establece las bases para la integridad, unicidad y trazabilidad de cada activo emitido por Green Ledger.",
  },
  coreDocument: {
    id: "DC.REG.001",
    version: "1.0",
    name: {
      pt: "Programa de Ativos",
      en: "Assets Program",
      es: "Programa de Activos",
    },
    status: "active",
    linkPt: "#",
    linkEn: "#",
    type: "pdf",
  },
  sections: [
    {
      title: {
        pt: "Políticas, Procedimentos e Processos",
        en: "Policies, Procedures and Processes",
        es: "Políticas, Procedimientos y Procesos",
      },
      documents: [
        {
          id: "DC.REG.002",
          version: "1.0",
          name: {
            pt: "Política de Integridade de Ativos",
            en: "Asset Integrity Policy",
            es: "Política de Integridad de Activos",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "pdf",
        },
        {
          id: "DC.REG.003",
          version: "1.0",
          name: {
            pt: "Procedimentos do Registro Green Ledger",
            en: "Green Ledger Registry Procedures",
            es: "Procedimientos del Registro Green Ledger",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "pdf",
        },
        {
          id: "DC.REG.004",
          version: "1.0",
          name: {
            pt: "Processo de Tokenização",
            en: "Tokenization Process",
            es: "Proceso de Tokenización",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "pdf",
        },
        {
          id: "DC.REG.005",
          version: "1.0",
          name: {
            pt: "Procedimento para Atestações do País Anfitrião",
            en: "Procedure for Host Country Attestations",
            es: "Procedimiento para Atestaciones del País Anfitrión",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "pdf",
        },
      ],
    },
    {
      title: {
        pt: "Modelos (TP)",
        en: "Templates (TP)",
        es: "Modelos (TP)",
      },
      documents: [
        {
          id: "TP.REG.001",
          version: "1.0",
          name: {
            pt: "Solicitação de Atestação do País Anfitrião",
            en: "Host Country Attestation Request",
            es: "Solicitud de Atestación del País Anfitrión",
          },
          status: "active",
          linkPt: "#",
          linkEn: "#",
          type: "template",
        },
      ],
    },
  ],
};

export const allPrograms = [certificationProgram, methodologiesProgram, assetsProgram];
