"use client";

import Image from "next/image";

import { trackEvent } from "@/lib/analytics";
import type { TourPackage } from "@/lib/landing-content";

interface TourCardProps {
  tour: TourPackage;
}

const badgeLabels: Record<NonNullable<TourPackage["badge"]>, string> = {
  "best-seller": "Best seller",
  limited: "Limited offer",
  sale: "On sale"
};

function formatPrice(price: number) {
  return `VND ${new Intl.NumberFormat("en-US").format(price)}`;
}

export function TourCard({ tour }: TourCardProps) {
  const saving = tour.priceOriginal - tour.priceSale;
  const inclusionSummary = tour.inclusions.slice(0, 3).join(", ");
  const tourImages = tour.galleryImages?.length ? tour.galleryImages : [tour.heroImage];
  const visibleImages = tourImages.slice(0, 4);

  function handleSelect() {
    trackEvent("b2c_tour_select", {
      tourId: tour.id,
      tourName: tour.title
    });
  }

  return (
    <article className="tour-card">
      <a
        className={`tour-card__image-container tour-card__image-container--count-${visibleImages.length}`}
        href="#contact"
        onClick={handleSelect}
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
      </a>

      <div className="tour-card__content">
        <div className="tour-card__meta">
          <span>{tour.destination}</span>
          <span>{tour.duration}</span>
        </div>
        <div>
          <h3 className="tour-card__title">{tour.title}</h3>
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
            <span className="tour-card__price-original">{formatPrice(tour.priceOriginal)}</span>
          </div>
          <strong className="tour-card__price-sale">{formatPrice(tour.priceSale)}</strong>
          <span className="tour-card__savings">Save {formatPrice(saving)} per traveler</span>
        </div>

        <p className="tour-card__includes">
          Includes <strong>{inclusionSummary}</strong>
        </p>

        <a
          aria-label={`Book ${tour.destination} tour`}
          className="tour-card__cta btn-jade"
          href="#contact"
          onClick={handleSelect}
        >
          Book now
        </a>
      </div>
    </article>
  );
}
