import { createContext } from "react";

import { AuthContextType } from "../types";

const defaultUserState = {
  passPhrase: "",
  userID: "",
};

const AuthContext = createContext<AuthContextType>({
  setUser: () => console.warn("No User Provided"),
  user: defaultUserState,
});

export default AuthContext;
