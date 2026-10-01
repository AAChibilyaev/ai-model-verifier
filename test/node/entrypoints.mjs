import { test } from 'node:test';
import assert from 'node:assert/strict';

test('every published entry point loads in native Node ESM', async () => {
  for (const path of [
    'ai-model-verifier', 'ai-model-verifier/vendors', 'ai-model-verifier/rules',
    'ai-model-verifier/models', 'ai-model-verifier/makers', 'ai-model-verifier/transport',
    'ai-model-verifier/highlight',
  ]) {
    const exports = await import(path);
    assert.ok(Object.keys(exports).length > 0, path);
  }
  const { verify, runRules, createVerifier } = await import('ai-model-verifier');
  assert.equal(typeof verify, 'function');
  assert.equal(typeof runRules, 'function');
  assert.equal(typeof createVerifier, 'function');
});

test('the built transport recognizes native timeout errors', async () => {
  const { directTransport } = await import('ai-model-verifier/transport');
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => { calls++; throw new DOMException('expired', 'TimeoutError'); };
  try {
    const result = await directTransport({ mode: 'direct', url: 'https://example.com', headers: {}, reqBody: {}, timeoutMs: 10 });
    assert.equal(result.error, 'timeout');
    assert.equal(result.corsBlocked, false);
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
