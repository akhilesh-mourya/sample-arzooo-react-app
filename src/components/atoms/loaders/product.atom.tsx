import React from 'react';
import ContentLoader from 'react-content-loader';

const ProductCard = (props) => (
	<div className="bg-white">
		<ContentLoader
			viewBox={`0 0 ${window.innerWidth} 480`}
			height={480}
			width={window.innerWidth}
			{...props}
		>
			<rect
				x="3"
				y="3"
				rx="10"
				ry="10"
				width={window.innerWidth}
				height="280"
			/>
			<rect x="6" y="290" rx="0" ry="0" width="292" height="20" />
			<rect x="6" y="315" rx="0" ry="0" width="239" height="20" />
			<rect x="4" y="342" rx="0" ry="0" width="274" height="20" />
		</ContentLoader>
	</div>
);

export default ProductCard;
