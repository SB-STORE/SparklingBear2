import { useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';

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
  const [activeIndex, setActiveIndex] = useState(0);

  const onSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  return (
    <div className="relative w-full hero-carousel">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        navigation
        onSlideChange={onSlideChange}
        className="h-[400px] sm:h-[500px] lg:h-[650px] xl:h-[700px]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full overflow-hidden">
              {/* Ken Burns slow zoom effect on active slide */}
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
                  activeIndex === i ? 'scale-110' : 'scale-100'
                }`}
                style={{ objectPosition: slide.position }}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <span
                  className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 hero-stagger-1"
                  style={{ animationDelay: '0.1s' }}
                >
                  Sparkling Bear
                </span>
                <h2
                  className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 drop-shadow-2xl hero-stagger-2"
                  style={{ animationDelay: '0.3s' }}
                >
                  {slide.title}
                </h2>
                <p
                  className="text-sm sm:text-lg lg:text-xl text-white/75 mb-6 sm:mb-8 max-w-2xl hero-stagger-3"
                  style={{ animationDelay: '0.5s' }}
                >
                  {slide.subtitle}
                </p>
                <div className="flex gap-3 hero-stagger-4" style={{ animationDelay: '0.7s' }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold uppercase tracking-wider text-sm sm:text-base px-6 sm:px-8 hover:scale-105 hover:shadow-[0_0_30px_rgba(204,34,51,0.5)] transition-all duration-300"
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
                    className="border-white/30 text-white hover:bg-white/10 font-semibold uppercase tracking-wider text-sm sm:text-base px-6 sm:px-8 hidden sm:inline-flex hover:scale-105 transition-all duration-300"
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
          transition: all 0.4s ease;
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
          transition: all 0.3s ease;
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
          transform: scale(1.1);
        }

        /* Staggered text entrance per slide */
        .swiper-slide-active .hero-stagger-1,
        .swiper-slide-active .hero-stagger-2,
        .swiper-slide-active .hero-stagger-3,
        .swiper-slide-active .hero-stagger-4 {
          animation: heroFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-stagger-1,
        .hero-stagger-2,
        .hero-stagger-3,
        .hero-stagger-4 {
          opacity: 0;
          transform: translateY(30px);
        }
        @keyframes heroFadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
