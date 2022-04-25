import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ToastProvider } from 'react-toast-notifications';
import dynamic from 'next/dynamic';

import { ManagedUIContext } from '@/context/ui.context';
import { AuthProvider } from '@/context/auth.context';
import { eventLog } from '@/services/log.service';

const ManagedSheet = dynamic(() => import('@/components/atoms/managed-sheet'));
const Snackbar = dynamic(() => import('@/atoms/snackbar.atom'));

// Load poppins typeface font
import '@fontsource/poppins';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';

// base css file
import '@/assets/main.css';
import '@/assets/plugins.css';

//plugin css files
import 'react-step-progress-bar/styles.css';
import 'rc-steps/assets/index.css';
import 'swiper/css';
import 'swiper/css/pagination';
// import 'react-date-picker/dist/DatePicker.css';

function handleExitComplete() {
	if (typeof window !== 'undefined') {
		window.scrollTo({ top: 0 });
	}
}

const App = ({ Component, pageProps }: AppProps) => {
	const queryClientRef = useRef<any>();
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
					staleTime: 300000,
				},
			},
		});
	}
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url) => {
			eventLog('screen_view', { url });
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	function returnContext() {
		return (
			<ManagedUIContext>
				<Component {...pageProps} key={router.route} />
				<ManagedSheet />
			</ManagedUIContext>
		);
	}

	return (
		<AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
			<QueryClientProvider client={queryClientRef.current}>
				<Hydrate state={pageProps.dehydratedState}>
					<ToastProvider
						autoDismiss={true}
						autoDismissTimeout={5000}
						components={{ Toast: Snackbar as any }}
						placement="bottom-center"
					>
						{pageProps.noAuth ? (
							returnContext()
						) : (
							<AuthProvider>{returnContext()}</AuthProvider>
						)}
					</ToastProvider>
				</Hydrate>
				{/* <ReactQueryDevtools /> */}
			</QueryClientProvider>
		</AnimatePresence>
	);
};

export default App;
