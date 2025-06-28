import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RestaurantDetailsScreen from "../screens/RestaurantDetailsScreen";
import DishDetailsScreen from "../screens/DishDetailsScreen";
import Basket from "../screens/Basket";
import OrderScreen from "../screens/OrdersScreen";
import OrderDetails from "../screens/OrderDetails";
import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useAuthContext } from "../contexts/AuthContext";
import ProfileScreen from "../screens/ProfileScreen";
import RestaurantsDetailsScreen2 from "../screens/RestaurantDetailsScreen2";
import AjouterProduit from "../screens/AjouterProduit";
import ChangeDish from "../screens/ChangeDish";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { dbServeur } = useAuthContext();
// sata maline
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {dbServeur ? (
        <Stack.Screen name="NewTabs" component={NewTabs} />
      ) : (
        <Stack.Screen name="Login" component={ProfileScreen} />
      )}
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();
const NewTabs = () => {
  const { dbServeur } = useAuthContext();
  const isCuisinier = dbServeur?.role === "CUISINIER";

  return (
    <Tab.Navigator key={isCuisinier ? "cuisinier" : "serveur"}>
      {!isCuisinier && (
        <Tab.Screen
          name="Nouvelle commande"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: () => (
              <Ionicons name="restaurant" size={24} color="black" />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="person" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="CommandesTab"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="notebook" size={24} color="black" />
          ),
          tabBarLabel:'Commandes'
        }}
      />
      <Tab.Screen
        name="Produits"
        component={ProductStackNavigator}
        options={{
          tabBarIcon: () => (
            <Entypo name="shopping-basket" size={24} color="black" />
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
      <OrderStack.Screen name="Commandes" component={OrderScreen} />
      <OrderStack.Screen name="Commande" component={OrderDetails} />
    </OrderStack.Navigator>
  );
};
const ProductStack = createNativeStackNavigator();
const ProductStackNavigator = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="Gestion des produits"
        component={RestaurantsDetailsScreen2}
      />
      <OrderStack.Screen name="Produit" component={AjouterProduit} />
      <OrderStack.Screen name="ChangeDish" component={ChangeDish} />
    </OrderStack.Navigator>
  );
};
export default RootNavigator;
