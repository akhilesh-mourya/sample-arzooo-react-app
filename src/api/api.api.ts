import axios from 'axios';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';

export const arzooopay = (data, cb) => {
	axios
		.post(
			`${process.env.NEXT_PUBLIC_MAIN}/payment/store/create_custom_payment/cash_free`,
			data,
		)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};

export const arzooopayStore = (id, cb) => {
	axios
		.get(
			`${process.env.NEXT_PUBLIC_MAIN}/payment/store/custom_payment_detail?paymentId=${id}`,
		)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};

export const fetchPincodeDetails = (pincode, cb) => {
	axios
		.get(
			`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.PINCODE}${pincode}`,
		)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};

export const bdClusterIDs = (id, cb) => {
	axios
		.get(`${process.env.NEXT_PUBLIC_MAIN}/user/clusters/${id}`)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};

export const clusterDistrictList = (id, cb) => {
	axios
		.get(
			`${process.env.NEXT_PUBLIC_MAIN}/user/clusterDistricts?clusterId=${id}`,
		)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};

export const clusterDistrictStoreList = (
	searchStr,
	districtId,
	clusterID,
	summaryType,
	cb,
) => {
	axios
		.get(
			// `${process.env.NEXT_PUBLIC_MAIN}/user/searchStore?clusterId=${clusterID}&districtId=${districtId}&type=${summaryType}`
			!searchStr || searchStr === null
				? `${process.env.NEXT_PUBLIC_MAIN}/user/searchStore?clusterId=${clusterID}&districtId=${districtId}&type=${summaryType}`
				: districtId &&
						searchStr &&
						`${process.env.NEXT_PUBLIC_MAIN}/user/searchStore?clusterId=${clusterID}&districtId=${districtId}&type=${summaryType}&str=${searchStr}`,
		)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};

export const storeDetails = (storeId, cb) => {
	axios
		.get(`${process.env.NEXT_PUBLIC_MAIN}/user/performance/${storeId}`)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};

export const clusterSummaryTiles = (districtId, clusterId, cb) => {
	axios
		.get(
			`${process.env.NEXT_PUBLIC_MAIN}/user/summaryPoints?clusterId=${clusterId}&districtId=${districtId}`,
		)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};

export const zsmStateList = (cb) => {
	axios
		.get(`${process.env.NEXT_PUBLIC_MAIN}/user/states`)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};

export const zsmBDClusterList = (stateId, zsmUserId, cb) => {
	axios
		.get(
			`${process.env.NEXT_PUBLIC_MAIN}/user/zsmBdList?state=${stateId}&zsmUserId=${zsmUserId}`,
		)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};

export const summaryPointsStoreList = (stateId, zsmUserId, cb) => {
	axios
		.get(
			`${process.env.NEXT_PUBLIC_MAIN}/user/zsmBdList?stateId=${stateId}&zsmUserId=${zsmUserId}`,
		)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};
// Get list of assigned state for zsm user
export const zsmUsersStateList = (cb) => {
	axios
		.get(`${process.env.NEXT_PUBLIC_MAIN}/user/zsmList`)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};

export const fetchProductDetails = (product, cb) => {
	axios
		.get(
			`${process.env.NEXT_PUBLIC_API}${API_ENDPOINTS.PRODUCT_DETAILS}${product}`,
		)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};

export const shipToDetails = (to, cb) => {
	axios
		.get(`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.SHIP_TO}${to}`)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};

export const fetchOrderTrackStatus = (trackingId, cb) => {
	axios
		.get(
			`${process.env.NEXT_PUBLIC_API}${API_ENDPOINTS.ORDER_TRACKING}${trackingId}`,
		)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};

export const submitAdminOrder = (data, headers, cb) => {
	axios
		.post(
			`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.CREATE_ADMIN_ORDER}`,
			data,
			{
				headers: headers,
			},
		)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};

export const submitReturnRequest = (data, headers, cb) => {
	axios
		.patch(
			`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.ORDER_RETURN_REQUEST}`,
			data,
			{
				headers: headers,
			},
		)
		.then((result) => {
			cb(null, result.data);
		})
		.catch((e) => {
			cb(e, null);
		});
};
