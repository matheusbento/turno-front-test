import { display, colors, fontSizes, margin } from "@/utils/themeConstants";
import { css } from "glamor";

const Footer = () => {
  const styleFooter = css(display.flex, fontSizes.xxs, margin.topAuto, {
    alignItems: "center",
    justifyContent: "center",
    color: colors.negative,
    backgroundColor: colors.greyDarkest,
    height: "50px",
  });
  const year = new Date().getFullYear();

  return (
    <div
      className={`${styleFooter}`}
    >{`© ${year} Bentrox. All rights reserved.`}</div>
  );
};

export default Footer;
