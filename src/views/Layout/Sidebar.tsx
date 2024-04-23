
import PolicyCheck from "@/components/Library/PolicyCheck";
import { useAuth } from "@hooks/Auth";
import { useUserTransactionPolicy } from "@hooks/Policies/UserTransactionPolicy";
import { display, margin, padding, text } from "@/utils/themeConstants";
import { css } from "glamor";
import { Link, matchPath, useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import SidebarMenuItem from "./SidebarMenuItem";
import Text from "@/components/Library/Text";
import { formatMoney } from "@/utils/formatting";

const styleMenu = css({
  fontSize: "0.9rem",
});

const styleBrand = css(display.block, text.center, padding.sm, {
  "& > img": {
    width: "60px",
  },
});

const styleSubMenu = css({
  background: "#ffffff10",
});

const styleBalance = css(margin.sm, {
  borderRadius: 10,
  background: "#fff",
  textAlign: "center",
});

const Sidebar = () => {
  const { pathname } = useLocation();

  const { loggedIn, session } = useAuth();

  const UserTransactionPolicy = useUserTransactionPolicy();

  return (
    <div className={`${styleMenu}`}>
      <Link className={`${styleBrand}`} to="/">
        <img src="/images/logo/turno-en.png" alt="Turno" />
      </Link>
      {loggedIn && (
        <>
          <Menu.Menu className={`${styleBalance}`}>
            <Text>Balance</Text>
            <Text>{formatMoney(session?.user?.balance ?? 0)}</Text>
          </Menu.Menu>
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
        </>
      )}
    </div>
  );
};

export default Sidebar;
