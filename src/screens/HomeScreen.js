import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import QueueCard from "../components/QueueCard"; 
import { useIsFocused,useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";


export default function HomeScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const isFocused = useIsFocused();
  const [booking, setBooking] = useState(null);
  const [fontsLoaded] = useFonts({
    "Lobster-Regular": require("../../assets/Lobster-Regular.ttf"),
    "Cormorant-Italic": require("../../assets/Cormorant-Italic.ttf"),
    "Inter-Italic": require("../../assets/Inter_28pt-Italic.ttf"),
    "NotoSans-Light": require("../../assets/NotoSans-Light.ttf"),
  });
  useEffect(() => {
    getUser();
    loadUser();
    getBooking();
  }, [isFocused]);

   const loadUser = async () => {
    const data = await AsyncStorage.getItem("currentUser");
    if (data) setUser(JSON.parse(data));
  };
  const getUser = async () => {
    const storedUser = await AsyncStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };
  const getBooking = async () => {
  const data = await AsyncStorage.getItem("currentBooking");
  if (data) {
    setBooking(JSON.parse(data));
  }
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
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
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
        <View>
          <Text style={styles.halo}>Hello,</Text>
          <Text style={styles.name}>{user?.name || "User"}</Text>
        </View>
      </View>

      {/* ================= QUEUE CARD ================= */}
      {/* ================= QUEUE ================= */}
      <View style={styles.queueContainer}>
        {!booking && (
          <Text style={{ color: "#999", textAlign: "center" }}>
            Anda belum memiliki antrian
          </Text>
        )}

        {booking?.layanan === "online" && (
          <QueueCard queueNumber={booking.queueNumber} />
        )}

        {booking?.layanan === "klinik" && (
          <Text style={{ color: "#1F5BFF", textAlign: "center" }}>
            Silakan datang ke klinik sesuai jadwal
          </Text>
        )}
      </View>


      {/* ================= MENU ================= */}
      <View style={styles.menuWrapper}>
        <MenuItem
            title="Poli Dokter"
            icon="medkit"
            color="#8E6AC1"
            onPress={() => navigation.navigate("PoliDokter")}
        />

        <MenuItem 
        title="Riwayat Pasien" 
        icon="document-text" 
        color="#A35CFF" 
        onPress={() => navigation.navigate("Riwayat")}
        />
        <MenuItem 
        title="Konsultasi" 
        icon="chatbubbles" 
        color="#5B87FF" 
        onPress={() => navigation.navigate("Konsultasi")}
        />
        <MenuItem 
        title="Info Dokter" 
        icon="person-circle" 
        color="#7B9CFF" 
        onPress={() => navigation.navigate("InfoDokter")}/>
      </View>
    </SafeAreaView>
  );
}

/* ================= MENU ITEM ================= */
function MenuItem({ title, icon, color, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={34} color="#FFFFFF" />
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );
}


/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF3FF",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 0,       // ✅ RAPAT
    paddingBottom: 0,
  },
  avatarWrapper: { alignItems: "center", marginTop: 10 },
  avatar: {
    width: 65,
    height: 67,
    borderRadius: 32,
    marginRight: 12,
  },

  halo: {
    fontSize: 35,
    color: "#1F5BFF",
    fontWeight: 500,
    fontFamily: "Lobster-Regular",
    letterSpacing: 3,
  },

  name: {
    fontSize: 25,
    color: "#090b0dff",
    marginLeft: 5,
    fontWeight: "medium",
    fontFamily:"Cormorant-Italic",
    letterSpacing: 0.5,
  },

  /* QUEUE */
  queueContainer: {
    paddingHorizontal: 20,
    marginTop: 0,       // 🔥 JARAK IDEAL
  },

  /* MENU */
  menuWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 18,
    paddingBottom: 16,
  },

  menuItem: {
    width: "48%",
    height: 130,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  menuText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
