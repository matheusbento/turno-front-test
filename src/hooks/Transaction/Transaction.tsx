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
import { useAuth } from "../Auth";

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
  isLoadingApprove: boolean;
  isLoadingReject: boolean;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  isAdding: boolean;
  isLoadingStore: boolean;
  storeDepositHandler: (values: TransactionType) => Promise<void>;
  setIsPurchasing: React.Dispatch<React.SetStateAction<boolean>>;
  isPurchasing: boolean;
  storePurchaseHandler: (values: TransactionType) => Promise<void>;
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
  const {getAuthenticationHandler} = useAuth();
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [
    isLoadingTransactionDepositCheck,
    setIsLoadingTransactionDepositCheck,
  ] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isLoadingApprove, setIsLoadingApprove] = useState(false);
  const [isLoadingReject, setIsLoadingReject] = useState(false);
  const [isLoadingStore, setIsLoadingStore] = useState(false);
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
    } finally {
      setIsLoadingApprove(false);
    }
  }, []);

  const storeDepositHandler = useCallback(async (values: TransactionType) => {
    try {
      setIsLoadingStore(true);

      const formData = new FormData();
      formData.append("amount", String(values.amount));
      formData.append("file", values.file[0]);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      await api.post(`deposits/`, formData, config);

      fetchTransactionsHandler();
      getAuthenticationHandler();
      setIsAdding(false);
    } catch (e) {
      setIsLoadingStore(false);
      throw e;
    } finally {
      setIsLoadingStore(false);
    }
  }, []);

  const storePurchaseHandler = useCallback(async (values: TransactionType) => {
    try {
      setIsLoadingStore(true);

      await api.post(`purchases/`, values);

      fetchTransactionsHandler();
      getAuthenticationHandler();
      setIsPurchasing(false);
    } catch (e) {
      setIsLoadingStore(false);
      throw e;
    } finally {
      setIsLoadingStore(false);
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
    } finally {
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
      isLoadingStore,
      isLoadingApprove,
      isLoadingReject,
      setIsAdding,
      isAdding,
      storeDepositHandler,
      setIsPurchasing,
      isPurchasing,
      storePurchaseHandler,
    }),
    [
      storePurchaseHandler,
      isLoadingStore,
      storeDepositHandler,
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
      isLoadingApprove,
      isLoadingReject,
      setIsAdding,
      isAdding,
      setIsPurchasing,
      isPurchasing,
    ]
  );

  return (
    <TransactionContext.Provider value={providerValue}>
      {children}
    </TransactionContext.Provider>
  );
};

export { TransactionProvider, useTransaction };
