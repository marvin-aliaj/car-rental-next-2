/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
declare type Location = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isAirport: boolean;
};
// ========================================

declare type Car = {
  id?: string;
  brand: string;
  model: string;
  year: number;
  type?: string;
  transmission: string;
  engine: string;
  fuelType: string;
  seats: number;
  bags: number;
  lkm: string;
  pricePerDay: number;
  available?: boolean;
  features: string;
  imageUrl: string;
  description: string;
  reviewStars: number;
  reviewerCount: number;
  location?: string;
};

declare type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

declare type Review = {
  id: string;
  userId: string;
  carId: string;
  rating: number;
  comment: string;
  createdAt: string;
};

declare type Currency = {
  code: string;
  symbol: string;
};

declare type Filters = {
  transmission: string;
  minPrice: number;
  maxPrice: number;
  seats: string;
  fuelType: string;
};

declare module "react-helmet";
