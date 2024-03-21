import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  containerHeader: { paddingHorizontal: 10, paddingBottom: 15, gap: 10 },
  buttonsHeader: { flexDirection: "row", justifyContent: "space-between" },
  partHeader: { flexDirection: "row", gap: 4 },
  buttonHeader: {
    borderRadius: 5,
    padding: 4,
    paddingHorizontal: 8,
  },
  containerItem: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    gap: 10,
    paddingTop: 50,
    overflow: "hidden",
  },
  containerInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffffe6",
    padding: 6,
  },
  partItem: {
    flex: 1,
    gap: 5,
  },
  titleItem: { textTransform: "uppercase" },
  subTitle: { fontWeight: "bold" },
});
