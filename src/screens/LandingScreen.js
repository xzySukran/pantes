import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Medicare</Text>
      <Text style={styles.subtitle}>Klinik Harmoni</Text>

      <Text style={styles.tagline}>
        Janjian Sehat, Lebih Cepat.
      </Text>

      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF3FF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  logo: {
    width: 220,
    height: 220,
    marginBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F5BFF",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#1F5BFF",
    marginBottom: 20,
  },

  tagline: {
    fontSize: 12,
    color: "#8A8A8A",
    marginBottom: 40,
  },

  loginButton: {
    width: "100%",
    backgroundColor: "#6BA6D6",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 16,
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  signupButton: {
    width: "100%",
    backgroundColor: "#CFDAFF",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  signupText: {
    color: "#1F5BFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
