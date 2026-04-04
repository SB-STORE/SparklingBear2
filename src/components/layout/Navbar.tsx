import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  Menu,
  Search,
  User,
  ChevronDown,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useCart } from '@/contexts/CartContext';
import { useCategories, useBrands } from '@/hooks/use-products';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchBar } from '@/components/storefront/SearchBar';
import { cn } from '@/lib/utils';

// Static nav structure
const NAV_ITEMS = [
  {
    label: 'SHOP BY BIKE',
    href: '/products',
    megaKey: 'bike',
  },
  {
    label: 'MOTORCYCLE ACCESSORIES',
    href: '/products?category=bike-protection-fitments',
    megaKey: 'accessories',
  },
  {
    label: 'RIDING GEARS',
    href: '/products?category=riding-gears-luggage',
    megaKey: 'gear',
  },
  {
    label: 'LUGGAGE & TOURING',
    href: '/products?category=luggage-touring',
    megaKey: 'luggage',
  },
  {
    label: 'HELMETS & ACCESSORIES',
    href: '/products?category=helmets',
    megaKey: 'helmets',
  },
  {
    label: 'BRANDS',
    href: '/brands',
    megaKey: null, // no mega menu, just a link
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();
  const { itemCount } = useCart();
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const location = useLocation();

  // Close mega on route change
  useEffect(() => {
    setActiveMega(null);
    setMobileOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMegaEnter = (key: string | null) => {
    if (!key) return;
    clearTimeout(megaTimeout.current);
    setActiveMega(key);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 200);
  };

  // Map mega keys to their relevant category slug
  const megaCategoryMap: Record<string, string | undefined> = {
    accessories: 'bike-protection-fitments',
    gear: 'riding-gears-luggage',
    luggage: 'luggage-touring',
    helmets: 'helmets',
  };

  // Build mega menu content based on which nav item is hovered
  const renderMegaContent = (key: string) => {
    const cats = categories || [];
    const brandList = brands || [];
    const relevantCatSlug = megaCategoryMap[key];

    // Popular bike makes for "SHOP BY BIKE"
    const bikeList = [
      'Royal Enfield', 'KTM', 'Bajaj', 'TVS', 'Hero',
      'Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'BMW',
      'Ducati', 'Triumph', 'Husqvarna', 'Jawa', 'Harley-Davidson',
      'Aprilia', 'Benelli', 'CFMoto',
    ];

    // "SHOP BY BIKE" — show bike makes + categories + quick links
    if (key === 'bike') {
      return (
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="col-span-2">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
                Select Your Bike
              </h4>
              <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                {bikeList.map((bike) => (
                  <Link
                    key={bike}
                    to={`/products?search=${encodeURIComponent(bike)}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setActiveMega(null)}
                  >
                    {bike}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
                Categories
              </h4>
              <ul className="space-y-2">
                {cats.slice(0, 6).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      to={`/products?category=${cat.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setActiveMega(null)}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/products"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setActiveMega(null)}
                  >
                    View All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/brands"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setActiveMega(null)}
                  >
                    All Brands
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products?featured=true"
                    className="text-sm text-primary font-semibold hover:underline"
                    onClick={() => setActiveMega(null)}
                  >
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Other menus — show the specific category highlighted + relevant brands
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Categories column — highlight the relevant one */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2">
              {cats.slice(0, 8).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className={`text-sm transition-colors ${
                      cat.slug === relevantCatSlug
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                    onClick={() => setActiveMega(null)}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Brands columns */}
          <div className="col-span-2">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
              Popular Brands
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {brandList.slice(0, 12).map((brand) => (
                <Link
                  key={brand.id}
                  to={`/products?brand=${brand.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setActiveMega(null)}
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick link */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to={relevantCatSlug ? `/products?category=${relevantCatSlug}` : '/products'}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setActiveMega(null)}
                >
                  View All {NAV_ITEMS.find(n => n.megaKey === key)?.label || 'Products'}
                </Link>
              </li>
              <li>
                <Link
                  to="/products?featured=true"
                  className="text-sm text-primary font-semibold hover:underline"
                  onClick={() => setActiveMega(null)}
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="relative z-40">
      {/* Tier 2: Main header bar */}
      <div
        className={cn(
          'h-16 bg-background border-b border-border transition-all duration-300',
          scrolled && 'fixed top-0 left-0 right-0 z-50 shadow-lg'
        )}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4">
          {/* Left: hamburger (mobile) + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-background border-border p-0">
                <SheetHeader className="p-4 border-b border-border">
                  <SheetTitle>
                    <Link
                      to="/"
                      className="text-xl font-bold text-gradient-chrome"
                      onClick={() => setMobileOpen(false)}
                    >
                      SPARKLING BEAR
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                  <Accordion type="single" collapsible className="space-y-0">
                    {NAV_ITEMS.map((item) =>
                      item.megaKey ? (
                        <AccordionItem key={item.label} value={item.label}>
                          <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider py-3">
                            {item.label}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pl-2 space-y-2">
                              <Link
                                to={item.href}
                                className="block text-sm text-primary font-semibold py-1"
                                onClick={() => setMobileOpen(false)}
                              >
                                View All
                              </Link>
                              {categories?.slice(0, 6).map((cat) => (
                                <Link
                                  key={cat.id}
                                  to={`/products?category=${cat.slug}`}
                                  className="block text-sm text-muted-foreground hover:text-foreground py-1"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {cat.name}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="flex items-center text-sm font-semibold uppercase tracking-wider py-3 text-foreground hover:text-primary transition-colors border-b border-border"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link to="/" className="text-xl md:text-2xl font-bold text-gradient-chrome whitespace-nowrap">
              SPARKLING BEAR
            </Link>
          </div>

          {/* Center: SearchBar (desktop) */}
          <div className="hidden md:block flex-1 max-w-xl mx-4">
            <SearchBar />
          </div>

          {/* Right: icons */}
          <div className="flex items-center gap-1">
            {/* Mobile search */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              {mobileSearchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>

            {/* User icon — links to products, not admin */}
            <Button variant="ghost" size="icon" asChild>
              <Link to="/products">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Cart */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md bg-background border-border">
                <CartDrawer onClose={() => setCartOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile search bar (slides down) */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 pb-3 bg-background border-b border-border">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Tier 3: Navigation bar (desktop only) */}
      <nav
        className={cn(
          'hidden lg:block h-11 bg-card/50 border-b border-border',
          scrolled && 'fixed top-16 left-0 right-0 z-50'
        )}
        onMouseLeave={handleMegaLeave}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-center gap-1">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => handleMegaEnter(item.megaKey)}
            >
              <Link
                to={item.href}
                className={cn(
                  'flex items-center gap-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors',
                  activeMega === item.megaKey && 'text-primary'
                )}
              >
                {item.label}
                {item.megaKey && <ChevronDown className="h-3 w-3" />}
              </Link>
            </div>
          ))}
        </div>

        {/* Mega dropdown */}
        {activeMega && (
          <div
            className="absolute top-full left-0 right-0 bg-popover border-b border-border shadow-lg z-50"
            onMouseEnter={() => {
              clearTimeout(megaTimeout.current);
            }}
            onMouseLeave={handleMegaLeave}
          >
            {renderMegaContent(activeMega)}
          </div>
        )}
      </nav>

      {/* Spacer for fixed header when scrolled */}
      {scrolled && <div className="h-16 lg:h-[108px]" />}
    </header>
  );
}
