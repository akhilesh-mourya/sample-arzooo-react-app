import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import axoisInstance from '@/services/http.service';
import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import Spinner from '@/atoms/spinner.atom';
import UpdateStatus from '@/atoms/status.atom';
import ImageFile from '@/atoms/image.atom';
import { handleSubCat } from '@/helpers/scripts.helpers';

const Subcat = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [msg, setMsg] = useState('');
	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			const data = { parent: router?.query?.category };
			axoisInstance
				.post(
					`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.CHILD_CATEGORIES}`,
					data,
				)
				.then((response) => {
					if (response?.data?.status === 'success') {
						setLoading(false);
						setData(response?.data?.data);
					} else {
						setLoading(false);
						setMsg('Error occured!');
					}
				})
				.catch((err) => {
					setLoading(false);
					setMsg('Network Error!');
				});
		}
	}, [router.isReady]);

	if (loading) {
		return <Spinner />;
	}

	if (msg !== '') {
		return (
			<UpdateStatus
				className="text-center text-14 text-red mt-50"
				text={msg}
			/>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-10 mt-10 mb-30 mx-10">
			{data?.map((category) => {
				let name = category.name.replace(/ /g, '');
				const url = `${process.env.NEXT_PUBLIC_PATH}/native-app/catagories/${name}.png`;
				return (
					<div
						key={category.name}
						onClick={() => handleSubCat(window, category.name)}
						className="bg-white p-10 rounded-6 flex flex-col items-center justify-center flex-1"
					>
						<img
							src={url}
							style={{ objectFit: 'contain', height: 120 }}
						/>
						<div className="text-center text-14 leading-21 font-semibold mt-6">
							{category.name}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Subcat;
