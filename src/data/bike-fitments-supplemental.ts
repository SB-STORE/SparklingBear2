// Supplemental fitment catalog — virtual products that aren't yet in the
// live Supabase inventory but are products SB can source on request from
// Zana, Moto Torque, and Moto Care. These render alongside live DB
// products on /bikes/:slug pages, distinguished by an "Order Inquiry"
// CTA that opens WhatsApp pre-filled.
//
// Image policy: if a brand-original image exists in
//   public/products/fitments/<slug>.<ext>
// reference it. Otherwise leave `image: ''` and SupplementalProductCard
// renders the designed icon fallback (brand wordmark + category icon).
// Don't fabricate CDN URLs that 404 — visible broken-image icons are
// worse than a clean fallback.
//
// Adding a new fitment: append to SUPPLEMENTAL_FITMENTS. Brand
// auto-appears in filters, the bike page auto-shows it. Zero code
// changes for new fitments.

export interface SupplementalFitment {
  slug: string;          // unique identifier
  name: string;          // display name (must include the bike model — drives our matchers)
  brand: string;         // accessory brand: Zana, Moto Torque, Moto Care
  price: number;         // INR (rupees, not paisa) — supplemental cards format their own
  mrp?: number;          // optional MRP for discount badge
  image: string;         // image path under public/, or '' for icon fallback
  type: string;          // product-type slug (matches BIKE_PRODUCT_TYPES.slug)
  description?: string;
  compatibleBikes: string[]; // list of our bike slugs this fits
}

