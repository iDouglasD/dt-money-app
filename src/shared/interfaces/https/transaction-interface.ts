import { TransactionTypes } from "@/shared/enums/transaction-types";

export interface TransactionCategoryResponse {
  id: number;
  name: string;
}

export interface Transaction {
  id: number;
  typeId: TransactionTypes;
  categoryId: number;
  description: string;
  value: number;
  type: {
    id: number;
    name: string;
  },
  category: {
    id: number;
    name: string;
  }
  createdAt: string;
  updatedAt: string;
}

export interface TransactionCreateResponse extends Omit<Transaction, "type" | "category"> { }

export interface TotalTransactions {
  revenue: number;
  expense: number;
  total: number;
}

export interface GetTransactionsResponse {
  data: Transaction[];
  totalRows: number;
  totalPages: number;
  page: number;
  perPage: number;
  totalTransactions: TotalTransactions
}