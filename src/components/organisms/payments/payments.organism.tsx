import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';

import { ROUTES } from '@/helpers/routes.helpers';
import Header from '@/molecules/payments/header.molecule';
import Wallet from '@/molecules/payments/wallet.molecule';
import PaymentItem from '@/atoms/payment-item.atom';
import PaymentArzoooCreditItem from '@/atoms/payment-arzooo-credit-item';
import PaymentDetails from '@/molecules/payments/payment-details.molecule';
import SafePayments from '@/atoms/safe-payments.atom';
import { useUI } from '@/context/ui.context';
import { CONSTANTS, MOP, PAY_THRU } from '@/helpers/persistent.helpers';
import Button from '@/atoms/button.atom';
import Rupee from '@/atoms/rupee.atom';
import { useAuth } from '@/context/auth.context';
import { usePaymentMutation } from '@/api/payments/submit-payment.api';
import Spinner from '@/atoms/spinner.atom';
import axoisInstance from '@/services/http.service';
import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import { formatPrice } from '../../../helpers/utils.helpers';
import {
	logTheEvent,
	setUpiPayment,
	upiPayment,
} from '@/helpers/scripts.helpers';

const Payments = () => {
	const {
		setPaymentData,
		paymentData,
		setMop,
		setPayThru,
		setSheetView,
		setSheetData,
		openSheet,
		mop,
		toggleWallet,
		walletBalance,
		ppayActive,
		ppayBalance,
		setTotalAmount,
		totalAmount,
		setWallet,
		payThru,
	} = useUI();
	const { addToast } = useToasts();
	const { session } = useAuth();
	const router = useRouter();
	const { query } = router;
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		// const paymentData = JSON.parse(
		// 	localStorage.getItem('paymentData'),
		// ) as any;
		const paymentData = {
			details: {
				orderId: 300362647,
				shipmentCharge: 32,
				tcsCharge: 0,
				storeType: 'blue',
				orderAmount: 2500,
				totalOrderAmount: 2538,
				pod: 0,
				pad: 0,
				pPay: 1,
				credit: 1,
				finboxId: null,
				openCreditData: {},
				gstShipmentCharge: 6,
				vpaDetails: {
					vpaNumber: '808081SEVA21095179',
					vpaIfsc: 'YESB0CMSNOC',
					vpaUpi: 'cfpay.seupiva21095179@icici',
				},
				walletData: { walletBalance: 14, useableWalletBalance: 14 },
				indifiData: {},
				finboxData: {},
				arzoooCreditData: {},
				ePayLaterData: { availableCredit: 9399164, isRegistered: true },
				rupifiData: {},
			},
			prodObj: {
				productId: 118547,
				productName:
					'Usha Striker Hi Speed Pedestal 400 mm 3 Blade Pedestal Fan (White)',
				productImage:
					'3377a/2a260/3be5a1d6be7300985a31c1b491d4cc71d69271c61ea5aff6064a57',
				model: 'Striker Hi Speed Pedestal',
				qty: 1,
				price: 2500,
				prodParent: 'Fans',
			},
			type: 'BUY_NOW',
			appState: 'active',
		};
		// JSON.parse(
		// 	localStorage.getItem('paymentData'),
		// ) as any;
		setPaymentData(paymentData?.details);
		window.addEventListener('message', (message) => {
			setPaymentData(message.data?.details);
		});
		setTotalAmount(paymentData?.details?.totalOrderAmount);
	}, []);
	console.log(paymentData);

	const eventHandlers = {
		handleUpi: async () => {
			setLoading(true);
			setMop(query.p_pay === 'true' ? MOP.P_PAY : MOP.PREPAID);
			setPayThru(PAY_THRU.UPI);
			let payObj = {
				paidThrough: PAY_THRU.UPI,
				useWallet: toggleWallet,
				usedWalletBalance: walletBalance,
				// paymentMethod: {
				// 	upi: {
				// 		channel: 'link',
				// 	},
				// },
			} as any;
			if (paymentData?.isFromShipment) {
				payObj.sellerId = session.user_id;
				payObj.shipmentsData = paymentData?.shipmentsData;
				payObj.totalAmount = paymentData?.totalOrderAmount;
			} else {
				(payObj.mop = query.p_pay === 'true' ? MOP.P_PAY : MOP.PREPAID),
					(payObj.orderId = paymentData?.orderId);
				payObj.paymentRefId = null;
				payObj.partialOrderAmount = ppayActive ? ppayBalance : 0;
				payObj.totalOrderAmount = paymentData?.totalOrderAmount;
			}
			// submitPayment(payObj);
			logTheEvent(window, {
				mop: query.p_pay === 'true' ? MOP.P_PAY : MOP.PREPAID,
				pay_through: PAY_THRU.UPI,
				payment_data: payObj,
			});
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
						secretKey,
						upi_signature_for_seamless_pro_order,
						upi_signature_for_seamless_pro_shipment,
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
						orderNote,
						orderCurrency: 'INR',
						paymentOption: 'upi',
						upiMode: 'link',
						responseType: 'json',
						secretKey,
						signature: paymentData?.isFromShipment
							? upi_signature_for_seamless_pro_shipment
							: upi_signature_for_seamless_pro_order,
					};
					setLoading(false);
					upiPayment(window, data, paymentData);
				} else {
					setLoading(false);
					addToast(response?.data?.msg);
				}
			} catch (err) {
				setLoading(false);
				addToast('Network Error.');
			}
		},
		upiMethods: (data) => {
			setSheetData(data);
			setSheetView(CONSTANTS.UPI_SHEET);
			return openSheet();
		},
		openPPod: () => {
			logTheEvent(window, {
				clicked_on:
					'partial pay button clicked opening the bottom sheet',
			});
			setSheetView(CONSTANTS.PPAY_SHEET);
			return openSheet();
		},
		openPod: () => {
			logTheEvent(window, {
				clicked_on: 'pod button clicked opening the bottom sheet',
			});
			setSheetView(CONSTANTS.POD_SHEET);
			return openSheet();
		},
		handleWallet: () => {
			if (!toggleWallet) {
				if (mop === MOP.P_PAY && !ppayActive) {
					setTotalAmount(
						paymentData.totalOrderAmount - walletBalance,
					);
				} else if (ppayActive) {
					if (totalAmount > walletBalance) {
						addToast(
							`Your wallet balance - \u20B9${walletBalance},  is lower than the partial payment amount. Please choose any other payment mode and complete the transaction.`,
						);
					} else {
						setTotalAmount(0);
					}
				} else {
					setTotalAmount(
						paymentData.totalOrderAmount - walletBalance,
					);
				}
			} else {
				if (ppayActive) {
					setTotalAmount(ppayBalance);
				} else {
					setTotalAmount(paymentData.totalOrderAmount);
				}
				setMop('');
			}
			setWallet(!toggleWallet);
		},
		onSubmit: () => {
			let payObj = {
				paidThrough: null,
				useWallet: toggleWallet,
				usedWalletBalance: walletBalance,
			} as any;
			if (paymentData?.isFromShipment) {
				payObj.sellerId = session.user_id;
				payObj.shipmentsData = paymentData?.shipmentsData;
				payObj.totalAmount = paymentData?.totalOrderAmount;
			} else {
				payObj.mop = MOP.PREPAID;
				payObj.orderId = paymentData?.orderId;
				payObj.paymentRefId = null;
				payObj.partialOrderAmount = ppayActive ? ppayBalance : 0;
				payObj.totalOrderAmount = paymentData?.totalOrderAmount;
			}
			submitPayment(payObj);
		},
		validChecks: () => {
			if (mop === '') {
				addToast('Please choose an option');
			}
		},
	};

	const { mutate: submitPayment, isLoading, isError } = usePaymentMutation(
		paymentData?.isFromShipment,
		eventHandlers.upiMethods,
	);

	if (isLoading || loading) {
		return <Spinner />;
	}

	return (
		<div className="mx-12 mb-112">
			<Header total={paymentData?.orderAmount} />
			<Wallet
				total={paymentData?.totalOrderAmount}
				handleChange={eventHandlers.handleWallet}
			/>
			{toggleWallet &&
			(paymentData.totalOrderAmount <= walletBalance ||
				(ppayActive && totalAmount <= walletBalance)) ? null : (
				<div className="bg-white rounded-6">
					<PaymentItem
						src="card.svg"
						text="Credit/Debit card"
						className="border-b border-grey-stroke"
						onClick={() => {
							setMop(
								query.p_pay === 'true'
									? MOP.P_PAY
									: MOP.PREPAID,
							),
								setPayThru(PAY_THRU.CREDIT_CARD),
								router.push(ROUTES.CREDIT_CARD),
								logTheEvent(window, {
									mop:
										query.p_pay === 'true'
											? MOP.P_PAY
											: MOP.PREPAID,
									pay_through: PAY_THRU.CREDIT_CARD,
								});
						}}
					/>
					<PaymentItem
						src="netbanking.svg"
						text="Netbanking"
						className="border-b border-grey-stroke"
						onClick={() => {
							setMop(
								query.p_pay === 'true'
									? MOP.P_PAY
									: MOP.PREPAID,
							),
								setPayThru(PAY_THRU.NET_BANKING),
								router.push(ROUTES.NETBANKING);
							logTheEvent(window, {
								mop:
									query.p_pay === 'true'
										? MOP.P_PAY
										: MOP.PREPAID,
								pay_through: PAY_THRU.NET_BANKING,
							});
						}}
					/>
					<PaymentItem
						src="upi.svg"
						text="UPI"
						className="border-b border-grey-stroke"
						onClick={eventHandlers.handleUpi}
					/>
					{query.p_pay === 'true' ||
					paymentData?.pPay === 0 ||
					paymentData?.isFromShipment ? null : (
						<PaymentItem
							src="ppod.svg"
							text="Part Pay on Delivery"
							className="border-b border-grey-stroke"
							onClick={() => {
								setMop(MOP.P_PAY),
									setPayThru(null),
									eventHandlers.openPPod();
							}}
						/>
					)}
					{query.p_pay === 'true' ||
					paymentData?.pod === 0 ||
					paymentData?.isFromShipment ? null : (
						<PaymentItem
							src="ppod.svg"
							text="Pay on Delivery"
							className="border-b border-grey-stroke"
							onClick={() => {
								setMop(MOP.POD),
									setPayThru(null),
									eventHandlers.openPod();
							}}
						/>
					)}
					<PaymentArzoooCreditItem
						src="upi.svg"
						text="Arzooo Credit"
						className="border-b border-grey-stroke"
						paymentData={paymentData}
						onClick={eventHandlers.handleUpi}
					/>
				</div>
			)}
			<PaymentDetails data={paymentData} />
			{/* <SafePayments classNames="" /> */}
			{toggleWallet &&
			(paymentData.totalOrderAmount <= walletBalance ||
				(ppayActive && totalAmount <= walletBalance)) ? (
				<div className="fixed z-3 w-full left-0 px-16 py-16 bg-white bottom-0">
					<Button
						disabled={isLoading}
						loading={isLoading}
						onClick={eventHandlers.onSubmit}
						className="w-full bg-blue-primary h-56 rounded-8 text-white text-16 leading-12 uppercase"
					>
						place order
					</Button>
				</div>
			) : (
				<div className="fixed z-3 w-full left-0 px-16 py-16 bg-white bottom-0">
					<Button
						disabled={isLoading}
						loading={isLoading}
						onClick={eventHandlers.validChecks}
						className="w-full bg-blue-primary h-56 rounded-8 text-white text-16 leading-12 uppercase"
					>
						<span className="pr-10">PAY</span>
						<Rupee money={ppayActive ? ppayBalance : totalAmount} />
					</Button>
				</div>
			)}
		</div>
	);
};

export default Payments;
