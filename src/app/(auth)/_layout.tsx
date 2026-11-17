import { AuthPreviewProvider } from "@/features/auth/preview";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <AuthPreviewProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthPreviewProvider>
  );
}
