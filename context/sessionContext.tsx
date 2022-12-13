import { supabase } from "../utils/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import React, { useState, useEffect, useContext, createContext } from "react";

interface ContextType {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}
// Context for the current session
const SessionContext = createContext<ContextType>({} as ContextType);

// Custom hook for easier access to the session context
export const useSessionContext = () => useContext(SessionContext);

interface Props {
  children: React.ReactNode;
}

// Provider for the session context which fetches the current session
const SessionProvider: React.FC<Props> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    console.log("fetched");
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error) {
        setSession(data.session);
      }
    };

    fetchSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
