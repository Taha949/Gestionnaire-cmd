import { StatusBar } from "expo-status-bar";
import { Amplify } from "aws-amplify";
import RootNavigator from "./src/navigation";
import { NavigationContainer } from "@react-navigation/native";
import config from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";

Amplify.configure(config);

function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
export default withAuthenticator(App);
