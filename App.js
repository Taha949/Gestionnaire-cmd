import { StatusBar } from "expo-status-bar";
import { Amplify, DataStore } from "aws-amplify";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import RootNavigator from "./src/navigation";
import { NavigationContainer } from "@react-navigation/native";
import config from "./src/aws-exports";
import BasketContextProvider from "./src/contexts/BasketContext";
import AuthContextProvider from "./src/contexts/AuthContext";
import OrderContextProvider from "./src/contexts/OrderContext";
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

function App() {
  const [ready, setReady] = useState(false);
  // reset DataStore once after this schema migration
  useEffect(() => {
    (async () => {
      const KEY = 'schema_v2_resetDone'; // change label on next breaking schema change
      try {
        const done = await AsyncStorage.getItem(KEY);
        if (!done) {
          await DataStore.clear();
          await AsyncStorage.setItem(KEY, '1');
        }
        await DataStore.start();
        setReady(true);
      } catch (e) {
        console.log('DataStore reset check failed', e);
        setReady(true);
      }
    })();
  }, []);

  if (!ready) return null; // or a splash/loading

  return (
    <NavigationContainer>
      <AuthContextProvider>
        <BasketContextProvider>
          <OrderContextProvider>
            <RootNavigator />
          </OrderContextProvider>
        </BasketContextProvider>
      </AuthContextProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
export default App;
