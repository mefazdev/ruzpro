import '../styles/globals.css'
import '../styles/home.css'
import '../styles/navbar.css'
import '../styles/latest.css'
import '../styles/pop.css'
import '../styles/ftd.css'
import '../styles/service.css'
import '../styles/featuredLand.css'
import '../styles/footer.css'
import '../styles/login.css'
import '../styles/register.css'
import '../styles/residents.css'
import '../styles/scom.css'
import '../styles/refine.css'
import '../styles/myAccount.css'
import '../styles/acSidebar.css'
import '../styles/upload.css'
import '../styles/view.css'
import '../styles/complitionstatus.css'
import '../styles/adminDash.css'
import '../styles/contact.css'
import '../styles/chat.css'
import {store} from '../redux/store'
import { Provider } from 'react-redux'
// import Script from 'next/script'
function MyApp({ Component, pageProps }) {


  return (
<Provider store={store}>
{/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/> */}

{/* <Script src="https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places"></Script> */}
<Component {...pageProps} />
</Provider>
  )
  
  
}

export default MyApp
 