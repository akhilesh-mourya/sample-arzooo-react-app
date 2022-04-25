import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Verify = () => {
	const [verified, setVerified] = useState(false);
	const router = useRouter();
	const styles = {
		fontSize: '30px',
		fontWeight: 600,
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		height: '100%',
	};

	useEffect(() => {
		if (router.query.tokens) {
			axios
				.post(
					`https://m.arzooo.com/user/verifyEmail?token=${router.query.tokens}`,
				)
				.then((res) => {
					if (res && res.data && res.data.status === 200) {
						setVerified(true);
					} else {
						setVerified(false);
					}

					setTimeout(function () {
						window.close();
					}, 3000);
				});
		} else {
			alert('Token error');
		}
	}, [router.query.tokens]);

	return (
		<div style={styles}>
			{verified
				? 'Your Email ID has been verified successfully!'
				: 'We cannot verify your Email ID. Please try again.'}
		</div>
	);
};

Verify.getInitialProps = () => {
	return {
		noAuth: true,
	};
};

export default Verify;
