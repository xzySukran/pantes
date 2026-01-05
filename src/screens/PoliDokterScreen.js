import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

export default function PoliDokterScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Lobster-Regular": require("../../assets/Lobster-Regular.ttf"),
    "Cormorant-Italic": require("../../assets/Cormorant-Italic.ttf"),
    "Inter-Italic": require("../../assets/Inter_28pt-Italic.ttf"),
    "NotoSans-Light": require("../../assets/NotoSans-Light.ttf"),
  });
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <Ionicons name="medkit" size={26} color="#FFFFFF" />
          <Text style={styles.headerText}>Poli Dokter</Text>
        </View>
      </View>

      {/* ================= LIST POLI ================= */}
      <View style={styles.content}>
        <PoliCard
          title="POLI UMUM"
          icon="medkit-outline"
        />
        <PoliCard
          title="POLI GIGI"
          icon="happy-outline"
        />
        <PoliCard
          title="POLI ANAK"
          icon="person-outline"
        />
      </View>
    </SafeAreaView>
  );
}

/* ================= CARD COMPONENT ================= */
function PoliCard({ title, icon }) {
  return (
    <LinearGradient
      colors={["#9B6EF3", "#C79CFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Ionicons name={icon} size={36} color="#FFFFFF" />
      <Text style={styles.cardText}>{title}</Text>
    </LinearGradient>
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
    backgroundColor: "#7B2CBF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },

  headerText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },

  /* CONTENT */
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  /* CARD */
  card: {
    height: 110,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  cardText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
});
