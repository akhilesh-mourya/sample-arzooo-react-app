import React from 'react';
import Image from 'next/image';
import router from 'next/router';

import { handleSubCat } from '@/helpers/scripts.helpers';

export const categories = [
	{
		id: 1,
		text: 'TV',
		image: `${process.env.NEXT_PUBLIC_PATH}/native-app/logos/all-tv.png`,
		bg1: '#cbe4fc',
		bg2: '#feea81',
		link: 'Televisions',
		title: 'Televisions',
		subcat: false,
	},
	{
		id: 3,
		text: 'AC',
		image: `${process.env.NEXT_PUBLIC_PATH}/native-app/logos/all-ac.png`,
		bg1: '#fae8ff',
		bg2: '#dccbfc',
		link: 'air-conditioner',
		title: 'Air Conditioner',
		subcat: false,
	},
	{
		id: 2,
		text: 'Fridge',
		image: `${process.env.NEXT_PUBLIC_PATH}/native-app/logos/all-fridge.png`,
		bg1: '#f8faa8',
		bg2: '#feea81',
		link: 'Refrigerator',
		title: 'Refrigerator',
		subcat: false,
	},
	{
		id: 5,
		text: 'Washer',
		image: `${process.env.NEXT_PUBLIC_PATH}/native-app/logos/all-washer.png`,
		bg1: '#bbfbe0',
		bg2: '#c3f8f8',
		link: 'Washing-machine',
		title: 'Washing Machine',
		subcat: false,
	},
	{
		id: 6,
		text: 'IT',
		image: `${process.env.NEXT_PUBLIC_PATH}/native-app/logos/all-laptops.png`,
		bg1: '#bef1f3',
		bg2: '#ecfe9a',
		link: '/category/sub-cat/it',
		title: 'IT',
		subcat: true,
	},
	{
		id: 7,
		text: 'Mobile',
		image: `${process.env.NEXT_PUBLIC_PATH}/native-app/logos/all-mob.png`,
		bg1: '#e7fbc0',
		bg2: '#ebf76f',
		link: '/category/sub-cat/mobiles',
		title: 'Mobiles',
		subcat: true,
	},
	{
		id: 11,
		text: 'Grooming',
		image: `${process.env.NEXT_PUBLIC_PATH}/native-app/logos/PC.png`,
		bg1: '#cbe4fc',
		bg2: '#cec8fa',
		link: '/category/sub-cat/Personal Care',
		title: 'Grooming',
		subcat: true,
	},
	{
		id: 9,
		text: 'Audio',
		image: `${process.env.NEXT_PUBLIC_PATH}/native-app/logos/all-audio.png`,
		bg1: '#cbe3fc',
		bg2: '#cec8fa',
		link: '/category/sub-cat/audio',
		title: 'Audio',
		subcat: true,
	},
	{
		id: 4,
		text: 'SHA',
		image: `${process.env.NEXT_PUBLIC_PATH}/native-app/logos/all-sha.png`,
		bg1: '#c2f4fe',
		bg2: '#a2dffb',
		link: '/category/sub-cat/Small Appliances',
		title: 'Small Appliances',
		subcat: true,
	},
	{
		id: 8,
		text: 'Kitchen',
		image: `${process.env.NEXT_PUBLIC_PATH}/native-app/logos/all-kitchen.png`,
		bg1: '#fde6dd',
		bg2: '#fab9ba',
		link: '/category/sub-cat/Kitchen Appliances',
		title: 'Kitchen Appliances',
		subcat: true,
	},
];

const All = () => {
	return (
		<div className="grid grid-cols-3 gap-10 px-10 py-20 bg-white">
			{categories.map((cat) => {
				return (
					<div
						key={cat.id}
						onClick={
							cat?.subcat
								? () => router.push(cat?.link)
								: () => handleSubCat(window, cat.link)
						}
						className="flex flex-col rounded-6 p-10"
						style={{
							backgroundImage: `linear-gradient(to right, ${cat.bg1} , ${cat.bg2})`,
						}}
					>
						<Image
							src={cat.image}
							width="100%"
							height={92}
							objectFit="contain"
						/>
						<span className="text-14 font-semibold text-center mt-10 leading-21">
							{cat.text}
						</span>
					</div>
				);
			})}
		</div>
	);
};

export default All;
