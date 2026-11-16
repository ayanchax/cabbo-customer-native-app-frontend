import { ActivityIndicator, Pressable, Text } from "react-native";

type Props = { label: string; onPress: () => void; disabled?: boolean; loading?: boolean; secondary?: boolean };
export function Button({ label, onPress, disabled, loading, secondary }: Props) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled: disabled || loading, busy: loading }} disabled={disabled || loading} onPress={onPress} className={`min-h-14 flex-row items-center justify-center gap-3 rounded-2xl px-5 py-4 ${secondary ? "bg-slate-100 active:bg-slate-200" : "bg-primary active:bg-primary-pressed"} ${disabled ? "opacity-40" : ""}`}>
    {loading && <ActivityIndicator color={secondary ? "#111827" : "#FFFFFF"} />}
    <Text className={`text-center text-base font-semibold ${secondary ? "text-secondary" : "text-white"}`}>{label}</Text>
    {!loading && !secondary && <Text accessible={false} className="text-xl text-white">→</Text>}
  </Pressable>;
}
