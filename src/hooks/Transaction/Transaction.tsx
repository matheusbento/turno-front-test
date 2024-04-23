import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from "react";

import api from "@helpers/api";

import { TransactionType } from "types/TransactionType";
import { PaginateParamsType } from "@/types/PaginateParamsType";
import { PaginationType } from "@/types/PaginationType";

export type TransactionHookType = {
  fetchTransactionsHandler: (
    search?: string | undefined | null,
    params?: PaginateParamsType | null
  ) => Promise<void>;
  transactions: TransactionType[] | null;
  transaction: TransactionType | null;
  isLoadingTransactions: boolean;
  pagination: PaginationType | null;
  transactionDepositCheck: string | null;
  fetchTransactionDepositCheckHandler: (transactionId: number) => Promise<void>;
  isLoadingTransactionDepositCheck: boolean;
  approveDepositHandler: (transactionId: number) => Promise<void>;
  rejectDepositHandler: (transactionId: number) => Promise<void>;
  setManageDeposit: React.Dispatch<
    React.SetStateAction<TransactionType | null>
  >;
  manageDeposit: TransactionType | null;
};

export const TransactionContext =
  createContext<TransactionHookType | null>(null);

const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be within TransactionProvider");
  }

  return context;
};

interface TransactionProviderProps {
  children: ReactNode;
}

const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [
    isLoadingTransactionDepositCheck,
    setIsLoadingTransactionDepositCheck,
  ] = useState(false);
  const [isLoadingApprove, setIsLoadingApprove] = useState(false);
  const [isLoadingReject, setIsLoadingReject] = useState(false);
  const [transactionDepositCheck, setTransactionDepositCheck] =
    useState<string | null>(null);
  const [transactions, setTransactions] =
    useState<TransactionType[] | null>(null);
  const [transaction, setTransaction] = useState<TransactionType | null>(null);
  const [pagination, setPagination] = useState<PaginationType | null>(null);

  const [manageDeposit, setManageDeposit] =
    useState<TransactionType | null>(null);

  const fetchTransactionsHandler = useCallback(
    async (
      search: string | undefined | null = null,
      params: PaginateParamsType | null = null
    ) => {
      try {
        setIsLoadingTransactions(true);

        let auxParams: PaginateParamsType = {
          order_by: params?.order_by,
          direction: params?.direction,
          page: params?.page,
        };

        if (search && search?.length > 0) {
          auxParams = {
            ...auxParams,
            q: search,
          };
        }

        const response = await api.get(`transactions/`, {
          params,
        });

        setTransactions(response?.data.data);
        setPagination(response.data.meta);
      } catch (e) {
        setTransactions([]);
        // [todo]
        // toaster(
        //   dispatch,
        //   'Error while trying to load the departmentSources',
        //   'error'
        // );
      } finally {
        setIsLoadingTransactions(false);
      }
    },
    []
  );

  const fetchTransactionDepositCheckHandler = useCallback(
    async (transactionId: number) => {
      try {
        setIsLoadingTransactionDepositCheck(true);

        const response = await api.get(`deposits/${transactionId}/check`);

        setTransactionDepositCheck(response?.data?.data);
      } catch (e) {
        setTransactionDepositCheck(null);
      } finally {
        setIsLoadingTransactionDepositCheck(false);
      }
    },
    []
  );

  const approveDepositHandler = useCallback(async (transactionId: number) => {
    try {
      setIsLoadingApprove(true);

      await api.post(`deposits/${transactionId}/approve`);

      fetchTransactionsHandler();
      setManageDeposit(null);
    } catch (e) {
      setIsLoadingApprove(false);
    }
  }, []);

  const rejectDepositHandler = useCallback(async (transactionId: number) => {
    try {
      setIsLoadingReject(true);

      await api.post(`deposits/${transactionId}/reject`);

      fetchTransactionsHandler();
      setManageDeposit(null);
    } catch (e) {
      setIsLoadingReject(false);
    }
  }, []);

  const providerValue = useMemo(
    () => ({
      isLoadingTransactions,
      transactions,
      transaction,
      fetchTransactionsHandler,
      pagination,
      fetchTransactionDepositCheckHandler,
      transactionDepositCheck,
      isLoadingTransactionDepositCheck,
      approveDepositHandler,
      rejectDepositHandler,
      setManageDeposit,
      manageDeposit,
    }),
    [
      isLoadingTransactionDepositCheck,
      fetchTransactionsHandler,
      transactions,
      transaction,
      isLoadingTransactions,
      pagination,
      fetchTransactionDepositCheckHandler,
      transactionDepositCheck,
      approveDepositHandler,
      rejectDepositHandler,
      setManageDeposit,
      manageDeposit,
    ]
  );

  return (
    <TransactionContext.Provider value={providerValue}>
      {children}
    </TransactionContext.Provider>
  );
};

export { TransactionProvider, useTransaction };
