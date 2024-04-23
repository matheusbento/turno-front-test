export type TransactionType = {
  id: number;
  amount: number;
  file: FileList,
  type: string;
  operation: string;
  current_status: string;
  description: string;
  created_at: string;
  updated_at: string;
};
