import Layout from '@/organisms/layout/layout.layout';
import All from '@/organisms/category/all.organism';

const AllCat = () => {
	return (
		<Layout title="All Categories" webBack={false} classNames="mt-50">
			<All />
		</Layout>
	);
};

export default AllCat;
