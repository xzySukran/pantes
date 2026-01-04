import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace("Landing");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/logo.png")}
        style={[styles.logo, { opacity: fadeAnim }]}
      />

      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>Medicare</Text>
        <Text style={styles.subtitle}>Klinik Harmoni</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8FA8FF", // biru seperti gambar
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 4,
  },
});
