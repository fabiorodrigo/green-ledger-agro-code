import { describe, it, expect } from "vitest";
import {
  mapStatus,
  toPaginated,
  mapProject,
  mapProjectDetail,
  mapMethodology,
  mapMethodologyDetail,
  mapVvb,
  mapStatistics,
} from "../publicApiAdapter";

describe("mapStatus", () => {
  it("maps workflow states to canonical site statuses", () => {
    expect(mapStatus("VALIDATION_PROJECT_LISTING")).toBe("LISTED");
    expect(mapStatus("VALIDATION_PROJECT_VALIDATION")).toBe("IN_VALIDATION");
    expect(mapStatus("VALIDATION_INTERNAL_VALIDATION")).toBe("IN_VALIDATION");
    expect(mapStatus("VALIDATION_REGISTRY_UPDATE")).toBe("VALIDATED");
    expect(mapStatus("ACTIVE")).toBe("IN_EXECUTION");
    expect(mapStatus("KPI_MONITORING")).toBe("IN_MONITORING");
    expect(mapStatus("VERIFICATION_EXTERNAL_REVIEW")).toBe("IN_VERIFICATION");
    expect(mapStatus("VERIFICATION_REGISTRY_UPDATE")).toBe("ACTIVE");
    expect(mapStatus("CONCLUDED")).toBe("FINALIZED");
    expect(mapStatus("SUSPENDED")).toBe("SUSPENDED");
  });
  it("passes unknown states through unchanged", () => {
    expect(mapStatus("WAT")).toBe("WAT");
  });
});

describe("toPaginated", () => {
  it("wraps a flat platform response into { data, meta }", () => {
    const raw = { data: [1, 2], total: 5, page: 1, limit: 2, totalPages: 3 };
    const out = toPaginated(raw, (n: number) => n * 10);
    expect(out.data).toEqual([10, 20]);
    expect(out.meta).toEqual({ total: 5, page: 1, limit: 2, totalPages: 3 });
  });
});

describe("mapProject", () => {
  it("maps platform fields to site shape and leaves backlog undefined", () => {
    const raw = {
      _id: "a1",
      code: "GL-PRJ-0001",
      name: "Projeto X",
      type: "VCU",
      status: "VALIDATION_PROJECT_LISTING",
      country: "BR",
      location: "Cerrado, MG",
      creditingPeriodStart: "2025-01-01",
      creditingPeriodEnd: "2030-01-01",
      createdAt: "2025-01-01",
      developer: { _id: "u1", name: "Fulano", organizationName: "Org Verde" },
      methodology: { _id: "m1", code: "MET001", name: "Reflorestamento", version: "v1" },
    };
    const p = mapProject(raw);
    expect(p.id).toBe("a1");
    expect(p.code).toBe("GL-PRJ-0001");
    expect(p.assetType).toBe("VCU");
    expect(p.status).toBe("LISTED");
    expect(p.locationDescription).toBe("Cerrado, MG");
    expect(p.organization).toEqual({ id: "u1", name: "Org Verde" });
    expect(p.methodology).toMatchObject({ id: "m1", code: "MET001", name: "Reflorestamento" });
    expect(p.solutionType).toBeUndefined();
    expect(p.sector).toBeUndefined();
  });
  it("falls back organization name to developer.name when no org name", () => {
    const p = mapProject({ _id: "a", developer: { _id: "u", name: "Solo" }, methodology: null });
    expect(p.organization).toEqual({ id: "u", name: "Solo" });
  });
});

