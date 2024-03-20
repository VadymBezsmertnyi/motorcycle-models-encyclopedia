import {
  PATHS_MAIN_SCREENS,
  PATHS_MAIN_TABS,
} from "./Navigators.constants";

export type RootMainScreensParamList = {
  [PATHS_MAIN_SCREENS.welcome]: undefined;
  [PATHS_MAIN_SCREENS.main]: undefined;
};

export type RootMainTabsParamList = {
  [PATHS_MAIN_TABS.apply]?: {
    title: string;
    url: string;
  } & Record<string, string>;
  [PATHS_MAIN_TABS.privacy]?: {
    title: string;
    url: string;
  } & Record<string, string>;
  [PATHS_MAIN_TABS.terms]?: {
    title: string;
    url: string;
  } & Record<string, string>;
  [PATHS_MAIN_TABS.rates]?: Record<string, string>;
};

