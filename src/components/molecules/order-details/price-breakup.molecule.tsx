import Rupee from '@/components/atoms/rupee.atom';
import React from 'react';

const PriceBreakup = (props: {
	total: number;
	shipping: number;
	unit: number;
}) => {
	return (
		<>
			<div className="border-b border-grey-stroke p-16">
				<div className="text-14 border-b border-grey-stroke pb-10">
					Price Details
				</div>
				<div className="flex justify-between items-center pt-10">
					<div className="text-14 leading-20">Unit Price</div>
					<Rupee
						className="text-15 font-semibold leading-20"
						money={Math.ceil(props.unit)}
					/>
				</div>
				<div className="flex justify-between items-center pt-10">
					<div className="text-14 leading-20">Shipping Charges</div>
					<Rupee
						className="text-15 font-semibold leading-20"
						money={props.shipping ? Math.ceil(props.shipping) : 0}
					/>
				</div>
				<div className="flex justify-between items-center pt-10 mt-10 border-t border-dashed">
					<div className="text-14 leading-20">Total</div>
					<Rupee
						className="text-15 font-semibold leading-20"
						money={Math.ceil(props.total)}
					/>
				</div>
			</div>
		</>
	);
};

export default PriceBreakup;
