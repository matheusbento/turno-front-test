import { TransactionType } from "@/types/TransactionType";
import TransactionModal from "./TransactionModal";
import { useTransaction } from "@/hooks/Transaction/Transaction";
import { useEffect } from "react";

const TransactionModalContainer = ({
  item,
}: {
  item: TransactionType | null;
}) => {
  const { fetchTransactionDepositCheckHandler } = useTransaction();

  useEffect(() => {
    if (item) {
      fetchTransactionDepositCheckHandler(item?.id);
    }
  }, [fetchTransactionDepositCheckHandler]);

  return <TransactionModal item={item} />;
};

export default TransactionModalContainer;
