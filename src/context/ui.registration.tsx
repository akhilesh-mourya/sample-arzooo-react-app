/**
 * Registration context
 *
 * since the registration is moved in pages, i had to use the global context.
 * if you find any better logic feel free to change it :)
 * you are welcome.
 *
 * Author: Vakadu Vinod
 */

import React, { useReducer, useMemo, FC } from 'react';
export interface State {
	firmInformation: CommonTypes.FirmInformationType;
	businessInformation: CommonTypes.BusinessInfoType;
	kycInfo: {
		panNumber: string;
		panImage: any;
		gstNumber: string;
		gstImage: any;
	};
	storeImages: {
		store1Image: any;
		store2Image: any;
		store3Image: any;
	};
	radioSelected: string;
	isDeclaration: boolean;
}

const initialState = {
	firmInformation: {
		firm_name: '',
		mobile_number: '',
		owner_name: '',
		email: '',
		pincode: '',
		city: '',
		state: '',
		address: '',
		referalcode: '',
	},
	businessInformation: {
		itemType: null,
		dropdownType: null,
		businessType: null,
		businessCategory: null,
		businessSale: null,
	},
	kycInfo: {
		panNumber: '',
		panImage: null,
		gstNumber: '',
		gstImage: null,
	},
	storeImages: {
		store1Image: null,
		store2Image: null,
		store3Image: null,
	},
	radioSelected: '',
	isDeclaration: false,
};

type Action =
	| {
			type: 'SET_FIRM_INFORMATION';
			firmInformation: CommonTypes.FirmInformationType;
	  }
	| {
			type: 'SET_KYC_INFO';
			panNumber: string;
			panImage: any;
			gstNumber: string;
			gstImage: any;
	  }
	| {
			type: 'SET_BUSINESS_INFO';
			itemType: string;
			dropdownType: string;
			businessType: string;
			businessCategory: string;
			businessSale: string;
	  }
	| {
			type: 'SET_STORE_IMAGES';
			store1Image: any;
			store2Image: any;
			store3Image: any;
	  }
	| {
			type: 'SET_RADIO_GST';
			radioSelected: string;
	  }
	| {
			type: 'SET_GST_DECLARATION';
			isDeclaration: boolean;
	  };

export const RegistrationContext = React.createContext<State | any>(
	initialState,
);

RegistrationContext.displayName = 'RegistrationContext';

function registrationReducer(state: State, action: Action) {
	switch (action.type) {
		case 'SET_FIRM_INFORMATION': {
			return {
				...state,
				firmInformation: action.firmInformation,
			};
		}
		case 'SET_BUSINESS_INFO': {
			return {
				...state,
				businessInformation: {
					...state.businessInformation,
					itemType: action.itemType,
					dropdownType: action.dropdownType,
					businessType: action.businessType,
					businessCategory: action.businessCategory,
					businessSale: action.businessSale,
				},
			};
		}
		case 'SET_KYC_INFO': {
			return {
				...state,
				kycInfo: {
					...state.kycInfo,
					panNumber: action.panNumber.toUpperCase(),
					panImage: action.panImage,
					gstNumber: action.gstNumber.toUpperCase(),
					gstImage: action.gstImage,
				},
			};
		}
		case 'SET_STORE_IMAGES': {
			return {
				...state,
				storeImages: {
					...state.storeImages,
					store1Image: action.store1Image,
					store2Image: action.store2Image,
					store3Image: action.store3Image,
				},
			};
		}
		case 'SET_RADIO_GST': {
			return {
				...state,
				radioSelected: action.radioSelected,
			};
		}
		case 'SET_GST_DECLARATION': {
			return {
				...state,
				isDeclaration: action.isDeclaration,
			};
		}
	}
}

export const RegistrationProvider: FC = (props) => {
	const [state, dispatch] = useReducer(registrationReducer, initialState);
	const setFirmInformation = (
		firmInformation: CommonTypes.FirmInformationType,
	) => dispatch({ type: 'SET_FIRM_INFORMATION', firmInformation });
	const setBusinessInfo = (
		itemType: string,
		dropdownType: string,
		businessType: string,
		businessCategory: string,
		businessSale: string,
	) =>
		dispatch({
			type: 'SET_BUSINESS_INFO',
			itemType,
			dropdownType,
			businessType,
			businessCategory,
			businessSale,
		});
	const setKycInformation = (
		panNumber: string,
		panImage: any,
		gstNumber: string,
		gstImage: any,
	) =>
		dispatch({
			type: 'SET_KYC_INFO',
			panNumber,
			panImage,
			gstNumber,
			gstImage,
		});
	const setStoreImages = (
		store1Image: any,
		store2Image: any,
		store3Image: any,
	) =>
		dispatch({
			type: 'SET_STORE_IMAGES',
			store1Image,
			store2Image,
			store3Image,
		});
	const setRadioSelected = (radioSelected: string) =>
		dispatch({ type: 'SET_RADIO_GST', radioSelected });
	const setGstDeclaration = (isDeclaration: boolean) =>
		dispatch({ type: 'SET_GST_DECLARATION', isDeclaration });

	const value = useMemo(
		() => ({
			...state,
			setFirmInformation,
			setBusinessInfo,
			setKycInformation,
			setStoreImages,
			setRadioSelected,
			setGstDeclaration,
		}),
		[state],
	);

	return <RegistrationContext.Provider value={value} {...props} />;
};

export const useRegistration = () => {
	const context = React.useContext(RegistrationContext);
	if (context === undefined) {
		throw new Error(
			`useRegistration must be used within a RegistrationProvider`,
		);
	}
	return context;
};

export const ManagedRegistrationContext: React.FC = ({ children }) => (
	<RegistrationProvider>{children}</RegistrationProvider>
);
