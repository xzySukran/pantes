import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

export default function RiwayatScreen({ navigation }) {
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
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <Ionicons name="document-text-outline" size={26} color="#FFFFFF" />
          <Text style={styles.headerText}>Riwayat Pasien</Text>
        </View>
      </View>

      {/* ===== CONTENT ===== */}
      <View style={styles.content}>
        <Text style={styles.month}>September</Text>

        <RiwayatCard
          poli="Poli Umum"
          date="23 September 2024"
        />

        <RiwayatCard
          poli="Poli Gigi"
          date="20 September 2024"
        />
      </View>
    </SafeAreaView>
  );
}

/* ===== CARD COMPONENT ===== */
function RiwayatCard({ poli, date }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{poli}</Text>
      <Text style={styles.cardDate}>{date}</Text>
    </View>
  );
}

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF3FF",
  },

  /* HEADER */
  header: {
    backgroundColor: "#B983FF",
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
    paddingTop: 20,
  },

  month: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    color: "#000000",
  },

  /* CARD */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
  },

  cardDate: {
    fontSize: 12,
    color: "#888888",
    marginTop: 4,
  },
});
