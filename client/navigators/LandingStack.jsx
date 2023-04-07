import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LandingPage } from "../screens/views";
import Tab from "./Tab";

export default function LandingStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="landing" component={LandingPage} />
      <Stack.Screen name="main" component={Tab} />
    </Stack.Navigator>
  );
}
