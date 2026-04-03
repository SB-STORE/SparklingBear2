import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useProducts, useCategories, useBrandsByCategory } from '@/hooks/use-products';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/price';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/Footer';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get('category') || undefined;
  const brandSlug = searchParams.get('brand') || undefined;
  const [search, setSearch] = useState('');

  const { data: categories, isLoading: catsLoading } = useCategories();
  const { data: brands } = useBrandsByCategory(categorySlug);
  const { data: products, isLoading } = useProducts({ categorySlug, brandSlug, search: search || undefined });
  const { addItem } = useCart();

  const setFilter = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    if (key === 'category') params.delete('brand');
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-chrome mb-8">Products</h1>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            variant={!categorySlug ? 'default' : 'outline'}
            className="cursor-pointer text-sm px-4 py-1.5"
            onClick={() => setFilter('category', undefined)}
          >
            All
          </Badge>
          {catsLoading
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-8 w-24 rounded-full" />)
            : categories?.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={categorySlug === cat.slug ? 'default' : 'outline'}
                  className="cursor-pointer text-sm px-4 py-1.5"
                  onClick={() => setFilter('category', cat.slug)}
                >
                  {cat.name}
                </Badge>
              ))}
        </div>

        {/* Brand Filters */}
        {brands && brands.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge
              variant={!brandSlug ? 'secondary' : 'outline'}
              className="cursor-pointer text-xs px-3 py-1"
              onClick={() => setFilter('brand', undefined)}
            >
              All Brands
            </Badge>
            {brands.map((brand) => (
              <Badge
                key={brand.id}
                variant={brandSlug === brand.slug ? 'secondary' : 'outline'}
                className="cursor-pointer text-xs px-3 py-1"
                onClick={() => setFilter('brand', brand.slug)}
              >
                {brand.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="bg-card border border-border overflow-hidden hover:shadow-elevated transition-all duration-300 group"
              >
                <Link to={`/products/${product.slug}`}>
                  <div className="relative h-64 overflow-hidden bg-muted">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No Image
                      </div>
                    )}
                    {product.is_featured && (
                      <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{product.brand?.name}</p>
                  <Link to={`/products/${product.slug}`}>
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-lg font-bold text-primary mb-3">{formatPrice(product.price)}</p>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() =>
                      addItem({
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.image_url,
                        brandName: product.brand?.name || '',
                        slug: product.slug,
                      })
                    }
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No products found</p>
            <p className="text-muted-foreground mt-2">Try adjusting your filters or search</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
