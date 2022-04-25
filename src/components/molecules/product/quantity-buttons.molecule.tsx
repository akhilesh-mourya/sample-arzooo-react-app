import React from 'react';

import Button from '@/atoms/button.atom';
import {
	getMaxProductCount,
	getNextIncQuantity,
	getNextDecQuantity,
} from '@/helpers/utils.helpers';

const QuantityButtons = (props: {
	productDetails: any;
	setProductDetails: Function;
}) => {
	const max_qty = getMaxProductCount(
		props.productDetails.sales_quantity,
		props.productDetails.max_quantity,
	);
	const onIncreaseClicked = () => {
		let newData = { ...props.productDetails };
		const max_qty = getMaxProductCount(
			newData.sales_quantity,
			newData.max_quantity,
		);
		newData.quantity = getNextIncQuantity(
			Number(newData.quantity),
			Number(newData.pack_quantity),
			max_qty,
			newData.sales_quantity,
		);
		props.setProductDetails(newData);
	};
	const onDecreaseClicked = () => {
		let newData = { ...props.productDetails };
		const max_qty = getMaxProductCount(
			newData.sales_quantity,
			newData.max_quantity,
		);
		newData.quantity = getNextDecQuantity(
			Number(newData.quantity),
			Number(newData.pack_quantity),
			max_qty,
			newData.sales_quantity,
		);
		props.setProductDetails(newData);
	};
	return (
		<>
			<div className="flex mr-10 self-center item-center align-center justify-center">
				<Button
					disabled={
						props.productDetails.quantity === 1 ||
						props.productDetails.quantity <=
							props.productDetails.min_quantity
					}
					onClick={onDecreaseClicked}
					className="uppercase bg-white text-18 font-semibold w-42 h-30 rounded-tl-6 rounded-bl-6 border border-grey-stroke"
				>
					{' '}
					-{' '}
				</Button>
				<div className="text-12 font-semibold leading-21 px-7 border border-grey-stroke w-40 align-center items-center justify-center flex">
					{props.productDetails.quantity}
				</div>
				<Button
					disabled={props.productDetails.quantity >= max_qty}
					onClick={onIncreaseClicked}
					className="uppercase text-18 font-semibold w-42 h-30 border border-grey-stroke rounded-tr-6 rounded-br-6"
				>
					{' '}
					+{' '}
				</Button>
			</div>
		</>
	);
};

export default QuantityButtons;
