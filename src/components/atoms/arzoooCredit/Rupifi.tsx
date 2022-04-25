/**
 * Rupifi Credit Partner component
 *
 * Author: Akhilesh Mourya
 */

import React from 'react';
import cn from 'classnames';

import ImageFile from '@/atoms/image.atom';
import { useUI } from '@/context/ui.context';
import { ArzoooCreditConstants } from '@/constants/credit.constants';

const RupifiCreditOption = (props: {
	onClick: any;
	paymentData: CommonTypes.OrderDataType;
	totalAmount: Number;
	goToOnBoarding?: any;
}) => {
	const { totalAmount, ppayActive } = useUI();
	const { paymentData } = props;
	let isDisabled = false;
	let shouldGoToCreditOnboarding = false;
	const availableLimit =
		paymentData?.rupifiData &&
		paymentData.rupifiData.data &&
		paymentData.rupifiData.data.balance
			? paymentData.rupifiData.data.balance.value
			: 0;
	let messageToShow = '(Arzooo Credit is not applicable)';
	if (!isDisabled) {
		messageToShow = `(Your available limit: \u20B9${availableLimit})`;
		if (availableLimit >= totalAmount) {
			isDisabled = false;
		} else {
			isDisabled = true;
			shouldGoToCreditOnboarding = true;
		}
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
					: props.onClick(ArzoooCreditConstants.RUPIFI)
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

export default RupifiCreditOption;
