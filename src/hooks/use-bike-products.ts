import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { getBike, type Bike } from '@/data/bikes';
import { matchProductTypes } from '@/data/bike-product-types';
import { getSupplementalForBike, type SupplementalFitment } from '@/data/bike-fitments-supplemental';
import type { Product } from '@/types';

export type { SupplementalFitment };

// Returns all products that match a bike model — brand-agnostic. A product
// counts as "compatible" if any of the bike's nameMatchers appears in its
// name or description (case-insensitive). When new fitment brands ship
// products that name the bike (e.g., "JB Racing Himalayan 450 Crash Guard"),
// they show up automatically with no code changes.
export function useBikeProducts(bikeSlug: string | undefined) {
  return useQuery({
    queryKey: ['bike-products', bikeSlug],
    queryFn: async (): Promise<Product[]> => {
      if (!isSupabaseConfigured || !bikeSlug) return [];
      const bike = getBike(bikeSlug);
      if (!bike) return [];

      const { data, error } = await supabase
        .from('products')
        .select('*, brand:brands(*), category:categories(*)')
        .eq('is_active', true)
        .order('display_order');
      if (error) throw error;

      return (data ?? []).filter(p => isProductCompatible(p, bike));
    },
    enabled: !!bikeSlug,
  });
}

// Returns supplemental (non-DB, "order on request") fitments for a bike,
// filtered by the same brand-agnostic logic as live products. Brand
// extensibility: just append to SUPPLEMENTAL_FITMENTS — new brands
// auto-flow into filters and grid.
//
// Dedup: if a supplemental fitment's name overlaps with a live DB product
// already shown, hide the supplemental copy (the DB version takes precedence
// since it's actually buyable).
export function useSupplementalFitments(
  bikeSlug: string | undefined,
  liveProducts: Product[] = []
): SupplementalFitment[] {
  if (!bikeSlug) return [];
  const all = getSupplementalForBike(bikeSlug);
  if (liveProducts.length === 0) return all;

  // Slug-based dedup is exact and reliable since supplemental + live DB share slugs.
  const liveSlugs = new Set(liveProducts.map(p => p.slug));
  return all.filter(f => !liveSlugs.has(f.slug));
}

// Brand facet that combines DB products + supplemental fitments. Same
// signature as deriveBrandFacet but accepts the merged set.
export function deriveCombinedBrandFacet(
  products: Product[],
  supplemental: SupplementalFitment[]
): { slug: string; name: string; count: number }[] {
  const map = new Map<string, { slug: string; name: string; count: number }>();
  for (const p of products) {
    const slug = p.brand?.slug;
    const name = p.brand?.name;
    if (!slug || !name) continue;
    const e = map.get(slug);
    if (e) e.count++;
    else map.set(slug, { slug, name, count: 1 });
  }
  for (const s of supplemental) {
    const slug = s.brand.toLowerCase().replace(/\s+/g, '-');
    const e = map.get(slug);
    if (e) e.count++;
    else map.set(slug, { slug, name: s.brand, count: 1 });
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function deriveCombinedTypeFacet(
  products: Product[],
  supplemental: SupplementalFitment[]
): { slug: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of products) {
    for (const t of matchProductTypes(`${p.name} ${p.description ?? ''}`)) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  for (const s of supplemental) {
    counts.set(s.type, (counts.get(s.type) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count);
}

export function isProductCompatible(p: Product, bike: Bike): boolean {
  const haystack = `${p.name} ${p.description ?? ''}`.toLowerCase();
  return bike.nameMatchers.some(m => haystack.includes(m.toLowerCase()));
}

// Derives the set of fitment brands present in a product list — used to
// populate the Brand filter facet on the bike page dynamically.
export function deriveBrandFacet(products: Product[]): { slug: string; name: string; count: number }[] {
  const map = new Map<string, { slug: string; name: string; count: number }>();
  for (const p of products) {
    const slug = p.brand?.slug;
    const name = p.brand?.name;
    if (!slug || !name) continue;
    const existing = map.get(slug);
    if (existing) existing.count++;
    else map.set(slug, { slug, name, count: 1 });
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

// Derives product-type facets present in a product list (Crash Guard, Saddle
// Stay, etc.). A product can match multiple types — counts reflect that.
export function deriveProductTypeFacet(products: Product[]): { slug: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of products) {
    const haystack = `${p.name} ${p.description ?? ''}`;
    for (const typeSlug of matchProductTypes(haystack)) {
      counts.set(typeSlug, (counts.get(typeSlug) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count);
}
