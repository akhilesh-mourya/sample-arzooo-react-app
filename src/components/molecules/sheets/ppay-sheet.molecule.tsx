import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useUI } from '@/context/ui.context';
import ImageFile from '@/atoms/image.atom';
import Button from '@/atoms/button.atom';
import Rupee from '@/atoms/rupee.atom';
import { usePartialPay } from '@/api/payments/partial-pay.api';
import Spinner from '@/atoms/spinner.atom';
import { logTheEvent } from '@/helpers/scripts.helpers';

const PPay = () => {
	const {
		closeSheet,
		mop,
		setPpayBalance,
		paymentData,
		setPpayActive,
	} = useUI();
	const router = useRouter();
	const { pathname } = router;
	const { data, isLoading } = usePartialPay(paymentData.orderId);

	useEffect(() => {
		setPpayBalance(data?.partialOrderAmount);
	}, [data?.partialOrderAmount]);

	const eventHandlers = {
		ppod: () => {
			setPpayActive(true);
			closeSheet();
			logTheEvent(window, {
				clicked_on: 'user choose partial pay',
			});
			router.push(
				{
					pathname,
					query: { p_pay: true },
				},
				undefined,
				{ shallow: true },
			);
		},
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className="w-full py-20">
			<div className="flex items-center border-b border-grey-stroke py-10 px-15">
				<div className="flex" onClick={closeSheet}>
					<ImageFile src="back.svg" width={24} height={24} />
				</div>
				<div className="text-16 font-semibold leading-21 pl-20">
					Part Pay on Delivery
				</div>
			</div>
			<div className="p-15">
				<div className="flex justify-between items-center">
					<div className="text-14 font-semibold">Pay Now</div>
					<div>
						<Rupee
							className="text-16 font-bold"
							money={data?.partialOrderAmount}
						/>
					</div>
				</div>
				<div className="flex justify-between items-center mt-12 mb-20">
					<div className="text-14 font-semibold">
						Pay Remaining on Delivery
					</div>
					<div>
						<Rupee
							className="text-16 font-bold"
							money={
								paymentData.totalOrderAmount -
								data?.partialOrderAmount
							}
						/>
					</div>
				</div>
				<Button
					onClick={eventHandlers.ppod}
					className="w-full bg-blue-primary h-56 rounded-8 text-white text-16 leading-12"
				>
					Pay{' '}
					<Rupee
						className="text-16 font-bold"
						money={data?.partialOrderAmount}
					/>
				</Button>
			</div>
		</div>
	);
};

export default PPay;
