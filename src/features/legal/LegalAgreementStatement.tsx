import { Text } from "@/components";
import { env } from "@/services/env";
import * as Linking from "expo-linking";
import { Alert } from "react-native";


async function openLegalPage(slug: "terms-of-service" | "privacy-policy") {
  try {
    if (!env.webAppBaseUrl) throw new Error("Web app URL is not configured");
    await Linking.openURL(`${env.webAppBaseUrl.replace(/\/$/, "")}/legal/${slug}`);
  } catch {
    Alert.alert("Unable to open page", "Please try again later.");
  }
}
export function LegalAgreementStatement({ className = "" }: { className?: string }) {

    return (
        <Text className={`text-center text-sm leading-5 text-slate-600 ${className}`}>
            By continuing, you agree to our{" "}
            <Text accessibilityRole="link" className="text-primary underline" onPress={() => void openLegalPage("terms-of-service")}>
                Terms of Service
            </Text>{" "}
            and acknowledge our{" "}
            <Text accessibilityRole="link" className="text-primary underline" onPress={() => void openLegalPage("privacy-policy")}>
                Privacy Policy
            </Text>.
        </Text>
    )
}
