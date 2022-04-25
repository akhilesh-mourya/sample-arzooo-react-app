import React from 'react';

import Header from '@/molecules/creditLanding/header.molecule';
import Progrees from '@/molecules/creditLanding/progress.molecule';
import CreditLandingButtons from '@/molecules/creditLanding/buttonsView.molecule';
import CreditDetails from '@/molecules/creditLanding/creditDetails.molecule';
import BuyCreditDetails from '@/molecules/creditLanding/buyCredit.molecule';
import FaqSection from '@/molecules/creditLanding/faq.molecule';
import RequestCallBack from '@/molecules/creditLanding/requestCallback.molecule';

const CreditLanding = () => {
	return (
		<>
			<div className="bg-blue-creditHeader mb-64">
				<Header />
				<Progrees />
				<CreditDetails />
				<BuyCreditDetails />
				<RequestCallBack />
				<FaqSection />
			</div>
			<CreditLandingButtons />
		</>
	);
};

export default CreditLanding;
