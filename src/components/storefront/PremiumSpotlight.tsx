import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

// Flagship-product spotlight — Autonity's "AGV Pista GP" pattern. Each tile
// is a tall premium card that elevates a single hero SKU per category. These
// drive average-order-value by surfacing the high-end options.

const SPOTLIGHTS = [
  {
    label: 'LS2 STORM II',
    sub: 'Touring helmet with ECE 22.06 + Bluetooth ready',
    href: '/products?brand=ls2&search=Storm',
    img: '/banners/category-helmets.jpg',
    gradient: 'from-blue-700 to-slate-900',
  },
  {
    label: 'RYNOX TORNADO PRO 4',
    sub: 'CE-2 sport-touring jacket w/ waterproof membrane',
    href: '/products?brand=rynox&search=Tornado',
    img: '/banners/category-riding-gear.jpg',
    gradient: 'from-emerald-700 to-slate-900',
  },
  {
    label: 'MADDOG LYCAN 40W',
    sub: 'Flagship aux light, 10,800 lm/pair',
    href: '/products?brand=maddog&search=Lycan',
    img: '/banners/hero-aux-lights.jpg',
    gradient: 'from-amber-600 to-slate-900',
  },
  {
    label: 'ZANA HIMALAYAN 450 KIT',
    sub: 'Crash guard + saddle stay + radiator guard',
    href: '/bikes/himalayan-450',
    img: '/banners/hero-protection.jpg',
    gradient: 'from-rose-700 to-slate-900',
  },
];

export function PremiumSpotlight() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="py-10 md:py-14 bg-background"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-center gap-2 mb-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-gradient-chrome">
            Flagship Picks
          </h2>
          <span className="text-xs text-muted-foreground hidden md:inline ml-2">
            The best of the best, hand-picked
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {SPOTLIGHTS.map((s, i) => (
            <Link
              key={s.label}
              to={s.href}
              className={`group relative aspect-[3/4] rounded-2xl overflow-hidden border border-border/40 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: isVisible ? `${i * 80 + 100}ms` : '0ms' }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient}`} />
              <img
                src={s.img}
                alt={s.label}
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold px-2 py-0.5 rounded-sm bg-primary/90 text-primary-foreground">
                  Flagship
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wider mb-1.5 leading-tight">
                  {s.label}
                </h3>
                <p className="text-[11px] md:text-xs text-white/80 mb-2.5 line-clamp-2">
                  {s.sub}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white group-hover:text-primary transition-colors">
                  Explore <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