// Brand list intentionally excludes Auto Engina — Sparkling Bear does
// not deal with that brand.
export const SUPPLEMENTAL_FITMENTS: SupplementalFitment[] = [
  // ─────────── Himalayan 450 ───────────
  {
    slug: 'mototorque-himalayan-450-aux-light-mount',
    name: 'Moto Torque Aux Light Mount - Himalayan 450',
    brand: 'Moto Torque',
    price: 1599,
    mrp: 1899,
    image: '',
    type: 'mounts-chargers',
    description: 'Bracket-mount kit for aux lights on Himalayan 450',
    compatibleBikes: ['himalayan-450'],
  },
  {
    slug: 'zana-bash-plate-himalayan-450',
    name: 'Zana Bash Plate - Himalayan 450',
    brand: 'Zana',
    price: 3999,
    image: '/products/fitments/zana-bash-plate-himalayan-450.jpg',
    type: 'engine-skid-plate',
    description: 'Aluminium engine skid plate for Himalayan 450',
    compatibleBikes: ['himalayan-450'],
  },
  {
    slug: 'zana-headlight-grill-himalayan-450',
    name: 'Zana Headlight Grill - Himalayan 450',
    brand: 'Zana',
    price: 1299,
    image: '/products/fitments/zana-headlight-grill-himalayan-450.jpg',
    type: 'headlight-grill',
    compatibleBikes: ['himalayan-450'],
  },
  {
    slug: 'zana-radiator-guard-himalayan-450',
    name: 'Zana Radiator Guard - Himalayan 450',
    brand: 'Zana',
    price: 1899,
    image: '/products/fitments/zana-radiator-guard-himalayan-450.jpg',
    type: 'radiator-guard',
    compatibleBikes: ['himalayan-450'],
  },

  // ─────────── KTM 390/250 Adventure ───────────
  {
    slug: 'zana-saddle-stay-ktm-adv',
    name: 'Zana Saddle Stay - KTM 390/250 Adventure',
    brand: 'Zana',
    price: 2799,
    image: '/products/fitments/zana-saddle-stay-ktm-adv.jpg',
    type: 'saddle-stay',
    compatibleBikes: ['ktm-390-adventure', 'ktm-390-adventure-2025'],
  },
  {
    slug: 'moto-care-tyre-hugger-ktm-adv',
    name: 'Moto Care Tyre Hugger - KTM 390/250 Adventure',
    brand: 'Moto Care',
    price: 2000,
    image: '/products/fitments/moto-care-tyre-hugger-ktm.png',
    type: 'fenders-extenders',
    compatibleBikes: ['ktm-390-adventure', 'ktm-390-adventure-2025'],
  },

  // ─────────── KTM Duke 390 / 200 ───────────
  {
    slug: 'mototorque-frame-slider-duke-390',
    name: 'Moto Torque Frame Slider - KTM Duke 390/200',
    brand: 'Moto Torque',
    price: 1899,
    image: '',
    type: 'frame-slider',
    compatibleBikes: ['ktm-duke-390', 'ktm-duke-250', 'ktm-duke-gen3'],
  },
  {
    slug: 'mototorque-tail-tidy-duke-390',
    name: 'Moto Torque Tail Tidy - KTM Duke 390/200',
    brand: 'Moto Torque',
    price: 1499,
    image: '',
    type: 'tail-tidy',
    compatibleBikes: ['ktm-duke-390', 'ktm-duke-250', 'ktm-duke-gen3'],
  },

  // ─────────── Xpulse 210 / 200 ───────────
  {
    slug: 'moto-care-crash-guard-xpulse',
    name: 'Moto Care Crash Guard - Hero Xpulse 210',
    brand: 'Moto Care',
    price: 5600,
    image: '/products/fitments/moto-care-crash-guard-xpulse.png',
    type: 'crash-guard',
    compatibleBikes: ['xpulse-210', 'xpulse-200', 'xpulse-rally'],
  },
  {
    slug: 'moto-care-saddle-stay-xpulse',
    name: 'Moto Care Saddle Stay - Hero Xpulse 210',
    brand: 'Moto Care',
    price: 3000,
    image: '/products/fitments/moto-care-saddle-stay-xpulse.png',
    type: 'saddle-stay',
    compatibleBikes: ['xpulse-210', 'xpulse-200', 'xpulse-rally'],
  },

  // ─────────── Guerrilla 450 ───────────
  {
    slug: 'moto-care-carrier-backrest-guerrilla',
    name: 'Moto Care Carrier Backrest - Guerrilla 450',
    brand: 'Moto Care',
    price: 4500,
    image: '/products/fitments/moto-care-carrier-guerrilla.png',
    type: 'top-rack',
    compatibleBikes: ['guerrilla-450'],
  },
  {
    slug: 'zana-engine-guard-guerrilla',
    name: 'Zana Engine Guard - Guerrilla 450',
    brand: 'Zana',
    price: 4799,
    image: '',
    type: 'crash-guard',
    compatibleBikes: ['guerrilla-450'],
  },

  // ─────────── Hunter 350 ───────────
  {
    slug: 'zana-saddle-stay-hunter-350',
    name: 'Zana Saddle Stay - Hunter 350',
    brand: 'Zana',
    price: 2999,
    image: '',
    type: 'saddle-stay',
    compatibleBikes: ['hunter-350'],
  },
  {
    slug: 'mototorque-tank-bag-hunter-350',
    name: 'Moto Torque Tank Bag - Hunter 350',
    brand: 'Moto Torque',
    price: 2499,
    image: '',
    type: 'tank-bag',
    compatibleBikes: ['hunter-350'],
  },

  // ─────────── Classic 350 (Reborn / 350-500) ───────────
  {
    slug: 'zana-crash-guard-classic-350',
    name: 'Zana Crash Guard - Classic 350',
    brand: 'Zana',
    price: 4499,
    image: '',
    type: 'crash-guard',
    compatibleBikes: ['classic-350-reborn', 'classic-350-500'],
  },
  {
    slug: 'zana-saddle-bag-rack-classic-350',
    name: 'Zana Saddle Bag Rack - Classic 350',
    brand: 'Zana',
    price: 2299,
    image: '',
    type: 'top-rack',
    compatibleBikes: ['classic-350-reborn', 'classic-350-500'],
  },

  // ─────────── Meteor 350 / Super Meteor 650 ───────────
  {
    slug: 'zana-engine-guard-meteor-350',
    name: 'Zana Engine Guard - Meteor 350',
    brand: 'Zana',
    price: 3899,
    image: '',
    type: 'crash-guard',
    compatibleBikes: ['meteor-350'],
  },
  {
    slug: 'zana-backrest-meteor-350',
    name: 'Zana Pillion Backrest - Meteor 350',
    brand: 'Zana',
    price: 2799,
    image: '',
    type: 'top-rack',
    compatibleBikes: ['meteor-350'],
  },
  {
    slug: 'zana-engine-guard-super-meteor-650',
    name: 'Zana Engine Guard - Super Meteor 650',
    brand: 'Zana',
    price: 5499,
    image: '',
    type: 'crash-guard',
    compatibleBikes: ['super-meteor-650'],
  },

  // ─────────── Interceptor / Continental GT 650 ───────────
  {
    slug: 'zana-saddle-stay-re-650',
    name: 'Zana Saddle Stay - Interceptor 650 / Continental GT 650',
    brand: 'Zana',
    price: 3299,
    image: '/products/fitments/zana-saddle-stay-re-650.jpg',
    type: 'saddle-stay',
    compatibleBikes: ['interceptor-650', 'continental-gt-650'],
  },
  {
    slug: 'mototorque-bar-end-mirrors-re-650',
    name: 'Moto Torque Bar-End Mirrors - RE 650',
    brand: 'Moto Torque',
    price: 1799,
    image: '',
    type: 'mirror',
    compatibleBikes: ['interceptor-650', 'continental-gt-650'],
  },

  // ─────────── Triumph Speed 400 / Scrambler 400 X ───────────
  {
    slug: 'zana-crash-guard-triumph-400',
    name: 'Zana Crash Guard - Triumph Speed/Scrambler 400',
    brand: 'Zana',
    price: 4999,
    image: '',
    type: 'crash-guard',
    compatibleBikes: ['triumph-speed-400', 'triumph-scrambler-400x'],
  },

  // ─────────── Pulsar NS200 / NS400 ───────────
  {
    slug: 'mototorque-frame-slider-pulsar-ns',
    name: 'Moto Torque Frame Slider - Pulsar NS200/400',
    brand: 'Moto Torque',
    price: 1899,
    image: '',
    type: 'frame-slider',
    compatibleBikes: ['pulsar-ns200', 'pulsar-ns400'],
  },

  // ─────────── BMW G310 GS ───────────
  {
    slug: 'zana-crash-guard-bmw-g310gs',
    name: 'Zana Crash Guard - BMW G310 GS',
    brand: 'Zana',
    price: 6299,
    image: '',
    type: 'crash-guard',
    compatibleBikes: ['bmw-g310gs'],
  },

  // ─────────── Honda CB350 / H'ness / CB350RS ───────────
  {
    slug: 'zana-crash-guard-honda-cb350',
    name: "Zana Crash Guard - Honda H'ness/CB350RS",
    brand: 'Zana',
    price: 4199,
    image: '',
    type: 'crash-guard',
    compatibleBikes: ['honda-hness', 'honda-cb350rs'],
  },

  // ─────────── Bajaj Dominar 400 ───────────
  {
    slug: 'mototorque-saddle-stay-dominar',
    name: 'Moto Torque Saddle Stay - Bajaj Dominar 400',
    brand: 'Moto Torque',
    price: 2599,
    image: '',
    type: 'saddle-stay',
    compatibleBikes: ['bajaj-dominar'],
  },

  // ─────────── TVS Apache RTX 300 ───────────
  {
    slug: 'mototorque-tail-tidy-apache-rtx',
    name: 'Moto Torque Tail Tidy - Apache RTX 300',
    brand: 'Moto Torque',
    price: 1799,
    image: '',
    type: 'tail-tidy',
    compatibleBikes: ['apache-rtx-300'],
  },
];

export function getSupplementalForBike(bikeSlug: string): SupplementalFitment[] {
  return SUPPLEMENTAL_FITMENTS.filter(f => f.compatibleBikes.includes(bikeSlug));
}
