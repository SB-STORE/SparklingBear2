import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Sparkles, Shield, Wrench, Brush } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

// Sparkling Bear's biggest moat against pure online retailers — the physical
// store, the install bay, the detailing services. Surfacing this on the
// homepage tells visitors "we're more than a Shopify shop, walk in and we'll
// fit it for you." This is the local-only USP no online seller can match.

const PHONE = '+919108247377';
const PHONE_DISPLAY = '+91 91082 47377';

const SERVICES = [
  {
    icon: Wrench,
    title: 'Free Fitment Install',
    body: 'Bought a crash guard, saddle stay, aux light or rack? Walk in to RR Nagar and we\'ll fit it for free.',
    badge: 'Free with purchase',
    color: 'from-emerald-500/15 to-emerald-500/5',
  },
  {
    icon: Shield,
    title: 'Paint Protection Film (PPF)',
    body: 'Self-healing TPU film that takes the chips, scratches and tar so your tank doesn\'t. UV-resistant.',
    badge: 'From ₹15,999',
    color: 'from-blue-500/15 to-blue-500/5',
  },
  {
    icon: Sparkles,
    title: 'Ceramic Coating',
    body: '9H hardness, hydrophobic, 5+ year protection. Bike stays cleaner, easier to wash, looks new for longer.',
    badge: 'From ₹4,999',
    color: 'from-purple-500/15 to-purple-500/5',
  },
  {
    icon: Brush,
    title: 'Custom Detailing',
    body: 'Engine bay deep-clean, headlight restoration, leather conditioning, odor removal. Pick your package.',
    badge: 'From ₹2,499',
    color: 'from-rose-500/15 to-rose-500/5',
  },
];

export function ServiceSpotlight() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="py-12 md:py-16 bg-background"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-10 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-12 h-1 bg-primary mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-gradient-chrome mb-3">
            More Than An Online Store
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            We're a Bangalore workshop too. Walk in, we'll install what you bought, ceramic-coat your bike, or just chat about your build.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`group relative rounded-2xl p-5 border border-border/40 bg-gradient-to-br ${s.color} hover:border-primary/40 transition-all duration-500 hover:-translate-y-0.5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: isVisible ? `${i * 80 + 100}ms` : '0ms' }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="w-11 h-11 rounded-full bg-card border border-border/40 flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-primary" />
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                  {s.badge}
                </span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-foreground mb-2 leading-tight">
                {s.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            <Phone className="h-4 w-4" />
            Call to book — {PHONE_DISPLAY}
          </a>
          <Link
            to="/feedback"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            Or send a message <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
