import { useContext, createContext, useState } from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = createContext({
  signUp: (text) => null,
  signIn: (text) => null,
  signOut: () => null,
  deleteUser: () => null,
  saveSession: (text) => null,
  session: null,
  isLoading: false,
  isLoadingForUser: false,
  savedSession: false,
  username: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [savedSession, setSavedSession] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        signUp: (text) => {
          // Perform sign-up logic here

          setUserCreated(text);
        },
        signIn: (data) => {
          // Perform sign-in logic here
          setSession(data);
          //  username = data.name;
        },
        signOut: () => {
          setSession(null);
        },
        deleteUser: () => {
          console.log("in delete user context");
          setUserCreated(null);
          setSession(null);
        },
        saveSession: (value) => {
          setSavedSession(value);
        },
        session,
        isLoading,
        savedSession,
        //username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
