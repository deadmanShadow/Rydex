// driver.validation.ts
import z from "zod";

import { VEHICLE_TYPE } from "../ride/ride.interface";
import { AVAILABILITY, DRIVER_STATUS } from "./driver.interface";

export const driverApplicationZodSchema = z.object({
  vehicleType: z.string().min(1, { message: "Vehicle type is required" }),
  vehicleModel: z.string().min(1, { message: "Vehicle model is required" }),
  licenseNumber: z.string().min(1, { message: "License number is required" }),
  vehicleNumber: z.string().min(1, { message: "Vehicle number is required" }),
});

export const updateDriverApplicationZodSchema = z.object({
  driverStatus: z.nativeEnum(DRIVER_STATUS),
});

export const updateAvailabilityZodSchema = z.object({
  availability: z.nativeEnum(AVAILABILITY),
});

export const updateMyDriverProfileZodSchema = z.object({
  vehicleType: z.nativeEnum(VEHICLE_TYPE).optional(),
  vehicleModel: z.string().min(1).optional(),
  vehicleNumber: z.string().min(1).optional(),
  licenseNumber: z.string().min(1).optional(),
  availability: z.nativeEnum(AVAILABILITY).optional(),
});
