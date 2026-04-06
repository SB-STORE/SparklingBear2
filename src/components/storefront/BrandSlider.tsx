import { Link } from 'react-router-dom';
import { useBrands } from '@/hooks/use-products';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

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
  'moto-torque': mototorqueImg,
  raida: raidaImg,
  bobo: boboImg,
  'moto-care': motocareImg,
  'future-eyes': futureeyesImg,
  viaterra: viaterraImg,
  'auto-engina': autoEnginaImg,
};

export function BrandSlider() {
  const { data: dbBrands } = useBrands();

  const brands = dbBrands && dbBrands.length > 0
    ? dbBrands.map((b: any) => ({
        ...b,
        logo_url: localLogoMap[b.slug] || b.logo_url,
      }))
    : fallbackBrands;

  // Duplicate the list for seamless infinite scroll
  const doubledBrands = [...brands, ...brands];
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-14 md:py-20 overflow-hidden" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container mx-auto px-4 mb-6">
        <div className={`flex items-center justify-between transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider text-gradient-chrome">
            Shop By Brand
          </h2>
          <Link
            to="/brands"
            className="text-sm text-primary font-semibold hover:underline"
          >
            VIEW ALL
          </Link>
        </div>
      </div>

      {/* Marquee container */}
      <div className="brand-marquee-wrapper group/marquee">
        <div className="brand-marquee">
          {doubledBrands.map((brand: any, i: number) => (
            <Link
              key={`${brand.slug}-${i}`}
              to={`/products?brand=${brand.slug}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 group/item mx-3 md:mx-4"
            >
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white/95 flex items-center justify-center p-4 md:p-5 group-hover/item:scale-110 group-hover/item:shadow-[0_0_25px_hsl(0_75%_45%/0.4)] transition-all duration-300">
                {brand.logo_url ? (
                  <img
                    src={brand.logo_url}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="text-sm text-neutral-800 font-bold uppercase tracking-wider">
                    {brand.name}
                  </span>
                )}
              </div>
              <span className="text-[11px] md:text-xs text-muted-foreground group-hover/item:text-primary transition-colors font-medium text-center uppercase tracking-wider">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .brand-marquee-wrapper {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        .brand-marquee {
          display: flex;
          width: max-content;
          animation: brand-scroll 30s linear infinite;
        }
        .brand-marquee-wrapper:hover .brand-marquee {
          animation-play-state: paused;
        }
        @keyframes brand-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
