export interface ProjectDocument {
  name: string;
  version?: string;
  date?: string;
  pdfPt?: string;
  pdfEn?: string;
}

export interface ProjectVerification {
  title: string;
  vvb: string;
  date: string;
  txHash?: string;
  vintage?: string;
  period?: string;
  credits?: string;
  documents: ProjectDocument[];
}

export interface ProjectData {
  slug: string;
  name: string;
  status: "registered" | "validated" | "certified";
  statusLabel: { pt: string; en: string; es: string };
  location: string;
  state: string;
  developer: { name: string; website?: string; email?: string; contact?: string };
  methodology: { code: string; name: string; slug: string };
  methodologyVersion: string;
  solutionType: string;
  program: string;
  biome: string;
  crop?: string;
  carbonType: string;
  creditingPeriod: string;
  overview: { pt: string; en: string };
  impact: { label: { pt: string; en: string }; value: string; sdgIcon?: string }[];
  documents: ProjectDocument[];
  validation?: { vvb: string; date: string; documents: ProjectDocument[] };
  verifications: ProjectVerification[];
}

export const projectsData: ProjectData[] = [
  {
    slug: "cm-serras-da-mantiqueira",
    name: "CM Serras da Mantiqueira",
    status: "certified",
    statusLabel: { pt: "Projeto Certificado", en: "Certified Project", es: "Proyecto Certificado" },
    location: "Carmo de Minas",
    state: "MG",
    developer: {
      name: "E2 Carbon Consultoria e Gestão Ltda",
      website: "https://e2carbon.com.br/",
      email: "comercial@e2carbon.com.br",
      contact: "Patrícia Helena Ribeiro",
    },
    methodology: {
      code: "GL-AFOLU-002",
      name: "Sistemas Agroflorestais (SAFs)",
      slug: "gl-afolu-002",
    },
    methodologyVersion: "v1.2",
    solutionType: "Solução Baseada na Natureza (NBS)",
    program: "AFOLU",
    biome: "Mata Atlântica",
    crop: "Cultura do Café",
    carbonType: "Carbono Estocado na Cultura",
    creditingPeriod: "01/08/2024 até 31/07/2030 (6 anos)",
    overview: {
      pt: "O Projeto CM Serras da Mantiqueira está localizado no município de Carmo de Minas, no sul de Minas Gerais. Ele é um consórcio entre três fazendas produtoras de café, que contam com um vasto histórico de atuação na agricultura, gerando empregos e impacto social na comunidade em que estão inseridas. O projeto foi idealizado pela empresa E2 Carbon, que faz parte de um grupo de empresas que, entre seus negócios, conta com um ecossistema completo de cafeicultura, desde a produção dos grãos nas fazendas, passando pelo preparo e distribuição dos grãos torrados, exportação e cafeterias. Esse ecossistema emprega diretamente cerca de quatro mil pessoas, divididas em todos os estados do Brasil.",
      en: "The CM Serras da Mantiqueira Project is located in the municipality of Carmo de Minas, in southern Minas Gerais. It is a consortium of three coffee-producing farms with a vast history of agricultural activity, generating jobs and social impact in the community. The project was conceived by E2 Carbon, part of a group of companies that includes a complete coffee ecosystem, from production on farms to roasting, distribution, export and coffee shops. This ecosystem directly employs about four thousand people across all states of Brazil.",
    },
    impact: [
      { label: { pt: "créditos de carbono (tCO₂e) de remoção", en: "carbon credits (tCO₂e) removal" }, value: "6.415" },
      { label: { pt: "nascentes preservadas nas três fazendas", en: "springs preserved across three farms" }, value: "47" },
      { label: { pt: "empregos diretos gerados nas três fazendas", en: "direct jobs generated across three farms" }, value: "120+" },
    ],
    documents: [
      { name: "Documento de Concepção de Projeto (DCP)", version: "1.1", date: "17/03/2025" },
      { name: "Declaração de implementação voluntária e unicidade de projeto de carbono" },
      { name: "Declaração de desmatamento zero" },
      { name: "Declaração de cessão de direito de imagem" },
      { name: "Declaração conjunta e nomeação de principal proponente do projeto" },
    ],
    validation: {
      vvb: "Valdiek da Silva Menezes",
      date: "21/03/2025",
      documents: [
        { name: "Parecer de Validação (VVB)", date: "19/03/2025" },
        { name: "Parecer de Validação (Green Ledger)", date: "21/03/2025" },
      ],
    },
    verifications: [
      {
        title: "Primeira Verificação",
        vvb: "Priscila Mendes Barbosa de Oliveira",
        date: "14/04/2025",
        txHash: "0xef4897ec2d7f465535cb835e002dbf0af29e7bed946ff4027f18d6d09ca087bb",
        vintage: "2025",
        period: "01/01/2003 à 20/08/2024",
        credits: "6.415 tCO₂e (Remoção)",
        documents: [
          { name: "Parecer de Verificação (VVB)", date: "14/04/2025" },
          { name: "Parecer de Verificação (Green Ledger)", date: "14/04/2025" },
          { name: "Certificado de Verificação", date: "14/04/2025" },
          { name: "Registro (Blockchain)", date: "14/04/2025" },
        ],
      },
    ],
  },
];
