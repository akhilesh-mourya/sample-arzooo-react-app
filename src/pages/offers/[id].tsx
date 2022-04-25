import Category from '@/organisms/offers/category.organism';
import Layout from '@/organisms/layout/layout.layout';
import Filters from '@/organisms/offers/filters.organism';
import Categories from '@/organisms/offers/categories.organism';

export default function CategoryPage() {
	return (
		<Layout webBack={false} classNames="mt-50">
			<div className="bg-white">
				<Categories />
				<Category />
				<Filters />
			</div>
		</Layout>
	);
}
