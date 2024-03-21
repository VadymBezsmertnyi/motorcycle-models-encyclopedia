import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  imageBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.2,
  },
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
  containerList: {
    padding: 15,
    paddingTop: 20,
    gap: 10,
  },
});
