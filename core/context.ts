import { createContext } from "react";
import { IAuthContext } from "./model/auth.model";

const AuthContext = createContext<IAuthContext>({
  authData: null,
  setAuthData: () => {},
});

export default AuthContext;
