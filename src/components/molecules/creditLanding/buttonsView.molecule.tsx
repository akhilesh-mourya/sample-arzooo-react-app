import React from 'react';
import Button from '@/atoms/button.atom';
import { goToCreditScreen } from '@/helpers/scripts.helpers';

const CreditLandingButtons = () => {
	return (
		<div className="bg-blue-buttonBg fixed -bottom-0 items-center justify-center flex w-full p-20 py-10">
			<div className="text-center w-full">
				<Button
					onClick={() => goToCreditScreen(window)}
					style={{ background: `linear-gradient(#0367CC, #339DFA)` }}
					className="w-full bg-blue-header text-white text-14 font-semibold leading-21 p-5 px-10 rounded-10 h-58 font-Poppins"
				>
					ACTIVATE FREE CREDIT LIMIT
				</Button>
			</div>
		</div>
	);
};

export default CreditLandingButtons;
