import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&q=80&auto=format&fit=crop',
    title: 'Ride In Style',
    subtitle: 'Top-quality motorcycle accessories for every rider',
    cta: 'Shop Now',
    link: '/products',
  },
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80&auto=format&fit=crop',
    title: 'Gear Up For Adventure',
    subtitle: 'Riding jackets, gloves, boots & touring luggage',
    cta: 'View Collection',
    link: '/products?category=riding-gears-luggage',
  },
  {
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1920&q=80&auto=format&fit=crop',
    title: 'Helmets That Protect',
    subtitle: 'LS2, Axor, SMK & more — ISI & ECE certified',
    cta: 'Browse Helmets',
    link: '/products?category=helmets',
  },
  {
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1920&q=80&auto=format&fit=crop',
    title: 'Premium Car Detailing',
    subtitle: 'Ceramic coating, PPF & paint correction by experts',
    cta: 'Explore Services',
    link: '/products?category=bike-protection-fitments',
  },
];

export function HeroCarousel() {
  return (
    <div className="relative w-full hero-carousel">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        navigation
        className="h-[300px] sm:h-[400px] lg:h-[600px]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

              {/* Text content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-lg lg:text-xl text-white/80 mb-4 sm:mb-6 max-w-2xl">
                  {slide.subtitle}
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold uppercase tracking-wider"
                >
                  <Link to={slide.link}>
                    {slide.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .hero-carousel .swiper-pagination-bullet {
          background: hsl(0 0% 100% / 0.5);
          width: 10px;
          height: 10px;
          opacity: 1;
        }
        .hero-carousel .swiper-pagination-bullet-active {
          background: hsl(0 75% 45%);
          width: 28px;
          border-radius: 5px;
        }
        .hero-carousel .swiper-button-next,
        .hero-carousel .swiper-button-prev {
          color: white;
          background: hsl(0 0% 0% / 0.4);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: none;
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
      `}</style>
    </div>
  );
}
