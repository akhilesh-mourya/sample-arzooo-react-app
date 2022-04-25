import React from 'react';

import { useAuth } from '@/context/auth.context';

const Header = () => {
	const { session } = useAuth();

	function bg() {
		if (session?.store_type === 'platinum') {
			return 'bg-rewards-platinum';
		}
		if (session?.store_type === 'gold') {
			return 'bg-rewards-gold';
		}
		if (session?.store_type === 'silver') {
			return 'bg-rewards-silver';
		}
		if (session?.store_type === 'blue') {
			return 'bg-rewards-blue';
		}
	}

	return (
		<div className="p-20 bg-black">
			<div className="text-center text-blue-primary text-18 font-semibold">
				Arzooo Rewards
			</div>
			{/* <div className={cn('h-180 reward-bg my-20 relative', bg())}>
				<div className="absolute right-10 top-10">
					<Image
						src={`${process.env.NEXT_PUBLIC_PATH}/app-arzooo/rewards/card-icon.png`}
						alt="alt-locked"
						width={34}
						height={34}
					/>
				</div>
				{session?.name && (
					<div
						className={cn(
							'uppercase font-semibold text-16 absolute left-10 top-10',
							session.store_type === 'blue'
								? 'text-white'
								: 'text-secondary',
						)}
					>
						{session?.name}
					</div>
				)}
			</div> */}
		</div>
	);
};

export default Header;
