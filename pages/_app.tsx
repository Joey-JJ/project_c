import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useSessionContext } from "../context/sessionContext";
import SignIn from "../components/SignIn";
import Navbar from "../components/UI/Navbar";
import SessionProvider from "../context/sessionContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </SessionProvider>
  );
}
export default MyApp;
