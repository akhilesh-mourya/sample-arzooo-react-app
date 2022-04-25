declare namespace Entities {
	type BrandFilter = {
		brand_id: number;
		brand_name: string;
	};

	type CategoryFilter = {
		attribute_id: number;
		attribute_name: string;
		filter_option: string;
		filter_priority: number;
	};
}
