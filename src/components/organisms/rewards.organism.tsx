import React from 'react';
import dynamic from 'next/dynamic';

import Header from '@/molecules/rewards/header.molecule';
import Membership from '@/molecules/rewards/membership.molecule';
import Wallet from '@/molecules/rewards/wallet.molecule';

const Faq = dynamic(() => import('@/molecules/rewards/faq.molecule'));

const Rewards = () => {
	return (
		<>
			<Header />
			<Membership />
			<Wallet />
			<Faq />
		</>
	);
};

export default Rewards;
