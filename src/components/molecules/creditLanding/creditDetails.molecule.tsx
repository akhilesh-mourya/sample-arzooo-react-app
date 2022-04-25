import React from 'react';
import Button from '@/atoms/button.atom';
import ImageFile from '@/components/atoms/image.atom';

const CreditDetails = () => {
	const renderDetail = (
		imgSource: string,
		topText: string,
		desc: string,
		topTextSecondary = '',
	) => {
		return (
			<div className="flex mt-28">
				<ImageFile src={imgSource} width={48} height={48} />
				<div className="flex-1 ml-26">
					<div className="flex text-center text-black text-16 font-bold self-center font-Roboto">
						{topText}
						{topTextSecondary && topTextSecondary !== '' && (
							<span className="text-center text-black text-16 self-center font-normal">
								&nbsp;{topTextSecondary}
							</span>
						)}
					</div>
					<div className="mt-8 text-14">{desc}</div>
				</div>
			</div>
		);
	};
	return (
		<div className="p-20 bg-grey-creditbg">
			<div className="text-left text-black text-20 font-semibold self-center bg-grey-creditbg py-10">
				Make every order affordable with
				<div className="flex text-blue-header items-center text-center">
					<Button
						onClick={() => {}}
						className="text-blue-text font-semibold leading-21 text-28 mt-5"
					>
						Buy Now,&nbsp;
					</Button>
					<Button
						onClick={() => {}}
						className="text-blue-text text-28 font-semibold leading-21 mt-5"
					>
						Pay Later
					</Button>
				</div>
			</div>
			<div className="pb-20">
				{renderDetail(
					'repeat.svg',
					'Instant Approval',
					'Minimum Documentation, instant approval',
				)}
				{renderDetail(
					'easyRepaymentPeriod.svg',
					'Easy Repayment Period',
					'You get 15 days from the date of delivery to repay the amount.',
				)}
				{renderDetail(
					'zeroPercent.svg',
					'Zero Activation Fee',
					'No account creation charges.',
				)}
				{renderDetail(
					'enhancedLimits.svg',
					'Enhanced Limits',
					'Get higher limit with each repayment.',
				)}
			</div>
		</div>
	);
};

export default CreditDetails;
