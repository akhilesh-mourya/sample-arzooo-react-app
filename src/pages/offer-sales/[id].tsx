import Category from '@/organisms/offer-sales/category.organism';
import Layout from '@/organisms/layout/layout.layout';
import Filters from '@/organisms/offer-sales/filters.organism';
import Categories from '@/organisms/offer-sales/categories.organism';

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
