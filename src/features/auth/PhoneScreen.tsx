import { Button, Heading, Notice, Text, TextInput } from "@/components";
import type { TextInputRef } from "@/components/Typography";
import { AuthShell, RideArtwork } from "@/features/auth/components";
import { scenarioMessages, useAuthPreview } from "@/features/auth/preview";
import { LegalAgreementStatement } from "@/features/legal";
import { RideTypesStrip } from "@/features/ride-options";
import { useShakeTextInput } from "@/hooks";
import { TEXT_INPUT_PROPERTIES } from "@/theme/properties";
import { APP } from "@/utils/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Keyboard, View } from "react-native";
import Animated from "react-native-reanimated";



export function PhoneScreen() {
  const { phone, setPhone, scenario, setScenario } = useAuthPreview();
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);
  const phoneInputRef = useRef<TextInputRef>(null);
  const { shake, shakeStyle } = useShakeTextInput();
  const message = scenarioMessages[scenario];
  function next() {
    if (scenario === "Loading") return;
    if (!/^\d{10}$/.test(phone)) {
      shake();
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
    <AuthShell>
      <View className="flex-1 justify-center">
        <RideArtwork />
        <RideTypesStrip />
        <Heading
          eyebrow={APP.copy.welcome}
          title={APP.copy.signInTitle}
          description="Enter your mobile number to get started. We'll send you a verification code."
          eyebrowProps={{
            "aria-label": "Welcome",
          }}
        />
        <View className="gap-3">
          <Text className="text-sm font-medium text-secondary" onPress={() => phoneInputRef.current?.focus()}>
            Mobile number
          </Text>
          <Animated.View style={shakeStyle}>
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
                ref={phoneInputRef}
                accessibilityLabel="Indian mobile number, country code plus 91"
                value={phone}
                onChangeText={(value) => {
                  setPhone(value.replace(/\D/g, "").slice(0, 10));
                  setError("");
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Mobile number"
                placeholderTextColor={TEXT_INPUT_PROPERTIES.placeholderTextColor}
                keyboardType="phone-pad"
                autoComplete="tel"
                returnKeyType="done"
                onSubmitEditing={next}
                selectionColor={TEXT_INPUT_PROPERTIES.selectionColor}
                className="min-h-16 min-w-0 flex-1 py-4 text-lg text-secondary"
                underlineColorAndroid="transparent"
                
              />
            </View>
          </Animated.View>
          {error && (
            <Text
              accessibilityLiveRegion="polite"
              className="text-sm text-red-700"
            >
              {error}
            </Text>
          )}
          {scenario === "Outside India" && (
            <Notice message={APP.copy.outsideIndiaNotice} />
          )}
          {message && <Notice error message={message} />}
        </View>
        <View className="mt-6 gap-4">
          <Button
            label={message ? "Try again" : "Continue"}
            loading={scenario === "Loading"}
            onPress={next}
          />
          <LegalAgreementStatement className="mb-4 text-[12px]" />
        </View>
      </View>
    </AuthShell>
  );
}
