import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    backgroundColor: "#b1bd67e3",
    padding: 6,
  },
  partItem: {
    flex: 1,
    gap: 5,
  },
  titleItem: { textTransform: "uppercase" },
  subTitle: { fontWeight: "bold" },
});
