/**
 * UI context
 *
 * this context is used used for ui changes :)
 *
 * Author: Vakadu Vinod
 */

import React, { useReducer, useMemo, FC } from 'react';

import { ManagedRegistrationContext as RegistrationContext } from './ui.registration';
import { ManagedCartContext } from './cart.context';
export interface State {
	displayModal: boolean;
	displaySheet: boolean;
	sheetView: string;
	sheetData: any;
	profileData: any;
	session: object;
	productData: any;
	showQtyPopover: boolean;
	hideQtyPopover: boolean;

	//clp
	brands: string[];
	categories: any;

	//return
	orderDetails: CommonTypes.OrderDetailsType;

	//payments
	mop: string;
	payThru: string;
	toggleWallet: boolean;
	walletBalance: number;
	ppayActive: boolean;
	ppayBalance: number;
	totalAmount: number;
}

const initialState = {
	displayModal: false,
	displaySheet: false,
	sheetView: '',
	sheetData: null,
	profileData: {},
	session: {},
	productData: {},
	showQtyPopover: false,
	hideQtyPopover: true,
	//clp
	brands: [],
	categories: {},

	//return
	orderDetails: {},

	//payments
	paymentData: {
		orderId: null,
		shipmentCharge: null,
		tcsCharge: null,
		storeType: '',
		orderAmount: null,
		totalOrderAmount: null,
		pod: null,
		pad: null,
		pPay: null,
		credit: null,
		finboxId: '',
		openCreditData: {},
		gstShipmentCharge: null,
		vpaDetails: {
			vpaNumber: '',
			vpaIfsc: '',
			vpaUpi: '',
		},
		walletData: {
			walletBalance: null,
			useableWalletBalance: null,
		},
		indifiData: {},
		finboxData: {},
		arzoooCreditData: {
			creditBalance: null,
			creditPartner: '',
			maxCreditLimit: null,
		},
		rupifiData: {},
		ePayLaterData: {},
		type: '',
	},
	mop: '',
	payThru: '',
	toggleWallet: false,
	walletBalance: 0,
	ppayActive: false,
	ppayBalance: 0,
	totalAmount: 0,
};

type Action =
	| {
			type: 'OPEN_SHEET';
	  }
	| {
			type: 'CLOSE_SHEET';
	  }
	| {
			type: 'SET_SESSION';
			session: {};
	  }
	| {
			type: 'SET_SHEET_DATA';
			data: any;
	  }
	| {
			type: 'SET_SHEET_VIEW';
			view: SHEET_VIEWS;
	  }
	| {
			type: 'SET_PROFILE_DATA';
			profileData: any;
	  }
	| {
			type: 'OPEN_MODAL';
	  }
	| {
			type: 'CLOSE_MODAL';
	  }
	| {
			type: 'SET_PRODUCT_DATA';
			productData: any;
	  }

	//return
	| {
			type: 'SET_ORDER_DETAILS';
			orderDetails: {};
	  }

	//clp
	| {
			type: 'SET_BRANDS';
			brands: string[];
	  }
	| {
			type: 'SET_CATEGORIES';
			categories: any;
	  }

	//payments
	| {
			type: 'SET_PAYMENT_DATA';
			paymentData: CommonTypes.OrderDataType;
	  }
	| {
			type: 'SET_MOP';
			mop: string;
	  }
	| {
			type: 'SET_PAY_THRU';
			payThru: string;
	  }
	| {
			type: 'SET_WALLET';
			toggleWallet: boolean;
	  }
	| {
			type: 'SET_WALLET_BALANCE';
			walletBalance: number;
	  }
	| {
			type: 'SET_PPAY_ACTIVE';
			ppayActive: boolean;
	  }
	| {
			type: 'SET_PPAY_BALANCE';
			ppayBalance: number;
	  }
	| {
			type: 'SET_TOTAL_AMOUNT';
			totalAmount: number;
	  }
	| {
			type: 'SET_POPOVER_QTY';
			showQtyPopover: boolean;
	  }
	| {
			type: 'SET_HIDE_POPOVER_QTY';
			hideQtyPopover: boolean;
	  };

