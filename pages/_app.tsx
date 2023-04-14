import AuthContext from "@/core/context";
import { IAuthData } from "@/core/model/auth.model";
import Interceptor from "@/core/service/interceptor";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [authData, setAuthData] = useState<IAuthData | null>(null);
  const router = useRouter();

  const AuthState = useMemo(
    () => ({
      authData,
      setAuthData,
    }),
    [authData]
  );

  useEffect(() => {
    if (!localStorage.authData) {
      router.push("/getStarted");
    } else {
      setAuthData(JSON.parse(localStorage.getItem("authData") as string));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthContext.Provider value={AuthState}>
      <Component {...pageProps} />
      <Interceptor />
    </AuthContext.Provider>
  );
}
