import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';

import ImageFile from '@/atoms/image.atom';
import { NETBANKING_LIST, POPULAR_BANKS } from '@/helpers/persistent.helpers';
import { useUI } from '@/context/ui.context';
import { usePaymentMutation } from '@/api/payments/submit-payment.api';
import Spinner from '@/atoms/spinner.atom';
import { useAuth } from '@/context/auth.context';
import axoisInstance from '@/services/http.service';
import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import Cashfree from '@/services/cashFree';
import { prepaidPayment } from '@/helpers/scripts.helpers';

const Netbanking = () => {
	const {
		paymentData,
		mop,
		payThru,
		toggleWallet,
		walletBalance,
		ppayActive,
		ppayBalance,
	} = useUI();
	const { session } = useAuth();
	const { mutate: submitPayment, isLoading, isError } = usePaymentMutation(
		paymentData?.isFromShipment,
		undefined,
	);
	const router = useRouter();
	const { query } = router;
	const { addToast } = useToasts();
	const [loading, setLoading] = useState<boolean>(false);

	const eventHandlers = {
		//profile submit data
		onSubmit: async (code) => {
			setLoading(true);
			const env = process.env.NODE_ENV;
			let payObj = {
				paidThrough: payThru,
				useWallet: toggleWallet,
				usedWalletBalance: walletBalance,
				// paymentMethod: {
				// 	netbanking: {
				// 		channel: 'link',
				// 		netbanking_bank_code:
				// 			env === 'development' ? 3333 : Number(code),
				// 	},
				// },
			} as any;
			if (paymentData?.isFromShipment) {
				payObj.sellerId = session.user_id;
				payObj.shipmentsData = paymentData?.shipmentsData;
				payObj.totalAmount = paymentData?.totalOrderAmount;
			} else {
				payObj.mop = mop;
				payObj.orderId = paymentData?.orderId;
				payObj.paymentRefId = null;
				payObj.partialOrderAmount = ppayActive ? ppayBalance : 0;
				payObj.totalOrderAmount = paymentData?.totalOrderAmount;
			}
			// submitPayment(payObj);
			try {
				const response = await axoisInstance.post(
					`${process.env.NEXT_PUBLIC_MAIN}${
						paymentData?.isFromShipment
							? API_ENDPOINTS.CREDIT_PAYMENT_SHIPMENTS
							: API_ENDPOINTS.CREDIT_PAYMENT_ORDER
					}`,
					payObj,
				);
				if (response?.data?.status === 'success') {
					const {
						appId,
						orderId,
						orderAmount,
						customerName,
						customerPhone,
						customerEmail,
						shipmentCallbackUrl,
						orderCallbackUrl,
						orderNote,
						paymentToken,
					} = response?.data?.data;
					const data = {
						appId,
						orderId,
						orderAmount,
						customerName,
						customerPhone,
						customerEmail,
						notifyUrl: paymentData?.isFromShipment
							? shipmentCallbackUrl
							: orderCallbackUrl,
						returnUrl: paymentData?.isFromShipment
							? shipmentCallbackUrl
							: orderCallbackUrl,
						// notifyUrl: orderDetails.isFromEW ? "https://test.arzooo.com/extendedWarranty/cashfree/callback" : (props.isFromShipment ?  "https://test.arzooo.com/arzoooPayments/cashfree/shipment/callback" : "https://test.arzooo.com/arzoooPayments/cashfree/order/callback"),
						// returnUrl: orderDetails.isFromEW ? "https://test.arzooo.com/extendedWarranty/cashfree/callback" : (props.isFromShipment ?  "https://test.arzooo.com/arzoooPayments/cashfree/shipment/callback" : "https://test.arzooo.com/arzoooPayments/cashfree/order/callback"),
						orderNote: orderNote,
						orderCurrency: 'INR',
						paymentToken: paymentToken,
						source: 'woocommerce',
						paymentOption: 'nb',
						nb: { code },
					};
					setLoading(false);
					prepaidPayment(window, data, paymentData);
					// const resp = (await Cashfree.paySeamless(data, '')) as any;
					// const { status, url, msg } = resp;
					// if (status === 'success') {
					// 	window.location.href = url;
					// } else {
					// 	setLoading(false);
					// 	addToast(msg);
					// }
				} else {
					setLoading(false);
					addToast(response?.data?.msg);
				}
			} catch (error) {
				setLoading(false);
				addToast('Network Error.');
			}
		},
	};

	if (isLoading || loading) {
		return <Spinner />;
	}

	return (
		<div className="mx-12 bg-white my-15 rounded-6">
			<div className="flex px-12 py-10 border-b border-grey-stroke">
				{POPULAR_BANKS.map((bank) => {
					return (
						<div
							className="flex-1 flex justify-center items-center flex-col"
							key={bank.value}
							onClick={() => eventHandlers.onSubmit(bank.value)}
						>
							<ImageFile
								icon="images"
								src={`${bank.name}.png`}
								alt={bank.name}
								quality={75}
								width={30}
								height={30}
								objectFit="contain"
							/>
							<div className="mt-8 text-14 leading-24">
								{bank.name}
							</div>
						</div>
					);
				})}
			</div>
			<div>
				{NETBANKING_LIST.map((bank) => {
					return (
						<div
							key={bank.value}
							onClick={() => eventHandlers.onSubmit(bank.value)}
							className="flex justify-between items-center px-12 py-8 border-b border-grey-stroke"
						>
							<div className="text-14 leading-24">
								{bank.name}
							</div>
							<ImageFile
								src="Right.svg"
								alt={bank.name}
								width={24}
								height={24}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Netbanking;
