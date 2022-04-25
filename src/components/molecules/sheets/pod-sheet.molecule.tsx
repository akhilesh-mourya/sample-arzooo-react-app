import React from 'react';
import { useForm } from 'react-hook-form';

import { useUI } from '@/context/ui.context';
import ImageFile from '@/atoms/image.atom';
import Button from '@/atoms/button.atom';
import Rupee from '@/atoms/rupee.atom';
import { usePaymentMutation } from '@/api/payments/submit-payment.api';
import { logTheEvent } from '@/helpers/scripts.helpers';

const Pod = () => {
	const {
		closeSheet,
		mop,
		payThru,
		toggleWallet,
		walletBalance,
		paymentData,
		totalAmount,
		ppayActive,
		ppayBalance,
	} = useUI();
	const { mutate: submitPayment, isLoading, isError } = usePaymentMutation(
		paymentData.isFromShipment,
		undefined,
	);

	const eventHandlers = {
		onSubmit: () => {
			const payObj = {
				mop,
				paidThrough: payThru,
				useWallet: toggleWallet,
				usedWalletBalance: walletBalance,
				orderId: paymentData.orderId,
				paymentRefId: null,
				partialOrderAmount: ppayActive ? ppayBalance : 0,
				totalOrderAmount: paymentData.totalOrderAmount,
			};
			logTheEvent(window, {
				mop: mop,
				pay_through: payThru,
				payment_data: payObj,
			});
			submitPayment(payObj);
		},
	};

	return (
		<div className="w-full py-20">
			<div className="flex items-center border-b border-grey-stroke py-10 px-15">
				<div className="flex" onClick={closeSheet}>
					<ImageFile src="back.svg" width={24} height={24} />
				</div>
				<div className="text-16 font-semibold leading-21 pl-20">
					Pay on Delivery
				</div>
			</div>
			<div className="p-15">
				<div className="mb-24 text-center text-14 font-medium">
					Are you sure you want to continue?
				</div>
				<div className="flex">
					<Button
						className="flex-1 flex justify-center items-center text-14 font-medium"
						onClick={closeSheet}
					>
						Cancel
					</Button>
					<Button
						disabled={isLoading}
						loading={isLoading}
						className="flex-1 uppercase bg-blue-primary h-56 rounded-8 text-white text-16 leading-12"
						onClick={eventHandlers.onSubmit}
					>
						pay{' '}
						<Rupee className="font-semibold" money={totalAmount} />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Pod;
