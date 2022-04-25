import React from 'react';
import cn from 'classnames';

import ImageFile from './image.atom';

const SafePayments = (props: { classNames?: string }) => {
	return (
		<div className={cn('text-center my-20 px-16', props.classNames)}>
			<div className="text-14 leading-21 mb-20 py-20 border-b border-grey-secondary">
				Your money is 100% safe with us
			</div>
			<ImageFile
				icon="image"
				src="safe-payments.png"
				layout="responsive"
				width={303}
				height={24}
				priority={false}
			/>
		</div>
	);
};

export default SafePayments;
