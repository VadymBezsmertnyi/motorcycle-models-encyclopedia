import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  containerHeader: { paddingHorizontal: 10, paddingBottom: 15, gap: 10 },
  buttonsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  partHeader: { flexDirection: "row", gap: 4 },
  buttonHeader: {
    borderRadius: 5,
    padding: 4,
    paddingHorizontal: 8,
  },
  infoHeader: { fontSize: 12, color: "gray" },
});
