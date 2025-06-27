import { View, Text, FlatList } from "react-native";
import OrderListItem from "../../components/OrderListItem";
import { useOrderContext } from "../../contexts/OrderContext";
import { Commande } from "../../models";

const OrderScreen = () => {
  const { commandes } = useOrderContext();
  console.log(commandes);
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        data={[...commandes].reverse()}
        renderItem={({ item }) => <OrderListItem commande={item} />}
      />
    </View>
  );
};

export default OrderScreen;
