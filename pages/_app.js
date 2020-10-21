import 'bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import '../styles/global.css';


export default function MyApp({ Component, pageProps }) {
	return  (
		<Component {...pageProps} />
	);
}