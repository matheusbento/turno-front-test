import SvgIcon from "@components/Library/SvgIcon";
import { css } from "glamor";

interface SidebarIconProps {
  path: string;
  subItem?: boolean;
  color?: string;
  className?: string;
}

const SidebarIcon = ({
  path,
  subItem = false,
  color = "",
  className,
}: SidebarIconProps) => {
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
export default SidebarIcon;
