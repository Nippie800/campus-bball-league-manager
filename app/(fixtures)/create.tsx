import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

import { db } from "../../firebaseConfig";
import { useTeams } from "../../hooks/useTeams";
import { schoolTheme } from "../../theme/schoolTheme";

export default function CreateFixture() {
  const router = useRouter();
  const teams = useTeams();

  const [homeTeamId, setHomeTeamId] = useState("");
  const [awayTeamId, setAwayTeamId] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [location, setLocation] = useState("");

  /* ============================= */
  /* SAVE FIXTURE */
  /* ============================= */
  const handleSave = async () => {
    if (!homeTeamId || !awayTeamId) {
      alert("Select both teams");
      return;
    }

    if (homeTeamId === awayTeamId) {
      alert("A team cannot play itself");
      return;
    }

    await addDoc(collection(db, "games"), {
      homeTeamId,
      awayTeamId,
      location,
      date,
      homeScore: 0,
      awayScore: 0,
      status: "scheduled",
      createdAt: new Date(),
    });

    router.back();
  };

  /* ============================= */
  /* UI */
  /* ============================= */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Fixture</Text>

      {/* ================= HOME ================= */}
      <Text style={styles.label}>Home Team</Text>
      <Picker
        selectedValue={homeTeamId}
        onValueChange={setHomeTeamId}
        style={styles.picker}
      >
        <Picker.Item label="Select team..." value="" />
        {teams.map((team: any) => (
          <Picker.Item key={team.id} label={team.name} value={team.id} />
        ))}
      </Picker>

      {/* ================= AWAY ================= */}
      <Text style={styles.label}>Away Team</Text>
      <Picker
        selectedValue={awayTeamId}
        onValueChange={setAwayTeamId}
        style={styles.picker}
      >
        <Picker.Item label="Select team..." value="" />
        {teams.map((team: any) => (
          <Picker.Item key={team.id} label={team.name} value={team.id} />
        ))}
      </Picker>

      {/* ================= LOCATION ================= */}
      <Text style={styles.label}>Location</Text>
      <TextInput
        placeholder="Gym / Court name"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      {/* ================= DATE ================= */}
      <Text style={styles.label}>Game Date</Text>

      {Platform.OS === "web" ? (
        /* WEB → native browser calendar */
        <TextInput
          style={styles.input}
          value={date.toISOString().split("T")[0]}
          onChange={(e: any) => setDate(new Date(e.target.value))}
          {...({ type: "date" } as any)}   // 🔥 fix TS error
        />
      ) : (
        /* MOBILE → native picker */
        <>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowPicker(true)}
          >
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={(e, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}
        </>
      )}

      {/* ================= SAVE ================= */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Fixture</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ============================= */
/* STYLES */
/* ============================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: schoolTheme.colors.background,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: schoolTheme.colors.textPrimary,
  },

  label: {
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },

  picker: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  dateButton: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
  },

  button: {
    backgroundColor: schoolTheme.colors.accent,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
