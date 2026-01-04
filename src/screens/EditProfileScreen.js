import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await AsyncStorage.getItem("currentUser");
    if (data) {
      const parsed = JSON.parse(data);
      setUser(parsed);
      setName(parsed.name);
      setPhoto(parsed.photo || null);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const saveProfile = async () => {
    const updatedUser = {
      ...user,
      name,
      photo,
    };

    await AsyncStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#1F5BFF" />
        </TouchableOpacity>

        <Text style={styles.title}>Edit Profile</Text>

        {/* Spacer agar title tetap center */}
        <View style={{ width: 26 }} />
      </View>

      {/* AVATAR */}
      <View style={styles.avatarWrapper}>
        <Image
          source={
            photo ? { uri: photo } : require("../../assets/image.png")
          }
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.camera} onPress={pickImage}>
          <Ionicons name="camera" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <LabelInput label="Nama Lengkap" value={name} onChange={setName} />
        <ReadOnly label="Phone Number" value={user?.phone} />
        <ReadOnly label="Email" value={user?.email} />
        <ReadOnly label="Date Of Birth" value={user?.dateOfBirth} />
      </View>

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ===== COMPONENTS ===== */
function LabelInput({ label, value, onChange }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
      />
    </>
  );
}

function ReadOnly({ label, value }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.readOnly}>
        <Text style={{ color: "#6B7CFF" }}>{value}</Text>
      </View>
    </>
  );
}

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF3FF", padding: 20 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    marginVertical: 30,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F5BFF",
  },

  avatarWrapper: { alignItems: "center", marginBottom: 30 },
  avatar: { width: 110, height: 110, borderRadius: 55 },

  camera: {
    position: "absolute",
    bottom: 0,
    right: "40%",
    backgroundColor: "#1F5BFF",
    padding: 8,
    borderRadius: 20,
  },

  form: { marginTop: 10 },
  label: { fontSize: 13, marginBottom: 6, marginTop: 14 },

  input: {
    backgroundColor: "#EEF3FF",
    borderRadius: 12,
    padding: 14,
  },

  readOnly: {
    backgroundColor: "#EEF3FF",
    borderRadius: 12,
    padding: 14,
  },

  button: {
    backgroundColor: "#1F5BFF",
    padding: 14,
    borderRadius: 30,
    marginTop: 30,
    alignItems: "center",
  },

  buttonText: { color: "#FFF", fontWeight: "600" },
});
