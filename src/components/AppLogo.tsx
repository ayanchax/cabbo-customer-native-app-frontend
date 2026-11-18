import { Text } from "@/components/Typography";
import { APP } from "@/utils/constants";
import { Image, type ImageSourcePropType } from "react-native";

type AppLogoProps = {
  appName?: string;
  /** Additional classes for the root text when imageSource is null. */
  className?: string;
  /** Defaults to the Cabbo logo. Pass null for text, or another image source. */
  imageSource?: ImageSourcePropType | null;
  imageClassName?: string;
  accessibilityLabel?: string;
};

export function AppLogo({
  appName = APP.name,
  className = "",
  imageSource = require("@/assets/images/cabbo-logo-horizontal-in-app.png"),
  imageClassName = "",
  accessibilityLabel = appName,
}: AppLogoProps = {}) {
  if (imageSource) {
    // App logo is an image, so we render it as an Image component. We use the accessibilityLabel prop for screen readers.
    // Since its a logo, the resizeMode is always set to contain, and the height and width are set to 14 and 28 respectively. The imageClassName prop can be used to add additional classes to the image.
    return (
      <Image
        source={imageSource}
        alt={accessibilityLabel}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="image"
        resizeMode="contain"
        className={`h-14 w-28 ${imageClassName}`}
      />
    );
  }

  return (
    <Text
      accessibilityLabel={accessibilityLabel}
      className={`text-3xl font-bold tracking-tighter text-primary ${className}`}
    >
      {appName.toLowerCase()}
      <Text className="text-accent">.</Text>
    </Text>
  );
}
