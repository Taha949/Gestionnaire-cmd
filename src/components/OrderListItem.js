import { View, Text, Image, SafeAreaView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { CommandeParDish, Dish } from "../models";

const OrderListItem = ({ commande }) => {
  const navigation = useNavigation();

  const [itemsCount, setItemsCount] = useState(0);
  const [total, setTotal] = useState(commande.total ? parseFloat(commande.total) : 0);

  const [displayDate] = useState(() =>
    commande.createdAt ? new Date(commande.createdAt) : new Date()
  );
  const dateStr = displayDate.toLocaleDateString('fr-FR');
  const timeStr = displayDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  const computeMetrics = async () => {
    const cpd = await DataStore.query(CommandeParDish, (c) => c.commandeID("eq", commande.id));
    const qtySum = cpd.reduce((sum, it) => sum + it.quantity, 0);
    setItemsCount(qtySum);

    if (commande.total) {
      setTotal(parseFloat(commande.total));
    } else {
      const sums = await Promise.all(
        cpd.map(async (item) => {
          let d = item.Dish;
          if (!d?.prix) {
            const dId = item.commandeParDishDishId || (typeof d === "string" ? d : undefined);
            if (dId) d = await DataStore.query(Dish, dId);
          }
          return (d?.prix || 0) * item.quantity;
        })
      );
      setTotal(sums.reduce((s, v) => s + v, 0));
    }
  };

  useEffect(() => {
    console.log('OrderListItem mount', commande.id);
    computeMetrics();
    const sub = DataStore.observe(CommandeParDish, (c) => c.commandeID("eq", commande.id)).subscribe(() => {
      computeMetrics();
    });
    return () => sub.unsubscribe();
  }, [commande.id]);

  return (
    <Pressable onPress={() => navigation.navigate("Order", { id: commande.id })}>
      <View style={{ margin: 10, paddingTop: 10 }}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          Commande #{commande.id.slice(0,6)}
        </Text>
        <Text style={{ marginVertical: 5 }}>{itemsCount} items €{total.toFixed(2)}</Text>
        <Text>{dateStr} à {timeStr}</Text>
      </View>
    </Pressable>
  );
};

export default OrderListItem;
