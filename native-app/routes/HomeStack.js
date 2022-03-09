import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/screens/Home";
import Camera from "../components/screens/Camera";
import Bluetooth from "../components/screens/Bluetooth";

import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          /*headerLeft: () => <Ionicons name="paper-plane" size={32} />,*/
          headerStyle: {
            backgroundColor: "#e5e4df",
          },

          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "normal",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "OLIN Native" }}
        />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Bluetooth" component={Bluetooth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
