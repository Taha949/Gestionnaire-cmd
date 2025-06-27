import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useOrderContext } from "../../contexts/OrderContext";
import { DataStore } from "@aws-amplify/datastore";

const OrderDetails = () => {
  const route = useRoute();
  const { id } = route.params || {};
  const { getCommande } = useOrderContext();
  const [commande, setCommande] = useState(null);

  useEffect(() => {
    if (id) {
      getCommande(id).then(setCommande).catch(console.log);
    }
  }, [id]);

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
            <Text style={styles.datetime}>{dateStr} à {timeStr}</Text>
            <Text style={styles.total}>Total: €{commande.total ?? commande.dishes.reduce((s,d)=>s+((d.Dish?.prix||0)*d.quantity),0).toFixed(2)}</Text>
          </View>
        );
      }}
      data={commande.dishes}
      renderItem={renderDish}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.sep} />}
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
  sep: { height: 1, backgroundColor: "#eee", marginVertical: 8 },
});

export default OrderDetails;
