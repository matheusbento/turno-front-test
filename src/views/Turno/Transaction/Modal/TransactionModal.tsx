import Button from "@components/Library/Button";
import Segment from "@components/Library/Segment";
import { useTransaction } from "@/hooks/Transaction/Transaction";
import { TransactionType } from "@/types/TransactionType";
import { formatMoney } from "@/utils/formatting";
import { Else, If, Then } from "react-if";
import { Grid, Image, Loader } from "semantic-ui-react";

const TransactionModal = ({ item }: { item: TransactionType | null }) => {
  const {
    transactionDepositCheck,
    isLoadingTransactionDepositCheck,
    approveDepositHandler,
    rejectDepositHandler,
  } = useTransaction();
  return (
    <Grid>
      <Grid.Column computer={16}>
        <Segment box>
          <If condition={isLoadingTransactionDepositCheck}>
            <Then>
              <Loader></Loader>
            </Then>
            <Else>
              <Image
                src={`data:image/jpeg;base64,${transactionDepositCheck}`}
                centered
              />
            </Else>
          </If>
        </Segment>
      </Grid.Column>
      <Grid.Column computer={16}>
        <center>
          <b>{formatMoney(item?.amount ?? 0)}</b>
        </center>
      </Grid.Column>
      <Grid.Column computer={16}>
        <center>{item?.description}</center>
      </Grid.Column>
      <Grid.Column computer={8}>
        <Button
          pill
          fluid
          color="default"
          outline
          onClick={() => item?.id && rejectDepositHandler(item?.id)}
        >
          Reject
        </Button>
      </Grid.Column>
      <Grid.Column computer={8}>
        <Button
          pill
          fluid
          color="success"
          onClick={() => item?.id && approveDepositHandler(item?.id)}
        >
          Approve
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default TransactionModal;
