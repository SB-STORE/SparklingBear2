import { Link } from 'react-router-dom';
import { Wrench, Shield, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const services = [
  {
    icon: Wrench,
    title: 'Free Installation',
    body: 'We install everything we sell — crash guards, aux lights, saddle stays, frame sliders. Walk in, ride out.',
  },
  {
    icon: Shield,
    title: 'Fitment Guarantee',
    body: 'Bike-specific parts are matched to your make/model. If it doesn\'t fit, we make it fit — or full refund.',
  },
  {
    icon: MapPin,
    title: 'Visit Our Store',
    body: 'See helmets in person, try them on, get expert advice from real riders. RR Nagar, Bangalore.',
  },
];

export function ServiceShowcase() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/banners/hero-protection.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/70" />

      <div className="relative z-10 container mx-auto px-4">
        <div className={`max-w-2xl mb-10 md:mb-14 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="w-12 h-1 bg-primary mb-4" />
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
            More Than An <span className="text-primary">Online Store</span>
          </h2>
          <p className="text-sm md:text-base text-white/80 mt-4 max-w-lg">
            We're riders ourselves. Buy anywhere — install, fit, and tune-up only at Sparkling Bear.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`bg-card/90 backdrop-blur-sm border border-border/40 rounded-xl p-6 hover:border-primary/50 hover:-translate-y-1 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: isVisible ? `${i * 120 + 200}ms` : '0ms' }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 text-primary mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            );
          })}
        </div>

        <div className={`mt-10 md:mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold uppercase tracking-wider"
          >
            <Link to="/feedback">
              Get In Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
