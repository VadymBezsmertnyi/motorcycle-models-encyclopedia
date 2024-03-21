import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  imageBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.2,
  },
  containerMain: { flex: 1, padding: 20, paddingHorizontal: 15, gap: 10 },
  mainInfo: {
    alignItems: "center",
    gap: 5,
  },
  titleMainInfo: {
    fontSize: 18,
    fontWeight: "500",
  },
  subTitleMainInfo: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
