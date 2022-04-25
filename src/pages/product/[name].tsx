import Layout from '@/organisms/layout/layout.layout';
import Product from '@/organisms/product/product.organism';

export default function ProductPage() {
	return (
		<Layout webBack={false} showShare showCart>
			<Product />
		</Layout>
	);
}
