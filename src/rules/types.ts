import type { ResolvedChecks, RunCtx } from "../engine/context.js";
import type { EvidenceBag, EvidenceKey } from "../engine/evidence.js";
import type { SurveyOutcome } from "../engine/survey-runner.js";
import type { FingerprintSample } from "../engine/answer-fingerprint-runner.js";
import type { ResponseMetadata } from "./response-metadata.js";
import type { SignatureResult } from "./thinking-signature.js";
import type { ThinkingFloorResult } from "./thinking-floor.js";
import type { ThroughputSample } from "./throughput.js";
import type { TokenTruthResult } from "./token-truth.js";
import type { TokenizerFingerprintResult } from "./tokenizer-fingerprint.js";

/**
 * How a finding weighs on the verdict. `fail` and `suspect` both make the
 * endpoint suspicious (kept apart so a consumer policy can demote one),
 * `inconclusive` leaves it unverified, `note` never touches the verdict.
 */
export type Severity = "fail" | "suspect" | "inconclusive" | "note";

/**
 * Which findings outrank which: `evidence` rules read hard facts the probes
 * cannot see and beat everything; `probe` rules read the behavioural probes and
 * decide `versionUnverifiable`; `note` rules only report.
 */
export type RuleLayer = "evidence" | "probe" | "note";

/** What a rule returns; the engine stamps the rule id and layer on. */
export type RuleVerdict = {
  severity: Severity;
  reason: string;
  data?: unknown;
};

export type Finding<Id extends string = string> = RuleVerdict & {
  rule: Id;
  layer: RuleLayer;
};

/** Per-rule artefacts copied onto the result, present only when the rule ran. */
export type Reports = {
  signature?: SignatureResult;
  tokenTruth?: TokenTruthResult;
  thinkingFloor?: ThinkingFloorResult;
  tokenizerFingerprint?: TokenizerFingerprintResult;
  responseMetadata?: ResponseMetadata;
  throughput?: ThroughputSample | null;
  survey?: SurveyOutcome[];
  answerFingerprint?: FingerprintSample;
};

export type CheckKey = keyof ResolvedChecks;

/** A rule sees the run and only the evidence it declared in `needs`. */
export type RuleCtx<N extends EvidenceKey = EvidenceKey> = RunCtx & {
  evidence<K extends N>(key: K): Promise<EvidenceBag[K]>;
};

export type Rule<
  Id extends string = string,
  N extends EvidenceKey = EvidenceKey,
  L extends RuleLayer = RuleLayer,
> = {
  id: Id;
  layer: L;
  needs: readonly N[];
  /** Opt-in switch in `checks` that enables this rule under `verify`. */
  check?: CheckKey;
  /** Whether the rule has anything to say on this wire and model. */
  applies(ctx: RunCtx): boolean;
  judge(ctx: RuleCtx<N>): Promise<RuleVerdict | null>;
  report?(ctx: RuleCtx<N>): Promise<Partial<Reports>>;
};

export const defineRule = <
  const Id extends string,
  const N extends EvidenceKey,
  const L extends RuleLayer,
>(
  rule: Rule<Id, N, L>,
): Rule<Id, N, L> => rule;
