"use client";

import { useEffect, useId } from "react";
import Image from "next/image";

import { trackEvent } from "@/lib/analytics";
import type { TourPackage } from "@/lib/landing-content";
import { formatUsdPrice } from "@/lib/b2c/tour-pricing";

type TourDetailModalProps = {
  isOpen: boolean;
  onChooseTour: (tourId: string) => void;
  onClose: () => void;
  tour: TourPackage | null;
};

export function TourDetailModal({
  isOpen,
  onChooseTour,
  onClose,
  tour
}: TourDetailModalProps) {
  const headingId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen || !tour) {
      return;
    }

    trackEvent("b2c_tour_modal_open", {
      tourId: tour.id,
      tourName: tour.title
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, tour]);

  if (!isOpen || !tour) {
    return null;
  }

  const activeTour = tour;
  const saving = activeTour.priceOriginal - activeTour.priceSale;
  const galleryImages = activeTour.galleryImages?.length
    ? [
        activeTour.heroImage,
        ...activeTour.galleryImages.filter((image) => image.src !== activeTour.heroImage.src)
      ]
    : [activeTour.heroImage];
  const [primaryImage, ...secondaryImages] = galleryImages;

  function handleChooseTour() {
    trackEvent("b2c_tour_choose_from_modal", {
      tourId: activeTour.id,
      tourName: activeTour.title
    });
    onChooseTour(activeTour.id);
  }

  return (
    <div
      aria-hidden={!isOpen}
      className="b2c-tour-modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        aria-describedby={descriptionId}
        aria-labelledby={headingId}
        aria-modal="true"
        className="b2c-tour-modal"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="b2c-tour-modal__surface">
          <button
            aria-label="Close tour details"
            className="b2c-tour-modal__close"
            type="button"
            onClick={onClose}
          >
            x
          </button>

          <div className="b2c-tour-modal__grid">
            <div className="b2c-tour-modal__gallery">
              <figure className="b2c-tour-modal__hero-image">
                <Image
                  alt={primaryImage.alt}
                  className="b2c-tour-modal__image"
                  fill
                  sizes="(max-width: 960px) 100vw, 46vw"
                  src={primaryImage.src}
                />
              </figure>

              {secondaryImages.length ? (
                <div className="b2c-tour-modal__thumb-grid">
                  {secondaryImages.map((image) => (
                    <figure className="b2c-tour-modal__thumb" key={image.src}>
                      <Image
                        alt={image.alt}
                        className="b2c-tour-modal__image"
                        fill
                        sizes="(max-width: 960px) 50vw, 20vw"
                        src={image.src}
                      />
                    </figure>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="b2c-tour-modal__content">
              <div className="b2c-tour-modal__header">
                <div className="b2c-tour-modal__meta">
                  <span>{activeTour.destination}</span>
                  <span>{activeTour.duration}</span>
                </div>
                <h3 className="b2c-tour-modal__title" id={headingId}>
                  {activeTour.title}
                </h3>
                <p className="b2c-tour-modal__overview" id={descriptionId}>
                  {activeTour.overview}
                </p>
              </div>

              <div className="b2c-tour-modal__price-card">
                <div>
                  <span className="b2c-tour-modal__price-label">Current price</span>
                  <strong>{formatUsdPrice(activeTour.priceSale)}</strong>
                </div>
                <div className="b2c-tour-modal__price-meta">
                  <span>Was {formatUsdPrice(activeTour.priceOriginal)}</span>
                  <span>Save {formatUsdPrice(saving)} per traveler</span>
                </div>
              </div>

              <dl className="b2c-tour-modal__facts">
                <div>
                  <dt>Accommodation</dt>
                  <dd>{activeTour.accommodation}</dd>
                </div>
                <div>
                  <dt>Trip style</dt>
                  <dd>{activeTour.highlights.slice(0, 3).join(" · ")}</dd>
                </div>
                <div>
                  <dt>Inclusions</dt>
                  <dd>{activeTour.inclusions.length} included items</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="b2c-tour-modal__body">
            <section className="b2c-tour-modal__section b2c-tour-modal__section--itinerary">
              <div className="b2c-tour-modal__section-head">
                <div>
                  <h4>Day-by-day itinerary</h4>
                  <p>Clear daily pacing before the quote is confirmed.</p>
                </div>
                <span>{activeTour.itineraryDays.length} days mapped</span>
              </div>

              <div className="b2c-tour-modal__itinerary">
                {activeTour.itineraryDays.map((day) => (
                  <article className="b2c-tour-modal__itinerary-day" key={day.dayLabel}>
                    <span className="b2c-tour-modal__day-label">{day.dayLabel}</span>
                    <div>
                      <strong>{day.title}</strong>
                      <p>{day.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="b2c-tour-modal__section b2c-tour-modal__section--inclusions">
              <div className="b2c-tour-modal__section-head">
                <div>
                  <h4>Included in this package</h4>
                  <p>What is already covered in the listed price.</p>
                </div>
              </div>

              <div className="b2c-tour-modal__pill-list">
                {activeTour.inclusions.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </section>

            <div className="b2c-tour-modal__actions">
              <button className="button primary" type="button" onClick={handleChooseTour}>
                Choose this tour
              </button>
              <button className="button secondary" type="button" onClick={onClose}>
                Keep browsing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
