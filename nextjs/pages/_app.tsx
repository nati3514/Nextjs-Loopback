import 'materialize-css/dist/css/materialize.min.css';
import '../styles/globals.css'
import '../styles/utility.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
