import { afterEach, expect, test } from "bun:test";
import { browserTransport, directTransport } from "../src/transport";

const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });
const args = {
  mode: "direct" as const, url: "https://provider.example/v1/chat/completions",
  headers: { Authorization: "Bearer test" }, reqBody: {}, timeoutMs: 10,
};

test("native timeout is reported as timeout without a second reachability request", async () => {
  let calls = 0;
  globalThis.fetch = (async () => { calls++; throw new DOMException("expired", "TimeoutError"); }) as typeof fetch;
  const result = await directTransport(args);
  expect(result.error).toBe("timeout");
  expect(result.corsBlocked).toBe(false);
  expect(calls).toBe(1);
  const proxy = await browserTransport({ serverProxyUrl: "/proxy" })(args);
  expect(proxy.error).toBe("timeout");
});

test("a failed proxy HTTP response cannot masquerade as a successful upstream response", async () => {
  globalThis.fetch = (async () => Response.json({ data: { status: 200, data: { choices: [] } } }, { status: 502 })) as typeof fetch;
  const result = await browserTransport({ serverProxyUrl: "/proxy" })(args);
  expect(result.status).toBeNull();
  expect(result.error).toBe("proxy HTTP 502");
});
