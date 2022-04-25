import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import axoisInstance from '@/services/http.service';
import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import { CONSTANTS } from '@/helpers/persistent.helpers';
import CategoryItem from '@/molecules/category/category.molecule';

const ProductFeedSolidLoader = dynamic(
	import('@/atoms/loaders/product-feed-solid-loader'),
	{
		ssr: false,
	},
);

const Category = () => {
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState([]); //
	const loader = useRef(null); //loader reference

	//fetch data on router update category
	useEffect(() => {
		if (router?.isReady) {
			fetchData();
		}
	}, [router?.isReady]);

	// here we handle what happens when user scrolls to Load More div
	// in this case we just update page variable
	const handleObserver = useCallback((entries) => {
		const target = entries[0];
		if (target.isIntersecting) {
			setPage((prev) => prev + 1);
		}
	}, []);

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: '20px',
			threshold: 0,
		};
		const observer = new IntersectionObserver(handleObserver, option);
		if (loader.current) observer.observe(loader.current);
	}, [handleObserver]);

	const fetchData = async () => {
		let data = {
			brandArr: [],
			filterObj: {
				attribute_id: [],
				selectedFilters: [],
			},
			order: 'ASC',
			discount: false,
		};
		await axoisInstance
			.post(
				`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.OFFER_PRODS}?isFalcon=0&page=${page}&id=${router?.query?.id}`,
				data,
			)
			.then((response) => {
				setLoading(false);
				if (response?.data?.status === 'success') {
					setData(response?.data?.data);
				} else {
					setError(true);
				}
			})
			.catch((err) => {
				setLoading(false);
				setError(true);
			});
	};

	if (loading) {
		return <ProductFeedSolidLoader />;
	}

	if (error) {
		return (
			<div className="mt-20 text-center text-14 text-red font-normal">
				Error Occured!
			</div>
		);
	}

	return (
		<>
			<div className="grid grid-cols-2 gap-6 pt-20 mx-6">
				{data?.map((item: any) => {
					return <CategoryItem key={item.product_hash} item={item} />;
				})}
			</div>
			<div className="text-center" ref={loader}>
				<h2>Load More</h2>
			</div>
		</>
	);
};

export default Category;
