// Expo inlines only static process.env.EXPO_PUBLIC_* property references.
// Flags configure client behavior; backend authorization remains authoritative.
export const env = {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
  webAppBaseUrl: process.env.EXPO_PUBLIC_WEB_APP_BASE_URL,
  apiVersion: process.env.EXPO_PUBLIC_API_VERSION,
  appLogoUrl: process.env.EXPO_PUBLIC_APP_LOGO_URL,
  clientGeolocationApiUrl: process.env.EXPO_PUBLIC_CLIENT_GEOLOCATION_API_URL,
  devMode: process.env.EXPO_PUBLIC_DEV_MODE === 'true',
  razorpayKeyId: process.env.EXPO_PUBLIC_RAZOR_PAY_KEY_ID,
  posthog: {
    enabled: process.env.EXPO_PUBLIC_POSTHOG_ENABLED === 'true',
    projectToken: process.env.EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN,
    host: process.env.EXPO_PUBLIC_POSTHOG_HOST,
  },
};
