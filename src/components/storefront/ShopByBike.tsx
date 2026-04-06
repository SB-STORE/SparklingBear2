import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const bikes = [
  { name: 'Royal Enfield Classic 350', slug: 'RE Classic 350', image: 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800&q=80&auto=format&fit=crop' },
  { name: 'RE Himalayan 450', slug: 'RE Himalayan 450', image: 'https://images.pexels.com/photos/19547825/pexels-photo-19547825.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'KTM 390 Adventure', slug: 'KTM 390 Adventure', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80&auto=format&fit=crop' },
  { name: 'KTM Duke 390', slug: 'KTM Duke 390', image: 'https://images.unsplash.com/photo-1635073908681-64534f1ac68b?w=800&q=80&auto=format&fit=crop' },
  { name: 'Yamaha R15 V4', slug: 'Yamaha R15 V4', image: 'https://images.pexels.com/photos/19435684/pexels-photo-19435684.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'TVS Apache', slug: 'TVS Apache', image: 'https://images.pexels.com/photos/17227166/pexels-photo-17227166.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Hero Xpulse', slug: 'Hero Xpulse', image: 'https://images.pexels.com/photos/12992447/pexels-photo-12992447.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Bajaj Dominar 400', slug: 'Bajaj Dominar 400', image: 'https://images.pexels.com/photos/27100142/pexels-photo-27100142.jpeg?auto=compress&cs=tinysrgb&w=800' },
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
