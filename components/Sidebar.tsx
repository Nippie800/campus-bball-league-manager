import { Pressable, StyleSheet, Text, View } from "react-native";
import { logout } from "../services/auth";
import { schoolTheme } from "../theme/schoolTheme";

export default function Sidebar() {
  return (
    <View style={styles.sidebar}>
      <Text style={styles.logo}>U Emeris</Text>

      {["Dashboard", "Teams", "Fixtures", "Results", "Standings"].map(item => (
        <Text key={item} style={styles.link}>{item}</Text>
      ))}

      <Pressable onPress={logout}>
        <Text style={styles.logout}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 90,
    backgroundColor: schoolTheme.colors.secondary,
    paddingTop: 30,
    alignItems: "center",
  },
  logo: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 30,
  },
  link: {
    color: "#C4D6E5",
    marginVertical: 12,
    fontSize: 12,
  },
  logout: {
    color: "#E57373",
    marginTop: "auto",
    marginBottom: 20,
    fontSize: 12,
  },
});
