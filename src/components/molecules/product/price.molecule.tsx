import React from 'react';
import Rupee from '@/atoms/rupee.atom';

const Pricing = ({ finalPrice, retail_price, quantity, data }) => {
	let itemPrice = finalPrice;
	let discount = data.discount;
	if (discount != null) {
		for (let i of discount) {
			if (quantity >= i.min_quantity && quantity <= i.max_quantity) {
				itemPrice = itemPrice - i.discount;
			}
		}
	}
	const discountPer = Math.floor((1 - itemPrice / retail_price) * 100);

	return (
		<div className="py-10 px-16 bg-white">
			<div className="flex items-center">
				<div>
					<Rupee
						money={itemPrice}
						className="text-18 leading-25 tracking-0.19 font-bold"
					/>
				</div>
				<div className="mx-6">
					<Rupee
						money={retail_price}
						className="text-15 leading-12 text-grey-text line-through"
					/>
				</div>
			</div>
			{discountPer && discountPer > 0 && (
				<div className="bg-greenLight inline-block text-12 leading-12 text-white p-4 rounded-4">
					{discountPer}% OFF
				</div>
			)}
		</div>
	);
};

export default Pricing;
