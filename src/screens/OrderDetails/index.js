import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useOrderContext } from "../../contexts/OrderContext";
import { DataStore } from "aws-amplify";
import { Serveur, Commande } from "../../models";
import { useAuthContext } from "../../contexts/AuthContext";

const OrderDetails = () => {
  const route = useRoute();
  const { id } = route.params || {};
  const { getCommande } = useOrderContext();
  const [commande, setCommande] = useState(null);
  const [serveurName, setServeurName] = useState("");
  const { dbServeur } = useAuthContext();
  const navigation = useNavigation();
  const isCuisinier = dbServeur?.role === "CUISINIER";

  useEffect(() => {
    if (id) {
      getCommande(id).then(setCommande).catch(console.log);
    }
  }, [id]);

  // Charger le nom du serveur associé une fois la commande récupérée
  useEffect(() => {
    const fetchServeur = async () => {
      if (!commande?.serveurID) return;
      try {
        const serv = await DataStore.query(Serveur, commande.serveurID);
        if (serv?.name) setServeurName(serv.name);
      } catch (e) {
        console.log("Erreur récupération serveur", e);
      }
    };
    fetchServeur();
  }, [commande]);

  const renderDish = ({ item }) => {
    const dish = item.Dish || {};
    return (
      <View style={styles.row}>
        <Text style={styles.qty}>{item.quantity} x</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{dish.name || "Plat"}</Text>
          { (item.selectedIngredient?.length>0 ? item.selectedIngredient : dish.ingredient?.filter(Boolean)).length > 0 && (
            <Text style={styles.ing}>Ingrédients: {(item.selectedIngredient?.length>0 ? item.selectedIngredient : dish.ingredient.filter(Boolean)).join(', ')}</Text>
          )}
        </View>
        <Text style={styles.price}>€{((dish.prix || 0) * item.quantity).toFixed(2)}</Text>
      </View>
    );
  };

  const updateStatus = async (newStatus) => {
    try {
      const orig = await DataStore.query(Commande, id);
      if (!orig) return;
      await DataStore.save(Commande.copyOf(orig, (upd) => {
        upd.statut = newStatus;
      }));
      navigation.goBack();
    } catch (e) {
      console.log("Erreur update statut", e);
      Alert.alert("Erreur", "Impossible de mettre à jour le statut");
    }
  };

  if (!commande) {
    return (
      <View style={styles.center}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ padding: 10 }}
      ListHeaderComponent={() => {
        const date = commande.createdAt ? new Date(commande.createdAt) : new Date();
        const dateStr = date.toLocaleDateString('fr-FR');
        const timeStr = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        return (
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.header}>Commande #{commande.id.slice(0, 6)}</Text>
            <View style={styles.headerRow}>
              <Text style={styles.datetime}>le {dateStr} à {timeStr}</Text>
              {serveurName ? (
                <Text style={styles.author}>Serveur : {serveurName}</Text>
              ) : null}
            </View>
          </View>
        );
      }}
      data={commande.dishes}
      renderItem={renderDish}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.sep} />}
      ListFooterComponent={isCuisinier ? () => (
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.problemBtn} onPress={() => updateStatus('PROBLEME')}>
            <Text style={styles.btnText}>Signaler un problème</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.prepBtn} onPress={() => updateStatus('EPREPARATIONN')}>
            <Text style={styles.btnText}>Marquer en préparation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.readyBtn} onPress={() => updateStatus('PRETE')}>
            <Text style={styles.btnText}>Marquer prête</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    />
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center" },
  qty: { marginRight: 8, fontSize: 16 },
  name: { fontSize: 16, fontWeight: "500" },
  ing: { fontSize: 12, color: "grey" },
  price: { fontSize: 16, fontWeight: "600" },
  datetime: { fontSize: 14, color: 'grey', marginBottom: 4 },
  total: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  author: { fontSize: 14, color: 'grey', marginBottom: 4 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  sep: { height: 1, backgroundColor: "#eee", marginVertical: 8 },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 10 },
  prepBtn: { flex: 1, backgroundColor: '#f39c12', padding: 12, borderRadius: 6, marginHorizontal: 4 },
  readyBtn: { flex: 1, backgroundColor: '#27ae60', padding: 12, borderRadius: 6, marginHorizontal: 4 },
  problemBtn: { flex: 1, backgroundColor: '#e74c3c', padding: 12, borderRadius: 6, marginHorizontal: 4 },
  btnText: { color: 'white', fontWeight: 'bold' },
});

export default OrderDetails;
