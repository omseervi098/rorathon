// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import "react-native-gesture-handler";

import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./pages/HomeScreen";
import ProfileScren from "./pages/ProfileScreen";
import SpeechToTextScreen from "./pages/SpeechToTextScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: "#42f44b",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Speech to Text"
          component={SpeechToTextScreen}
          options={{
            tabBarLabel: "Speech to Text",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="text-to-speech"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Contact"
          component={ProfileScren}
          options={{
            tabBarLabel: "Account",
            tabBarIcon: ({ color, size }) => (
              // contact icon
              <MaterialCommunityIcons
                name="account-settings"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
