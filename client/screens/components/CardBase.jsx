import {
  Button,
  Card,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

export default function CardBase({ product, navigate }) {
  const theme = useTheme();

  return (
    <Card
      style={{
        marginVertical: 10,
        marginHorizontal: 10,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.onPrimary,
      }}
    >
      <Card.Title title={product?.Category.name} />
      <Card.Content style={{ marginBottom: 10 }}>
        <Text variant="titleLarge">{product?.name}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: product?.mainImg }} resizeMode={"contain"} />
      <Card.Actions>
        <TouchableRipple rippleColor={theme.colors.onPrimaryContainer}>
          <Button
            style={{ backgroundColor: theme.colors.primary, shadowOffset: 4 }}
            onPress={() => navigate("detail", { id: product.id })}
          >
            <Text style={{ color: theme.colors.onPrimary, fontWeight: "700" }}>
              Detail
            </Text>
          </Button>
        </TouchableRipple>
      </Card.Actions>
    </Card>
  );
}
