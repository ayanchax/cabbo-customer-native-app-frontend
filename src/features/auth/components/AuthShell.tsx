import { AppLogo } from "@/components/AppLogo";
import { Text } from "@/components/Typography";
import { APP } from "@/utils/constants";
import { useEffect, useRef, type ComponentRef, type PropsWithChildren, type ReactNode } from "react";
import { Keyboard, KeyboardAvoidingView, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function AuthShell({
  children,
  back,
  footer,
  scrollToEndOnKeyboard = false,
}: PropsWithChildren<{ back?: () => void; footer?: ReactNode; scrollToEndOnKeyboard?: boolean }>) {
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const keyboardVisible = useRef(false);

  useEffect(() => {
    if (!scrollToEndOnKeyboard) return;
    const listener = Keyboard.addListener("keyboardDidShow", () => {
      keyboardVisible.current = true;
      scrollRef.current?.scrollToEnd({ animated: true });
    });
    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      keyboardVisible.current = false;
    });
    return () => {
      listener.remove();
      hideListener.remove();
    };
  }, [scrollToEndOnKeyboard]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
      >
        <View className="w-full max-w-lg flex-1 self-center">
          <View className="min-h-16 flex-row items-center justify-between px-6">
            {back ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go back"
                onPress={back}
                className="h-12 w-12 items-center justify-center rounded-full bg-slate-50 active:bg-slate-100"
              >
                <Text className="text-2xl text-secondary">←</Text>
              </Pressable>
            ) : (
              <AppLogo />
            )}
            <View className="max-w-[65%] shrink rounded-full bg-blue-50 px-3 py-2">
              <Text className="text-xs font-semibold tracking-wider text-primary uppercase">
                {APP.tagline}
              </Text>
            </View>
          </View>
          <ScrollView
            ref={scrollRef}
            onLayout={() => {
              if (scrollToEndOnKeyboard && keyboardVisible.current) {
                scrollRef.current?.scrollToEnd({ animated: true });
              }
            }}
            className="flex-1"
            contentContainerClassName="grow px-6 pb-6 pt-4"
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
          {footer && <View className="gap-4 px-6 pb-4 pt-3">{footer}</View>}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

 
