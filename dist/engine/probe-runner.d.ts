import { type ProbeSignal } from "../probes/table.js";
import type { ProbeOutcome } from "../types.js";
import { type RunCtx } from "./context.js";
/** A probe's outcome plus what the rules need but the result never carries. */
export type ProbeEval = ProbeOutcome & {
    text: string | undefined;
    raw: unknown;
    corsBlocked: boolean;
};
export declare function probeReason(pass: boolean, signal: ProbeSignal, muxFailure: boolean, transient: boolean): string;
export declare function collectProbes(ctx: RunCtx): Promise<ProbeEval[]>;
/** The probe that generated the most: the reply worth reading metadata from. */
export declare function richestProbe(probes: readonly ProbeEval[]): ProbeEval | null;
//# sourceMappingURL=probe-runner.d.ts.map