import { Button, Card } from "react-native-paper";

export default CardCategory = ({ category, navigate }) => {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Title titleVariant="titleLarge" title={category?.name} />
      <Card.Actions>
        <Button
          onPress={() => navigate("categories-detail", { id: category.id })}
        >
          Detail
        </Button>
      </Card.Actions>
    </Card>
  );
};
