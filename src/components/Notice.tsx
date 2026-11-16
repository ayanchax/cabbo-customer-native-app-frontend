import { Text, View } from "react-native";

export function Notice({ message, error = false }: { message: string; error?: boolean }) {
  return <View className={`flex-row gap-3 rounded-2xl p-4 ${error ? "bg-red-50" : "bg-blue-50"}`}>
    <Text accessible={false} className={`text-base font-semibold ${error ? "text-red-700" : "text-primary"}`}>{error ? "!" : "i"}</Text>
    <Text accessibilityLiveRegion="polite" className={`flex-1 text-sm leading-5 ${error ? "text-red-800" : "text-slate-700"}`}>{message}</Text>
  </View>;
}
