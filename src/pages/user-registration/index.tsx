/**
 * User regidatration page
 */

import Registration from '@/components/organisms/registration/registration.organism';
import Layout from '@/components/organisms/layout/layout.layout';

export default function UserRegistration() {
	return (
		<Layout
			title="Registration"
			webBack={false}
			classNames="mt-64"
			style={{ backgroundColor: '#FFF' }}
		>
			<Registration />
		</Layout>
	);
}

UserRegistration.getInitialProps = () => {
	return {
		noAuth: true,
	};
};
