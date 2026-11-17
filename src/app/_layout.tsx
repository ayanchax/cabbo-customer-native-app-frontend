import "@/global.css";
import { QueryProvider } from "@/services/QueryProvider";
import { FONT_ASSETS } from "@/theme/typography";
import { APP } from "@/utils/constants";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [attempt, setAttempt] = useState(0);
  return (
    <AppReady key={attempt} onRetry={() => setAttempt((value) => value + 1)} />
  );
}

function AppReady({ onRetry }: { onRetry: () => void }) {
  // In this function check app readiness, e.g. fonts, network, etc. If any of these fail, show a retry button.
  // ------------FONT READINESS CHECK------------
  // Check if fonts are loaded and render the app
  const [fontsLoaded, fontError] = useFonts(FONT_ASSETS);

  useEffect(() => {
    if (!fontsLoaded && !fontError) return;

    // TEMPORARY: keep the splash visible for visual inspection in development.
    const timer = setTimeout(
      () => {
        void SplashScreen.hideAsync();
      },
      __DEV__ ? 3000 : 0,
    );

    return () => clearTimeout(timer);
  }, [fontsLoaded, fontError]);

  if (fontError) {
    // Use system text here: custom fonts are unavailable in this recovery state.
    return (
      <View className="flex-1 justify-center gap-5 bg-white p-8">
        <Text
          accessibilityRole="header"
          className="text-2xl font-bold text-secondary"
        >
          {APP.copy.startupErrorTitle}
        </Text>
        <Text className="text-base text-slate-600">
          {APP.copy.startupErrorDescription}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onRetry}
          className="min-h-14 items-center justify-center rounded-2xl bg-primary px-5 py-4"
        >
          <Text className="text-base font-semibold text-white">
            {APP.copy.tryAgain}
          </Text>
        </Pressable>
      </View>
    );
  }
  // If fonts are not loaded yet, don't render anything (keep the splash screen visible)

  if (!fontsLoaded) return null;
  // ------------END FONT READINESS CHECK------------

  // Other readiness checks can be added here, e.g. network connectivity, user session, loading geolocation data etc.

  return (
    <QueryProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryProvider>
  );
}
