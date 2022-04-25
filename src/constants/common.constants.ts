/**
 * Contant helpers
 * Will try to remove this.
 * Bcz the page might get very heavy and dont use these things for constants,
 * its bad
 *
 * Author: Vakadu Vinod
 */

export const registrationCategories = [
	'TV & Appliances',
	'Electrical Store',
	'Kitchen Appliances',
	'Mobiles',
	'Computers',
];

export const registrationBusiness = ['Retailer', 'Wholeseller'];

export const registrationSale = [
	'<10L',
	'10 – 15L',
	'15 – 25L',
	'25 – 40L',
	'40+L',
];

export const sellOnArzooInfo = [
	{
		name: 'brand',
		label: 'Brand*',
		placeholder: 'Samsung',
		className: 'mb-20',
		inputMode: 'text',
		validations: {
			required: 'brand is required',
			pattern: {
				value: /^[a-zA-Z ]*$/,
				message: 'invalid brand name',
			},
		},
	},
	{
		name: 'model',
		label: 'Model Name*',
		placeholder: '32T4310',
		className: 'mb-20',
		inputMode: 'text',
		validations: {
			required: 'model name is required',
		},
	},
	{
		name: 'quantity',
		label: 'Above 10 unit only*',
		placeholder: '20',
		className: 'mb-20',
		inputMode: 'numeric',
		validations: {
			required: 'quantity is required',
		},
	},
	{
		name: 'price',
		label: 'Deal Price*',
		placeholder: '9999',
		className: 'mb-20',
		inputMode: 'numeric',
		validations: {
			required: 'price is required',
		},
	},
];
