import { TransactionTypes } from "@/shared/enums/transaction-types"
import { TransactionHeaderCardType } from "../_components/transaction-header-card"

interface CardData {
  label: string
  bgColor: string
}

export const CARD_DATA: Record<TransactionHeaderCardType, CardData> = {
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