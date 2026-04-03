import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ChevronRight, Minus, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useProduct } from '@/hooks/use-products';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/price';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/Footer';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useProduct(slug);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!product) return;
    addItem(
      {
        productId: product.id,
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
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="h-96 rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const inStock = product.stock_quantity > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          <ChevronRight className="h-4 w-4" />
          {product.category && (
            <>
              <Link
                to={`/products?category=${product.category.slug}`}
                className="hover:text-foreground transition-colors"
              >
                {product.category.name}
              </Link>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-card rounded-lg border border-border p-8 flex items-center justify-center">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="max-h-96 object-contain" />
            ) : (
              <div className="h-96 w-full flex items-center justify-center text-muted-foreground">
                No Image Available
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.brand && (
              <p className="text-sm text-muted-foreground mb-1">{product.brand.name}</p>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.compare_at_price && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.compare_at_price)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

            {/* Features */}
            {product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">Features</h3>
                <ul className="space-y-1">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stock */}
            <div className="mb-6">
              {inStock ? (
                <Badge variant="outline" className="text-green-500 border-green-500">
                  In Stock ({product.stock_quantity})
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-500 border-red-500">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            {inStock && (
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                  onClick={handleAdd}
                >
                  {added ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
