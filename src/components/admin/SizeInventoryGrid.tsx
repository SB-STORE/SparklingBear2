import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PRODUCT_SIZES } from '@/types';

export interface VariantState {
  size: string;
  stock_quantity: number;
}

interface SizeInventoryGridProps {
  variants: VariantState[];
  onChange: (variants: VariantState[]) => void;
}

export function SizeInventoryGrid({ variants, onChange }: SizeInventoryGridProps) {
  // Ensure all sizes exist
  const allVariants: VariantState[] = PRODUCT_SIZES.map((size) => {
    const existing = variants.find((v) => v.size === size);
    return existing || { size, stock_quantity: 0 };
  });

  const updateStock = (size: string, value: number) => {
    const updated = allVariants.map((v) =>
      v.size === size ? { ...v, stock_quantity: Math.max(0, value) } : v
    );
    onChange(updated);
  };

  const totalStock = allVariants.reduce((sum, v) => sum + v.stock_quantity, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Size-wise Inventory</label>
        <span className="text-xs text-muted-foreground">
          Total: <strong className="text-foreground">{totalStock}</strong> units
        </span>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/30">
              <th className="px-4 py-2 text-left font-semibold text-muted-foreground">Size</th>
              <th className="px-4 py-2 text-center font-semibold text-muted-foreground">Stock</th>
              <th className="px-4 py-2 text-center font-semibold text-muted-foreground">Adjust</th>
            </tr>
          </thead>
          <tbody>
            {allVariants.map((v) => (
              <tr key={v.size} className="border-t border-border">
                <td className="px-4 py-2 font-semibold text-foreground">{v.size}</td>
                <td className="px-4 py-2">
                  <Input
                    type="number"
                    min={0}
                    value={v.stock_quantity}
                    onChange={(e) => updateStock(v.size, parseInt(e.target.value) || 0)}
                    className="w-20 mx-auto text-center h-8"
                  />
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateStock(v.size, v.stock_quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateStock(v.size, v.stock_quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
