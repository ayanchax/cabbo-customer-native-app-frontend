import { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";

export function useShakeTextInput() {
  const shakeOffset = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeOffset.value }],
  }));

  function shake() {
    shakeOffset.set(withSequence(
      withTiming(-4, { duration: 75 }),
      withTiming(4, { duration: 75 }),
      withTiming(-4, { duration: 75 }),
      withTiming(0, { duration: 75 }),
    ));
  }

  return { shake, shakeStyle };
}
