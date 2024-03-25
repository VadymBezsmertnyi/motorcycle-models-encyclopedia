import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: { alignItems: "flex-end" },
  buttonHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  footerButton: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  footerButtonBlurView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerBlur: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backgroundModalStyle: {
    backgroundColor: "white", // Колір фону вашого компонента
    elevation: 8, // Висота тіні
    shadowOffset: { width: 0, height: -17.4 / 2 }, // Зсув тіні по горизонталі та вертикалі
    shadowRadius: 17.4 / 2, // Радіус тіні
    shadowOpacity: 0.15, // Прозорість тіні
  },
});
