import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { db } from "../../firebaseConfig";
import { useTeams } from "../../hooks/useTeams";

export default function FixtureDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const teams = useTeams();

  const [game, setGame] = useState<any>(null);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");

  const getTeamName = (teamId: string) =>
    teams.find(t => t.id === teamId)?.name || "Unknown";

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "games", id as string));
      const data = snap.data();

      setGame(data);
      setHomeScore(String(data?.homeScore ?? ""));
      setAwayScore(String(data?.awayScore ?? ""));
    };

    load();
  }, []);

  const saveScores = async () => {
    await updateDoc(doc(db, "games", id as string), {
      homeScore: Number(homeScore),
      awayScore: Number(awayScore),
      status: "finished",
    });

    router.back();
  };

  if (!game) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {getTeamName(game.homeTeamId)} vs {getTeamName(game.awayTeamId)}
      </Text>

      <TextInput
        placeholder="Home Score"
        keyboardType="numeric"
        value={homeScore}
        onChangeText={setHomeScore}
        style={styles.input}
      />

      <TextInput
        placeholder="Away Score"
        keyboardType="numeric"
        value={awayScore}
        onChangeText={setAwayScore}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={saveScores}>
        <Text style={styles.buttonText}>Save Result</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#10B981",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
