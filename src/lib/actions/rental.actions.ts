"use server";
import { get, post } from "../api";
import { cookies } from "next/headers";

export const getCars = async (params) => {
  try {
    return await get("/cars", params);
  } catch (error) {
    throw error;
  }
};

export const createCar = async (body) => {
  try {
    return await post("/cars", body);
  } catch (error) {
    throw error;
  }
};

export const getBookings = async (params) => {
  try {
    return await get("/bookings", params);
  } catch (error) {
    throw error;
  }
};

export const createBooking = async (body) => {
  try {
    return await post("/bookings", body);
  } catch (error) {
    throw error;
  }
};

export const signIn = async (body) => {
  try {
    const response = await post("/authentication/sign-in", body);
    (await cookies()).set("token", response, {
      secure: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
