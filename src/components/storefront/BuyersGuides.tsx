import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

// Helpful-content strip — content marketing that builds expertise/trust
// while passively driving SEO. Each card links to a feedback page (proxy
// for "ask the shop") until a real blog/CMS is wired up.

const GUIDES = [
  {
    eyebrow: 'Buyer\'s Guide',
    title: 'How to pick a crash guard for your Himalayan',
    body: 'Steel vs aluminium, slider vs no-slider, bash plate compatibility — what actually matters for off-road riding.',
    readTime: '5 min',
    href: '/feedback?subject=Crash+guard+advice',
    img: '/banners/category-bike-protection.jpg',
  },
  {
    eyebrow: 'Explained',
    title: 'Aux lights — beam vs flood vs combo, demystified',
    body: 'Lumens lie. Beam pattern matters more. Here\'s how to choose between Maddog Scout-X, HJG Pro and Future Eyes Hawk.',
    readTime: '6 min',
    href: '/feedback?subject=Aux+light+advice',
    img: '/banners/category-aux-lights.jpg',
  },
  {
    eyebrow: 'Sizing',
    title: 'Riding gear sizing chart for Indian riders',
    body: 'Why a "Large" varies wildly between Rynox, Cramster, Viaterra and Raida — and how to pick the right size first try.',
    readTime: '4 min',
    href: '/feedback?subject=Gear+sizing+advice',
    img: '/banners/category-riding-gear.jpg',
  },
];

export function BuyersGuides() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="py-12 md:py-16 bg-background"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-baseline justify-between mb-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Helpful Reads</span>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-gradient-chrome">
              Pick The Right Gear, First Try
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-2 max-w-xl">
              Honest guides written by riders who use the gear daily.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {GUIDES.map((g, i) => (
            <Link
              key={g.title}
              to={g.href}
              className={`group bg-card rounded-2xl overflow-hidden border border-border/40 hover:border-primary/40 transition-all duration-500 hover:-translate-y-0.5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: isVisible ? `${i * 100 + 100}ms` : '0ms' }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={g.img}
                  alt={g.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider mb-2.5">
                  <span className="text-primary font-bold">{g.eyebrow}</span>
                  <span className="text-muted-foreground/70 flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" /> {g.readTime}
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-foreground mb-2.5 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {g.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                  {g.body}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary/80 group-hover:text-primary transition-colors">
                  Read more <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
