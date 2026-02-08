import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, View } from "react-native";
import { ErrorMessage } from "./error-message";
import clsx from "clsx";
import CurrencyInputLib from "react-native-currency-input";

interface CurrencyInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
  prefix?: string;
  delimiter?: string;
  separator?: string;
  precision?: number;
  minValue?: number;
}

export function CurrencyInput<T extends FieldValues>({
  control,
  name,
  label,
  prefix,
  delimiter,
  separator,
  precision,
  minValue = 0,
  className,
  ...props
}: CurrencyInputProps<T>) {

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
          <CurrencyInputLib
            className={clsx("text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6px] pl-4", className)}
            value={value}
            onChangeValue={onChange}
            prefix={prefix}
            delimiter={delimiter}
            separator={separator}
            precision={precision}
            minValue={minValue}
            {...props}
          />
          {error && <ErrorMessage message={error.message || ""} />}
        </View>
      )}
    />
  )
}