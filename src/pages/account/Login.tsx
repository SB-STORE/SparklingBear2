import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { usePageTitle } from '@/hooks/use-page-title';

// Customer accounts are temporarily disabled while the storefront stabilises.
// Guest checkout still works — no account is required to place an order.
// Admin login at /sb-admin-panel is unaffected.

export default function CustomerLogin() {
  usePageTitle('Sign In');

  return (
    <StorefrontLayout>
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-md text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-gradient-chrome mb-3">
          Customer accounts coming soon
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          We're polishing things up. In the meantime, you can browse and check
          out as a guest — no account needed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/products">Browse Products</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/cart">Go to Cart</Link>
          </Button>
        </div>
      </div>
    </StorefrontLayout>
  );
}
