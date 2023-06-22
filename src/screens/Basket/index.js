import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import restaurants from "../../../assets/data/restaurants.json";
import { useBasketContext } from "../../contexts/BasketContext";
import BasketDishItem from "../../components/BasketDishItem";
import { Dish } from "../../models";
import { useOrderContext } from "../../contexts/OrderContext";
import { useNavigation } from "@react-navigation/native";

const restaurant = restaurants[0];

const Basket = () => {
  const { panierParDishes, prixTotal, addDishToBasket } = useBasketContext();
  const { createOrder } = useOrderContext();
  const navigation = useNavigation();

  return (
    <View style={styles.page}>
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 19 }}>
        Les produits
      </Text>

      <FlatList
        data={panierParDishes}
        renderItem={({ item }) => <BasketDishItem panierParDish={item} />}
      />
      <View style={styles.separator} />
      <Pressable onPress={createOrder} style={styles.button}>
        <Text style={styles.buttonText}>Envoyer la commande €{prixTotal}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 40, // temp fix
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
  },
  description: {
    color: "gray",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 25,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "lightgrey",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 18,
  },
  quantityContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});

export default Basket;
