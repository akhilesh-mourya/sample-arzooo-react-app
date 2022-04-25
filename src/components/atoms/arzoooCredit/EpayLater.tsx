/**
 * Finbox Credit Partner component
 *
 * Author: Akhilesh Mourya
 */

import React from 'react';
import cn from 'classnames';

import ImageFile from '@/atoms/image.atom';
import {
	useEpayLaterUserStatus,
	useEpayLaterUserSummaryInfo,
} from '@/api/arzooo-credit/use-epayLater.api';
import { useUI } from '@/context/ui.context';
import { ArzoooCreditConstants } from '@/constants/credit.constants';

const EpayLaterCreditOption = (props: {
	onClick: any;
	paymentData: CommonTypes.OrderDataType;
	totalAmount: Number;
	goToOnBoarding?: any;
}) => {
	const { totalAmount, ppayActive } = useUI();
	const { data: ePayLaterStatusInfo } = useEpayLaterUserStatus();
	const { data: ePayLaterSummaryInfo } = useEpayLaterUserSummaryInfo();
	const { paymentData } = props;
	let isDisabled = false;
	let shouldGoToCreditOnboarding = false;
	let messageToShow = '(Arzooo Credit is not applicable)';
	let loanStatus = ePayLaterSummaryInfo?.data?.data?.status;
	let availableLimit =
		ePayLaterStatusInfo && ePayLaterStatusInfo?.availableBalance
			? ePayLaterStatusInfo.availableBalance
			: 0;
	let isRegistered = true;
	if (
		ePayLaterStatusInfo &&
		ePayLaterStatusInfo.body &&
		!ePayLaterStatusInfo.body.isRegistered
	) {
		isRegistered = false;
	}
	let limitExpired = loanStatus && loanStatus === 'LOAN EXPIRED';
	let goTORegisted = false;
	if (limitExpired || !isRegistered) goTORegisted = true;
	if (!isDisabled) {
		messageToShow = `(Your available limit: \u20B9${availableLimit})`;
		if (availableLimit >= totalAmount) {
			isDisabled = false;
		} else {
			isDisabled = true;
		}
	}
	if (goTORegisted || limitExpired) shouldGoToCreditOnboarding = true;
	if (ppayActive) {
		isDisabled = true;
	}
	return (
		<div
			onClick={() =>
				isDisabled && !shouldGoToCreditOnboarding
					? {}
					: shouldGoToCreditOnboarding
					? props.goToOnBoarding(limitExpired)
					: props.onClick(ArzoooCreditConstants.EPAYLATER)
			}
			className={cn('flex justify-between items-center p-16')}
		>
			<div>
				<div className="flex items-center">
					<ImageFile src={'upi.svg'} width={24} height={24} />
					<span className="ml-8 text-16 leading-24 font-medium">
						Arzooo Credit
					</span>
				</div>
				<span className="ml-12 text-10 leading-24 font-medium">
					{messageToShow}
				</span>
			</div>
			<div className="flex">
				<ImageFile src="Right.svg" width={24} height={24} />
			</div>
		</div>
	);
};

export default EpayLaterCreditOption;
