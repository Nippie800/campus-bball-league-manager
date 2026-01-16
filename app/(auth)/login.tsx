import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { login } from "../../services/auth";
import { schoolTheme } from "../../theme/schoolTheme";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LinearGradient
      colors={["#0A2342", "#0E3A5D"]}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Enjoy your time on our campus league management system.
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#AFC4D6"
          style={styles.input}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#AFC4D6"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />

        <Pressable style={styles.button} onPress={() => login(email, password)}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Text style={styles.link}>Don't have an account? Contact Us</Text>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 320,
    padding: 24,
    borderRadius: 20,
    backgroundColor: schoolTheme.colors.card,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    color: "#B0C4D4",
    fontSize: 12,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#174A6D",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    marginBottom: 12,
  },
  button: {
    backgroundColor: schoolTheme.colors.accent,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  link: {
    color: "#AFC4D6",
    fontSize: 11,
    textAlign: "center",
    marginTop: 12,
  },
});
