import React from 'react';
import { useRouter } from 'next/router';
import Lottie from 'react-lottie';

import Button from '@/components/atoms/button.atom';
import SuccessData from '../../../assets/lottie/Successful.json';
import SuccessData1 from '../../../assets/lottie/Registration- successful.json';

const RegistrationSuccess = () => {
	const router = useRouter();

	const defaultOptions1 = {
		loop: false,
		autoplay: true,
		animationData: SuccessData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	const defaultOptions2 = {
		loop: false,
		autoplay: true,
		animationData: SuccessData1,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	const redirection = () => {
		window.location.assign('https://app.arzooo.com/user-registration');
	};

	return (
		<div className="relative h-screen w-screen flex">
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
				<Lottie options={defaultOptions1} height="100%" width="100%" />
			</div>
			<div className="fixed h-full w-full z-1">
				<Lottie options={defaultOptions2} height="100%" width="100%" />
			</div>
			<div className="flex flex-1 flex-col justify-end h-full w-full z-2">
				<div className="text-20 leading-30 font-bold text-center tracking-0.4 mb-14">
					{router?.query?.msg === 'You are already registered with us'
						? router?.query?.msg
						: 'Registration Successful'}
				</div>
				<div className="text-grey-secondary text-11 tracking-0.22 text-center leading-16">
					You’ll get confirmation soon..!
				</div>
				<div className="mx-16 mt-64 mb-32">
					<Button
						onClick={redirection}
						className="bg-blue-primary w-full rounded-10 h-64 text-white text-16 tracking-0.32 leading-24 font-semibold"
					>
						Ok
					</Button>
				</div>
			</div>
		</div>
	);
};

export default RegistrationSuccess;
