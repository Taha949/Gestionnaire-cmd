import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { DataStore } from "aws-amplify";
import { Dish, Categorie } from "../../models";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useAuthContext } from "../../contexts/AuthContext";

const Produit = () => {
  const [name, setName] = useState("");
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState("");
  const navigation = useNavigation();
  const { dbServeur } = useAuthContext();
  const isServeur = dbServeur?.role === "SERVEUR";

  // Charger les catégories existantes
  useEffect(() => {
    DataStore.query(Categorie).then(setCategories);
    const sub = DataStore.observe(Categorie).subscribe(() => {
      DataStore.query(Categorie).then(setCategories);
    });
    return () => sub.unsubscribe();
  }, []);

  React.useEffect(() => {
    if (isServeur) {
      Alert.alert("Accès refusé", "Vous n'êtes pas autorisé à ajouter un plat.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }
  }, [isServeur]);

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
      name,
      image,
      description,
      prix: parsedPrix,
      ingredient,
      ...(selectedCatId ? { categorieID: selectedCatId } : {}),
    });

    try {
      await DataStore.save(nouveauProduit);
      // Après l'ajout réussi : réinitialiser les champs puis revenir en arrière
      const resetFields = () => {
        setName("");
        setPrix("");
        setImage("");
        setDescription("");
        setIngredient([]);
        setSelectedCatId("");
      };

      Alert.alert("Succès", "Le produit a été ajouté avec succès", [
        {
          text: "OK",
          onPress: () => {
            resetFields();
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.log("Erreur lors de l'ajout du produit :", error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de l'ajout du produit"
      );
    }
  };

  if (isServeur) {
    return null;
  }
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
        value={image}
        onChangeText={setImage}
        placeholder="Image (URL)"
        style={styles.input}
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
  picker: {
    backgroundColor: "#f2f2f2",
    marginBottom: 10,
  },
});

export default Produit;
