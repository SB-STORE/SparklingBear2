import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { HeroCarousel } from '@/components/storefront/HeroCarousel';
import { TrustStrip } from '@/components/storefront/TrustStrip';
import { MosaicPromoGrid } from '@/components/storefront/MosaicPromoGrid';
import { ShopByBike } from '@/components/storefront/ShopByBike';
import { BrandSlider } from '@/components/storefront/BrandSlider';
import { FeaturedCollection } from '@/components/storefront/FeaturedCollection';
import { PromoBanner } from '@/components/storefront/PromoBanner';
import { VideoSection } from '@/components/storefront/VideoSection';
import { StatsStrip } from '@/components/storefront/StatsStrip';
import { ServiceShowcase } from '@/components/storefront/ServiceShowcase';
import { RidersGallery } from '@/components/storefront/RidersGallery';
import { WhyChooseUs } from '@/components/storefront/WhyChooseUs';
import { TestimonialsSection } from '@/components/storefront/TestimonialsSection';
import { StoreLocation } from '@/components/storefront/StoreLocation';
import { FloatingButtons } from '@/components/storefront/FloatingButtons';

const Index = () => {
  return (
    <StorefrontLayout>
      <HeroCarousel />
      <TrustStrip />
      <MosaicPromoGrid />
      <ShopByBike />
      <FeaturedCollection title="BEST SELLERS" featured />
      <StatsStrip />
      <VideoSection />
      <ServiceShowcase />
      <BrandSlider />
      <FeaturedCollection title="NEW ARRIVALS" featured moreLink="/products" />
      <RidersGallery />
      <WhyChooseUs />
      <TestimonialsSection />
      <StoreLocation />
      <FloatingButtons />
    </StorefrontLayout>
  );
};

export default Index;
