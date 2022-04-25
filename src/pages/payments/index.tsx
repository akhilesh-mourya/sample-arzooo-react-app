import Layout from '@/organisms/layout/layout.layout';
import Payments from '@/components/organisms/payments/payments.organism';
import { ManagedPaymentContext } from '@/context/payments.context';

export default function PaymentsPage() {
	return (
		<ManagedPaymentContext>
			<Layout webBack={false} title="Payment">
				<Payments />
			</Layout>
		</ManagedPaymentContext>
	);
}
