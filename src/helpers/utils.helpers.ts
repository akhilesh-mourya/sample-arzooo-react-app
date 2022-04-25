// format the price with commas
export function formatPrice(num) {
	if (!num) return num;
	let x = num;
	x = x.toString();
	let lastThree = x.substring(x.length - 3);
	let otherNumbers = x.substring(0, x.length - 3);
	if (otherNumbers !== '') lastThree = ',' + lastThree;
	let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
	return res;
}

//getting years
export function expiryYears() {
	let arr = [];
	let date = new Date();
	let currentYear = date.getFullYear();
	for (let i = currentYear; i < currentYear + 40; i++) {
		let year = i.toString().slice(2);
		arr.push(year);
	}
	return arr;
}

//getting months
export function expiryMonths() {
	let arr = [];
	for (let i = 1; i <= 12; i++) {
		let month = i < 9 ? '0' + i : `${i}`;
		arr.push(month);
	}
	return arr;
}

// capitalize the first word
export function capitalize(text) {
	if (!text) return;
	let words,
		textArr = [];
	words = text.split(' ');
	textArr = [];
	words.forEach((word) => {
		textArr.push(word[0].toUpperCase() + word.slice(1));
	});
	return textArr.join(' ');
}

export function enumerateDaysBetweenDates(startDate, endDate) {
	let now = startDate,
		dates = [];

	while (now.isSameOrBefore(endDate)) {
		dates.push(now.format('DD-MM-YYYY'));
		now.add(1, 'days');
	}
	return dates;
}

export function enumerateDaysBetweenDate(startDate, endDate) {
	let now = startDate,
		dates = [];

	while (now.isSameOrBefore(endDate)) {
		dates.push(now.format('MM-DD-YYYY'));
		now.add(1, 'days');
	}
	return dates;
}

export function getOrderTrackStatusMapping(status: string) {
	switch (status) {
		case 'DELIVERED':
			return 'Delivered';
		case 'OUT_FOR_DELIVERY':
			return 'Out for delivery';
		case 'UNDEL_REATTEMPT':
			return 'Reattempt delivery';
		case 'Delivery Attempted':
			return 'Delivery Attempted';
		default:
			return 'In transit';
	}
}

export function getMaxProductCount(sales_quantity, max_quantity) {
	const max_qty =
		sales_quantity && max_quantity && sales_quantity < max_quantity
			? sales_quantity
			: max_quantity
			? max_quantity
			: sales_quantity
			? sales_quantity
			: 0;
	return max_qty;
}

export function getNextIncQuantity(
	quantity,
	pack_quantity,
	max_quantity,
	sales_qty,
) {
	let nextQuantity = quantity + pack_quantity;
	if (quantity < pack_quantity) {
		nextQuantity = pack_quantity;
	}
	if (
		nextQuantity > max_quantity ||
		(quantity < sales_qty && sales_qty <= pack_quantity)
	) {
		nextQuantity = quantity + 1;
	}
	return nextQuantity;
}

export function getNextDecQuantity(
	quantity,
	pack_quantity,
	max_quantity,
	sales_qty,
) {
	let nextQuantity = quantity - pack_quantity;
	if (
		max_quantity - quantity < pack_quantity &&
		quantity % pack_quantity !== 0
	) {
		nextQuantity = quantity - 1;
	}
	if (nextQuantity <= pack_quantity) {
		nextQuantity = pack_quantity;
	}
	if (nextQuantity <= 0) {
		nextQuantity = 1;
	}
	if (sales_qty <= pack_quantity && quantity > 1) {
		nextQuantity = quantity - 1;
	}
	return nextQuantity;
}

function limit(val, max) {
	if (val.length === 1 && val[0] > max[0]) {
		val = '0' + val;
	}

	if (val.length === 2) {
		if (Number(val) === 0) {
			val = '01';

			//this can happen when user paste number
		} else if (val > max) {
			val = max;
		}
	}
	return val;
}

export function cardExpiry(val) {
	let month = limit(val.substring(0, 2), '12');
	let date = limit(val.substring(2, 4), '31');
	return month + (date.length ? '/' + date : '');
}

export function formatUrl(title: string) {
	if (!title) return title;
	for (let i = 0; i < 2; i++) {
		// str.replace(/\//g, "-")
		title = title.replace(/|/g, '');
		title = title.replace('|', '');
	}
	title = title.replace(/\//g, '-');
	title = title.replace(/\(/g, '');
	title = title.replace(/\)/g, '');
	title = title.replace(/ /g, '-');
	title = title.replace(/([+])/g, '-');
	return title;
}

export const convertArrayToObject = (array, key) => {
	const initialValue = {};
	return array.reduce((obj, item) => {
		return {
			...obj,
			[item[key]]: item,
		};
	}, initialValue);
};
