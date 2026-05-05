import { Instagram, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

// Bento-style mosaic with varied tile sizes, captions, and treatments —
// feels like a community wall, not a catalogue. Each tile can carry a
// caption + sub + handle + tag, or just a caption — variety is intentional.

interface Tile {
  img: string;
  span: string;          // grid span class (mixed sizes for organic layout)
  caption: string;       // primary line — sometimes a place, sometimes a product, sometimes a quote
  sub?: string;          // secondary line — optional
  tag?: string;          // category pill — optional (not every tile has one)
  handle?: string;       // IG handle — optional (not every tile has one)
  location?: string;     // ride location — used in place of handle on some tiles
  href: string;          // where this tile takes the user — rider IG, product page, or bike page
}

const SB_IG = 'https://www.instagram.com/thesparklingbear';

const tiles: Tile[] = [
  // Big anchor: Ladakh-style adventure feature → rider's IG
  {
    img: '/banners/gallery-ls2-rider.jpg',
    span: 'col-span-2 row-span-2',
    caption: 'Khardung La, 5,359 m',
    sub: 'LS2 MX700 Subverter + Rynox Stealth Evo',
    handle: '@dakhargyan',
    tag: 'Adventure',
    href: 'https://www.instagram.com/dakhargyan',
  },
  // Tall portrait — aux lights night shot → aux lights PLP
  {
    img: '/banners/category-aux-lights.jpg',
    span: 'col-span-1 row-span-2',
    caption: 'Night runs, sorted.',
    sub: 'Maddog Scout-X 20W · 4800 lm/pair',
    tag: 'Aux Lights',
    href: '/products?category=aux-lights',
  },
  // Square — riding gear casual → rider IG
  {
    img: '/banners/gallery-00-00-30.jpg',
    span: 'col-span-1 row-span-1',
    caption: 'Saturday breakfast run',
    handle: '@bangalore_riders',
    href: 'https://www.instagram.com/bangalore_riders',
  },
  // Square — jacket close-up → riding-gear PLP
  {
    img: '/banners/category-riding-gear.jpg',
    span: 'col-span-1 row-span-1',
    caption: 'Cramster Eclipse',
    sub: 'CE-2 armour, rain liner',
    tag: 'Jacket',
    href: '/products?category=riding-gears-luggage',
  },
  // Wide — fitments on the Himalayan → bike page
  {
    img: '/banners/hero-protection.jpg',
    span: 'col-span-2 row-span-1',
    caption: 'BLR → Coorg',
    sub: 'Zana radiator guard + crash guard, Himalayan 450',
    tag: 'Fitments',
    location: 'Coorg, Karnataka',
    href: '/bikes/himalayan-450',
  },
  // Square — helmet → helmets PLP
  {
    img: '/banners/category-helmets.jpg',
    span: 'col-span-1 row-span-1',
    caption: 'Axor Apex Dual Visor',
    tag: 'Helmet',
    href: '/products?category=helmets',
  },
  // Square — luggage / touring → riding-gear PLP (luggage lives in this category)
  {
    img: '/banners/gallery-00-00-07.jpg',
    span: 'col-span-1 row-span-1',
    caption: 'Loaded for the long way home',
    sub: 'Viaterra Claw 50L',
    tag: 'Luggage',
    href: '/products?category=riding-gears-luggage',
  },
];

// Internal hrefs use react-router; external (Instagram) open in a new tab.
function isExternal(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

export function RidersGallery() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="py-14 md:py-20"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-10 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="w-12 h-1 bg-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider text-gradient-chrome">
            Riders In The Wild
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-xl mx-auto">
            Real setups across helmets, gear, lights, fitments and luggage. Tag <span className="text-primary font-semibold">@thesparklingbear</span> on Instagram to feature here.
          </p>
        </div>

        <div className="grid grid-flow-dense grid-cols-2 md:grid-cols-4 auto-rows-[140px] md:auto-rows-[180px] gap-3">
          {tiles.map((t, i) => {
            const className = `group relative overflow-hidden rounded-xl border border-border/30 hover:border-primary/40 transition-all duration-500 ${t.span} ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-6'}`;
            const style = { transitionDelay: isVisible ? `${i * 70 + 100}ms` : '0ms' };
            const inner = (
              <>
              <img
                src={t.img}
                alt={t.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
              />

              {/* Asymmetric gradient — heavier on bottom-left for legible captions */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-transparent" />

              {/* Optional category tag — small, top-left, frosted */}
              {t.tag && (
                <span className="absolute top-2.5 left-2.5 text-[10px] uppercase tracking-[0.15em] font-bold px-2 py-0.5 rounded-sm bg-black/45 text-white/90 backdrop-blur-sm border border-white/10">
                  {t.tag}
                </span>
              )}

              {/* Caption block — bottom-left */}
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <div className="text-sm md:text-base font-bold text-white leading-tight line-clamp-2">
                  {t.caption}
                </div>
                {t.sub && (
                  <div className="text-[11px] md:text-xs text-white/70 mt-1 line-clamp-1">
                    {t.sub}
                  </div>
                )}
                {(t.handle || t.location) && (
                  <div className="flex items-center gap-1.5 text-[11px] text-white/65 mt-1.5">
                    {t.handle ? (
                      <>
                        <Instagram className="h-3 w-3" />
                        <span className="font-medium">{t.handle}</span>
                      </>
                    ) : t.location ? (
                      <>
                        <MapPin className="h-3 w-3" />
                        <span>{t.location}</span>
                      </>
                    ) : null}
                  </div>
                )}
              </div>
              </>
            );
            return isExternal(t.href) ? (
              <a key={i} href={t.href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
                {inner}
              </a>
            ) : (
              <Link key={i} to={t.href} className={className} style={style}>
                {inner}
              </Link>
            );
          })}
        </div>

        {/* Category quick-jump strip below gallery */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-muted-foreground mr-1">Browse by category:</span>
          {[
            { label: 'Helmets', href: '/products?category=helmets' },
            { label: 'Riding Gear', href: '/products?category=riding-gears-luggage' },
            { label: 'Aux Lights', href: '/products?category=aux-lights' },
            { label: 'Bike Protection', href: '/products?category=bike-protection-fitments' },
            { label: 'Luggage', href: '/products?category=riding-gears-luggage' },
          ].map(c => (
            <a
              key={c.label}
              href={c.href}
              className="px-3 py-1.5 rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
