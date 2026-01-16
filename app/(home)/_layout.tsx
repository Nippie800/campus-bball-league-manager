import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import Sidebar from "../../components/Sidebar";

export default function HomeLayout() {
  return (
    <View style={styles.container}>
      <Sidebar />
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#0E3A5D",
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
