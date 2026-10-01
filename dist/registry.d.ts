import { type MakerId } from "./makers/table.js";
import type { Maker } from "./makers/types.js";
import type { FactsEntry } from "./models/facts.js";
import { type RuleId } from "./rules/table.js";
import type { Rule } from "./rules/types.js";
import type { RuleRun, VerifyOptions, VerifyResult } from "./types.js";
import { type VendorId } from "./vendors/table.js";
import type { VendorAdapter } from "./vendors/types.js";
import { type Registry } from "./verify.js";
/**
 * A verifier with the built-in tables plus the caller's own vendors, makers,
 * rules and model facts. Consumer rules run after the built-ins (so they never
 * outrank them); `omit` drops built-ins a consumer replaces or disagrees with;
 * consumer model facts and makers are consulted before the tables.
 */
export declare function createVerifier<V extends string = never, R extends string = never, M extends string = never>(cfg: {
    vendors?: readonly VendorAdapter<V>[];
    makers?: readonly Maker<M>[];
    rules?: readonly Rule<R>[];
    omit?: readonly RuleId[];
    modelFacts?: readonly FactsEntry<MakerId | M>[];
}): {
    registry: Registry<"anthropic" | "gemini" | "openai" | V, "answer-fingerprint" | "cjk-leak" | "coding-tool" | "envelope" | "foreign" | "mux" | "quorum" | "scam" | "served-model-mismatch" | "signature" | "substituted" | "survey" | "think-leak" | "thinking-floor" | "throughput" | "tier-self-report" | "token-truth" | "tokenizer-fingerprint" | "wrapper-leak" | R, "ai21" | "aion" | "alibaba" | "amazon" | "anthropic" | "arcee" | "baidu" | "bytedance" | "cohere" | "deepseek" | "google" | "ibm" | "inception" | "inclusionai" | "internlm" | "jetbrains" | "kwaipilot" | "liquid" | "meituan" | "meta" | "microsoft" | "minimax" | "mistral" | "moondream" | "moonshot" | "nexagi" | "nous" | "nvidia" | "openai" | "openbmb" | "perplexity" | "poolside" | "rednote" | "sarvam" | "sensetime" | "stepfun" | "swissai" | "tencent" | "typhoon" | "venice" | "writer" | "xai" | "xiaomi" | "zhipu" | M>;
    verify: (opts: VerifyOptions<VendorId | V>) => Promise<VerifyResult<VendorId | V, RuleId | R, MakerId | M>>;
    runRules: (opts: VerifyOptions<VendorId | V> & {
        only: readonly (RuleId | R)[];
    }) => Promise<RuleRun<RuleId | R>>;
};
//# sourceMappingURL=registry.d.ts.map