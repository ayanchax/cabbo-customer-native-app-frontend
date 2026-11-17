import { Text, TextInput } from "@/components/Typography";
import { Button, Heading, Notice, TextField } from "@/components";
import { AuthShell } from "@/features/auth/components";
import { scenarioMessages, useAuthPreview } from "@/features/auth/preview";
import { router } from "expo-router";
import { APP } from "@/utils/constants";
import { useRef, useState, type ComponentRef } from "react";
import { Keyboard, View } from "react-native";

export function OnboardingScreen() {
  const { name, setName, email, setEmail, scenario, setScenario } =
    useAuthPreview();
  const [submitted, setSubmitted] = useState(false);
  const emailRef = useRef<ComponentRef<typeof TextInput>>(null);
  const invalidEmail =
    email.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  function complete() {
    if (scenario === "Loading") return;
    setSubmitted(true);
    if (!name.trim() || invalidEmail || !__DEV__) return;
    if (scenarioMessages[scenario]) {
      setScenario("Default");
      return;
    }
    Keyboard.dismiss();
    router.push("/(auth)/complete");
  }
  return (
    <AuthShell
      back={() => {
        if (router.canGoBack()) router.back();
        else router.replace("/(auth)/login");
      }}
      footer={
        <>
          <Button
            label={scenarioMessages[scenario] ? "Try again" : "Let's go"}
            loading={scenario === "Loading"}
            onPress={complete}
          />
          <Text className="text-center text-xs leading-5 text-slate-500">
            {APP.copy.onboardingFooter}
          </Text>
        </>
      }
    >
      <View className="mb-8 mt-4 h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
        <Text accessible={false} className="text-3xl text-primary">
          ✦
        </Text>
      </View>
      <Heading
        eyebrow="NICE TO MEET YOU"
        title={"What should we\ncall you?"}
        description={APP.copy.onboardingDescription}
      />
      <View className="gap-6">
        <TextField
          label="Your name"
          placeholder="Full name"
          value={name}
          onChangeText={setName}
          error={
            submitted && !name.trim() ? "Please enter your name." : undefined
          }
          autoComplete="name"
          textContentType="name"
          autoCapitalize="words"
          maxLength={100}
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        <TextField
          inputRef={emailRef}
          label="Email address"
          optional
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          error={
            submitted && invalidEmail
              ? "Enter a valid email, or leave this blank."
              : undefined
          }
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={complete}
        />
        {scenarioMessages[scenario] && (
          <Notice error message={scenarioMessages[scenario]!} />
        )}
      </View>
    </AuthShell>
  );
}
