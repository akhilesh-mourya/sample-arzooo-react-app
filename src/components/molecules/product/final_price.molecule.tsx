import React from 'react';
import Rupee from '@/atoms/rupee.atom';
import { getMaxProductCount } from '@/helpers/utils.helpers';

const FinalProductsPrice = ({ price, quantity, data }) => {
	const max_qty = getMaxProductCount(data.sales_quantity, data.max_quantity);
	let showTextMark = data.discount && data.discount.length > 0;
	let showHurryText = data.sales_quantity > 0 && data.sales_quantity <= 5;

	let itemPrice = price;
	let discount = data.discount;
	if (discount != null) {
		for (let i of discount) {
			if (quantity >= i.min_quantity && quantity <= i.max_quantity) {
				itemPrice = itemPrice - i.discount;
			}
		}
	}

	return (
		<div className="bg-white justify-end py-10 direction-row pr-10">
			{/* {showTextMark && quantity < max_qty && (
				<div className="flex bg-white justify-end direction-row">
					<span className="text-8 leading-21 font-semibold bg-white text-greenStatus text-center">
						Increase Qty for further price drop.
					</span>
				</div>
			)} */}
			<div className="flex bg-white justify-end direction-row">
				<Rupee
					money={itemPrice * quantity}
					className="text-20 leading-25 tracking-0.19 font-bold"
				/>
			</div>
			{showHurryText && (
				<div className="flex bg-white justify-end direction-row">
					<span className="text-8 leading-21 font-semibold bg-white text-greenStatus text-center">
						{`Hurry only ${data.sales_quantity} left`}
					</span>
				</div>
			)}
		</div>
	);
};

export default FinalProductsPrice;
