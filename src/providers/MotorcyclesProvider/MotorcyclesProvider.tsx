import React, { useMemo, FunctionComponent, useEffect } from "react";

// constants
import motoJSON from "../../../assets/db/motoDb.json";

type MotorcyclesContext = {};

type MotorcyclesProviderProps = {
  children?: React.ReactNode;
};

export const motorcyclesContext = React.createContext({} as MotorcyclesContext);

export const MotorcyclesProvider: FunctionComponent<
  MotorcyclesProviderProps
> = ({ children }) => {
  const contextValue: MotorcyclesContext = useMemo(() => ({}), []);

  useEffect(() => {
    console.log("motoJSON", motoJSON[0]);
  }, []);

  return (
    <motorcyclesContext.Provider value={contextValue}>
      {children}
    </motorcyclesContext.Provider>
  );
};
