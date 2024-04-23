import { ReactElement, ReactNode, useMemo } from "react";

import { Route, Routes } from "react-router-dom";

import Code404 from "@views/Errors/Code404";

export interface PolicyProtectedProps {
  policy?: boolean;
  element: any;
  exact?: boolean;
  path?: string;
}

const PolicyProtectedRoute = ({
  policy = false,
  element,
  ...rest
}: PolicyProtectedProps) => {
  const ComponentToRender = useMemo(
    () => (policy ? element : Code404),
    [policy, element]
  );

  return (
    <Routes>
      <Route {...rest} element={<ComponentToRender />} />
    </Routes>
  );
};

export default PolicyProtectedRoute;
