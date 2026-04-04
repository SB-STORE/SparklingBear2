import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { Package } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/free-mode';

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
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gradient-chrome mb-6">
          {title}
        </h2>

        <Swiper
          modules={[FreeMode]}
          freeMode
          slidesPerView="auto"
          spaceBetween={16}
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.slug} style={{ width: 'auto' }}>
              <Link
                to={`/products?category=${cat.slug}`}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-20 h-20 rounded-full bg-card border-2 border-border hover:border-primary transition-colors flex items-center justify-center overflow-hidden p-2">
                  {cat.image_url ? (
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Package className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </div>
                <span className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors font-medium text-center max-w-[80px] leading-tight">
                  {cat.name}
                </span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
