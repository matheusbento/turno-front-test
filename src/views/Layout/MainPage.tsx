import { useState, useMemo, ReactNode } from "react";

import { colors, utils, display } from "@utils/theme";
import { css } from "glamor";
import Footer from "./Footer";
import SidebarContainer from "./SidebarContainer";
import HeaderContainer from "./HeaderContainer";

const style100vh = css(utils.mvh100);
const styleInnerContent = css(display.flex, {
  flexGrow: 1,
  flexDirection: "column",
});

const transition = {
  transition: "all 300ms cubic-bezier(0.420, 0.000, 0.580, 1.000)",
  transitionTimingFunction: "cubic-bezier(0.420, 0.000, 0.580, 1.000)",
};

export interface MainPageProps {
  children: ReactNode;
}

const MainPage = ({ children }: MainPageProps) => {
  const [visible, setVisible] = useState(window.innerWidth >= 1200);

  const styleContent = useMemo(
    () =>
      css(display.flex, utils.mvh100, transition, {
        flexDirection: "column",
        "@media (min-width: 1200px)": {
          paddingLeft: visible && "120px",
        },
        "@media (max-width: 1199px)": {
          paddingTop: "52px",
        },
      }),
    [visible]
  );

  const styleSidebar = useMemo(
    () =>
      css(transition, utils.h100, {
        position: "fixed",
        top: 0,
        left: visible ? 0 : "-120px",
        bottom: 0,
        width: "120px",
        backgroundColor: colors.blueDarkest,
        zIndex: 9999,
      }),
    [visible]
  );

  const styleSidebarOverlay = useMemo(
    () =>
      css(display.none, utils.h100, utils.w100, {
        position: "fixed",
        top: 0,
        left: "120px",
        bottom: 0,
        right: 0,
        border: "none",
        backgroundColor: "transparent",
        cursor: "default",
        zIndex: 9998,
        "@media (max-width: 1199px)": {
          display: visible ? "block !important" : "none",
        },
      }),
    [visible]
  );

  return (
    <div className={`page ${style100vh}`}>
      <div className={`${styleSidebar}`}>
        <SidebarContainer />
      </div>
      <div className={`${styleContent}`}>
        <HeaderContainer
          setIsBarVisible={setVisible}
          isBarVisible={visible}
        />
        <div className={`${styleInnerContent}`}>{children}</div>
        <Footer />
      </div>
      <button
        type="button"
        className={`${styleSidebarOverlay}`}
        onClick={() => setVisible(false)}
      />
    </div>
  );
};

export default MainPage;
