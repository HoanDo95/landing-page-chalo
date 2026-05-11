"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

import type { TourPackage } from "@/lib/landing-content";

type TourSelectionContextValue = {
  activeTour: TourPackage | null;
  selectedTourId: string | null;
  openTourDetails: (tourId: string) => void;
  closeTourDetails: () => void;
  chooseTour: (tourId: string) => void;
};

const TourSelectionContext = createContext<TourSelectionContextValue | null>(null);

type ProviderProps = {
  children: ReactNode;
  tourPackages: TourPackage[];
};

export function B2CTourSelectionProvider({ children, tourPackages }: ProviderProps) {
  const [activeTourId, setActiveTourId] = useState<string | null>(null);
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);

  const toursById = useMemo(
    () => new Map(tourPackages.map((tour) => [tour.id, tour])),
    [tourPackages]
  );
  const activeTour = activeTourId ? toursById.get(activeTourId) ?? null : null;

  useEffect(() => {
    if (!activeTour) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeTour]);

  const openTourDetails = useCallback((tourId: string) => {
    setActiveTourId(tourId);
  }, []);

  const closeTourDetails = useCallback(() => {
    setActiveTourId(null);
  }, []);

  const chooseTour = useCallback((tourId: string) => {
    setSelectedTourId(tourId);
    setActiveTourId(null);

    window.requestAnimationFrame(() => {
      const contactSection = document.getElementById("contact");
      contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "#contact");
    });
  }, []);

  const value = useMemo(
    () => ({
      activeTour,
      selectedTourId,
      openTourDetails,
      closeTourDetails,
      chooseTour
    }),
    [activeTour, chooseTour, closeTourDetails, openTourDetails, selectedTourId]
  );

  return <TourSelectionContext.Provider value={value}>{children}</TourSelectionContext.Provider>;
}

export function useB2CTourSelection() {
  const context = useContext(TourSelectionContext);

  if (!context) {
    throw new Error("useB2CTourSelection must be used within B2CTourSelectionProvider");
  }

  return context;
}
