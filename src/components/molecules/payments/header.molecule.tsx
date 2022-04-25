import React from 'react';

import Rupee from '@/atoms/rupee.atom';

const Header = ({ total }) => {
	return (
		<div className="bg-white my-16 rounded-6 flex justify-between items-center px-12 py-20 text-16 leading-21 font-medium">
			Total Order Amount
			<Rupee money={total} className="text-16 leading-21 font-bold" />
		</div>
	);
};

export default Header;
