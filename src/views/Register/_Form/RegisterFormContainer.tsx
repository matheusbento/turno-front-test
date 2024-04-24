import { useCallback } from "react";

import Form from "@components/Library/Form";

import RegisterForm from "./RegisterForm";
import { useAuth } from "@/hooks/Auth";
import { UserType } from "@/types/UserType";

const RegisterFormContainer = (props: any) => {
  const { registerHandler } = useAuth();

  const submit = useCallback(
    (values: UserType) => {
        return registerHandler(values);
    },
    []
  );

  return (
    <Form onSubmit={submit} formArgs={{}}>
      <RegisterForm {...props} />
    </Form>
  );
};

export default RegisterFormContainer;
