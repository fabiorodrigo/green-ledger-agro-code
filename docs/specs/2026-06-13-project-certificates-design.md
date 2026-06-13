# Exibir Certificados no Detalhe do Projeto (Balde A)

**Data:** 2026-06-13 · **Repo:** `green-ledger-agro-code`

## Problema
O detalhe do projeto está pobre vs. a referência (Tero Carbon). A API pública **já retorna** `certificates[]` (parecer/validação/verificação, cada um com `certificateNumber`, `ipfsHash`, `blockchainTxHash`, `sha256`), mas o **adapter descarta** esse campo e a página procura certificados dentro de `documents[]` (que vem vazio). Resultado: as seções "Documentos da Validação/Verificação" ficam vazias.

## Objetivo
Surfacer os `certificates[]` reais (ancorados em IPFS + on-chain) nas seções de Validação e Verificação que **já existem** em `ProjectDetail.tsx`, reusando o `DocumentTable` local.

## Dados (API → tipos do site)
A API devolve, por certificado: `_id, type, certificateNumber, issuedAt, ipfsHash?, blockchainTxHash?, sha256?`.
Tipos observados: `VALIDATION_OPINION`, `VALIDATION`, `VERIFICATION_OPINION`, `VERIFICATION_BLOCKCHAIN` (enum `CertificateType` da plataforma).

## Design
1. **Adapter (`src/lib/publicApiAdapter.ts`)**
   - Novo campo em `PublicProjectDetail`: `certificates: Array<{ id; type; certificateNumber; issuedAt; ipfsHash?; blockchainTxHash?; sha256? }>`.
   - Em `mapProjectDetail`: `certificates: (raw.certificates ?? []).map(...)` (id ← `_id`).
2. **Página (`src/pages/ProjectDetail.tsx`)**
   - Converter `p.certificates` em `DocRow[]`, separando por tipo:
     - Validação: `VALIDATION_OPINION`, `VALIDATION` → mescla em `validationDocs`.
     - Verificação: `VERIFICATION_OPINION`, `VERIFICATION_BLOCKCHAIN` → mescla em `verificationDocs`.
   - Cada cert vira `DocRow`: `title` = rótulo do tipo + `certificateNumber`; `fileUrl` = `https://ipfs.io/ipfs/<ipfsHash>` (quando houver); `txHash` = `blockchainTxHash`; `createdAt` = `issuedAt`; `version` = 1.
   - Adicionar rótulos PT/EN para os tipos de certificado (`VALIDATION_OPINION`, `VALIDATION`, `VERIFICATION_OPINION`, `VERIFICATION_BLOCKCHAIN`) no mapa de labels da página.
   - As seções e o `DocumentTable` local já renderizam `title`/`fileUrl`/`txHash` → sem novo componente.
3. **Links de verificação (mínimo):** `fileUrl` abre o PDF no IPFS; `txHash` exibe o registro on-chain (badge ⛓ já existente). *(Opcional futuro: link para `/api/public/verify/certificate/:number`.)*

## Fora de escopo
- Documentos públicos (DCP) — sem dado hoje (balde B, dados/ops).
- Impacto/ODS, bilíngue, mapa — baldes seguintes.

## Critérios de aceite
- [ ] Adapter mapeia `certificates`; teste unitário cobre o mapeamento (id←_id, campos, vazio→[]).
- [ ] Detalhe do GL-PRJ-0008 mostra 2 certificados em "Documentos da Validação" e 2 em "Documentos da Verificação", cada um com link IPFS + hash on-chain.
- [ ] Sem `certificates` → seções degradam como hoje (sem quebrar).
- [ ] `npm test`, `npm run build`, `npm run lint` ok (baseline de lint não piora).
