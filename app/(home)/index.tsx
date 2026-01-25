import { StyleSheet, Text, View } from "react-native";
import { useGames } from "../../hooks/useGames";
import { useTeams } from "../../hooks/useTeams";
import { schoolTheme } from "../../theme/schoolTheme";

export default function Dashboard() {
  const teams = useTeams();
  const games = useGames();

  const finishedGames = games.filter(g => g.status === "finished").length;
  const upcomingGames = games.filter(g => g.status === "scheduled").length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.grid}>
        <StatCard label="Teams" value={teams.length} />
        <StatCard label="Fixtures" value={games.length} />
        <StatCard label="Completed" value={finishedGames} />
        <StatCard label="Upcoming" value={upcomingGames} />
      </View>
    </View>
  );
}

/* Small reusable stat card */
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: schoolTheme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: schoolTheme.colors.textPrimary,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    alignItems: "center",
  },
  value: {
    fontSize: 28,
    fontWeight: "700",
    color: "#08263F",
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: "#6B7280",
  },
});
