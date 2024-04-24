import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { AxiosError, AxiosResponse } from "axios";
import { useToasts } from "react-toast-notifications";

import api from "@helpers/api";

import { SessionType } from "types/SessionType";
import { typeAdmin } from "@/constants/userConstants";
import { UserType } from "@/types/UserType";

export type AuthContextType = {
  getAuthenticationHandler: () => Promise<void>;
  logoutHandler: () => void;
  session: SessionType | null;
  isUserId: (userId: string) => boolean;
  isLoadingSession: boolean;
  isLoadingRegister: boolean;
  isLoadingLogout: boolean;
  hasSession: () => boolean | undefined;
  headers: undefined;
  loggedIn: boolean;
  wasFetched: boolean;
  loginHandler: (email: string, password: string) => void;
  registerHandler: (values: UserType) => void;
  isAdmin: boolean;
};

export const Auth = createContext<AuthContextType | null>(null);

const useAuth = () => {
  const context = useContext(Auth);
  if (!context) {
    throw new Error("useAuth must be within AuthProvider");
  }

  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [session, setSession] = useState<SessionType | null>(null);
  const [headers, setHeaders] = useState();
  const { addToast } = useToasts();
  const [wasFetched, setWasFetched] = useState(true);

  const logout = useCallback(() => {
    window.localStorage.removeItem("userToken");
    window.localStorage.removeItem("isLogged");
    // eslint-disable-next-line no-console
    window.location.href = "/login";
  }, []);

  const getAuthenticationHandler = useCallback(async () => {
    const userToken = window.localStorage.getItem("userToken");
    setHeaders(userToken ? JSON.parse(userToken) : {});

    setIsLoadingSession(true);

    api
      .get("/me")
      .then((response: AxiosResponse) => {
        setSession(response.data);
        setIsLoadingSession(false);
      })
      .catch((e: AxiosError<any>) => {
        if (e?.response?.data?.message === "Unauthenticated.") {
          logout();
        }
      })
      .finally(() => setIsLoadingSession(false));
  }, [logout]);

  const logoutHandler = useCallback(() => {
    setIsLoadingLogout(true);

    api.post("/logout", {}).then(() => {
      setIsLoadingLogout(true);
      logout();
    });
  }, [logout]);

  const loginHandler = useCallback(
    (email: string, password: string) => {
      setIsLoadingSession(true);
      setWasFetched(false);

      api
        .post("/login", { email, password })
        .then((response: AxiosResponse) => {
          setSession(response.data);
          window.localStorage.setItem(
            "userToken",
            JSON.stringify(response.data.access_token)
          );
          window.localStorage.setItem(
            "isLogged",
            JSON.stringify(response.data)
          );
          setIsLoadingSession(false);
          setWasFetched(true);
          window.location.href = "/";
        })
        .catch((e) => {
          console.log("error");
          setIsLoadingSession(false);
          setWasFetched(true);

          addToast(e.response.data.message, {
            appearance: "error",
            placement: "top-center",
          });
        });
    },
    [addToast]
  );

  const registerHandler = useCallback(
    async (values: UserType) => {
      setIsLoadingRegister(true);
      try {
        await api.post("/register", values);
        addToast("User created successfully", { appearance: "success" });
        setIsLoadingRegister(false);
        window.location.href = "/";
      } catch (e) {
        setIsLoadingRegister(false);
        throw e;
      }
    },
    [addToast]
  );

  const loggedSession = useMemo(
    () => window.localStorage.getItem("isLogged"),
    []
  );

  const loggedIn = useMemo(
    () => !!session?.user?.id || !!loggedSession,
    [session, loggedSession]
  );

  const isUserId = useCallback(
    (userId: string) => session?.user?.id === userId,
    [session]
  );

  const isAdmin = useMemo(() => session?.user?.type === typeAdmin, [session]);

  const hasSession = useCallback(() => !!session, [session]);

  const providerValue = useMemo(
    () => ({
      loggedIn,
      wasFetched,
      getAuthenticationHandler,
      logoutHandler,
      session,
      isUserId,
      isLoadingSession,
      hasSession,
      isLoadingLogout,
      headers,
      loginHandler,
      isAdmin,
      registerHandler,
      isLoadingRegister,
    }),
    [
      isLoadingRegister,
      registerHandler,
      isAdmin,
      loginHandler,
      loggedIn,
      wasFetched,
      session,
      isUserId,
      headers,
      isLoadingSession,
      isLoadingLogout,
      hasSession,
      getAuthenticationHandler,
      logoutHandler,
    ]
  );

  return <Auth.Provider value={providerValue}>{children}</Auth.Provider>;
};

export { AuthProvider, useAuth };
