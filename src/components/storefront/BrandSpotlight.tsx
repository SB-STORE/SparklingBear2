import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

import zanaImg from '@/assets/zana.webp';
import rynoxImg from '@/assets/rynox.webp';
import ls2Img from '@/assets/ls2.png';
import maddogImg from '@/assets/maddog.jpg';
import mototorqueImg from '@/assets/mototorque.webp';
import cramsterImg from '@/assets/cramster.webp';

// Brand stories — replaces a flat brand-logo slider with editorial mini-cards.
// Each tile = brand logo + tagline + product-count CTA. Real estate to build
// brand association, not just brand recognition.

const BRANDS = [
  {
    slug: 'zana',
    name: 'Zana',
    logo: zanaImg,
    tagline: 'Built for Indian roads',
    body: 'Crash guards, saddle stays, top racks engineered for our potholes, our touring distances.',
  },
  {
    slug: 'rynox',
    name: 'Rynox',
    logo: rynoxImg,
    tagline: 'Premium gear, made in Mumbai',
    body: 'CE-certified jackets, gloves, panniers — the gear you actually want when it rains.',
  },
  {
    slug: 'ls2',
    name: 'LS2',
    logo: ls2Img,
    tagline: 'Global helmets, locally trusted',
    body: 'ECE 22.06 + ISI certified. From the Storm II to the Subverter — built to take a hit.',
  },
  {
    slug: 'maddog',
    name: 'MADDOG',
    logo: maddogImg,
    tagline: 'Light up the night',
    body: 'From the Scout 10W to the Lycan 40W — beam, flood and dual-mode aux lights.',
  },
  {
    slug: 'moto-torque',
    name: 'Moto Torque',
    logo: mototorqueImg,
    tagline: 'Riding gear without the markup',
    body: 'Jackets, gloves, frame sliders. Honest pricing, daily-rider tested.',
  },
  {
    slug: 'cramster',
    name: 'Cramster',
    logo: cramsterImg,
    tagline: 'Touring jackets, all-weather',
    body: 'CE-2 armour, rain liners, thermal mid-layers. Eclipse, Flux, Storm Evo.',
  },
];

export function BrandSpotlight() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="py-10 md:py-14 bg-surface-elevated/40"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-12 h-1 bg-primary mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-gradient-chrome">
            Why These Brands
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            We don't carry every brand — only the ones we trust on our own bikes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BRANDS.map((b, i) => (
            <Link
              key={b.slug}
              to={`/products?brand=${b.slug}`}
              className={`group bg-card rounded-xl p-5 border border-border/40 hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: isVisible ? `${i * 70 + 100}ms` : '0ms' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-white/5 border border-border/40 flex items-center justify-center p-2">
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {b.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-primary/80 mt-0.5 mb-2">
                    {b.tagline}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {b.body}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary/80 group-hover:text-primary mt-3 transition-colors">
                    Shop {b.name} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
