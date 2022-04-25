import React from 'react';
import cn from 'classnames';
import { ProgressBar, Step } from 'react-step-progress-bar';

import { useUserPerformance } from '@/api/rewards/use-user-performance.api';
import Spinner from '@/atoms/spinner.atom';
import ImageFile from '@/components/atoms/image.atom';

const CURRENT_TARGET = 2500000;

const Membership = () => {
	const { data, isLoading } = useUserPerformance();

	if (isLoading) {
		return <Spinner />;
	}

	function showPercentage() {
		if (data?.data?.[0]?.currentMonthSale === 600000) {
			return 34;
		} else if (data?.data?.[0]?.currentMonthSale === 1100000) {
			return 67;
		} else {
			let monthSale = ((data?.data?.[0]?.currentMonthSale /
				CURRENT_TARGET) *
				100) as any;
			return parseInt(monthSale);
		}
	}

	return (
		<div className="mb-20">
			<div className="text-center text-16 font-semibold mt-20">
				Monthly Sales Reward
			</div>
			{/* <div className="w-full py-12 rounded-8 text-16 font-semibold text-center">
				Current Wallet Balance Rs.{`${data?.data[0]?.balance ? data?.data[0]?.balance : 0}`}
			</div> */}
			<div className="my-20 mx-10">
				<div className="flex justify-between mt-14 items-center">
					<div className="text-center w-full">
						<div className="text-10 leading-15">
							Sales Milestones
						</div>
					</div>
					<div className="text-center w-full">
						<div className="text-12 leading-16 font-bold">
							5 Lacs
						</div>
					</div>
					<div className="text-center w-full">
						<div className="text-12 leading-16 font-bold">
							10 Lacs
						</div>
					</div>
					<div className="text-right w-full">
						<div className="text-12 leading-16 font-bold">
							1 Crore
						</div>
					</div>
				</div>
				<div className="my-24 mx-20">
					<ProgressBar
						percent={showPercentage()}
						filledBackground="#60BA62"
					>
						{[1, 2, 3, 4].map((_, i) => {
							return (
								<Step key={i} transition="scale">
									{({ accomplished }) => (
										<div
											className={cn(
												accomplished
													? 'bg-greenStatus'
													: 'bg-white border-2 border-grey-lighter',
												'w-24 h-24 rounded-full relative',
											)}
										>
											{accomplished ? (
												<div className="flex justify-center items-center w-24 h-24 rounded-full">
													<ImageFile
														src="tick.svg"
														width={14}
														height={14}
													/>
												</div>
											) : null}
										</div>
									)}
								</Step>
							);
						})}
					</ProgressBar>
				</div>
				<div className="flex justify-between mt-14 items-center">
					<div className="text-center w-full">
						<div className="text-10 leading-15">Cash Reward</div>
					</div>
					<div className="text-center w-full">
						<div className="text-12 leading-16 font-bold">
							Rs.3,000
						</div>
					</div>
					<div className="text-center w-full">
						<div className="text-12 leading-16 font-bold">
							Rs.7,000
						</div>
					</div>
					<div className="text-right w-full">
						<div className="text-12 leading-16 font-bold">
							Rs.75,000
						</div>
					</div>
				</div>
			</div>
			<div className="w-full py-12 text-14 text-center">
				Current Sales Completed Rs.
				<span className="font-semibold">
					{data?.data?.[0]?.currentMonthSale
						? data?.data?.[0]?.currentMonthSale
						: 0}
				</span>
			</div>
		</div>
	);
};

export default Membership;
