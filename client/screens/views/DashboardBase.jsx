import { ToastAndroid, ScrollView, FlatList, View, Text } from "react-native";
import { useQuery } from "@apollo/client";
import Carousel from "../components/Carousel";
import { CardBase } from "../components";
import { GET_PRODUCTS } from "../../apollo/query";
import { ActivityIndicator, useTheme } from "react-native-paper";

export default function DashboardBase({ navigation }) {
  const toasting = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  const colors = useTheme().colors;

  if (loading) {
    return <ActivityIndicator animating={true} color={colors.primary} />;
  }
  if (error) {
    toasting("Error");
    return <Text>Error! ${error.message}</Text>;
  }

  const products = data.products;

  return (
    <View style={{ backgroundColor: colors.primaryContainer }}>
      <ScrollView>
        <View style={{ height: 470 }}>
          <Carousel />
        </View>
        {products?.map((product) => {
          return (
            <CardBase
              product={product}
              key={product?.id}
              navigate={navigation.navigate}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
