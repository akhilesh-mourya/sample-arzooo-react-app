import React from 'react';

import { useUI } from '@/context/ui.context';
import ImageFile from '@/atoms/image.atom';
import { setUpiPayment } from '@/helpers/scripts.helpers';

const Upi = () => {
	const { closeSheet, sheetData, paymentData } = useUI();

	return (
		<div className="w-full py-20">
			<div className="flex items-center border-b border-grey-stroke py-10 px-15">
				<div className="flex" onClick={closeSheet}>
					<ImageFile src="back.svg" width={24} height={24} />
				</div>
				<div className="text-16 font-semibold leading-21 pl-20">
					UPI
				</div>
			</div>
			<div className="p-15">
				<div className="flex">
					{Object.keys(sheetData).map((key, i) => {
						if (key === 'default' || key === 'web') {
							return null;
						} else {
							return (
								<div
									key={i}
									onClick={() =>
										setUpiPayment(
											window,
											sheetData[key],
											key,
											paymentData,
										)
									}
									className="flex flex-1 px-14 flex-col"
								>
									<ImageFile
										src={`${key}.svg`}
										width="100%"
										height={62}
									/>
									<div className="text-14 font-semibold capitalize py-10 text-center">
										{key}
									</div>
								</div>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
};

export default Upi;
