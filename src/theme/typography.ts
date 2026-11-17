// Aliases registered by expo-font at startup and used by shared typography.
export const FONT_FAMILY = {
  sans: "Satoshi",
  mono: "GeistMono",
} as const;

export const FONT_ASSETS = {
  Satoshi: require("@/assets/fonts/Satoshi-Variable.ttf"),
  GeistMono: require("@/assets/fonts/GeistMono-Regular.otf"),
};

export const TEXT_INPUT_PROPERTIES={
  placeholderTextColor:"#64748B",
  selectionColor:"#0B5FFF",
} as const;
