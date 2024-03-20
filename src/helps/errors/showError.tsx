import { Platform } from "react-native";
import Toast from "react-native-root-toast";
import { Errors } from "./errors";

const bug = (rawError: Error | string): void => {
  if (rawError instanceof Error) {
    if (Platform.OS === "web") throw rawError;
    else
      Toast.show(rawError.message, {
        duration: Toast.durations.SHORT,
        textColor: "white",
        backgroundColor: "red",
      });
  } else {
    if (Platform.OS === "web") throw new Error(rawError);
    else
      Toast.show(rawError, {
        duration: Toast.durations.SHORT,
        textColor: "white",
        backgroundColor: "red",
      });
  }
};

const info = (rawError: unknown) => {
  if (Platform.OS === "web" && rawError) throw new Error(String(rawError));
  else
    Toast.show(String(rawError), {
      duration: Toast.durations.LONG,
      textColor: "black",
      backgroundColor: "yellow",
    });
};

const warning = (rawError: unknown) => {
  if (Platform.OS === "web" && rawError) throw new Error(String(rawError));
  else
    Toast.show(String(rawError), {
      duration: Toast.durations.SHORT,
      textColor: "black",
      backgroundColor: "orange",
    });
};

const fatal = (error: Errors): void => {
  if (Platform.OS === "web" && error) throw error;
  else
    Toast.show(error?.message || "", {
      duration: Toast.durations.SHORT,
      textColor: "white",
      backgroundColor: "black",
    });
};

const success = (rawError: unknown) => {
  if (Platform.OS === "web" && rawError) throw new Error(String(rawError));
  else
    Toast.show(String(rawError), {
      duration: Toast.durations.SHORT,
      textColor: "black",
      backgroundColor: "yellow",
    });
};

const showErrors = {
  bug,
  info,
  warning,
  fatal,
  success,
};

export default showErrors;
