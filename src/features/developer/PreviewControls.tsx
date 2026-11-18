import { Text } from "@/components/Typography";
import { previewStates, useAuthPreview } from "@/features/auth/preview";
import { router } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export function PreviewControls() {
    const [open, setOpen] = useState(false);
    const { scenario, setScenario, returning, setReturning } = useAuthPreview();
    const openScreen = (screen: "login" | "bootstrap" | "session-expired") => {
        setOpen(false);
        router.push(`/(auth)/${screen}`);
    };
    return (
        <>
            <Pressable
                accessibilityRole="button"
                onPress={() => setOpen(true)}
                className="min-h-11 items-center justify-center border-t border-slate-100 px-6 py-3"
            >
                <Text className="text-xs text-slate-500">
                    Screen preview · No SMS sent · {scenario} ⌃
                </Text>
            </Pressable>
            <Modal
                visible={open}
                transparent
                animationType="none"
                onRequestClose={() => setOpen(false)}
            >
                <View className="flex-1 justify-end bg-black/40">
                    <Pressable
                        className="flex-1"
                        accessibilityRole="button"
                        accessibilityLabel="Close preview controls"
                        onPress={() => setOpen(false)}
                    />
                    <SafeAreaView
                        edges={["bottom"]}
                        className="max-h-[80%] rounded-t-3xl bg-white"
                    >
                        <ScrollView
                            contentContainerClassName="gap-4 p-6"
                            keyboardShouldPersistTaps="handled"
                        >
                            <Text className="text-xl font-semibold text-secondary">
                                Screen preview
                            </Text>
                            <Text className="text-sm leading-5 text-slate-500">
                                Local fixtures only. No account is created and no code is sent.
                                OTP length and cooldown are provisional.
                            </Text>
                            <Text className="text-sm font-semibold text-secondary">
                                Journey
                            </Text>
                            <View className="flex-row gap-3">
                                {[false, true].map((value) => (
                                    <Pressable
                                        key={String(value)}
                                        accessibilityRole="radio"
                                        accessibilityState={{ checked: returning === value }}
                                        onPress={() => setReturning(value)}
                                        className={`min-h-12 flex-1 items-center justify-center rounded-xl px-3 ${returning === value ? "bg-primary" : "bg-slate-100"}`}
                                    >
                                        <Text
                                            className={
                                                returning === value ? "text-white" : "text-secondary"
                                            }
                                        >
                                            {value ? "Returning customer" : "New customer"}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                            <Text className="text-sm font-semibold text-secondary">
                                Preview state
                            </Text>
                            <View className="flex-row flex-wrap gap-2">
                                {previewStates.map((state) => (
                                    <Pressable
                                        key={state}
                                        accessibilityRole="radio"
                                        accessibilityState={{ checked: scenario === state }}
                                        onPress={() => {
                                            setScenario(state);
                                            setOpen(false);
                                        }}
                                        className={`min-h-11 justify-center rounded-xl px-4 py-3 ${scenario === state ? "bg-primary" : "bg-slate-100"}`}
                                    >
                                        <Text
                                            className={
                                                scenario === state ? "text-white" : "text-secondary"
                                            }
                                        >
                                            {state}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                            <Text className="text-sm font-semibold text-secondary">
                                Other screens
                            </Text>
                            <View className="flex-row flex-wrap gap-2">
                                {(["login", "bootstrap", "session-expired"] as const).map(
                                    (screen) => (
                                        <Pressable
                                            key={screen}
                                            accessibilityRole="button"
                                            onPress={() => openScreen(screen)}
                                            className="min-h-11 justify-center rounded-xl bg-slate-100 px-4 py-3"
                                        >
                                            <Text className="text-secondary">{screen}</Text>
                                        </Pressable>
                                    ),
                                )}
                            </View>
                            <Pressable
                                accessibilityRole="button"
                                onPress={() => setOpen(false)}
                                className="min-h-12 items-center justify-center"
                            >
                                <Text className="font-semibold text-primary">
                                    Close preview
                                </Text>
                            </Pressable>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </Modal>
        </>
    );
}