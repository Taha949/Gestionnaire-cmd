import React, { createContext, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { useBasketContext } from "../../contexts/BasketContext";
import RestaurantsDetailsScreen from "../RestaurantDetailsScreen";
import { Dish } from "../../models";

const DishDetailsScreen = () => {
  const [dish, setDish] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;
  const { addDishToBasket } = useBasketContext();

  useEffect(() => {
    if (id) {
      DataStore.query(Dish, id).then((d) => {
        setDish(d);
        if (d?.ingredient) {
          setCheckedIngredients(d.ingredient);
        }
      });
    }
  }, [id]);

  const OnAddToBasket = async () => {
    const customizedDish = { ...dish, ingredient: checkedIngredients };
    await addDishToBasket(customizedDish, quantity);
    navigation.goBack();
  };
  const onMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  const handleToggleCheckbox = (ingredient) => {
    if (checkedIngredients.includes(ingredient)) {
      setCheckedIngredients(
        checkedIngredients.filter((item) => item !== ingredient)
      );
    } else {
      setCheckedIngredients([...checkedIngredients, ingredient]);
    }
  };

  const getTotal = () => {
    return (dish?.prix * quantity).toFixed(2);
  };

  if (!dish) {
    return null;
  }

  return (
    <View style={styles.page}>
      <View>
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.description}>{dish.description}</Text>
        <View style={styles.separator} />
        <View>
          {dish.ingredient.map((ingredient, index) => (
            <TouchableOpacity
              key={index}
              style={styles.ingredientContainer}
              onPress={() => handleToggleCheckbox(ingredient)}
            >
              <View style={styles.checkbox}>
                {checkedIngredients.includes(ingredient) ? (
                  <AntDesign name="checksquare" size={20} color="black" />
                ) : (
                  <AntDesign name="checksquareo" size={20} color="black" />
                )}
              </View>
              <Text style={styles.ingredients}>{ingredient}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={onMinus}>
            <AntDesign name="minuscircleo" size={60} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={onPlus}>
            <AntDesign name="pluscircleo" size={60} color="black" />
          </TouchableOpacity>
        </View>
        <Pressable onPress={OnAddToBasket} style={styles.button}>
          <Text style={styles.buttonText}>
            Ajouter {quantity} au panier ({getTotal()}€)
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 40,
    padding: 10,
  },
  name: {
    fontSize: 30,
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
    justifyContent: "center",
    marginTop: 50,
  },
  quantity: {
    fontSize: 25,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  ingredientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  ingredients: {
    fontSize: 16,
  },
});

export default DishDetailsScreen;
