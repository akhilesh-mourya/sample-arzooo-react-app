/**
 * Payment item component
 * @param src           image source
 * @param text          item title
 * @param route         path it leads to
 * @param className     classes for container classes
 *
 * Author: Vakadu Vinod
 */

import React from 'react';
import cn from 'classnames';

import ImageFile from './image.atom';

const PaymentItem = (props: {
	src: string;
	text: string;
	className?: string;
	onClick: any;
}) => {
	return (
		<div
			onClick={props.onClick}
			className={cn(
				'flex justify-between items-center p-16',
				props.className,
			)}
		>
			<div className="flex items-center">
				<ImageFile src={props.src} width={24} height={24} />
				<span className="ml-8 text-16 leading-24 font-medium">
					{props.text}
				</span>
			</div>
			<div className="flex">
				<ImageFile src="Right.svg" width={24} height={24} />
			</div>
		</div>
	);
};

export default PaymentItem;
