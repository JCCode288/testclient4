import { useQuery } from "@apollo/client";
import { ScrollView, Text, ToastAndroid, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { GET_CATEGORIES } from "../../apollo/query";
import { CardCategory } from "../components";

export default function CategoryBase({ navigation }) {
  const colors = useTheme().colors;

  const { loading, data, error } = useQuery(GET_CATEGORIES);

  const categories = data?.categories;

  if (error) {
    return <ToastAndroid>Error Happened</ToastAndroid>;
  }
  if (loading) {
    return <ActivityIndicator animating={true} color={colors.primary} />;
  }

  return (
    <ScrollView
      style={{
        backgroundColor: colors.onTertiary,
      }}
    >
      {categories?.map((category) => {
        return (
          <CardCategory
            key={category?.id}
            category={category}
            navigate={navigation.navigate}
          />
        );
      })}
    </ScrollView>
  );
}
