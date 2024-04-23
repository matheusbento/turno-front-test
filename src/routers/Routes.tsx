import React from "react";
import { useUserTransactionPolicy } from "@/hooks/Policies/UserTransactionPolicy";
import Code404 from "@views/Errors/Code404";
import MainPage from "@/views/Layout/MainPage";
import { If, Then, Else } from "react-if";
import { BrowserRouter, Route, Routes as RRDRoutes } from "react-router-dom";

import PolicyProtectedRoute from "../components/Library/PolicyProtectedRoute";

const HomeContainer = React.lazy(() => import("@views/Home/HomeContainer"));

const Routes = () => {
  const UserTransactionPolicy = useUserTransactionPolicy();

  return (
    <BrowserRouter>
      <MainPage>
        <If condition={UserTransactionPolicy.canAccess()}>
          <Then>
            {() => (
              <>
                <PolicyProtectedRoute
                  policy={UserTransactionPolicy.canAccess()}
                  exact
                  path="/"
                  element={HomeContainer}
                />

                <RRDRoutes>
                  <Route element={<Code404 />} />
                </RRDRoutes>
              </>
            )}
          </Then>
          <Else>
            {() => (
              <RRDRoutes>
                <Route element={<Code404 />} />
              </RRDRoutes>
            )}
          </Else>
        </If>
      </MainPage>
    </BrowserRouter>
  );
};

export default Routes;
