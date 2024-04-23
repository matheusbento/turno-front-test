import SvgIcon from "@components/Library/SvgIcon";
import { display, colors } from "@utils/theme";
import { css } from "glamor";
import { When } from "react-if";
import { Dropdown } from "semantic-ui-react";

import BentroxTableActionItem from "./BentroxTableActionItem";

const styleDropdown = css({
  marginLeft: "auto",
  "& .dropdown.icon": {
    ...display.none,
  },
});

export interface BentroxTableActionItemProps {
  actions?: any;
  item?: any;
}

const BentroxTableActions = ({
  actions = null,
  item = null,
}: BentroxTableActionItemProps) => (
  <Dropdown
    trigger={
      <SvgIcon path="icon-more-vertical" color={colors.default} size="lg" />
    }
    direction="left"
    className={`${styleDropdown}`}
    disabled={false}
  >
    <Dropdown.Menu>
      {actions?.map((actionItem: any) => (
        <When
          key={`action-item-${item?.id}-${actionItem.label}`}
          condition={actionItem.shouldShow ? actionItem.shouldShow(item) : true}
        >
          {() => (
            <BentroxTableActionItem
              item={item}
              label={actionItem.label}
              clickHandler={actionItem.action}
            />
          )}
        </When>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

export default BentroxTableActions;
