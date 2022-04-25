import React from 'react';

const Header = () => {
	return (
		<div
			className="px-20 bg-blue-creditHeader w-full"
			style={{
				backgroundImage: 'url(/images/creditHeaderBg.jpg)',
				backgroundSize: '100% 130%',
				backgroundRepeat: 'no-repeat',
				height: '200px',
			}}
		>
			<div className="text-center text-white text-24 font-bold font-sans pt-30">
				Instant Credit Approval upto
			</div>
			<div className="text-center text-golden-header text-32 font-bold font-sans">
				&#8377;15 Lakhs
			</div>
			<div className="text-center text-white text-20 font-extrabold pt-30 pb-20 font-sans self-center">
				0% Interest
				<span className="font-normal">&nbsp;for 15 Days</span>
			</div>
		</div>
	);
};

export default Header;
