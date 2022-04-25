import React from 'react';

import ImageFile from '@/atoms/image.atom';

const Details = (props: {
	img: string;
	displayName: string;
	modelName: string;
	quantity: number;
}) => {
	return (
		<div className="flex p-16 border-b border-grey-stroke">
			<div className="flex-1">
				<div className="text-14 font-semibold leading-21">
					{props.displayName}
				</div>
				<div className="text-12 font-semibold py-6 text-grey-text">
					Model Name:{' '}
					<span className="text-14 font-medium text-black">
						{props.modelName}
					</span>
				</div>
				<div className="text-12 font-semibold text-grey-text">
					Quantity:{' '}
					<span className="text-14 font-medium text-black">
						{props.quantity}
					</span>
				</div>
			</div>
			<div>
				<ImageFile
					local={false}
					src={`${process.env.NEXT_PUBLIC_PATH}/images/products/${props.img}`}
					width={120}
					height={80}
					objectFit="contain"
					placeholder="blur"
					blurDataURL={`/icons/placeholder_blur_loader.svg`}
				/>
			</div>
		</div>
	);
};

export default Details;
