/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo, useState } from "react";

import { css } from "glamor";
import { useTransaction } from "@/hooks/Transaction/Transaction";
import { colors, display, flex, margin, padding } from "@/utils/themeConstants";
import BentroxTable from "@/components/Library/Bentrox/Table/BentroxTable";
import BentroxModal from "@/components/Library/Bentrox/BentroxModal/BentroxModal";
import { TransactionType } from "@/types/TransactionType";
import SvgIcon from "@/components/Library/SvgIcon";
import moment from "moment";
import { Case, Default, Else, If, Switch, Then, When } from "react-if";
import Pagination from "@/components/Library/Pagination";
import {
  currentStatusApproved,
  currentStatusPending,
  currentStatusRejected,
  operationDebit,
  typeDeposit,
  typePurchase,
} from "@/constants/TransactionConstants";
import { formatMoney } from "@/utils/formatting";
import Text from "@/components/Library/Text";
import Segment from "@/components/Library/Segment";
import TransactionModalContainer from "../Modal/TransactionModalContainer";
import { useUserTransactionPolicy } from "@/hooks/Policies/UserTransactionPolicy";

const styleArrow = css(display.flex, flex.alignItemsCenter);

const styleType = css(display.flex, flex.alignItemsCenter);

const styleLabel = css(margin.leftXs);

const TransactionList = () => {
  const {
    pagination,
    transactions,
    fetchTransactionsHandler,
    isLoadingTransactions,
    setManageDeposit,
    manageDeposit
  } = useTransaction();

  const handlePageChange = useCallback(
    (page: number) => {
      fetchTransactionsHandler(null, {
        page,
      });
    },
    [fetchTransactionsHandler]
  );

  const headers = useMemo(
    () => [
      {
        label: "",
        key: "operation",
        sortable: false,
        style: `${css({
          minWidth: 50,
          maxWidth: 0,
          wordBreak: "break-word",
        })}`,
      },
      {
        label: "Date",
        key: "Date",
        sortable: false,
        style: `${css({
          minWidth: 100,
          maxWidth: 0,
          wordBreak: "break-word",
        })}`,
      },
      {
        label: "Status",
        key: "status",
        sortable: false,
        style: `${css({
          minWidth: 100,
          maxWidth: 0,
          wordBreak: "break-word",
        })}`,
      },
      {
        label: "Description",
        key: "description",
        sortable: false,
        style: `${css({
          minWidth: 200,
          maxWidth: 0,
          wordBreak: "break-word",
        })}`,
      },
      {
        label: "Type",
        key: "Type",
        sortable: false,
        style: `${css({
          minWidth: 300,
          maxWidth: 0,
          wordBreak: "break-word",
        })}`,
      },
      {
        label: "Amount",
        key: "amount",
        sortable: false,
        style: `${css({
          minWidth: 300,
          maxWidth: 0,
          wordBreak: "break-word",
        })}`,
      },
      { label: "Actions", key: "actions", sortable: false },
    ],
    []
  );

  const rows = useMemo(
    () =>
      transactions?.map((item: TransactionType) => [
        {
          ...item,
        },
        <div key={`entered-${item.id}`} className={`${styleArrow}`}>
          <If condition={item.operation === operationDebit}>
            <Then>
              <SvgIcon
                color={colors.danger}
                size="sm"
                path="fa/solid/arrow-up"
              />
            </Then>
            <Else>
              <SvgIcon
                color={colors.green}
                size="sm"
                path="fa/solid/arrow-down"
              />
            </Else>
          </If>
        </div>,
        moment(item?.created_at).format("MMMM D, YYYY H:m:s"),
        <Switch>
          <Case condition={item.current_status === currentStatusPending}>
            <Segment className={`${styleType}`}>
              <SvgIcon
                color={colors.primary}
                size="sm"
                path="fa/solid/spinner"
              />
              <Text className={`${styleLabel}`}>Pending</Text>
            </Segment>
          </Case>
          <Case condition={item.current_status === currentStatusApproved}>
            <Segment className={`${styleType}`}>
              <SvgIcon color={colors.green} size="sm" path="fa/solid/check" />
              <Text className={`${styleLabel}`}>Approved</Text>
            </Segment>
          </Case>
          <Case condition={item.current_status === currentStatusRejected}>
            <Segment className={`${styleType}`}>
              <SvgIcon color={colors.danger} size="sm" path="fa/solid/xmark" />
              <Text className={`${styleLabel}`}>Rejected</Text>
            </Segment>
          </Case>
        </Switch>,
        item.description,
        <Switch>
          <Case condition={item.type === typeDeposit}>
            <Segment className={`${styleType}`}>
              <SvgIcon
                color={colors.primary}
                size="sm"
                path="fa/solid/money-simple-from-bracket"
              />
              <Text className={`${styleLabel}`}>(Deposit)</Text>
            </Segment>
          </Case>
          <Case condition={item.type === typePurchase}>
            <Segment className={`${styleType}`}>
              <SvgIcon
                color={colors.primary}
                size="sm"
                path="fa/solid/cart-shopping"
              />
              <Text className={`${styleLabel}`}>(Purchase)</Text>
            </Segment>
          </Case>
          <Default>{item.type}</Default>
        </Switch>,
        formatMoney(item.amount),
      ]),
    [transactions]
  );

  const { canManage } = useUserTransactionPolicy();

  const actions = useMemo(
    () => [
      {
        label: "Manage Deposit",
        action: (item: TransactionType) => setManageDeposit(item),
        icon: "fa/solid/money-bill",
        shouldShow: (item: TransactionType) => {
          console.log({tt: item.type === typeDeposit, t:
            item.current_status === currentStatusPending, t5:
            canManage()})
          return (
            item.type === typeDeposit &&
            item.current_status === currentStatusPending &&
            canManage()
          );
        },
      },
    ],
    [setManageDeposit, canManage]
  );

  return (
    <>
      <BentroxTable
        className={`${css(padding.topXs)}`}
        headers={headers}
        rows={rows}
        data={transactions ?? []}
        alignNested="left"
        noDataMsg={"No data found"}
        highlightNested
        loading={isLoadingTransactions}
        actions={actions}
      />
      <BentroxModal
        title={"Manage Deposit"}
        size="mini"
        className={`${css({ top: 50 })}`}
        isClosable
        open={!!manageDeposit}
        closeHandler={() => {
          setManageDeposit(null);
        }}
      >
        <BentroxModal.Content>
          <TransactionModalContainer item={manageDeposit} />
        </BentroxModal.Content>
      </BentroxModal>
      <When condition={!!pagination}>
        {() => (
          <div
            className={`${css(
              display.flex,
              flex.justifyContentCenter,
              margin.bottomSm
            )}`}
          >
            <Pagination
              isLoading={isLoadingTransactions}
              currentPage={pagination?.current_page ?? 1}
              totalPages={pagination?.last_page ?? 1}
              onPageChange={(page: number) => handlePageChange(page)}
              align="right"
            />
          </div>
        )}
      </When>
    </>
  );
};

export default TransactionList;
