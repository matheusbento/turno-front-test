import { useCallback } from "react";

import Form from "@/components/Library/Form";
import { useTransaction } from "@/hooks/Transaction/Transaction";

import UserTransactionPurchaseForm from "./UserTransactionPurchaseForm";
import { TransactionType } from "@/types/TransactionType";

const UserTransactionPurchaseFormContainer = (props: any) => {
  const { storePurchaseHandler } = useTransaction();

  const submit = useCallback(
    (values: TransactionType) => {
        return storePurchaseHandler(values);
    },
    []
  );

  return (
    <Form onSubmit={submit} formArgs={{}}>
      <UserTransactionPurchaseForm {...props} />
    </Form>
  );
};

export default UserTransactionPurchaseFormContainer;
