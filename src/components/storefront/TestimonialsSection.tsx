import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
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

  return (
    <section className="py-10 md:py-14 bg-card/30 border-y border-border/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gradient-chrome mb-2">
            What Riders Say
          </h2>
          <div className="flex items-center justify-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
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
              <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] h-full">
                <Quote className="h-8 w-8 text-primary/30 mb-3" />
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {t.customer_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.customer_name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
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
