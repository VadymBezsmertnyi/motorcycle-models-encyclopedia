import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingBottom: 15,
    gap: 10,
  },
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
  titleHeader: {
    fontSize: 22,
    textTransform: "uppercase",
  },
  infoHeader: { fontSize: 12, color: "gray" },
  containerEmpty: { width: 50 },
  containerRight: { flexDirection: "row", alignItems: "center" },
});
