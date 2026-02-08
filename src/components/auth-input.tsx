import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useRef, useState } from "react";
import clsx from "clsx";
import { ErrorMessage } from "./error-message";

interface AuthInputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap
  label: string;
}

export function AuthInput<T extends FieldValues>({ control, name, label, leftIconName, secureTextEntry, ...props }: AuthInputProps<T>) {
  const [isFocused, setIsFocused] = useState(false);
  const [showSecureText, setShowSecure] = useState(secureTextEntry);

  const inputRef = useRef<TextInput>(null);

  function handleFocus() {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused())
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="w-full mt-4">
          {label && (
            <Text
              className={clsx(
                "mb-2 mt-3 text-base",
                isFocused ? "text-accent-brand" : "text-gray-600"
              )}
            >
              {label}
            </Text>
          )
          }
          <TouchableOpacity className="flex-row items-center justify-between border-b-[1px] border-gray-600 px-3 py-2 h-16">
            {leftIconName && (
              <MaterialIcons
                className="mr-2"
                size={24}
                name={leftIconName}
                color={isFocused ? colors["accent-brand"] : colors.gray[600]}
              />
            )}
            <TextInput
              className="flex-1 text-base text-gray-500"
              value={value}
              placeholderTextColor={colors.gray[700]}
              ref={inputRef}
              secureTextEntry={showSecureText}
              onFocus={handleFocus}
              onEndEditing={handleFocus}
              onChangeText={onChange}
              {...props}
            />
            {
              secureTextEntry && (
                <TouchableOpacity onPress={() => setShowSecure((prev) => !prev)}>
                  <MaterialIcons
                    size={24}
                    color={colors.gray[600]}
                    name={showSecureText ? "visibility" : "visibility-off"}
                  />
                </TouchableOpacity>
              )
            }
          </TouchableOpacity>
          {error && <ErrorMessage message={error.message || ""} />}
        </View>
      )}
    />
  )
}