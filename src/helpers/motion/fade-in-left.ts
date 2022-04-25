export function fadeInLeft(duration: number = 0.3) {
	return {
		from: {
			left: '310px',
			transition: {
				type: 'easeInOut',
				duration: duration,
			},
		},
		to: {
			left: '350px',
			transition: {
				type: 'easeInOut',
				duration: duration,
			},
		},
	};
}
