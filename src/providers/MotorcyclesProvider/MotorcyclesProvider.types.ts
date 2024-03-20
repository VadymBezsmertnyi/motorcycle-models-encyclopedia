import { z } from "zod";
import { motorcycleSchema } from "./MotorcyclesProvider.schemas";

export type MotorcycleType = z.infer<typeof motorcycleSchema>;