type SHEET_VIEWS = 'REGISTRATION_INFO' | 'SORT_FILTER' | 'CATEGORY_FILTER';

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
	switch (action.type) {
		case 'OPEN_MODAL': {
			return {
				...state,
				displayModal: true,
			};
		}
		case 'CLOSE_MODAL': {
			return {
				...state,
				displayModal: false,
			};
		}
		case 'SET_SESSION': {
			return {
				...state,
				session: action.session,
			};
		}
		case 'OPEN_SHEET': {
			return {
				...state,
				displaySheet: true,
			};
		}
		case 'CLOSE_SHEET': {
			return {
				...state,
				displaySheet: false,
			};
		}
		case 'SET_SHEET_VIEW': {
			return {
				...state,
				sheetView: action.view,
			};
		}
		case 'SET_SHEET_DATA': {
			return {
				...state,
				sheetData: action.data,
			};
		}
		case 'SET_PROFILE_DATA': {
			return {
				...state,
				profileData: action.profileData,
			};
		}
		case 'SET_PRODUCT_DATA': {
			return {
				...state,
				productData: action.productData,
			};
		}

		//clp
		case 'SET_BRANDS': {
			return {
				...state,
				brands: action.brands,
			};
		}
		case 'SET_CATEGORIES': {
			return {
				...state,
				categories: action.categories,
			};
		}

		//return
		case 'SET_ORDER_DETAILS': {
			return {
				...state,
				orderDetails: action.orderDetails,
			};
		}

		//payments
		case 'SET_PAYMENT_DATA': {
			return {
				...state,
				paymentData: action.paymentData,
			};
		}
		case 'SET_MOP': {
			return {
				...state,
				mop: action.mop,
			};
		}
		case 'SET_PAY_THRU': {
			return {
				...state,
				payThru: action.payThru,
			};
		}
		case 'SET_WALLET': {
			return {
				...state,
				toggleWallet: action.toggleWallet,
			};
		}
		case 'SET_WALLET_BALANCE': {
			return {
				...state,
				walletBalance: action.walletBalance,
			};
		}
		case 'SET_PPAY_ACTIVE': {
			return {
				...state,
				ppayActive: action.ppayActive,
			};
		}
		case 'SET_PPAY_BALANCE': {
			return {
				...state,
				ppayBalance: action.ppayBalance,
			};
		}
		case 'SET_TOTAL_AMOUNT': {
			return {
				...state,
				totalAmount: action.totalAmount,
			};
		}
		case 'SET_POPOVER_QTY': {
			return {
				...state,
				showQtyPopover: action.showQtyPopover,
			};
		}
		case 'SET_HIDE_POPOVER_QTY': {
			return {
				...state,
				hideQtyPopover: action.hideQtyPopover,
			};
		}
	}
}

export const UIProvider: FC = (props) => {
	const [state, dispatch] = useReducer(uiReducer, initialState);

	const openModal = () => dispatch({ type: 'OPEN_MODAL' });
	const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });
	const openSheet = () => dispatch({ type: 'OPEN_SHEET' });
	const closeSheet = () => dispatch({ type: 'CLOSE_SHEET' });
	const setSession = (session) => dispatch({ type: 'SET_SESSION', session });
	const setSheetView = (view: SHEET_VIEWS) =>
		dispatch({ type: 'SET_SHEET_VIEW', view });
	const setSheetData = (data: any) =>
		dispatch({ type: 'SET_SHEET_DATA', data });
	const setProfileData = (profileData: any) =>
		dispatch({ type: 'SET_PROFILE_DATA', profileData });
	const setProductData = (productData: any) =>
		dispatch({ type: 'SET_PRODUCT_DATA', productData });

	//clp
	const setBrands = (brands: string[]) =>
		dispatch({ type: 'SET_BRANDS', brands });
	const setCategories = (categories: any) =>
		dispatch({ type: 'SET_CATEGORIES', categories });

	//return
	const setOrderDetails = (orderDetails: CommonTypes.OrderDetailsType) =>
		dispatch({ type: 'SET_ORDER_DETAILS', orderDetails });

	//payments
	const setPaymentData = (paymentData: CommonTypes.OrderDataType) =>
		dispatch({ type: 'SET_PAYMENT_DATA', paymentData });
	const setMop = (mop: string) => dispatch({ type: 'SET_MOP', mop });
	const setPayThru = (payThru: string) =>
		dispatch({ type: 'SET_PAY_THRU', payThru });
	const setWallet = (toggleWallet: boolean) =>
		dispatch({ type: 'SET_WALLET', toggleWallet });
	const setWalletBalance = (walletBalance: number) =>
		dispatch({ type: 'SET_WALLET_BALANCE', walletBalance });
	const setPpayActive = (ppayActive: boolean) =>
		dispatch({ type: 'SET_PPAY_ACTIVE', ppayActive });
	const setPpayBalance = (ppayBalance: number) =>
		dispatch({ type: 'SET_PPAY_BALANCE', ppayBalance });
	const setTotalAmount = (totalAmount: number) =>
		dispatch({ type: 'SET_TOTAL_AMOUNT', totalAmount });
	const setPopoverQty = (showQtyPopover: boolean) =>
		dispatch({ type: 'SET_POPOVER_QTY', showQtyPopover });
	const setHidePopoverQty = (hideQtyPopover: boolean) =>
		dispatch({ type: 'SET_HIDE_POPOVER_QTY', hideQtyPopover });

	const value = useMemo(
		() => ({
			...state,
			openModal,
			closeModal,
			openSheet,
			closeSheet,
			setSheetView,
			setSheetData,
			setProfileData,
			setSession,
			setProductData,

			//clp
			setBrands,
			setCategories,

			//return
			setOrderDetails,

			//payments
			setPaymentData,
			setMop,
			setPayThru,
			setWallet,
			setWalletBalance,
			setPpayActive,
			setPpayBalance,
			setTotalAmount,
			setHidePopoverQty,
			setPopoverQty,
		}),
		[state],
	);

	return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
	const context = React.useContext(UIContext);
	if (context === undefined) {
		throw new Error(`useUI must be used within a UIProvider`);
	}
	return context;
};

export const ManagedUIContext: React.FC = ({ children }) => (
	<UIProvider>
		<RegistrationContext>
			<ManagedCartContext>{children}</ManagedCartContext>
		</RegistrationContext>
	</UIProvider>
);
