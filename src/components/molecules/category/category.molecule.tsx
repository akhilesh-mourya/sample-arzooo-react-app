import React, { useRef } from 'react';
import Image from 'next/image';

import { useContainerDimensions } from '@/hooks/useContainerDimensions.hook';
import Rupee from '@/components/atoms/rupee.atom';
import { pushToProduct } from '@/helpers/scripts.helpers';

const Category = (props: { item: any }) => {
	const imgUri =
		props.item?.image_cache_key !== null
			? `${process.env.NEXT_PUBLIC_PATH}/images/products/${props.item.img_hash}?key=${props.item.image_cache_key}`
			: `${process.env.NEXT_PUBLIC_PATH}/images/products/${props.item.img_hash}`;
	// const imgUri =
	// 	props.item?.image_cache_key !== null
	// 		? `https://static.arzooo.com/images/products/${props.item.img_hash}?key=${props.item.image_cache_key}`
	// 		: `https://static.arzooo.com/images/products/${props.item.img_hash}`;

	const componentRef = useRef();
	const { width, height } = useContainerDimensions(componentRef);
	let discount = Math.floor(
		(1 - props.item.finalPrice / props.item.mrp) * 100,
	);
	const data = {
		title: props.item.title,
		hash: props.item.product_hash,
		price: props.item.finalPrice,
	};

	return (
		<div
			onClick={() => pushToProduct(window, data)}
			ref={componentRef}
			className="border border-grey-stroke rounded-6 p-6 flex flex-col justify-center items-center"
		>
			<Image
				src={imgUri}
				width={width}
				height={120}
				alt={props.item.title}
				objectFit="contain"
				placeholder="blur"
				blurDataURL={`/icons/placeholder_blur_loader.svg`}
			/>
			<div className="truncate-ellipsis-2 my-4 text-14 h-42 text-center">
				{props.item.title}
			</div>
			<div className="text-center relative w-full flex justify-center items-center border-t border-grey-stroke pt-2.5">
				{props.item.falcon_product ? (
					<div className="absolute flex left-0">
						<Image
							src={`${process.env.NEXT_PUBLIC_PATH}/native-app/logos/falcon-icon.png`}
							width={18}
							height={18}
						/>
					</div>
				) : null}
				<Rupee
					money={props.item.finalPrice}
					className="text-14 font-semibold leading-21"
				/>
				{discount && discount > 0 ? (
					<span className="pl-6 text-blue-primary text-12 font-normal">
						{discount}% off
					</span>
				) : null}
			</div>
		</div>
	);
};

export default Category;
