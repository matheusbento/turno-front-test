import { css } from "glamor";

import { buttons, colors, display } from "../../utils/theme";
import SvgIcon from "./SvgIcon";

const styleButton = css(buttons.plain);

interface CloseModalIconProps {
  onClick?: any;
  disabled?: boolean;
}

const CloseModalIcon = ({
  onClick = null,
  disabled = false,
}: CloseModalIconProps) => (
  <button
    type="button"
    className={`${styleButton}`}
    onClick={onClick}
    disabled={disabled}
  >
    <SvgIcon
      className={`${css(display.block)}`}
      path="fa/regular/circle-xmark"
      size="lg"
      color={colors.primary}
    />
  </button>
);

export default CloseModalIcon;
