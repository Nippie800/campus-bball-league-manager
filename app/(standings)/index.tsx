import { FlatList, StyleSheet, Text, View } from "react-native";
import { useStandings } from "../../hooks/useStandings";
import { useTeams } from "../../hooks/useTeams";
import { schoolTheme } from "../../theme/schoolTheme";

export default function StandingsScreen() {
  const standings = useStandings();
  const teams = useTeams();

  const getTeamName = (id: string) =>
    teams.find(t => t.id === id)?.name || "Team";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Standings</Text>

      <View style={styles.headerRow}>
        <Text style={styles.rank}>#</Text>
        <Text style={styles.name}>Team</Text>
        <Text style={styles.stat}>P</Text>
        <Text style={styles.stat}>W</Text>
        <Text style={styles.stat}>L</Text>
        <Text style={styles.stat}>Pts</Text>
      </View>

      <FlatList
        data={standings}
        keyExtractor={item => item.teamId}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.name}>{getTeamName(item.teamId)}</Text>
            <Text style={styles.stat}>{item.played}</Text>
            <Text style={styles.stat}>{item.wins}</Text>
            <Text style={styles.stat}>{item.losses}</Text>
            <Text style={styles.stat}>{item.points}</Text>
          </View>
        )}
      />
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
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#fff",
  },

  headerRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },

  row: {
    flexDirection: "row",
    paddingVertical: 12,
    backgroundColor: "#fff",
    marginBottom: 6,
    borderRadius: 10,
    paddingHorizontal: 8,
  },

  rank: { width: 24, fontWeight: "700" },
  name: { flex: 1 },
  stat: { width: 30, textAlign: "center" },
});
