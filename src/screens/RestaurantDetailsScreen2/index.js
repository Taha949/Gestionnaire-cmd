import { View, Text, Image, FlatList, Pressable } from "react-native";
import DishListItem2 from "../../components/DishListItem2";
import restaurants from "../../../assets/data/restaurants.json";
import styles from "./styles";
import { useState, useEffect } from "react";
import { Dish } from "../../models";
import { DataStore } from "@aws-amplify/datastore";
import "@azure/core-asynciterator-polyfill";
import { useNavigation } from "@react-navigation/native";
import { useBasketContext } from "../../contexts/BasketContext";

export default function RestaurantsDetailsScreen() {
  const navigation = useNavigation();
  const { panier, panierParDishes } = useBasketContext();
  const handleAjouterProduit = () => {
    navigation.navigate("Produit");
  };

  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    DataStore.query(Dish).then(setDishes);
  });

  return (
    <View style={styles.page}>
      <FlatList
        data={dishes}
        renderItem={({ item }) => <DishListItem2 dish={item} />}
      />

      <Pressable style={styles.button} onPress={handleAjouterProduit}>
        <Text style={styles.buttonText}>Ajouter un produit</Text>
      </Pressable>
    </View>
  );
}
