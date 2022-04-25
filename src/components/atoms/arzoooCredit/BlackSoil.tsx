/**
 * BlackSoil Credit Partner component
 *
 * Author: Akhilesh Mourya
 */

import React from 'react';
import cn from 'classnames';

import ImageFile from '@/atoms/image.atom';
import { useUI } from '@/context/ui.context';
import { ArzoooCreditConstants } from '@/constants/credit.constants';
import { useBlackSoilCreditDetails } from '@/api/arzooo-credit/use-blackSoil.api';

const BlackSoilCreditOption = (props: {
	onClick: any;
	paymentData: CommonTypes.OrderDataType;
	goToOnBoarding?: any;
}) => {
	const { totalAmount, ppayActive } = useUI();
	const { data: blackSoilData } = useBlackSoilCreditDetails();
	let isDisabled = false;
	let messageToShow = '(Arzooo Credit is not applicable)';
	const creditBalence =
		blackSoilData &&
		blackSoilData.data &&
		blackSoilData.data.length > 0 &&
		blackSoilData.data[0].creditBalance;
	if (!isDisabled) {
		messageToShow = `(Your available limit: \u20B9${creditBalence})`;
		if (creditBalence >= totalAmount) {
			isDisabled = false;
		} else {
			isDisabled = false;
		}
	}
	if (ppayActive) {
		isDisabled = true;
	}
	return (
		<div
			onClick={() =>
				isDisabled ? {} : props.onClick(ArzoooCreditConstants.BLACKSOIL)
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

export default BlackSoilCreditOption;
