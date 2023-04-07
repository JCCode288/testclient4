import { useQuery } from "@apollo/client";
import { Image, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { GET_PRODUCT } from "../../apollo/query";
import { ActivityIndicator } from "react-native-paper";
import Swiper from "react-native-swiper";
import { currencyIdr } from "../../helpers/currencyIdr";

export default function DetailScreen({ route }) {
  const { id } = route.params;

  const theme = useTheme();

  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.primary,
      marginTop: 10,
    },
    slide: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  });

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productId: id,
    },
  });

  const product = data?.product || { name: "product" };
  const colors = useTheme().colors;

  if (loading) {
    return <ActivityIndicator animating={true} color={colors.primary} />;
  }

  if (error) {
    return <Text>Error happened</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: colors.onPrimary,
      }}
    >
      <Swiper style={styles.wrapper} autoplay={true} autoplayTimeout={4}>
        <Image
          style={{
            ...styles.slide1,
            width: "100%",
            height: "100%",
          }}
          source={{ uri: product?.mainImg }}
          resizeMode={"cover"}
        />
        {product.Images.length > 1
          ? product?.Images?.map((img, index) => {
              return (
                <Image
                  key={index}
                  style={{
                    ...styles.slide1,
                    width: "100%",
                    height: "100%",
                  }}
                  source={{ uri: img?.imgUrl }}
                  resizeMode={"contain"}
                />
              );
            })
          : null}
      </Swiper>
      <View style={{ flex: 1, marginVertical: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>{product?.name}</Text>
        <View style={{ height: 15 }}></View>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Description</Text>
        <Text style={{ fontWeight: "500", fontSize: 15 }}>
          {product?.description}
        </Text>
        <View style={{ height: 25 }}></View>
        <Text style={{ fontSize: 15 }}>
          Category: {product?.Category?.name}
        </Text>
        <Text style={{ fontSize: 15 }}>
          Price:{" "}
          {product?.price ? currencyIdr(product?.price) : "Price Unavailable"}
        </Text>
        <Text style={{ fontSize: 15 }}>
          Author: {product?.Author?.username}
        </Text>
      </View>
    </View>
  );
}
