import React, { useMemo, FunctionComponent } from "react";

// constants
import motoJSON from "../../../assets/db/motoDb.json";
import { MotorcycleType } from "./MotorcyclesProvider.types";

type MotorcyclesContext = {
  motorcyclesDB: MotorcycleType[];
  brands: string[];
  categories: string[];
  minMaxYears: {
    min: number;
    max: number;
  };
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
  const brands = useMemo(
    () =>
      motorcyclesDB.reduce<string[]>(
        (state, next) =>
          state.includes(next.Brand) ? state : [...state, next.Brand],
        []
      ),
    [motorcyclesDB]
  );
  const minMaxYears = useMemo(
    () =>
      motorcyclesDB.reduce<{ min: number; max: number }>(
        (state, next) => ({
          min: state.min > next.Year ? next.Year : state.min,
          max: state.max < next.Year ? next.Year : state.max,
        }),
        { min: 2024, max: 0 }
      ),
    [motorcyclesDB]
  );
  const categories = useMemo(
    () =>
      motorcyclesDB.reduce(
        (state, next) =>
          state.includes(next.Category) ? state : [...state, next.Category],
        [] as string[]
      ),
    [motorcyclesDB]
  );

  const contextValue: MotorcyclesContext = useMemo(
    () => ({ motorcyclesDB, brands, minMaxYears, categories }),
    [motorcyclesDB, brands, minMaxYears, categories]
  );

  return (
    <motorcyclesContext.Provider value={contextValue}>
      {children}
    </motorcyclesContext.Provider>
  );
};
