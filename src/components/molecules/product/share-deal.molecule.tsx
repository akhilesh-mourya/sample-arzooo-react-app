import React, { useState } from 'react';

import ImageFile from '@/atoms/image.atom';
import DialogBox from '@/atoms/dialog.atom';
import Input from '@/atoms/input.atom';
import { useUI } from '@/context/ui.context';
import { shareProductDeal } from '@/helpers/scripts.helpers';

const ShareDeal = () => {
	const [showDialog, setDialog] = useState(false);
	const [amount, setAmount] = useState<string>('');
	const { productData } = useUI();

	return (
		<>
			<DialogBox
				isOpen={showDialog}
				onChange={() => setDialog(!showDialog)}
				title="Enter Retail Price"
				showButtons
				desc={
					<div className="my-20 mx-10">
						<Input
							name=""
							inputMode="numeric"
							value={amount}
							onChange={(e) => setAmount(e?.target?.value)}
						/>
					</div>
				}
				btnText="Proceed"
				submit={() => {
					shareProductDeal(window, {
						amount,
						...productData,
					}),
						setDialog(!showDialog),
						setAmount('');
				}}
				cancelBtn={() => setDialog(!showDialog)}
			/>
			<div className="mb-10">
				<div
					onClick={() => setDialog(!showDialog)}
					className="flex items-center justify-center py-10 px-16 bg-blue-lighter"
				>
					<ImageFile src="Share-deal.svg" width={24} height={24} />
					<span className="text-12 ml-6">
						Share this deal with your Customers
					</span>
				</div>
			</div>
		</>
	);
};

export default ShareDeal;
