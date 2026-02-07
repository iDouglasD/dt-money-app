import { SnackbarContext } from "@/context/snackbar.context";
import { useContext } from "react";

export const useSnackbar = () => useContext(SnackbarContext);