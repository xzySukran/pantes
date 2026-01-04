import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

export default function KonsultasiScreen({ navigation }) {
  const [message, setMessage] = useState("");
  const [fontsLoaded] = useFonts({
    "Lobster-Regular": require("../../assets/Lobster-Regular.ttf"),
    "Cormorant-Italic": require("../../assets/Cormorant-Italic.ttf"),
    "Inter-Italic": require("../../assets/Inter_28pt-Italic.ttf"),
    "NotoSans-Light": require("../../assets/NotoSans-Light.ttf"),
  });
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Halo, saya ingin bertanya mengenai gejala yang saya alami selama 2 hari ini.",
      sender: "user",
      time: "09:00",
    },
    {
      id: "2",
      text: "Halo 👋, bisa dijelaskan lebih detail keluhannya?",
      sender: "doctor",
      time: "09:01",
    },
    {
      id: "3",
      text: "Selama 2 hari ini tenggorokan saya sakit dan badan terasa lemas.",
      sender: "user",
      time: "09:43",
    },
    {
      id: "4",
      text: "Gejala tersebut mengarah ke infeksi ringan. Disarankan istirahat cukup dan minum air hangat.",
      sender: "doctor",
      time: "09:45",
    },
  ]);

  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      time: "09:50",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
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
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={26}
            color="#FFFFFF"
          />
          <Text style={styles.headerText}>Konsultasi</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        {/* ===== CHAT ===== */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          contentContainerStyle={styles.chatContainer}
          renderItem={({ item }) => (
            <ChatBubble
              text={item.text}
              time={item.time}
              sender={item.sender}
            />
          )}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        <Text style={styles.typing}>Perawat sedang mengetik...</Text>

        {/* ===== INPUT ===== */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Ketik disini..."
            style={styles.input}
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ===== CHAT BUBBLE ===== */
function ChatBubble({ text, time, sender }) {
  const isUser = sender === "user";

  return (
    <View
      style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.doctorBubble,
      ]}
    >
      <Text style={styles.bubbleText}>{text}</Text>
      <Text style={styles.time}>{time}</Text>
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
    backgroundColor: "#5B8CFF",
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

  /* CHAT */
  chatContainer: {
    padding: 20,
    paddingBottom: 10,
  },

  bubble: {
    maxWidth: "75%",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
  },

  userBubble: {
    backgroundColor: "#DDE6FF",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },

  doctorBubble: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },

  bubbleText: {
    fontSize: 13,
    color: "#000",
  },

  time: {
    fontSize: 10,
    color: "#888",
    marginTop: 6,
    alignSelf: "flex-end",
  },

  typing: {
    fontSize: 11,
    color: "#3A6BFF",
    marginLeft: 20,
    marginBottom: 6,
  },

  /* INPUT */
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingBottom: 150, // 🔥 tidak ketutup tab
    backgroundColor: "#FFFFFF",
  },

  input: {
    flex: 1,
    backgroundColor: "#F1F3F6",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 13,
  },

  sendButton: {
    marginLeft: 10,
    backgroundColor: "#3A6BFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
