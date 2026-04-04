import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBrands } from '@/hooks/use-products';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

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
import raidaImg from '@/assets/raida.webp';
import boboImg from '@/assets/bobo.webp';
import motocareImg from '@/assets/motocare.webp';
import futureeyesImg from '@/assets/future eyes.webp';
import viaterraImg from '@/assets/viaterra.jpg';
import autoEnginaImg from '@/assets/autoengina.png';

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

// Map slug -> local asset for high-quality logos
const localLogoMap: Record<string, string> = {
  ls2: ls2Img,
  axor: axorImg,
  smk: smkImg,
  studds: studdsImg,
  rynox: rynoxImg,
  cramster: cramsterImg,
  hjg: hjgImg,
  maddog: maddogImg,
  zana: zanaImg,
  mototorque: mototorqueImg,
  raida: raidaImg,
  bobo: boboImg,
  'moto-care': motocareImg,
  'future-eyes': futureeyesImg,
  viaterra: viaterraImg,
  'auto-engina': autoEnginaImg,
};

export function BrandSlider() {
  const { data: dbBrands } = useBrands();

  // Use DB brands but override logos with local high-quality versions where available
  const brands = dbBrands && dbBrands.length > 0
    ? dbBrands.map((b: any) => ({
        ...b,
        logo_url: localLogoMap[b.slug] || b.logo_url,
      }))
    : fallbackBrands;

  return (
    <section className="py-8 md:py-12 brand-slider-section">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gradient-chrome">
            Shop By Brand
          </h2>
          <div className="flex items-center gap-3">
            {/* Custom nav buttons */}
            <button className="brand-prev w-8 h-8 rounded-full border border-neutral-600 flex items-center justify-center text-neutral-400 hover:border-primary hover:text-primary transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="brand-next w-8 h-8 rounded-full border border-neutral-600 flex items-center justify-center text-neutral-400 hover:border-primary hover:text-primary transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
            <Link
              to="/products"
              className="text-sm text-primary font-semibold hover:underline ml-2"
            >
              VIEW ALL
            </Link>
          </div>
        </div>

        <Swiper
          modules={[FreeMode, Navigation]}
          freeMode
          navigation={{
            prevEl: '.brand-prev',
            nextEl: '.brand-next',
          }}
          slidesPerView="auto"
          spaceBetween={20}
          className="brand-slider"
        >
          {brands.map((brand: any) => (
            <SwiperSlide key={brand.slug} style={{ width: 'auto' }}>
              <Link
                to={`/products?brand=${brand.slug}`}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-20 h-20 md:w-[100px] md:h-[100px] rounded-full bg-neutral-800/80 border-2 border-neutral-700/50 flex items-center justify-center overflow-hidden group-hover:border-primary/60 group-hover:shadow-[0_0_20px_hsl(0_75%_45%/0.3)] transition-all duration-300 p-3 md:p-4">
                  {brand.logo_url ? (
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      className="w-full h-full object-contain filter brightness-110"
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
