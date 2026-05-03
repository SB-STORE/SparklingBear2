// Product-image override map. When a live DB product has a missing or
// placeholder image_url, ProductCard checks this map by slug and uses the
// self-hosted image instead.
//
// Sourcing rule: ONLY use images that are verifiably the correct product —
// either from the brand's own product page or a search-verified marketplace
// listing. Aggregator-sourced images (e.g., Autonity collection pages) are
// NOT reliable: their slug-to-image mapping mismatches in many cases (e.g.,
// "saddle-stay" slug → top-box image, "engine-guard" slug → headlight-grill
// image). When in doubt, leave the override OUT and let the designed icon
// fallback render — that's better than showing a wrong image.
//
// To add an override: drop the verified image into
// public/products/<category>/<slug>.<ext> and add an entry below.

export const PRODUCT_IMAGE_OVERRIDES: Record<string, string> = {
  // ─── MADDOG aux lights — sourced from maddog.co.in (brand-original) ───
  'maddog-scout-10w':       '/products/aux-lights/maddog-scout-10w.webp',
  'maddog-scout-x-20w':     '/products/aux-lights/maddog-scout-x-20w.webp',
  'maddog-delta':           '/products/aux-lights/maddog-delta.webp',
  'maddog-alpha':           '/products/aux-lights/maddog-alpha.webp',
  'maddog-lycan-40w':       '/products/aux-lights/maddog-lycan-40w.webp',
  'maddog-dual-switch':     '/products/aux-lights/maddog-dual-switch.webp',

  // ─── Future Eyes aux lights — sourced from futureeyesdesign.com (brand-original) ───
  'future-eyes-f150':       '/products/aux-lights/future-eyes-f150.webp',
  'future-eyes-f150p':      '/products/aux-lights/future-eyes-f150p.png',
  'future-eyes-f20p':       '/products/aux-lights/future-eyes-f20p.webp',
  'future-eyes-f30p':       '/products/aux-lights/future-eyes-f30p.webp',

  // ─── Zana fitments — sourced from zanamotorcycles.com (brand-original, visually verified 2026-05-03) ───
  'zana-crash-guard-himalayan-450':    '/products/fitments/zana-crash-guard-himalayan-450.jpg',
  'zana-saddle-stay-himalayan-450':    '/products/fitments/zana-saddle-stay-himalayan-450.jpg',
  'zana-top-rack-himalayan-450':       '/products/fitments/zana-top-rack-himalayan-450.jpg',
  'zana-bash-plate-himalayan-450':     '/products/fitments/zana-bash-plate-himalayan-450.jpg',
  'zana-radiator-guard-himalayan-450': '/products/fitments/zana-radiator-guard-himalayan-450.jpg',
  'zana-headlight-grill-himalayan-450':'/products/fitments/zana-headlight-grill-himalayan-450.jpg',
  'zana-saddle-stay-ktm-adv':          '/products/fitments/zana-saddle-stay-ktm-adv.jpg',
  'zana-saddle-stay-re-650':           '/products/fitments/zana-saddle-stay-re-650.jpg',

  // ─── Auto Engina fitments — sourced from autoengina.com (brand-original, visually verified) ───
  'auto-engina-crash-guard-himalayan': '/products/fitments/auto-engina-crash-guard-himalayan.jpg',
  'auto-engina-crash-guard-ktm390':    '/products/fitments/auto-engina-crash-guard-ktm390.jpg',
  'auto-engina-fog-clamps-hunter':     '/products/fitments/auto-engina-fog-clamps-hunter.png',
  'auto-engina-gps-mount-triumph':     '/products/fitments/auto-engina-gps-mount-triumph.jpg',

  // ─── Moto Care fitments — sourced from motocare.co.in (brand-original, visually verified) ───
  'moto-care-crash-guard-xpulse':      '/products/fitments/moto-care-crash-guard-xpulse.png',
  'moto-care-saddle-stay-xpulse':      '/products/fitments/moto-care-saddle-stay-xpulse.png',
  'moto-care-carrier-guerrilla':       '/products/fitments/moto-care-carrier-guerrilla.png',
  'moto-care-tyre-hugger-ktm':         '/products/fitments/moto-care-tyre-hugger-ktm.png',

  // ─── Moto Torque jackets — sourced from mototorque.in (brand-original) ───
  'moto-torque-blade-pro':             '/products/riding-gear/moto-torque-blade-pro.jpg',
  'moto-torque-vento':                 '/products/riding-gear/moto-torque-vento.jpg',

  // ─── BOBO mobile mounts — sourced from bobogears.com (brand-original, visually verified) ───
  'bobo-bm1':                          '/products/mobile-mounts/bobo-bm1.jpg',
  'bobo-bm10':                         '/products/mobile-mounts/bobo-bm10.jpg',
  'bobo-bm10h-pro':                    '/products/mobile-mounts/bobo-bm10h-pro.jpg',
  'bobo-bm4':                          '/products/mobile-mounts/bobo-bm4.jpg',
  'bobo-bm4-pro':                      '/products/mobile-mounts/bobo-bm4-pro.jpg',

  // ─── Studds helmets — sourced from studds.com (brand-original, visually verified) ───
  'studds-ninja-3g':                   '/products/studds-ninja-3g.jpg',
  'studds-thunder-d2':                 '/products/studds-thunder-d2.jpg',
  'studds-shifter-d2':                 '/products/studds-shifter-d2.jpg',
  'studds-marshall':                   '/products/studds-marshall.jpg',
  'studds-chrome-elite':               '/products/studds-chrome-elite.jpg',
  'studds-ninja-elite-super':          '/products/studds-ninja-elite-super.jpg',
  // Note: auto-engina-brake-cap-hunter and auto-engina-pannier-toprack-ktm
  // not currently listed on autoengina.com — using icon fallback.

  // ─── HJG aux lights — sourced from Amazon India (search-verified) ───
  'hjg-7-led-foglight':     '/products/aux-lights/hjg-7-led-foglight.jpg',
  'hjg-ai-cam-foglight':    '/products/aux-lights/hjg-ai-cam-foglight.jpg',
  'hjg-3-led-rectangular':  '/products/aux-lights/hjg-3-led-rectangular.jpg',
  'hjg-4-led-sports':       '/products/aux-lights/hjg-4-led-sports.jpg',
  'hjg-mini-drive-40w':     '/products/aux-lights/hjg-mini-drive-40w.jpg',

  // NOTE: All bike-protection / fitment overrides previously sourced from
  // Autonity were REMOVED on 2026-05-03 — manual audit found 7 of 9 inspected
  // were wrong products (top-boxes labeled as saddle stays, fluid caps as
  // radiator guards, mirrors as fog clamps, etc.). Until brand-original
  // sources can be scraped (Zana, Moto Torque, Auto Engina are all SPA
  // sites blocking static curl), these products use the designed icon
  // fallback instead of wrong images.
};

export function getProductImageOverride(slug: string): string | undefined {
  return PRODUCT_IMAGE_OVERRIDES[slug];
}

// Map category slug → product-type slug (for icon-fallback selection).
export const CATEGORY_TO_TYPE: Record<string, string> = {
  'aux-lights':                    'auxiliary-light',
  'helmets':                       'headlight',
  'riding-gears-luggage':          'tank-bag',
  'bike-protection-fitments':      'crash-guard',
};
