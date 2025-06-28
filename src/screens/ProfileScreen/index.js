import { View, Text, TextInput, StyleSheet, Button, Alert, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import { Serveur } from "../../models";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import RestaurantDetailsScreen from "../RestaurantDetailsScreen";

const Profile = () => {
  const { dbServeur } = useAuthContext();

  const [name, setName] = useState(dbServeur?.name || "");
  const { sub, setDbServeur } = useAuthContext();
  const [role, setRole] = useState(dbServeur?.role || "SERVEUR");

  const navigation = useNavigation();

  const onSave = async () => {
    // ensure DataStore is ready (not in Clearing/Running transition)
    try { await DataStore.start(); } catch {}

    try {
      // On crée toujours un nouvel enregistrement Serveur pour conserver l'historique du nom
      const serveur = await DataStore.save(
        new Serveur({
          name,
          sub,
          role,
        })
      );
      setDbServeur(serveur);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  /*const updateServeur = async () => {
    const serveur = await DataStore.save(
      Serveur.copyOf(dbServeur, (updated) => {
        updated.name = name;
      })
    );
    setDbServeur(serveur);
  };
*/
  /*const createServeur = async () => {
    try {
      const serveur = await DataStore.save(
        new Serveur({
          name,
          sub,
        })
      );
      console.log(serveur);
      setDbServeur(serveur);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };
*/
  return (
    <SafeAreaView>
      <Text style={styles.title}>Profil</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <Text style={styles.label}>Rôle</Text>
      <View style={styles.radioContainer}>
        {[
          { key: "SERVEUR", label: "Serveur" },
          { key: "CUISINIER", label: "Cuisinier" },
        ].map((opt) => (
          <Pressable
            key={opt.key}
            onPress={() => setRole(opt.key)}
            style={styles.radioItem}
          >
            <Text style={styles.bullet}>{role === opt.key ? "●" : "○"}</Text>
            <Text style={styles.radioLabel}>{opt.label}</Text>
          </Pressable>
        ))}
      </View>
      <Button onPress={onSave} title="Enregistrer" />
      <Text
        onPress={() => Auth.signOut()}
        style={{ textAlign: "center", color: "red", margin: 10 }}
      >
        Se deconnecter
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
  label: {
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
  radioContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  bullet: {
    fontSize: 18,
    marginRight: 6,
  },
  radioLabel: {
    fontSize: 16,
  },
});

export default Profile;
