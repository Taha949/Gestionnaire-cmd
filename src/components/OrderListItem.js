import { View, Text, Image, SafeAreaView } from "react-native";

const OrderListItem = ({ order }) => {
  const random = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
  return (
    <SafeAreaView style={{ flexirection: "row", margin: 10, paddingTop: 10 }}>
      <View>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          Commande N°{random}
        </Text>
        <Text style={{ marginVertical: 5 }}>3 items €38.45</Text>
        <Text> le 29/05 à 13:58 </Text>
      </View>
    </SafeAreaView>
  );
};

export default OrderListItem;
