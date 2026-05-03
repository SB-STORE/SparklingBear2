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

const TYPES = [
  { label: 'Crash Guards',    icon: Shield,      href: '/products?category=bike-protection-fitments&type=crash-guard' },
  { label: 'Saddle Stays',    icon: Anchor,      href: '/products?category=bike-protection-fitments&type=saddle-stay' },
  { label: 'Aux Lights',      icon: Lightbulb,   href: '/products?category=aux-lights' },
  { label: 'Tank Bags',       icon: Briefcase,   href: '/products?category=riding-gears-luggage&type=tank-bag' },
  { label: 'Top Racks',       icon: Package,     href: '/products?category=bike-protection-fitments&type=top-rack' },
  { label: 'Bash Plates',     icon: ShieldCheck, href: '/products?category=bike-protection-fitments&type=engine-skid-plate' },
  { label: 'Hand Guards',     icon: Hand,        href: '/products?category=bike-protection-fitments&type=hand-guard' },
  { label: 'Frame Sliders',   icon: Layers,      href: '/products?category=bike-protection-fitments&type=frame-slider' },
  { label: 'Riding Jackets',  icon: HardHat,     href: '/products?category=riding-gears-luggage' },
  { label: 'Helmets',         icon: HardHat,     href: '/products?category=helmets' },
  { label: 'Boots',           icon: Footprints,  href: '/products?category=riding-gears-luggage' },
  { label: 'Communication',   icon: Volume2,     href: '/products?category=helmets' },
];

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

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {TYPES.map((t, i) => (
            <Link
              key={t.label}
              to={t.href}
              className={`group flex flex-col items-center justify-center gap-2 p-4 md:p-5 rounded-xl border border-border/40 bg-card/40 hover:border-primary/50 hover:bg-card transition-all duration-300 hover:-translate-y-0.5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: isVisible ? `${i * 40 + 100}ms` : '0ms' }}
            >
              <span className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <t.icon className="h-5 w-5 text-primary" />
              </span>
              <span className="text-xs md:text-sm font-semibold text-foreground group-hover:text-primary transition-colors text-center leading-tight">
                {t.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
