import { z } from "zod";
import {
  motorcycleSchema,
  stylesMotorcycleSchema,
} from "./MotorcyclesProvider.schemas";

export type StylesMotorcycleType = z.infer<typeof stylesMotorcycleSchema>;
export type MotorcycleType = z.infer<typeof motorcycleSchema>;
