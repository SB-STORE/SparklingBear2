import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, LayoutGrid, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { ProductCard } from '@/components/storefront/ProductCard';
import { FilterDrawer } from '@/components/storefront/FilterDrawer';
import { BrandSlider } from '@/components/storefront/BrandSlider';
import { useProducts, useCategories, useCategory } from '@/hooks/use-products';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const categorySlug = searchParams.get('category') || undefined;
  const brandSlug = searchParams.get('brand') || undefined;
  const search = searchParams.get('search') || undefined;
  const sortBy = searchParams.get('sort') || 'default';

  const { data: categories } = useCategories();
  const { data: category } = useCategory(categorySlug);
  const { data: products, isLoading } = useProducts({
    categorySlug,
    brandSlug,
    search,
  });

  // Sort products client-side
  const sortedProducts = useMemo(() => {
    if (!products) return [];
    const arr = [...products];
    switch (sortBy) {
      case 'price-asc':
        return arr.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return arr.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return arr.reverse();
      default:
        return arr;
    }
  }, [products, sortBy]);

  // Filter by price/stock from URL params
  const filteredProducts = useMemo(() => {
    let result = sortedProducts;
    const inStockOnly = searchParams.get('in_stock') === '1';
    const minPrice = searchParams.get('min_price');
    const maxPrice = searchParams.get('max_price');

    if (inStockOnly) {
      result = result.filter((p) => p.stock_quantity > 0);
    }
    if (minPrice) {
      result = result.filter((p) => p.price >= parseInt(minPrice) * 100);
    }
    if (maxPrice) {
      result = result.filter((p) => p.price <= parseInt(maxPrice) * 100);
    }
    return result;
  }, [sortedProducts, searchParams]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset brand when changing category
    if (key === 'category') params.delete('brand');
    setSearchParams(params);
    setVisibleCount(12);
  };

  const pageTitle = category?.name || (search ? `Search: "${search}"` : 'All Products');

  return (
    <StorefrontLayout>
      {/* Collection hero */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-chrome">
            {pageTitle}
          </h1>
          {category?.description && (
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm md:text-base">
              {category.description}
            </p>
          )}

          {/* Category chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge
              variant={!categorySlug ? 'default' : 'outline'}
              className="cursor-pointer text-xs px-3 py-1"
              onClick={() => setFilter('category', '')}
            >
              All
            </Badge>
            {categories?.map((cat) => (
              <Badge
                key={cat.id}
                variant={categorySlug === cat.slug ? 'default' : 'outline'}
                className="cursor-pointer text-xs px-3 py-1"
                onClick={() => setFilter('category', cat.slug)}
              >
                {cat.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            {/* Filter button (mobile) */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setFilterOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Sort */}
          <Select
            value={sortBy}
            onValueChange={(v) => setFilter('sort', v === 'default' ? '' : v)}
          >
            <SelectTrigger className="w-[180px] h-9 text-sm bg-card border-border">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A-Z</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Content: filter sidebar + product grid */}
        <div className="flex gap-8">
          <FilterDrawer
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            filters={searchParams}
            onFilterChange={setFilter}
          />

          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
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
            ) : visibleProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Show more */}
                {hasMore && (
                  <div className="text-center mt-8">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setVisibleCount((prev) => prev + 12)}
                    >
                      Show More
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">No products found</p>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your filters or search
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchParams(new URLSearchParams());
                    setVisibleCount(12);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </StorefrontLayout>
  );
}
