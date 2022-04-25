/**
 * EpayLater Payment Page
 *
 * Author: Akhilesh Mourya
 */
import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

const EpayPayment = () => {
	const router = useRouter();
	const { query } = router;
	useEffect(() => {
		alert(query.encdata);
		alert(query.checksum);
		document.getElementById('myForm').submit();
	}, []);
	return (
		<form
			id="myForm"
			method="POST"
			action="https://api-blackbox.epaylater.in:443/web/process-transaction"
		>
			<input name="mcode" type="hidden" value="seller_dev" />
			<input name="checksum" type="hidden" value={query.checksum} />
			<input name="encdata" type="hidden" value={query.encdata} />
			<div>
				<button type="submit"></button>
			</div>
		</form>
	);
};

export default EpayPayment;
