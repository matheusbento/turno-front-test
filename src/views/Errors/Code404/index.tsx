import {
  fontSizes,
  fontWeight,
  text,
  colors,
  margin,
  padding,
  buttons,
} from "@utils/theme";
import { css } from "glamor";
import { Link } from "react-router-dom";

const styleContainer = css(text.center, padding.yXxl);

const styleTitle = css(
  fontSizes.xxl,
  margin.topNone,
  margin.bottomXs,
  {
    fontWeight: fontWeight.normal,
    color: colors.greyDarker,
  }
);

const styleSubtitle = css(fontSizes.md, {
  color: colors.greyDark,
});

const Code404 = () => (
  <div className={`${styleContainer}`}>
    <div>
      <h1 className={`${styleTitle}`}>Page not found</h1>
      <p className={`${styleSubtitle}`}>
        We couldn&lsquo;t find the page you&lsquo;re looking for!
      </p>
      <Link
        className={`${css(buttons.pill, buttons.primary, buttons.lg)}`}
        to="/"
        title="Go to home"
      >
        Go to home
      </Link>
    </div>
  </div>
);

export default Code404;
