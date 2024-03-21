import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { gap: 4, backgroundColor: "white", padding: 5, borderRadius: 8 },
  main: { flexDirection: "row", justifyContent: "space-between" },
  mainTitle: {
    fontSize: 18,
  },
  mainValue: {
    fontSize: 18,
  },
  other: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
