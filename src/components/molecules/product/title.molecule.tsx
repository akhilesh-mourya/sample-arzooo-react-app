import React from 'react';

const Title = ({ display_name }) => {
	return (
		<div className="px-16 pt-10 text-16 leading-21 font-semibold bg-white">
			{display_name}
		</div>
	);
};

export default Title;
