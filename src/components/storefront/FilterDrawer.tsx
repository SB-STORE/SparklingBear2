import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useBrands, useCategories } from '@/hooks/use-products';
import { cn } from '@/lib/utils';

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: URLSearchParams;
  onFilterChange: (key: string, value: string) => void;
}

function FilterContent({ filters, onFilterChange, onClose, isMobile }: FilterDrawerProps & { isMobile: boolean }) {
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();

  const activeBrand = filters.get('brand') || '';
  const activeCategory = filters.get('category') || '';
  const inStockOnly = filters.get('in_stock') === '1';
  const minPrice = filters.get('min_price') || '';
  const maxPrice = filters.get('max_price') || '';

  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice ? parseInt(minPrice) : 0,
    maxPrice ? parseInt(maxPrice) : 50000,
  ]);

  useEffect(() => {
    setPriceRange([
      minPrice ? parseInt(minPrice) : 0,
      maxPrice ? parseInt(maxPrice) : 50000,
    ]);
  }, [minPrice, maxPrice]);

  const handleClearAll = () => {
    onFilterChange('brand', '');
    onFilterChange('category', '');
    onFilterChange('in_stock', '');
    onFilterChange('min_price', '');
    onFilterChange('max_price', '');
  };

  const handlePriceSliderChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const applyPriceRange = () => {
    onFilterChange('min_price', priceRange[0] > 0 ? String(priceRange[0]) : '');
    onFilterChange('max_price', priceRange[1] < 50000 ? String(priceRange[1]) : '');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleClearAll} className="text-primary text-xs">
          Clear All
        </Button>
      </div>

      <Separator className="mb-4" />

      <ScrollArea className="flex-1">
        <Accordion type="multiple" defaultValue={['availability', 'price', 'brand', 'category']} className="space-y-0">
          {/* Availability */}
          <AccordionItem value="availability">
            <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider">
              Availability
            </AccordionTrigger>
            <AccordionContent>
              <label className="flex items-center gap-2 cursor-pointer py-1">
                <Checkbox
                  checked={inStockOnly}
                  onCheckedChange={(v) => onFilterChange('in_stock', v ? '1' : '')}
                />
                <span className="text-sm text-muted-foreground">In Stock Only</span>
              </label>
            </AccordionContent>
          </AccordionItem>

          {/* Price Range */}
          <AccordionItem value="price">
            <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider">
              Price Range
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <Slider
                  min={0}
                  max={50000}
                  step={500}
                  value={priceRange}
                  onValueChange={handlePriceSliderChange}
                  onValueCommit={applyPriceRange}
                  className="mb-4"
                />
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0] || ''}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
                    }
                    onBlur={applyPriceRange}
                    className="h-8 text-sm bg-background"
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1] || ''}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])
                    }
                    onBlur={applyPriceRange}
                    className="h-8 text-sm bg-background"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Brand */}
          <AccordionItem value="brand">
            <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider">
              Brand
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {brands?.map((brand) => (
                  <label key={brand.id} className="flex items-center gap-2 cursor-pointer py-1">
                    <Checkbox
                      checked={activeBrand === brand.slug}
                      onCheckedChange={(v) => onFilterChange('brand', v ? brand.slug : '')}
                    />
                    <span className="text-sm text-muted-foreground">{brand.name}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Category */}
          <AccordionItem value="category">
            <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider">
              Category
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {categories?.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer py-1">
                    <Checkbox
                      checked={activeCategory === cat.slug}
                      onCheckedChange={(v) => onFilterChange('category', v ? cat.slug : '')}
                    />
                    <span className="text-sm text-muted-foreground">{cat.name}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>

      {/* Apply button (mobile only) */}
      {isMobile && (
        <div className="pt-4 border-t border-border mt-4">
          <Button className="w-full bg-primary hover:bg-primary/90" onClick={onClose}>
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
}

export function FilterDrawer({ open, onClose, filters, onFilterChange }: FilterDrawerProps) {
  return (
    <>
      {/* Desktop: inline sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-32">
          <FilterContent
            open={open}
            onClose={onClose}
            filters={filters}
            onFilterChange={onFilterChange}
            isMobile={false}
          />
        </div>
      </div>

      {/* Mobile: Sheet */}
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
        <SheetContent side="left" className="w-80 bg-background border-border p-4">
          <SheetHeader className="sr-only">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <FilterContent
            open={open}
            onClose={onClose}
            filters={filters}
            onFilterChange={onFilterChange}
            isMobile={true}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
