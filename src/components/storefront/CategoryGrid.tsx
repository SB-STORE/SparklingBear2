import { Link } from 'react-router-dom';
import { useCategories } from '@/hooks/use-products';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const fallbackCategories = [
  { name: 'Helmets', slug: 'helmets', image_url: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=600&q=80&auto=format&fit=crop', description: 'ISI & ECE certified helmets' },
  { name: 'Riding Gears', slug: 'riding-gears-luggage', image_url: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=600&q=80&auto=format&fit=crop', description: 'Jackets, gloves, boots & more' },
  { name: 'Aux Lights', slug: 'aux-lights', image_url: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80&auto=format&fit=crop', description: 'Fog lights & LED driving lights' },
  { name: 'Bike Protection', slug: 'bike-protection-fitments', image_url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80&auto=format&fit=crop', description: 'Crash guards, saddle stays & more' },
];

export function CategoryGrid() {
  const { data: dbCategories } = useCategories();
  const categories = dbCategories?.length ? dbCategories : fallbackCategories;
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-10 md:py-14" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-xl md:text-2xl font-bold uppercase tracking-wider text-center mb-8 text-gradient-chrome transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Shop By Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.slice(0, 4).map((cat, i) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className={`group relative h-[250px] rounded-xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 120}ms` : '0ms' }}
            >
              <img
                src={cat.image_url || fallbackCategories[0].image_url}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.15]"
                style={{ transform: 'scale(1.01)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/95" />
              <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  {cat.name}
                </h3>
                <p className="text-sm text-white/60 mt-1 transition-colors duration-300 group-hover:text-white/80">
                  {cat.description || 'Explore collection'}
                </p>
                <span className="inline-block mt-2 text-xs text-primary font-semibold uppercase tracking-wider opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Shop Now &rarr;
                </span>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-xl transition-all duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
