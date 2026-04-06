import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const bikes = [
  { name: 'Royal Enfield', slug: 'Royal Enfield', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80&auto=format&fit=crop' },
  { name: 'KTM', slug: 'KTM', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80&auto=format&fit=crop' },
  { name: 'Yamaha', slug: 'Yamaha', image: 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=600&q=80&auto=format&fit=crop' },
  { name: 'Honda', slug: 'Honda', image: 'https://images.unsplash.com/photo-1580310614729-ccd69652491d?w=600&q=80&auto=format&fit=crop' },
  { name: 'Bajaj', slug: 'Bajaj', image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&q=80&auto=format&fit=crop' },
  { name: 'TVS', slug: 'TVS', image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80&auto=format&fit=crop' },
  { name: 'Hero', slug: 'Hero', image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80&auto=format&fit=crop' },
  { name: 'Suzuki', slug: 'Suzuki', image: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=600&q=80&auto=format&fit=crop' },
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
                  className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
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
