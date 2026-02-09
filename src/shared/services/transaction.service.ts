import { api } from "../api/axios";
import { TransactionCategoryResponse } from "../interfaces/https/transaction-category-response";


export async function getTransactionCategories(): Promise<TransactionCategoryResponse[]> {
  const { data } = await api.get<TransactionCategoryResponse[]>("/transaction/categories")
  return data;
}