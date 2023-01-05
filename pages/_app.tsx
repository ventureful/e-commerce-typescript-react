import type { AppProps } from "next/app";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import "../styles/globals.css";
import { CartStoreProvide } from "../hooks/useCartStore";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartStoreProvide>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </CartStoreProvide>
    </>
  );
}
