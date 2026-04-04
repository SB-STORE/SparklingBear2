import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { useBrands } from '@/hooks/use-products';

import 'swiper/css';
import 'swiper/css/free-mode';

import ls2Img from '@/assets/ls2.png';
import axorImg from '@/assets/axor.webp';
import smkImg from '@/assets/smk.png';
import studdsImg from '@/assets/studds.webp';
import rynoxImg from '@/assets/rynox.webp';
import cramsterImg from '@/assets/cramster.webp';
import hjgImg from '@/assets/hjg.webp';
import maddogImg from '@/assets/maddog.jpg';
import zanaImg from '@/assets/zana.webp';
import mototorqueImg from '@/assets/mototorque.webp';

const fallbackBrands = [
  { name: 'LS2', slug: 'ls2', logo_url: ls2Img },
  { name: 'Axor', slug: 'axor', logo_url: axorImg },
  { name: 'SMK', slug: 'smk', logo_url: smkImg },
  { name: 'Studds', slug: 'studds', logo_url: studdsImg },
  { name: 'Rynox', slug: 'rynox', logo_url: rynoxImg },
  { name: 'Cramster', slug: 'cramster', logo_url: cramsterImg },
  { name: 'HJG', slug: 'hjg', logo_url: hjgImg },
  { name: 'Maddog', slug: 'maddog', logo_url: maddogImg },
  { name: 'Zana', slug: 'zana', logo_url: zanaImg },
  { name: 'MotoTorque', slug: 'mototorque', logo_url: mototorqueImg },
];

export function BrandSlider() {
  const { data: dbBrands } = useBrands();
  const brands = dbBrands && dbBrands.length > 0 ? dbBrands : fallbackBrands;

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gradient-chrome">
            Shop By Brand
          </h2>
          <Link
            to="/products"
            className="text-sm text-primary font-semibold hover:underline"
          >
            VIEW ALL
          </Link>
        </div>

        <Swiper
          modules={[FreeMode]}
          freeMode
          slidesPerView="auto"
          spaceBetween={16}
          className="brand-slider"
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.slug} style={{ width: 'auto' }}>
              <Link
                to={`/products?brand=${brand.slug}`}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border border-border flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors p-3">
                  {brand.logo_url ? (
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground font-semibold">
                      {brand.name}
                    </span>
                  )}
                </div>
                <span className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors font-medium text-center">
                  {brand.name}
                </span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
