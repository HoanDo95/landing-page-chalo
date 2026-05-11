"use client";

import { TourCard } from "@/components/b2c/TourCard";
import { TourDetailModal } from "@/components/b2c/tour-detail-modal";
import { useB2CTourSelection } from "@/components/b2c/tour-selection-context";
import type { TourPackage } from "@/lib/landing-content";

type TourPackagesSectionProps = {
  tourPackages: TourPackage[];
};

export function TourPackagesSection({ tourPackages }: TourPackagesSectionProps) {
  const { activeTour, chooseTour, closeTourDetails, openTourDetails } = useB2CTourSelection();

  return (
    <>
      <div className="tour-packages-grid">
        {tourPackages.map((tour) => (
          <TourCard key={tour.id} tour={tour} onOpenDetails={openTourDetails} />
        ))}
      </div>

      <TourDetailModal
        isOpen={Boolean(activeTour)}
        tour={activeTour}
        onChooseTour={chooseTour}
        onClose={closeTourDetails}
      />
    </>
  );
}
