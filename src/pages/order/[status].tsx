import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import Loader from '@/atoms/spinner.atom';

const PaymentStatus = dynamic(() => import('@/organisms/paymentStatus'), {
	loading: () => <Loader />,
	ssr: false,
});

const Status = () => {
	let url;
	const router = useRouter();

	useEffect(() => {
		url = window.location.href;
	}, [router.query.status]);

	return (
		<>
			<PaymentStatus router={router} />
		</>
	);
};

Status.getInitialProps = () => {
	return {
		noAuth: true,
	};
};

export default Status;
