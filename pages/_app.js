import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { StateContext } from '../src/context/StateContext'

import Layout from '../src/components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
     <Component {...pageProps} />
    </StateContext>
  )   
}

export default MyApp
