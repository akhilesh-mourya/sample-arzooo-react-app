import { ManagedPaymentContext } from '@/context/payments.context';
import Layout from '@/organisms/layout/layout.layout';
import CreditCard from '@/organisms/payments/credit-card.organism';

export default function CreditCardPage() {
	return (
		<ManagedPaymentContext>
			<Layout webBack title="Credit/Debit Card">
				<CreditCard />
			</Layout>
		</ManagedPaymentContext>
	);
}
