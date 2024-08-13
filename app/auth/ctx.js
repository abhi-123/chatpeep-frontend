import { useContext, createContext } from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = createContext({
  signUp: (text) => null,
  signIn: (text) => null,
  signOut: () => null,
  deleteUser: () => null,
  session: null,
  isLoading: false,
  userCreated: null,
  isLoadingForUser: false,
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
  const [[isLoadingForUser, userCreated], setUserCreated] =
    useStorageState("usercreated");

  return (
    <AuthContext.Provider
      value={{
        signUp: (text) => {
          // Perform sign-up logic here

          setUserCreated(text);
        },
        signIn: (text) => {
          // Perform sign-in logic here

          setSession(text);
        },
        signOut: () => {
          setSession(null);
        },
        deleteUser: () => {
          console.log("in delete user context");
          setUserCreated(null);
          setSession(null);
        },
        userCreated,
        session,
        isLoading,
        isLoadingForUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
