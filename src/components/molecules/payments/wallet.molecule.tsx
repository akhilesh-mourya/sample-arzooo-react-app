import React, { useEffect } from 'react';

import Rupee from '@/atoms/rupee.atom';
import Checkbox from '@/atoms/checkbox.atom';
import { useWallet } from '@/api/payments/wallet.api';
import Spinner from '@/atoms/spinner.atom';
import UpdateStatus from '@/components/atoms/status.atom';
import { useUI } from '@/context/ui.context';

const Wallet = (props: { total: number; handleChange: any }) => {
	const { setWallet, toggleWallet, setWalletBalance } = useUI();
	const { data, isLoading, error } = useWallet(props.total);

	useEffect(() => {
		setWalletBalance(Number(data?.useableWalletBalance));
	}, [data?.useableWalletBalance]);

	if (isLoading) {
		return <Spinner />;
	}

	if (error) {
		return (
			<UpdateStatus
				text="Failed to fetch wallet!"
				className="my-20 text-center text-14 leading-21 text-red"
			/>
		);
	}

	if (data?.walletBalance > 0) {
		return (
			<div className="bg-white mb-16 rounded-6 p-12">
				<div className=" flex justify-between items-center text-14 leading-21 font-medium">
					<div className="flex items-center">
						<Checkbox
							name="wallet"
							checked={toggleWallet}
							onChange={props.handleChange}
						/>
						<span className="text-12 leading-18 font-medium">
							Use your wallet money
						</span>
						<Rupee
							money={Math.floor(data?.walletBalance)}
							className="text-16 leading-21 font-bold ml-6"
						/>
					</div>
				</div>
				{toggleWallet && data?.walletBalance > 0 && (
					<div className="flex items-center ml-24 mt-6">
						<span className="text-12 leading-18 font-bold">
							Usable wallet amount
						</span>
						<Rupee
							money={data?.useableWalletBalance}
							className="text-14 leading-21 font-bold ml-6"
						/>
					</div>
				)}
			</div>
		);
	}
	return null;
};

export default Wallet;
