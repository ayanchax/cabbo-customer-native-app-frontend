import { Button } from "@/components/Button";
import { Notice } from "@/components/Notice";
import { AuthShell, Heading } from "@/features/auth/components/AuthShell";
import { scenarioMessages, useAuthPreview } from "@/features/auth/preview";
import { router } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export function CompleteScreen() {
  const { name, returning, reset } = useAuthPreview();
  return (
    <AuthShell
      footer={
        <Button
          label="Back to sign in"
          onPress={() => {
            reset();
            router.replace("/(auth)/login");
          }}
          secondary
        />
      }
    >
      <View className="flex-1 justify-center py-12">
        <View className="mb-8 h-20 w-20 items-center justify-center rounded-full bg-blue-50">
          <Text accessible={false} className="text-4xl text-primary">
            ✓
          </Text>
        </View>
        <Heading
          eyebrow="SCREEN PREVIEW COMPLETE"
          title={
            returning
              ? "Welcome back."
              : `Nice to meet you${name.trim() ? `, ${name.trim().split(/\s/)[0]}` : ""}.`
          }
          description="This is the end of the authentication screen preview. Home is up next."
        />
        <Notice message="No account was created and no session is active. Sign-in and profile saving will be connected during API integration." />
      </View>
    </AuthShell>
  );
}
export function BootstrapScreen() {
  const { scenario, setScenario } = useAuthPreview();
  const error = scenarioMessages[scenario];
  return (
    <AuthShell
      footer={
        error ? (
          <Button label="Try again" onPress={() => setScenario("Default")} />
        ) : (
          <Button
            label="Preview sign in"
            onPress={() => router.replace("/(auth)/login")}
            secondary
          />
        )
      }
    >
      <View className="flex-1 items-center justify-center gap-6 py-20">
        <Text className="text-5xl font-bold tracking-tighter text-primary">
          cabbo<Text className="text-accent">.</Text>
        </Text>
        <Text className="text-base text-slate-500">
          A good ride starts here.
        </Text>
        {error ? (
          <Notice error message={error} />
        ) : (
          <ActivityIndicator
            accessibilityLabel="Getting things ready"
            color="#0B5FFF"
            size="large"
          />
        )}
      </View>
    </AuthShell>
  );
}
export function SessionExpiredScreen() {
  const { reset } = useAuthPreview();
  return (
    <AuthShell
      footer={
        <Button
          label="Sign in again"
          onPress={() => {
            reset();
            router.replace("/(auth)/login");
          }}
        />
      }
    >
      <View className="flex-1 justify-center py-12">
        <View className="mb-8 h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
          <Text accessible={false} className="text-3xl text-primary">
            ↻
          </Text>
        </View>
        <Heading
          eyebrow="LET'S RECONNECT"
          title={"Sign in to\nkeep going."}
          description="Your session has expired. Verify your mobile number again to continue with Cabbo."
        />
      </View>
    </AuthShell>
  );
}
