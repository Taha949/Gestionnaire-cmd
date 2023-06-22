import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { Dish } from "../models";

const DishListItem2 = ({ dish }) => {
  const navigation = useNavigation();

  const handleDeleteDish = () => {
    Alert.alert(
      "Supprimer le plat",
      "Êtes-vous sûr de vouloir supprimer ce plat ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await DataStore.delete(Dish, dish.id);
            } catch (error) {
              console.log("Erreur lors de la suppression du plat :", error);
              // Gérez les erreurs de suppression du plat ici
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={handleDeleteDish} style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.description}>{dish.description}</Text>
        <Text style={styles.price}>{dish.price}</Text>
      </View>
      {dish.image && (
        <Image source={{ uri: dish.image }} style={styles.image} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  description: {
    color: "gray",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
  },
  image: {
    height: 75,
    aspectRatio: 1,
  },
});

export default DishListItem2;
