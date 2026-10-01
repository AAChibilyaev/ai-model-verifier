import { MAKERS, type MakerId } from "./makers/table.js";
import type { Maker } from "./makers/types.js";
import type { FactsEntry } from "./models/facts.js";
import { RULES, type RuleId } from "./rules/table.js";
import type { Rule } from "./rules/types.js";
import type { RuleRun, VerifyOptions, VerifyResult } from "./types.js";
import { VENDORS, type VendorId } from "./vendors/table.js";
import type { VendorAdapter } from "./vendors/types.js";
import { runRulesWith, verifyWith, type Registry } from "./verify.js";

/**
 * A verifier with the built-in tables plus the caller's own vendors, makers,
 * rules and model facts. Consumer rules run after the built-ins (so they never
 * outrank them); `omit` drops built-ins a consumer replaces or disagrees with;
 * consumer model facts and makers are consulted before the tables.
 */
export function createVerifier<
  V extends string = never,
  R extends string = never,
  M extends string = never,
>(cfg: {
  vendors?: readonly VendorAdapter<V>[];
  makers?: readonly Maker<M>[];
  rules?: readonly Rule<R>[];
  omit?: readonly RuleId[];
  modelFacts?: readonly FactsEntry<MakerId | M>[];
}) {
  const omit = new Set<string>(cfg.omit ?? []);
  const registry: Registry<VendorId | V, RuleId | R, MakerId | M> = {
    vendors: [...VENDORS, ...(cfg.vendors ?? [])],
    makers: [...(cfg.makers ?? []), ...MAKERS],
    rules: [...RULES.filter((r) => !omit.has(r.id)), ...(cfg.rules ?? [])],
    facts: cfg.modelFacts ?? [],
  };
  return {
    registry,
    verify: (
      opts: VerifyOptions<VendorId | V>,
    ): Promise<VerifyResult<VendorId | V, RuleId | R, MakerId | M>> =>
      verifyWith(registry, opts),
    runRules: (
      opts: VerifyOptions<VendorId | V> & { only: readonly (RuleId | R)[] },
    ): Promise<RuleRun<RuleId | R>> => runRulesWith(registry, opts),
  };
}
