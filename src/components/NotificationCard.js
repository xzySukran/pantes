import { View, Text, FlatList, StyleSheet } from "react-native";
import { useContext, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext";

export default function NotificationScreen() {
  const { notifications, markAllAsRead } =
    useContext(NotificationContext);

  useEffect(() => {
    markAllAsRead && markAllAsRead();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemMessage}>{item.message}</Text>
      <Text style={styles.itemTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* JUDUL */}
      <Text style={styles.title}>Notifikasi</Text>

      {/* JARAK ANTARA JUDUL & NOTIFIKASI */}
      <View style={{ height: 20 }} />

      {/* LABEL HARI */}
      <Text style={styles.sectionLabel}>Hari Ini</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FF",
    paddingHorizontal: 16,
    paddingTop: 50,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#1F5BFF",
  },

  sectionLabel: {
    alignSelf: "flex-start",
    backgroundColor: "#E5ECFF",
    color: "#1F5BFF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    marginBottom: 10,
  },

  item: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E6FF",
  },

  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F5BFF",
    marginBottom: 4,
  },

  itemMessage: {
    fontSize: 12,
    color: "#555",
    marginBottom: 4,
  },

  itemTime: {
    fontSize: 10,
    color: "#999",
    textAlign: "right",
  },
});
