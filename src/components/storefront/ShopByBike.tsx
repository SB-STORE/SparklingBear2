import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const bikes = [
  { name: 'Royal Enfield', slug: 'royal-enfield', image: '/bikes/royal-enfield.jpg' },
  { name: 'KTM', slug: 'ktm', image: '/bikes/ktm.jpg' },
  { name: 'Yamaha', slug: 'yamaha', image: '/bikes/yamaha.jpg' },
  { name: 'Honda', slug: 'honda', image: '/bikes/honda.jpg' },
  { name: 'Bajaj', slug: 'bajaj', image: '/bikes/bajaj.jpg' },
  { name: 'TVS', slug: 'tvs', image: '/bikes/tvs.jpg' },
  { name: 'Hero', slug: 'hero', image: '/bikes/hero.jpg' },
  { name: 'Suzuki', slug: 'suzuki', image: '/bikes/suzuki.jpg' },
];

export function ShopByBike() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-14 md:py-20 bg-surface-elevated" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between mb-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider text-gradient-chrome">
            Shop By Bike
          </h2>
          <Link
            to="/products"
            className="text-sm text-primary font-semibold hover:underline flex items-center gap-1"
          >
            VIEW ALL
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {bikes.map((bike, i) => (
            <Link
              key={bike.slug}
              to={`/bikes/${bike.slug}`}
              className={`group relative bg-card rounded-xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: isVisible ? `${i * 80 + 150}ms` : '0ms' }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-white">
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-3 text-center border-t border-primary/10">
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {bike.name}
                </h3>
                <span className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors flex items-center justify-center gap-1 mt-1">
                  View Accessories <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
