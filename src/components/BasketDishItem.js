import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useBasketContext } from "../contexts/BasketContext";
import { AntDesign } from "@expo/vector-icons";

const BasketDishItem = ({ panierParDish }) => {
  const { updateQuantity } = useBasketContext();

  if (!panierParDish?.Dish) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>⚠️ Plat introuvable</Text>
      </View>
    );
  }

  const { Dish, quantity } = panierParDish;
  console.log(Dish);

  const increment = () => {
    updateQuantity(panierParDish, quantity + 1);
  };
  const decrement = () => {
    updateQuantity(panierParDish, quantity - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.quantityContainer}>
        <Pressable onPress={decrement} hitSlop={10}>
          <AntDesign name="minus" size={20} color="black" />
        </Pressable>
        <Text style={styles.quantity}>{quantity}</Text>
        <Pressable onPress={increment} hitSlop={10}>
          <AntDesign name="plus" size={20} color="black" />
        </Pressable>
      </View>
      <Text style={styles.name}>{Dish.name}</Text>
      <Text style={styles.price}>
        €{Dish.prix ? Dish.prix.toFixed(2) : "N/A"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontSize: 16,
    color: "#555",
    marginHorizontal: 8,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontStyle: "italic",
  },
});

export default BasketDishItem;
