import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import helmetImg from '@/assets/helmet.jpg';
import ridingGearImg from '@/assets/ridinggear_luggage.png';
import auxLightImg from '@/assets/auxlight.png';
import protectionImg from '@/assets/prot.png';

// Curated category images — no random stock photos
const categoryImageMap: Record<string, string> = {
  helmets: helmetImg,
  'riding-gears-luggage': ridingGearImg,
  'aux-lights': auxLightImg,
  'bike-protection-fitments': protectionImg,
};

interface CategoryItem {
  name: string;
  slug: string;
  image_url?: string | null;
}

interface CategoryIconSliderProps {
  title?: string;
  categories: CategoryItem[];
}

export function CategoryIconSlider({
  title = 'Shop By Category',
  categories,
}: CategoryIconSliderProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gradient-chrome mb-8 text-center">
          {title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {categories.map((cat) => {
            const img = categoryImageMap[cat.slug] || cat.image_url;
            return (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className="group flex flex-col items-center gap-3"
              >
                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-neutral-700/50 group-hover:border-primary/60 transition-all duration-300 group-hover:shadow-[0_0_25px_hsl(0_75%_45%/0.25)]">
                  {img ? (
                    <img
                      src={img}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">{cat.name}</span>
                    </div>
                  )}
                  {/* Dark gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <span className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors font-semibold text-center leading-tight flex items-center gap-1">
                  {cat.name}
                  <ChevronRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
