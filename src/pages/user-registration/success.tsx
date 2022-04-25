import RegistrationSuccess from '@/organisms/registration/registration-success.organism';

export default function Success() {
	return <RegistrationSuccess />;
}

Success.getInitialProps = () => {
	return {
		noAuth: true,
	};
};
