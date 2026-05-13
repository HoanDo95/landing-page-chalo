"use client";

import { useCallback, useEffect, useState } from "react";

export const B2C_GATE_STORAGE_KEY = "b2c_lead_gate_unlocked";
export const B2C_GATE_EXPIRY_DAYS = 30;

interface GateTimestampOptions {
  timestamp: string | null;
  nowMs: number;
  expiryDays: number;
}

export function isGateTimestampValid({ timestamp, nowMs, expiryDays }: GateTimestampOptions) {
  if (!timestamp) {
    return false;
  }

  const storedMs = Number.parseInt(timestamp, 10);

  if (!Number.isFinite(storedMs) || storedMs <= 0) {
    return false;
  }

  return nowMs - storedMs < expiryDays * 24 * 60 * 60 * 1000;
}

export function useGatedContent({
  storageKey = B2C_GATE_STORAGE_KEY,
  expiryDays = B2C_GATE_EXPIRY_DAYS
} = {}) {
  const [isChecking, setIsChecking] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const storedTimestamp = window.localStorage.getItem(storageKey);
    setIsUnlocked(
      isGateTimestampValid({
        timestamp: storedTimestamp,
        nowMs: Date.now(),
        expiryDays
      })
    );
    setIsChecking(false);
  }, [expiryDays, storageKey]);

  const unlock = useCallback(() => {
    window.localStorage.setItem(storageKey, String(Date.now()));
    setIsUnlocked(true);
  }, [storageKey]);

  return {
    isChecking,
    isUnlocked,
    unlock
  };
}
