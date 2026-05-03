import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { getBike } from '@/data/bikes';

// Top adventure-/popular-bike feature banners. Each tile is a gradient block
// with the bike image floating on the right and a strong CTA. Sits directly
// below ShopByBike — gives users with a known bike a one-click path to its
// curated accessories page.

const FEATURED = [
  { slug: 'himalayan-450', tagline: 'Conquer every terrain' },
  { slug: 'ktm-390-adventure', tagline: 'Adventure ready out of the box' },
  { slug: 'hunter-350', tagline: 'Built for the city, dressed to ride' },
];

const GRADIENTS = [
  'from-emerald-600/80 via-emerald-500/40 to-transparent',
  'from-orange-600/80 via-orange-500/40 to-transparent',
  'from-rose-600/80 via-rose-500/40 to-transparent',
];

export function BikeAccessoryBanners() {
  const { ref, isVisible } = useScrollAnimation();
  const tiles = FEATURED.map(f => ({ ...f, bike: getBike(f.slug) })).filter(t => t.bike);

  return (
    <section
      className="py-10 md:py-14 bg-background"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-baseline justify-between mb-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-gradient-chrome">
              Adventure Build Hubs
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Curated fitments + gear lists for India's most-loved bikes
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs text-primary font-semibold hover:underline hidden sm:inline-flex items-center gap-1"
          >
            ALL BIKES <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiles.map((t, i) => (
            <Link
              key={t.slug}
              to={`/bikes/${t.slug}`}
              className={`group relative aspect-[16/10] rounded-2xl overflow-hidden border border-border/40 hover:border-primary/40 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: isVisible ? `${i * 100 + 100}ms` : '0ms' }}
            >
              {/* Gradient base */}
              <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[i]} bg-card`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Bike image — right side, large */}
              {t.bike?.image && (
                <img
                  src={t.bike.image}
                  alt={t.bike.name}
                  className="absolute right-0 bottom-0 h-[80%] object-contain transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-1"
                  loading="lazy"
                />
              )}

              {/* Copy — bottom-left */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 z-10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1">
                  {t.bike?.brand}
                </p>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white uppercase tracking-wider mb-1 leading-tight">
                  {t.bike?.name}
                </h3>
                <p className="text-xs text-white/85 mb-3 max-w-[60%]">
                  {t.tagline}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-primary/90 px-3 py-1.5 rounded-full group-hover:bg-primary transition-colors">
                  Shop Accessories <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
