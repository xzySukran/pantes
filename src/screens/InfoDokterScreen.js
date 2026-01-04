import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const DATA = {
  umum: [
    {
      id: "u1",
      name: "dr. Mistar Wijaya",
      exp: "15 tahun pengalaman",
      hospital: "RSUD Arifin Achmad",
      schedule: "Senin–Selasa, 09.00–12.00 WIB",
      photo: require("../../assets/dokterumum1.jpg"),
    },
    {
      id: "u2",
      name: "dr. Anton Dhanendra",
      exp: "10 tahun pengalaman",
      hospital: "Rumah Praktik Selasa–Rabu",
      schedule: "09.00–12.00 WIB & 16.00–19.00 WIB",
      photo: require("../../assets/dokterumum2.jpg"),
    },
    {
      id: "u3",
      name: "dr. Ani Lestari",
      exp: "12 tahun pengalaman",
      hospital: "Puskesmas Sukajadi",
      schedule: "Senin–Jumat, 09.00–12.00 WIB",
      photo: require("../../assets/dokterumum3.jpg"),
    },
  ],

  gigi: [
    {
      id: "g1",
      name: "drg. Rina Putri",
      exp: "8 tahun pengalaman",
      hospital: "Klinik Gigi Sehat",
      schedule: "Senin–Rabu, 10.00–14.00 WIB",
      photo: require("../../assets/doktergigi1.jpg"),
    },
    {
      id: "g2",
      name: "drg. Andi Pratama",
      exp: "11 tahun pengalaman",
      hospital: "RS Harapan",
      schedule: "Kamis–Sabtu, 09.00–13.00 WIB",
      photo: require("../../assets/doktergigi2.jpg"),
    },
    {
      id: "g3",
      name: "drg. Maya Sari",
      exp: "9 tahun pengalaman",
      hospital: "Smile Dental Care",
      schedule: "Senin–Jumat, 15.00–19.00 WIB",
      photo: require("../../assets/doktergigi3.jpg"),
    },
  ],

  anak: [
    {
      id: "a1",
      name: "dr. Budi Santoso, Sp.A",
      exp: "14 tahun pengalaman",
      hospital: "RS Ibu & Anak",
      schedule: "Senin–Kamis, 09.00–12.00 WIB",
      photo: require("../../assets/dokteranak1.jpg"),
    },
    {
      id: "a2",
      name: "dr. Nisa Rahma, Sp.A",
      exp: "10 tahun pengalaman",
      hospital: "Klinik Anak Ceria",
      schedule: "Selasa–Jumat, 10.00–14.00 WIB",
      photo: require("../../assets/dokteranak2.jpg"),
    },
    {
      id: "a3",
      name: "dr. Kevin Mahendra, Sp.A",
      exp: "12 tahun pengalaman",
      hospital: "RS Sejahtera",
      schedule: "Senin–Sabtu, 08.00–11.00 WIB",
      photo: require("../../assets/dokteranak3.jpg"),
    },
  ],
};

export default function InfoDokterScreen({ navigation }) {
  const [category, setCategory] = useState("umum");
  const [search, setSearch] = useState("");
  const [fontsLoaded] = useFonts({
    "Lobster-Regular": require("../../assets/Lobster-Regular.ttf"),
    "Cormorant-Italic": require("../../assets/Cormorant-Italic.ttf"),
    "Inter-Italic": require("../../assets/Inter_28pt-Italic.ttf"),
    "NotoSans-Light": require("../../assets/NotoSans-Light.ttf"),
  });

  const filteredData = DATA[category].filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
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
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <Ionicons name="person-circle-outline" size={26} color="#FFFFFF" />
          <Text style={styles.headerText}>Info Dokter</Text>
        </View>
      </View>

      {/* ===== SEARCH ===== */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#999" />
        <TextInput
          placeholder="Cari Nama Dokter"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* ===== FILTER ===== */}
      <View style={styles.filterRow}>
        <FilterButton
          title="Umum"
          active={category === "umum"}
          onPress={() => setCategory("umum")}
        />
        <FilterButton
          title="Poli Gigi"
          active={category === "gigi"}
          onPress={() => setCategory("gigi")}
        />
        <FilterButton
          title="Poli Anak"
          active={category === "anak"}
          onPress={() => setCategory("anak")}
        />
      </View>

      {/* ===== LIST ===== */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
        renderItem={({ item }) => <DoctorCard data={item} />}
      />
    </SafeAreaView>
  );
}

/* ===== FILTER BUTTON ===== */
function FilterButton({ title, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.filterBtn, active && styles.filterActive]}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

/* ===== DOCTOR CARD ===== */
function DoctorCard({ data }) {
  return (
    <View style={styles.card}>
      <Image source={data.photo} style={styles.avatar} />

      <View style={styles.cardContent}>
        <Text style={styles.name}>{data.name}</Text>

        <Text style={styles.sub}>
          <Text style={styles.label}>Spesialis: </Text>
          Dokter {data.name.includes("Sp.A") ? "Anak" : "Umum"}
        </Text>

        <Text style={styles.sub}>
          <Text style={styles.label}>Pengalaman: </Text>
          {data.exp}
        </Text>

        <Text style={styles.sub}>
          <Text style={styles.label}>Jadwal Praktik: </Text>
          {data.schedule}
        </Text>
      </View>
    </View>
  );
}

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF3FF",
  },

  header: {
    backgroundColor: "#7B9CFF",
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

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 20,
    paddingHorizontal: 14,
    borderRadius: 14,
  },

  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 13,
  },

  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },

  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#E0E7FF",
    marginRight: 10,
  },

  filterActive: {
    backgroundColor: "#3A6BFF",
  },

  filterText: {
    fontSize: 12,
    color: "#555",
  },

  filterTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 14,
  },

  cardContent: {
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F3C88",
    marginBottom: 4,
  },

  sub: {
    fontSize: 12,
    color: "#555",
    marginBottom: 2,
  },

  label: {
    fontWeight: "600",
    color: "#333",
  },
});
