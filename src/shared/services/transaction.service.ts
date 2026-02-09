import { NewTransactionSchema } from "@/components/new-transaction";
import { api } from "../api/axios";
import { TransactionCategoryResponse } from "../interfaces/https/transaction-category-response";
import { TransactionCreateResponse } from "../interfaces/https/transaction-create-response";


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