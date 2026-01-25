import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useGames } from "../../hooks/useGames";
import { useTeams } from "../../hooks/useTeams";
import { schoolTheme } from "../../theme/schoolTheme";

export default function FixturesScreen() {
  const games = useGames();
  const teams = useTeams();

  const getTeamName = (id: string) =>
    teams.find(t => t.id === id)?.name || "Unknown";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fixtures</Text>

      {/* Schedule button */}
      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/(fixtures)/create")}
      >
        <Text style={styles.addText}>+ Schedule Game</Text>
      </Pressable>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isFinished = item.status === "finished";

          return (
            <Pressable
              style={styles.card}
              onPress={() => router.push(`/(fixtures)/${item.id}`)}
            >
              <Text style={styles.match}>
                {getTeamName(item.homeTeamId)} vs {getTeamName(item.awayTeamId)}
              </Text>

              <Text style={styles.meta}>
                📍 {item.location}
              </Text>

              {isFinished ? (
                <Text style={styles.score}>
                  {item.homeScore} - {item.awayScore} (FINAL)
                </Text>
              ) : (
                <Text style={styles.scheduled}>Scheduled</Text>
              )}
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <Text style={{ color: "#9CA3AF", marginTop: 20 }}>
            No fixtures yet. Schedule your first game.
          </Text>
        }
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
    color: schoolTheme.colors.textPrimary,
  },
  addButton: {
    backgroundColor: schoolTheme.colors.accent,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  addText: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },
  match: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 6,
    color: "#08263F",
  },
  meta: {
    fontSize: 12,
    color: "#6B7280",
  },
  scheduled: {
    marginTop: 6,
    fontSize: 12,
    color: "#F59E0B",
    fontWeight: "600",
  },
  score: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "700",
    color: "#10B981",
  },
});
