import Category from '@/components/organisms/category/category.organism';
import Layout from '@/components/organisms/layout/layout.layout';
import Filters from '@/components/organisms/category/filters.organism';

export default function CategoryPage() {
	return (
		<Layout webBack={false} classNames="mt-50 mb-80">
			<div className="bg-white pb-20">
				<Category />
				<Filters />
			</div>
		</Layout>
	);
}
