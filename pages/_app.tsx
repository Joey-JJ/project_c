import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useSessionContext } from "../context/sessionContext";
import SignIn from "../components/SignIn";
import Navbar from "../components/UI/Navbar";
import SessionProvider from "../context/sessionContext";

function MyApp({ Component, pageProps }: AppProps) {
  const { session } = useSessionContext();
  console.log(session);
  return (
    <SessionProvider>
      <Navbar>{session ? <Component {...pageProps} /> : <SignIn />}</Navbar>
    </SessionProvider>
  );
}
export default MyApp;
