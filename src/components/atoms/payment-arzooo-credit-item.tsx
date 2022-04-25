/**
 * Payment item component
 * @param src           image source
 * @param text          item title
 * @param route         path it leads to
 * @param className     classes for container classes
 *
 * Author: Vakadu Vinod
 */

import React, { useState } from 'react';
import {
	BlackSoilCreditOption,
	DefaultCreditOption,
	FinboxCreditOption,
	RupifiCreditOption,
	EpayLaterCreditOption,
} from './arzoooCredit';
import Spinner from '@/atoms/spinner.atom';
import { ArzoooCreditConstants } from '@/constants/credit.constants';
import { useUI } from '@/context/ui.context';
import { usePaymentMutation } from '@/api/payments/submit-payment.api';
import { useAuth } from '@/context/auth.context';
import { goToCreditOnboarding } from '@/helpers/scripts.helpers';

const PaymentArzoooCreditItem = (props: {
	src: string;
	text: string;
	className?: string;
	onClick: any;
	paymentData: CommonTypes.OrderDataType;
	goToOnBoarding?: any;
}) => {
	const {
		mop,
		payThru,
		toggleWallet,
		walletBalance,
		ppayActive,
		ppayBalance,
		paymentData,
		setMop,
		setPayThru,
	} = useUI();
	const { session } = useAuth();
	const onEpayPayment = (data: any) => {};
	const { mutate: submitPayment, isLoading, isError } = usePaymentMutation(
		false,
		undefined,
		true,
		onEpayPayment,
	);
	const eventHandlers = {
		//profile submit data
		onSubmit: (payThru: string = ArzoooCreditConstants.OTHER) => {
			setMop(ArzoooCreditConstants.CREDIT);
			setPayThru(payThru);
			const env = process.env.NODE_ENV;
			let payObj = {
				paidThrough: payThru,
				useWallet: toggleWallet,
				usedWalletBalance: walletBalance,
			} as any;
			if (paymentData.isFromShipment) {
				payObj.sellerId = session.user_id;
				payObj.shipmentsData = paymentData.shipmentsData;
				payObj.totalAmount = paymentData.totalOrderAmount;
			} else {
				payObj.mop = ArzoooCreditConstants.CREDIT;
				payObj.orderId = paymentData.orderId;
				payObj.paymentRefId = null;
				payObj.partialOrderAmount = ppayActive ? ppayBalance : 0;
				payObj.totalOrderAmount = paymentData.totalOrderAmount;
			}
			setTimeout(() => {
				submitPayment(payObj);
			}, 500);
		},

		goToOnBoarding: (limitExpired = false) => {
			goToCreditOnboarding(window);
		},
	};

	let Component = DefaultCreditOption;
	if (
		paymentData &&
		paymentData?.arzoooCreditData &&
		Object.keys(paymentData?.arzoooCreditData).length !== 0 &&
		paymentData?.arzoooCreditData?.creditPartner ===
			ArzoooCreditConstants.BLACKSOIL
	) {
		Component = BlackSoilCreditOption;
	} else if (
		paymentData?.rupifiData &&
		Object.keys(paymentData?.rupifiData).length > 0
	) {
		Component = RupifiCreditOption;
	} else if (
		paymentData?.finboxData &&
		Object.keys(paymentData?.finboxData).length > 0
	) {
		Component = FinboxCreditOption;
	} else if (
		paymentData?.credit &&
		paymentData?.ePayLaterData &&
		Object.keys(paymentData.ePayLaterData).length > 0
	) {
		Component = EpayLaterCreditOption;
	} else if (
		paymentData?.openCreditData &&
		Object.keys(paymentData?.openCreditData).length > 0 &&
		paymentData?.openCreditData?.constructor === Object
	) {
		Component = DefaultCreditOption;
	}
	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Component
				onClick={eventHandlers.onSubmit}
				paymentData={paymentData}
				goToOnBoarding={eventHandlers.goToOnBoarding}
			/>
		</>
	);
};

export default PaymentArzoooCreditItem;
