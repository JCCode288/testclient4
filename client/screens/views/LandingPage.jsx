import { View } from "react-native";
import { Button, Text, TouchableRipple, useTheme } from "react-native-paper";
import { Logo } from "../components";

export default function LandingPage({ navigation }) {
  const colors = useTheme().colors;

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <Logo />
      <TouchableRipple rippleColor={colors.onPrimary}>
        <Button
          onPress={() => navigation.navigate("main")}
          style={{
            borderRadius: 10,
            borderWidth: 2,
            padding: 5,
            borderColor: colors.primary,
          }}
        >
          <Text
            style={{ color: colors.primary, fontSize: 20, fontWeight: "700" }}
          >
            To Dashboard
          </Text>
        </Button>
      </TouchableRipple>
    </View>
  );
}
