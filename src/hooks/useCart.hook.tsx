import { useFetchCart } from '@/api/cart/use-cart';
import { useEffect, useState } from 'react';

const useCart = () => {
	const { data } = useFetchCart();
	const [total, setTotal] = useState(0);

	useEffect(() => {
		let totalPrice = 0;
		if (data?.data && data.data.length > 0) {
			data.data.map((item) => {
				totalPrice += item.finalPrice * item.quantity;
			});
			setTotal(totalPrice);
		}
	}, [data]);
	return { total };
};

export default useCart;
