import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import LoadingBar from "react-top-loading-bar";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import "../styles/globals.css";
import { CartStoreProvide } from "../hooks/useCartStore";
import { AuthStoreProvide } from "../hooks/useAuthStore";

export default function App({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setProgress(40);
    };
    const handleRouteChange = () => {
      setProgress(100);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.on("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.query, router.events]);

  return (
    <>
      <LoadingBar
        color="#B24BF3"
        waitingTime={400}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <AuthStoreProvide>
        <CartStoreProvide>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </CartStoreProvide>
      </AuthStoreProvide>
    </>
  );
}
