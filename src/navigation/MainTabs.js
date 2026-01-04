import React, { useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Animated,
} from "react-native";


import HomeStack from "./HomeStack";
import DateScreen from "../screens/DateScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

/* ================= ICON ANIMATED COMPONENT ================= */
function AnimatedTabIcon({ name, focused }) {
  const translateY = useRef(new Animated.Value(8)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: focused ? -10 : 8,
        useNativeDriver: true,
        friction: 6,
      }),
      Animated.spring(scale, {
        toValue: focused ? 1.25 : 1,
        useNativeDriver: true,
        friction: 6,
      }),
    ]).start();
  }, [focused]);

  return (
    <Animated.View
      style={[
        styles.iconWrapper,
        {
          transform: [{ translateY }, { scale }],
          backgroundColor: focused ? "#FFFFFF" : "transparent",
        },
      ]}
    >
      <Ionicons
        name={name}
        size={22}
        color={focused ? "#1F5BFF" : "#6C8EFF"}
      />
    </Animated.View>
  );
}

/* ================= MAIN TABS ================= */
export default function MainTabs() {
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

          return <AnimatedTabIcon name={iconName} focused={focused} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Date" component={DateScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#B7C9FF",
    borderTopWidth: 0,
    elevation: 10,
  },

  iconWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
});
