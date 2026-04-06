import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import 'swiper/css';

const fallbackTestimonials = [
  { customer_name: 'Arjun K.', rating: 5, text: 'Bought the Rynox Air GT jacket and Cramster gloves. Perfect fit, and the team helped me pick the right size. Best motorcycle gear store in Bangalore!' },
  { customer_name: 'Priya S.', rating: 5, text: 'Got my LS2 Storm II from Sparkling Bear. Genuine product with all original accessories. Free shipping was a bonus. Will definitely come back!' },
  { customer_name: 'Rahul M.', rating: 4, text: 'Installed Zana crash guards on my Himalayan 450. The guys at the store did the fitment for free. Clean installation and great service.' },
  { customer_name: 'Deepak V.', rating: 5, text: 'Maddog Alpha aux lights are a game changer for night rides. Sparkling Bear had the best price and delivered in 3 days to Bangalore.' },
  { customer_name: 'Sneha R.', rating: 5, text: 'Finally found a store that stocks Viaterra luggage! The Claw tailbag is waterproof and perfect for my weekend tours. Highly recommend.' },
];

export function TestimonialsSection() {
  const testimonials = fallbackTestimonials;
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-14 md:py-20 bg-surface-elevated" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-8 md:mb-12 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider text-gradient-chrome mb-3">
            What Riders Say
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-4" />
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-base text-foreground font-semibold">
            4.8/5 from 200+ happy riders
          </p>
        </div>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="p-6 md:p-8 rounded-xl bg-card border border-border/40 hover:border-primary/30 transition-all duration-300 h-full">
                <Quote className="h-10 w-10 text-primary/40 mb-3" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {t.customer_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.customer_name}
                      <span className="text-[10px] text-primary/70 ml-2 font-medium">Verified Buyer</span>
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
