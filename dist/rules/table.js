import { cjkLeakRule, codingToolRule, foreignRule, muxRule, quorumRule, scamRule, servedModelMismatchRule, substitutedRule, tierSelfReportRule, } from "./probe-ladder.js";
import { envelopeRule } from "./response-metadata.js";
import { signatureRule } from "./thinking-signature.js";
import { surveyRule } from "./survey.js";
import { answerFingerprintRule } from "./answer-fingerprint.js";
import { thinkLeakRule } from "./think-leak.js";
import { wrapperLeakRule } from "./wrapper-leak.js";
import { thinkingFloorRule } from "./thinking-floor.js";
import { throughputRule } from "./throughput.js";
import { tokenTruthRule } from "./token-truth.js";
import { tokenizerFingerprintRule } from "./tokenizer-fingerprint.js";
/**
 * Precedence is this order: the first finding that is not a note decides the
 * verdict. Evidence rules sit above the probe ladder because they read facts a
 * coached reply cannot fake; note rules only report.
 */
export const RULES = [
    thinkingFloorRule,
    tokenizerFingerprintRule,
    codingToolRule,
    scamRule,
    cjkLeakRule,
    muxRule,
    foreignRule,
    servedModelMismatchRule,
    substitutedRule,
    quorumRule,
    tierSelfReportRule,
    signatureRule,
    tokenTruthRule,
    envelopeRule,
    throughputRule,
    thinkLeakRule,
    wrapperLeakRule,
    surveyRule,
    answerFingerprintRule,
];
export const DETECTION_RULES = RULES.filter((r) => r.layer !== "note").map((r) => r.id);
export const DETECTION_EXCEPTIONS = [
    "version",
    "transient",
    "cloud-host",
    "reshaping",
    "threshold",
];
/** The rule a probe's signal feeds, for linking a probe row to a rule. */
export const RULE_FOR_SIGNAL = {
    "coding-tool": "coding-tool",
    scam: "scam",
    "cjk-leak": "cjk-leak",
    foreign: "foreign",
    "cloud-host": null,
    blank: "quorum",
};
//# sourceMappingURL=table.js.map