import { useState } from 'react';
import {
  Phone, MessageCircle,
  Shield, ShieldCheck, Anchor, Lightbulb, Briefcase, Package,
  Hand, Layers, Wrench, Volume2, Footprints, HardHat, Wind,
  Zap, Settings, Box, Map, Disc, Mountain,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/price';
import type { SupplementalFitment } from '@/hooks/use-bike-products';

// Map product-type slug → lucide icon for the placeholder fallback. Keeps
// the card visually designed even when the brand-CDN image is unavailable.
const TYPE_ICON: Record<string, typeof Shield> = {
  'crash-guard':          Shield,
  'frame-slider':         Layers,
  'engine-skid-plate':    ShieldCheck,
  'radiator-guard':       Wind,
  'headlight-grill':      Zap,
  'master-cylinder-guard': Disc,
  'fluid-guards-caps':    Disc,
  'tank-protectors':      Box,
  'screen-protectors':    Map,
  'lock-system':          Settings,
  'stand-extenders':      Mountain,
  'chain-cover-sprocket': Settings,
  'hand-guard':           Hand,
  'lever-guard':          Hand,
  'mirror':               Disc,
  'handlebars':           Wrench,
  'grips-throttle':       Wrench,
  'foot-pegs':            Footprints,
  'mounts-chargers':      Map,
  'auxiliary-light':      Lightbulb,
  'tail-light':           Lightbulb,
  'indicator':            Lightbulb,
  'headlight':            Lightbulb,
  'air-filter':           Wind,
  'exhaust':              Wrench,
  'fenders-extenders':    ShieldCheck,
  'tail-tidy':            Layers,
  'windshield':           Wind,
  'seat':                 Package,
  'saddle-stay':          Anchor,
  'panniers':             Briefcase,
  'top-rack':             Package,
  'tank-bag':             Briefcase,
  'saddle-bag':           Briefcase,
  'tail-bag':             Briefcase,
  'jerry-can':            Box,
  'tanklock-flange':      Settings,
};

// Brand → accent gradient. Subtle palette tied to brand identity so different
// brands' fallback cards don't all look identical.
const BRAND_GRADIENT: Record<string, string> = {
  'Zana':         'from-rose-600/30 via-rose-500/10 to-transparent',
  'Moto Torque':  'from-blue-600/30 via-blue-500/10 to-transparent',
  'Auto Engina':  'from-amber-600/30 via-amber-500/10 to-transparent',
  'Moto Care':    'from-emerald-600/30 via-emerald-500/10 to-transparent',
};
const DEFAULT_GRADIENT = 'from-primary/25 via-primary/5 to-transparent';

// Card for fitments that aren't in live inventory yet — Sparkling Bear can
// source them on request from MotoTorque, Zana, Auto Engina, Moto Care, etc.
// Renders identical to ProductCard visually but swaps Add-to-Cart for an
// "Inquire to Order" CTA that opens WhatsApp / phone.

const PHONE = '+919108247377';
const PHONE_DISPLAY = '+91 91082 47377';

interface Props {
  fitment: SupplementalFitment;
}

export function SupplementalProductCard({ fitment }: Props) {
  const [imgError, setImgError] = useState(false);
  const hasDiscount = fitment.mrp && fitment.mrp > fitment.price;
  const discountPct = hasDiscount
    ? Math.round(((fitment.mrp! - fitment.price) / fitment.mrp!) * 100)
    : 0;

  const inquiryText = encodeURIComponent(
    `Hi Sparkling Bear, I'd like to order:\n\n${fitment.name} (${fitment.brand})\nPrice: ₹${fitment.price.toLocaleString('en-IN')}\n\nPlease confirm availability + delivery.`
  );
  const waUrl = `https://wa.me/${PHONE.replace('+', '')}?text=${inquiryText}`;

  const Icon = TYPE_ICON[fitment.type] ?? HardHat;
  const gradient = BRAND_GRADIENT[fitment.brand] ?? DEFAULT_GRADIENT;

  return (
    <Card className="group relative overflow-hidden border-border/40 hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5">
      {/* Image / fallback */}
      <div className={`relative aspect-square overflow-hidden bg-card ${imgError || !fitment.image ? '' : 'bg-white'}`}>
        {!imgError && fitment.image ? (
          <img
            src={fitment.image}
            alt={fitment.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          // Designed fallback: brand-tinted gradient + large category icon +
          // brand wordmark. Mirrors the look of a real product photo card.
          <div className={`w-full h-full bg-gradient-to-br ${gradient} relative flex flex-col items-center justify-center p-4`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_50%)]" />
            <Icon className="relative h-14 w-14 text-foreground/30 group-hover:text-foreground/40 group-hover:scale-105 transition-all duration-500 mb-2" strokeWidth={1.25} />
            <span className="relative text-[10px] uppercase tracking-[0.25em] text-foreground/40 font-bold">
              {fitment.brand}
            </span>
          </div>
        )}

        {/* Top-left: Order on Request badge */}
        <Badge className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider">
          Order Inquiry
        </Badge>

        {/* Top-right: discount */}
        {hasDiscount && (
          <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-white">
            {discountPct}% OFF
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-3 md:p-4">
        <p className="text-[10px] uppercase tracking-wider text-primary/80 font-bold mb-1 truncate">
          {fitment.brand}
        </p>
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2 leading-snug min-h-[2.4em]">
          {fitment.name}
        </h3>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-bold text-foreground">{formatPrice(fitment.price * 100)}</span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(fitment.mrp! * 100)}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            asChild
            size="sm"
            className="flex-1 h-9"
          >
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
              Inquire
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="h-9 px-2.5"
            title={PHONE_DISPLAY}
          >
            <a href={`tel:${PHONE}`}>
              <Phone className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
