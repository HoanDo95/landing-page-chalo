export const TESTIMONIALS_PER_VIEW = 3;
export const TESTIMONIAL_AUTOPLAY_MS = 3200;
export const TESTIMONIAL_TRANSITION_MS = 520;

export function wrapCarouselIndex(index: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return (index + total) % total;
}

export function getAdjacentAlbumImageSources(imageSources: string[], activeIndex: number) {
  if (imageSources.length <= 1) {
    return [];
  }

  const activeSource = imageSources[wrapCarouselIndex(activeIndex, imageSources.length)];
  const nextSource = imageSources[wrapCarouselIndex(activeIndex + 1, imageSources.length)];
  const previousSource = imageSources[wrapCarouselIndex(activeIndex - 1, imageSources.length)];

  return Array.from(
    new Set([nextSource, previousSource].filter((source): source is string => Boolean(source) && source !== activeSource))
  );
}

export function getTestimonialSlideKey(
  testimonial: {
    authorName: string;
    tripInfo: string;
  },
  absoluteIndex: number
) {
  return `${testimonial.authorName}-${testimonial.tripInfo}-${absoluteIndex}`;
}

export function shouldRotateCarouselItems(total: number, visibleCount: number) {
  return total > visibleCount;
}

export function getVisibleCarouselItems<T>(items: T[], startIndex: number, count: number) {
  if (items.length <= count) {
    return items.map((item, index) => ({
      item,
      absoluteIndex: index
    }));
  }

  return Array.from({ length: count }, (_, offset) => {
    const absoluteIndex = wrapCarouselIndex(startIndex + offset, items.length);

    return {
      item: items[absoluteIndex],
      absoluteIndex
    };
  });
}

export function getSlidingCarouselItems<T>(items: T[], startIndex: number, visibleCount: number) {
  const trackCount = shouldRotateCarouselItems(items.length, visibleCount)
    ? visibleCount + 1
    : visibleCount;

  return getVisibleCarouselItems(items, startIndex, trackCount);
}
