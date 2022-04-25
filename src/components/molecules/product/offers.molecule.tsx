import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';

import DialogBox from '@/atoms/dialog.atom';
import Checkbox from '@/components/atoms/checkbox.atom';
import { useAuth } from '@/context/auth.context';

const getDeliveryDate = (daysTo) => {
	let date = new Date();
	let numberOfDays = daysTo;
	let convertedDate = date.setDate(date.getDate() + numberOfDays);
	let formattedDate = format(convertedDate, 'do MMM, EEEE');
	return formattedDate;
};

const Offers = ({ parent, delivery_time, model_name }) => {
	const [showDialog, setDialog] = useState(false);
	const [newOffer, setNewOffer] = useState(false);
	const [offerPer, setOfferPer] = useState('');
	const [show, setShow] = useState(false);
	const { session } = useAuth();
	let offerDescription, deliveryTime;
	if (delivery_time >= 5 && deliveryTime <= 7) {
		deliveryTime = delivery_time;
	} else if (delivery_time < 5) {
		deliveryTime = 5;
	} else {
		deliveryTime = 7;
	}

	useEffect(() => {
		if (show) {
			const data = {
				model: model_name,
				username: session.username,
			};
			axios
				.post(
					'https://sheet.best/api/sheets/c5e24950-9a8e-423d-bb8f-2e106d1b99e7',
					data,
				)
				.then((response) => {
					console.log(response);
				});
		}
	}, [show]);

	const handleExchange = () => {
		setShow(!show);
	};

	return (
		<>
			<DialogBox
				isOpen={showDialog}
				onChange={() => setDialog(!showDialog)}
				title="Cashback T&C"
				desc={
					<div className="my-20 mx-10">
						<div className="text-14">
							1. Cashback valid only on Prepaid orders
						</div>
						<div className="text-14 mt-6">
							2. Cashback will be calculated based on the value of
							orders placed during the offer period and will be
							capped to Rs 10,000.
						</div>
						<div className="text-14 mt-6">
							3. Order value slabs for cashback -
							<ul className="pl-15">
								<li>Rs.50,000 to Rs.99,999 – Rs.700</li>
								<li>Rs.1,00,000 to Rs.2,49,999 – Rs.1,200</li>
								<li>Rs. 2,50,000 to Rs.4,99,999 – Rs.3,000</li>
								<li>Rs.5,00,000 to Rs.7,99,999 – Rs.6,000</li>
								<li>Rs. 8,00,000 & above – Rs.10,000</li>
							</ul>
						</div>
						<div className="text-14 mt-6">
							4. Cashback will be credited on or before 10th
							April’21.
						</div>
						<div className="text-14 mt-6">
							5. In case of returns or cancellations of orders,
							the cashback will be auto-debited from the wallet.
						</div>
						<div className="text-14 mt-6">
							6. Offer Valid between 29th (8pm onwards) to 31st
							March’22.
						</div>
					</div>
				}
				btnText="OK"
				submit={() => setDialog(!showDialog)}
				cancelBtn={() => setDialog(!showDialog)}
				showButtons
			/>
			<DialogBox
				isOpen={newOffer}
				onChange={() => setNewOffer(!newOffer)}
				title="T&C"
				desc={
					<div className="my-20 mx-10">
						<div className="text-14">
							1. Get up to {offerPer} cashback.
						</div>
						<div className="text-14 mt-6">
							2. Cashbacks will be credited to your Arzooo Wallet
							after 7 days of the order getting delivered after
							excluding returns.
						</div>
						<div className="text-14 mt-6">
							3. Offer Valid till the quantity last.
						</div>
						<div className="text-14 mt-6">
							4. This is over and above all the schemes running.
						</div>
						<div className="text-14 mt-6">
							5. The final decision wrt to disbursement of
							cashback will lie with management and would be
							binding across all use cases.
						</div>
						<div className="text-14 mt-6">
							6. Offer Valid from 22nd March - 25th March.
						</div>
					</div>
				}
				btnText="OK"
				submit={() => setNewOffer(!newOffer)}
				cancelBtn={() => setNewOffer(!newOffer)}
			/>
			<div className="my-8 bg-white">
				{/* {parent === 'air-conditioner' ? (
					<>
						<div className="py-10 flex items-center px-10 border-b border-grey-stroke">
							<div className="flex-1 flex items-center mr-8">
								<div className="w-32 h-32">
									<img
										src={`https://static.arzooo.com/native-app/icons/icons-offer3.png`}
									/>
								</div>
								<div className="text-14 ml-6">
									Up to Rs 6000/- cashback on exchange of old
									Air Conditioners
								</div>
							</div>
							<div
								className="text-24"
								onClick={() => setDialog(!showDialog)}
							>
								&#9432;
							</div>
						</div>
						<div className="py-10 flex items-center px-10 border-b border-grey-stroke">
							<div className="">
								<Checkbox
									label="I agree to participate in the exchange program"
									name="exchange"
									checked={show}
									labelClassName="text-14"
									onChange={handleExchange}
								/>
							</div>
						</div>
					</>
				) : null} */}
				{/* {offersData.map((offer) => {
					if (
						offer['Model ID'] === model_name &&
						offer.Zone === session.zone
					) {
						return (
							<div className="py-10 flex items-center px-10 border-b border-grey-stroke">
								<div className="flex-1 flex items-center mr-8">
									<div className="w-32 h-32">
										<img
											src={`https://static.arzooo.com/native-app/icons/icons-offer3.png`}
										/>
									</div>
									<div className="text-14 ml-6">
										Get Extra {offer.REMARKS} Cashback
									</div>
								</div>
								<div
									className="text-24"
									onClick={() => {
										setNewOffer(!newOffer),
											setOfferPer(offer.REMARKS);
									}}
								>
									&#9432;
								</div>
							</div>
						);
					}
				})} */}
				{parent === 'Laptops' ||
				parent === 'Mobiles' ||
				parent === 'smart-phones' ||
				parent === 'feature-phones' ? null : (
					<>
						<div className="py-10 flex items-center px-10 border-b border-grey-stroke">
							<div className="flex-1 flex items-center mr-8">
								<div className="w-32 h-32">
									<img
										src={`https://static.arzooo.com/native-app/icons/icons-offer3.png`}
									/>
								</div>
								<div className="text-14 ml-6">
									Up to Rs 10,000/- Cashback
								</div>
							</div>
							<div
								className="text-24"
								onClick={() => setDialog(!showDialog)}
							>
								&#9432;
							</div>
						</div>
					</>
				)}
				<div className="py-10 flex items-center px-10 border-b border-grey-stroke">
					<div className="w-32 h-32">
						<img
							src={`https://static.arzooo.com/native-app/icons/icons-del-date.png`}
						/>
					</div>
					<div className="text-14 ml-6">
						Delivery by {getDeliveryDate(deliveryTime)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Offers;
