import { anthropicVendor } from "./anthropic.js";
import { geminiVendor } from "./gemini.js";
import { openaiVendor } from "./openai.js";
import type { MakerId } from "../makers/table.js";
import type { VendorAdapter } from "./types.js";

export const VENDORS = [
  anthropicVendor,
  openaiVendor,
  geminiVendor,
] as const satisfies readonly VendorAdapter[];

export type VendorId = (typeof VENDORS)[number]["id"];

// A fallback wire that names no adapter is a typo; fail the build, not the run.
void (VENDORS satisfies readonly { fallbackWires: readonly VendorId[] }[]);
void (VENDORS satisfies readonly { defaultMaker: MakerId }[]);

export function vendorFor<V extends string>(
  vendors: readonly VendorAdapter<V>[],
  id: string,
): VendorAdapter<V> | undefined {
  return vendors.find((v) => v.id === id);
}
