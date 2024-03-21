import { PATHS_MAIN_SCREENS } from "./Navigators.constants";

export type RootMainScreensParamList = {
  [PATHS_MAIN_SCREENS.main]: undefined;
  [PATHS_MAIN_SCREENS.item]: {
    motoId: number;
  };
  [PATHS_MAIN_SCREENS.favorites]: undefined;
  [PATHS_MAIN_SCREENS.settings]: undefined;
};
