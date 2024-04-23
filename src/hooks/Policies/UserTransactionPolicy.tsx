import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { useAuth } from "../Auth";
import { typeAdmin } from "@/constants/userConstants";

export type UserTransactionPolicyContextType = {
  canAccess: () => boolean;
  canManage: () => boolean;
};

const UserTransactionPolicyContext = createContext<UserTransactionPolicyContextType | null>(
  null
);

export interface UserTransactionPolicyProps {
  children: ReactNode;
}

const UserTransactionPolicyProvider = ({ children }: UserTransactionPolicyProps) => {
  const {isAdmin} = useAuth();

  const canAccess = useCallback(() => true, []);

  const canManage = useCallback(() => isAdmin, [isAdmin]);

  const value = useMemo(
    () => ({
      canAccess,
      canManage,
    }),
    [canAccess, canManage]
  );

  return (
    <UserTransactionPolicyContext.Provider value={value}>
      {children}
    </UserTransactionPolicyContext.Provider>
  );
};

function useUserTransactionPolicy() {
  const context = useContext(UserTransactionPolicyContext);

  if (!context)
    throw new Error(
      "useUserTransactionPolicy must be used within a UserTransactionPolicyProvider"
    );

  return context;
}

export { UserTransactionPolicyProvider, useUserTransactionPolicy };
