import { View, Text, Image, FlatList } from "react-native";
import BasketDishItem from "../../screens/Basket";
import orders from "../../../assets/data/orders.json";
import restaurants from "../../../assets/data/restaurants.json";
import styles from "./styles";
const order = orders[0];
const OrderDetailsHeader = () => {
  return (
    <View>
      <View style={styles.page}>
        <Image source={{ uri: order.Restaurant.image }} style={styles.image} />
        <View styles={styles.container}>
          <Text style={styles.title}>{order.Restaurant.name}</Text>
          <Text style={styles.subtitle}>29/05/2023 à 13:58</Text>
          <Text style={styles.menuTitle}>Produits :</Text>
        </View>
      </View>
    </View>
  );
};
const OrderDetails = () => {
  return (
    <FlatList
      ListHeaderComponent={OrderDetailsHeader}
      data={restaurants[0].dishes}
      renderItem={({ item }) => <BasketDishItem basketDish={item} />}
    />
  );
};
export default OrderDetails;
