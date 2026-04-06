import { Link } from 'react-router-dom';
import { useCategories } from '@/hooks/use-products';

const fallbackCategories = [
  { name: 'Helmets', slug: 'helmets', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80&auto=format&fit=crop', description: 'ISI & ECE certified helmets' },
  { name: 'Riding Gears', slug: 'riding-gears-luggage', image_url: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=600&q=80&auto=format&fit=crop', description: 'Jackets, gloves, boots & more' },
  { name: 'Aux Lights', slug: 'aux-lights', image_url: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80&auto=format&fit=crop', description: 'Fog lights & LED driving lights' },
  { name: 'Bike Protection', slug: 'bike-protection-fitments', image_url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80&auto=format&fit=crop', description: 'Crash guards, saddle stays & more' },
];

export function CategoryGrid() {
  const { data: dbCategories } = useCategories();
  const categories = dbCategories?.length ? dbCategories : fallbackCategories;

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-center mb-8 text-gradient-chrome">
          Shop By Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.slice(0, 4).map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group relative h-[250px] rounded-xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-500"
            >
              <img
                src={cat.image_url || fallbackCategories[0].image_url}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  {cat.name}
                </h3>
                <p className="text-sm text-white/60 mt-1">
                  {cat.description || 'Explore collection'}
                </p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-xl transition-all duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
