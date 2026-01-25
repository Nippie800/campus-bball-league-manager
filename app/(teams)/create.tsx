import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../../firebaseConfig";
import { createTeam } from "../../services/teams";
import { schoolTheme } from "../../theme/schoolTheme";

export default function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      alert("Please enter a team name");
      return;
    }

    if (!auth.currentUser) return;

    try {
      setLoading(true);

      await createTeam(
        teamName,
        "sandton-campus", // later: dynamic from user profile
        auth.currentUser.uid
      );

      router.replace("../teams");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Team</Text>
      <Text style={styles.subtitle}>
        Start a new basketball team for your campus
      </Text>

      <TextInput
        placeholder="Team Name"
        placeholderTextColor="#AFC4D6"
        value={teamName}
        onChangeText={setTeamName}
        style={styles.input}
      />

      <Pressable
        onPress={handleCreateTeam}
        style={styles.button}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating..." : "Create Team"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: schoolTheme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    color: "#B0C4D4",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#174A6D",
    borderRadius: 12,
    padding: 14,
    color: "#fff",
    marginBottom: 16,
  },
  button: {
    backgroundColor: schoolTheme.colors.accent,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
