import React, { Fragment, memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Lazy from '@/atoms/lazy';

const WarrantyCustomerVerify = () => {
	const router = useRouter();
	const { id } = router.query;

	const [loading, setLoading] = useState(false);
	const [erroroccured, SetErroroccured] = useState(false);

	const init = () => {
		setLoading(true);
		if (id) {
			axios
				.post(
					`${process.env.NEXT_PUBLIC_MAIN}/extendedWarranty/verifyPhoneNumber/${id}`,
					{},
				)
				.then((res) => {
					if (res.data.status !== 'success') {
						SetErroroccured(true);
					}
					setLoading(false);
				})
				.catch(() => {
					SetErroroccured(true);
					setLoading(false);
				});
		}
	};

	useEffect(init, [id]);

	return !loading ? (
		<div className="max-w-568 flex flex-col justify-center items-center h-screen">
			<div>
				<Lazy
					src={`${process.env.NEXT_PUBLIC_PATH}/native-app/icons/success-mobile.png`}
					alt="arzooo.com"
					style={{ width: '100%', height: '100%' }}
				/>
			</div>
			{erroroccured ? (
				<div> Oops! cannot able to verify the number </div>
			) : (
				<Fragment>
					<div>Your number {id ? `${id}` : ''}</div>
					<div>verified successfully!</div>
				</Fragment>
			)}
		</div>
	) : (
		<div>Loading...</div>
	);
};

WarrantyCustomerVerify.getInitialProps = () => {
	return {
		noAuth: true,
	};
};

export default memo(WarrantyCustomerVerify);
