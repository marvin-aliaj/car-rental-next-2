"use client";

import CarCard from "@/components/cars/CarCard";
import { FaGasPump, FaSuitcase, FaUserFriends } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";

interface CarDetailsProps {
  car: Car;
}

export default function CarDetails({ car }: CarDetailsProps) {
  return (
    <Card>
      <CardContent>
        <div className="md:flex">
          <CarCard car={car} showPrice={false} showBookButton={false} />
          <div className="md:w-2/3 pb-2">
            <div className="p-6 md:flex md:justify-between md:items-start">
              <div>
                <div className="flex items-baseline gap-5">
                  <div>
                    <span className="text-3xl font-bold text-primary">
                      €{car.pricePerDay}
                    </span>
                    <span className="text-sm text-neutral-500">/day</span>
                  </div>
                  <p className="text-xs text-neutral-600">Free Cancellation</p>
                </div>

                <div className="mt-3 flex flex-wrap items-center text-sm text-neutral-600">
                  <div className="flex items-center mr-4 mb-2">
                    <FaUserFriends className="mr-1" />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center mr-4 mb-2">
                    <FaSuitcase className="mr-1" />
                    <span>{car.bags} Bags</span>
                  </div>
                  <div className="flex items-center mr-4 mb-2">
                    <FaGasPump className="mr-1" />
                    <span>
                      {car.lkm} l/100km{" "}
                      <span className="text-neutral-500 lowercase">
                        ({car.fuelType})
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <GiGearStickPattern className="mr-1" />
                    <span>{car.transmission}</span>
                  </div>
                </div>

                <div className="mt-3 border-1 border-neutral-300 rounded-xl w-fit px-3 py-1 shadow">
                  <div className="flex items-center">
                    <div className="flex text-primary">
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                    <span className="ml-2 text-sm text-neutral-600">
                      {car.reviewStars} ({car.reviewerCount} reviewers)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 lg:hidden xl:block">
              {car.description && (
                <p className=" text-sm text-neutral-600 max-w-full">
                  {car.description}
                </p>
              )}
            </div>
            <div className="mt-6 px-6 flex flex-wrap gap-2">
              {car.features?.split(",").map((feature, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 text-neutral-600 text-xs rounded-full"
                >
                  {feature.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 hidden lg:block xl:hidden">
          {car.description && (
            <p className=" text-sm text-neutral-600 max-w-full">
              {car.description}
            </p>
          )}
        </div>
        <div className="mt-6 px-6 hidden flex-wrap gap-2 lg:block xl:hidden">
          {car.features?.split(",").map((feature, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-100 text-neutral-600 text-xs rounded-full"
            >
              {feature.trim()}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
