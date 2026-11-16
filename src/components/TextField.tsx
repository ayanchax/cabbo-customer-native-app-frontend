import { Text, TextInput, View, type TextInputProps } from "react-native";
import { useState, type ComponentRef, type Ref } from "react";

type Props = TextInputProps & { label: string; error?: string; optional?: boolean; inputRef?: Ref<ComponentRef<typeof TextInput>> };
export function TextField({ label, error, optional, inputRef, ...props }: Props) {
  const [focused, setFocused] = useState(false);
  return <View className="gap-2">
    <View className="flex-row items-center justify-between"><Text className="text-sm font-medium text-secondary">{label}</Text>{optional && <Text className="text-xs text-slate-500">Optional</Text>}</View>
    <TextInput {...props} ref={inputRef} accessibilityLabel={label} placeholderTextColor="#64748B" selectionColor="#0B5FFF" onFocus={(event) => { setFocused(true); props.onFocus?.(event); }} onBlur={(event) => { setFocused(false); props.onBlur?.(event); }} className={`min-h-14 rounded-2xl border bg-slate-50 px-4 py-4 text-base text-secondary ${error ? "border-red-500" : focused ? "border-primary" : "border-slate-200"}`} />
    {error && <Text accessibilityLiveRegion="polite" className="text-sm text-red-700">{error}</Text>}
  </View>;
}
