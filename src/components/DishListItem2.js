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
import { useAuthContext } from "../contexts/AuthContext";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const DishListItem2 = ({ dish }) => {
  const navigation = useNavigation();
  const { dbServeur } = useAuthContext();
  const isServeur = (dbServeur?.role || '').toUpperCase() === 'SERVEUR';

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
            await DataStore.start();
            try {
              await DataStore.delete(Dish, dish.id);
            } catch (error) {
              console.log("Erreur lors de la suppression du plat :", error);
            }
          },
        },
      ]
    );
  };

  const toggleVisibility = async () => {
    await DataStore.start();
    try {
      await DataStore.save(
        Dish.copyOf(dish, (updated) => {
          updated.visible = dish.visible === false ? true : false;
        })
      );
    } catch (e) {
      console.log("Erreur toggle visibility", e);
    }
  };

  const isUnavailable = dish.visible === false;

  return (
    <View style={[styles.container, isUnavailable && styles.unavailableContainer]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.name, isUnavailable && styles.unavailableText]}>
          {dish.name} {isUnavailable ? "(épuisé)" : ""}
        </Text>
        <Text style={[styles.description, isUnavailable && styles.unavailableText]}>{dish.description}</Text>
        <Text style={[styles.price, isUnavailable && styles.unavailableText]}>{dish.price}</Text>
      </View>

      {dish.image && (
        <Image source={{ uri: dish.image }} style={styles.image} />
      )}

      {!isServeur && (
        <>
          <Pressable onPress={() => navigation.navigate('ChangeDish',{id:dish.id})} style={styles.editButton} hitSlop={10}>
            <MaterialIcons name="edit" size={24} color="black" />
          </Pressable>

          <Pressable onPress={toggleVisibility} style={styles.eyeButton} hitSlop={10}>
            <MaterialCommunityIcons name={dish.visible === false ? 'eye' : 'eye-off'} size={24} color="black" />
          </Pressable>

          <Pressable onPress={handleDeleteDish} style={styles.trashButton} hitSlop={10}>
            <MaterialIcons name="delete" size={24} color="black" />
          </Pressable>
        </>
      )}
    </View>
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
  unavailableContainer: {
    backgroundColor: "#f0f0f0",
  },
  unavailableText: {
    color: "#808080",
  },
  editButton: {
    padding: 5,
    marginTop: 17,
  },
  eyeButton: {
    padding: 5,
    marginTop: 17,
  },
  trashButton: {
    padding: 5,
    marginTop: 17,
  },
});

export default DishListItem2;
