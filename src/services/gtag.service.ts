/**
 * Google analytics file
 *
 * Author: Vakadu Vinod
 */
declare global {
	interface Window {
		gtag: any;
	}
}

export const pageview = (url: URL) => {
	typeof window !== 'undefined' &&
		window.gtag('config', process.env.NEXT_PUBLIC_GTAG, {
			page_path: url,
		});
};

interface GTagEvent {
	action: string;
	category: string;
	label: string;
	value: string | number;
}

export const event = ({ action, category, label, value }: GTagEvent) => {
	typeof window !== 'undefined' &&
		window.gtag('event', action, {
			event_category: category,
			event_label: label,
			value: value,
		});
};
