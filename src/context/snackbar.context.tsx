import { createContext, useState } from "react"

export type SnackbarMessageType = 'success' | 'error'

interface NotifyMessageParams {
  message: string
  type: SnackbarMessageType
}

type NotifyData = {
  message: string | null
  type: SnackbarMessageType | null
}

export type SnackbarContextType = {
  notifyData: NotifyData
  notify: ({ message, type }: NotifyMessageParams) => void
}

export const SnackbarContext = createContext<SnackbarContextType>({} as SnackbarContextType)

export function SnackbarContextProvider({ children }: { children: React.ReactNode }) {
  const [notifyData, setNotifyData] = useState<NotifyData>({
    message: null,
    type: null
  })

  function notify({ message, type }: NotifyMessageParams) {
    setNotifyData({ message, type })
    setTimeout(() => {
      setNotifyData({ message: null, type: null })
    }, 3000)
  }

  return (
    <SnackbarContext.Provider
      value={{
        notifyData,
        notify
      }}
    >
      {children}
    </SnackbarContext.Provider>
  )
}