import { NewTransactionSchema } from "@/components/new-transaction";
import { api } from "../api/axios";
import { GetTransactionsResponse, TransactionCategoryResponse, TransactionCreateResponse } from "../interfaces/https/transaction-interface";
import qs from "qs";

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

export async function createTransaction({ categoryId, description, typeId, value }: NewTransactionSchema): Promise<TransactionCreateResponse> {
  const { data } = await api.post<TransactionCreateResponse>("/transaction", {
    categoryId,
    description,
    typeId,
    value
  })
  return data;
}

export async function deleteTransaction(transactionId: number): Promise<void> {
  await api.delete(`/transaction/${transactionId}`)
}