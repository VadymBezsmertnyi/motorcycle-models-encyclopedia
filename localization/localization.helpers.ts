import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

// constants
import {
  languages_short,
  LANGUAGE_EN,
  LANGUAGE_UK,
  defaultLanguage,
  languageKey,
} from "./localization.const";
import { Language } from "./localization.types";

// locales
import { messages as translationsUk } from "./uk/messages";
import { messages as translationsEn } from "./en/messages";

// types
import type { I18n as i18Type } from "@lingui/core";

export const languagesRegexGroup = `${Object.keys(languages_short).join("|")}`;

export function getPathWithoutLanguage(path: string): string {
  const languagesRegex = new RegExp(`^/(${languagesRegexGroup})/`);
  const match = languagesRegex.exec(path);
  if (!match) return path;
  return path.slice(match.index + match[0].length - 1);
}
export async function dynamicActivateLanguage(
  locale: Language,
  i18n: i18Type
): Promise<void> {
  const messages = getMessagesByLocale(locale);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
const getMessagesByLocale = (locale: Language) => {
  switch (locale) {
    case LANGUAGE_EN:
      return translationsEn;
      break;

    case LANGUAGE_UK:
      return translationsUk;
      break;

    default:
      return translationsEn;
      break;
  }
};

export const isLanguage = (value: string): value is Language => {
  return value in languages_short;
};

export const getDeviceLanguage = async (): Promise<Language> => {
  const deviceLanguage = Localization.locale.slice(0, 2);
  let localizationLanguage = defaultLanguage;
  if (Platform.OS === "web") {
    const languageLocalStorage = localStorage.getItem(languageKey);
    if (languageLocalStorage && isLanguage(languageLocalStorage))
      localizationLanguage = languageLocalStorage;
    else if (isLanguage(deviceLanguage)) localizationLanguage = deviceLanguage;
  } else {
    const languageAsyncStorage = await AsyncStorage.getItem(languageKey);
    if (languageAsyncStorage && isLanguage(languageAsyncStorage))
      localizationLanguage = languageAsyncStorage;
    else if (isLanguage(deviceLanguage)) localizationLanguage = deviceLanguage;
  }

  return localizationLanguage;
};
