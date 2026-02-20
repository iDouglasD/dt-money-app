import { TransactionContext } from "@/context/transaction.context";
import { useContext } from "react";

export const useTransaction = () => useContext(TransactionContext);