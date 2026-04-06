import { StorefrontLayout } from '@/components/layout/StorefrontLayout';
import { HeroCarousel } from '@/components/storefront/HeroCarousel';
import { BrandSlider } from '@/components/storefront/BrandSlider';
import { FeaturedCollection } from '@/components/storefront/FeaturedCollection';
import { CustomerServiceIcons } from '@/components/storefront/CustomerServiceIcons';

function SectionDivider() {
  return <div className="section-divider" />;
}

const Index = () => {
  return (
    <StorefrontLayout>
      <HeroCarousel />
      <BrandSlider />
      <SectionDivider />
      <FeaturedCollection title="NEW ARRIVALS" featured />
      <SectionDivider />
      <CustomerServiceIcons />
    </StorefrontLayout>
  );
};

export default Index;
