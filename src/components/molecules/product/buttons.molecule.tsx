import React, { useState, useEffect } from 'react';

import Button from '@/atoms/button.atom';
import { addToCartEvents, handleCart } from '@/helpers/scripts.helpers';
import { useAuth } from '@/context/auth.context';
import { ORDER_CONSTANTS } from '@/helpers/persistent.helpers';
import { useCreateOrderMutation } from '@/api/product/create-order.api';
import axoisInstance from '@/services/http.service';
import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import DialogBox from '@/atoms/dialog.atom';
import { useAddToCartMutation } from '@/api/cart/add-to-cart.api';
import { useCart } from '@/context/cart.context';
import { useUI } from '@/context/ui.context';

const Buttons = (props: {
	refetch: any;
	product_id: number;
	display_name: string;
	img_hash: string;
	model_name: string;
	quantity: number;
	finalPrice: number;
	parent: string;
	sales_quantity: number;
	out_of_stock: number;
	is_express: number;
}) => {
	const [availQty, setAvailQty] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showDialog, setDialog] = useState(false);
	const [showCart, setShowCart] = useState(null);
	const { session } = useAuth();
	const { cartData } = useCart();
	const {
		productData,
		setPopoverQty,
		setHidePopoverQty,
		hideQtyPopover,
		showQtyPopover,
	} = useUI();

	const prodObj = {
		productId: productData.product_id,
		productName: productData.display_name,
		productImage: productData.img_hash,
		model: productData.model_name,
		qty: productData.quantity,
		price: productData.finalPrice,
		prodParent: productData.parent,
	};

	const { mutate: createOrder, isLoading, isError } = useCreateOrderMutation(
		prodObj,
	);
	const {
		mutate: addToCart,
		isLoading: loader,
		isError: error,
	} = useAddToCartMutation();

	useEffect(() => {
		let data = cartData?.filter((data) => {
			return data?.product_id === props.product_id;
		});
		setShowCart(data);
	}, [cartData]);

	//add to cart
	function handleAddToCart() {
		const cartData = {
			type: 'cart',
			product_id: props.product_id,
			quantity: props.quantity,
			is_exchange: false,
			exchange_details: '',
			is_go_store: false,
			model_name: null,
			is_express: props.is_express ? props.is_express : null,
		};
		addToCartEvents(window, cartData);
		addToCart(cartData);
	}

	// handle buynow
	function handleBuyNow() {
		//check if sales qty is not null
		if (props.sales_quantity !== null) {
			setLoading(true); //loading starts
			let data = {
				productIds: [
					{ id: props.product_id, is_express: props.is_express },
				],
			};
			//check sku
			axoisInstance
				.post(
					`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.CHECK_SKU}`,
					data,
				)
				.then((res) => {
					if (res?.data?.status === 'success') {
						let availableQty = res.data.data[0].availableQuantity;
						setAvailQty(availableQty);
						if (props.quantity > availableQty) {
							setDialog(true);
						} else {
							setLoading(false);
							intiateOrder(props.quantity);
						}
					} else {
						setLoading(false);
					}
				})
				.catch((err) => {
					setLoading(false);
					console.info(err);
				});
		}
	}

	//on sku cancel popup
	function cancelSku() {
		props.refetch();
		setLoading(false);
		setDialog(false);
	}

	//create order
	function intiateOrder(qty) {
		let productDetails = [];
		let newObj = {
			productId: props.product_id,
			quantity: qty ? qty : props.quantity,
			is_express: props.is_express === 1 ? true : false,
		};
		productDetails.push(newObj);
		let orderDetails = {
			adminId: null,
			sellerId: session.user_id,
			productDetails: productDetails,
			adminPrice: 0,
			customerAddressId: null,
			type: ORDER_CONSTANTS.SELLER_FOR_SELF,
		};
		if (
			productData.finalPrice < 14000 &&
			qty < 2 &&
			hideQtyPopover &&
			(productData.parent === 'TV & Home Entertainment' ||
				productData.parent === 'televisions')
		) {
			setPopoverQty(true);
			setHidePopoverQty(false);
		} else {
			setPopoverQty(false);
			setHidePopoverQty(true);
			createOrder(orderDetails);
		}
	}

	return (
		<>
			<DialogBox
				isOpen={showDialog}
				onChange={() => setDialog(!showDialog)}
				title="Check Quantity"
				desc={
					<p className="text-14 font-normal">
						{`Sorry, Only ${availQty} quantities left in the stock. Click on proceed to buy ${availQty} quantity`}
					</p>
				}
				btnText="Proceed"
				submit={() => intiateOrder(availQty)}
				cancelBtn={cancelSku}
				showButtons={true}
			/>
			<DialogBox
				isOpen={showQtyPopover}
				onChange={() => setPopoverQty(!showQtyPopover)}
				title="Save More"
				desc={
					<p className="text-14 font-normal pl-10">
						Add one more Qty and save on shipping
					</p>
				}
				showButtons={false}
				cancelBtn={() => setPopoverQty(false)}
			/>
			<div className="fixed bottom-0 h-56 flex w-full shadow-2">
				{props?.out_of_stock === 1 ? (
					<div className="flex justify-center items-center flex-1 uppercase bg-grey-stroke text-14 font-semibold">
						out of stock
					</div>
				) : (
					<>
						<Button
							onClick={
								showCart?.length > 0
									? () => handleCart(window, productData)
									: handleAddToCart
							}
							disabled={loader}
							loading={loader}
							className="flex-1 uppercase bg-white text-14 font-semibold leading-21"
						>
							{showCart?.length > 0
								? 'go to cart'
								: 'add to cart'}
						</Button>
						<Button
							disabled={loading || isLoading}
							loading={loading || isLoading}
							onClick={handleBuyNow}
							className="flex-1 uppercase bg-blue-primary text-white text-14 font-semibold leading-21"
						>
							buy now
						</Button>
					</>
				)}
			</div>
		</>
	);
};

export default Buttons;
