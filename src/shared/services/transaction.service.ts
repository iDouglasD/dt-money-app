import { TransactionSchema } from "@/screens/home/_validations/transaction-schema";
import { api } from "../api/axios";
import { GetTransactionsResponse, TransactionCategoryResponse, TransactionCreateResponse } from "../interfaces/https/transaction-interface";
import qs from "qs";

export interface Pagination {
  page: number;
  perPage: number;
  totalRows?: number;
  totalPages: number;
}

interface GetTransactionsParams {
  page: number;
  perPage: number;
  from?: Date,
  to?: Date,
  searchText?: string;
  typeId?: number
  categoryId?: number;
}

export async function getTransactions(params: GetTransactionsParams): Promise<GetTransactionsResponse> {
  const { data } = await api.get<GetTransactionsResponse>("/transaction", {
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" })
  })
  return data;
}

export async function getTransactionCategories(): Promise<TransactionCategoryResponse[]> {
  const { data } = await api.get<TransactionCategoryResponse[]>("/transaction/categories")
  return data;
}

export async function createTransaction({ categoryId, description, typeId, value }: TransactionSchema): Promise<TransactionCreateResponse> {
  const { data } = await api.post<TransactionCreateResponse>("/transaction", {
    categoryId,
    description,
    typeId,
    value
  })
  return data;
}


export async function updateTransaction({ ...rest }: TransactionSchema): Promise<TransactionCreateResponse> {
  const { data } = await api.put<TransactionCreateResponse>('/transaction', {
    ...rest
  })
  return data;
}


export async function deleteTransaction(transactionId: number): Promise<void> {
  await api.delete(`/transaction/${transactionId}`)
}