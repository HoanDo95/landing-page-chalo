"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

import { B2CLeadFormModal } from "@/components/b2c/b2c-lead-form-modal";
import { getGatedContentRenderState } from "@/components/b2c/use-gated-content";
import type { LandingLeadFormContent } from "@/lib/landing-content";

interface GatedContentOverlayProps {
  children: ReactNode;
  formContent: LandingLeadFormContent;
  storageKey?: string;
  expiryDays?: number;
}

export function GatedContentOverlay({
  children,
  formContent
}: GatedContentOverlayProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { shouldLockContent, shouldShowOverlay, shouldShowModal } = getGatedContentRenderState({
    isModalOpen
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

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  function handleAdviceTriggerClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const trigger = target.closest('a[href="#free-advice"], [data-b2c-advice-trigger="true"]');

    if (!trigger) {
      return;
    }

    event.preventDefault();
    setIsModalOpen(true);
  }

  function handleSuccess() {
    setIsModalOpen(false);
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 3000);
  }

  return (
    <>
      <div
        className={shouldLockContent ? "b2c-gated-content b2c-gated-content--locked" : "b2c-gated-content"}
        onClickCapture={handleAdviceTriggerClick}
      >
        {children}
      </div>

      {shouldShowOverlay ? (
        <div
          aria-label="Get free Vietnam tour advice"
          aria-modal="true"
          className="b2c-gate-overlay"
          role="dialog"
        >
          <button
            aria-label="Continue without advice form"
            className="b2c-gate-overlay__backdrop"
            type="button"
            onClick={() => setIsModalOpen(false)}
          />
          {shouldShowModal ? (
            <div className="b2c-gate-overlay__modal">
              <B2CLeadFormModal
                content={formContent}
                onCancel={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
              />
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
