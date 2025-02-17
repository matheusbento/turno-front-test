/* eslint-disable react/jsx-props-no-spreading */
import { css } from "glamor";

import { display, fontWeight, fontSizes, margin } from "@/utils/theme";

import InputCheckbox from "@components/Library/InputCheckbox";
import Segment from "@components/Library/Segment";

const styleNoInfo = css(fontSizes.xs, margin.none);

const styleRole = css(margin.none, { fontWeight: fontWeight.w500 });
const styleSelectCell = css({
  "& .ui.checkbox label": {
    ...display.block,
    width: "100%",
    height: "20px",
    "&::before": {
      top: "0 !important",
      left: "50%",
      transform: "translateX(-50%)",
    },
    "&::after": {
      top: "2px !important",
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
});

export const ListCell = ({ list }: { list?: any }) =>
  list ? (
    <p className={`${styleRole}`}>{list}</p>
  ) : (
    <p className={`${styleNoInfo}`}>No info saved</p>
  );

export const SelectCell = ({ input, ...rest }: any) => (
  <Segment className={`${styleSelectCell}`}>
    <InputCheckbox
      name={rest.name}
      input={{ ...input, value: input?.value ?? false }}
      checked={input?.value}
      onChange={input?.onChange}
      {...rest}
    />
  </Segment>
);
