import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCategories, useProducts } from '@/hooks/use-products';
import { formatPrice } from '@/lib/price';
import { cn } from '@/lib/utils';

export function SearchBar({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [categorySlug, setCategorySlug] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: categories } = useCategories();
  const { data: results, isLoading } = useProducts(
    debouncedQuery.length >= 2
      ? { search: debouncedQuery, categorySlug }
      : undefined
  );

  // Navigate to category page when a category is selected from the dropdown
  const handleCategoryChange = (v: string) => {
    if (v === '__all__') {
      setCategorySlug(undefined);
    } else {
      setCategorySlug(v);
      // If no search query, navigate directly to the category
      if (!query.trim()) {
        navigate(`/products?category=${v}`);
      }
    }
  };

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Show dropdown when we have query
  useEffect(() => {
    setOpen(debouncedQuery.length >= 2);
  }, [debouncedQuery]);

  // Click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      const params = new URLSearchParams();
      params.set('search', query.trim());
      if (categorySlug) params.set('category', categorySlug);
      navigate(`/products?${params.toString()}`);
      setOpen(false);
      setQuery('');
    },
    [query, categorySlug, navigate]
  );

  const handleResultClick = () => {
    setOpen(false);
    setQuery('');
  };

  const showResults = open && debouncedQuery.length >= 2;

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-card border border-border rounded-full overflow-hidden h-10"
      >
        {/* Category dropdown - hidden on small screens */}
        <div className="hidden md:block border-r border-border">
          <Select
            value={categorySlug || '__all__'}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="border-0 bg-transparent h-10 w-[160px] rounded-none focus:ring-0 text-sm">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All Categories</SelectItem>
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-0 bg-transparent h-10 focus-visible:ring-0 flex-1 text-sm placeholder:text-muted-foreground"
        />

        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full hover:bg-primary/20"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {/* Results dropdown */}
      {showResults && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          ) : results && results.length > 0 ? (
            <div className="py-2">
              {results.slice(0, 8).map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.slug}`}
                  onClick={handleResultClick}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded bg-muted flex-shrink-0 overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        N/A
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-primary font-semibold">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
              {results.length > 8 && (
                <button
                  onClick={handleSubmit as any}
                  className="w-full text-center text-sm text-primary font-semibold py-2 hover:bg-muted/50 transition-colors"
                >
                  View all {results.length} results
                </button>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
