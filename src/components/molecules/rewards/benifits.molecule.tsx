import React from 'react';
import Image from 'next/image';

import { useAuth } from '@/context/auth.context';

const details = {
	blue: [
		{
			id: 0,
			free_delivery: 'free_delivery_disabled',
			cash_reward: 'cash_reward_disabled',
			pod: 'pod_disabled',
			credit: 'credit_disabled',
		},
	],
	silver: [
		{
			id: 1,
			free_delivery: 'free_delivery_disabled',
			cash_reward: 'cash_reward',
			pod: 'pod',
			credit: 'credit',
		},
	],
	gold: [
		{
			id: 2,
			free_delivery: 'free_delivery_disabled',
			cash_reward: 'cash_reward',
			pod: 'pod',
			credit: 'credit',
		},
	],
	platinum: [
		{
			id: 3,
			free_delivery: 'free_delivery',
			cash_reward: 'cash_reward',
			pod: 'pod',
			credit: 'credit',
		},
	],
};

const Benefits = () => {
	const { session } = useAuth();

	return (
		<div>
			<div className="px-6 text-16 font-semibold mb-10">Benefits</div>
			{details[session?.store_type && session?.store_type] &&
				details[session?.store_type && session?.store_type].map(
					(detail) => {
						return (
							<div
								className="grid grid-cols-4 gap-8"
								key={detail.id}
							>
								<Image
									src={`${process.env.NEXT_PUBLIC_PATH}/app-arzooo/rewards/${detail.free_delivery}.png`}
									alt="alt-locked"
									width="100%"
									height="100%"
									objectFit="contain"
								/>
								<Image
									src={`${process.env.NEXT_PUBLIC_PATH}/app-arzooo/rewards/${detail.cash_reward}.png`}
									alt="alt-locked"
									width="100%"
									height="100%"
									objectFit="contain"
								/>
								<Image
									src={`${process.env.NEXT_PUBLIC_PATH}/app-arzooo/rewards/${detail.pod}.png`}
									alt="alt-locked"
									width="100%"
									height="100%"
									objectFit="contain"
								/>
								<Image
									src={`${process.env.NEXT_PUBLIC_PATH}/app-arzooo/rewards/${detail.credit}.png`}
									alt="alt-locked"
									width="100%"
									height="100%"
									objectFit="contain"
								/>
							</div>
						);
					},
				)}
			<div className="mt-15 text-center text-16 font-semibold">
				Upgrade yourself to unlock more benefits
			</div>
		</div>
	);
};

export default Benefits;
