"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import CarCard from "@/components/cars/CarCard";

export default function FeaturedCars() {
  const cars = useStore((state) => state.cars);
  const [isLoading] = useState(false);

  return (
    <section id="booking-form" className="py-12 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-800">
            Our Vehicle Fleet
          </h2>
          <span className="mt-4 text-neutral-600 max-w-2xl mx-auto">
            Choose from our selection of premium vehicles for any occasion, from
            compact cars to luxury SUVs.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array(8)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <Skeleton className="w-full h-48" />
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <Skeleton className="h-6 w-32 mb-2" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <div>
                          <Skeleton className="h-6 w-16" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div className="flex justify-between items-center mt-6">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-24" />
                      </div>
                    </div>
                  </div>
                ))
            : cars?.slice(0, 8)?.map((car) => (
                <div key={car.id} className="md:flex justify-center">
                  <CarCard car={car} enableHover={true} />
                </div>
              ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/cars">
            <Button type="submit" className="btn-primary">
              View All Cars
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
