import React, { useState, useEffect } from 'react';

interface LazyProps {
	src: string;
	alt?: string;
	style?: object;
}

const defaultProps: LazyProps = {
	src: '',
	alt: 'arzooo.com',
};

const Lazy: React.FC<LazyProps> = ({ src, alt, style }) => {
	const [imageSrc, setImageSrc] = useState<string>('/images/placeholder.png');
	const [imageRef, setImageRef] = useState<HTMLImageElement>(null);
	const [bgColor, setBgColor] = useState<string>('rgba(0, 0, 0, 0.4)');

	const onLoad = (event) => {
		event.target.classList.add('loaded');
	};

	const onError = (event) => {
		event.target.classList.add('error');
	};

	useEffect(() => {
		let observer,
			didCancel = false;
		if (imageRef && imageSrc !== src) {
			if (IntersectionObserver) {
				observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (
								!didCancel &&
								(entry.intersectionRatio > 0 ||
									entry.isIntersecting)
							) {
								setImageSrc(src);
								setBgColor('transparent');
								observer.unobserve(imageRef);
							}
						});
					},
					{
						threshold: 0.01,
						rootMargin: '75%',
					},
				);
				observer.observe(imageRef);
			} else {
				// fallback for older browsers
				setImageSrc(src);
				setBgColor('transparent');
			}
		}
		return () => {
			didCancel = true;
			// on component cleanup, we remove the listner
			if (observer && observer.unobserve) {
				observer.unobserve(imageRef);
			}
		};
	}, [src, imageSrc, imageRef, bgColor]);

	return (
		<img
			ref={setImageRef}
			src={imageSrc}
			alt={alt}
			style={{ backgroundColor: bgColor, ...style }}
			onLoad={onLoad}
			onError={onError}
		/>
	);
};

Lazy.defaultProps = defaultProps;

export default Lazy;
