import { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { usePageTitle } from '@/hooks/use-page-title';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ProductCard } from '@/components/storefront/ProductCard';
import { SupplementalProductCard } from '@/components/storefront/SupplementalProductCard';
import { BIKE_BRANDS, getBike, getBikesByBrand } from '@/data/bikes';
import { getProductType, matchProductTypes } from '@/data/bike-product-types';
import { useBikeProducts, useSupplementalFitments, deriveCombinedBrandFacet, deriveCombinedTypeFacet } from '@/hooks/use-bike-products';
import type { Product } from '@/types';

export default function BikeModelPage() {
  const { slug: bikeSlug } = useParams<{ slug: string }>();
  const bike = bikeSlug ? getBike(bikeSlug) : undefined;

  usePageTitle(bike ? `${bike.name} Accessories` : 'Bike');

  const { data: products = [], isLoading } = useBikeProducts(bikeSlug);
  const supplemental = useSupplementalFitments(bikeSlug, products);

  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc'>('default');

  const brandFacet = useMemo(() => deriveCombinedBrandFacet(products, supplemental), [products, supplemental]);
  const typeFacet = useMemo(() => deriveCombinedTypeFacet(products, supplemental), [products, supplemental]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedBrands.size > 0) {
      result = result.filter(p => p.brand?.slug && selectedBrands.has(p.brand.slug));
    }
    if (selectedTypes.size > 0) {
      result = result.filter(p => {
        const types = matchProductTypes(`${p.name} ${p.description ?? ''}`);
        return types.some(t => selectedTypes.has(t));
      });
    }
    return result;
  }, [products, selectedBrands, selectedTypes]);

  const filteredSupplemental = useMemo(() => {
    let result = supplemental;
    if (selectedBrands.size > 0) {
      result = result.filter(s => {
        const slug = s.brand.toLowerCase().replace(/\s+/g, '-');
        return selectedBrands.has(slug);
      });
    }
    if (selectedTypes.size > 0) {
      result = result.filter(s => selectedTypes.has(s.type));
    }
    return result;
  }, [supplemental, selectedBrands, selectedTypes]);

  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    switch (sort) {
      case 'price-asc': return arr.sort((a, b) => a.price - b.price);
      case 'price-desc': return arr.sort((a, b) => b.price - a.price);
      case 'name-asc': return arr.sort((a, b) => a.name.localeCompare(b.name));
      default: return arr;
    }
  }, [filteredProducts, sort]);

  const sortedSupplemental = useMemo(() => {
    const arr = [...filteredSupplemental];
    switch (sort) {
      case 'price-asc': return arr.sort((a, b) => a.price - b.price);
      case 'price-desc': return arr.sort((a, b) => b.price - a.price);
      case 'name-asc': return arr.sort((a, b) => a.name.localeCompare(b.name));
      default: return arr;
    }
  }, [filteredSupplemental, sort]);

  const totalCount = sortedProducts.length + sortedSupplemental.length;

  if (!bike) return <Navigate to="/products" replace />;

  const siblings = getBikesByBrand(bike.brandSlug).filter(b => b.slug !== bike.slug);
  const hasFilters = selectedBrands.size + selectedTypes.size > 0;

  const toggle = (set: Set<string>, key: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    if (next.has(key)) next.delete(key); else next.add(key);
    setter(next);
  };

  const filterRail = (
    <div className="space-y-6">
      {hasFilters && (
        <button
          className="text-xs text-primary hover:underline"
          onClick={() => { setSelectedBrands(new Set()); setSelectedTypes(new Set()); }}
        >
          Clear all filters
        </button>
      )}

      {brandFacet.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Brand</h3>
          <ul className="space-y-2">
            {brandFacet.map(b => (
              <li key={b.slug} className="flex items-center gap-2">
                <Checkbox
                  id={`brand-${b.slug}`}
                  checked={selectedBrands.has(b.slug)}
                  onCheckedChange={() => toggle(selectedBrands, b.slug, setSelectedBrands)}
                />
                <label htmlFor={`brand-${b.slug}`} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer flex-1">
                  {b.name} <span className="text-xs opacity-60">({b.count})</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {typeFacet.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Product Type</h3>
          <ul className="space-y-2">
            {typeFacet.map(t => {
              const def = getProductType(t.slug);
              if (!def) return null;
              return (
                <li key={t.slug} className="flex items-center gap-2">
                  <Checkbox
                    id={`type-${t.slug}`}
                    checked={selectedTypes.has(t.slug)}
                    onCheckedChange={() => toggle(selectedTypes, t.slug, setSelectedTypes)}
                  />
                  <label htmlFor={`type-${t.slug}`} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer flex-1">
                    {def.label} <span className="text-xs opacity-60">({t.count})</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <StorefrontLayout>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3 text-xs text-muted-foreground flex items-center gap-1.5">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={`/bikes/${bike.brandSlug}`} className="hover:text-primary">{bike.brand}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{bike.name}</span>
      </div>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-surface-elevated via-card to-background border-y border-border/40 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.6) 0%, transparent 60%)',
          }}
        />
        <div className="relative container mx-auto px-4 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10">
            {/* Left: copy */}
            <div className="text-center md:text-left order-2 md:order-1">
              <Link
                to={`/bikes/${bike.brandSlug}`}
                className="text-xs uppercase tracking-[0.3em] text-primary hover:underline mb-3 inline-block"
              >
                {bike.brand}
              </Link>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-gradient-chrome mb-3 leading-[1.05]">
                {bike.name}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                Crash guards, saddle stays, panniers, lights and every fitment built for the {bike.name}.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {isLoading ? 'Loading…' : `${products.length + supplemental.length} compatible ${(products.length + supplemental.length) === 1 ? 'product' : 'products'}`}
                </span>
                <span className="opacity-40">|</span>
                <span>Verified fitment</span>
                <span className="opacity-40">|</span>
                <span>Free shipping ₹999+</span>
              </div>
            </div>

            {/* Right: bike image */}
            <div className="relative order-1 md:order-2">
              {bike.image ? (
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-white">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </div>
              ) : (
                <div className="aspect-[16/10] rounded-xl bg-card border border-border/40" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cross-bike switcher */}
      <section className="border-b border-border/40 bg-card/30">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Shop By Bike</p>
          <div className="overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {BIKE_BRANDS.map(b => (
                <Link
                  key={b.slug}
                  to={`/bikes/${b.slug}`}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full border transition-colors whitespace-nowrap ${
                    b.slug === bike.brandSlug
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40'
                  }`}
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
          {siblings.length > 0 && (
            <div className="mt-3 overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max">
                <span className="text-xs text-muted-foreground mr-1">More {bike.brand}:</span>
                {siblings.map(s => (
                  <Link
                    key={s.slug}
                    to={`/bikes/${s.slug}`}
                    className="px-2.5 py-1 text-xs rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 whitespace-nowrap transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Filter rail (desktop) */}
          <aside className="hidden lg:block sticky top-4 self-start">
            {filterRail}
          </aside>

          {/* Mobile filter button + sort */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {hasFilters && (
                      <Badge className="ml-2 h-5 px-1.5">{selectedBrands.size + selectedTypes.size}</Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">{filterRail}</div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-3 ml-auto">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {isLoading ? '…' : `${totalCount} ${totalCount === 1 ? 'product' : 'products'}`}
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="h-9 px-3 rounded-md border border-border bg-background text-sm"
                >
                  <option value="default">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A → Z</option>
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2">
                {Array.from(selectedBrands).map(b => {
                  const facet = brandFacet.find(f => f.slug === b);
                  return (
                    <button
                      key={`b-${b}`}
                      className="text-xs px-2.5 py-1 rounded-full bg-primary/15 text-primary flex items-center gap-1 hover:bg-primary/25"
                      onClick={() => toggle(selectedBrands, b, setSelectedBrands)}
                    >
                      {facet?.name ?? b} <X className="h-3 w-3" />
                    </button>
                  );
                })}
                {Array.from(selectedTypes).map(t => {
                  const def = getProductType(t);
                  return (
                    <button
                      key={`t-${t}`}
                      className="text-xs px-2.5 py-1 rounded-full bg-primary/15 text-primary flex items-center gap-1 hover:bg-primary/25"
                      onClick={() => toggle(selectedTypes, t, setSelectedTypes)}
                    >
                      {def?.label ?? t} <X className="h-3 w-3" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-square rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : totalCount === 0 ? (
              <EmptyState bike={bike} hasFilters={hasFilters} onClear={() => { setSelectedBrands(new Set()); setSelectedTypes(new Set()); }} />
            ) : (
              <>
                {sortedProducts.length > 0 && (
                  <>
                    {sortedSupplemental.length > 0 && (
                      <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">In stock at Sparkling Bear</h3>
                    )}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                      {sortedProducts.map(p => (
                        <ProductCard key={p.id} product={p as Product} />
                      ))}
                    </div>
                  </>
                )}
                {sortedSupplemental.length > 0 && (
                  <>
                    <div className="mb-3">
                      <h3 className="text-xs uppercase tracking-wider text-muted-foreground">Available to order</h3>
                      <p className="text-xs text-muted-foreground/80 mt-1">
                        Sourced on request from MotoTorque, Zana, Auto Engina &amp; partner brands. Tap Inquire for availability + delivery.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {sortedSupplemental.map(s => (
                        <SupplementalProductCard key={s.slug} fitment={s} />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </StorefrontLayout>
  );
}

function EmptyState({ bike, hasFilters, onClear }: { bike: { name: string }; hasFilters: boolean; onClear: () => void }) {
  if (hasFilters) {
    return (
      <div className="text-center py-16 border border-dashed border-border/50 rounded-lg">
        <p className="text-muted-foreground mb-3">No products match your current filters.</p>
        <Button variant="outline" size="sm" onClick={onClear}>Clear filters</Button>
      </div>
    );
  }
  return (
    <div className="text-center py-16 border border-dashed border-border/50 rounded-lg">
      <p className="text-foreground font-semibold mb-1">Fitments coming soon for {bike.name}</p>
      <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
        We're sourcing accessories specific to this bike. Reach out and we'll prioritise it.
      </p>
      <Link to="/feedback" className="text-sm text-primary hover:underline">
        Request fitments for this bike →
      </Link>
    </div>
  );
}
