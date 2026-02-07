import { AppError } from "../helpers/app-error";
import { useSnackbar } from "./use-snackbar";

interface HandleErrorParams {
  error: unknown
  defaultMessage?: string
}


export function useErrorHandler() {
  const { notify } = useSnackbar()

  function handleError({ error, defaultMessage }: HandleErrorParams) {
    const isAppError = error instanceof AppError
    const message = isAppError ? error.message : defaultMessage || "An unexpected error occurred. Please try again later."

    notify({
      message,
      type: 'error'
    })
  }

  return {
    handleError
  }
}