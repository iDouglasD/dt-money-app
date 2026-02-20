import { TransactionTypes } from "@/shared/enums/transaction-types"
import z from "zod"

export const transactionSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(1, "Description is required"),
  typeId: z.enum(TransactionTypes, "Type is required"),
  categoryId: z.number().min(1, "Category is required"),
  value: z.number().min(0.01, "Value must be greater than 0.01"),
})

export type TransactionSchema = z.infer<typeof transactionSchema>