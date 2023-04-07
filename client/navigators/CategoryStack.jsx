import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoryBase, CategoryDetail } from "../screens/views";

export default function CategoryStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="categories" component={CategoryBase} />
      <Stack.Screen name="categories-detail" component={CategoryDetail} />
    </Stack.Navigator>
  );
}
