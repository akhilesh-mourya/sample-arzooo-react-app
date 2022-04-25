/**
 * Image component
 * @param src      image source
 * @param icon     icon path or image path
 * @param local    is it local image or not
 *
 * Author: Vakadu Vinod
 */

import React from 'react';
import Image from 'next/image';

const ImageFile = (props) => {
	const { src, icon = 'icon', local = true, ...rest } = props;
	if (local) {
		return (
			<Image
				src={icon === 'icon' ? `/icons/${src}` : `/images/${src}`}
				{...rest}
			/>
		);
	} else {
		return <Image src={src} {...rest} />;
	}
};

export default ImageFile;
