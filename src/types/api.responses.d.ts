import { type } from 'os';

declare namespace ApiResponses {
	type ApiResponse<Data> = { status: 'success' | 'error' } & Data;

	type SellOnArzoooResponse = ApiResponse<{
		data: {};
	}>;

	type UserDetailsResponse = ApiResponse<{
		data: {
			addressId: number;
			address: string;
			category: string;
			state: string;
			city: string;
			date_of_birth: string;
			email: string;
			firm_name: string;
			gender: string;
			gstin: number;
			mobile_number: number;
			owner_name: string;
			pincode: number;
			profile_photo: any;
			store_potential: string;
			type: string;
			pan: string;
		};
	}>;
	type FiltersResponse = ApiResponse<{
		data: {
			status: string;
			brandFilter: Entities.BrandFilter;
			categoryFilter: Entities.CategoryFilter;
		};
	}>;

	type CategoryItemResponse = ApiResponse<{
		falcon_product: number;
		finalPrice: number;
		image_cache_key: boolean;
		img_hash: string;
		isExpress: number;
		mrp: number;
		offer: number;
		outOfStock: number;
		parent: string;
		product_hash: string;
		title: string;
	}>;

	type OrderDetailsResponse = ApiResponse<{
		data: CommonTypes.OrderDetailsType;
	}>;
}
