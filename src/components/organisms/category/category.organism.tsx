import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import CategoryItem from '@/molecules/category/category.molecule';
import { useProductsQuery } from '@/api/category/use-products.api';

const ProductFeedSolidLoader = dynamic(
	import('@/atoms/loaders/product-feed-solid-loader'),
	{
		ssr: false,
	},
);

const Category = () => {
	const { query } = useRouter();
	const loadMoreRef = useRef();
	const page = useRef(1);
	const {
		isLoading,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
		data,
		error,
	} = useProductsQuery({ limit: 10, ...query });

	useEffect(() => {
		if (!hasNextPage) {
			return;
		}
		const observer = new IntersectionObserver((entries) =>
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					page.current = page.current + 1;
					fetchNextPage({ pageParam: page.current });
				}
			}),
		);
		const el = loadMoreRef?.current;
		observer.observe(el);
		return () => {
			observer.unobserve(el);
		};
	}, [loadMoreRef.current, hasNextPage]);

	if (isLoading && !data?.pages?.length) {
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
				{data?.pages?.map((page) => {
					return page?.data?.data?.map((item) => (
						<CategoryItem key={item.product_hash} item={item} />
					));
				})}
			</div>
			<div
				ref={loadMoreRef}
				className={!hasNextPage ? 'hidden' : 'text-center mt-20'}
			>
				{isFetchingNextPage ? (
					<>
						<span className="text-14 font-semibold leading-21">
							Loading more...
						</span>
						<svg
							className="animate-spin mx-8 h-24 w-24 text-grey-primary inline"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
					</>
				) : null}
			</div>
			{!hasNextPage && !isLoading && <div>Nothing to load</div>}
		</>
	);
};

export default Category;
