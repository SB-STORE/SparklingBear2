import { Link } from 'react-router-dom';
import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <StorefrontLayout>
      <div className="container mx-auto px-4 py-20 md:py-32 text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-gradient-chrome mb-4">
          404
        </h1>
        <p className="text-xl md:text-2xl text-foreground mb-2">
          Page Not Found
        </p>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/products">
              <Search className="mr-2 h-4 w-4" />
              Browse Products
            </Link>
          </Button>
        </div>
      </div>
    </StorefrontLayout>
  );
};

export default NotFound;
