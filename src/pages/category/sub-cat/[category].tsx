import Layout from '@/organisms/layout/layout.layout';
import Subcat from '@/organisms/sub-cat/sub-cat.organism';

export default function SubCategoryPage() {
	return (
		<Layout webBack={false} classNames="mt-50">
			<Subcat />
		</Layout>
	);
}
