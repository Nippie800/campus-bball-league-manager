import { Href, router, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { schoolTheme } from "../theme/schoolTheme";

const menuItems: { label: string; route: Href }[] = [
  { label: "Dashboard", route: "/" },
  { label: "Teams", route: "/(teams)" },
  //{ label: "Fixtures", route: "/fixtures" },
  //{ label: "Results", route: "/results" },
  //{ label: "Standings", route: "/standings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <View style={styles.sidebar}>
      <Text style={styles.logo}>U Emeris</Text>

      {menuItems.map(item => {
        const isActive = pathname === item.route;

        return (
          <Pressable
            key={item.label}
            onPress={() => router.push(item.route)}
            style={[
              styles.menuItem,
              isActive && styles.activeItem,
            ]}
          >
            <Text
              style={[
                styles.menuText,
                isActive && styles.activeText,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 220,
    backgroundColor: "#08263F",
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  logo: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 30,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  activeItem: {
    backgroundColor: schoolTheme.colors.accent,
  },
  menuText: {
    color: "#B0C4D4",
    fontSize: 14,
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
});
