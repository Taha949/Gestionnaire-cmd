import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RestaurantDetailsScreen from "../screens/RestaurantDetailsScreen";
import DishDetailsScreen from "../screens/DishDetailsScreen";
import Basket from "../screens/Basket";
import OrderScreen from "../screens/OrdersScreen";
import OrderDetails from "../screens/OrderDetails";
import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NewTabs" component={NewTabs} />
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();
const NewTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Nouvelle commandee"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: () => (
            <Ionicons name="restaurant" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Produits"
        component={RestaurantDetailsScreen}
        options={{
          tabBarIcon: () => (
            <Entypo name="shopping-basket" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Commandes"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="notebook" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Restaurant" component={RestaurantDetailsScreen} />
      <HomeStack.Screen name="Dish" component={DishDetailsScreen} />
      <HomeStack.Screen name="Basket" component={Basket} />
    </HomeStack.Navigator>
  );
};

const OrderStack = createNativeStackNavigator();
const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen name="Orders" component={OrderScreen} />
      <OrderStack.Screen name="Order" component={OrderDetails} />
    </OrderStack.Navigator>
  );
};
export default RootNavigator;
