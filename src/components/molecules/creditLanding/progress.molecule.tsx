import React from 'react';
import ImageFile from '@/components/atoms/image.atom';

const Progrees = () => {
	return (
		<div className="px-20 py-30 bg-white rounded-tl-16 rounded-tr-16">
			<div className="text-center text-14 font-extralight">
				2 Minutes application process, minimul documentation
			</div>
			<div className="text-center text-18 font-extralight">
				Get Started in 3 steps
			</div>
			<div className="flex items-center w-full px-18 mt-26">
				<div className="flex">
					<div
						className={`h-12 w-12 bg-blue-header rounded-6 bg-blue-header`}
					/>
				</div>
				<div className={`h-1.5 w-full mx-5 bg-grey-light`} />
				<div className="flex">
					<div className={`h-12 w-12 rounded-6 bg-grey-light`} />
				</div>
				<div className={`h-1.5 w-full mx-5 bg-grey-light`} />
				<div className="flex">
					<div className={`h-12 w-12 rounded-6 bg-grey-light`} />
				</div>
			</div>
			<div className="flex items-center w-full mt-10 px-6 pr-8">
				<div className="flex">
					<ImageFile src={'Pan.svg'} width={80} height={60} />
				</div>
				<div className="w-full" />
				<div className="flex">
					<ImageFile src={'Aadhar.svg'} width={95} height={60} />
				</div>
				<div className="w-full" />
				<div className="flex">
					<ImageFile src={'Rupee.svg'} width={75} height={70} />
				</div>
			</div>
			<div className="flex items-center w-full mt-10 pl-4">
				<div className="flex">
					<div className="text-center text-12 font-Poppins font-regular">
						1.&nbsp;VERIFY PAN
					</div>
				</div>
				<div className="w-full" />
				<div className="text-center text-12 font-Poppins font-regular pl-2">
					2.&nbsp;UPLOAD&nbsp;KYC DOCUMENTS
				</div>
				<div className="w-full" />
				<div className="text-center text-12 font-Poppins font-regular">
					3.&nbsp;GET&nbsp;CREDIT LIMIT
				</div>
			</div>
		</div>
	);
};

export default Progrees;
