/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";

import { Else, If, Then } from "react-if";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import Loading from "@components/Loading/Loading";
import LoadingGate from "@components/LoadingGate/LoadingGate";
import TRoutes from "./Routes";

const LoginContainer = React.lazy(() => import("@views/Login/LoginContainer"));
const RegisterContainer = React.lazy(() => import("@views/Register/RegisterContainer"));

const RoutesContainer = () => {
  const { getAuthenticationHandler, wasFetched, loggedIn } = useAuth();

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname !== "/login" && loggedIn) {
      getAuthenticationHandler();
    }
  }, [getAuthenticationHandler, loggedIn]);

  useEffect(() => {
    const { pathname } = window.location;
    if (!["/login", "/register"].includes(pathname) && wasFetched && !loggedIn) {
      window.location.href = "/login";
    }
  }, [wasFetched, loggedIn]);

  return (
    <LoadingGate waitFor={wasFetched} meanwhile={<Loading />}>
      <If condition={loggedIn}>
        <Then>{() => <TRoutes />}</Then>
        <Else>
          {() => (
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginContainer />} />
                <Route path="/register" element={<RegisterContainer />} />
              </Routes>
            </BrowserRouter>
          )}
        </Else>
      </If>
    </LoadingGate>
  );
};

export default RoutesContainer;
