// Root export: the engine, the tables and every type. Vendors, rules, models,
// transport and highlight have their own entry points for consumers that only
// want a piece.
export * from "./types.js";
export { verify, runRules, verifyWith, runRulesWith, callWire } from "./verify.js";
export type { Registry } from "./verify.js";
export { createVerifier } from "./registry.js";
export { defineVendor } from "./vendors/types.js";
export type {
  VendorAdapter,
  WireCtx,
  ChatRequest,
  ChatMessage,
  CountRequest,
  BuiltRequest,
  ProbeMeta,
  EnvelopeShape,
} from "./vendors/types.js";
export { VENDORS, vendorFor } from "./vendors/table.js";
export { MAKERS, makerFor } from "./makers/table.js";
export type { MakerId } from "./makers/table.js";
export { defineMaker } from "./makers/types.js";
export type { Maker, ResolvedMaker } from "./makers/types.js";
export { makerForModel, resolveMaker } from "./makers/resolve.js";
export { defineRule } from "./rules/types.js";
export type {
  Rule,
  RuleCtx,
  RuleLayer,
  RuleVerdict,
  Finding,
  Severity,
  Reports,
} from "./rules/types.js";
export {
  RULES,
  DETECTION_RULES,
  DETECTION_EXCEPTIONS,
  RULE_FOR_SIGNAL,
} from "./rules/table.js";
export type { VerdictRuleId, DetectionExceptionId } from "./rules/table.js";
export type { EvidenceBag, EvidenceKey } from "./engine/evidence.js";
export { defineModelFacts, resolveModelFacts } from "./models/facts.js";
export type { ModelFacts, FactsEntry } from "./models/facts.js";
export { PROBES, PROBE_SIGNALS } from "./probes/table.js";
export { SURVEY } from "./probes/survey.js";
export type { SurveyDef } from "./probes/survey.js";
export type { SurveyOutcome } from "./engine/survey-runner.js";
export {
  FINGERPRINT_CELLS,
  classifyAnswer,
  stripThink,
} from "./probes/answer-fingerprint.js";
export type {
  FingerprintCell,
  FingerprintLabel,
  AnswerClass,
} from "./probes/answer-fingerprint.js";
export type {
  FingerprintSample,
  FingerprintCellSample,
} from "./engine/answer-fingerprint-runner.js";
export {
  compareFingerprints,
  compareToProfiles,
  fingerprintClusters,
  jensenShannon,
  mergeFingerprints,
} from "./rules/answer-fingerprint.js";
export type {
  CompareOptions,
  CompareResult,
  CompareVerdict,
  ProfileVerdict,
} from "./rules/answer-fingerprint.js";
export type { TransportFn, TransportArgs, TransportResult } from "./transport.js";
export { directTransport, browserTransport } from "./transport.js";
