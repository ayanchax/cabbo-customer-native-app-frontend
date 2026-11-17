# Cabbo mobile fonts

- `Satoshi-Variable.ttf`: copied unchanged from `webapp-code/src/assets/fonts/satoshi/fonts/`. This is the supplied Cabbo web font; retain its original licensing terms.
- `GeistMono-Regular.otf`: official regular face from https://github.com/vercel/geist-font/blob/main/fonts/GeistMono/otf/GeistMono-Regular.otf. License: `GeistMono-OFL.txt`, copied from that repository's OFL.txt.

Both files are bundled app assets, not runtime font downloads. `src/theme/typography.ts` registers the `Satoshi` and `GeistMono` aliases. The Satoshi variable font is used with Expo SDK 58's variable-font support. Check weight rendering on both platforms before release.

Use `Text` and `TextInput` from `@/components/Typography` (also exported from `@/components`) to get the Satoshi default. NativeWind's `font-mono` selects Geist Mono for OTPs and future booking references. Keep general UI and fares in Satoshi. Font size, weight and accessibility text scaling remain configurable on each component. Avoid applying bold weights to the regular-only mono face.

`src/app/_layout.tsx` loads bundled fonts with `expo-font`, holds the splash until loading completes, and provides retry UI on failure. Runtime loading keeps this setup compatible with Expo Go; no native font plugin or rebuild is required just to preview these fonts.
