import { View, Text, Image } from "react-native";
import styles from "./styles";

const RestaurantHeader = ({ restaurant }) => {
  return (
    <View style={styles.page}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />

      <View style={styles.container}>
        <Text style={styles.title}>{restaurant.name}</Text>
      </View>
    </View>
  );
};

export default RestaurantHeader;
