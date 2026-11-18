import { Text } from "@/components";
import { ICON_PROPERTIES } from "@/theme/properties";
import { CarFront, Plane, Route } from "lucide-react-native";
import { View } from "react-native";


export function RideTypesStrip() {

   return(
    <View className="mb-8 flex-row flex-wrap gap-x-5 gap-y-2">
        <View className="flex-row items-center gap-2">
            <Plane size={18} color={ICON_PROPERTIES.secondaryColor} strokeWidth={1.75} accessible={false} />
            <Text className="text-sm font-medium text-slate-600">Airport transfers</Text>
        </View>
        <View className="flex-row items-center gap-2">
            <CarFront size={18} color={ICON_PROPERTIES.secondaryColor} strokeWidth={1.75} accessible={false} />
            <Text className="text-sm font-medium text-slate-600">Local rentals</Text>
        </View>
        <View className="flex-row items-center gap-2">
            <Route size={18} color={ICON_PROPERTIES.secondaryColor} strokeWidth={1.75} accessible={false} />
            <Text className="text-sm font-medium text-slate-600">Outstation</Text>
        </View>
    </View>
   ) 
}