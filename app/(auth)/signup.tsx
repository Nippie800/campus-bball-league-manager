import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { signup } from "../../services/auth";
import { schoolTheme } from "../../theme/schoolTheme";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await signup(email, password);
      router.replace("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <LinearGradient
      colors={["#0A2342", "#0E3A5D"]}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Register to access your campus basketball league.
        </Text>

        <TextInput
          placeholder="School Email"
          placeholderTextColor="#AFC4D6"
          style={styles.input}
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#AFC4D6"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#AFC4D6"
          secureTextEntry
          style={styles.input}
          onChangeText={setConfirmPassword}
        />

        <Pressable style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </Pressable>
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
    width: 340,
    padding: 26,
    borderRadius: 22,
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
    marginBottom: 22,
  },
  input: {
    backgroundColor: "#174A6D",
    borderRadius: 12,
    padding: 14,
    color: "#fff",
    marginBottom: 14,
  },
  button: {
    backgroundColor: schoolTheme.colors.accent,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  link: {
    color: "#AFC4D6",
    fontSize: 11,
    textAlign: "center",
    marginTop: 14,
  },
});
