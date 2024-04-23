import { useCallback, useMemo } from "react";

import { css } from "glamor";
import { When } from "react-if";
import { Pagination as SemanticPagination } from "semantic-ui-react";

import { useWindowWidth } from "@helpers/index";
import { colors, text } from "@/utils/theme";
import SvgIcon from "./SvgIcon";

const aligns: any = {
  left: text.left,
  center: text.center,
  right: text.right,
};

interface IPagination {
  currentPage: number;
  isLoading?: boolean;
  totalPages: number;
  onPageChange?: any;
  size?: string;
  align?: string;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  isLoading = false,
  align = "center",
  size = "medium",
}: IPagination) => {
  const windowSize = useWindowWidth();

  const stylePaginationContainer = useMemo(
    () =>
      css(aligns[align], {
        "& .pagination": {
          border: "none",
          boxShadow: "none",
        },
        "& .item": {
          justifyContent: "center",
          minWidth: "40px !important",
          width: "40px",
          height: "40px",
          borderRadius: "50% !important",
          border: "none",
          margin: "0 5px",
          padding: "0 !important",
          fontWeight: "700 !important",
          "&:hover": {
            backgroundColor: "#f7f7f7 !important",
          },
          "&:focus": {
            outline: "none",
          },
          "&.Next": {
            backgroundColor: "#c8ccce !important",
          },
          '&[type="prevItem"], &[type="nextItem"]': {
            backgroundColor: "#c8ccce !important",
            "& > div > div": {
              height: "24px",
            },
          },
          "&:before": {
            display: "none",
          },
          "&.active": {
            color: "white !important",
            backgroundColor: "#05559a !important",
            "&:hover": {
              backgroundColor: "#05559a !important",
            },
          },
        },
      }),
    [align]
  );

  const callNextPage = useCallback(
    (_: any, { activePage }: any) => {
      if (onPageChange) {
        onPageChange(activePage);
      }
    },
    [onPageChange]
  );

  return (
    <When condition={totalPages > 1}>
      <div className={`${stylePaginationContainer}`}>
        <SemanticPagination
          disabled={isLoading}
          activePage={currentPage}
          totalPages={totalPages}
          onPageChange={callNextPage}
          firstItem={null}
          lastItem={null}
          prevItem={
            currentPage > 1
              ? {
                  content: (
                    <SvgIcon
                      path="icon-chevron-left"
                      color={colors.greyDarkest}
                      size="lg"
                    />
                  ),
                }
              : null
          }
          nextItem={
            currentPage < totalPages
              ? {
                  content: (
                    <SvgIcon
                      path="icon-chevron-right"
                      color={colors.greyDarkest}
                      size="lg"
                    />
                  ),
                }
              : null
          }
          siblingRange={windowSize >= 768 && size === "medium" ? 1 : 0}
          ellipsisItem={windowSize >= 768 && size === "medium" ? "..." : null}
        />
      </div>
    </When>
  );
};

export default Pagination;
