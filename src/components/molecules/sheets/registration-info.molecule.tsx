import React from 'react';
import { useRouter } from 'next/router';

import { useUI } from '@/context/ui.context';
import ImageFile from '@/components/atoms/image.atom';
import Button from '@/components/atoms/button.atom';
import { ROUTES } from '@/helpers/routes.helpers';

const RegistrationInfo = () => {
	const { sheetData } = useUI();
	const router = useRouter();

	return (
		<div className="px-20 py-30 rounded-30 bg-white flex flex-col justify-center items-center">
			<div className="text-center">{sheetData?.data?.msg}</div>
			<Button
				onClick={() => router.push(ROUTES.REGISTRATION)}
				className="bg-blue-primary text-center px-30 py-10 mt-20 rounded-6 text-white text-14 font-bold tracking-widest"
			>
				DONE
			</Button>
		</div>
	);
};

export default RegistrationInfo;
