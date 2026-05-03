import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useProducts } from '@/hooks/use-products';
import { ProductCard } from './ProductCard';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  title: string;
  subtitle?: string;
  categorySlug?: string;
  brandSlug?: string;
  search?: string;
  moreLink?: string;
  limit?: number;
  background?: 'default' | 'elevated';
}

// Reusable horizontal product strip — drop-in for any homepage shelf.
// Pulls products by category/brand/search from the live DB. If the query
// returns < 3 products the strip auto-hides so empty rails don't clutter.
export function CategoryProductCarousel({
  title,
  subtitle,
  categorySlug,
  brandSlug,
  search,
  moreLink,
  limit = 12,
  background = 'default',
}: Props) {
  const { ref, isVisible } = useScrollAnimation();
  const { data: products = [], isLoading } = useProducts({
    categorySlug,
    brandSlug,
    search,
  });

  const slice = products.slice(0, limit);
  if (!isLoading && slice.length < 3) return null;

  const fallbackMore = moreLink ?? (
    categorySlug ? `/products?category=${categorySlug}` :
    brandSlug ? `/products?brand=${brandSlug}` :
    search ? `/products?search=${encodeURIComponent(search)}` :
    '/products'
  );

  return (
    <section
      className={`py-10 md:py-12 ${background === 'elevated' ? 'bg-surface-elevated/40' : ''}`}
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-baseline justify-between mb-5 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div>
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <Link
            to={fallbackMore}
            className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
          >
            VIEW ALL <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {slice.map(p => (
              <SwiperSlide key={p.id}>
                <ProductCard product={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
