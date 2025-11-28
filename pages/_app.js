import "react-toastify/dist/ReactToastify.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/animate.css'
import '../styles/flaticon.css'
import "../styles/font-awesome.min.css";
import "../styles/themify-icons.css";
import '../styles/sass/style.scss'
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/index";
import { Provider } from "react-redux";
import { AuthProvider } from '../context/AuthContext'
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from 'next/head'
import BottomNav from '../components/BottomNav/BottomNav'

function MyApp({ Component, pageProps }) {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <Head>
        <title>Eduko</title>
      </Head>
      <AuthProvider>
        <Provider store={store}>
          {isClient && persistor ? (
            <PersistGate loading={null} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          ) : (
            <Component {...pageProps} />
          )}
          {/* Bottom navigation rendered only on client to avoid SSR mismatch */}
          {isClient && <BottomNav />}
        </Provider>
      </AuthProvider>
      <ToastContainer />
    </div>

  )
}

export default MyApp
