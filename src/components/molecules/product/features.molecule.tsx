import React from 'react';
import cn from 'classnames';

const Features = ({ details }) => {
	return (
		<div className="my-10 py-12 bg-white">
			<div className="text-16 leading-21 font-semibold pb-10 px-16 border-b border-grey-stroke">
				Details
			</div>
			<div className="mt-4">
				<div
					className={cn(
						details?.warranty?.length > 0
							? 'border-b'
							: 'border-grey-stroke',
						'px-16 py-10',
					)}
				>
					{details?.warranty?.length > 0 && (
						<div className="text-14 leading-18 mb-6">Warranty</div>
					)}
					{details?.warranty &&
						Object.keys(details?.warranty).map((warr, i) => {
							return (
								<div className="flex my-8" key={i}>
									<span className="flex-1 text-grey-text text-12 leading-16">
										{warr}
									</span>
									<span className="flex-2 ml-4 text-12 leading-16">
										{details?.warranty[warr]}
									</span>
								</div>
							);
						})}
				</div>
				<div
					className={cn(
						details?.features?.length > 0
							? 'border-b'
							: 'border-grey-stroke',
						'px-16 py-10',
					)}
				>
					{details?.features?.length > 0 && (
						<div className="text-14 leading-18 mb-6">Features</div>
					)}
					{details?.features &&
						Object.keys(details?.features).map((_, i) => {
							let key = Object.keys(details?.features[i]) as any;
							if (
								key
									.toString()
									.toLowerCase()
									.indexOf('warranty') === -1
							) {
								return (
									<div className="flex my-8" key={i}>
										<span className="flex-1 text-grey-text text-12 leading-16">
											{key}
										</span>
										<span className="flex-2 ml-4 text-12 leading-16">
											{details?.features[i][key]}
										</span>
									</div>
								);
							}
						})}
				</div>
				<div
					className={cn(
						details?.specifications?.length > 0
							? 'border-b'
							: 'border-grey-stroke',
						'px-16 py-10',
					)}
				>
					{details?.specifications?.length > 0 && (
						<div className="text-14 leading-18 mb-6">
							Specifications
						</div>
					)}
					{details?.specifications?.map((spec, i) => {
						return (
							<div className="flex my-8" key={i}>
								<span className="flex-1 text-grey-text text-12 leading-16">
									{spec.value && spec.value !== ''
										? spec.name
										: ''}
								</span>
								<span className="flex-2 ml-4 text-12 leading-16">
									{spec.unit
										? spec.value + ' ' + spec.unit
										: spec.value}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Features;
