import { router, useLocalSearchParams } from "expo-router";
import { deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { db } from "../../firebaseConfig";
import { schoolTheme } from "../../theme/schoolTheme";

export default function TeamDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [team, setTeam] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  /* 🔥 Subscribe to single team */
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "teams", id), (snapshot) => {
      const data = snapshot.data();
      if (!data) return;

      setTeam(data);
      setName(data.name);
    });

    return unsub;
  }, [id]);

  /* ------------------- */
  /* UPDATE TEAM */
  /* ------------------- */
  const handleSave = async () => {
    await updateDoc(doc(db, "teams", id), {
      name,
    });

    setEditing(false);
  };

  /* ------------------- */
  /* DELETE TEAM */
  /* ------------------- */
  const handleDelete = () => {
    Alert.alert(
      "Delete Team",
      "Are you sure you want to delete this team?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteDoc(doc(db, "teams", id));
            router.back();
          },
        },
      ]
    );
  };

  if (!team) return null;

  return (
    <View style={styles.container}>
      {editing ? (
        <>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <Pressable style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.btnText}>Save</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.title}>{team.name}</Text>

          <Pressable
            style={styles.editBtn}
            onPress={() => setEditing(true)}
          >
            <Text style={styles.btnText}>Edit</Text>
          </Pressable>
        </>
      )}

      <Pressable style={styles.deleteBtn} onPress={handleDelete}>
        <Text style={styles.btnText}>Delete Team</Text>
      </Pressable>
    </View>
  );
}

/* ------------------- */
/* STYLES */
/* ------------------- */

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
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  editBtn: {
    backgroundColor: "#0E3A5D",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: schoolTheme.colors.accent,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteBtn: {
    backgroundColor: "#C0392B",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
