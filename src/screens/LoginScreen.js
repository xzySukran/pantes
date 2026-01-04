import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fontsLoaded] = useFonts({
    "Lobster-Regular": require("../../assets/Lobster-Regular.ttf"),
    "Cormorant-Italic": require("../../assets/Cormorant-Italic.ttf"),
    "Inter-Italic": require("../../assets/Inter_28pt-Italic.ttf"),
    "NotoSans-Light": require("../../assets/NotoSans-Light.ttf"),
  });
  

  const handleLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("userData");

      if (!storedUser) {
        Alert.alert("Gagal", "User belum terdaftar");
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      if (
        email.trim() === parsedUser.email &&
        password === parsedUser.password
      ) {
        // simpan status login
        await AsyncStorage.setItem("isLogin", "true");
        await AsyncStorage.setItem(
          "currentUser",
          JSON.stringify(parsedUser)
        );

        // masuk ke home
        navigation.replace("MainTabs");
      } else {
        Alert.alert("Gagal", "Email atau password salah");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Terjadi kesalahan");
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
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#1F5BFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log In</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* WELCOME */}
      <Text style={styles.welcome}>Welcome</Text>

      {/* EMAIL */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#8FA8FF"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* PASSWORD */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#8FA8FF"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#8FA8FF"
          />
        </TouchableOpacity>
      </View>

      {/* LOGIN BUTTON */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      {/* DIVIDER */}
      <Text style={styles.orText}>atau sign up dengan</Text>

      {/* GOOGLE */}
      <TouchableOpacity style={styles.googleButton}>
        <Ionicons name="logo-google" size={22} color="#1F5BFF" />
      </TouchableOpacity>

      {/* SIGN UP */}
      <Text style={styles.signupText}>
        Belum memiliki akun?{" "}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate("Signup")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF3FF",
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F5BFF",
  },

  welcome: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1F5BFF",
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    color: "#000",
    marginBottom: 6,
    marginTop: 14,
  },

  input: {
    backgroundColor: "#EEF3FF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1F5BFF",
  },

  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF3FF",
    borderRadius: 12,
    paddingHorizontal: 14,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1F5BFF",
  },

  loginButton: {
    backgroundColor: "#6BA6D6",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },

  loginText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  orText: {
    textAlign: "center",
    color: "#8A8A8A",
    marginVertical: 18,
    fontSize: 12,
  },

  googleButton: {
    alignSelf: "center",
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#CFDAFF",
    alignItems: "center",
    justifyContent: "center",
  },

  signupText: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 12,
    color: "#8A8A8A",
  },

  signupLink: {
    color: "#1F5BFF",
    fontWeight: "600",
  },
});
