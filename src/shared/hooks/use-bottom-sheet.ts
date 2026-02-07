import { BottomSheetContext } from "@/context/bottom-sheet.context";
import { useContext } from "react";

export const useBottomSheet = () => useContext(BottomSheetContext);