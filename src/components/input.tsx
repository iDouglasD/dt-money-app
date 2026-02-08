import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { colors } from "@/shared/colors";
import { ErrorMessage } from "./error-message";
import clsx from "clsx";

interface InputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export function Input<T extends FieldValues>({ control, name, label, secureTextEntry, className, ...props }: InputProps<T>) {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="w-full">
          {label && (
            <Text className="mb-2 mt-3 text-base text-gray-600">
              {label}
            </Text>
          )}
          <TextInput
            className={clsx("text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6px] pl-4", className)}
            value={value}
            placeholderTextColor={colors.gray[700]}
            onChangeText={onChange}
            {...props}
          />
          {error && <ErrorMessage message={error.message || ""} />}
        </View>
      )}
    />
  )
}