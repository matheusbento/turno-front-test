import { useCallback } from "react";

import Form from "@/components/Library/Form";
import { useTransaction } from "@/hooks/Transaction/Transaction";

import UserTransactionDepositForm from "./UserTransactionDepositForm";
import { TransactionType } from "@/types/TransactionType";

const UserTransactionDepositFormContainer = (props: any) => {
  const { storeDepositHandler } = useTransaction();

  const submit = useCallback((values: TransactionType) => {
    return storeDepositHandler(values);
  }, []);

  return (
    <Form onSubmit={submit} formArgs={{}}>
      <UserTransactionDepositForm {...props} />
    </Form>
  );
};

export default UserTransactionDepositFormContainer;
