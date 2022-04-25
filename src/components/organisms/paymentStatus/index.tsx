import React, { useEffect } from 'react';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import Lottie from 'react-lottie';
import cn from 'classnames';

import SuccessData from '../../../assets/lottie/Successful.json';
import SuccessData1 from '../../../assets/lottie/Registration- successful.json';
import { handleRedirection } from '@/helpers/scripts.helpers';

const Status = ({ router }) => {
	const Image = dynamic(() => import('next/image'));

	useEffect(() => {}, [router.query.status]);

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

	return (
		<div className="relative h-screen w-screen flex">
			<div className="flex flex-col justify-center w-full">
				{router.query.status === 'success' ? (
					<>
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
							<Lottie
								options={defaultOptions1}
								height="100%"
								width="100%"
							/>
						</div>
						<div className="fixed h-full w-full z-1">
							<Lottie
								options={defaultOptions2}
								height="100%"
								width="100%"
							/>
						</div>
					</>
				) : router.query.status === 'inprogress' ? (
					<div className="text-center">
						<Image
							src="/images/payment-pending.gif"
							alt="payments"
							quality={75}
							width={200}
							height={200}
						/>
					</div>
				) : (
					<div className="text-center">
						<Image
							src="/images/card-payment-unsuccessful.gif"
							alt="payments"
							quality={75}
							width={200}
							height={200}
						/>
					</div>
				)}
				<div
					className={cn(
						router.query.status === 'success'
							? 'flex flex-1 flex-col items-center justify-end h-full w-full z-2 mb-150 px-10'
							: 'flex-0',
					)}
				>
					<h1
						className={
							router.query.status === 'success'
								? 'text-20'
								: 'text-16 px-10 mb-20 text-red'
						}
					>
						{router.query.status &&
						router.query.status === 'success'
							? 'Your payment is successful'
							: router?.query?.errorMessage}
					</h1>
					{router.query.status &&
						router.query.amount &&
						router.query.orderId && (
							<>
								<>
									{router.query.status === 'success' ? (
										<div className="text-14">
											Amount Paid - Rs.
											{router.query.amount &&
												router.query.amount}
										</div>
									) : null}
								</>
								<div className="text-14">
									Reference ID -{' '}
									{router.query.orderId &&
										router.query.orderId}
								</div>
							</>
						)}
					<div className="text-14 text-center">
						Payment Date -{' '}
						{format(new Date(), "MMM do yyy, h:mmaaaaa'm'")}
					</div>
					{router.query.status === 'inprogress' && (
						<div className="text-14 text-center">
							Your Payment is in Progress, Please check your
							payment status again in 30 minutes!
						</div>
					)}
				</div>
				<div className="fixed bottom-0 z-1 w-full flex justify-between items-center h-54 shadow-2">
					<div
						onClick={() => handleRedirection(window, 'home')}
						className="flex-1 flex items-center justify-center bg-white h-full text-grey-primary text-14 font-semibold uppercase"
					>
						Go to Homepage
					</div>
					{router.query.status === 'success' ||
					router.query.status === 'inprogress' ? (
						<div
							onClick={() => handleRedirection(window, 'orders')}
							className="flex-1 flex items-center justify-center bg-blue-primary h-full text-white text-14 font-semibold uppercase"
						>
							My Orders
						</div>
					) : (
						<div
							onClick={() => router.back()}
							className="flex-1 flex items-center justify-center bg-blue-primary h-full text-white text-14 font-semibold uppercase"
						>
							Go Back
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Status;
