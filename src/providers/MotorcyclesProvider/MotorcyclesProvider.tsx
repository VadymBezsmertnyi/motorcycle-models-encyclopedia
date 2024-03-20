import React, { useMemo, FunctionComponent, useEffect } from "react";

// constants
import motoJSON from "../../../assets/db/motoDb.json";
import { MotorcycleType } from "./MotorcyclesProvider.types";

type MotorcyclesContext = {
  motorcyclesDB: MotorcycleType[];
  brans: string[];
};

type MotorcyclesProviderProps = {
  children?: React.ReactNode;
};

export const motorcyclesContext = React.createContext({} as MotorcyclesContext);

export const MotorcyclesProvider: FunctionComponent<
  MotorcyclesProviderProps
> = ({ children }) => {
  const motorcyclesDB: MotorcycleType[] = useMemo(
    () =>
      (motoJSON as any[]).map((item, index) => ({
        id: index + 1,
        ...item,
      })) as MotorcycleType[],
    []
  );
  const brans = useMemo(
    () =>
      motorcyclesDB.reduce<string[]>(
        (state, next) =>
          state.includes(next.Brand) ? state : [...state, next.Brand],
        []
      ),
    [motorcyclesDB]
  );

  const contextValue: MotorcyclesContext = useMemo(
    () => ({ motorcyclesDB, brans }),
    [motorcyclesDB, brans]
  );

  useEffect(() => {
    console.log("motoJSON", motorcyclesDB[0]);
    console.log("motorcyclesDB.length", motorcyclesDB.length);
    console.log("brans", brans);
  }, []);

  return (
    <motorcyclesContext.Provider value={contextValue}>
      {children}
    </motorcyclesContext.Provider>
  );
};
