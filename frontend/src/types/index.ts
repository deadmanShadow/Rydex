export * from "./user.type";

import type { ComponentType } from "react";

export type {
  IChangePassword,
  ILogin,
  IRegister,
  ISetPassword,
} from "./auth.type";
export type {
  Availability,
  DriverStatus,
  IAvailability,
  IDriver,
  IDriverApplication,
  IDriverEarningRide,
  IDriverEarnings,
  IDriverProfile,
  IDriverRideHistoryMeta,
  IDriverRideHistoryQuery,
  IDriverRideHistoryResponse,
  IUpdateMyDriverProfile,
  VehicleType,
} from "./driver.type";
export type { IRide, IRideRequest, RideStatus } from "./ride.type";
export type { IPublicStats } from "./stats.type";
export type { IUser } from "./user.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: IMeta;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IResponseWithMeta<T> extends IResponse<T> {
  meta: IMeta;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "RIDER" | "DRIVER";
