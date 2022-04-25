/**
 * Payment context
 *
 * this context is used used for payment changes :)
 *
 * Author: Vakadu Vinod
 */

import React, { useReducer, useMemo, FC } from 'react';

export interface State {
	cartCount: number;
	paymentData: any;
}

const initialState = {
	cartCount: 0,
	paymentData: {},
};

type Action =
	| {
			type: 'SET_CART_COUNT';
			cartCount: number;
	  }
	| {
			type: 'SET_PAYMENT_DATA';
			paymentData: any;
	  };

export const PaymentContext = React.createContext<State | any>(initialState);

PaymentContext.displayName = 'PaymentContext';

function paymentReducer(state: State, action: Action) {
	switch (action.type) {
		case 'SET_CART_COUNT': {
			return {
				...state,
				cartCount: action.cartCount,
			};
		}
		case 'SET_PAYMENT_DATA': {
			return {
				...state,
				paymentData: action.paymentData,
			};
		}
	}
}

export const PaymentProvider: FC = (props) => {
	const [state, dispatch] = useReducer(paymentReducer, initialState);
	const setCartCount = (cartCount: number) =>
		dispatch({ type: 'SET_CART_COUNT', cartCount });
	const setPaymentData = (paymentData: any) =>
		dispatch({ type: 'SET_PAYMENT_DATA', paymentData });

	const value = useMemo(
		() => ({
			...state,
			setCartCount,
			setPaymentData,
		}),
		[state],
	);

	return <PaymentContext.Provider value={value} {...props} />;
};

export const usePayments = () => {
	const context = React.useContext(PaymentContext);
	if (context === undefined) {
		throw new Error(`usePayments must be used within a PaymentProvider`);
	}
	return context;
};

export const ManagedPaymentContext: React.FC = ({ children }) => (
	<PaymentProvider>{children}</PaymentProvider>
);
