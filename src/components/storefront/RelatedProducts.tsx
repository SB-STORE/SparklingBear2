import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { useProducts } from '@/hooks/use-products';
import { ProductCard } from './ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  // We need to fetch by category. useProducts takes categorySlug so we'll use a workaround.
  // We fetch all products and filter client-side.
  const { data: allProducts, isLoading } = useProducts();

  const related = allProducts
    ?.filter((p) => p.category_id === categoryId && p.id !== currentProductId)
    .slice(0, 8);

  if (!isLoading && (!related || related.length === 0)) return null;

  return (
    <section className="py-8 md:py-12 related-products">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gradient-chrome mb-6">
          You May Also Like
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            navigation
            slidesPerView={2}
            spaceBetween={16}
            breakpoints={{
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {related!.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style>{`
        .related-products .swiper-button-next,
        .related-products .swiper-button-prev {
          color: white;
          background: hsl(0 0% 0% / 0.5);
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
        .related-products .swiper-button-next::after,
        .related-products .swiper-button-prev::after {
          font-size: 14px;
          font-weight: bold;
        }
        @media (max-width: 640px) {
          .related-products .swiper-button-next,
          .related-products .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
