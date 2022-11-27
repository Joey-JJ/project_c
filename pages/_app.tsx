import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import { supabase } from "../utils/supabaseClient";
import { sessionContext } from "../context/sessionContext";
import SignIn from "../components/SignIn";
import Navbar from "../components/UI/Navbar";

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
  }, [session]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <sessionContext.Provider value={{ session, setSession } as any}>
      <Navbar>{session ? <Component {...pageProps} /> : <SignIn />}</Navbar>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </label>
      </label>
    </sessionContext.Provider>
  );
}
/*na de dubbele punt <SignIn />*/
export default MyApp;
