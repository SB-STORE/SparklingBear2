import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  ChevronRight,
  Minus,
  Plus,
  Check,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Wallet,
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
import { usePageTitle } from '@/hooks/use-page-title';
import { formatPrice } from '@/lib/price';
import { SizeSelector } from '@/components/storefront/SizeSelector';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(slug);
  const { addItem } = useCart();
  usePageTitle(product?.name);
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

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: allImages.length > 0 ? allImages.map(src => src.startsWith('http') ? src : `${origin}${src}`) : undefined,
    description: product.description || undefined,
    sku: product.sku || undefined,
    brand: product.brand?.name ? { '@type': 'Brand', name: product.brand.name } : undefined,
    offers: {
      '@type': 'Offer',
      url: `${origin}/products/${product.slug}`,
      priceCurrency: 'INR',
      price: (product.price / 100).toFixed(2),
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${origin}/products` },
      ...(product.category ? [{ '@type': 'ListItem', position: 3, name: product.category.name, item: `${origin}/products?category=${product.category.slug}` }] : []),
      { '@type': 'ListItem', position: product.category ? 4 : 3, name: product.name, item: `${origin}/products/${product.slug}` },
    ],
  };

  return (
    <StorefrontLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2 mb-6 text-xs">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'on orders ₹999+' },
                { icon: Wallet, label: 'Cash on Delivery', sub: 'available' },
                { icon: RotateCcw, label: '7-Day Returns', sub: 'easy refunds' },
                { icon: ShieldCheck, label: '100% Genuine', sub: 'brand-authorized' },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-border/60 bg-card/50"
                >
                  <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="leading-tight">
                    <div className="font-semibold text-foreground">{label}</div>
                    <div className="text-[10px] text-muted-foreground">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Accordion: Details + Features + Specs + Shipping + Brand */}
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

              <AccordionItem value="specs">
                <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider">
                  Specifications
                </AccordionTrigger>
                <AccordionContent>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {product.brand?.name && (
                      <div className="flex justify-between border-b border-border/40 py-1.5">
                        <dt className="text-muted-foreground">Brand</dt>
                        <dd className="text-foreground font-medium">{product.brand.name}</dd>
                      </div>
                    )}
                    {product.category?.name && (
                      <div className="flex justify-between border-b border-border/40 py-1.5">
                        <dt className="text-muted-foreground">Category</dt>
                        <dd className="text-foreground font-medium">{product.category.name}</dd>
                      </div>
                    )}
                    {product.sku && (
                      <div className="flex justify-between border-b border-border/40 py-1.5">
                        <dt className="text-muted-foreground">SKU</dt>
                        <dd className="text-foreground font-medium">{product.sku}</dd>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-border/40 py-1.5">
                      <dt className="text-muted-foreground">Availability</dt>
                      <dd className={inStock ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>
                        {inStock ? 'In Stock' : 'Out of Stock'}
                      </dd>
                    </div>
                    {product.has_variants && product.variants && product.variants.length > 0 && (
                      <div className="flex justify-between border-b border-border/40 py-1.5 sm:col-span-2">
                        <dt className="text-muted-foreground">Sizes Available</dt>
                        <dd className="text-foreground font-medium">
                          {product.variants.map(v => v.size).join(', ')}
                        </dd>
                      </div>
                    )}
                  </dl>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      <span className="font-semibold text-foreground">Delivery:</span> Orders ship within 24–48 hours from Bangalore. Standard delivery 4–7 business days pan-India. Free shipping on orders above ₹999.
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">Cash on Delivery:</span> Available across India. Inspect the product on delivery before payment.
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">Returns:</span> 7-day easy returns from delivery date. Item must be unused, in original packaging with all tags. Helmets cannot be returned once the visor seal is broken.
                    </p>
                    <p>
                      Read the full <Link to="/shipping-policy" className="text-primary hover:underline">shipping policy</Link> and <Link to="/return-refund" className="text-primary hover:underline">return policy</Link>.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {product.brand && (
                <AccordionItem value="brand">
                  <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider">
                    About {product.brand.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      Sparkling Bear is an authorised dealer of {product.brand.name}. Every product is sourced directly from the brand or its India distributor — no greys, no replicas.
                    </p>
                    <Link
                      to={`/products?brand=${product.brand.slug}`}
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Browse all {product.brand.name} products
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
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
