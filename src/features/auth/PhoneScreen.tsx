import { Text, TextInput } from "@/components/Typography";
import { Button, Heading, Notice } from "@/components";
import { AuthShell, RideArtwork } from "@/features/auth/components";
import { scenarioMessages, useAuthPreview } from "@/features/auth/preview";
import { router } from "expo-router";
import { APP } from "@/utils/constants";
import { CarFront, Plane, Route } from "lucide-react-native";
import { useState } from "react";
import { Keyboard, View } from "react-native";

export function PhoneScreen() {
  const { phone, setPhone, scenario, setScenario } = useAuthPreview();
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);
  const message = scenarioMessages[scenario];
  function next() {
    if (scenario === "Loading") return;
    if (!/^\d{10}$/.test(phone)) {
      setError("Enter your 10-digit Indian mobile number.");
      return;
    }
    if (!__DEV__) {
      setError("Sign-in will be available in a future update.");
      return;
    }
    if (message) {
      setScenario("Default");
      return;
    }
    Keyboard.dismiss();
    router.push("/(auth)/otp");
  }
  return (
    <AuthShell
      footer={
        <>
          <Button
            label={message ? "Try again" : "Continue"}
            loading={scenario === "Loading"}
            onPress={next}
          />
          <Text className="text-center text-xs leading-5 text-slate-500">
            {APP.copy.signInFooter}
          </Text>
        </>
      }
    >
      <RideArtwork />
      <Heading
        eyebrow={APP.copy.welcome}
        title={APP.copy.signInTitle}
        description="Enter your mobile number to get started. We'll send you a verification code."
      />
      <View className="gap-3">
        <Text className="text-sm font-medium text-secondary">
          Mobile number
        </Text>
        <View
          className={`min-h-16 flex-row items-center rounded-2xl border bg-slate-50 px-4 ${error ? "border-red-500" : focused ? "border-primary" : "border-slate-200"}`}
        >
          <View className="mr-4 flex-row items-center gap-2 border-r border-slate-200 pr-4">
            <Text accessible={false} className="text-xl">
              🇮🇳
              {/* Indian flag */}
            </Text>
            <Text className="text-lg font-medium text-secondary">+91</Text>
          </View>
          <TextInput
            accessibilityLabel="Indian mobile number, country code plus 91"
            value={phone}
            onChangeText={(value) => {
              setPhone(value.replace(/\D/g, "").slice(0, 10));
              setError("");
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Mobile number"
            placeholderTextColor="#64748B"
            keyboardType="phone-pad"
            autoComplete="tel-national"
            textContentType="telephoneNumber"
            returnKeyType="done"
            onSubmitEditing={next}
            selectionColor="#0B5FFF"
            className="min-h-16 min-w-0 flex-1 py-4 text-lg text-secondary"
          />
        </View>
        {error ? (
          <Text
            accessibilityLiveRegion="polite"
            className="text-sm text-red-700"
          >
            {error}
          </Text>
        ) : (
          <Text className="text-xs text-slate-500">
            Indian mobile numbers only
          </Text>
        )}
        {scenario === "Outside India" && (
          <Notice message={APP.copy.outsideIndiaNotice} />
        )}
        {message && <Notice error message={message} />}
      </View>
      <View className="mt-8 flex-row flex-wrap gap-x-5 gap-y-2">
        <View className="flex-row items-center gap-2">
          <Plane
            size={16}
            color="#64748B"
            strokeWidth={1.75}
            accessible={false}
          />
          <Text className="text-xs font-medium text-slate-500">
            Airport transfers
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <CarFront
            size={16}
            color="#64748B"
            strokeWidth={1.75}
            accessible={false}
          />
          <Text className="text-xs font-medium text-slate-500">
            Local rentals
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Route
            size={16}
            color="#64748B"
            strokeWidth={1.75}
            accessible={false}
          />
          <Text className="text-xs font-medium text-slate-500">Outstation</Text>
        </View>
      </View>
    </AuthShell>
  );
}
