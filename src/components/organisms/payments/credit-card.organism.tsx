import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import SafePayments from '@/atoms/safe-payments.atom';
import Card from '@/molecules/payments/card.molecule';
import { useUI } from '@/context/ui.context';
import { usePaymentMutation } from '@/api/payments/submit-payment.api';
import { useAuth } from '@/context/auth.context';
import axoisInstance from '@/services/http.service';
import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import { prepaidPayment } from '@/helpers/scripts.helpers';

const CreditCard = () => {
	const {
		paymentData,
		mop,
		payThru,
		toggleWallet,
		walletBalance,
		totalAmount,
		ppayActive,
		ppayBalance,
	} = useUI();
	const { session } = useAuth();
	const { mutate: submitPayment, isLoading, isError } = usePaymentMutation(
		paymentData?.isFromShipment,
		undefined,
	);
	const { addToast } = useToasts();
	const [loading, setLoading] = useState<boolean>(false);

	const eventHandlers = {
		//profile submit data
		onSubmit: async (values) => {
			setLoading(true);
			const expiry = values?.card_exipry?.split('/');
			let payObj = {
				paidThrough: payThru,
				useWallet: toggleWallet,
				usedWalletBalance: walletBalance,
				// paymentMethod: {
				// 	card: {
				// 		channel: 'link',
				// 		card_number: values.card_number.replace(/\s/g, ''),
				// 		card_holder_name: values.card_holder,
				// 		card_expiry_mm: expiry?.[0],
				// 		card_expiry_yy: expiry?.[1],
				// 		card_cvv: values.card_cvv,
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
						paymentData.isFromShipment
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
						notifyUrl: paymentData.isFromShipment
							? shipmentCallbackUrl
							: orderCallbackUrl,
						returnUrl: paymentData.isFromShipment
							? shipmentCallbackUrl
							: orderCallbackUrl,
						// notifyUrl: orderDetails.isFromEW ? "https://test.arzooo.com/extendedWarranty/cashfree/callback" : (props.isFromShipment ?  "https://test.arzooo.com/arzoooPayments/cashfree/shipment/callback" : "https://test.arzooo.com/arzoooPayments/cashfree/order/callback"),
						// returnUrl: orderDetails.isFromEW ? "https://test.arzooo.com/extendedWarranty/cashfree/callback" : (props.isFromShipment ?  "https://test.arzooo.com/arzoooPayments/cashfree/shipment/callback" : "https://test.arzooo.com/arzoooPayments/cashfree/order/callback"),
						orderNote,
						orderCurrency: 'INR',
						paymentToken,
						source: 'woocommerce',
						paymentOption: 'card',
						card: {
							number: values.card_number.replace(/\s/g, ''),
							holder: values.card_holder,
							expiryMonth: expiry?.[0],
							expiryYear: `20${expiry?.[1]}`,
							cvv: values.card_cvv,
						},
					};
					setLoading(false);
					prepaidPayment(window, data, paymentData);
					// const resp = (await Cashfree.paySeamless(data, '')) as any;
					// if (resp?.status === 'success') {
					// 	window.location.href = resp?.url;
					// } else {
					// 	setLoading(false);
					// 	addToast(resp?.msg);
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

	return (
		<>
			<div className="bg-white mt-16 mx-16 p-10 rounded-10">
				<Card
					onSubmit={eventHandlers.onSubmit}
					amount={ppayActive ? ppayBalance : totalAmount}
					isLoading={isLoading || loading}
				/>
			</div>
			<SafePayments classNames="" />
		</>
	);
};

export default CreditCard;
