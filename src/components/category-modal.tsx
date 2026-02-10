import clsx from "clsx";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { NewTransactionSchema } from "./new-transaction";
import Checkbox from "expo-checkbox";
import { ErrorMessage } from "./error-message";
import { useQuery } from "@tanstack/react-query";
import { getTransactionCategories } from "@/shared/services/transaction.service";

export function CategoryModal() {
  const { control, watch, formState: { errors } } = useFormContext<NewTransactionSchema>()
  const [isVisible, setIsVisible] = useState(false)

  const selectedCategoryId = watch("categoryId")

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getTransactionCategories,
  })

  const selectedCategory = categories?.find((category) => category.id === selectedCategoryId)

  function toggleModal() {
    setIsVisible((prev) => !prev)
  }

  return (
    <>
      <TouchableOpacity
        className="h-[50] bg-background-primary my-2 rounded-[6] pl-4 justify-center"
        onPress={toggleModal}
      >
        <Text className={
          clsx("text-lg",
            selectedCategory ? "text-white" : "text-gray-700"
          )}>
          {selectedCategoryId ? selectedCategory?.name : "Category"}
        </Text>
      </TouchableOpacity>
      {errors.categoryId &&
        <ErrorMessage message={errors.categoryId.message || ""} />
      }

      <Modal visible={isVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[90%] bg-background-secondary p-4 rounded-xl">
              <Text className="text-white text-lg mb-4">
                Select a category
              </Text>
              <FlatList
                data={categories}
                keyExtractor={(item) => `category-${item.id}`}
                renderItem={({ item }) => (
                  <Controller
                    name="categoryId"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      const isChecked = value === item.id
                      return (
                        <TouchableOpacity
                          className="flex-row items-center bg-gray-800 rounded-lg mb-2 p-4"
                          onPress={() => onChange(item.id)}
                        >
                          <Checkbox
                            className="mr-4"
                            value={isChecked}
                            onValueChange={() => onChange(item.id)}
                          />
                          <Text className="text-white text-lg py-2">
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )

}