import { Text } from "@/components/Typography";
import { View } from "react-native";
import { APP } from "@/utils/constants";

// Decorative route illustration; represents no actual route or live position.
export function RideArtwork() {
  return <View accessible={false} importantForAccessibility="no-hide-descendants" className="mb-6 h-40 overflow-hidden rounded-3xl bg-blue-50">
    <View className="absolute -left-4 top-10 h-4 w-96 -rotate-12 bg-white" />
    <View className="absolute left-14 -top-8 h-64 w-4 rotate-12 bg-white" />
    <View className="absolute right-14 -top-8 h-64 w-6 -rotate-12 bg-white" />
    <View className="absolute left-9 top-14 h-14 w-44 rounded-bl-3xl border-b-[3px] border-l-[3px] border-primary" />
    <View className="absolute left-7 top-11 h-5 w-5 items-center justify-center rounded-full bg-primary"><View className="h-2 w-2 rounded-full bg-white" /></View>
    <View className="absolute right-7 top-6 rounded-xl bg-white px-3 py-2"><Text className="text-xs font-semibold text-secondary">{APP.copy.rideArtworkCaption}</Text></View>
    <View className="absolute bottom-5 right-8 h-14 w-28">
      <View className="absolute left-5 top-0 h-8 w-16 rounded-t-2xl bg-primary" />
      <View className="absolute left-7 top-1 h-5 w-5 rounded-tl-xl bg-blue-100" />
      <View className="absolute right-8 top-1 h-5 w-4 rounded-tr-lg bg-blue-100" />
      <View className="absolute bottom-2 h-8 w-28 rounded-xl bg-primary" />
      <View className="absolute bottom-0 left-4 h-5 w-5 rounded-full border-4 border-slate-800 bg-slate-200" />
      <View className="absolute bottom-0 right-4 h-5 w-5 rounded-full border-4 border-slate-800 bg-slate-200" />
      <View className="absolute right-0 top-7 h-2 w-2 rounded-r bg-amber-300" />
    </View>
  </View>;
}
