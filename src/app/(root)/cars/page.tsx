"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CarFilters from "@/components/cars/CarFilters";
import CarList from "@/components/cars/CarList";
import { Skeleton } from "@/components/ui/skeleton";

const CarsPage = () => {
  const [searchParams, setSearchParams] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>(null);
  const [isLoading, setIsLoading] = useState(true);

  const startDate = searchParams?.get("start");
  const endDate = searchParams?.get("end");

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams(params);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="bg-white py-8">
      {isLoading ? (
        Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/3">
                  <Skeleton className="h-48 w-full md:h-full" />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="md:flex md:justify-between md:items-start">
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-6 w-48 mb-1" />
                      <Skeleton className="h-4 w-32 mb-3" />
                      <Skeleton className="h-4 w-full mb-3" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <Skeleton className="h-6 w-24 mb-1" />
                      <Skeleton className="h-4 w-32 mb-4" />
                      <Skeleton className="h-10 w-28" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-neutral-800">
              Our Vehicle Fleet
            </h1>
            {startDate && endDate && (
              <p className="text-neutral-600 mt-1">
                Showing cars available
                {` from ${startDate} to ${endDate}`}
              </p>
            )}
          </div>

          <div className="lg:hidden mb-6">
            <Button
              onClick={toggleMobileFilters}
              variant="outline"
              className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium rounded-md px-4 py-2 text-center flex justify-center items-center"
            >
              <i className="fas fa-filter mr-2"></i>
              {showMobileFilters ? "Hide Filters" : "Show Filters"}
            </Button>

            {showMobileFilters && (
              <div className="mt-4 p-4 bg-white border border-neutral-200 rounded-lg shadow-sm">
                <CarFilters onFilterChange={handleFilterChange} />
              </div>
            )}
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Car Listings */}
            <CarList
              startDate={startDate || null}
              endDate={endDate || null}
              filters={filters}
            />
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block lg:col-span-3">
              <CarFilters onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarsPage;
