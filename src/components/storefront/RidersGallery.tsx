import { Instagram } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const tiles = [
  { img: '/banners/gallery-ls2-rider.jpg', handle: '@dakhargyan', product: 'LS2 MX700 Subverter', span: 'col-span-2 row-span-2' },
  { img: '/banners/gallery-00-00-07.jpg', handle: '@himalayan_explorer', product: 'Zana DRI-R40 Aux Lights' },
  { img: '/banners/gallery-00-00-11.jpg', handle: '@ktm_390_diaries', product: 'Zana Crash Guard' },
  { img: '/banners/gallery-00-00-15.jpg', handle: '@road_to_leh', product: 'Zana Radiator Guard' },
  { img: '/banners/gallery-00-00-25.jpg', handle: '@adv_curious', product: 'Zana Side Stand Extender' },
  { img: '/banners/gallery-00-00-30.jpg', handle: '@touring_throttle', product: 'Zana Top Rack' },
  { img: '/banners/gallery-00-00-03.jpg', handle: '@bangalore_riders', product: 'KTM ADV Setup' },
];

export function RidersGallery() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="py-14 md:py-20"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-10 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="w-12 h-1 bg-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider text-gradient-chrome">
            Riders In The Wild
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-xl mx-auto">
            Real setups from real Sparkling Bear customers. Tag <span className="text-primary font-semibold">@thesparklingbear</span> on Instagram to feature here.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[repeat(4,_minmax(0,_180px))] md:grid-rows-[repeat(2,_minmax(0,_220px))] gap-3">
          {tiles.map((t, i) => (
            <a
              key={i}
              href="https://www.instagram.com/thesparklingbear"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-xl border border-border/40 hover:border-primary/50 transition-all duration-500 ${t.span || ''} ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: isVisible ? `${i * 80 + 100}ms` : '0ms' }}
            >
              <img
                src={t.img}
                alt={t.product}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <div className="flex items-center gap-1.5 text-xs text-white/85 mb-1">
                  <Instagram className="h-3.5 w-3.5" />
                  <span className="font-semibold">{t.handle}</span>
                </div>
                <div className="text-sm md:text-base font-bold text-white truncate">
                  {t.product}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
