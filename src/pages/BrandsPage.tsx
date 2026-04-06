import { Link } from 'react-router-dom';
import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { useBrands } from '@/hooks/use-products';
import { usePageTitle } from '@/hooks/use-page-title';
import { Skeleton } from '@/components/ui/skeleton';

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

export default function BrandsPage() {
  usePageTitle('Our Brands');
  const { data: brands, isLoading } = useBrands();

  const brandsWithLogos = brands?.map((b) => ({
    ...b,
    logo_url: localLogoMap[b.slug] || b.logo_url,
  })) || [];

  return (
    <StorefrontLayout>
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-chrome">
            Our Brands
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm md:text-base">
            Shop from India's most trusted motorcycle gear and accessories brands
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <Skeleton className="w-full aspect-square rounded-lg" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {brandsWithLogos.map((brand) => (
              <Link
                key={brand.id}
                to={`/products?brand=${brand.slug}`}
                className="group flex flex-col items-center gap-3"
              >
                <div className="w-full aspect-square bg-white rounded-xl flex items-center justify-center p-6 group-hover:shadow-[0_0_20px_hsl(0_75%_45%/0.2)] transition-all duration-300">
                  {brand.logo_url ? (
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-lg font-bold text-neutral-800">
                      {brand.name}
                    </span>
                  )}
                </div>
                <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground uppercase tracking-wider transition-colors text-center">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </StorefrontLayout>
  );
}
