import Layout from '@/organisms/layout/layout.layout';
import EventBanner from '@/organisms/event-banner';

export default function EventPage() {
	return (
		<Layout webBack={false} classNames="mt-50">
			<EventBanner />
		</Layout>
	);
}
