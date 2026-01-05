import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [user, setUser] = useState(null);
  const [fontsLoaded] = useFonts({
    "Lobster-Regular": require("../../assets/Lobster-Regular.ttf"),
    "Cormorant-Italic": require("../../assets/Cormorant-Italic.ttf"),
    "Inter-Italic": require("../../assets/Inter_28pt-Italic.ttf"),
    "NotoSans-Light": require("../../assets/NotoSans-Light.ttf"),
  });

  useEffect(() => {
    loadUser();
  }, [isFocused]);

  const loadUser = async () => {
    const data = await AsyncStorage.getItem("currentUser");
    if (data) setUser(JSON.parse(data));
  };

  const logout = async () => {
    await AsyncStorage.removeItem("isLogin");
    await AsyncStorage.removeItem("currentUser");
    navigation.replace("Login");
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1F5BFF" />
      </View>
    );
  }
if (Text.defaultProps == null) {
    Text.defaultProps = {};
    }
    Text.defaultProps.style = {
      fontFamily: "NotoSans-Light",
    };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>Profile Saya</Text>

      {/* AVATAR */}
      <View style={styles.avatarWrapper}>
        <Image
          source={
            user?.photo
              ? { uri: user.photo }
              : require("../../assets/image.png")
          }
          style={styles.avatar}
        />
      </View>

      {/* NAME */}
      <Text style={styles.name}>{user?.name || "User"}</Text>

      {/* MENU */}
      <View style={styles.menu}>
        <ProfileItem
          icon="person-outline"
          label="Edit Profile"
          onPress={() => navigation.navigate("EditProfile")}
        />
        <ProfileItem
          icon="shield-checkmark-outline"
          label="Kebijakan Privasi"
          onPress={() => Alert.alert("Info", "Kebijakan Privasi")}
        />
        <ProfileItem
          icon="log-out-outline"
          label="Keluar"
          danger
          onPress={logout}
        />
      </View>
    </SafeAreaView>
  );
}

function ProfileItem({ icon, label, onPress, danger }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <Ionicons
          name={icon}
          size={22}
          color={danger ? "#FF4D4D" : "#1F5BFF"}
        />
        <Text style={[styles.itemText, danger && { color: "#FF4D4D" }]}>
          {label}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF3FF", padding: 20 },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1F5BFF",
    textAlign: "center",
    marginVertical: 30,
  },
  avatarWrapper: { alignItems: "center", marginTop: 10 },
  avatar: { width: 110, height: 110, borderRadius: 55 },
  name: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
  },
  menu: { marginTop: 40 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
  },
  itemLeft: { flexDirection: "row", alignItems: "center" },
  itemText: { marginLeft: 12, fontSize: 14 },
});
