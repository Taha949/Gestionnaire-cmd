import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { DataStore } from "aws-amplify";
import { Dish } from "../../models";
import { useNavigation, useRoute } from "@react-navigation/native";

const ChangeDish = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};

  const [dishOriginal, setDishOriginal] = useState(null);
  const [name, setName] = useState("");
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState([]);

  useEffect(() => {
    if (!id) {
      Alert.alert("Erreur", "Aucun plat sélectionné");
      navigation.goBack();
      return;
    }

    // Charger le plat depuis DataStore
    DataStore.query(Dish, id)
      .then((dish) => {
        if (!dish) {
          Alert.alert("Erreur", "Plat introuvable");
          navigation.goBack();
          return;
        }
        setDishOriginal(dish);
        // Pré-remplir les champs
        setName(dish.name || "");
        setPrix(dish.prix?.toString() || "");
        setImage(dish.image || "");
        setDescription(dish.description || "");
        setIngredient(dish.ingredient || []);
      })
      .catch((e) => console.log("Erreur chargement plat", e));
  }, [id]);

  const modifierProduit = async () => {
    if (!dishOriginal) return;

    if (!name || !prix || ingredient.length === 0 || !image || !description) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }
    const parsedPrix = parseFloat(prix);
    if (isNaN(parsedPrix)) {
      Alert.alert("Erreur", "Le champ Prix doit être un nombre valide");
      return;
    }

    try {
      const updated = await DataStore.save(
        Dish.copyOf(dishOriginal, (updated) => {
          updated.name = name;
          updated.prix = parsedPrix;
          updated.image = image;
          updated.description = description;
          updated.ingredient = ingredient;
        })
      );
      Alert.alert("Succès", "Le plat a été modifié", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.log("Erreur lors de la modification du plat :", error);
      Alert.alert("Erreur", "Une erreur est survenue");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier le plat</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nom"
        style={styles.input}
      />
      <TextInput
        value={image}
        onChangeText={setImage}
        placeholder="Image"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        style={styles.input}
      />
      <TextInput
        value={prix}
        onChangeText={setPrix}
        placeholder="Prix"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        value={ingredient.join(", ")}
        onChangeText={(text) => setIngredient(text.split(", "))}
        placeholder="Ingrédients"
        style={styles.input}
      />
      <TouchableOpacity onPress={modifierProduit} style={styles.addButton}>
        <Text style={styles.buttonText}>Enregistrer les modifications</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChangeDish; 