import { Text, View } from "react-native";
import { useTeams } from "../../hooks/useTeams";

export default function Dashboard() {
  const teams = useTeams(); // ✅ inside component

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ color: "#fff", fontSize: 22 }}>
        Welcome, Sandton Campus
      </Text>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 12,
          marginTop: 20,
        }}
      >
        <Text>Total Teams</Text>
        <Text style={{ fontSize: 24 }}>{teams.length}</Text>
      </View>
    </View>
  );
}
