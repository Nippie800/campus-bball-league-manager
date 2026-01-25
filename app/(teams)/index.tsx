import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useTeams } from "../../hooks/useTeams";
import { schoolTheme } from "../../theme/schoolTheme";

export default function TeamsScreen() {
  const teams = useTeams(); // ✅ real data

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teams</Text>

      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/(teams)/${item.id}`)}
          >
            <Text style={styles.teamName}>{item.name}</Text>
            <Text style={styles.meta}>{item.division}</Text>
            <Text style={styles.meta}>Coach: {item.coach}</Text>
          </Pressable>
        )}
      />
      <Pressable
  style={styles.fab}
  onPress={() => router.push("/(teams)/create")}
>
  <Text style={{ color: "#fff", fontSize: 26 }}>＋</Text>
</Pressable>

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
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    elevation: 2,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: "#08263F",
  },
  meta: {
    fontSize: 12,
    color: "#6B7280",
  },
  fab: {
  position: "absolute",
  bottom: 30,
  right: 20,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: schoolTheme.colors.accent,
  justifyContent: "center",
  alignItems: "center",
  elevation: 5,
},

});
