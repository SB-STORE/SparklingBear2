import { Link } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/price';
import type { Product } from '@/types';

const INQUIRY_PHONE = '+919108247377';
const INQUIRY_PHONE_DISPLAY = '+91 91082 47377';

interface QuickViewModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, open, onClose }: QuickViewModalProps) {
  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.price;

  const inquiryText = encodeURIComponent(
    `Hi Sparkling Bear, I'd like to enquire about:\n\n${product.name}${product.brand?.name ? ` (${product.brand.name})` : ''}\nMRP: ₹${product.price.toLocaleString('en-IN')}\nLink: ${typeof window !== 'undefined' ? window.location.origin : ''}/products/${product.slug}\n\nPlease confirm availability + delivery.`
  );
  const waUrl = `https://wa.me/${INQUIRY_PHONE.replace('+', '')}?text=${inquiryText}`;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-2xl bg-background border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Image */}
          <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
              />
            ) : (
              <span className="text-muted-foreground">No Image</span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {product.brand?.name && (
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {product.brand.name}
              </p>
            )}
            <h2 className="text-xl font-bold text-foreground mb-3">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.compare_at_price!)}
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-sm text-muted-foreground mb-5 line-clamp-4">
                {product.description}
              </p>
            )}

            {/* Inquiry CTAs — storefront has no checkout flow today; orders
                are confirmed in chat. */}
            <div className="flex gap-2 mb-3">
              <Button
                asChild
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Inquire on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                title={INQUIRY_PHONE_DISPLAY}
              >
                <a href={`tel:${INQUIRY_PHONE}`}>
                  <Phone className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full"
              asChild
              onClick={onClose}
            >
              <Link to={`/products/${product.slug}`}>View Full Details</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
