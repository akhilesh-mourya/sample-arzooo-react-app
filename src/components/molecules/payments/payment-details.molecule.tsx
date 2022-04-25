import React from 'react';
import { useRouter } from 'next/router';

import Rupee from '@/components/atoms/rupee.atom';
import { useUI } from '@/context/ui.context';

const PaymentDetails = ({ data }) => {
	const {
		toggleWallet,
		totalAmount,
		walletBalance,
		ppayActive,
		ppayBalance,
		paymentData,
	} = useUI();
	const router = useRouter();
	const { query } = router;

	return (
		<div className="mt-16 bg-white rounded-6 p-12">
			<div className="text-14 font-medium border-b border-grey-stroke pb-10">
				Price Details
			</div>
			{query?.p_pay === 'true' ? null : (
				<div>
					<div className="flex justify-between items-center pt-10">
						<span className="text-14 font-semibold">
							Order Amount
						</span>
						<Rupee
							className="font-semibold text-14"
							money={data?.orderAmount}
						/>
					</div>
					<div className="flex justify-between items-center pt-10">
						<span className="text-14 font-semibold">
							Gst Shipment Charge
						</span>
						<Rupee
							className="font-semibold text-14"
							money={
								data?.gstShipmentCharge
									? data?.gstShipmentCharge
									: 0
							}
						/>
					</div>
					<div className="flex justify-between items-center pt-10">
						<span className="text-14 font-semibold">
							Shipment Charge
						</span>
						<Rupee
							className="font-semibold text-14"
							money={
								data?.shipmentCharge ? data?.shipmentCharge : 0
							}
						/>
					</div>
					<div className="flex justify-between items-center py-10">
						<span className="text-14 font-semibold">
							TCS Charge
						</span>
						<Rupee
							className="font-semibold text-14"
							money={data?.tcsCharge ? data?.tcsCharge : 0}
						/>
					</div>
					{toggleWallet && (
						<div className="flex justify-between items-center py-10 border-t border-dotted border-green">
							<span className="text-14 font-semibold text-green">
								Wallet Discount
							</span>
							<span className="font-semibold text-14 text-green">
								-
								<Rupee
									className="font-semibold text-14 text-green"
									money={walletBalance}
								/>
							</span>
						</div>
					)}
				</div>
			)}
			<div className="border-t border-grey-stroke">
				<div className="flex justify-between items-center pt-10">
					<span className="text-16 font-semibold">Total</span>
					{toggleWallet &&
					(paymentData.totalOrderAmount <= walletBalance ||
						(ppayActive && totalAmount <= walletBalance)) ? (
						<Rupee className="font-semibold text-16" money={0} />
					) : ppayActive ? (
						<Rupee
							className="font-semibold text-16"
							money={ppayBalance}
						/>
					) : (
						<Rupee
							className="font-semibold text-16"
							money={
								totalAmount > 0
									? totalAmount
									: data?.totalOrderAmount
							}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default PaymentDetails;
