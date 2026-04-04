import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { useProducts, useFeaturedProducts } from '@/hooks/use-products';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types';

import 'swiper/css';
import 'swiper/css/navigation';

interface FeaturedCollectionProps {
  title: string;
  products?: Product[];
  categorySlug?: string;
  featured?: boolean;
  moreLink?: string;
}

export function FeaturedCollection({
  title,
  products: propProducts,
  categorySlug,
  featured,
  moreLink,
}: FeaturedCollectionProps) {
  const {
    data: categoryProducts,
    isLoading: catLoading,
  } = useProducts(categorySlug ? { categorySlug } : undefined);

  const {
    data: featuredProducts,
    isLoading: featLoading,
  } = useFeaturedProducts();

  let products: Product[] | undefined;
  let isLoading = false;

  if (propProducts) {
    products = propProducts;
  } else if (featured) {
    products = featuredProducts;
    isLoading = featLoading;
  } else if (categorySlug) {
    products = categoryProducts;
    isLoading = catLoading;
  }

  const resolvedLink =
    moreLink ||
    (categorySlug ? `/products?category=${categorySlug}` : '/products');

  return (
    <section className="py-6 md:py-10 featured-collection">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gradient-chrome">
            {title}
          </h2>
          <Link
            to={resolvedLink}
            className="text-sm text-primary font-semibold hover:underline flex items-center gap-1"
          >
            VIEW ALL
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Swiper or Loading */}
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
        ) : products && products.length > 0 ? (
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
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No products found
          </p>
        )}
      </div>

      <style>{`
        .featured-collection .swiper-button-next,
        .featured-collection .swiper-button-prev {
          color: white;
          background: hsl(0 0% 0% / 0.5);
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
        .featured-collection .swiper-button-next::after,
        .featured-collection .swiper-button-prev::after {
          font-size: 14px;
          font-weight: bold;
        }
        .featured-collection .swiper-button-next:hover,
        .featured-collection .swiper-button-prev:hover {
          background: hsl(0 75% 45% / 0.8);
        }
        @media (max-width: 640px) {
          .featured-collection .swiper-button-next,
          .featured-collection .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
