import BentroxTitle from "@components/Library/BentroxTitle";
import ContentGroup from "@components/Library/ContentGroup";
import Segment from "@components/Library/Segment";
import { breakPoints, colors, margin, padding } from "@/utils/themeConstants";
import { css } from "glamor";
import { Grid, Menu } from "semantic-ui-react";
import TransactionListContainer from "../Turno/Transaction/_List/TransactionListContainer";
import { When } from "react-if";
import { useUserTransactionPolicy } from "@/hooks/Policies/UserTransactionPolicy";
import { buttons } from "@/utils/theme";
import SvgIcon from "@components/Library/SvgIcon";
import { useTransaction } from "@/hooks/Transaction/Transaction";
import BentroxModal from "@components/Library/Bentrox/BentroxModal/BentroxModal";
import UserTransactionDepositFormContainer from "./_Form/UserTransactionDepositFormContainer";
import UserTransactionPurchaseFormContainer from "./_Form/UserTransactionPurchaseFormContainer";

const stylePage = css(padding.xs);

const styleHeaderRight = String(
  css({
    [`@media (max-width: ${breakPoints.sm})`]: { padding: "0px !important" },
  })
);

const Home = () => {
  const { isAdding, setIsAdding, isPurchasing, setIsPurchasing } = useTransaction();
  const { canCustomerManage } = useUserTransactionPolicy();
  return (
    <div className={`${stylePage}`}>
      <BentroxTitle title={"Transactions"}>
        <Menu.Item position="right" className={styleHeaderRight}>
          <When condition={canCustomerManage()}>
            {() => (
              <button
                type="button"
                className={`${css(buttons.plain)}`}
                onClick={() => {
                  setIsAdding(true);
                }}
                title="Add"
              >
                <SvgIcon
                  className={`${css(margin.rightSm)}`}
                  path="fa/solid/money-simple-from-bracket"
                  color={colors.primary}
                  size="lg"
                />
              </button>
            )}
          </When>
          <When condition={canCustomerManage()}>
            {() => (
              <button
                type="button"
                className={`${css(buttons.plain)}`}
                onClick={() => {
                  setIsPurchasing(true);
                }}
                title="Add"
              >
                <SvgIcon
                  className={`${css(margin.rightSm)}`}
                  path="fa/solid/cart-shopping"
                  color={colors.primary}
                  size="lg"
                />
              </button>
            )}
          </When>
        </Menu.Item>
      </BentroxTitle>
      <BentroxModal
        title={"Adding Deposit"}
        size="mini"
        className={`${css({ top: 50 })}`}
        isClosable
        open={!!isAdding}
        closeHandler={() => {
          setIsAdding(false);
        }}
      >
        <BentroxModal.Content>
          <UserTransactionDepositFormContainer />
        </BentroxModal.Content>
      </BentroxModal>
      <BentroxModal
        title={"Purchasing"}
        size="mini"
        className={`${css({ top: 50 })}`}
        isClosable
        open={!!isPurchasing}
        closeHandler={() => {
          setIsPurchasing(false);
        }}
      >
        <BentroxModal.Content>
          <UserTransactionPurchaseFormContainer />
        </BentroxModal.Content>
      </BentroxModal>
      <Segment>
        <Grid>
          <Grid.Column computer={16}>
            <Segment>
              <TransactionListContainer />
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
};

export default Home;
