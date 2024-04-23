import { ReactNode } from "react";

import { UserTransactionPolicyProvider } from "./UserTransactionPolicy";

export interface PolicyProps {
  children: ReactNode;
}

const PoliciesProvider = ({ children }: PolicyProps) => (
  <UserTransactionPolicyProvider>{children}</UserTransactionPolicyProvider>
);

export default PoliciesProvider;
