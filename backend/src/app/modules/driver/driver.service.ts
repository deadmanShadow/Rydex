/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { Ride } from "../ride/ride.model";
import { IUser, Role } from "../user/user.interface";
import { User } from "../user/user.model";
import { QueryBuilder } from "./../../utils/QueryBuilder";
import { driverSearchableFields } from "./driver.constant";
import {
  AVAILABILITY,
  DRIVER_STATUS,
  UpdateMyDriverProfile,
} from "./driver.interface";
import { Driver } from "./driver.model";

const applyForDriver = async (
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  if (decodedToken.role !== Role.RIDER) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to apply for driver"
    );
  }

  const isUserExist = await User.findById(decodedToken.userId);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (isUserExist._id.toString() !== decodedToken.userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You're not authorized to perform this action"
    );
  }

  if (!isUserExist.address) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please update your address before applying as a driver."
    );
  }
  const isApplicationExist = await Driver.findOne({
    driver: decodedToken.userId,
  });
  if (isApplicationExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already submitted a driver application"
    );
  }

  if (isUserExist.role === Role.DRIVER) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already registered as driver"
    );
  }

  const driver = await Driver.create({
    ...payload,
    userId: decodedToken.userId,
    status: DRIVER_STATUS.PENDING,
    availability: AVAILABILITY.UNAVAILABLE,
    appliedAt: new Date(),
  });

  return driver;
};

const getAllDriverApplication = async (
  userId: string,
  query: Record<string, string>
) => {
  const isUserExist = User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const queryBuilder = new QueryBuilder(Driver.find(), query);

  const driverApplication = await queryBuilder
    .search(driverSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    driverApplication.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const updateDriver = async (driverId: string, driverStatus: DRIVER_STATUS) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const driver = await Driver.findById(driverId).session(session);
    if (!driver) {
      throw new AppError(httpStatus.NOT_FOUND, "Driver application not found");
    }

    if (driver.status === driverStatus) {
      throw new AppError(httpStatus.BAD_REQUEST, `Already ${driverStatus}`);
    }

    driver.status = driverStatus;

    if (driverStatus === DRIVER_STATUS.APPROVED) {
      driver.approvedAt = new Date();
      await User.findByIdAndUpdate(
        driver.userId,
        { role: Role.DRIVER },
        { session }
      );
    }

    await driver.save({ session });

    await session.commitTransaction();
    session.endSession();

    return driver;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateAvailability = async (
  user: JwtPayload,
  availability: AVAILABILITY
) => {
  if (
    ![
      AVAILABILITY.AVAILABLE,
      AVAILABILITY.UNAVAILABLE,
      AVAILABILITY.ON_TRIP,
    ].includes(availability)
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid availability change");
  }

  const driver = await Driver.findOne({ userId: user.userId });

  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  if (driver.status !== DRIVER_STATUS.APPROVED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only approved drivers can update availability"
    );
  }

  driver.availability = availability;
  await driver.save();

  return driver;
};

const getMyDriverProfile = async (user: JwtPayload) => {
  const driver = await Driver.findOne({ userId: user.userId }).populate(
    "userId"
  );

  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver profile not found");
  }

  return driver;
};

const updateMyDriverProfile = async (
  user: JwtPayload,
  payload: UpdateMyDriverProfile
) => {
  const driver = await Driver.findOne({ userId: user.userId });

  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver profile not found");
  }

  if (payload.vehicleType) driver.vehicleType = payload.vehicleType;
  if (payload.vehicleModel) driver.vehicleModel = payload.vehicleModel;
  if (payload.vehicleNumber) driver.vehicleNumber = payload.vehicleNumber;
  if (payload.licenseNumber) driver.licenseNumber = payload.licenseNumber;

  if (payload.availability) {
    if (!Object.values(AVAILABILITY).includes(payload.availability)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid availability value");
    }
    driver.availability = payload.availability;
  }

  await driver.save();
  return driver;
};

const getDriverRideHistory = async (
  user: JwtPayload,
  query: Record<string, string>
) => {
  const driver = await Driver.findOne({ userId: user.userId });

  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver profile not found");
  }

  if (driver.status !== DRIVER_STATUS.APPROVED) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only approved drivers can view ride history"
    );
  }

  const baseQuery: Record<string, any> = { driverId: user.userId };

  // Apply search filter if searchTerm is provided
  let searchQuery: Record<string, any> = { ...baseQuery };
  if (query.searchTerm) {
    searchQuery = {
      ...baseQuery,
      $or: [
        { "pickupLocation.name": { $regex: query.searchTerm, $options: "i" } },
        {
          "destinationLocation.name": {
            $regex: query.searchTerm,
            $options: "i",
          },
        },
        { status: { $regex: query.searchTerm, $options: "i" } },
      ],
    } as any;
  }

  const filterQuery = { ...searchQuery };
  if (query.status) {
    filterQuery.status = query.status;
  }
  if (query.vehicleType) {
    filterQuery.vehicleType = query.vehicleType;
  }

  const rideQuery = Ride.find(filterQuery)
    .populate("riderId", "name email phone")
    .sort({ createdAt: -1 });

  const queryBuilder = new QueryBuilder(rideQuery, query);

  const result = await queryBuilder
    .search(["pickupLocation.name", "destinationLocation.name", "status"])
    .filter()
    .sort()
    .fields()
    .paginate();

  const totalDocuments = await Ride.countDocuments(filterQuery);

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;
  const totalPage = Math.ceil(totalDocuments / limit);

  const meta = {
    page,
    limit,
    total: totalDocuments,
    totalPage,
  };

  const data = await result.build();

  return {
    data,
    meta,
  };
};

export const DriverService = {
  applyForDriver,
  getAllDriverApplication,
  updateDriver,
  updateAvailability,
  getMyDriverProfile,
  updateMyDriverProfile,
  getDriverRideHistory,
};
