import Segment from "@components/Library/Segment";
import {
  colors,
  display,
  buttons,
  text,
  fontSizes,
  margin,
  padding,
  position,
  utils,
} from "@utils/theme";
import { css } from "glamor";
import { When } from "react-if";
import { Icon, Dropdown } from "semantic-ui-react";

import { SessionType } from "types/SessionType";

const styleNavbar = css(display.flex, padding.xSm, {
  alignItems: "center",
  height: "50px",
  color: colors.negative,
  backgroundColor: colors.default,
  "@media (max-width: 1199px)": {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 3,
    ...utils.w100,
  },
});

const styleSearch = css(padding.xSm, display.none, {
  flexGrow: 1,
  maxWidth: "530px",
  "@media (min-width: 360px)": {
    ...display.block,
  },
});

const styleAvatarBg = css({
  width: "40px !important",
  height: "40px !important",
  backgroundColor: "none !important",
  borderRadius: "50%",
});

const styleButton = css(buttons.plain, text.left, {
  "& > i": {
    color: colors.negative,
  },
});

const styleRightItems = css({
  ...display.flex,
});

const styleUserMenu = css(display.flex, {
  alignItems: "center",
  "@media (max-width: 991px)": {
    "& .dropdown.icon": {
      ...display.none,
    },
  },
});

const styleButtonNotifications = css(
  buttons.plain,
  display.inlineBlock,
  margin.rightMd,
  position.relative,
  padding.xXs
);

const styleFlags = css(padding.sm);

const styleCompanies = css({
  width: 250,
  ...display.flex,
  marginLeft: "auto",
});

const styleNotificationsBadge = css(position.absolute, {
  top: 0,
  right: 0,
});

const styleUserName = css(
  fontSizes.xs,
  margin.rightSm,
  display.none,
  display.mdInline
);

interface HeaderProps {
  session: SessionType | null;
  logoutHandler: () => void;
  setIsBarVisible: (status: boolean) => void;
  searchContext: string;
  isBarVisible: boolean;
}

const Header = ({
  session,
  logoutHandler,
  setIsBarVisible,
  isBarVisible,
}: HeaderProps) => {

  return (
    <header className={`${styleNavbar}`}>
      <div className={`${css({ flexShrink: 1 })}`}>
        <button
          type="button"
          className={`${styleButton}`}
          onClick={() => setIsBarVisible(!isBarVisible)}
        >
          <Icon name="bars" />
        </button>
      </div>

      <Segment className={`${styleFlags} ${styleCompanies}`} />
      <When condition={session && !!session.user}>
        {() => (
          <div className={`${styleRightItems}`}>
            <Dropdown
              className={`${styleUserMenu}`}
              item
              pointing
              trigger={
                <When condition={!!session}>
                  {() => (
                    <span className={`${styleUserName}`}>
                      {session?.user?.name}
                    </span>
                  )}
                </When>
              }
            >
              <Dropdown.Menu direction="left">
                <Dropdown.Item
                  icon="sign-out"
                  text={"Logout"}
                  onClick={logoutHandler}
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </When>
    </header>
  );
};

export default Header;
