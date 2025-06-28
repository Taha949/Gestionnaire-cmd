import { View, Text, Image, FlatList, Pressable } from "react-native";
import DishListItem from "../../components/DishListItem";
import restaurants from "../../../assets/data/restaurants.json";
import styles from "./styles";
import { useState, useEffect } from "react";
import { Dish } from "../../models";
import { DataStore } from "@aws-amplify/datastore";
import "@azure/core-asynciterator-polyfill";
import { useNavigation } from "@react-navigation/native";
import { useBasketContext } from "../../contexts/BasketContext";

export default function RestaurantsDetailsScreen() {
  const restaurant = restaurants[0];

  const navigation = useNavigation();
  const { panier, panierParDishes } = useBasketContext();
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    DataStore.query(Dish)
      .then((data) => {
        setDishes(data.filter((d)=> d.visible !== false));
        // console.log(data); // Affiche les données récupérées dans la console
      })
      .catch((error) => {
        console.log("Erreur lors de la récupération des plats :", error);
      });
  }, []);

  useEffect(() => {
    DataStore.query(Dish)
      .then((data) => {
        // console.log("Données des plats :", data); // Afficher les données des plats
        setDishes(data.filter((d)=> d.visible !== false));
      })
      .catch((error) => {
        console.log("Erreur lors de la récupération des plats :", error); // Afficher les éventuelles erreurs
      });
  });

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Image source={{ uri: restaurant.image }} style={styles.image} />
        <Text style={styles.title}>{restaurant.name}</Text>
      </View>

      <FlatList
        data={dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
      />

      <Pressable
        onPress={() => navigation.navigate("Basket")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Voir la commande ({panierParDishes.length})
        </Text>
      </Pressable>
    </View>
  );
}
