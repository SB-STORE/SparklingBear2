import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  // Single image: simple display
  if (images.length <= 1) {
    return (
      <div className="aspect-square bg-card rounded-lg border border-border overflow-hidden flex items-center justify-center">
        {images[0] ? (
          <img
            src={images[0]}
            alt="Product"
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <span className="text-muted-foreground">No Image Available</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-3">
      {/* Desktop: vertical thumbnails on the left */}
      <div className="hidden md:flex flex-col gap-2 w-16 flex-shrink-0">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveIndex(i);
              thumbsSwiper?.slideTo(i);
            }}
            className={cn(
              'w-16 h-16 rounded border overflow-hidden flex-shrink-0 transition-colors',
              activeIndex === i
                ? 'border-primary'
                : 'border-border hover:border-muted-foreground'
            )}
          >
            <img
              src={img}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-full object-contain p-1"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1">
        {/* Desktop: static main image */}
        <div className="hidden md:block aspect-square bg-card rounded-lg border border-border overflow-hidden">
          <img
            src={images[activeIndex]}
            alt="Product"
            className="w-full h-full object-contain p-4"
          />
        </div>

        {/* Mobile: swipeable gallery */}
        <div className="md:hidden">
          <Swiper
            modules={[Navigation, Thumbs]}
            navigation
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="aspect-square rounded-lg border border-border bg-card product-mobile-gallery"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="w-full h-full flex items-center justify-center p-4">
                  <img
                    src={img}
                    alt={`Product ${i + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile thumbnails - horizontal */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView="auto"
            watchSlidesProgress
            className="mt-3"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i} style={{ width: 56 }}>
                <button
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    'w-14 h-14 rounded border overflow-hidden transition-colors',
                    activeIndex === i
                      ? 'border-primary'
                      : 'border-border'
                  )}
                >
                  <img
                    src={img}
                    alt={`Thumb ${i + 1}`}
                    className="w-full h-full object-contain p-0.5"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .product-mobile-gallery .swiper-button-next,
        .product-mobile-gallery .swiper-button-prev {
          color: white;
          background: hsl(0 0% 0% / 0.4);
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
        .product-mobile-gallery .swiper-button-next::after,
        .product-mobile-gallery .swiper-button-prev::after {
          font-size: 12px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
