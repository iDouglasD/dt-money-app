import { TransactionTypes } from "@/shared/enums/transaction-types";

export interface TransactionCreateResponse {
  id: number;
  typeId: TransactionTypes;
  categoryId: number;
  description: string;
  value: number;
  createdAt: string;
  updatedAt: string;
}