import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { HeroCarousel } from '@/components/storefront/HeroCarousel';
import { BrandSlider } from '@/components/storefront/BrandSlider';
import { GridBanner } from '@/components/storefront/GridBanner';
import { FeaturedCollection } from '@/components/storefront/FeaturedCollection';
import { CategoryIconSlider } from '@/components/storefront/CategoryIconSlider';
import { VideoSection } from '@/components/storefront/VideoSection';
import { CustomerServiceIcons } from '@/components/storefront/CustomerServiceIcons';
import { useCategories } from '@/hooks/use-products';

const bannerMotorcycleImg = 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1920&q=80&auto=format&fit=crop';
const bannerRidingGearImg = 'https://images.unsplash.com/photo-1580310614729-ccd69652491d?w=1920&q=80&auto=format&fit=crop';

function SectionDivider() {
  return <div className="section-divider" />;
}

const Index = () => {
  const { data: categories } = useCategories();

  return (
    <StorefrontLayout>
      <HeroCarousel />
      <BrandSlider />
      <SectionDivider />
      <GridBanner
        title="MOTORCYCLE ACCESSORIES"
        image={bannerMotorcycleImg}
        link="/products?category=bike-protection-fitments"
      />
      <FeaturedCollection title="NEW ARRIVALS" featured />
      <SectionDivider />
      <CategoryIconSlider
        title="SHOP BY CATEGORY"
        categories={categories || []}
      />
      <SectionDivider />
      <GridBanner
        title="RIDING GEARS"
        image={bannerRidingGearImg}
        link="/products?category=riding-gears-luggage"
      />
      <SectionDivider />
      <VideoSection />
      <CustomerServiceIcons />
    </StorefrontLayout>
  );
};

export default Index;
