import { remapProps } from "nativewind";
import type { ComponentProps, ComponentRef } from "react";
import { Text as NativeText, TextInput as NativeTextInput } from "react-native";
import { FONT_FAMILY } from "@/theme/typography";

type TextProps = ComponentProps<typeof NativeText> & { className?: string };
type InputProps = ComponentProps<typeof NativeTextInput> & { className?: string };

// Put the default first so explicit styles and font-mono can override it.
export function Text({ style, ...props }: TextProps) {
  return <NativeText {...props} style={[{ fontFamily: FONT_FAMILY.sans }, style]} />;
}

export function TextInput({ style, ...props }: InputProps) {
  return <NativeTextInput {...props} style={[{ fontFamily: FONT_FAMILY.sans }, style]} />;
}

export type TextInputRef = ComponentRef<typeof NativeTextInput>;

remapProps(Text, { className: "style" });
remapProps(TextInput, { className: "style" });
