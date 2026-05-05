import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Anchor, Lightbulb, Briefcase, Package, ShieldCheck,
  Hand, Layers, Zap, HardHat, Footprints, Volume2,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

// 12 fine-grained product types — Autonity-style. Mirrors our bike-product-types
// taxonomy so clicking a tile lands users on the correct PLP. This makes the
// homepage feel like a real motorcycle shop you can browse, not just a banner
// reel.
//
// `image`: generic product photo for that type. Tile is split into a full-bleed
// white photo area (top) and a dark label band (bottom). `icon` is kept as a
// graceful fallback if the image fails to load.

const TYPES = [
  { label: 'Crash Guards',    icon: Shield,      image: '/products/fitments/zana-crash-guard-himalayan-450.jpg', href: '/products?category=bike-protection-fitments&type=crash-guard' },
  { label: 'Saddle Stays',    icon: Anchor,      image: '/products/fitments/zana-saddle-stay-himalayan-450.jpg', href: '/products?category=bike-protection-fitments&type=saddle-stay' },
  { label: 'Aux Lights',      icon: Lightbulb,   image: '/products/aux-lights/maddog-scout-x-20w.webp',          href: '/products?category=aux-lights' },
  { label: 'Tank Bags',       icon: Briefcase,   image: '/product-types/tank-bag.jpg',                            href: '/products?category=riding-gears-luggage&type=tank-bag' },
  { label: 'Top Racks',       icon: Package,     image: '/products/fitments/zana-top-rack-himalayan-450.jpg',    href: '/products?category=bike-protection-fitments&type=top-rack' },
  { label: 'Bash Plates',     icon: ShieldCheck, image: '/products/fitments/zana-bash-plate-himalayan-450.jpg',  href: '/products?category=bike-protection-fitments&type=engine-skid-plate' },
  { label: 'Hand Guards',     icon: Hand,        image: '/product-types/hand-guard.jpg',                          href: '/products?category=bike-protection-fitments&type=hand-guard' },
  { label: 'Frame Sliders',   icon: Layers,      image: '/product-types/frame-slider.jpg',                        href: '/products?category=bike-protection-fitments&type=frame-slider' },
  { label: 'Riding Jackets',  icon: HardHat,     image: '/products/cramster-flux-jacket.jpg',                     href: '/products?category=riding-gears-luggage' },
  { label: 'Helmets',         icon: HardHat,     image: '/products/studds-thunder-d2.jpg',                        href: '/products?category=helmets' },
  { label: 'Boots',           icon: Footprints,  image: '/products/cramster-flux-boots.jpg',                      href: '/products?category=riding-gears-luggage' },
  { label: 'Communication',   icon: Volume2,     image: '/product-types/communication.jpg',                       href: '/products?category=helmets' },
];

function TileBody({ image, label, Icon }: { image?: string; label: string; Icon: typeof Shield }) {
  const [errored, setErrored] = useState(false);
  return (
    <>
      <div className="flex-1 bg-white flex items-center justify-center p-3 overflow-hidden">
        {image && !errored ? (
          <img
            src={image}
            alt={label}
            loading="lazy"
            onError={() => setErrored(true)}
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Icon className="h-10 w-10 text-foreground/40" strokeWidth={1.25} />
        )}
      </div>
      <div className="bg-card/95 px-2 py-2.5 text-center border-t border-border/40">
        <span className="text-xs md:text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
          {label}
        </span>
      </div>
    </>
  );
}

export function ProductTypeGrid() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="py-10 md:py-14 bg-surface-elevated/40"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-baseline justify-between mb-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-gradient-chrome">
              Shop By Product Type
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Find exactly what your bike needs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {TYPES.map((t, i) => (
            <Link
              key={t.label}
              to={t.href}
              className={`group flex flex-col aspect-square rounded-xl overflow-hidden border border-border/40 bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: isVisible ? `${i * 40 + 100}ms` : '0ms' }}
            >
              <TileBody image={t.image} label={t.label} Icon={t.icon} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
