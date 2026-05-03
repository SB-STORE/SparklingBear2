import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart, Eye,
  Lightbulb, HardHat, Shield, Briefcase, Package,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/price';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';
import { QuickViewModal } from './QuickViewModal';
import { getProductImageOverride } from '@/data/product-image-overrides';

// Icon picker for the no-image fallback. Uses category slug to keep all
// products in a category visually consistent (helmets all show helmet icon,
// aux lights all show bulb, etc.).
const CATEGORY_ICON: Record<string, typeof Shield> = {
  'aux-lights':                Lightbulb,
  'helmets':                   HardHat,
  'riding-gears-luggage':      Briefcase,
  'bike-protection-fitments':  Shield,
};

function isPlaceholderUrl(src: string | null | undefined): boolean {
  if (!src) return true;
  return src.includes('/placeholder.') || src.endsWith('placeholder.svg');
}

interface ProductCardProps {
  product: Product;
  showCompare?: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [quickView, setQuickView] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Resolve image source: live DB value, but if missing/placeholder, check
  // the slug-keyed override map for a self-hosted brand-original image.
  const override = getProductImageOverride(product.slug);
  const dbHasReal = product.image_url && !isPlaceholderUrl(product.image_url);
  const resolvedSrc = !imgError && dbHasReal
    ? product.image_url
    : (override ?? null);

  const inStock = product.has_variants
    ? (product.variants?.some(v => v.stock_quantity > 0) ?? product.stock_quantity > 0)
    : product.stock_quantity > 0;
  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.compare_at_price! - product.price) / product.compare_at_price!) * 100
      )
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // For variant products, redirect to product page to select size
    if (product.has_variants) {
      window.location.href = `/products/${product.slug}`;
      return;
    }
    addItem({
      productId: product.id,
      variantId: null,
      size: null,
      name: product.name,
      price: product.price,
      imageUrl: product.image_url,
      brandName: product.brand?.name || '',
      slug: product.slug,
    });
  };

  return (
    <>
      <Card className="bg-card border border-border/50 hover:border-primary/40 overflow-hidden group hover:shadow-[0_8px_40px_-12px_rgba(204,34,51,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
        {/* Image area */}
        <Link to={`/products/${product.slug}`} className="relative block">
          <div className="relative aspect-[4/5] bg-gradient-to-b from-white to-neutral-200 overflow-hidden border-b border-border/30">
            {resolvedSrc ? (
              <>
                <img
                  src={resolvedSrc}
                  alt={product.name}
                  className={cn(
                    'w-full h-full object-contain p-2 md:p-3 transition-all duration-500',
                    product.additional_images?.length
                      ? 'group-hover:opacity-0'
                      : 'group-hover:scale-105'
                  )}
                  loading="lazy"
                  onError={() => setImgError(true)}
                />
                {product.additional_images?.[0] && !imgError && (
                  <img
                    src={product.additional_images[0]}
                    alt={`${product.name} - angle 2`}
                    className="absolute inset-0 w-full h-full object-contain p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
              </>
            ) : (
              // No real image + no override → designed icon fallback. Brand
              // wordmark + category icon. Visually consistent across products
              // missing photography.
              (() => {
                const Icon = CATEGORY_ICON[product.category?.slug ?? ''] ?? Package;
                return (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-300 p-4">
                    <Icon className="h-14 w-14 text-neutral-400 mb-2" strokeWidth={1.25} />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold text-center">
                      {product.brand?.name ?? 'Sparkling Bear'}
                    </span>
                    <span className="text-[9px] text-neutral-400 mt-0.5">
                      Image coming soon
                    </span>
                  </div>
                );
              })()
            )}

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.is_featured && (
                <Badge className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  NEW
                </Badge>
              )}
              {hasDiscount && (
                <Badge className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  SALE -{discountPercent}%
                </Badge>
              )}
              {!inStock && (
                <Badge className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  SOLD OUT
                </Badge>
              )}
            </div>

            {/* Quick View - hover only, hidden on mobile */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickView(true);
              }}
              className={cn(
                'absolute inset-0 items-center justify-center bg-black/40 transition-opacity',
                'hidden md:flex opacity-0 group-hover:opacity-100'
              )}
            >
              <span className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">
                <Eye className="h-4 w-4" />
                Quick View
              </span>
            </button>
          </div>
        </Link>

        {/* Info area */}
        <div className="p-3 md:p-4 flex flex-col flex-1">
          {product.brand?.name && (
            <p className="text-[11px] md:text-xs text-primary/70 uppercase tracking-widest font-bold mb-1">
              {product.brand.name}
            </p>
          )}
          <Link to={`/products/${product.slug}`}>
            <h3 className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors mb-2 leading-tight">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-2 mt-auto mb-3">
            <span className="text-lg md:text-xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs md:text-sm text-muted-foreground line-through">
                {formatPrice(product.compare_at_price!)}
              </span>
            )}
          </div>

          {inStock ? (
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm h-10 rounded-full hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(204,34,51,0.3)] active:scale-95 transition-all duration-200"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.has_variants ? 'Select Size' : 'Add to Cart'}
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full text-sm h-10 rounded-full"
              asChild
            >
              <Link to={`/products/${product.slug}`}>View Details</Link>
            </Button>
          )}
        </div>
      </Card>

      <QuickViewModal
        product={product}
        open={quickView}
        onClose={() => setQuickView(false)}
      />
    </>
  );
}
