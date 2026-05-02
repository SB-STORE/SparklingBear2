import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Package, Users, Award, Truck } from 'lucide-react';

const stats = [
  { icon: Package, value: '500+', label: 'Products in Stock', sub: 'Helmets, gear, parts' },
  { icon: Award, value: '16+', label: 'Premium Brands', sub: 'LS2, Rynox, Zana & more' },
  { icon: Users, value: '5,000+', label: 'Happy Riders', sub: 'Across India' },
  { icon: Truck, value: '7,500+', label: 'Orders Shipped', sub: 'Bangalore HQ' },
];

export function StatsStrip() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="py-14 md:py-20 bg-gradient-to-b from-background to-surface-elevated/40"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-10 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="w-12 h-1 bg-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider text-gradient-chrome">
            Trusted Across India
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-3">
            Bangalore's go-to motorcycle accessories store, online and in-store
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`bg-card border border-border/40 rounded-xl p-5 md:p-6 text-center hover:border-primary/40 hover:-translate-y-1 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: isVisible ? `${i * 100 + 150}ms` : '0ms' }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">{s.value}</div>
                <div className="text-sm md:text-base font-semibold text-foreground mt-1">{s.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
