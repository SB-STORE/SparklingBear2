import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import bikeRE from '@/assets/bike-royal-enfield.jpg';
import bikeKTM from '@/assets/bike-ktm.jpg';
import bikeYamaha from '@/assets/bike-yamaha.jpg';
import bikeHonda from '@/assets/bike-honda.jpg';
import bikeBajaj from '@/assets/bike-bajaj.jpg';
import bikeTVS from '@/assets/bike-tvs.jpg';
import bikeHero from '@/assets/bike-hero.jpg';
import bikeSuzuki from '@/assets/bike-suzuki.jpg';

const bikes = [
  { name: 'Royal Enfield', slug: 'Royal Enfield', image: bikeRE },
  { name: 'KTM', slug: 'KTM', image: bikeKTM },
  { name: 'Yamaha', slug: 'Yamaha', image: bikeYamaha },
  { name: 'Honda', slug: 'Honda', image: bikeHonda },
  { name: 'Bajaj', slug: 'Bajaj', image: bikeBajaj },
  { name: 'TVS', slug: 'TVS', image: bikeTVS },
  { name: 'Hero', slug: 'Hero', image: bikeHero },
  { name: 'Suzuki', slug: 'Suzuki', image: bikeSuzuki },
];

export function ShopByBike() {
  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gradient-chrome">
            Shop By Bike
          </h2>
          <Link
            to="/products"
            className="text-sm text-primary font-semibold hover:underline flex items-center gap-1"
          >
            VIEW ALL
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {bikes.map((bike) => (
            <Link
              key={bike.slug}
              to={`/products?search=${encodeURIComponent(bike.slug)}`}
              className="group relative bg-card rounded-xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gradient-to-b from-card to-muted/30">
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-3 text-center border-t border-border/20">
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {bike.name}
                </h3>
                <span className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors flex items-center justify-center gap-1 mt-1">
                  View Accessories <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
