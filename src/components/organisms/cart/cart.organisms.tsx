import { useFetchCart } from '@/api/cart/use-cart';
import CartCard from '@/components/molecules/cart/cart-card.molecule';
import Loading from 'src/pages/loading';

const CartContainer = () => {
	const { data, isLoading, isRefetching } = useFetchCart();
	if (isLoading) {
		return <Loading />;
	}

	if (data?.status === 'error' || !data) {
		return (
			<div className="mt-20 text-center text-14 text-red font-normal">
				Error Occured!
			</div>
		);
	}
	if (data?.data?.length === 0) {
		return (
			<div className="mt-20 text-center font-normal">
				Your cart is empty!
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{data.data.map((item) => (
				<CartCard
					name={item.name}
					productHash={item.product_hash}
					finalPrice={item.finalPrice}
					retailPrice={item.retail_price}
					imgHash={item.img_hash}
					minQuantity={item.min_quantity}
					maxQuantity={item.max_quantity}
					packQuantity={item.pack_quantity}
					quantity={item.quantity}
					cart_id={item.cart_id}
				/>
			))}
		</div>
	);
};

export default CartContainer;
