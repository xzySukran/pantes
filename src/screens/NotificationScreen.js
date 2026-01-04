import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";
import { useContext, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { useFonts } from "expo-font";

const TAB_HEIGHT = Platform.OS === "android" ? 80 : 90;

const formatTime = (timestamp) => {
  const now = Date.now();
  const diff = Math.floor((now - timestamp) / 1000);

  if (diff < 60) return "Baru saja";

  if (diff < 3600) {
    return `${Math.floor(diff / 60)} menit lalu`;
  }

  if (diff < 86400) {
    return `${Math.floor(diff / 3600)} jam lalu`;
  }

  const date = new Date(timestamp);
  return (
    date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    " • " +
    date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};

export default function NotificationScreen() {
  const { notifications, markAllAsRead } =
    useContext(NotificationContext);

  useEffect(() => {
    markAllAsRead && markAllAsRead();
  }, []);
  const [fontsLoaded] = useFonts({
    "Lobster-Regular": require("../../assets/Lobster-Regular.ttf"),
    "Cormorant-Italic": require("../../assets/Cormorant-Italic.ttf"),
    "Inter-Italic": require("../../assets/Inter_28pt-Italic.ttf"),
    "NotoSans-Light": require("../../assets/NotoSans-Light.ttf"),
  });

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.item,
        item.read && styles.readItem,
      ]}
    >
      {!item.read && <View style={styles.dot} />}

      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemMessage}>{item.message}</Text>

        <Text style={styles.itemTime}>
          {formatTime(item.createdAt)}
        </Text>
      </View>
    </View>
  );
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
    <View style={styles.container}>
      <Text style={styles.header}>Notifikasi</Text>

      <View style={{ height: 20 }} />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: TAB_HEIGHT + 20,
        }}
        contentInset={{ bottom: TAB_HEIGHT }}
        contentInsetAdjustmentBehavior="automatic"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FF",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 24 : 50,
  },

  header: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    color: "#1F5BFF",
    paddingVertical: 30,
  },

  item: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E6FF",
  },

  readItem: {
    opacity: 0.6,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
    marginRight: 10,
    marginTop: 6,
  },

  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F5BFF",
  },

  itemMessage: {
    fontSize: 12,
    color: "#555",
    marginTop: 2,
  },

  itemTime: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
    alignSelf: "flex-end",
  },
});
