import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&q=80&auto=format&fit=crop',
    position: 'center 40%',
    title: 'Ride In Style',
    subtitle: 'Top-quality motorcycle accessories for every rider',
    cta: 'Shop Now',
    link: '/products',
  },
  {
    image: 'https://images.pexels.com/photos/33203544/pexels-photo-33203544.jpeg?auto=compress&cs=tinysrgb&w=1920',
    position: 'center 30%',
    title: 'Gear Up For Adventure',
    subtitle: 'Riding jackets, gloves, boots & touring luggage',
    cta: 'View Collection',
    link: '/products?category=riding-gears-luggage',
  },
  {
    image: 'https://images.pexels.com/photos/30888535/pexels-photo-30888535.jpeg?auto=compress&cs=tinysrgb&w=1920',
    position: 'center 25%',
    title: 'Helmets That Protect',
    subtitle: 'LS2, Axor, SMK & more — ISI & ECE certified',
    cta: 'Browse Helmets',
    link: '/products?category=helmets',
  },
  {
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1920&q=80&auto=format&fit=crop',
    position: 'center 50%',
    title: 'Light Up The Night',
    subtitle: 'HJG, MADDOG & Future Eyes — premium auxiliary lights',
    cta: 'Shop Aux Lights',
    link: '/products?category=aux-lights',
  },
];

export function HeroCarousel() {
  return (
    <div className="relative w-full hero-carousel">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        navigation
        className="h-[400px] sm:h-[500px] lg:h-[650px] xl:h-[700px]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                style={{ objectPosition: slide.position }}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 opacity-90">
                  Sparkling Bear
                </span>
                <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 drop-shadow-2xl animate-fade-in">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-lg lg:text-xl text-white/75 mb-6 sm:mb-8 max-w-2xl">
                  {slide.subtitle}
                </p>
                <div className="flex gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold uppercase tracking-wider text-sm sm:text-base px-6 sm:px-8"
                  >
                    <Link to={slide.link}>
                      {slide.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 font-semibold uppercase tracking-wider text-sm sm:text-base px-6 sm:px-8 hidden sm:inline-flex"
                  >
                    <Link to="/products">View All Products</Link>
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .hero-carousel .swiper-pagination-bullet {
          background: hsl(0 0% 100% / 0.4);
          width: 10px;
          height: 10px;
          opacity: 1;
        }
        .hero-carousel .swiper-pagination-bullet-active {
          background: hsl(0 75% 45%);
          width: 32px;
          border-radius: 5px;
        }
        .hero-carousel .swiper-button-next,
        .hero-carousel .swiper-button-prev {
          color: white;
          background: hsl(0 0% 0% / 0.4);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: none;
          backdrop-filter: blur(4px);
        }
        @media (min-width: 768px) {
          .hero-carousel .swiper-button-next,
          .hero-carousel .swiper-button-prev {
            display: flex;
          }
        }
        .hero-carousel .swiper-button-next::after,
        .hero-carousel .swiper-button-prev::after {
          font-size: 18px;
          font-weight: bold;
        }
        .hero-carousel .swiper-button-next:hover,
        .hero-carousel .swiper-button-prev:hover {
          background: hsl(0 75% 45% / 0.8);
        }
        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
