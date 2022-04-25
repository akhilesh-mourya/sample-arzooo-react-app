import Layout from '@/components/organisms/layout/layout.layout';
import RegistrationTerms from '@/components/organisms/registration/registration-terms.organism';

export default function Terms() {
	return (
		<Layout classNames="mt-64" webBack>
			<RegistrationTerms />
		</Layout>
	);
}

Terms.getInitialProps = () => {
	return {
		noAuth: true,
	};
};