describe("mapProjectDetail", () => {
  it("passes properties through, maps validationEvent.glOpinion from opinion, and maps top-level issuances txHash from mintTxHash", () => {
    const raw = {
      _id: "p1",
      code: "GL-PRJ-0009",
      name: "Detalhe X",
      type: "VCU",
      status: "VERIFICATION_REGISTRY_UPDATE",
      country: "BR",
      location: "Amazonia, PA",
      createdAt: "2025-01-01",
      overview: "Resumo do projeto",
      description: "Descrição completa do projeto",
      developer: { _id: "u1", name: "Fulano", organizationName: "Org Verde" },
      methodology: { _id: "m1", code: "MET001", name: "Reflorestamento", version: "v2" },
      properties: [
        { municipality: "Belem", state: "PA", latitude: -1.45, longitude: -48.5 },
      ],
      validationEvent: { opinion: "POSITIVE", completedAt: "2025-02-01" },
      verificationEvents: [
        {
          roundNumber: 1,
          monitoringPeriodStart: "2025-01-01",
          monitoringPeriodEnd: "2025-12-31",
          netIssuable: 1000,
          vvbOpinion: "APPROVED",
          verificationAssignment: { vvb: { _id: "v1", organizationName: "VVB One" } },
        },
      ],
      issuances: [
        { vintageYear: 2025, issuedQuantity: 500, mintTxHash: "0xabc" },
      ],
      members: [{ role: "DEVELOPER", organization: { id: "u1", name: "Org Verde" } }],
      documents: [
        { _id: "doc1", type: "DCP", originalName: "DCP.pdf", ipfsHash: "QmDoc", createdAt: "2025-01-01" },
        { _id: "doc2", type: "MONITORING_REPORT", originalName: "MR.pdf", createdAt: "2025-02-01" },
      ],
      _count: { properties: 1, issuances: 1, assets: 5 },
    };
    const d = mapProjectDetail(raw);

    // documents: title from originalName; fileUrl built from ipfsHash (IPFS gateway),
    // undefined when not pinned.
    expect(d.documents[0]).toMatchObject({ id: "doc1", type: "DCP", title: "DCP.pdf", fileUrl: "https://ipfs.io/ipfs/QmDoc" });
    expect(d.documents[1].fileUrl).toBeUndefined();

    // properties pass-through
    expect(d.properties).toEqual([
      { municipality: "Belem", state: "PA", latitude: -1.45, longitude: -48.5 },
    ]);

    // description mapped (Overview fallback source)
    expect(d.descriptionPt).toBe("Descrição completa do projeto");

    // status mapped
    expect(d.status).toBe("ACTIVE");

    // overviewPt <- overview
    expect(d.overviewPt).toBe("Resumo do projeto");

    // methodologyVersion <- methodology.version
    expect(d.methodologyVersion).toBe("v2");

    // validationEvent.glOpinion <- opinion
    expect(d.validationEvent?.glOpinion).toBe("POSITIVE");
    expect(d.validationEvent?.glReportUrl).toBeUndefined();

    // verificationEvents: verificationNumber <- roundNumber, issuances: [] per event
    expect(d.verificationEvents).toHaveLength(1);
    expect(d.verificationEvents[0].verificationNumber).toBe(1);
    expect(d.verificationEvents[0].issuances).toEqual([]);
    expect(d.verificationEvents[0].verificationAssignment?.vvbOrganization).toMatchObject({
      name: "VVB One",
    });

    // top-level issuances: txHash <- mintTxHash
    expect(d.issuances).toEqual([
      { vintageYear: 2025, issuedQuantity: 500, txHash: "0xabc" },
    ]);

    // _count + members pass-through
    expect(d._count).toEqual({ properties: 1, issuances: 1, assets: 5 });
    expect(d.members).toHaveLength(1);

    // backlog fields
    expect(d.evidence).toEqual([]);
    expect(d.impact).toBeUndefined();

    // no certificates in input -> empty array (graceful degradation)
    expect(d.certificates).toEqual([]);
  });

  it("maps certificates[] (id <- _id, fields preserved) and defaults to [] when absent", () => {
    const raw = {
      _id: "p8",
      code: "GL-PRJ-0008",
      name: "Detalhe com certificados",
      type: "VCU",
      status: "VERIFICATION_REGISTRY_UPDATE",
      country: "BR",
      location: "Cerrado, GO",
      createdAt: "2025-01-01",
      developer: { _id: "u1", organizationName: "Org Verde" },
      methodology: { _id: "m1", code: "MET001", name: "Reflorestamento", version: "v1" },
      certificates: [
        {
          _id: "c1",
          type: "VALIDATION_OPINION",
          certificateNumber: "GL-VAL-OP-0008",
          issuedAt: "2025-03-01",
          ipfsHash: "QmVal1",
          blockchainTxHash: "0xval1",
          sha256: "abc123",
        },
        {
          _id: "c2",
          type: "VERIFICATION_BLOCKCHAIN",
          certificateNumber: "GL-VER-BC-0008",
          issuedAt: "2025-06-01",
          ipfsHash: "QmVer1",
          blockchainTxHash: "0xver1",
        },
      ],
    };
    const d = mapProjectDetail(raw);

    expect(d.certificates).toHaveLength(2);
    expect(d.certificates[0]).toEqual({
      id: "c1",
      type: "VALIDATION_OPINION",
      certificateNumber: "GL-VAL-OP-0008",
      issuedAt: "2025-03-01",
      ipfsHash: "QmVal1",
      blockchainTxHash: "0xval1",
      sha256: "abc123",
    });
    // optional sha256 preserved as undefined when omitted
    expect(d.certificates[1]).toMatchObject({
      id: "c2",
      type: "VERIFICATION_BLOCKCHAIN",
      certificateNumber: "GL-VER-BC-0008",
      blockchainTxHash: "0xver1",
    });
    expect(d.certificates[1].sha256).toBeUndefined();
  });
});

