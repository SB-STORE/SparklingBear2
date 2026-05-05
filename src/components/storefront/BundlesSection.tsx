import { ArrowRight, Package2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { formatPrice } from '@/lib/price';

// Pre-curated combo bundles — easy upsell that increases basket size.
// Each bundle is a "kit" of 3-5 active products around a use-case.
// Tap → WhatsApp pre-filled with the bundle name + items, mirroring the
// product-card inquiry flow. SB confirms availability + bundle discount
// in chat. Bundle items reference real active products only — broken
// product references (deactivated SKUs, generic strings) were replaced.

const INQUIRY_PHONE = '+919108247377';

interface BundleItem {
  name: string;
}

interface Bundle {
  slug: string;
  name: string;
  body: string;
  items: BundleItem[];
  totalPrice: number;
  bundlePrice: number;
  badge: string;
  image: string;
}

const BUNDLES: Bundle[] = [
  {
    slug: 'adventure-starter',
    name: 'Adventure Starter Kit',
    body: 'Everything a new ADV rider needs to hit the road safely. Pick your size, we confirm fitment.',
    items: [
      { name: 'LS2 MX701 Explorer Adventure Helmet' },
      { name: 'Rynox Air GT 4 Riding Jacket' },
      { name: 'Rynox Air GT Gloves' },
      { name: 'Maddog Scout Aux Lights 10W' },
    ],
    totalPrice: 32450,
    bundlePrice: 28999,
    badge: 'Save ₹3,451',
    // KTM 390 Adventure with rider, Indian hill country (Munnar-ish) — Unsplash
    image: '/banners/hero-adventure.jpg',
  },
  {
    slug: 'himalayan-touring',
    name: 'Himalayan 450 Touring Pack',
    body: 'Crash guard + saddle stay + radiator guard + aux lights — full long-distance setup.',
    items: [
      { name: 'Zana Crash Guard - Himalayan 450' },
      { name: 'Zana Saddle Stay V2 - Himalayan 450' },
      { name: 'Zana Radiator Guard - Himalayan 450' },
      { name: 'Maddog Scout-X Aux Lights 20W' },
    ],
    totalPrice: 16847,
    bundlePrice: 14999,
    badge: 'Save ₹1,848',
    // 2400×1800 POV from touring bike at high-altitude lake — Unsplash, Husain Aziz
    image: '/banners/hero-touring.jpg',
  },
  {
    slug: 'first-bike',
    name: 'First Bike Essentials',
    body: 'New rider? Start with the basics — helmet, gloves, mobile mount. Tested for daily city use.',
    items: [
      { name: 'Studds Ninja 3G Helmet (ISI)' },
      { name: 'Moto Torque Hostile Gloves' },
      { name: 'BOBO BM4 Mobile Mount' },
      { name: 'Maddog Scout Aux Lights 10W' },
    ],
    totalPrice: 8170,
    bundlePrice: 6999,
    badge: 'Save ₹1,170',
    // Roadster pulled over on Andhra Pradesh coastal road, sea view — Unsplash
    image: '/banners/hero-rider.jpg',
  },
];

function inquiryUrl(b: Bundle): string {
  const items = b.items.map(i => `• ${i.name}`).join('\n');
  const text = `Hi Sparkling Bear, I'd like to enquire about the ${b.name} bundle:\n\n${items}\n\nBundle price: ₹${b.bundlePrice.toLocaleString('en-IN')} (MRP ₹${b.totalPrice.toLocaleString('en-IN')})\n\nPlease confirm availability + sizes.`;
  return `https://wa.me/${INQUIRY_PHONE.replace('+', '')}?text=${encodeURIComponent(text)}`;
}

export function BundlesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="py-12 md:py-16 bg-surface-elevated/40"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-baseline justify-between mb-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Package2 className="h-4 w-4 text-primary" />
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Curated Combos</span>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-gradient-chrome">
              Build Bundles
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-2 max-w-xl">
              Hand-picked kits at bundle pricing. Pick a kit, we'll confirm sizes and prep everything.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BUNDLES.map((b, i) => {
            const savings = b.totalPrice - b.bundlePrice;
            const savePct = Math.round((savings / b.totalPrice) * 100);
            return (
              <a
                key={b.slug}
                href={inquiryUrl(b)}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-card rounded-2xl overflow-hidden border border-border/40 hover:border-primary/40 transition-all duration-500 hover:-translate-y-0.5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: isVisible ? `${i * 100 + 100}ms` : '0ms' }}
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-card">
                  <img
                    src={b.image}
                    alt={b.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-500 text-white uppercase tracking-wider">
                    {b.badge}
                  </span>
                  <h3 className="absolute bottom-3 left-4 text-base md:text-lg font-bold uppercase tracking-wider text-white leading-tight">
                    {b.name}
                  </h3>
                </div>

                {/* Body */}
                <div className="p-4">
                  <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2 leading-snug">
                    {b.body}
                  </p>

                  {/* Items list */}
                  <ul className="space-y-1 mb-4 text-xs">
                    {b.items.map((it, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-muted-foreground">
                        <span className="text-primary mt-0.5">+</span>
                        <span className="line-clamp-1">{it.name}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pricing */}
                  <div className="flex items-baseline justify-between pt-3 border-t border-border/40">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-foreground">
                          {formatPrice(b.bundlePrice * 100)}
                        </span>
                        <span className="text-xs text-muted-foreground line-through">
                          {formatPrice(b.totalPrice * 100)}
                        </span>
                      </div>
                      <div className="text-[11px] text-emerald-500 font-semibold">
                        {savePct}% off bundle pricing
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline">
                      Inquire on WhatsApp <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
