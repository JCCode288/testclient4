import { useQuery } from "@apollo/client";
import { StyleSheet, Image, ToastAndroid, View } from "react-native";
import { useTheme } from "react-native-paper";
import Swiper from "react-native-swiper";
import { GET_PRODUCTS } from "../../apollo/query";

export default function Carousel() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.primary,
    },
    slide: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  });

  const toasting = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  const products = data.products;

  if (error) {
    toasting("error happened");
    return <Text>Error Happened</Text>;
  }

  if (loading) return <Text>Loading....</Text>;

  return (
    <Swiper style={styles.wrapper} autoplay={true} autoplayTimeout={4}>
      {products?.map((product) => {
        return (
          <Image
            key={product?.id}
            style={{
              ...styles.slide,
              width: "100%",
              height: "100%",
            }}
            source={{ uri: product?.mainImg }}
            resizeMode={"cover"}
          />
        );
      })}
    </Swiper>
  );
}
