/**
 * Registration organism
 */

import React from 'react';

import Header from '@/molecules/registration/header.molecule';
import FirmDetails from '@/molecules/registration/firm-info/firm.molecule';

const Registration = () => {
	return (
		<div className="px-16 pt-10 pb-20">
			<Header
				title="Please fill Business Information for next step."
				subtitle="Firm Contact Information"
			/>
			<FirmDetails />
		</div>
	);
};

export default Registration;
