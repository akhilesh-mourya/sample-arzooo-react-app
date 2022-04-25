import React, { useState } from 'react';
import { format } from 'date-fns';

import { useHistoryMutation } from '@/api/rewards/use-history.api';
import { RewardHistoryOrderType } from '@/helpers/types.helpers';
import Spinner from '@/atoms/spinner.atom';
import Button from '@/atoms/button.atom';
import { useAuth } from '@/context/auth.context';
import Rupee from '@/components/atoms/rupee.atom';

const Wallet = () => {
	const { session } = useAuth();
	const [show, setShow] = useState(false);
	const { mutate: history, data, isLoading } = useHistoryMutation();

	const fetchData = async () => {
		setShow(true);
		let data = {
			sellerId: session?.user_id,
			startDate: '2017-03-31',
			endDate: format(new Date(), 'yyyy-MM-dd'),
			pageNo: 1,
			download: false,
			isWallet: true,
		};
		history(data as any);
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className="text-center">
			<Button
				onClick={fetchData}
				className="bg-blue-primary px-24 py-8 rounded-8 text-white text-16 font-semibold"
			>
				Wallet
			</Button>
			{show ? (
				<>
					{data?.data?.data?.length > 0 ? (
						<div className="my-20">
							<div className="flex justify-between bg-grey-stroke py-12">
								<div className="flex-1 text-16 font-semibold">
									Order Id
								</div>
								<div className="flex-1 text-16 font-semibold">
									Debit
								</div>
								<div className="flex-1 text-16 font-semibold">
									Credit
								</div>
							</div>
							<div className="max-h-322 overflow-y-scroll">
								{data?.data?.data?.map(
									(wallet: RewardHistoryOrderType) => {
										return (
											<div
												key={wallet.orderId}
												className="flex justify-between py-12"
											>
												<div className="flex-1">
													{wallet.orderId}
												</div>
												<div className="flex-1 text-red">
													{wallet.debit === 1 ? (
														<span>-</span>
													) : (
														''
													)}
													{wallet.debit === 1 ? (
														<Rupee
															money={
																wallet.amount
															}
														/>
													) : (
														''
													)}
												</div>
												<div className="flex-1 text-green">
													{wallet.debit === 0 ? (
														<span>+</span>
													) : (
														''
													)}
													{wallet.debit === 0 ? (
														<Rupee
															money={
																wallet.amount
															}
														/>
													) : (
														''
													)}
												</div>
											</div>
										);
									},
								)}
							</div>
						</div>
					) : (
						<div className="text-16 font-semibold my-20">
							No wallet data
						</div>
					)}
				</>
			) : null}
		</div>
	);
};

export default Wallet;
