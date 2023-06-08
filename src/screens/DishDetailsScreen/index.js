import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import restaurants from "../../../assets/data/restaurants.json";
import { useNavigation } from "@react-navigation/native";

const dish = restaurants[0].dishes[1];

const DishDetailsScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const navigation = useNavigation();

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
      setCheckedIngredients(checkedIngredients.filter((i) => i !== ingredient));
    } else {
      setCheckedIngredients([...checkedIngredients, ingredient]);
    }
  };

  const getTotal = () => {
    return (dish.price * quantity).toFixed(2);
  };

  return (
    <View>
      <View style={styles.page}>
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.description}>{dish.description}</Text>
        <View style={styles.separator} />
        <View>
          <TouchableOpacity
            style={styles.ingredientContainer}
            onPress={() => handleToggleCheckbox("Salade")}
          >
            <View style={styles.checkbox}>
              {checkedIngredients.includes("Salade") ? (
                <AntDesign name="checksquareo" size={20} color="black" />
              ) : (
                <AntDesign name="checksquare" size={20} color="black" />
              )}
            </View>
            <Text style={styles.ingredients}>Salade</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ingredientContainer}
            onPress={() => handleToggleCheckbox("Tomate")}
          >
            <View style={styles.checkbox}>
              {checkedIngredients.includes("Tomate") ? (
                <AntDesign name="checksquareo" size={20} color="black" />
              ) : (
                <AntDesign name="checksquare" size={20} color="black" />
              )}
            </View>
            <Text style={styles.ingredients}>Tomate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ingredientContainer}
            onPress={() => handleToggleCheckbox("Oignons")}
          >
            <View style={styles.checkbox}>
              {checkedIngredients.includes("Oignons") ? (
                <AntDesign name="checksquareo" size={20} color="black" />
              ) : (
                <AntDesign name="checksquare" size={20} color="black" />
              )}
            </View>
            <Text style={styles.ingredients}>Oignons</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ingredientContainer}
            onPress={() => handleToggleCheckbox("Cornichons")}
          >
            <View style={styles.checkbox}>
              {checkedIngredients.includes("Cornichons") ? (
                <AntDesign name="checksquareo" size={20} color="black" />
              ) : (
                <AntDesign name="checksquare" size={20} color="black" />
              )}
            </View>
            <Text style={styles.ingredients}>Cornichons</Text>
          </TouchableOpacity>
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
        <Pressable
          onPress={() => navigation.navigate("Basket")}
          style={styles.button}
        >
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
    paddingVertical: 40, // temp fix
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
  ingredients: {
    padding: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  ingredientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
});

export default DishDetailsScreen;
