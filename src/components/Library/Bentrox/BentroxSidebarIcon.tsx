import SvgIcon from "@components/Library/SvgIcon";
import { css } from "glamor";

interface BentroxSidebarIconProps {
  path: string;
  subItem?: boolean;
  color?: string;
  className?: string;
}

const BentroxSidebarIcon = ({
  path,
  subItem = false,
  color = "",
  className,
}: BentroxSidebarIconProps) => {
  const styleIcon = css({
    cursor: "pointer",
  });

  const size = subItem ? "xl" : "xxl";

  return (
    <SvgIcon
      path={path}
      size={size}
      className={`${styleIcon} ${className}`}
      color={color}
    />
  );
};
export default BentroxSidebarIcon;
