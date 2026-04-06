import { cn } from '@/lib/utils';
import type { ProductVariantRow } from '@/types';

interface SizeSelectorProps {
  variants: ProductVariantRow[];
  selectedSize: string | null;
  onSelect: (size: string, variantId: string, stock: number) => void;
}

export function SizeSelector({ variants, selectedSize, onSelect }: SizeSelectorProps) {
  const sortedVariants = [...variants].sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="mb-5">
      <p className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
        Select Size
      </p>
      <div className="flex flex-wrap gap-2">
        {sortedVariants.map((v) => {
          const outOfStock = v.stock_quantity <= 0;
          const isSelected = selectedSize === v.size;

          return (
            <button
              key={v.id}
              disabled={outOfStock}
              onClick={() => onSelect(v.size, v.id, v.stock_quantity)}
              className={cn(
                'relative min-w-[48px] h-11 px-4 rounded-lg border text-sm font-semibold transition-all duration-200',
                isSelected
                  ? 'bg-primary text-primary-foreground border-primary ring-2 ring-primary/30'
                  : outOfStock
                    ? 'bg-muted/30 text-muted-foreground/40 border-border/30 cursor-not-allowed line-through'
                    : 'bg-card text-foreground border-border hover:border-primary/50 hover:bg-primary/5'
              )}
            >
              {v.size}
              {outOfStock && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500" />
              )}
            </button>
          );
        })}
      </div>
      {selectedSize && (
        <p className="text-xs text-muted-foreground mt-2">
          {variants.find(v => v.size === selectedSize)?.stock_quantity || 0} in stock
        </p>
      )}
    </div>
  );
}
