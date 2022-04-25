/**
 * Cart context
 *
 * this context is used used for cart changes :)
 *
 * Author: Vakadu Vinod
 */

import React, { useReducer, useMemo, FC } from 'react';

export interface State {
	cartCount: number;
	cartData: any;
}

const initialState = {
	cartCount: 0,
	cartData: [],
};

type Action =
	| {
			type: 'SET_CART_COUNT';
			cartCount: number;
	  }
	| {
			type: 'SET_CART_DATA';
			cartData: any;
	  };

export const CartContext = React.createContext<State | any>(initialState);

CartContext.displayName = 'CartContext';

function cartReducer(state: State, action: Action) {
	switch (action.type) {
		case 'SET_CART_COUNT': {
			return {
				...state,
				cartCount: action.cartCount,
			};
		}
		case 'SET_CART_DATA': {
			return {
				...state,
				cartData: action.cartData,
			};
		}
	}
}

export const CartProvider: FC = (props) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);
	const setCartCount = (cartCount: number) =>
		dispatch({ type: 'SET_CART_COUNT', cartCount });
	const setCartData = (cartData: any) =>
		dispatch({ type: 'SET_CART_DATA', cartData });

	const value = useMemo(
		() => ({
			...state,
			setCartCount,
			setCartData,
		}),
		[state],
	);

	return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
	const context = React.useContext(CartContext);
	if (context === undefined) {
		throw new Error(`useCart must be used within a CartProvider`);
	}
	return context;
};

export const ManagedCartContext: React.FC = ({ children }) => (
	<CartProvider>{children}</CartProvider>
);
