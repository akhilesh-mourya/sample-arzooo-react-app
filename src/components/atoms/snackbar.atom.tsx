/**
 * Snackbar Component
 * @param transitionState    state transistion
 * @param children           children for sheet
 *
 * Author: Vakadu Vinod
 */

import React, { memo } from 'react';

const Snackbar = ({ children, transitionState }) => {
	return (
		<div
			style={{ zIndex: 99999999 }}
			className={`flex justify-center items-center p-10 bg-black text-white min-w-288 rounded-20 text-14 text-center ${transitionState}`}
		>
			{children}
		</div>
	);
};

export default memo(Snackbar);
