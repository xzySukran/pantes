import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NotificationProvider } from "./src/context/NotificationContext";

import SplashScreen from "./src/screens/SplashScreen";
import LandingScreen from "./src/screens/LandingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";
import MainTabs from "./src/navigation/MainTabs";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NotificationProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotificationProvider>
  );
}
