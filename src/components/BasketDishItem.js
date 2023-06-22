import { View, Text, StyleSheet, FlatList } from "react-native";

import { useBasketContext } from "../contexts/BasketContext";
import { Dish, PanierParDish } from "../models";

const BasketDishItem = ({ panierParDish }) => {
  // console.log(panierParDish.Dish.name);

  return (
    <View style={styles.row}>
      <View style={styles.quantityContainer}>
        <Text>{panierParDish.quantity}</Text>
      </View>
      <Text style={{ fontWeight: "600" }}>{panierParDish.Dish.name}</Text>
      <Text style={{ marginLeft: "auto" }}>€ {panierParDish.Dish.prix}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },

  quantityContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});
export default BasketDishItem;