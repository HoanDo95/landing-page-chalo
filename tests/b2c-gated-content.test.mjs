import assert from "node:assert/strict";
import test from "node:test";

import { getGatedContentRenderState, isGateTimestampValid } from "../components/b2c/use-gated-content.ts";

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

test("getGatedContentRenderState keeps content locked while storage is being checked", () => {
  assert.deepEqual(
    getGatedContentRenderState({
      isChecking: true,
      isUnlocked: false
    }),
    {
      shouldLockContent: true,
      shouldShowOverlay: true,
      shouldShowModal: false
    }
  );
});

test("getGatedContentRenderState only unlocks content after a valid stored unlock", () => {
  assert.deepEqual(
    getGatedContentRenderState({
      isChecking: false,
      isUnlocked: true
    }),
    {
      shouldLockContent: false,
      shouldShowOverlay: false,
      shouldShowModal: false
    }
  );
});

test("getGatedContentRenderState shows the modal after storage check finds no unlock", () => {
  assert.deepEqual(
    getGatedContentRenderState({
      isChecking: false,
      isUnlocked: false
    }),
    {
      shouldLockContent: true,
      shouldShowOverlay: true,
      shouldShowModal: true
    }
  );
});
