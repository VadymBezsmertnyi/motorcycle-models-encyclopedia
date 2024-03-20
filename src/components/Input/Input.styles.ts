import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 16,
  },
  labelRegular: { color: "red" },
  inputWrapper: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    paddingTop: 13,
    paddingHorizontal: 16,
    paddingBottom: 16,
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  containerMaxLength: {
    alignItems: "flex-end",
  },
  titleMaxLength: {
    fontSize: 16,
    color: "gray",
  },
  titleMaxLengthError: {
    color: "red",
  },
  errorMessage: {
    fontSize: 10,
    color: "red",
    marginTop: 4,
    minHeight: 20,
  },
});
