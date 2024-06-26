import z from "zod";
import { stylesMotorcycle } from "./MotorcyclesProvider.constants";

export const stylesMotorcycleSchema = z.enum(stylesMotorcycle);

export const motorcycleSchema = z.object({
  id: z.number(),
  Bore: z.string(),
  Brand: z.string(),
  Category: stylesMotorcycleSchema,
  ColorOptions: z.string(),
  CoolingSystem: z.string(),
  Displacement: z.string(),
  DryWeight: z.number(),
  EngineCylinder: z.string(),
  EngineStroke: z.string(),
  FrontBrakes: z.string(),
  FrontSuspension: z.string(),
  FrontTire: z.string(),
  FuelCapacity: z.string(),
  FuelControl: z.string(),
  FuelSystem: z.string(),
  Gearbox: z.string(),
  Model: z.string().or(z.number()),
  Power: z.number(),
  Rating: z.number(),
  RearBrakes: z.string(),
  RearSuspension: z.string(),
  RearTire: z.string(),
  SeatHeight: z.string(),
  Stroke: z.string(),
  Torque: z.string(),
  TransmissionType: z.string(),
  Wheelbase: z.string(),
  Year: z.number(),
});
