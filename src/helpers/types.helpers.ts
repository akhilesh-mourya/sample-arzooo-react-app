/**
 * Remove this file and move it to types.d file
 * remove it in future
 *
 * Author: Vakadu Vinod
 */

export type RewardHistoryType = {
	sellerId: string;
	startDate: string;
	endDate: string;
	pageNo: number;
	download: boolean;
	isWallet: boolean;
};

export type RewardHistoryOrderType = {
	amount: number;
	createdAt: string;
	debit: number;
	orderId: number;
	paidThrough: string;
	shipmentNumber: number;
};
