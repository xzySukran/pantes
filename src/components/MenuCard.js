import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MenuItem({ title, icon, color, onPress }) {
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


const styles = StyleSheet.create({
  card: {
    width: "48%",
    height: 110,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#FFFFFF",
    marginTop: 10,
    fontSize: 13,
    textAlign: "center",
  },
});
