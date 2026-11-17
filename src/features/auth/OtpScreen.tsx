import { Text, TextInput } from "@/components/Typography";
import { Button, Heading, Notice } from "@/components";
import { AuthShell } from "@/features/auth/components";
import { scenarioMessages, useAuthPreview } from "@/features/auth/preview";
import { router } from "expo-router";
import { APP } from "@/utils/constants";
import { useEffect, useState } from "react";
import { Keyboard, Pressable, View } from "react-native";

// Preview values only; replace with the confirmed OTP contract during integration.
const PREVIEW_RESEND_SECONDS = 30;
export default function OtpScreen() {
  const { phone, returning, scenario, setScenario } = useAuthPreview();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [resendAt, setResendAt] = useState(
    () => Date.now() + PREVIEW_RESEND_SECONDS * 1000,
  );
  const [seconds, setSeconds] = useState(PREVIEW_RESEND_SECONDS);
  const [resent, setResent] = useState(false);
  useEffect(() => {
    const update = () =>
      setSeconds(Math.max(0, Math.ceil((resendAt - Date.now()) / 1000)));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [resendAt]);
  const back = () => {
    setScenario("Default");
    if (router.canGoBack()) router.back();
    else router.replace("/(auth)/login");
  };
  function verify() {
    if (scenario === "Loading") return;
    if (code.length !== 6) {
      setError("Enter the 6-digit verification code.");
      return;
    }
    if (!__DEV__) {
      setError("Sign-in will be available in a future update.");
      return;
    }
    if (scenarioMessages[scenario]) {
      setScenario("Default");
      setCode("");
      return;
    }
    Keyboard.dismiss();
    router.push(returning ? "/(auth)/complete" : "/(auth)/onboarding");
  }
  return (
    <AuthShell
      back={back}
      footer={
        <>
          <Button
            label={
              scenarioMessages[scenario] ? "Try again" : "Verify & continue"
            }
            onPress={verify}
            loading={scenario === "Loading"}
          />
          <Text className="text-center text-xs text-slate-500">
            {APP.copy.phonePrivacyNote}
          </Text>
        </>
      }
    >
      <View className="mb-8 mt-4 h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
        <Text accessible={false} className="text-3xl text-primary">
          #
        </Text>
      </View>
      <Heading
        eyebrow="ONE QUICK CHECK"
        title="Verify your number."
        description={`Enter the code for +91 ••••••${phone.slice(-4) || "••••"}.`}
      />
      <Pressable
        accessibilityRole="button"
        onPress={back}
        className="-mt-5 mb-8 min-h-11 justify-center self-start"
      >
        <Text className="text-sm font-semibold text-primary">
          Change number
        </Text>
      </Pressable>
      <View className="gap-3">
        <Text className="text-sm font-medium text-secondary">
          Verification code
        </Text>
        <TextInput
          accessibilityLabel="6-digit verification code"
          value={code}
          onChangeText={(value) => {
            setCode(value.replace(/\D/g, "").slice(0, 6));
            setError("");
          }}
          keyboardType="number-pad"
          autoComplete="one-time-code"
          textContentType="oneTimeCode"
          maxLength={6}
          placeholder="000000"
          placeholderTextColor="#CBD5E1"
          selectionColor="#0B5FFF"
          onSubmitEditing={verify}
          className={`min-h-20 rounded-2xl border bg-slate-50 px-4 py-5 text-center text-3xl font-mono tracking-[12px] text-secondary ${error ? "border-red-500" : "border-slate-200"}`}
        />
        {error && (
          <Text
            accessibilityLiveRegion="polite"
            className="text-sm text-red-700"
          >
            {error}
          </Text>
        )}
        {scenarioMessages[scenario] && (
          <Notice error message={scenarioMessages[scenario]!} />
        )}
        {resent && (
          <Text
            accessibilityLiveRegion="polite"
            className="text-sm text-slate-500"
          >
            Resend preview reset. No SMS was sent.
          </Text>
        )}
      </View>
      <View className="mt-6 flex-row flex-wrap items-center gap-x-2">
        <Text className="text-sm text-slate-500">Didn’t get a code?</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: seconds > 0 }}
          disabled={seconds > 0 || !__DEV__}
          onPress={() => {
            setCode("");
            setError("");
            setScenario("Default");
            setResent(true);
            setResendAt(Date.now() + PREVIEW_RESEND_SECONDS * 1000);
          }}
          className="min-h-12 justify-center"
        >
          <Text
            className={`text-sm font-semibold ${seconds > 0 ? "text-slate-500" : "text-primary"}`}
          >
            {seconds > 0 ? `Resend in ${seconds}s` : "Resend code"}
          </Text>
        </Pressable>
      </View>
    </AuthShell>
  );
}
