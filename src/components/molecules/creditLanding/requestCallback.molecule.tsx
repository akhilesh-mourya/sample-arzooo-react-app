import React, { useEffect, useState } from 'react';
import DialogBox from '@/atoms/dialog.atom';
import Button from '@/atoms/button.atom';
import { useRequestCallback } from '@/api/arzooo-credit/use-requestCallback.api';

const RequestCallBack = () => {
	const [showDialog, setDialog] = useState(false);

	const renderDialog = () => {
		return (
			<DialogBox
				isOpen={showDialog}
				onChange={() => setDialog(!showDialog)}
				title=""
				desc={
					<p className="text-14 font-normal">
						{`We have received your request and we will be calling you back to help you with the application process`}
					</p>
				}
				btnText="Okay"
				submit={() => setDialog(!showDialog)}
			/>
		);
	};
	const {
		mutate: requestCallback,
		isLoading,
		isSuccess,
	} = useRequestCallback();

	useEffect(() => {
		if (isSuccess) {
			setDialog(true);
		}
	}, [isSuccess]);

	const handleRequestCallback = () => {
		if (!isSuccess) {
			requestCallback();
		} else {
			setDialog(true);
		}
	};

	return (
		<div className="bg-golden-background items-center justify-center w-full p-20 py-48">
			{renderDialog()}
			<div className="text-white text-24 text-center font-Poppins font-light">
				Still have questions ?
			</div>
			<div className="text-white text-14 font-normal text-center my-28 font-Poppins">
				Request callback to get help with your application status
			</div>
			<div className="text-center w-full py-16">
				<Button
					loading={isLoading}
					disabled={isLoading}
					onClick={() => handleRequestCallback()}
					style={{ background: `linear-gradient(#0367CC, #339DFA)` }}
					className="text-white text-14 font-semibold leading-21 p-5 px-40 rounded-6 h-48 font-Poppins"
				>
					REQUEST CALLBACK
				</Button>
			</div>
		</div>
	);
};

export default RequestCallBack;
