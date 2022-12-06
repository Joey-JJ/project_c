import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { supabase } from "../utils/supabaseClient";
import SignIn from "../components/SignIn";
import Navbar from "../components/UI/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as any);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as any);
    });

    setLoading(false);

    return () => {
      subscription.unsubscribe();
    };
  }, [session]);

  if (loading) return <p>Loading...</p>;

  return (
    <Navbar session={session}>
      {session ? <Component {...pageProps} session={session} /> : <SignIn />}
    </Navbar>
  );
}

export default MyApp;
