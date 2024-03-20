import React, { useState, useEffect, useMemo } from "react";
import { I18nProvider } from "@lingui/react";
import { Messages, setupI18n } from "@lingui/core";

// types
import { Language, LocalesContext, Props } from "./localization.types";

// helps
import {
  dynamicActivateLanguage,
  getDeviceLanguage,
} from "./localization.helpers";
import { setDeviceStorage } from "../src/helps/storage.help";
import showErrors from "../src/helps/errors/showError";

// locales
import { messages as translationsUk } from "../localization/uk/messages";
import { messages as translationsEn } from "../localization/en/messages";

// constants
import {
  defaultLanguage,
  languageKey,
  languagesLinguiAlias,
} from "./localization.const";
const CATALOGS_LANGUAGES = {
  uk: translationsUk as Messages,
  en: translationsEn as Messages,
};

export const localesContext = React.createContext({} as LocalesContext);

const LocalesProvider: React.FC<Props> = ({ children }) => {
  const [languageUser, setLanguage] = useState<Language>(defaultLanguage);
  const language = languageUser || defaultLanguage;
  const { bug } = showErrors;
  const i18n = setupI18n({
    messages: CATALOGS_LANGUAGES,
    locale: languagesLinguiAlias[language],
  });

  const setLanguageAsync = async (language: Language): Promise<void> => {
    try {
      await dynamicActivateLanguage(language, i18n);
      await setDeviceStorage(languageKey, language);
      setLanguage(language);
    } catch (error) {
      bug(JSON.stringify(error));
    }
  };

  const getLanguageStorage = async () => {
    try {
      const language = await getDeviceLanguage();
      await setLanguageAsync(language);
      setLanguage(language);
    } catch (error) {
      bug(JSON.stringify(error));
    }
  };

  const contextValue: LocalesContext = useMemo(
    () => ({
      i18n,
      language,
      getLanguageStorage,
      setLanguage: setLanguageAsync,
    }),
    [i18n, language]
  );

  useEffect(() => {
    getLanguageStorage();
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <localesContext.Provider value={contextValue}>
        {children}
      </localesContext.Provider>
    </I18nProvider>
  );
};

export default LocalesProvider;
