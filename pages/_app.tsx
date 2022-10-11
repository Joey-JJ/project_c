import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import { supabase } from "../utils/supabaseClient";
import { sessionContext } from "../context/sessionContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

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
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <sessionContext.Provider value={session}>
      <Component {...pageProps} />
    </sessionContext.Provider>
  );
}

export default MyApp;
