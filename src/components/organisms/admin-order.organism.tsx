import React, { useState, useCallback, useEffect } from 'react';
import AutoSuggest from 'react-autosuggest';
import _debounce from 'lodash/debounce';
import { useToasts } from 'react-toast-notifications';

import Input from '../atoms/input.atom';
import {
	fetchProductDetails,
	shipToDetails,
	submitAdminOrder,
} from '@/api/api.api';
import { useGetUserDetails } from '@/api/my-account/use-get-user-details';
import Toggle from '@/atoms/switch.atom';
import Radio from '@/atoms/radio.atom';
import { useAuth } from '@/context/auth.context';
import { getAccessToken } from '../../services/token.service';
import { back } from '@/helpers/scripts.helpers';

const radioData = [
	{ id: 0, title: 'Yes', desc: 'Yes' },
	{ id: 1, title: 'No', desc: 'No' },
];

const AdminOrder = () => {
	const { addToast } = useToasts();
	const { session } = useAuth(); // user details
	const { data, isLoading, error } = useGetUserDetails(); //get the details intially
	const [product, setProduct] = useState('');
	const [wholesale, setWholesale] = useState(false);
	const [radioSelected, setRadioSelected] = useState('');
	const [asn, setAsn] = useState('');
	const [shipTo, setShipTo] = useState('');
	const [shipToId, setShipToId] = useState('');
	const [productSuggestions, setProductSuggestions] = useState([]);
	const [shipToSuggestions, setShipToSuggestions] = useState([]);
	const [productPrice, setProductPrice] = useState('');
	const [productQuantity, setProductQuantity] = useState('');
	const [utrReference, setUtrReference] = useState('');
	const [amountReceived, setAmountReceived] = useState('');
	const [pPay, setPPay] = useState(true);
	const [payOnDelivery, setPayOnDelivery] = useState(false);
	const [sessionUser, setSessionUser] = useState(null);
	const [sessionUserId, setSessionUserId] = useState(null);
	const [mop, setMop] = useState('P_PAY');
	const [productId, setProductId] = useState('');

	useEffect(() => {
		if (data && data.data) {
			setSessionUserId(data.data.mobile_number);
			setSessionUser(data.data);
		}
	}, [data]);

	const eventHandlers = {
		handleChangeProducts: useCallback(
			_debounce(async (e) => {
				if (e?.target?.value && e?.target?.value.length > 3) {
					fetchProductDetails(e?.target?.value, (err, data) => {
						if (err) {
							addToast('Something happenend. Please try again!');
						} else {
							setProductSuggestions(data?.hits);
						}
					});
				}
			}, 500),
			[],
		),
		handleChangeShipTo: useCallback(
			_debounce(async (e) => {
				if (e?.target?.value && e?.target?.value.length > 3) {
					shipToDetails(e?.target?.value, (err, data) => {
						if (err) {
							addToast('Something happenend. Please try again!');
						} else {
							setShipToSuggestions(data?.data);
						}
					});
				}
			}, 500),
			[],
		),
		onChangeRadio: (val) => {
			setRadioSelected(val);
		},
		onSubmit: () => {
			if (
				product.length < 1 ||
				productPrice.length < 1 ||
				shipTo.length < 1 ||
				shipToId.length < 1 ||
				asn.length < 1 ||
				productQuantity.length == 0
			) {
				addToast(
					'All fields are required, Please Enter all the fields',
				);
				return;
			}
			if (parseInt(productQuantity) < 1) {
				addToast('Quantity cant be 0');
				return;
			}

			if (
				sessionUser === '9164572628' &&
				parseInt(productQuantity) < 10
			) {
				addToast(`Quantity can't be less than 10`);
				return;
			}

			if (
				sessionUser === '7676747303' &&
				parseInt(productQuantity) < 20
			) {
				addToast(`Quantity can't be less than 20`);
				return;
			}

			if (
				(mop === 'CUSTOMER_PREPAID' || mop === 'P_PAY') &&
				(amountReceived.length < 1 ||
					parseInt(amountReceived) <= 0 ||
					shipToId.length < 1)
			) {
				addToast(
					'All fields are required, Please Enter all the fields',
				);
				return;
			}

			let paymentRefId = null,
				paidAmount = 0 as any;
			if (mop === 'PREPAID' || mop === 'P_PAY') {
				paidAmount = amountReceived;
				paymentRefId = `${utrReference}`;
			}
			const orderData = {
				adminId: session.user_id,
				sellerId: shipToId,
				productId: productId,
				quantity: parseInt(productQuantity),
				adminPrice: productPrice,
				modelName: product,
				asn: asn,
				mop: mop,
				paidAmount: paidAmount,
				paymentRefId: paymentRefId,
				type: wholesale ? 'ADMIN_WHOLESALE' : 'ADMIN_FOR_SELLER',
			} as any;
			if (wholesale) orderData.shipCharge = radioSelected === 'Yes';
			const token = getAccessToken();
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			};
			submitAdminOrder(orderData, headers, (err, data) => {
				if (err) {
					addToast('Something happenend. Please try again!');
				} else {
					if (data.status === 'error') {
						addToast(data?.msg);
					} else {
						back(window);
						// Success
					}
				}
			});
		},
	};

	return (
		<div className="p-16">
			<div className="mb-20">
				<div className="block text-10 mb-2 font-semibold leading-none cursor-pointer">
					Search for Product*
				</div>
				<AutoSuggest
					id="model-id"
					suggestions={productSuggestions}
					onSuggestionsClearRequested={() =>
						setProductSuggestions([])
					}
					onSuggestionsFetchRequested={({ value }) => {
						setProduct(value);
					}}
					onSuggestionSelected={(_, { suggestion }) => {
						setProduct(suggestion.model_name),
							setAsn(suggestion.asn);
						setProductId(suggestion.product_id);
					}}
					renderSuggestion={(suggestion) => (
						<span>{`${suggestion.model_name} - ${suggestion.asn}`}</span>
					)}
					getSuggestionValue={(suggestion) => suggestion.model_name}
					inputProps={{
						placeholder: '32t4010',
						value: product,
						onChange: eventHandlers.handleChangeProducts,
					}}
					highlightFirstSuggestion={true}
					theme={{
						container: 'relative',
						input:
							'text-14 text-grey-primary leading-21 w-full outline-none appearance-none no-border',
						suggestionsContainer:
							'absolute z-3 bg-white max-h-415 w-full overflow-y-scroll border-t-0 border border-grey-stroke rounded-bl-6 rounded-br-6',
						suggestion:
							'text-14 text-grey-primary py-8 px-10 border-b border-grey-stroke',
						suggestionHighlighted: 'bg-grey-lighter',
					}}
				/>
			</div>
			<div className="grid grid-cols-2 gap-16">
				<Input
					name="price"
					value={productPrice}
					className="mb-20"
					labelKey="Price*"
					placeholderKey="Rs.3000"
					inputMode="numeric"
					onChange={(e) => setProductPrice(e?.target?.value)}
				/>
				<Input
					name="qty"
					value={productQuantity}
					className="mb-20"
					labelKey="Quantity*"
					placeholderKey="12"
					inputMode="numeric"
					onChange={(e) => setProductQuantity(e?.target?.value)}
				/>
			</div>
			<Input
				labelKey="ASN*"
				value={asn}
				placeholderKey="MOB1908694"
				name="asn"
				className="mb-20"
				onChange={(e) => setAsn(e?.target?.value)}
			/>
			<div className="mb-20">
				<div className="block text-10 mb-2 font-semibold leading-none cursor-pointer">
					Ship To*
				</div>
				<AutoSuggest
					id="ship-to"
					suggestions={shipToSuggestions}
					onSuggestionsClearRequested={() => setShipToSuggestions([])}
					onSuggestionsFetchRequested={({ value }) => {
						setShipTo(value);
					}}
					onSuggestionSelected={(_, { suggestion }) => {
						setShipTo(suggestion.name), setShipToId(suggestion.id);
					}}
					renderSuggestion={(suggestion) => (
						<span>{`${suggestion.name} - ${suggestion.username}`}</span>
					)}
					getSuggestionValue={(suggestion) => suggestion.name}
					inputProps={{
						placeholder: 'Ram Electricals',
						value: shipTo,
						onChange: eventHandlers.handleChangeShipTo,
					}}
					highlightFirstSuggestion={true}
					theme={{
						container: 'relative',
						input:
							'text-14 text-grey-primary leading-21 w-full outline-none appearance-none no-border',
						suggestionsContainer:
							'absolute z-3 bg-white max-h-415 w-full overflow-y-scroll border-t-0 border border-grey-stroke rounded-bl-6 rounded-br-6',
						suggestion:
							'text-14 text-grey-primary py-8 px-10 border-b border-grey-stroke',
						suggestionHighlighted: 'bg-grey-lighter',
					}}
				/>
			</div>
			<div className="grid grid-cols-2 gap-16">
				<Input
					name="utr"
					value={utrReference}
					className="mb-20"
					labelKey="UTR / Reference*"
					placeholderKey="12345"
					onChange={(e) => setUtrReference(e?.target?.value)}
				/>
				<Input
					name="amount"
					value={amountReceived}
					className="mb-20"
					labelKey="Amount Recieved*"
					placeholderKey="Rs.3456"
					inputMode="numeric"
					onChange={(e) => setAmountReceived(e?.target?.value)}
				/>
			</div>
			<div className="mt-10 mb-10 flex">
				<Toggle
					label="Partial Pay"
					labelCss="text-14"
					checked={pPay}
					onChange={() => {
						setPPay(!pPay);
						setPayOnDelivery(!payOnDelivery);
						setMop('P_PAY');
					}}
				/>
				{sessionUser == '8951459585' && (
					<Toggle
						label="POD"
						labelCss="text-14 ml-20"
						checked={payOnDelivery}
						onChange={() => {
							setPPay(!pPay);
							setPayOnDelivery(!payOnDelivery);
							setMop('POD');
						}}
					/>
				)}
			</div>
			<div>
				<Toggle
					label="Wholesale Order"
					labelCss="text-14"
					checked={wholesale}
					onChange={() => setWholesale(!wholesale)}
				/>
				{wholesale ? (
					<div className="mt-10 mb-40">
						<div className="text-14 leading-21">
							Include Shipping Charges
						</div>
						<Radio
							data={radioData}
							selected={radioSelected}
							onChange={eventHandlers.onChangeRadio}
						/>
					</div>
				) : null}
			</div>
			<div
				className="fixed bottom-0 bg-blue-primary w-full left-0 h-56 text-white flex justify-center items-center text-14 font-semibold leading-21"
				onClick={eventHandlers.onSubmit}
			>
				Place Order
			</div>
		</div>
	);
};

export default AdminOrder;
