/**
 * Finbox Credit Partner component
 *
 * Author: Akhilesh Mourya
 */

import React from 'react';
import cn from 'classnames';

import ImageFile from '@/atoms/image.atom';
import { useFinboxUserStatus } from '@/api/arzooo-credit/use-finbox.api';
import { useUI } from '@/context/ui.context';
import { ArzoooCreditConstants } from '@/constants/credit.constants';

const FinboxCreditOption = (props: {
	onClick: any;
	paymentData: CommonTypes.OrderDataType;
	totalAmount: Number;
	goToOnBoarding?: any;
}) => {
	const { totalAmount, ppayActive } = useUI();
	const {
		data: finboxUserStatusInfo,
		isLoading,
		isError,
	} = useFinboxUserStatus();
	const { paymentData } = props;
	let isDisabled =
		!paymentData.finboxId ||
		Object.keys(paymentData.finboxData).length === 0;
	let shouldGoToCreditOnboarding = false;
	let messageToShow = '(Arzooo Credit is not applicable)';
	if (!isDisabled) {
		messageToShow = `(Your available limit: \u20B9${paymentData.finboxData.availableLimit})`;
		if (paymentData.finboxData.availableLimit >= totalAmount) {
			isDisabled = false;
		} else {
			isDisabled = true;
		}
	}
	if (
		finboxUserStatusInfo &&
		finboxUserStatusInfo.data &&
		finboxUserStatusInfo.data.eventType &&
		finboxUserStatusInfo.data.eventType === 'user_created'
	) {
		isDisabled = false;
		shouldGoToCreditOnboarding = true;
		messageToShow = `(Click to get instant credit up to ₹20 Lakhs)`;
	}
	if (ppayActive) {
		isDisabled = true;
	}
	return (
		<div
			onClick={() =>
				isDisabled && !shouldGoToCreditOnboarding
					? {}
					: shouldGoToCreditOnboarding
					? props.goToOnBoarding()
					: props.onClick(ArzoooCreditConstants.FINBOX)
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

export default FinboxCreditOption;
