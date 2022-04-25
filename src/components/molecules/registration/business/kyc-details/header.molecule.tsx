import React from 'react';

import ImageFile from '@/atoms/image.atom';

const Header = (props: { title: string; onClick: () => void }) => (
	<div className="border-b border-grey-stroke pb-12 px-20 flex">
		<div onClick={props.onClick}>
			<ImageFile src="back.svg" width={24} height={24} />
		</div>
		<div className="text-16 leading-24 pl-10">{props.title}</div>
	</div>
);

export default Header;
