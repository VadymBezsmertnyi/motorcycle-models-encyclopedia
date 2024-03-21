import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  containerMain: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  line: { flexDirection: "row", justifyContent: "space-between" },
  titleLine: { fontSize: 16 },
  subTitleLine: { fontSize: 16, fontWeight: "bold" },
  button: {
    backgroundColor: "green",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  titleButton: {
    fontSize: 18,
    color: "white",
  },
});