describe("mapMethodology", () => {
  it("maps platform fields to site shape and leaves backlog undefined/empty", () => {
    const raw = {
      _id: "m1",
      code: "MET001",
      name: "Reflorestamento",
      status: "PUBLISHED",
      description: "Metodologia de reflorestamento",
      sectors: ["AFOLU", "Energia"],
      version: "1.2",
      createdAt: "2025-01-01",
      developer: { _id: "u1", name: "Fulano", organizationName: "Org Verde" },
    };
    const m = mapMethodology(raw);

    expect(m.id).toBe("m1");
    expect(m.code).toBe("MET001");
    expect(m.name).toBe("Reflorestamento");
    expect(m.status).toBe("PUBLISHED");

    // descriptionPt <- description
    expect(m.descriptionPt).toBe("Metodologia de reflorestamento");

    // sector <- sectors[0]; full sectors[] preserved
    expect(m.sector).toBe("AFOLU");
    expect(m.sectors).toEqual(["AFOLU", "Energia"]);

    // developerOrganization <- developer{id,name}
    expect(m.developerOrganization).toEqual({ id: "u1", name: "Org Verde" });

    // currentVersion.versionNumber <- version
    expect(m.currentVersion?.versionNumber).toBe("1.2");

    // backlog fields never invented
    expect(m.solutionType).toBeUndefined();
    expect(m.activityType).toBeUndefined();
    expect(m.geeType).toBeUndefined();
    expect(m.sdgGoals).toBeUndefined();
    expect(m.nameEn).toBeUndefined();
  });

  it("leaves sector undefined and currentVersion undefined when platform omits them", () => {
    const m = mapMethodology({ _id: "m2", developer: { _id: "u", name: "Solo" } });
    expect(m.sector).toBeUndefined();
    expect(m.sectors).toEqual([]);
    expect(m.currentVersion).toBeUndefined();
  });
});

describe("mapMethodologyDetail", () => {
  it("extends mapMethodology and leaves backlog collections empty", () => {
    const raw = {
      _id: "m1",
      code: "MET001",
      name: "Reflorestamento",
      status: "PUBLISHED",
      description: "Metodologia de reflorestamento",
      sectors: ["AFOLU"],
      version: "2.0",
      createdAt: "2025-01-01",
      developer: { _id: "u1", name: "Fulano", organizationName: "Org Verde" },
    };
    const m = mapMethodologyDetail(raw);

    // inherited field maps
    expect(m.descriptionPt).toBe("Metodologia de reflorestamento");
    expect(m.sector).toBe("AFOLU");
    expect(m.developerOrganization).toMatchObject({ id: "u1", name: "Org Verde" });
    expect(m.currentVersion?.versionNumber).toBe("2.0");

    // backlog collections (spec §4.3 / §9) — never invented
    expect(m.versions).toEqual([]);
    expect(m.consultations).toEqual([]);
    expect(m.solutionType).toBeUndefined();
    expect(m.updatedAt).toBeUndefined();
  });
});

describe("mapVvb", () => {
  it("maps name from organizationName and leaves backlog fields undefined/empty", () => {
    const v = mapVvb({ _id: "v1", organizationName: "Verifier S.A.", status: "ACTIVE" });
    expect(v.id).toBe("v1");
    expect(v.name).toBe("Verifier S.A.");
    expect(v.accreditationStatus).toBe("ACTIVE");
    expect(v.publicWebsite).toBeUndefined();
    expect(v.accreditationDate).toBeUndefined();
    expect(v.accreditedScales).toEqual([]);
    expect(v.accreditedSectors).toEqual([]);
    expect(v.accreditedActivityTypes).toEqual([]);
    expect(v._count).toBeUndefined();
  });
});

describe("mapStatistics", () => {
  it("maps registry stats to site statistics", () => {
    const s = mapStatistics({
      totalProjects: 7,
      activeProjects: 3,
      totalVcuIssued: 100,
      totalVcsuIssued: 50,
      totalRetired: 20,
      totalCancelled: 1,
      totalBufferPool: 5,
      methodologyCount: 4,
      activeVvbCount: 2,
    });
    expect(s.totalProjects).toBe(7);
    expect(s.totalMethodologies).toBe(4);
    expect(s.totalCreditsIssued).toBe(150);
    expect(s.totalCreditsRetired).toBe(20);
    expect(s.totalOrganizations).toBeUndefined();
  });
});
