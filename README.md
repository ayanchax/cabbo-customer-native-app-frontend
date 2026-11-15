# Cabbo mobile app

React Native + Expo + TypeScript, with Expo Router. Supports Android and iOS.

## Development

```sh
npm ci
npm run android
```

`npm run android` starts Expo and opens the running Android emulator.
Use `npm start` for the Expo development menu. Local iOS simulation requires macOS and Xcode.

## Source

- `src/app/_layout.tsx`: root navigation layout.
- `src/app/index.tsx`: initial screen.
- `assets/`: placeholder app icons and splash assets; replace with Cabbo branding before release.

Keep shared components, hooks, services, and business logic outside `src/app` as they are added.

## Checks

```sh
npm run typecheck
npm run lint
```
