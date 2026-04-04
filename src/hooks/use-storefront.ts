import { useMemo } from 'react';
import { useProducts } from '@/hooks/use-products';
import type { Product } from '@/types';

const ANNOUNCEMENTS = [
  '\u{1F3CD}\uFE0F FREE SHIPPING ON ORDERS ABOVE \u20B9999',
  '\u{1F525} ANNIVERSARY SALE - UP TO 40% OFF',
  '\u26A1 NEW ARRIVALS EVERY WEEK',
];

export function useAnnouncements() {
  return ANNOUNCEMENTS;
}

export function useBanners(_position?: string) {
  // Placeholder for future DB-backed banners
  return [] as Array<{ id: string; title: string; image_url: string; link: string; position: string }>;
}

export function useRelatedProducts(categoryId: string, excludeId: string, limit = 8) {
  const { data: allProducts, isLoading } = useProducts();

  const related = useMemo(() => {
    if (!allProducts) return [];
    return allProducts
      .filter((p: Product) => p.category_id === categoryId && p.id !== excludeId)
      .slice(0, limit);
  }, [allProducts, categoryId, excludeId, limit]);

  return { data: related, isLoading };
}
