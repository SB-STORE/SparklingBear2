import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const cells = [
  {
    title: 'Helmets',
    subtitle: 'ISI & ECE certified from LS2, Axor, SMK',
    image: 'https://powersports.in/cdn/shop/files/HJC-RPHA-12-Quartararo-Replica.jpg',
    href: '/products?category=helmets',
    className: 'md:col-span-1 md:row-span-2',
  },
  {
    title: 'Riding Gear',
    subtitle: 'Rynox, Cramster, Viaterra — jackets, gloves & boots',
    image: 'https://rynoxgear.com/cdn/shop/files/Home_Page_Banner-100_1_1280x.jpg',
    href: '/products?category=riding-gears-luggage',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Aux Lights',
    subtitle: 'MADDOG, HJG, Future Eyes — fog & LED lights',
    image: 'https://d32yu5nuptb5qv.cloudfront.net/banners/ad972f10e0800b49d76fed33a21f66981727872934_background_BG1.png',
    href: '/products?category=aux-lights',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Bike Protection & Fitments',
    subtitle: 'Zana, Moto Care — crash guards, frame sliders & more',
    image: 'https://evotech-performance.com/cdn/shop/files/EVOTECH_TRIUDAYT660_WEB_BANNER_acaf1028-fe5f-493d-a259-314113cd0053_2048x.jpg',
    href: '/products?category=bike-protection-fitments',
    className: 'md:col-span-2 md:row-span-1',
  },
];

export function MosaicPromoGrid() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-14 md:py-20" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider text-center mb-4 text-gradient-chrome transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Shop By Category
        </h2>
        <div
          className={`w-16 h-0.5 bg-primary mx-auto mb-8 md:mb-12 transition-all duration-700 delay-100 ease-out ${
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3 md:gap-4">
          {cells.map((cell, i) => (
            <Link
              key={cell.title}
              to={cell.href}
              className={`group relative overflow-hidden rounded-lg ${cell.className} ${
                i === 0 ? 'h-[250px] md:h-auto' : 'h-[220px]'
              } transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 100 + 200}ms` : '0ms' }}
            >
              {/* Image with slow zoom */}
              <img
                src={cell.image}
                alt={cell.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.12]"
                style={{ transform: 'scale(1.01)' }}
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5 transition-opacity duration-500 group-hover:from-black/90" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 transform transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="text-lg md:text-2xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
                  {cell.title}
                </h3>
                <p className="text-xs md:text-sm text-white/60 mt-1 transition-colors duration-300 group-hover:text-white/80">
                  {cell.subtitle}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-xs text-primary font-bold uppercase tracking-widest opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Shop Now &rarr;
                </span>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/30 transition-all duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
