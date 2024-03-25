import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  containerBrands: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  containerTitleBrands: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  titleBrands: { fontSize: 20 },
  inputBrands: { flex: 1 },
  scrollBrands: { overflow: "hidden" },
  containerScrollBrands: {
    gap: 5,
    paddingVertical: 10,
  },
  itemBrand: {
    padding: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "gray",
    minWidth: 50,
    alignItems: "center",
  },
  titleItemBrand: { textTransform: "capitalize", fontSize: 20 },
  containerSelected: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
  titleSelected: { color: "gray" },
  itemSelected: { textTransform: "capitalize" },
  containerEmpty: { height: 1, backgroundColor: "orange" },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
    gap: 10,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  titleButton: {
    fontSize: 18,
  },
  buttonSave: {
    backgroundColor: "green",
    borderColor: "green",
  },
  titleButtonSave: {
    color: "white",
  },
});
