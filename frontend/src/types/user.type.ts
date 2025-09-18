export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

export const Role = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  RIDER: "RIDER",
  DRIVER: "DRIVER",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const IsActive = {
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED",
  BLOCKED: "BLOCKED",
} as const;

export type IsActive = (typeof IsActive)[keyof typeof IsActive];

export interface IUser {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  password?: string;
  phone?: string;
  address?: string;
  auths: IAuthProvider[];
  role: Role;
  isDeleted?: boolean;
  isActive?: IsActive;
  isVerified?: boolean;
  rides?: string[];
  createdAt?: string;
}
