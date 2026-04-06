import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const bikes = [
  { name: 'Royal Enfield', slug: 'Royal Enfield', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Royal_Enfield_Classic_350_%282017_Model_Year%29.jpg/800px-Royal_Enfield_Classic_350_%282017_Model_Year%29.jpg' },
  { name: 'KTM', slug: 'KTM', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Ktm_duke_390.jpg/800px-Ktm_duke_390.jpg' },
  { name: 'Yamaha', slug: 'Yamaha', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Yamaha_R15_V3.0.jpg/800px-Yamaha_R15_V3.0.jpg' },
  { name: 'Honda', slug: 'Honda', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Honda_CB600F_Hornet_2011.JPG/800px-Honda_CB600F_Hornet_2011.JPG' },
  { name: 'Bajaj', slug: 'Bajaj', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Bajaj-NS400Z.jpg/800px-Bajaj-NS400Z.jpg' },
  { name: 'TVS', slug: 'TVS', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Apache_rtr_310.jpg/800px-Apache_rtr_310.jpg' },
  { name: 'Hero', slug: 'Hero', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Hero_Splendor_Plus_i3s_and_IBS_2018.jpg' },
  { name: 'Suzuki', slug: 'Suzuki', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Osaka_Motor_Show_2015_%28136%29_-_Suzuki_GIXXER.JPG/800px-Osaka_Motor_Show_2015_%28136%29_-_Suzuki_GIXXER.JPG' },
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
