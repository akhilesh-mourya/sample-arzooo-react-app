import { useFetchCart } from '@/api/cart/use-cart';
import { useCreateOrderCartMutation } from '@/api/product/create-order.api';
import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import Button from '@/components/atoms/button.atom';
import Rupee from '@/components/atoms/rupee.atom';
import CartContainer from '@/components/organisms/cart/cart.organisms';
import Layout from '@/components/organisms/layout/layout.layout';
import { useAuth } from '@/context/auth.context';
import { ORDER_CONSTANTS } from '@/helpers/persistent.helpers';
import useCart from '@/hooks/useCart.hook';
import axoisInstance from '@/services/http.service';
import { useState } from 'react';

const Cart: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { total } = useCart();
	const { data } = useFetchCart();
	const { session } = useAuth();
	const {
		mutate: createOrder,
		isLoading,
		isError,
	} = useCreateOrderCartMutation();
	//create order
	function intiateOrder() {
		let productDetails = [];
		data.data.map((item) => {
			let newObj = {
				productId: item.product_id,
				quantity: item.quantity,
			};
			productDetails.push(newObj);
		});

		let orderDetails = {
			adminId: null,
			sellerId: session.user_id,
			productDetails: productDetails,
			adminPrice: 0,
			customerAddressId: null,
			type: ORDER_CONSTANTS.SELLER_FOR_SELF,
		};
		createOrder(orderDetails);
	}

	// handle pay
	function handlePay() {
		let productIds = [];
		data.data.map((item) => {
			productIds.push(item.product_id);
		});
		setLoading(true);
		let productIdData = {
			productIds,
		};
		// 	//check sku
		axoisInstance
			.post(
				`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.CHECK_SKU}`,
				productIdData,
			)
			.then((res) => {
				setLoading(false);
				if (res?.data?.status === 'success') {
					intiateOrder();
				}
			})
			.catch((err) => {
				setLoading(false);
				console.info(err);
			});
	}

	return (
		<Layout webBack={false} classNames="mt-50">
			<div className="p-12 mb-40">
				<CartContainer />
			</div>
			{data?.data?.length > 0 ? (
				<Button
					loading={loading || isLoading}
					disabled={loading || isLoading}
					onClick={handlePay}
					className="bg-blue-primary h-56 w-full fixed bottom-0 text-white"
				>
					Pay <Rupee money={total} />
				</Button>
			) : (
				''
			)}
		</Layout>
	);
};
export default Cart;
