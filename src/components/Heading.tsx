import { Text } from "@/components/Typography";
import { View, type TextProps } from "react-native";

export function Heading({
  eyebrow,
  title,
  description,
  eyebrowProps,
}: {
  eyebrow: string;
  title: string;
  description: string;
  eyebrowProps?: {
    "aria-label"?: string;
    "aria-hidden"?: boolean;
    accessibilityRole?: TextProps["accessibilityRole"];
    accessibilityLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    accessibilityState?: { disabled?: boolean; expanded?: boolean };
    accessibilityValue?: {
      min?: number;
      max?: number;
      now?: number;
      text?: string;
    };
    uppercase?: boolean;
  };
}) {
  const {
    uppercase = true,
    accessibilityRole = "text",
    ...textProps
  } = eyebrowProps ?? {};

  return (
    <View className="mb-8 gap-3">
      {/* Eyebrow with accessibility role set to text */}
      <Text
        className="text-xs font-semibold tracking-[2px] text-primary"
        {...textProps}
        accessibilityRole={accessibilityRole}
        style={uppercase ? { textTransform: "uppercase" } : undefined}
      >
        {eyebrow}
      </Text>
      {/* Header title with default accessibility role as "header" */}
      <Text
        accessibilityRole="header"
        className="text-[34px] font-bold leading-[40px] tracking-tight text-secondary"
      >
        {title}
      </Text>
      {/* Description with default accessibility role as "text" */}
      <Text
        accessibilityRole="text"
        className="text-base leading-6 text-slate-500"
      >
        {description}
      </Text>
    </View>
  );
}
