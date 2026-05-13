import assert from "node:assert/strict";
import test from "node:test";

import { isGateTimestampValid } from "../components/b2c/use-gated-content.ts";

test("isGateTimestampValid accepts timestamps inside expiry window", () => {
  assert.equal(
    isGateTimestampValid({
      timestamp: String(Date.UTC(2026, 4, 1)),
      nowMs: Date.UTC(2026, 4, 15),
      expiryDays: 30
    }),
    true
  );
});

test("isGateTimestampValid rejects timestamps after expiry window", () => {
  assert.equal(
    isGateTimestampValid({
      timestamp: String(Date.UTC(2026, 4, 1)),
      nowMs: Date.UTC(2026, 5, 2),
      expiryDays: 30
    }),
    false
  );
});

test("isGateTimestampValid rejects invalid timestamps", () => {
  assert.equal(isGateTimestampValid({ timestamp: "not-a-date", nowMs: Date.now(), expiryDays: 30 }), false);
  assert.equal(isGateTimestampValid({ timestamp: "", nowMs: Date.now(), expiryDays: 30 }), false);
});
