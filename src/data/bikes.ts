// Master bike registry — drives /bikes/:brand and /bikes/:model routes,
// the homepage ShopByBike grid, and the Navbar mega-menu.
//
// nameMatchers: substrings checked (case-insensitive) against product name
// AND description. A product is considered compatible with a bike if ANY
// matcher hits. This lets fitments from any brand (MotoTorque, Zana, JB Racing,
// Auto Engina, etc.) flow in automatically as long as the product name
// references the bike.

export interface Bike {
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  image?: string;
  nameMatchers: string[];
}

export interface BikeBrand {
  slug: string;
  name: string;
  image?: string;
}

export const BIKE_BRANDS: BikeBrand[] = [
  { slug: 'royal-enfield', name: 'Royal Enfield', image: '/bikes/royal-enfield.jpg' },
  { slug: 'ktm', name: 'KTM', image: '/bikes/ktm.jpg' },
  { slug: 'honda', name: 'Honda', image: '/bikes/honda.jpg' },
  { slug: 'yamaha', name: 'Yamaha', image: '/bikes/yamaha.jpg' },
  { slug: 'bajaj', name: 'Bajaj', image: '/bikes/bajaj.jpg' },
  { slug: 'tvs', name: 'TVS', image: '/bikes/tvs.jpg' },
  { slug: 'hero', name: 'Hero', image: '/bikes/hero.jpg' },
  { slug: 'suzuki', name: 'Suzuki', image: '/bikes/suzuki.jpg' },
  { slug: 'triumph', name: 'Triumph' },
  { slug: 'bmw', name: 'BMW' },
  { slug: 'kawasaki', name: 'Kawasaki' },
  { slug: 'harley-davidson', name: 'Harley-Davidson' },
  { slug: 'jawa', name: 'Jawa / Yezdi' },
];

