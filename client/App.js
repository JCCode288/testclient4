import { Provider as PaperProvider } from "react-native-paper";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { themeBase } from "./screens/components";
import { NavigationContainer } from "@react-navigation/native";
import Tab from "./navigators/Tab";
import client from "./apollo";
import LandingStack from "./navigators/LandingStack";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={themeBase}>
        <NavigationContainer>
          <LandingStack />
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
