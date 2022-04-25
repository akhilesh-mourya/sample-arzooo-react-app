import React from 'react';

const Policies = () => {
	return (
		<div className="my-10 px-10 pt-10 py-40 bg-white">
			<div className="text-15 font-semibold">Return Policy</div>
			<div className="text-14 mt-10">
				Arzooo will accept return within 7 days of delivery under these
				conditions
			</div>
			<div className="grid grid-cols-2 gap-32 mt-10">
				<div className="flex-1 flex flex-col justify-center items-center">
					<img
						style={{ width: 80 }}
						src="https://static.arzooo.com/native-app/return-policy-icons-wrong-policy-min.png"
					/>
					<div className="text-14 font-semibold mt-10">
						Wrong Product
					</div>
				</div>
				<div className="flex-1 flex flex-col justify-center items-center">
					<img
						style={{ width: 80 }}
						src="https://static.arzooo.com/native-app/return-policy-icons-damage-min.png"
					/>
					<div className="text-14 font-semibold mt-10">
						Physical Damage
					</div>
				</div>
			</div>
		</div>
	);
};

export default Policies;
