import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  ChevronRight,
  Minus,
  Plus,
  Check,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { ProductGallery } from '@/components/storefront/ProductGallery';
import { RelatedProducts } from '@/components/storefront/RelatedProducts';
import { useProduct } from '@/hooks/use-products';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/price';
import { SizeSelector } from '@/components/storefront/SizeSelector';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(slug);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<{
    id: string;
    size: string;
    stock: number;
  } | null>(null);

  const handleAdd = () => {
    if (!product) return;
    if (product.has_variants && !selectedVariant) return;
    addItem(
      {
        productId: product.id,
        variantId: selectedVariant?.id ?? null,
        size: selectedVariant?.size ?? null,
        name: product.name,
        price: product.price,
        imageUrl: product.image_url,
        brandName: product.brand?.name || '',
        slug: product.slug,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <StorefrontLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </div>
      </StorefrontLayout>
    );
  }

  if (!product) {
    return (
      <StorefrontLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </StorefrontLayout>
    );
  }

  const inStock = product.has_variants
    ? (product.variants?.some(v => v.stock_quantity > 0) ?? false)
    : product.stock_quantity > 0;
  const maxQty = selectedVariant?.stock ?? product.stock_quantity;
  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.compare_at_price! - product.price) / product.compare_at_price!) * 100
      )
    : 0;

  const allImages = [
    product.image_url,
    ...(product.additional_images || []),
  ].filter(Boolean) as string[];

  return (
    <StorefrontLayout>
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/products" className="hover:text-foreground transition-colors">
            Products
          </Link>
          {product.category && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                to={`/products?category=${product.category.slug}`}
                className="hover:text-foreground transition-colors"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Gallery */}
          <ProductGallery images={allImages.length > 0 ? allImages : ['']} />

          {/* Right: Info */}
          <div>
            {/* Badges */}
            <div className="flex items-center gap-2 mb-2">
              {product.is_featured && (
                <Badge className="bg-blue-600 text-white text-xs">NEW</Badge>
              )}
              {hasDiscount && (
                <Badge className="bg-primary text-primary-foreground text-xs">
                  SAVE {discountPercent}%
                </Badge>
              )}
              {!inStock && (
                <Badge className="bg-red-600 text-white text-xs">
                  SOLD OUT
                </Badge>
              )}
            </div>

            {/* Brand */}
            {product.brand && (
              <Link
                to={`/products?brand=${product.brand.slug}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
              >
                {product.brand.name}
              </Link>
            )}

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-1 mb-3">
              {product.name}
            </h1>

            {/* SKU */}
            {product.sku && (
              <p className="text-xs text-muted-foreground mb-3">
                SKU: {product.sku}
              </p>
            )}

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.compare_at_price!)}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="mb-6">
              {inStock ? (
                <Badge
                  variant="outline"
                  className="text-green-500 border-green-500"
                >
                  {product.has_variants
                    ? selectedVariant ? `In Stock (${selectedVariant.stock})` : 'Select a size'
                    : `In Stock (${product.stock_quantity})`
                  }
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-red-500 border-red-500"
                >
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Size Selector (for variant products) */}
            {product.has_variants && product.variants && product.variants.length > 0 && (
              <SizeSelector
                variants={product.variants}
                selectedSize={selectedVariant?.size ?? null}
                onSelect={(size, variantId, stock) => {
                  setSelectedVariant({ id: variantId, size, stock });
                  setQuantity(1);
                }}
              />
            )}

            {/* Quantity + Add to Cart */}
            {inStock && (
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() =>
                        setQuantity(
                          Math.min(maxQty, quantity + 1)
                        )
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={handleAdd}
                    disabled={product.has_variants && !selectedVariant}
                  >
                    {added ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary/10"
                    disabled={product.has_variants && !selectedVariant}
                    onClick={() => {
                      if (product.has_variants && !selectedVariant) return;
                      addItem(
                        {
                          productId: product.id,
                          variantId: selectedVariant?.id ?? null,
                          size: selectedVariant?.size ?? null,
                          name: product.name,
                          price: product.price,
                          imageUrl: product.image_url,
                          brandName: product.brand?.name || '',
                          slug: product.slug,
                        },
                        quantity
                      );
                      navigate('/checkout');
                    }}
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Buy Now
                  </Button>
                </div>
              </div>
            )}

            {/* Accordion: Details + Features */}
            <Accordion
              type="multiple"
              defaultValue={['details', 'features']}
              className="border-t border-border"
            >
              <AccordionItem value="details">
                <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider">
                  Product Details
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {product.description || 'No description available.'}
                  </p>
                </AccordionContent>
              </AccordionItem>

              {product.features && product.features.length > 0 && (
                <AccordionItem value="features">
                  <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider">
                    Features
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {product.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </div>

        {/* Related Products */}
        {product.category_id && (
          <RelatedProducts
            categoryId={product.category_id}
            currentProductId={product.id}
          />
        )}
      </div>
    </StorefrontLayout>
  );
}
