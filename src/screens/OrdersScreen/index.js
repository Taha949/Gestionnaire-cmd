import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import OrderListItem from "../../components/OrderListItem";
import { useOrderContext } from "../../contexts/OrderContext";
import { Commande } from "../../models";
import React, { useState } from "react";

const STATUS_OPTIONS = [
  "ALL",
  "NOUVELLE",
  "EPREPARATIONN",
  "PRETE",
  "PROBLEME",
  "SERVIE",
];

const OrderScreen = () => {
  const { commandes } = useOrderContext();
  const [collapsedDates, setCollapsedDates] = useState(new Set());
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const tsMap = React.useMemo(() => {
    const obj = {};
    commandes.forEach((c) => {
      if (c.clientCreatedAt) obj[c.id] = c.clientCreatedAt;
    });
    return obj;
  }, [commandes]);

  // Regrouper les commandes par date (jj/mm)
  const sections = React.useMemo(() => {
    const map = new Map();
    commandes
      .filter((c) =>
        selectedStatus === "ALL" ? true : c.statut === selectedStatus
      )
      .forEach((cmd) => {
        let dateObj;
        if (cmd.createdAt) {
          dateObj = new Date(cmd.createdAt);
        } else if (tsMap[cmd.id]) {
          dateObj = new Date(tsMap[cmd.id]);
        } else if (cmd._lastChangedAt) {
          dateObj = new Date(cmd._lastChangedAt);
        } else {
          dateObj = new Date();
        }
        const key = dateObj.toLocaleDateString("fr-FR");
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(cmd);
      });
    // Transformer en array et trier par date décroissante
    const arr = Array.from(map.entries()).map(([title, data]) => {
      // trier par date décroissant pour chaque date
      data.sort((a, b) => {
        const d1 = a.createdAt
          ? new Date(a.createdAt)
          : tsMap[a.id]
          ? new Date(tsMap[a.id])
          : new Date(a._lastChangedAt || 0);
        const d2 = b.createdAt
          ? new Date(b.createdAt)
          : tsMap[b.id]
          ? new Date(tsMap[b.id])
          : new Date(b._lastChangedAt || 0);
        return d2 - d1;
      });
      const count = data.length;
      const isCollapsed = collapsedDates.has(title);
      return { title, count, data: isCollapsed ? [] : data };
    });
    arr.sort((a, b) => {
      const da = new Date(a.title.split("/").reverse().join("-"));
      const db = new Date(b.title.split("/").reverse().join("-"));
      return db - da;
    });
    return arr;
  }, [commandes, collapsedDates, tsMap, selectedStatus]);

  const toggleDate = (title) => {
    setCollapsedDates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) newSet.delete(title);
      else newSet.add(title);
      return newSet;
    });
  };

  const renderSectionHeader = ({ section: { title, count } }) => {
    const isCollapsed = collapsedDates.has(title);
    const arrow = isCollapsed ? "▶" : "▼";
    return (
      <Pressable onPress={() => toggleDate(title)} style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>
          Commandes du {title} ({count})
        </Text>
        <Text style={styles.arrow}>{arrow}</Text>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
      >
        {STATUS_OPTIONS.map((s) => (
          <Pressable
            key={s}
            onPress={() => setSelectedStatus(s)}
            style={[styles.chip, selectedStatus === s && styles.chipActive]}
          >
            <Text
              style={
                selectedStatus === s ? styles.chipTextActive : styles.chipText
              }
            >
              {s}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <SectionList
        sections={sections}
        key={selectedStatus}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderListItem commande={item} />}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 4,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  arrow: { fontSize: 16 },
  filterBar: { paddingVertical: 6, paddingHorizontal: 10, marginBottom: 4 },
  chip: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    alignSelf: "flex-start",
    minHeight: 32,
  },
  chipActive: { backgroundColor: "#333", borderColor: "#333" },
  chipText: { color: "#333" },
  chipTextActive: { color: "#fff" },
});

export default OrderScreen;
