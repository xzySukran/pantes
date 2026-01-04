import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import DateScreen from "../screens/DateScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: styles.tabBar,

        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "Home") iconName = "home";
          if (route.name === "Date") iconName = "calendar";
          if (route.name === "Notification") iconName = "notifications";
          if (route.name === "Profile") iconName = "person";

          return (
            <View style={styles.iconWrapper}>
              <Ionicons
                name={iconName}
                size={22}
                color={focused ? "#1F5BFF" : "#6C8EFF"}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Date" component={DateScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#B7C9FF",
    borderTopWidth: 0,
    elevation: 0,
  },

  iconWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
