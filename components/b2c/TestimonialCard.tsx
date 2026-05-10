import Image from "next/image";
import type { LandingTestimonial } from "@/lib/landing-content";

type TestimonialCardProps = LandingTestimonial;

export function TestimonialCard({
  quote,
  authorName,
  authorLocation,
  tripInfo,
  rating,
  avatarSrc
}: TestimonialCardProps) {
  const roundedRating = Math.max(0, Math.min(5, rating));

  return (
    <article className="testimonial-card">
      {avatarSrc ? (
        <div className="testimonial-card__avatar">
          <Image
            alt={`Portrait of ${authorName}`}
            className="testimonial-card__avatar-image"
            fill
            loading="lazy"
            sizes="80px"
            src={avatarSrc}
          />
        </div>
      ) : (
        <div className="testimonial-card__avatar testimonial-card__avatar--initials" aria-hidden="true">
          {authorName
            .split(" ")
            .slice(-2)
            .map((part) => part[0])
            .join("")}
        </div>
      )}
      <blockquote className="testimonial-card__quote">“{quote}”</blockquote>
      <div className="testimonial-card__rating" aria-label={`Rated ${roundedRating.toFixed(1)} out of 5`}>
        <span aria-hidden="true">★★★★★</span>
        <strong>{roundedRating.toFixed(1)}</strong>
      </div>
      <div className="testimonial-card__author">
        <strong>{authorName}</strong>
        <span>{authorLocation}</span>
        <em>{tripInfo}</em>
      </div>
    </article>
  );
}
