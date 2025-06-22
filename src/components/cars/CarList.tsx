"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/store/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  FaChevronLeft,
  FaChevronRight,
  FaGasPump,
  FaSuitcase,
  FaUserFriends,
} from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import CarCard from "@/components/cars/CarCard";
import { getCars } from "@/lib/actions/rental.actions";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CarListProps {
  locationObj?: { id: string; name: string };
  startDate?: string;
  endDate?: string;
  filters?: Filters;
}

export default function CarList({ startDate, endDate, filters }: CarListProps) {
  const globalCars = useStore((state) => state.cars);
  const [sortOption, setSortOption] = useState("price-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [currentCars, setCurrentCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const carsPerPage = 3;
  // Calculate pagination values
  const totalCars = allCars.length;
  let totalPages = Math.ceil(totalCars / carsPerPage);

  const filterCars = () => {
    let filteredCars = cars;

    if (filters?.minPrice !== undefined) {
      filteredCars = filteredCars.filter(
        (car: Car) => Number(car.pricePerDay) >= filters.minPrice!,
      );
    }

    if (filters?.maxPrice !== undefined) {
      filteredCars = filteredCars.filter(
        (car: Car) => Number(car.pricePerDay) <= filters.maxPrice!,
      );
    }

    if (filters?.seats) {
      switch (filters.seats) {
        case "2":
          filteredCars = filteredCars.filter((car: Car) => car.seats <= 4);
          break;
        case "5":
          filteredCars = filteredCars.filter(
            (car: Car) => Number(car.seats) > 4 && Number(car.seats) <= 6,
          );
          break;
        case "7":
          filteredCars = filteredCars.filter(
            (car: Car) => Number(car.seats) >= 7,
          );
          break;
      }
    }

    if (filters?.transmission) {
      filteredCars = filteredCars.filter(
        (car: Car) => car.transmission === filters.transmission,
      );
    }

    if (filters?.fuelType) {
      filteredCars = filteredCars.filter(
        (car: Car) => car.fuelType === filters.fuelType,
      );
    }
    setAllCars(filteredCars);
    handleSortChange(sortOption, filteredCars);
  };

  useEffect(() => {
    setIsLoading(true);
    if (startDate && endDate) {
      getCars({ startDate: startDate, endDate: endDate })
        .then((data) => {
          setCars(data);
        })
        .catch(() => {
          toast.error("Error occurred!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setCars(globalCars);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    if (filters) {
      filterCars();
    }
  }, [filters]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const searchLower = searchQuery.toLowerCase();
      const filteredCars = allCars.filter(
        (car: Car) =>
          car.model.toLowerCase().includes(searchLower) ||
          car.brand.toLowerCase().includes(searchLower),
      );
      setAllCars(filteredCars);
    } else {
      filterCars();
    }
  }, [searchQuery]);

  useEffect(() => {
    setAllCars(cars);
    handleSortChange(sortOption, cars);
  }, [cars]);

  useEffect(() => {
    handleSortChange(sortOption, allCars);
    setCurrentPage(1);
  }, [sortOption]);

  useEffect(() => {
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    setCurrentCars(allCars.slice(indexOfFirstCar, indexOfLastCar));
  }, [currentPage]);

  useEffect(() => {
    totalPages = Math.ceil(allCars.length / carsPerPage);
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    setCurrentCars(allCars.slice(indexOfFirstCar, indexOfLastCar));
  }, [allCars]);

  const handleSortChange = (sortOption, data) => {
    setIsLoading(true);
    if (data.length) {
      const sortedCars = [...(data || [])].sort((a, b) => {
        switch (sortOption) {
          case "price-asc":
            return Number(a.pricePerDay) - Number(b.pricePerDay);
          case "price-desc":
            return Number(b.pricePerDay) - Number(a.pricePerDay);
          default:
            return 0;
        }
      });
      setAllCars(sortedCars);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  // Get current cars for this page

  // Change page
  const goToPage = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(pageNumber);
  };

  // Previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-8 lg:mt-0 lg:col-span-9">
      <div className="flex flex-wrap gap-5 justify-between items-center mb-6">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-64 border-none shadow"
          />
        </div>

        {/*<h2 className="text-2xl font-bold text-neutral-800">Available Cars</h2>*/}
        <div className="flex items-center gap-2">
          <p className="text-sm text-neutral-600 whitespace-nowrap">Sort by:</p>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="text-sm border-neutral-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
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
        ) : allCars.length === 0 || currentCars.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              No cars available
            </h3>
            <p className="text-neutral-600 mb-4">
              Try adjusting your filters or selecting a different location.
            </p>
          </div>
        ) : (
          currentCars.map((car) => (
            <div
              key={car.id}
              className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="md:flex">
                <CarCard car={car} showPrice={false} />
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
                        <p className="text-xs text-neutral-600">
                          Free Cancellation
                        </p>
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
            </div>
          ))
        )}
      </div>

      {!isLoading && allCars.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav
            className="inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium ${
                currentPage === 1
                  ? "text-neutral-300 cursor-not-allowed"
                  : "text-neutral-500 hover:bg-neutral-50 cursor-pointer"
              }`}
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft className="h-5 w-5" />
            </button>

            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => goToPage(number)}
                className={`relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium ${
                  currentPage === number
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-white text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium ${
                currentPage === totalPages
                  ? "text-neutral-300 cursor-not-allowed"
                  : "text-neutral-500 hover:bg-neutral-50 cursor-pointer"
              }`}
            >
              <span className="sr-only">Next</span>
              <FaChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
