import { useAuth } from "@hooks/Auth";

import Header from "./Header";

const HeaderContainer = (props: {
  setIsBarVisible: (status: boolean) => void;
  isBarVisible: boolean;
}) => {
  // todo - use contextx
  const searchContext = "Turno";
  const { logoutHandler, session } = useAuth();

  return (
    <Header
      session={session}
      logoutHandler={logoutHandler}
      searchContext={searchContext}
      {...props}
    />
  );
};

export default HeaderContainer;
