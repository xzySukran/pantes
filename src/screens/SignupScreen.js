import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFonts } from "expo-font";

export default function SignupScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [fontsLoaded] = useFonts({
    "Lobster-Regular": require("../../assets/Lobster-Regular.ttf"),
    "Cormorant-Italic": require("../../assets/Cormorant-Italic.ttf"),
    "Inter-Italic": require("../../assets/Inter_28pt-Italic.ttf"),
    "NotoSans-Light": require("../../assets/NotoSans-Light.ttf"),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date) => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !phone) {
      alert("Lengkapi semua data");
      return;
    }

    const userData = {
      name,
      email,
      password,
      phone,
      dateOfBirth: formatDate(date),
    };

    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      alert("Signup berhasil");
      navigation.goBack();
    } catch (error) {
      console.log(error);
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#1F5BFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Full name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#8FA8FF"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#8FA8FF"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#8FA8FF"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#8FA8FF"
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor="#8FA8FF"
        />

        <Text style={styles.label}>Date Of Birth</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: "#1F5BFF" }}>
            {formatDate(date)}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        sudah memiliki akun?{" "}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.goBack()}
        >
          Log in
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#1F5BFF" },
  form: { marginTop: 10 },
  label: { fontSize: 14, marginTop: 14, marginBottom: 6 },
  input: {
    backgroundColor: "#EEF3FF",
    borderRadius: 12,
    padding: 14,
    color: "#1F5BFF",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF3FF",
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  passwordInput: { flex: 1, paddingVertical: 12, color: "#1F5BFF" },
  signupButton: {
    backgroundColor: "#CFDAFF",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },
  signupText: { color: "#1F5BFF", fontWeight: "600", fontSize: 16 },
  loginText: { textAlign: "center", marginTop: 24, fontSize: 12 },
  loginLink: { color: "#1F5BFF", fontWeight: "600" },
});
