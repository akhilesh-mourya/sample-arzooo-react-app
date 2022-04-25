import { ManagedPaymentContext } from '@/context/payments.context';
import Layout from '@/organisms/layout/layout.layout';
import Netbanking from '@/organisms/payments/netbanking.organism';

export default function NetbankingPage() {
	return (
		<ManagedPaymentContext>
			<Layout webBack title="Netbanking">
				<Netbanking />
			</Layout>
		</ManagedPaymentContext>
	);
}
