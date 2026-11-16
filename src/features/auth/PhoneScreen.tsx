import { useState } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Button } from "@/components/Button";
import { Notice } from "@/components/Notice";
import { AuthShell, Heading } from "@/features/auth/components/AuthShell";
import { RideArtwork } from "@/features/auth/components/RideArtwork";
import { scenarioMessages, useAuthPreview } from "@/features/auth/preview";

export default function PhoneScreen() {
  const { phone, setPhone, scenario, setScenario } = useAuthPreview();
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);
  const message = scenarioMessages[scenario];
  function next() {
    if (scenario === "Loading") return;
    if (!/^\d{10}$/.test(phone)) { setError("Enter your 10-digit Indian mobile number."); return; }
    if (!__DEV__) { setError("Sign-in will be available in a future update."); return; }
    if (message) { setScenario("Default"); return; }
    Keyboard.dismiss(); router.push("/(auth)/otp");
  }
  return <AuthShell footer={<><Button label={message ? "Try again" : "Continue"} loading={scenario === "Loading"} onPress={next} /><Text className="text-center text-xs leading-5 text-slate-500">An airport run, a day out, or a longer escape.{"\n"}Your next ride starts here.</Text></>}>
    <RideArtwork />
    <Heading eyebrow="WELCOME TO CABBO" title={"Your next ride,\none step away."} description="Enter your mobile number to get started. We'll send you a verification code." />
    <View className="gap-3">
      <Text className="text-sm font-medium text-secondary">Mobile number</Text>
      <View className={`min-h-16 flex-row items-center rounded-2xl border bg-slate-50 px-4 ${error ? "border-red-500" : focused ? "border-primary" : "border-slate-200"}`}>
        <View className="mr-4 flex-row items-center gap-2 border-r border-slate-200 pr-4"><Text accessible={false} className="text-xl">🇮🇳</Text><Text className="text-lg font-medium text-secondary">+91</Text></View>
        <TextInput accessibilityLabel="Indian mobile number, country code plus 91" value={phone} onChangeText={(value) => { setPhone(value.replace(/\D/g, "").slice(0, 10)); setError(""); }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder="Mobile number" placeholderTextColor="#64748B" keyboardType="phone-pad" autoComplete="tel-national" textContentType="telephoneNumber" returnKeyType="done" onSubmitEditing={next} selectionColor="#0B5FFF" className="min-h-16 min-w-0 flex-1 py-4 text-lg text-secondary" />
      </View>
      {error ? <Text accessibilityLiveRegion="polite" className="text-sm text-red-700">{error}</Text> : <Text className="text-xs text-slate-500">Indian mobile numbers only</Text>}
      {scenario === "Outside India" && <Notice message="It looks like you're accessing Cabbo from outside India. You can sign in with an Indian mobile number (+91)." />}
      {message && <Notice error message={message} />}
    </View>
    <View className="mt-8 flex-row flex-wrap gap-x-5 gap-y-2"><Text className="text-xs font-medium text-slate-500">↗  Airport transfers</Text><Text className="text-xs font-medium text-slate-500">◷  Local rentals</Text><Text className="text-xs font-medium text-slate-500">↗  Outstation</Text></View>
  </AuthShell>;
}
