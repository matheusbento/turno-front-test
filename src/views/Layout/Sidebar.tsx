import { useCallback, useEffect, useMemo } from "react";

import PolicyCheck from "@components/Library/PolicyCheck";
import { useAuth } from "@hooks/Auth";
import { useUserTransactionPolicy } from "@hooks/Policies/UserTransactionPolicy";
import { display, margin, padding, text } from "@utils/themeConstants";
import { css } from "glamor";
import { first } from "lodash";
import { When } from "react-if";
import { Link, matchPath, useLocation } from "react-router-dom";
import { Dropdown, DropdownProps, Menu } from "semantic-ui-react";

import SidebarMenuItem from "./SidebarMenuItem";

const styleMenu = css({
  fontSize: "0.9rem",
});

const styleMenuDropdown = css(margin.leftXs, margin.rightXs, margin.bottomXs, {
  width: "105px",
});
const styleDropdown = css({ width: "105px" });

const styleBrand = css(display.block, text.center, padding.sm, {
  "& > img": {
    width: "60px",
  },
});

const styleSubMenu = css({
  background: "#ffffff10",
});

const Sidebar = () => {
  const { pathname } = useLocation();

  const { loggedIn } = useAuth();

  const UserTransactionPolicy = useUserTransactionPolicy();

  return (
    <div className={`${styleMenu}`}>
      <Link className={`${styleBrand}`} to="/">
        <img src="/images/logo/turno-en.png" alt="Turno" />
      </Link>
      {loggedIn && (
        <Menu.Menu className={`${styleSubMenu}`}>
          <PolicyCheck policy={UserTransactionPolicy.canAccess()}>
            <SidebarMenuItem
              subItem
              active={!!matchPath(pathname, "/")}
              to="/"
              icon="fa/solid/money-bill"
              label="Transactions"
            />
          </PolicyCheck>
        </Menu.Menu>
      )}
    </div>
  );
};

export default Sidebar;
