# Environment configuration

The web application's `VITE_*` values are adapted to Expo's `EXPO_PUBLIC_*` prefix. All these values are public client configuration, including the Razorpay key ID and PostHog project token. Never add Razorpay secret keys, session credentials or backend secrets here.

## Select an environment

Use Node 22.13 or newer for the built-in environment-file loader.

```sh
npm run expo:local -- start --clear
npm run expo:dev -- start --clear
npm run expo:prod -- export --platform android
npm run expo:local -- android
npm run expo:dev -- ios --clear
```

Platform arguments default to `start`: `npm run expo:local -- android` runs `expo start --android` using local settings. Append start options such as `--clear`, or an explicit `export` command (`npm run expo:prod -- android export`). The three environment scripts also default to `start` when no command is given. Platform shortcuts support `start` and `export`; pass other Expo commands without the platform shortcut.

Each command loads exactly `.env.local`, `.env.dev` or `.env.prod`, clears inherited `EXPO_PUBLIC_*` values, and disables Expo's automatic dotenv loading for that command. This prevents `.env.local` from overriding development or production settings. Restart Metro when switching environments. The wrapper accepts other Expo commands and options in the same way.

Existing `npm start`, `npm run android`, `npm run ios` and `npm run web` use Expo's normal loading behavior, including `.env.local`. Bare `expo export` also loads `.env.local` if present; use the explicit environment commands to select release settings. `.env.dev` and `.env.prod` are not automatically recognized by Expo. Do not use `NODE_ENV` to select the backend.

`.env.local` is ignored by Git. `.env.dev` and `.env.prod` contain the supplied shared public configuration. Development intentionally omits PostHog variables; the config accessor defaults analytics to disabled when the enabled flag is absent. Production preserves the supplied enabled flag; no analytics SDK or event collection is activated by this setup alone. EAS build/update environment configuration will be added separately before release; these local commands do not configure cloud environments.

## Mobile differences

- `EXPO_PUBLIC_WEB_APP_BASE_URL` is the existing browser application's URL, not the mobile app's deep-link origin. Native links use the configured `cabbo` scheme; verified HTTPS links need separate setup.
- `http://localhost:8000` works only when the API is reachable on that runtime's localhost. Android Emulator normally uses `http://10.0.2.2:8000` to reach the host computer; a physical phone needs the computer's reachable LAN address or the development HTTPS API. Keep local HTTP usage limited to development and verify device networking when API integration starts.
- `EXPO_PUBLIC_APP_LOGO_URL` is available for future use; configured app icons and splash artwork still use bundled local assets.
- The IP geolocation URL is retained as configuration only. No request, location permission or provider integration is introduced.
- Read configuration through `@/services/env`. That file uses static `process.env.EXPO_PUBLIC_*` references so Expo can inline them. Boolean values are parsed explicitly. Missing optional strings remain undefined; validate required values when their services are implemented.

Reference: [Expo environment variables](https://docs.expo.dev/guides/environment-variables/).
