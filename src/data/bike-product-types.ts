// Granular accessory taxonomy used to filter the per-bike product grid.
// Modeled on autonity.in's product-type collections. Each type has a list
// of substring matchers checked against product name/description — so any
// product (from MotoTorque, Zana, JB Racing, or any other fitment brand)
// that uses these terms in its name auto-categorizes correctly.

export interface BikeProductType {
  slug: string;
  label: string;
  matchers: string[];
}

export const BIKE_PRODUCT_TYPES: BikeProductType[] = [
  // ── Protection ──
  { slug: 'crash-guard', label: 'Crash Guard',
    matchers: ['Crash Guard', 'Crashguard', 'Engine Bull', 'Sliders'] },
  { slug: 'frame-slider', label: 'Frame Slider',
    matchers: ['Frame Slider', 'Frame Sliders'] },
  { slug: 'engine-skid-plate', label: 'Engine Guard / Skid Plate',
    matchers: ['Engine Guard', 'Bash Plate', 'Skid Plate', 'Sump Guard'] },
  { slug: 'radiator-guard', label: 'Radiator Guard',
    matchers: ['Radiator Guard', 'Radiator Grill', 'Radiator Grille'] },
  { slug: 'headlight-grill', label: 'Headlight Grill',
    matchers: ['Headlight Grill', 'Headlight Grille', 'Headlamp Grill'] },
  { slug: 'master-cylinder-guard', label: 'Master Cylinder Guard',
    matchers: ['Master Cylinder', 'MC Guard'] },
  { slug: 'fluid-guards-caps', label: 'Fluid Guards & Caps',
    matchers: ['Fluid Cap', 'Fluid Guard', 'Brake Fluid', 'Reservoir Cap'] },
  { slug: 'tank-protectors', label: 'Tank Protectors',
    matchers: ['Tank Pad', 'Tank Protector', 'Tank Grip', 'Tank Cover'] },
  { slug: 'screen-protectors', label: 'Screen Protectors',
    matchers: ['Screen Protector', 'Cluster Guard', 'Console Protector', 'Meter Guard'] },
  { slug: 'lock-system', label: 'Lock System',
    matchers: ['Disc Lock', 'Wheel Lock', 'Lock System', 'Anti-Theft', 'Grip Lock'] },
  { slug: 'stand-extenders', label: 'Stand & Extenders',
    matchers: ['Side Stand', 'Stand Extender', 'Stand Base', 'Centre Stand', 'Stand Plate'] },
  { slug: 'chain-cover-sprocket', label: 'Chain Cover & Sprocket',
    matchers: ['Chain Cover', 'Chain Guard', 'Sprocket', 'Chain Sprocket'] },

  // ── Cockpit & controls ──
  { slug: 'hand-guard', label: 'Hand Guard',
    matchers: ['Hand Guard', 'Handguard', 'Bark Buster', 'Knuckle Guard'] },
  { slug: 'lever-guard', label: 'Lever Guard',
    matchers: ['Lever Guard', 'Brake Lever Guard'] },
  { slug: 'mirror', label: 'Mirrors',
    matchers: ['Mirror', 'Bar End Mirror'] },
  { slug: 'handlebars', label: 'Handlebars',
    matchers: ['Handlebar', 'Handle Bar', 'Bar Riser', 'Handle Riser'] },
  { slug: 'grips-throttle', label: 'Grips & Throttle',
    matchers: ['Grips', 'Throttle', 'Hand Grip'] },
  { slug: 'foot-pegs', label: 'Foot Pegs & Mounts',
    matchers: ['Foot Peg', 'Footpeg', 'Footrest', 'Foot Rest', 'Pillion Footrest'] },
  { slug: 'mounts-chargers', label: 'Mounts & Chargers',
    matchers: ['GPS Mount', 'Phone Mount', 'Mobile Mount', 'USB Charger', 'Charger Mount'] },

  // ── Lighting ──
  { slug: 'auxiliary-light', label: 'Auxiliary Lights',
    matchers: ['Aux Light', 'Auxiliary Light', 'Fog Light', 'Foglight', 'Driving Light'] },
  { slug: 'tail-light', label: 'Tail Light',
    matchers: ['Tail Light', 'Brake Light', 'Rear Light'] },
  { slug: 'indicator', label: 'Indicators',
    matchers: ['Indicator', 'Turn Signal', 'Blinker'] },
  { slug: 'headlight', label: 'Headlight',
    matchers: ['Headlight Bulb', 'Headlamp Bulb', 'LED Headlight'] },

  // ── Performance ──
  { slug: 'air-filter', label: 'Air Filter',
    matchers: ['Air Filter', 'Airfilter', 'Air-Filter'] },
  { slug: 'exhaust', label: 'Exhaust',
    matchers: ['Exhaust', 'Slip-on', 'Slipon', 'Slip On', 'Silencer'] },

  // ── Body / Fenders ──
  { slug: 'fenders-extenders', label: 'Fenders & Extenders',
    matchers: ['Fender', 'Mudguard', 'Tyre Hugger', 'Hugger'] },
  { slug: 'tail-tidy', label: 'Tail Tidy',
    matchers: ['Tail Tidy', 'Fender Eliminator'] },
  { slug: 'windshield', label: 'Windshield',
    matchers: ['Windshield', 'Windscreen', 'Visor Shield'] },
  { slug: 'seat', label: 'Seat',
    matchers: ['Seat Cover', 'Saddle Seat', 'Comfort Seat'] },

  // ── Luggage / Touring ──
  { slug: 'saddle-stay', label: 'Saddle Stay',
    matchers: ['Saddle Stay', 'Saddlestay'] },
  { slug: 'panniers', label: 'Panniers',
    matchers: ['Pannier', 'Side Box', 'Side Case'] },
  { slug: 'top-rack', label: 'Top Rack / Carrier',
    matchers: ['Top Rack', 'Carrier', 'Back Rack', 'Backrest'] },
  { slug: 'tank-bag', label: 'Tank Bag',
    matchers: ['Tank Bag'] },
  { slug: 'saddle-bag', label: 'Saddle Bag',
    matchers: ['Saddle Bag', 'Saddlebag'] },
  { slug: 'tail-bag', label: 'Tail Bag',
    matchers: ['Tail Bag'] },
  { slug: 'jerry-can', label: 'Jerry Can',
    matchers: ['Jerry Can'] },
  { slug: 'tanklock-flange', label: 'Tanklock Fitting Flange',
    matchers: ['Tanklock', 'Tank Lock Flange', 'BF Flange'] },
];

// Match a product to all product-types whose any matcher hits its name/description.
export function matchProductTypes(haystack: string): string[] {
  const lc = haystack.toLowerCase();
  const hits: string[] = [];
  for (const t of BIKE_PRODUCT_TYPES) {
    if (t.matchers.some(m => lc.includes(m.toLowerCase()))) {
      hits.push(t.slug);
    }
  }
  return hits;
}

export function getProductType(slug: string): BikeProductType | undefined {
  return BIKE_PRODUCT_TYPES.find(t => t.slug === slug);
}
