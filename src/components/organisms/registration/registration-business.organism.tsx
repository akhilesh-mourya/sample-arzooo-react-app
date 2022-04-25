/**
 * Registration Business organism
 */

import React from 'react';
import dynamic from 'next/dynamic';

import Header from '@/molecules/registration/header.molecule';
import SelectBusiness from '@/molecules/registration/business/select-business.molecule';
import Kyc from '@/molecules/registration/business/kyc.molecule';

const Dropdown = dynamic(
	import('@/molecules/registration/business/dropdown.molecule'),
	{
		ssr: false,
	},
);

const RegistrationBusiness = () => {
	return (
		<div className="px-16 pt-10 pb-112">
			<Header
				title="Please fill Business Information for next step."
				subtitle="Business Information"
			/>
			<Dropdown />
			<SelectBusiness />
			<Kyc />
		</div>
	);
};

export default RegistrationBusiness;
