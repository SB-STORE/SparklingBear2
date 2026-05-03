import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { HeroCarousel } from '@/components/storefront/HeroCarousel';
import { TrustStrip } from '@/components/storefront/TrustStrip';
import { MosaicPromoGrid } from '@/components/storefront/MosaicPromoGrid';
import { ShopByBike } from '@/components/storefront/ShopByBike';
import { BikeAccessoryBanners } from '@/components/storefront/BikeAccessoryBanners';
import { ProductTypeGrid } from '@/components/storefront/ProductTypeGrid';
import { CategoryProductCarousel } from '@/components/storefront/CategoryProductCarousel';
import { PremiumSpotlight } from '@/components/storefront/PremiumSpotlight';
import { BrandSpotlight } from '@/components/storefront/BrandSpotlight';
import { BundlesSection } from '@/components/storefront/BundlesSection';
import { ServiceSpotlight } from '@/components/storefront/ServiceSpotlight';
import { BuyersGuides } from '@/components/storefront/BuyersGuides';
import { FeaturedCollection } from '@/components/storefront/FeaturedCollection';
import { VideoSection } from '@/components/storefront/VideoSection';
import { StatsStrip } from '@/components/storefront/StatsStrip';
import { RidersGallery } from '@/components/storefront/RidersGallery';
import { WhyChooseUs } from '@/components/storefront/WhyChooseUs';
import { TestimonialsSection } from '@/components/storefront/TestimonialsSection';
import { StoreLocation } from '@/components/storefront/StoreLocation';
import { FloatingButtons } from '@/components/storefront/FloatingButtons';
import { StickyPromoRibbon } from '@/components/storefront/StickyPromoRibbon';

const organizationSchema = {
  '@context': 'https://schema.org/',
  '@type': 'Store',
  name: 'Sparkling Bear',
  description: 'Premium motorcycle accessories and riding gear store in Bangalore. Authorized dealer for LS2, Rynox, Cramster, Studds, Axor, SMK, Moto Torque and more.',
  url: 'https://www.thesparklingbear.com/',
  logo: 'https://www.thesparklingbear.com/logo.png',
  image: 'https://www.thesparklingbear.com/preview.png',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  sameAs: [],
};
const websiteSchema = {
  '@context': 'https://schema.org/',
  '@type': 'WebSite',
  name: 'Sparkling Bear',
  url: 'https://www.thesparklingbear.com/',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.thesparklingbear.com/products?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const Index = () => {
  return (
    <StorefrontLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

      {/* ── Above the fold ── */}
      <HeroCarousel />
      <TrustStrip />

      {/* ── Bike-first navigation ── */}
      <ShopByBike />
      <BikeAccessoryBanners />

      {/* ── Browse by what you need ── */}
      <ProductTypeGrid />
      <MosaicPromoGrid />

      {/* ── Best sellers ── */}
      <FeaturedCollection title="BEST SELLERS" featured />

      {/* ── Premium tier ── */}
      <PremiumSpotlight />

      {/* ── Category-specific shelves (Autonity-style) ── */}
      <CategoryProductCarousel
        title="HELMETS"
        subtitle="LS2, Axor, SMK, Studds — ECE & ISI certified"
        categorySlug="helmets"
        background="elevated"
      />
      <CategoryProductCarousel
        title="RIDING GEAR"
        subtitle="Jackets, gloves, pants from Rynox, Cramster, Moto Torque"
        categorySlug="riding-gears-luggage"
      />
      <CategoryProductCarousel
        title="AUX LIGHTS"
        subtitle="MADDOG, HJG, Future Eyes — beam, flood & combo"
        categorySlug="aux-lights"
        background="elevated"
      />
      <CategoryProductCarousel
        title="BIKE PROTECTION"
        subtitle="Crash guards, saddle stays, top racks from Zana, Auto Engina"
        categorySlug="bike-protection-fitments"
      />

      {/* ── Bundles & service ── */}
      <BundlesSection />
      <ServiceSpotlight />

      {/* ── Brand stories ── */}
      <BrandSpotlight />

      {/* ── Stats + cinematic ── */}
      <StatsStrip />
      <VideoSection />

      {/* ── New arrivals + community ── */}
      <FeaturedCollection title="NEW ARRIVALS" featured moreLink="/products" />
      <RidersGallery />

      {/* ── Help & guides ── */}
      <BuyersGuides />

      {/* ── Trust + visit ── */}
      <WhyChooseUs />
      <TestimonialsSection />
      <StoreLocation />

      {/* ── Persistent UI ── */}
      <FloatingButtons />
      <StickyPromoRibbon />
    </StorefrontLayout>
  );
};

export default Index;
