import React, { useState } from "react";
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

const Produit = () => {
  const [name, setName] = useState("");
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const navigation = useNavigation();

  const addIngredient = () => {
    const newIngredient = "";
    setIngredient((prevIngredient) => [...prevIngredient, newIngredient]);
  };

  const ajouterProduit = async () => {
    if (!name || !prix || ingredient.length === 0 || !image || !description) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }
    const parsedPrix = parseFloat(prix);
    if (isNaN(parsedPrix)) {
      Alert.alert("Erreur", "Le champ Prix doit être un nombre valide");
      return;
    }

    const nouveauProduit = new Dish({
      name: name,
      image: image,
      description: description,
      prix: parseFloat(prix),
      ingredient: ingredient,
    });

    try {
      await DataStore.save(nouveauProduit);
      Alert.alert("Succès", "Le produit a été ajouté avec succès");
    } catch (error) {
      console.log("Erreur lors de l'ajout du produit :", error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de l'ajout du produit"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un produit</Text>
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
      <TouchableOpacity onPress={addIngredient} style={styles.addButton}>
        <Text style={styles.buttonText}>Ajouter un ingrédient</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ajouterProduit} style={styles.addButton}>
        <Text style={styles.buttonText}>Ajouter un produit</Text>
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
    backgroundColor: "#2ecc71",
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

export default Produit;
