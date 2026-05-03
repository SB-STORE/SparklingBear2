import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Shield, Lightbulb, Briefcase, Wrench } from 'lucide-react';
import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { usePageTitle } from '@/hooks/use-page-title';
import { BIKE_BRANDS, getBrand, getBikesByBrand } from '@/data/bikes';

const POPULAR_CATEGORIES = [
  { label: 'Crash Guards', icon: Shield, href: '/products?category=bike-protection-fitments' },
  { label: 'Saddle Stays & Carriers', icon: Briefcase, href: '/products?category=bike-protection-fitments' },
  { label: 'Aux Lights', icon: Lightbulb, href: '/products?category=aux-lights' },
  { label: 'All Fitments', icon: Wrench, href: '/products?category=bike-protection-fitments' },
];

export default function BikeBrandPage() {
  const { slug: brandSlug } = useParams<{ slug: string }>();
  const brand = brandSlug ? getBrand(brandSlug) : undefined;
  const bikes = brandSlug ? getBikesByBrand(brandSlug) : [];

  usePageTitle(brand ? `${brand.name} Accessories` : 'Brand');

  if (!brand) return <Navigate to="/products" replace />;

  return (
    <StorefrontLayout>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3 text-xs text-muted-foreground flex items-center gap-1.5">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/products" className="hover:text-primary">Shop By Bike</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{brand.name}</span>
      </div>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-surface-elevated via-card to-background border-y border-border/40 overflow-hidden">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Shop By Bike</p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-gradient-chrome mb-3 leading-[1.05]">
                {brand.name}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                Pick your model to see every fitment, accessory and luggage option compatible with it.
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                <span className="text-primary font-semibold">{bikes.length}</span> models available
              </p>
            </div>
            {brand.image && (
              <div className="hidden md:block w-[260px] lg:w-[320px]">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-white">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Brand switcher strip */}
      <section className="border-b border-border/40 bg-card/30">
        <div className="container mx-auto px-4 py-4 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {BIKE_BRANDS.map(b => {
              const active = b.slug === brand.slug;
              return (
                <Link
                  key={b.slug}
                  to={`/bikes/${b.slug}`}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full border transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40'
                  }`}
                >
                  {b.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular categories — visible regardless of fitment fill-in state */}
      <section className="border-b border-border/40">
        <div className="container mx-auto px-4 py-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Popular for {brand.name} riders</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {POPULAR_CATEGORIES.map(c => (
              <Link
                key={c.label}
                to={c.href}
                className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-border/50 bg-card/40 hover:border-primary/50 hover:bg-card transition-colors"
              >
                <c.icon className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm font-semibold text-foreground group-hover:text-primary truncate">{c.label}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary ml-auto flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Model grid */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider">
            {brand.name} Models
          </h2>
          <span className="text-sm text-muted-foreground">{bikes.length} models</span>
        </div>

        {bikes.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p>No models registered for this brand yet.</p>
            <Link to="/products" className="text-primary hover:underline text-sm mt-3 inline-block">
              Browse all products →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {bikes.map(bike => (
              <Link
                key={bike.slug}
                to={`/bikes/${bike.slug}`}
                className="group bg-card rounded-xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden bg-white">
                  <img
                    src={bike.image ?? brand.image ?? '/bikes/royal-enfield.jpg'}
                    alt={bike.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 border-t border-primary/10">
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {bike.name}
                  </h3>
                  <span className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors flex items-center gap-1 mt-1">
                    View Accessories <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </StorefrontLayout>
  );
}
