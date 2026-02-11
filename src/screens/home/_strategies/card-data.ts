import { TransactionTypes } from "@/shared/enums/transaction-types"
import { TransactionCardType } from "../_components/transaction-card"

interface CardData {
  label: string
  bgColor: string
}

export const CARD_DATA: Record<TransactionCardType, CardData> = {
  [TransactionTypes.EXPENSE]: {
    label: "Expense",
    bgColor: "background-tertiary"
  },
  [TransactionTypes.REVENUE]: {
    label: "Revenue",
    bgColor: "background-tertiary"
  },
  total: {
    label: "Total",
    bgColor: "accent-brand-background-primary"
  }
}