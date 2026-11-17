import { Text } from "@/components/Typography";
import { View } from "react-native";

export function Heading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <View className="mb-8 gap-3">
      <Text className="text-xs font-semibold uppercase tracking-[2px] text-primary">
        {eyebrow}
      </Text>
      <Text
        accessibilityRole="header"
        className="text-[34px] font-bold leading-[40px] tracking-tight text-secondary"
      >
        {title}
      </Text>
      <Text className="text-base leading-6 text-slate-500">{description}</Text>
    </View>
  );
}
