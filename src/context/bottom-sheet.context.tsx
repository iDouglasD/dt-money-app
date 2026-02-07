import { createContext, useCallback, useRef, useState } from "react"
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { View, TouchableWithoutFeedback } from "react-native"
import { colors } from "@/shared/colors"

interface BottomSheetParams {
  isOpen: boolean
  content: React.ReactNode | null
  index: number
}

export type BottomSheetContextType = {
  openBottomSheet: (content: React.ReactNode, index: number) => void
  closeBottomSheet: () => void
}

export const BottomSheetContext = createContext<BottomSheetContextType>({} as BottomSheetContextType)

export function BottomSheetContextProvider({ children }: { children: React.ReactNode }) {
  const [bottomSheetParams, setBottomSheetParams] = useState<BottomSheetParams>({
    isOpen: false,
    content: null,
    index: -1
  })
  const { content, index, isOpen } = bottomSheetParams

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = ['70%', '90%']

  const openBottomSheet = useCallback(
    (newContent: React.ReactNode, index: number) => {
      setBottomSheetParams({
        isOpen: true,
        content: newContent,
        index
      })
      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(index)
      })
    }, []
  )

  const closeBottomSheet = useCallback(() => {
    setBottomSheetParams({
      isOpen: false,
      content: null,
      index: -1
    })
    bottomSheetRef.current?.close()
  }, [])

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setBottomSheetParams(prev => ({
        ...prev,
        isOpen: false,
      }))
    }
  }, [])

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet
      }}
    >
      {children}

      {isOpen && (
        <TouchableWithoutFeedback onPress={closeBottomSheet}>
          <View className="absolute inset-0 bg-black/70 z-1" />
        </TouchableWithoutFeedback>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        style={{ zIndex: 2 }}
        index={index}
        enablePanDownToClose
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: colors['background-secondary'],
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          elevation: 9,
        }}
      >
        <BottomSheetScrollView>{content}</BottomSheetScrollView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  )
}