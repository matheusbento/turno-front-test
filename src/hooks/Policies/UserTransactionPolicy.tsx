import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  ReactNode,
} from "react";

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

  const canAccess = useCallback(() => true, []);

  const canManage = useCallback(() => true, []);

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
