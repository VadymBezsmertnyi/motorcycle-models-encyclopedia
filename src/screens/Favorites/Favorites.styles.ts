import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  containerHeader: {
    paddingHorizontal: 10,
    paddingBottom: 15,
    gap: 10,
  },
  buttonsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonHeader: {
    borderRadius: 5,
    padding: 4,
    paddingHorizontal: 8,
  },
  titleHeader: {
    fontSize: 22,
    textTransform: "uppercase",
  },
  infoHeader: { fontSize: 12, color: "gray" },
});
