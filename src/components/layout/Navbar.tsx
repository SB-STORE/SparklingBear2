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
import { useAuth } from '@/contexts/AuthContext';
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
  const { user } = useAuth();
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

  // ── Contextual mega menu data per nav item ──
  const megaMenuData: Record<string, {
    columns: { title: string; links: { label: string; href: string }[] }[];
  }> = {
    bike: {
      columns: [
        {
          title: 'Popular Bikes',
          links: [
            { label: 'Royal Enfield', href: '/products?search=Royal+Enfield' },
            { label: 'KTM', href: '/products?search=KTM' },
            { label: 'Bajaj', href: '/products?search=Bajaj' },
            { label: 'TVS', href: '/products?search=TVS' },
            { label: 'Hero', href: '/products?search=Hero' },
            { label: 'Honda', href: '/products?search=Honda' },
          ],
        },
        {
          title: 'More Bikes',
          links: [
            { label: 'Yamaha', href: '/products?search=Yamaha' },
            { label: 'Suzuki', href: '/products?search=Suzuki' },
            { label: 'Kawasaki', href: '/products?search=Kawasaki' },
            { label: 'BMW', href: '/products?search=BMW' },
            { label: 'Ducati', href: '/products?search=Ducati' },
            { label: 'Triumph', href: '/products?search=Triumph' },
          ],
        },
        {
          title: 'Also Available',
          links: [
            { label: 'Husqvarna', href: '/products?search=Husqvarna' },
            { label: 'Jawa', href: '/products?search=Jawa' },
            { label: 'Harley-Davidson', href: '/products?search=Harley' },
            { label: 'Aprilia', href: '/products?search=Aprilia' },
            { label: 'Benelli', href: '/products?search=Benelli' },
            { label: 'CFMoto', href: '/products?search=CFMoto' },
          ],
        },
      ],
    },
    accessories: {
      columns: [
        {
          title: 'Sub-Categories',
          links: [
            { label: 'Crash Guards', href: '/products?category=bike-protection-fitments' },
            { label: 'Frame Sliders', href: '/products?category=bike-protection-fitments' },
            { label: 'Phone Mounts', href: '/products?category=bike-protection-fitments' },
            { label: 'Aux Lights', href: '/products?category=aux-lights' },
            { label: 'Mirrors & Levers', href: '/products?category=bike-protection-fitments' },
          ],
        },
        {
          title: 'Brands',
          links: [
            { label: 'Zana', href: '/products?brand=zana' },
            { label: 'MADDOG', href: '/products?brand=maddog' },
            { label: 'Moto Care', href: '/products?brand=moto-care' },
            { label: 'HJG', href: '/products?brand=hjg' },
            { label: 'FUTURE EYES', href: '/products?brand=future-eyes' },
            { label: 'Auto Engina', href: '/products?brand=auto-engina' },
          ],
        },
        {
          title: 'Quick Links',
          links: [
            { label: 'View All Accessories', href: '/products?category=bike-protection-fitments' },
            { label: 'All Brands', href: '/brands' },
          ],
        },
      ],
    },
    gear: {
      columns: [
        {
          title: 'Riding Gear',
          links: [
            { label: 'Riding Jackets', href: '/products?category=riding-gears-luggage' },
            { label: 'Riding Gloves', href: '/products?category=riding-gears-luggage' },
            { label: 'Riding Boots', href: '/products?category=riding-gears-luggage' },
            { label: 'Riding Pants', href: '/products?category=riding-gears-luggage' },
            { label: 'Rain Gear', href: '/products?category=riding-gears-luggage' },
          ],
        },
        {
          title: 'Brands',
          links: [
            { label: 'Rynox', href: '/products?brand=rynox' },
            { label: 'Cramster', href: '/products?brand=cramster' },
            { label: 'Viaterra', href: '/products?brand=viaterra' },
            { label: 'Raida', href: '/products?brand=raida' },
            { label: 'Moto Torque', href: '/products?brand=moto-torque' },
          ],
        },
        {
          title: 'Quick Links',
          links: [
            { label: 'View All Riding Gear', href: '/products?category=riding-gears-luggage' },
            { label: 'All Brands', href: '/brands' },
          ],
        },
      ],
    },
    luggage: {
      columns: [
        {
          title: 'Luggage Types',
          links: [
            { label: 'Saddle Bags', href: '/products?category=riding-gears-luggage' },
            { label: 'Tank Bags', href: '/products?category=riding-gears-luggage' },
            { label: 'Tail Bags', href: '/products?category=riding-gears-luggage' },
            { label: 'Panniers', href: '/products?category=riding-gears-luggage' },
            { label: 'Top Boxes', href: '/products?category=riding-gears-luggage' },
          ],
        },
        {
          title: 'Brands',
          links: [
            { label: 'Viaterra', href: '/products?brand=viaterra' },
            { label: 'Rynox', href: '/products?brand=rynox' },
            { label: 'Cramster', href: '/products?brand=cramster' },
            { label: 'BOBO', href: '/products?brand=bobo' },
          ],
        },
        {
          title: 'Quick Links',
          links: [
            { label: 'View All Luggage', href: '/products?category=riding-gears-luggage' },
            { label: 'All Brands', href: '/brands' },
          ],
        },
      ],
    },
    helmets: {
      columns: [
        {
          title: 'Helmet Types',
          links: [
            { label: 'Full Face Helmets', href: '/products?category=helmets' },
            { label: 'Half Face Helmets', href: '/products?category=helmets' },
            { label: 'Modular Helmets', href: '/products?category=helmets' },
            { label: 'Off-Road Helmets', href: '/products?category=helmets' },
            { label: 'Visors & Accessories', href: '/products?category=helmets' },
          ],
        },
        {
          title: 'Brands',
          links: [
            { label: 'LS2', href: '/products?brand=ls2' },
            { label: 'Axor', href: '/products?brand=axor' },
            { label: 'SMK', href: '/products?brand=smk' },
            { label: 'Studds', href: '/products?brand=studds' },
          ],
        },
        {
          title: 'Quick Links',
          links: [
            { label: 'View All Helmets', href: '/products?category=helmets' },
            { label: 'All Brands', href: '/brands' },
          ],
        },
      ],
    },
  };

  // Build mega menu content — each nav item gets unique, contextual content
  const renderMegaContent = (key: string) => {
    const menuData = megaMenuData[key];
    if (!menuData) return null;

    return (
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {menuData.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setActiveMega(null)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
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

            {/* Account icon */}
            <Button variant="ghost" size="icon" asChild>
              <Link to={user ? '/account' : '/account/login'}>
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Cart button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                  {itemCount}
                </Badge>
              )}
            </Button>
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

    {/* Cart drawer — rendered outside header to avoid Sheet nesting issues */}
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-background border-border">
        <CartDrawer onClose={() => setCartOpen(false)} />
      </SheetContent>
    </Sheet>
    </>
  );
}
