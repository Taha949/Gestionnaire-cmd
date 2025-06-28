import { View, Text, Image, SafeAreaView, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useMemo } from "react";
import { DataStore } from "aws-amplify";
import { CommandeParDish, Dish, Commande } from "../models";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuthContext } from "../contexts/AuthContext";
import React from "react";

const OrderListItem = ({ commande }) => {
  const navigation = useNavigation();
  const { dbServeur } = useAuthContext();
  const isServeur = (dbServeur?.role || '').toUpperCase() === 'SERVEUR';

  const [itemsCount, setItemsCount] = useState(0);
  const [total, setTotal] = useState(commande.total ? parseFloat(commande.total) : 0);
  const [currentStatus, setCurrentStatus] = useState(commande.statut);
  const localTs = commande.clientCreatedAt;

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
    const sub = DataStore.observe(Commande, commande.id).subscribe(msg => {
      if (msg.model === Commande && msg.opType === 'UPDATE') {
        setCurrentStatus(msg.element.statut);
      }
    });
    const sub2 = DataStore.observe(CommandeParDish, (c) => c.commandeID("eq", commande.id)).subscribe(() => {
      computeMetrics();
    });
    return () => { sub.unsubscribe(); sub2.unsubscribe(); };
  }, [commande.id]);

  const { dateStr, timeStr } = useMemo(() => {
    let d;
    if (commande.createdAt) {
      d = new Date(commande.createdAt);
    } else if (localTs) {
      d = new Date(localTs);
    } else if (commande._lastChangedAt) {
      d = new Date(commande._lastChangedAt);
    } else {
      d = new Date();
    }
    return {
      dateStr: d.toLocaleDateString('fr-FR'),
      timeStr: d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };
  }, [commande.createdAt, commande._lastChangedAt, localTs]);

  const statut = (currentStatus || '').trim().toUpperCase();
  const statusColor = statut.startsWith('EPRE') ? '#f39c12' :
                      statut === 'PRETE' ? '#27AE60' :
                      statut === 'PROBLEME' ? '#e74c3c' :
                      statut === 'SERVIE' ? '#7f8c8d' :
                      null;

  const servedStyle = statut === 'SERVIE' ? styles.servedText : null;
  const containerServed = statut === 'SERVIE' ? styles.servedContainer : null;

  const dotStyle = { width:14, height:14, borderRadius:7, backgroundColor: statusColor, marginRight:6 };

  const markServed = async () => {
    await DataStore.start();
    try {
      const orig = await DataStore.query(Commande, commande.id);
      if (!orig) return;
      await DataStore.save(Commande.copyOf(orig, (upd)=>{upd.statut='SERVIE';}));
    } catch(e){ console.log('serve error',e); }
  };

  const canServe = isServeur && (statut === 'PRETE' || statut === 'SERVIE');

  const toggleServe = async () => {
    await DataStore.start();
    try {
      const orig = await DataStore.query(Commande, commande.id);
      if (!orig) return;
      const newStatus = statut === 'PRETE' ? 'SERVIE' : 'PRETE';
      await DataStore.save(Commande.copyOf(orig, (upd)=>{upd.statut=newStatus;}));
    } catch(e){ console.log('serve error',e); }
  };

  // sub-components ------------------------------------------------
  const Dot = ({ color }) => (
    <View style={styles.dotWrap}>
      <View style={[styles.dotCore, { backgroundColor: color }]} />
    </View>
  );

  const ServeButton = ({ onServe }) => {
    const [pressed, setPressed] = useState(false);
    return (
      <Pressable
        onPress={onServe}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        hitSlop={10}
        style={{ alignItems: 'center' }}
      >
        {pressed && (
          <Text style={styles.tooltip}>{statut==='PRETE'?'Marquer servie':'Marquer prête'}</Text>
        )}
        {statut==='PRETE' ? (
          <MaterialIcons name="check-circle" size={28} color="#27ae60" /> ) : (
          <MaterialIcons name="undo" size={28} color="#7f8c8d" />)}
      </Pressable>
    );
  };

  return (
    <Pressable onPress={() => navigation.navigate("Commande", { id: commande.id })}>
      <View style={[styles.card, containerServed]}>
        <View style={styles.left}>
          <Text style={[styles.title, servedStyle]}>Commande #{commande.id.slice(0,6)}</Text>
          <Text style={[styles.meta, servedStyle]}>{itemsCount} items • {total.toFixed(2)}€</Text>
          <Text style={[styles.meta, servedStyle]}>{dateStr} • {timeStr}</Text>
        </View>

        <View style={styles.rightBox}>
          {statusColor && <Dot color={statusColor} />}
          {canServe && <ServeButton onServe={toggleServe} />}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: { maxWidth: '70%' },
  title: { fontSize: 17, fontWeight: '600' },
  meta: { marginTop: 4, color: '#666' },
  servedContainer:{backgroundColor:'#f0f0f0'},
  servedText:{color:'#7f8c8d'},
  rightBox:{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',width:80},
  dotWrap:{width:26,height:26,borderRadius:11,borderWidth:2,borderColor:'#fff',justifyContent:'center',alignItems:'center',marginRight:8},
  dotCore:{width:20,height:20,borderRadius:10},
  tooltip:{position:'absolute',bottom:34,backgroundColor:'#000',color:'#fff',paddingHorizontal:6,paddingVertical:2,fontSize:11,borderRadius:4,opacity:0.9},
});

export default OrderListItem;
