import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashboardBase, DetailScreen } from "../screens/views";

export default function MainStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="dashboard" component={DashboardBase} />
      <Stack.Screen name="detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}
