import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useContext, useState } from "react";
import LottieView from "lottie-react-native";
import { NotificationContext } from "../context/NotificationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";


const POLI_LIST = ["Poli Umum", "Poli Gigi", "Poli Anak"];
const JAM_LIST = ["09.00 - 09.15", "09.15 - 09.30"];

export default function DateScreen({ navigation }) {
  const { addNotification } = useContext(NotificationContext);

  const [selectedDate, setSelectedDate] = useState(null);
  const [poli, setPoli] = useState("Pilih Poli");
  const [jam, setJam] = useState("Pilih Jam");
  const [keluhan, setKeluhan] = useState("");
  const [layanan, setLayanan] = useState("online");

  const [showPoli, setShowPoli] = useState(false);
  const [showJam, setShowJam] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fontsLoaded] = useFonts({
    "Lobster-Regular": require("../../assets/Lobster-Regular.ttf"),
    "Cormorant-Italic": require("../../assets/Cormorant-Italic.ttf"),
    "Inter-Italic": require("../../assets/Inter_28pt-Italic.ttf"),
    "NotoSans-Light": require("../../assets/NotoSans-Light.ttf"),
  });

  const handleBooking = async () => {
  const bookingData = {
    date: selectedDate,
    poli,
    jam,
    layanan,
    createdAt: Date.now(),
    queueNumber:
      layanan === "online"
        ? Math.floor(Math.random() * 50) + 1
        : null,
  };

  await AsyncStorage.setItem(
    "currentBooking",
    JSON.stringify(bookingData)
  );

  setSuccess(true);

  addNotification(
    "booking",
    "Booking Berhasil",
    "Jadwal berobat Anda telah berhasil dibuat."
  );

  if (layanan === "online") {
    setTimeout(() => {
      addNotification(
        "queue_near",
        "Antrian Anda Sudah Dekat",
        "Mohon bersiap, antrian Anda akan segera dipanggil."
      );
    }, 4000);

    setTimeout(() => {
      addNotification(
        "queue_now",
        "Giliran Anda Sekarang",
        "Silakan masuk untuk melakukan pemeriksaan."
      );
    }, 8000);
  }

  if (layanan === "klinik") {
    setTimeout(() => {
      addNotification(
        "clinic",
        "Jadwal Berobat Hari Ini",
        "Silakan datang ke klinik sesuai jadwal."
      );
    }, 5000);
  }

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

};

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Daftar Berobat</Text>

        <View style={{ height: 15 }} />

        <View style={styles.card}>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: "#1F5BFF" },
            }}
            theme={{
              todayTextColor: "#1F5BFF",
              arrowColor: "#1F5BFF",
            }}
          />
        </View>


        <View style={styles.card}>
          <Text style={styles.label}>Jenis Layanan</Text>

          <View style={styles.row}>
            {["online", "klinik"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.serviceBtn,
                  layanan === item && styles.serviceActive,
                ]}
                onPress={() => setLayanan(item)}
              >
                <Text
                  style={{
                    color: layanan === item ? "#1F5BFF" : "#555",
                    fontWeight: layanan === item ? "600" : "400",
                  }}
                >
                  {item === "online" ? "Online" : "Ke Klinik"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Pilih Poli</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowPoli(true)}
          >
            <Text>{poli}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Pilih Jam</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowJam(true)}
          >
            <Text>{jam}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Keluhan</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Tuliskan keluhan Anda..."
            multiline
            value={keluhan}
            onChangeText={setKeluhan}
          />

          <TouchableOpacity style={styles.button} onPress={handleBooking}>
            <Text style={styles.buttonText}>Booking Sekarang</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {success && (
        <View style={styles.successOverlay}>
          <LottieView
            source={require("../../assets/success.json")}
            autoPlay
            loop={false}
            style={{ width: 180, height: 180 }}
          />
          <Text style={styles.successTitle}>Booking Berhasil </Text>
          <TouchableOpacity
            style={styles.successButton}
            onPress={() => {
              setSuccess(false);
              navigation.navigate("Home");
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Ke Home
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={showPoli} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {POLI_LIST.map((p) => (
              <TouchableOpacity
                key={p}
                style={styles.modalItem}
                onPress={() => {
                  setPoli(p);
                  setShowPoli(false);
                }}
              >
                <Text>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Modal visible={showJam} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {JAM_LIST.map((j) => (
              <TouchableOpacity
                key={j}
                style={styles.modalItem}
                onPress={() => {
                  setJam(j);
                  setShowJam(false);
                }}
              >
                <Text>{j}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF3FF",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  header: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1F5BFF",
    textAlign: "center",
    paddingVertical: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    color: "#1F5BFF",
    marginTop: 12,
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#F3F6FF",
    padding: 12,
    borderRadius: 10,
  },

  textArea: {
    backgroundColor: "#F3F6FF",
    height: 90,
    borderRadius: 10,
    padding: 12,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#1F5BFF",
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 6,
  },

  serviceBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#F3F6FF",
    alignItems: "center",
  },

  serviceActive: {
    backgroundColor: "#DCE5FF",
  },

  successOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  successTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F5BFF",
    marginVertical: 20,
  },

  successButton: {
    backgroundColor: "#1F5BFF",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 30,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 14,
  },

  modalItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
});
