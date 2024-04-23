import { useTransaction } from "@/hooks/Transaction/Transaction";
import TransactionList from "./TransactionList";
import { useEffect } from "react";

const TransactionListContainer = () => {
  const { fetchTransactionsHandler } = useTransaction();

  useEffect(() => {
    fetchTransactionsHandler();
  }, [fetchTransactionsHandler]);

  return <TransactionList />;
};

export default TransactionListContainer;
