import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const DishListItem = ({ dish }) => {
 
  return (

      <TouchableOpacity>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{dish.name}</Text>
            <Text style={styles.description}>{dish.description}</Text>
            <Text style={styles.price}>{dish.price}</Text>
          </View>
          {dish.image && (
            <Image source={{ uri: dish.image }} style={styles.image} />
          )}
        </View>
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

export default DishListItem;
