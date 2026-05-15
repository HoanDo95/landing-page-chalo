"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import {
  TESTIMONIALS_PER_VIEW,
  TESTIMONIAL_AUTOPLAY_MS,
  getSlidingCarouselItems,
  shouldRotateCarouselItems,
  getVisibleCarouselItems,
  wrapCarouselIndex
} from "@/lib/b2c/testimonial-carousel";
import type { LandingTestimonial } from "@/lib/landing-content";

type TestimonialCardProps = LandingTestimonial;
type TestimonialCarouselProps = {
  testimonials: LandingTestimonial[];
};
type TestimonialCardBehaviorProps = {
  onAlbumStateChange?: (isOpen: boolean) => void;
};
const TESTIMONIAL_TRANSITION_MS = 860;

function getTravelerInitials(authorName: string) {
  return authorName
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function TestimonialCard({
  quote,
  authorName,
  authorLocation,
  tripInfo,
  rating,
  avatarSrc,
  albumImages = [],
  onAlbumStateChange
}: TestimonialCardProps & TestimonialCardBehaviorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const headingId = useId();
  const descriptionId = useId();
  const roundedRating = Math.max(0, Math.min(5, rating));
  const initials = getTravelerInitials(authorName);
  const galleryImages = albumImages;
  const activeImage = galleryImages[activeImageIndex] ?? galleryImages[0] ?? null;
  const hasMultipleImages = galleryImages.length > 1;

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (!hasMultipleImages) {
        return;
      }

      if (event.key === "ArrowLeft") {
        setActiveImageIndex((currentIndex) => wrapCarouselIndex(currentIndex - 1, galleryImages.length));
      }

      if (event.key === "ArrowRight") {
        setActiveImageIndex((currentIndex) => wrapCarouselIndex(currentIndex + 1, galleryImages.length));
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [galleryImages.length, hasMultipleImages, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setActiveImageIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    onAlbumStateChange?.(isOpen);
  }, [isOpen, onAlbumStateChange]);

  function openAlbum() {
    setActiveImageIndex(0);
    setIsOpen(true);
  }

  function stepImage(direction: -1 | 1) {
    setActiveImageIndex((currentIndex) => wrapCarouselIndex(currentIndex + direction, galleryImages.length));
  }

  return (
    <>
      <article className="b2c-testimonial-card-shell">
        <button
          aria-controls={headingId}
          aria-haspopup="dialog"
          aria-label={`Open ${authorName} album`}
          className="b2c-testimonial-card"
          type="button"
          onClick={openAlbum}
        >
          <span className="b2c-testimonial-card__media">
            {avatarSrc ? (
              <Image
                alt={`Album cover image for ${authorName}`}
                className="b2c-testimonial-card__image"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 30vw"
                src={avatarSrc}
              />
            ) : (
              <span className="b2c-testimonial-card__placeholder" aria-hidden="true">
                <span className="b2c-testimonial-card__initials">{initials}</span>
                <span className="b2c-testimonial-card__placeholder-meta">
                  <strong>{authorName}</strong>
                  <span>{tripInfo}</span>
                </span>
              </span>
            )}
          </span>

          <span className="b2c-testimonial-card__caption">
            <span className="b2c-testimonial-card__name">{authorName}</span>
            <span className="b2c-testimonial-card__meta">{authorLocation}</span>
            <span className="b2c-testimonial-card__trip">{tripInfo}</span>
          </span>

          <span className="b2c-testimonial-card__overlay">
            <span
              className="b2c-testimonial-card__overlay-rating"
              aria-label={`Rated ${roundedRating.toFixed(1)} out of 5`}
            >
              <span aria-hidden="true">★★★★★</span>
              <strong>{roundedRating.toFixed(1)}</strong>
            </span>
            <span className="b2c-testimonial-card__overlay-quote">“{quote}”</span>
            <span className="b2c-testimonial-card__overlay-footer">
              <span>{authorName}</span>
              <span className="b2c-testimonial-card__overlay-cta">View album</span>
            </span>
          </span>
        </button>
      </article>

      {isOpen && portalTarget
        ? createPortal(
            <div
              aria-hidden={!isOpen}
              className="b2c-testimonial-album-backdrop"
              role="presentation"
              onClick={() => setIsOpen(false)}
            >
              <div
                aria-describedby={descriptionId}
                aria-labelledby={headingId}
                aria-modal="true"
                className="b2c-testimonial-album"
                role="dialog"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="b2c-testimonial-album__surface">
                  <button
                    aria-label="Close traveler album"
                    className="b2c-testimonial-album__close"
                    type="button"
                    onClick={() => setIsOpen(false)}
                  >
                    x
                  </button>

                  <div className="b2c-testimonial-album__grid">
                    <div className="b2c-testimonial-album__gallery">
                      {activeImage ? (
                        <div className="b2c-testimonial-album__hero-stage">
                          <figure className="b2c-testimonial-album__hero-image">
                            <Image
                              alt={activeImage.alt}
                              className="b2c-testimonial-album__image"
                              fill
                              sizes="(max-width: 960px) 100vw, 42vw"
                              src={activeImage.src}
                            />
                          </figure>

                          <div className="b2c-testimonial-album__counter">
                            {activeImageIndex + 1} / {galleryImages.length}
                          </div>

                          {hasMultipleImages ? (
                            <>
                              <button
                                aria-label="Previous album image"
                                className="b2c-testimonial-album__nav b2c-testimonial-album__nav--prev"
                                type="button"
                                onClick={() => stepImage(-1)}
                              >
                                <span aria-hidden="true">&lt;</span>
                              </button>
                              <button
                                aria-label="Next album image"
                                className="b2c-testimonial-album__nav b2c-testimonial-album__nav--next"
                                type="button"
                                onClick={() => stepImage(1)}
                              >
                                <span aria-hidden="true">&gt;</span>
                              </button>
                            </>
                          ) : null}
                        </div>
                      ) : null}
                    </div>

                    <div className="b2c-testimonial-album__content">
                      <div className="b2c-testimonial-album__header">
                        <span className="b2c-testimonial-album__eyebrow">Traveler album</span>
                        <div className="b2c-testimonial-album__meta">
                          <span>{authorLocation}</span>
                          <span>{tripInfo}</span>
                        </div>
                        <h3 className="b2c-testimonial-album__title" id={headingId}>
                          {authorName}
                        </h3>
                      </div>

                      <div className="b2c-testimonial-album__quote-card">
                        <div
                          className="b2c-testimonial-album__rating"
                          aria-label={`Rated ${roundedRating.toFixed(1)} out of 5`}
                        >
                          <span aria-hidden="true">★★★★★</span>
                          <strong>{roundedRating.toFixed(1)} Rating</strong>
                        </div>
                        <p className="b2c-testimonial-album__quote" id={descriptionId}>
                          “{quote}”
                        </p>
                      </div>

                      <dl className="b2c-testimonial-album__facts">
                        <div>
                          <dt>Trip route</dt>
                          <dd>{tripInfo}</dd>
                        </div>
                        <div>
                          <dt>Album photos</dt>
                          <dd>{albumImages.length}</dd>
                        </div>
                        <div>
                          <dt>Review score</dt>
                          <dd>{roundedRating.toFixed(1)}/5</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            portalTarget
          )
        : null}
    </>
  );
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [windowStart, setWindowStart] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const visibleTestimonials = getVisibleCarouselItems(testimonials, windowStart, TESTIMONIALS_PER_VIEW);
  const trackTestimonials = getSlidingCarouselItems(testimonials, windowStart, TESTIMONIALS_PER_VIEW);
  const hasRotation = shouldRotateCarouselItems(testimonials.length, TESTIMONIALS_PER_VIEW);

  function advanceWindow() {
    if (!hasRotation || isTransitioning) {
      return;
    }

    setIsTransitioning(true);
  }

  useEffect(() => {
    if (!hasRotation || isPaused || isAlbumOpen || isTransitioning) {
      return;
    }

    const intervalId = window.setInterval(() => {
      advanceWindow();
    }, TESTIMONIAL_AUTOPLAY_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [hasRotation, isAlbumOpen, isPaused, isTransitioning, testimonials.length, windowStart]);

  useEffect(() => {
    if (!isTransitioning) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setWindowStart((currentIndex) => wrapCarouselIndex(currentIndex + 1, testimonials.length));
      setIsTransitioning(false);
    }, TESTIMONIAL_TRANSITION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isTransitioning, testimonials.length]);

  return (
    <div
      className="b2c-testimonial-carousel"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
      onFocusCapture={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="b2c-testimonial-gallery-viewport" aria-label="Traveler stories and tour feedback">
        <div
          className={`b2c-testimonial-gallery-track${isTransitioning ? " b2c-testimonial-gallery-track--transitioning" : ""}`}
        >
          {trackTestimonials.map(({ item: testimonial, absoluteIndex }, trackIndex) => (
            <div className="b2c-testimonial-slide" key={`${testimonial.authorName}-${testimonial.tripInfo}-${absoluteIndex}-${trackIndex}`}>
              <TestimonialCard
                onAlbumStateChange={setIsAlbumOpen}
                {...testimonial}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="b2c-testimonial-spotlight__footer">
        <div className="b2c-testimonial-spotlight__markers" aria-hidden="true">
          {testimonials.map((testimonial, index) => (
            <span
              className={`b2c-testimonial-spotlight__marker${visibleTestimonials.some((item) => item.absoluteIndex === index) ? " b2c-testimonial-spotlight__marker--active" : ""}`}
              key={`${testimonial.authorName}-${testimonial.tripInfo}-marker`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
