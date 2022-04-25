/**
 * Rupee Component
 * @param money               send rupees
 * @param className           classes for rupee
 *
 * Author: Vakadu Vinod
 */

import React from 'react';

import { formatPrice } from '@/helpers/utils.helpers';

const Rupee = (props: { money: number; className?: string }) => {
	return (
		<span className={props.className}>
			<span className="roboto-family">₹</span>
			{formatPrice(props.money)}
		</span>
	);
};

export default Rupee;
