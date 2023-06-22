import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
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

  const navigation = useNavigation();

  const onSave = async () => {
    try {
      const serveur = await DataStore.save(
        new Serveur({
          name,
          sub,
        })
      );
      setDbServeur(serveur);
      // console.log(serveur);
      //  setDbServeur(serveur);
    } catch (e) {
      Alert.alert("Error", e.message);
    }

    /*   if (dbServeur) {
      await updateServeur();
    } else {
      await createServeur();
    }
    navigation.goBack();
    */
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
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
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
});

export default Profile;
