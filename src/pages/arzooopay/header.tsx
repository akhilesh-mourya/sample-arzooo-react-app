import React from 'react';
import dynamic from 'next/dynamic';

const Header = ({ url }) => {
	const Image = dynamic(() => import('next/image'));

	return (
		<>
			<div className="h-54 flex justify-center items-center border-b border-grey-stroke">
				<Image
					src={`${process.env.NEXT_PUBLIC_PATH}/logos/arzooo-pay.png`}
					alt="arzooopay"
					layout="fixed"
					objectFit="contain"
					quality={75}
					width={160}
					height={25}
				/>
			</div>
		</>
	);
};

export default Header;
