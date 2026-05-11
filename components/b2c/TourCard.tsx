"use client";

import Image from "next/image";

import { trackEvent } from "@/lib/analytics";
import { formatUsdPrice } from "@/lib/b2c/tour-pricing";
import type { TourPackage } from "@/lib/landing-content";

interface TourCardProps {
  onOpenDetails: (tourId: string) => void;
  tour: TourPackage;
}

const badgeLabels: Record<NonNullable<TourPackage["badge"]>, string> = {
  "best-seller": "Best seller",
  limited: "Limited offer",
  sale: "On sale"
};

export function TourCard({ onOpenDetails, tour }: TourCardProps) {
  const saving = tour.priceOriginal - tour.priceSale;
  const inclusionSummary = tour.inclusions.slice(0, 3).join(", ");
  const tourImages = tour.galleryImages?.length ? tour.galleryImages : [tour.heroImage];
  const visibleImages = tourImages.slice(0, 4);

  function handleOpenDetails() {
    trackEvent("b2c_tour_select", {
      tourId: tour.id,
      tourName: tour.title
    });
    onOpenDetails(tour.id);
  }

  return (
    <article className="tour-card">
      <button
        className={`tour-card__image-container tour-card__image-container--count-${visibleImages.length}`}
        type="button"
        onClick={handleOpenDetails}
      >
        <div className="tour-card__image-grid">
          {visibleImages.map((image) => (
            <span className="tour-card__image-tile" key={image.src}>
              <Image
                alt={image.alt}
                className="tour-card__image"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw"
                src={image.src}
              />
            </span>
          ))}
        </div>
        {tour.badge ? (
          <span className={`tour-card__badge tour-card__badge--${tour.badge}`}>
            {badgeLabels[tour.badge]}
          </span>
        ) : null}
      </button>

      <div className="tour-card__content">
        <div className="tour-card__meta">
          <span>{tour.destination}</span>
          <span>{tour.duration}</span>
        </div>
        <div>
          <button className="tour-card__title-button" type="button" onClick={handleOpenDetails}>
            <h3 className="tour-card__title">{tour.title}</h3>
          </button>
          <p className="tour-card__description">{tour.description}</p>
        </div>

        <div className="tour-card__highlights" aria-label={`Highlights for ${tour.title}`}>
          {tour.highlights.map((highlight) => (
            <span key={highlight} className="tour-card__highlight">
              {highlight}
            </span>
          ))}
        </div>

        <div className="tour-card__price-section">
          <div>
            <span className="tour-card__price-label">From</span>
            <span className="tour-card__price-original">{formatUsdPrice(tour.priceOriginal)}</span>
          </div>
          <strong className="tour-card__price-sale">{formatUsdPrice(tour.priceSale)}</strong>
          <span className="tour-card__savings">Save {formatUsdPrice(saving)} per traveler</span>
        </div>

        <p className="tour-card__includes">
          Includes <strong>{inclusionSummary}</strong>
        </p>

        <button
          aria-label={`View itinerary for ${tour.destination} tour`}
          className="tour-card__cta btn-jade"
          type="button"
          onClick={handleOpenDetails}
        >
          View itinerary
        </button>
      </div>
    </article>
  );
}
