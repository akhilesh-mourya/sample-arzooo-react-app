/**
 * Default Credit Option component
 *
 * Author: Akhilesh Mourya
 */

import React from 'react';
import cn from 'classnames';

import ImageFile from '@/atoms/image.atom';

const DefaultCreditOption = (props: {
	onClick: any;
	paymentData: CommonTypes.OrderDataType;
	goToOnBoarding?: any;
}) => {
	return (
		<div
			onClick={() => {}}
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
					(Click to get instant credit upto {'\u20B9'}20 Lakhs)
				</span>
			</div>
			<div className="flex">
				<ImageFile src="Right.svg" width={24} height={24} />
			</div>
		</div>
	);
};

export default DefaultCreditOption;