export const BIKES: Bike[] = [
  // ───────── Royal Enfield ─────────
  { slug: 'himalayan-450', name: 'Himalayan 450', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/himalayan-450.webp',
    nameMatchers: ['Himalayan 450', 'Himalayan450'] },
  { slug: 'himalayan-450-rally', name: 'Himalayan 450 Rally Edition', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/himalayan-450-rally.webp',
    nameMatchers: ['Himalayan 450 Rally', 'Rally Edition'] },
  { slug: 'himalayan-411', name: 'Himalayan 411', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/himalayan-411.webp',
    nameMatchers: ['Himalayan 411', 'Himalayan411'] },
  { slug: 'guerrilla-450', name: 'Guerrilla 450', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/guerrilla-450.webp',
    nameMatchers: ['Guerrilla 450', 'Guerrilla450'] },
  { slug: 'bear-650', name: 'Bear 650', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/bear-650.webp',
    nameMatchers: ['Bear 650', 'Bear650'] },
  { slug: 'scram-440', name: 'SCRAM 440 / 411', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/scram-440.webp',
    nameMatchers: ['SCRAM 440', 'SCRAM 411', 'Scram'] },
  { slug: 'bullet-classic', name: 'Bullet Classic', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/bullet-classic.webp',
    nameMatchers: ['Bullet'] },
  { slug: 'interceptor-650', name: 'Interceptor 650', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/interceptor-650.webp',
    nameMatchers: ['Interceptor 650', 'Interceptor650', 'RE Interceptor'] },
  { slug: 'continental-gt-650', name: 'Continental GT 650', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/continental-gt-650.webp',
    nameMatchers: ['Continental GT 650', 'GT 650', 'GT650'] },
  { slug: 'classic-350-reborn', name: 'Classic 350 Reborn', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/classic-350-reborn.webp',
    nameMatchers: ['Classic 350 Reborn', 'Reborn'] },
  { slug: 'hunter-350', name: 'Hunter 350', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/hunter-350.webp',
    nameMatchers: ['Hunter 350', 'Hunter350'] },
  { slug: 'meteor-350', name: 'Meteor 350', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/meteor-350.webp',
    nameMatchers: ['Meteor 350', 'Meteor350'] },
  { slug: 'super-meteor-650', name: 'Super Meteor 650', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/super-meteor-650.webp',
    nameMatchers: ['Super Meteor 650', 'Super Meteor', 'SuperMeteor'] },
  { slug: 'classic-350-500', name: 'Classic 350 / 500', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/classic-350-500.webp',
    nameMatchers: ['Classic 350', 'Classic 500'] },
  { slug: 'shotgun-650', name: 'Shotgun 650', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/shotgun-650.webp',
    nameMatchers: ['Shotgun 650', 'Shotgun'] },
  { slug: 'classic-650', name: 'Classic 650', brand: 'Royal Enfield', brandSlug: 'royal-enfield', image: '/bikes/models/classic-650.webp',
    nameMatchers: ['Classic 650', 'Classic650'] },

  // ───────── KTM ─────────
  { slug: 'ktm-390-adventure-2025', name: '2025 KTM 390/250 Adventure', brand: 'KTM', brandSlug: 'ktm', image: '/bikes/models/ktm-390-adventure-2025.webp',
    nameMatchers: ['2025 KTM 390 Adventure', '2025 KTM 250 Adventure', 'KTM 390 Adv 2025'] },
  { slug: 'ktm-390-adventure', name: 'KTM 390/250 Adventure', brand: 'KTM', brandSlug: 'ktm', image: '/bikes/models/ktm-390-adventure.webp',
    nameMatchers: ['KTM 390 Adventure', 'KTM 250 Adventure', 'KTM 390 Adv', 'KTM 250 Adv', 'KTM Adv'] },
  { slug: 'ktm-duke-390', name: 'KTM Duke 390 / 200', brand: 'KTM', brandSlug: 'ktm', image: '/bikes/models/ktm-duke-390.webp',
    nameMatchers: ['KTM Duke 390', 'KTM Duke 200', 'Duke 390', 'Duke 200'] },
  { slug: 'ktm-duke-250', name: 'KTM Duke 250 / 390', brand: 'KTM', brandSlug: 'ktm', image: '/bikes/models/ktm-duke-250.webp',
    nameMatchers: ['KTM Duke 250', 'Duke 250'] },
  { slug: 'ktm-rc-390', name: 'KTM RC 390 / 200', brand: 'KTM', brandSlug: 'ktm', image: '/bikes/models/ktm-rc-390.webp',
    nameMatchers: ['KTM RC 390', 'KTM RC 200', 'RC 390', 'RC 200'] },
  { slug: 'ktm-duke-gen3', name: 'KTM Duke 390 / 250 Gen-3', brand: 'KTM', brandSlug: 'ktm', image: '/bikes/models/ktm-duke-gen3.webp',
    nameMatchers: ['KTM Duke Gen-3', 'Duke Gen 3', 'Gen-3 Duke'] },

  // ───────── Honda ─────────
  { slug: 'honda-cb300r', name: 'Honda CB300R', brand: 'Honda', brandSlug: 'honda', image: '/bikes/models/honda-cb300r.webp',
    nameMatchers: ['Honda CB300R', 'CB300R', 'CB 300R'] },
  { slug: 'honda-hness', name: "Honda H'ness CB350", brand: 'Honda', brandSlug: 'honda', image: '/bikes/models/honda-hness.webp',
    nameMatchers: ["H'ness", 'Hness', 'CB350 H', 'Honda CB350'] },
  { slug: 'honda-cb350rs', name: 'Honda CB350 RS', brand: 'Honda', brandSlug: 'honda', image: '/bikes/models/honda-cb350rs.webp',
    nameMatchers: ['Honda CB350 RS', 'CB350 RS', 'CB350RS'] },
  { slug: 'honda-cb300f', name: 'Honda CB300F', brand: 'Honda', brandSlug: 'honda', image: '/bikes/models/honda-cb300f.webp',
    nameMatchers: ['Honda CB300F', 'CB300F', 'CB 300F'] },
  { slug: 'honda-nx500', name: 'Honda NX500', brand: 'Honda', brandSlug: 'honda', image: '/bikes/models/honda-nx500.webp',
    nameMatchers: ['Honda NX500', 'Honda NX-500', 'NX500', 'NX-500'] },
  { slug: 'honda-cb200x', name: 'Honda CB200X', brand: 'Honda', brandSlug: 'honda', image: '/bikes/models/honda-cb200x.webp',
    nameMatchers: ['Honda CB200X', 'CB200X', 'CB 200X'] },

  // ───────── Triumph ─────────
  { slug: 'triumph-speed-400', name: 'Triumph Speed 400 / Speed T4', brand: 'Triumph', brandSlug: 'triumph', image: '/bikes/models/triumph-speed-400.webp',
    nameMatchers: ['Triumph Speed 400', 'Speed 400', 'Speed T4'] },
  { slug: 'triumph-scrambler-400x', name: 'Triumph Scrambler 400 X', brand: 'Triumph', brandSlug: 'triumph', image: '/bikes/models/triumph-scrambler-400x.webp',
    nameMatchers: ['Triumph Scrambler 400', 'Scrambler 400 X', 'Scrambler 400X'] },

  // ───────── Yamaha ─────────
  { slug: 'yamaha-mt15', name: 'Yamaha MT 15', brand: 'Yamaha', brandSlug: 'yamaha', image: '/bikes/models/yamaha-mt15.webp',
    nameMatchers: ['Yamaha MT 15', 'MT-15', 'MT15'] },
  { slug: 'yamaha-fz', name: 'Yamaha FZs / FZ V4', brand: 'Yamaha', brandSlug: 'yamaha', image: '/bikes/models/yamaha-fz.webp',
    nameMatchers: ['Yamaha FZ', 'FZs', 'FZ V4', 'FZ-X'] },
  { slug: 'yamaha-xsr155', name: 'Yamaha XSR 155', brand: 'Yamaha', brandSlug: 'yamaha', image: '/bikes/models/yamaha-xsr155.webp',
    nameMatchers: ['Yamaha XSR 155', 'XSR155', 'XSR 155'] },

  // ───────── Hero ─────────
  { slug: 'xpulse-210', name: 'Hero Xpulse 210', brand: 'Hero', brandSlug: 'hero', image: '/bikes/models/xpulse-210.webp',
    nameMatchers: ['Xpulse 210', 'Xpulse210'] },
  { slug: 'xpulse-200', name: 'Hero Xpulse 200', brand: 'Hero', brandSlug: 'hero', image: '/bikes/models/xpulse-200.webp',
    nameMatchers: ['Xpulse 200', 'Xpulse 4V', 'Xpulse200'] },
  { slug: 'xpulse-rally', name: 'Hero Xpulse Rally Edition / Pro', brand: 'Hero', brandSlug: 'hero', image: '/bikes/models/xpulse-rally.webp',
    nameMatchers: ['Xpulse Rally', 'Xpulse Pro'] },

  // ───────── BMW ─────────
  { slug: 'bmw-g310gs', name: 'BMW G 310 GS', brand: 'BMW', brandSlug: 'bmw', image: '/bikes/models/bmw-g310gs.webp',
    nameMatchers: ['BMW G310 GS', 'BMW G 310 GS', 'G310 GS', 'G310GS'] },

  // ───────── TVS ─────────
  { slug: 'tvs-ronin', name: 'TVS Ronin', brand: 'TVS', brandSlug: 'tvs', image: '/bikes/models/tvs-ronin.webp',
    nameMatchers: ['TVS Ronin', 'Ronin'] },
  { slug: 'apache-rtr-200', name: 'TVS Apache RTR 200 4V', brand: 'TVS', brandSlug: 'tvs', image: '/bikes/models/apache-rtr-200.webp',
    nameMatchers: ['Apache RTR 200', 'RTR 200', 'RTR200'] },
  { slug: 'apache-rtx-300', name: 'TVS Apache RTX 300', brand: 'TVS', brandSlug: 'tvs', image: '/bikes/models/apache-rtx-300.webp',
    nameMatchers: ['Apache RTX 300', 'RTX 300', 'RTX300'] },

  // ───────── Suzuki ─────────
  { slug: 'vstrom-sx-250', name: 'Suzuki V-Strom SX 250', brand: 'Suzuki', brandSlug: 'suzuki', image: '/bikes/models/vstrom-sx-250.webp',
    nameMatchers: ['V-Strom SX 250', 'V Strom SX 250', 'VStrom SX', 'V-Strom 250'] },

  // ───────── Bajaj ─────────
  { slug: 'bajaj-dominar', name: 'Bajaj Dominar 400', brand: 'Bajaj', brandSlug: 'bajaj', image: '/bikes/models/bajaj-dominar.webp',
    nameMatchers: ['Bajaj Dominar', 'Dominar 400', 'Dominar'] },
  { slug: 'pulsar-ns200', name: 'Bajaj Pulsar NS 200', brand: 'Bajaj', brandSlug: 'bajaj', image: '/bikes/models/pulsar-ns200.webp',
    nameMatchers: ['Pulsar NS 200', 'Pulsar NS200', 'NS 200'] },
  { slug: 'pulsar-ns400', name: 'Bajaj Pulsar NS 400', brand: 'Bajaj', brandSlug: 'bajaj', image: '/bikes/models/pulsar-ns400.webp',
    nameMatchers: ['Pulsar NS 400', 'Pulsar NS400', 'NS 400', 'NS400Z', 'NS-400Z'] },

  // ───────── Jawa / Yezdi ─────────
  { slug: 'yezdi-adventure', name: 'Yezdi Adventure', brand: 'Jawa / Yezdi', brandSlug: 'jawa', image: '/bikes/models/yezdi-adventure.webp',
    nameMatchers: ['Yezdi Adventure', 'Yezdi Adv'] },

  // ───────── Harley-Davidson ─────────
  { slug: 'harley-x440', name: 'Harley-Davidson X440', brand: 'Harley-Davidson', brandSlug: 'harley-davidson', image: '/bikes/models/harley-x440.webp',
    nameMatchers: ['Harley X440', 'Harley-Davidson X440', 'HD X440', 'X440'] },

  // ───────── Kawasaki ─────────
  { slug: 'kawasaki-klx', name: 'Kawasaki KLX', brand: 'Kawasaki', brandSlug: 'kawasaki', image: '/bikes/models/kawasaki-klx.webp',
    nameMatchers: ['Kawasaki KLX', 'KLX 230', 'KLX 250'] },
  { slug: 'kawasaki-z900', name: 'Kawasaki Z900', brand: 'Kawasaki', brandSlug: 'kawasaki', image: '/bikes/models/kawasaki-z900.webp',
    nameMatchers: ['Kawasaki Z900', 'Z-900', 'Z900'] },
  { slug: 'kawasaki-versys-650', name: 'Kawasaki Versys 650', brand: 'Kawasaki', brandSlug: 'kawasaki', image: '/bikes/models/kawasaki-versys-650.webp',
    nameMatchers: ['Kawasaki Versys 650', 'Versys 650', 'Versys650'] },
];

export function getBike(slug: string): Bike | undefined {
  return BIKES.find(b => b.slug === slug);
}

export function getBrand(slug: string): BikeBrand | undefined {
  return BIKE_BRANDS.find(b => b.slug === slug);
}

export function getBikesByBrand(brandSlug: string): Bike[] {
  return BIKES.filter(b => b.brandSlug === brandSlug);
}

export function bikesByBrand(): Map<string, Bike[]> {
  const map = new Map<string, Bike[]>();
  for (const brand of BIKE_BRANDS) {
    map.set(brand.slug, BIKES.filter(b => b.brandSlug === brand.slug));
  }
  return map;
}
