import { Stack } from "expo-router";
import { AuthPreviewProvider } from "@/features/auth/preview";

export default function AuthLayout() {
  return <AuthPreviewProvider><Stack screenOptions={{ headerShown: false }} /></AuthPreviewProvider>;
}
