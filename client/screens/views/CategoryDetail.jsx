import { useQuery } from "@apollo/client";
import { ScrollView, Text, ToastAndroid, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { GET_CATEGORY } from "../../apollo/query";
import { CardBaseCategory } from "../components";

export default function CategoryDetail({ navigation, route }) {
  const id = route.params.id;
  const colors = useTheme().colors;
  const fonts = useTheme().fonts;

  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: {
      categoryId: id,
    },
  });

  if (loading) {
    return <ActivityIndicator animating={true} color={colors.primary} />;
  }

  if (error) {
    return <ToastAndroid>Error Happened</ToastAndroid>;
  }

  const category = data.category;

  return (
    <View
      style={{
        backgroundColor: colors.onPrimary,
        flex: 1,
      }}
    >
      <ScrollView>
        <View
          style={{
            paddingBottom: 20,
            marginBottom: 10,
            borderBottomWidth: 2,
            borderColor: colors.primary,
            backgroundColor: colors.tertiaryContainer,
          }}
        >
          <Text
            style={{
              ...fonts.titleLarge,
              fontWeight: "700",
              marginTop: 15,
              marginHorizontal: 10,
              color: colors.onTertiaryContainer,
            }}
          >
            {category?.name}
          </Text>
        </View>

        {category?.Products.length ? (
          category?.Products?.map((product) => {
            return (
              <CardBaseCategory
                product={product}
                key={product.id}
                navigate={navigation.navigate}
              />
            );
          })
        ) : (
          <View>
            <Text>No Products </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
