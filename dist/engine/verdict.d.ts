import type { Finding } from "../rules/types.js";
import type { VerifyVerdict } from "../types.js";
export type FoldedVerdict = {
    verdict: VerifyVerdict;
    reasons: string[];
    /** Genuine by the probes alone: the version they name is never checked. */
    versionUnverifiable: boolean;
};
/**
 * Findings arrive in rule-table order, so the first one that is not a note
 * decides. An evidence-layer finding therefore outranks the probe ladder, and
 * within the ladder the earlier rule wins, exactly the old hand-ordered chain.
 */
export declare function foldVerdict(findings: readonly Finding[]): FoldedVerdict;
//# sourceMappingURL=verdict.d.ts.map