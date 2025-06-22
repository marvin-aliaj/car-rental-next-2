"use client";
import { FaSuitcase, FaUserFriends } from "react-icons/fa";
import { PiEngineFill } from "react-icons/pi";
import { GiGearStickPattern } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import * as React from "react";
import Link from "next/link";
import { encryptId } from "@/lib/utils";

interface CarCardProps {
  car: Car;
  enableHover?: boolean;
  showPrice?: boolean;
  showBookButton?: boolean;
}

export default function CarCard({
  car,
  enableHover = false,
  showPrice = true,
  showBookButton = true,
}: CarCardProps) {
  return (
    <div
      className={`md:flex-shrink-0 md:w-1/3 min-w-80 hover:cursor-pointer ${
        enableHover
          ? "transition duration-300 transform hover:scale-105 hover:shadow-2xl"
          : ""
      }`}
    >
      <div className="relative w-full rounded-t-xl overflow-hidden shadow-xl text-white bg-dark">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-600 to-black/50 z-0" />

        {/* Content */}
        <div className="relative z-10 p-4 flex flex-col justify-between h-full">
          {/* Car Image */}
          <div className="my-4 flex justify-center">
            <img src={car.imageUrl} alt="Car" className="h-30 object-contain" />
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-xl relative -mt-5 z-20 bg-white p-3">
        <span className="text-lg font-bold">
          {car.brand} {car.model}
        </span>
        <span className="text-sm">{car.year}</span>
        <div className="flex flex-wrap gap-3 mt-3">
          <div className="flex items-center gap-1 px-2 py-1 rounded-md">
            <FaUserFriends /> {car.seats}
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-md">
            <FaSuitcase /> {car.bags}
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-md">
            <PiEngineFill /> {car.engine}
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-md">
            <GiGearStickPattern /> {car.transmission}
          </div>
        </div>
        <div className="flex justify-between text-sm mt-3">
          {showPrice && (
            <div>
              <span className="text-2xl font-bold">€{car.pricePerDay}</span>
              <span className="text-base text-gray-700"> /day</span>
            </div>
          )}
          {showBookButton && (
            <Link href={`/booking/${encryptId(car.id.toString())}`}>
              <Button className="btn-primary">Book now</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
