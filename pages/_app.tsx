import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useSessionContext } from "../context/sessionContext";
import SignIn from "../components/SignIn";
import Navbar from "../components/UI/Navbar";
import SessionProvider from "../context/sessionContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchSession = async () => {
      const {
        data: { session: any },
      } = await supabase.auth.getSession();

      if (mounted) {
        if (session) {
          setSession(session);
        }

        setIsLoading(false);
      }
    };

    fetchSession();

    const { subscription }: any = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session as any);
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [session]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <SessionProvider>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </SessionProvider>
  );
}
export default MyApp;
