import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function PromoBanner() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      className="relative h-[300px] md:h-[400px] overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.05] transition-transform duration-[2s]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1920&q=80&auto=format&fit=crop')`,
          transform: isVisible ? 'scale(1)' : 'scale(1.1)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      <div className="relative h-full container mx-auto px-4 flex flex-col items-start justify-center">
        <span
          className={`text-primary font-semibold text-sm uppercase tracking-widest mb-2 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          Premium Collection
        </span>
        <h2
          className={`text-3xl md:text-5xl font-bold text-white mb-3 max-w-lg leading-tight transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          Gear Up This Riding Season
        </h2>
        <p
          className={`text-white/70 text-base md:text-lg mb-6 max-w-md transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          Premium riding gear from India's most trusted brands. Built for the road, tested by riders.
        </p>
        <Button
          asChild
          size="lg"
          className={`bg-primary hover:bg-primary/90 text-primary-foreground font-semibold uppercase tracking-wider transition-all duration-700 delay-[450ms] hover:scale-105 hover:shadow-[0_0_30px_rgba(204,34,51,0.4)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link to="/products">
            Explore Collection
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
