import React, { useState } from 'react';
import CollapsableItem from '@/atoms/creditLanding/collapsableItem.atom';
import { CreditFaqData } from '@/constants/credit.constants';

const FaqSection = () => {
	return (
		<div className="bg-white p-20 pb-48 pt-58">
			<div className="text-left text-blue-text text-24 font-bold mb-28 text-Poppins">
				Frequently Asked Questions
			</div>
			{CreditFaqData.map((data, index) => {
				return (
					<CollapsableItem
						key={`faq${index}`}
						data={data}
						index={index}
					/>
				);
			})}
		</div>
	);
};

export default FaqSection;
