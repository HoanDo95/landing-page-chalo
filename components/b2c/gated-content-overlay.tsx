"use client";

import { useEffect, useState, type ReactNode } from "react";

import { B2CLeadFormModal } from "@/components/b2c/b2c-lead-form-modal";
import { getGatedContentRenderState, useGatedContent } from "@/components/b2c/use-gated-content";
import type { LandingLeadFormContent } from "@/lib/landing-content";

interface GatedContentOverlayProps {
  children: ReactNode;
  formContent: LandingLeadFormContent;
  storageKey?: string;
  expiryDays?: number;
}

export function GatedContentOverlay({
  children,
  formContent,
  storageKey,
  expiryDays
}: GatedContentOverlayProps) {
  const { isChecking, isUnlocked, unlock } = useGatedContent({ storageKey, expiryDays });
  const [showToast, setShowToast] = useState(false);
  const { shouldLockContent, shouldShowOverlay, shouldShowModal } = getGatedContentRenderState({
    isChecking,
    isUnlocked
  });

  useEffect(() => {
    if (!shouldLockContent) {
      document.body.classList.remove("b2c-gate-locked");
      return;
    }

    document.body.classList.add("b2c-gate-locked");

    return () => {
      document.body.classList.remove("b2c-gate-locked");
    };
  }, [shouldLockContent]);

  function handleSuccess() {
    unlock();
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 3000);
  }

  return (
    <>
      <div className={shouldLockContent ? "b2c-gated-content b2c-gated-content--locked" : "b2c-gated-content"}>
        {children}
      </div>

      {shouldShowOverlay ? (
        <div
          aria-label="Unlock Vietnam tour packages"
          aria-modal="true"
          className="b2c-gate-overlay"
          role="dialog"
        >
          <div className="b2c-gate-overlay__backdrop" aria-hidden="true" />
          {shouldShowModal ? (
            <div className="b2c-gate-overlay__modal">
              <B2CLeadFormModal content={formContent} onSuccess={handleSuccess} />
            </div>
          ) : null}
        </div>
      ) : null}

      {showToast ? (
        <div className="b2c-gate-toast" role="status">
          {formContent.successMessage}
        </div>
      ) : null}
    </>
  );
}
