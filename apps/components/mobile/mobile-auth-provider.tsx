import * as React from "react";

import { Platform } from "react-native";

interface MobileSessionUser {
  email: string;
  firstName?: string;
  lastName?: string;
}

interface MobileSession {
  user: MobileSessionUser;
  authenticatedAt: string;
}

interface MobileAuthContextValue {
  isAuthenticated: boolean;
  isHydrating: boolean;
  session: MobileSession | null;
  signIn: (user: MobileSessionUser) => void;
  signOut: () => void;
}

const STORAGE_KEY = "aether.mobile.session";

let nativeSessionSnapshot: MobileSession | null = null;

const MobileAuthContext = React.createContext<MobileAuthContextValue | undefined>(undefined);

function readStoredSession(): MobileSession | null {
  if (Platform.OS !== "web") {
    return nativeSessionSnapshot;
  }

  try {
    const rawSession = window.localStorage.getItem(STORAGE_KEY);
    if (!rawSession) {
      return null;
    }

    return JSON.parse(rawSession) as MobileSession;
  } catch {
    return null;
  }
}

function persistSession(session: MobileSession | null) {
  nativeSessionSnapshot = session;

  if (Platform.OS !== "web") {
    return;
  }

  try {
    if (session) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures for the mocked mobile flow.
  }
}

export function MobileAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<MobileSession | null>(null);
  const [isHydrating, setIsHydrating] = React.useState(true);

  React.useEffect(() => {
    setSession(readStoredSession());
    setIsHydrating(false);
  }, []);

  const signIn = React.useCallback((user: MobileSessionUser) => {
    const nextSession: MobileSession = {
      user,
      authenticatedAt: new Date().toISOString(),
    };

    persistSession(nextSession);
    setSession(nextSession);
  }, []);

  const signOut = React.useCallback(() => {
    persistSession(null);
    setSession(null);
  }, []);

  const value = React.useMemo<MobileAuthContextValue>(
    () => ({
      isAuthenticated: !!session,
      isHydrating,
      session,
      signIn,
      signOut,
    }),
    [isHydrating, session, signIn, signOut],
  );

  return <MobileAuthContext.Provider value={value}>{children}</MobileAuthContext.Provider>;
}

export function useMobileAuth() {
  const context = React.useContext(MobileAuthContext);

  if (!context) {
    throw new Error("useMobileAuth must be used within a MobileAuthProvider");
  }

  return context;
}
