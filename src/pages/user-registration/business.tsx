import RegistrationBusiness from '@/components/organisms/registration/registration-business.organism';
import Layout from '@/components/organisms/layout/layout.layout';

export default function Business() {
	return (
		<Layout
			title="Registration"
			style={{ backgroundColor: '#FFF' }}
			classNames="mt-64"
			webBack
		>
			<RegistrationBusiness />
		</Layout>
	);
}

Business.getInitialProps = () => {
	return {
		noAuth: true,
	};
};
