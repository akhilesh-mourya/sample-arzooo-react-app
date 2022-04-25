import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import ImageFile from '@/components/atoms/image.atom';
import { back, handleCart, shareProduct } from '@/helpers/scripts.helpers';
import { useUI } from '@/context/ui.context';
import { useCart } from '@/context/cart.context';
import axoisInstance from '@/services/http.service';
import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';

const Header = (props: {
	showBack: boolean;
	title: string;
	webBack?: boolean;
	showShare?: boolean;
	showCart?: boolean;
	headerBackground?: string;
}) => {
	const router = useRouter();
	const { productData } = useUI();
	const { setCartCount, cartCount, setCartData } = useCart();

	useEffect(() => {
		if (props.showCart) {
			fetchCart();
		}
	}, []);

	//fetch cart
	const fetchCart = async () => {
		axoisInstance
			.get(`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.CART}`)
			.then((response: any) => {
				if (response?.data?.status === 'success') {
					setCartCount(response?.data?.data?.length);
					setCartData(response?.data?.data);
				} else {
				}
			})
			.catch((err: any) => {});
	};

	function bg() {
		if (props?.headerBackground) {
			return `bg-${props.headerBackground}`;
		} else {
			return `bg-white border-b border-grey-stroke shadow-1`;
		}
	}

	return (
		<div
			className={cn(
				`flex justify-between items-center fixed w-full z-10 top-0 h-56 px-16`,
				bg(),
			)}
		>
			<div className="flex items-center">
				<div
					className="flex"
					onClick={
						props.webBack
							? () => router?.back()
							: () => back(window)
					}
				>
					<ImageFile src="back.svg" width={24} height={24} />
				</div>
				{props.title ? (
					<div className="text-20 leading-21 font-brandon font-bold px-16 tracking-0.29">
						{props.title}
					</div>
				) : null}
			</div>
			<div className="flex">
				{props.showCart && (
					<div
						className="flex items-center justify-center px-10 relative"
						onClick={() => handleCart(window, productData)}
					>
						<ImageFile src="Cart.svg" width={24} height={24} />
						{cartCount && cartCount > 0 ? (
							<div className="absolute -top-5 right-0 bg-blue-primary rounded-full w-18 h-18 flex justify-center items-center z-3 text-center">
								<span
									className="text-10 text-white"
									id="arzooo-cart"
								>
									{cartCount}
								</span>
							</div>
						) : null}
					</div>
				)}
				{props.showShare && (
					<div
						className="flex items-center justify-center pl-10"
						onClick={() => shareProduct(window, productData)}
					>
						<ImageFile src="Share.svg" width={24} height={24} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
