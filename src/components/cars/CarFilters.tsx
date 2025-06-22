"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { FaFilter } from "react-icons/fa";

interface CarFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

export default function CarFilters({ onFilterChange }: CarFiltersProps) {
  const [transmissionType, setTransmissionType] = useState<string>(null);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [passengerCapacity, setPassengerCapacity] = useState<string>(null);
  const [fuelType, setFuelType] = useState<string>(null);

  const handleTransmissionChange = (value: string) => {
    if (value === transmissionType) {
      setTransmissionType(null);
    } else {
      setTransmissionType(value);
    }
  };

  const handleFuelTypeChange = (value: string) => {
    if (value === fuelType) {
      setFuelType(null);
    } else {
      setFuelType(value);
    }
  };

  const handlePassengerCapacityChange = (value: string) => {
    if (value === passengerCapacity) {
      setPassengerCapacity(null);
    } else {
      setPassengerCapacity(value);
    }
  };

  const applyFilters = () => {
    const filters: Filters = {
      transmission: transmissionType,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      seats: passengerCapacity,
      fuelType: fuelType,
    };
    onFilterChange(filters);
  };

  return (
    <div className="sticky top-24">
      <h3 className="flex items-center gap-4 text-lg font-bold text-neutral-800 mb-4">
        <FaFilter /> Filters
      </h3>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">
          Transmission
        </h4>
        <div className="space-y-2">
          {["Automatic", "Manual"].map((type) => (
            <div key={type} className="flex items-center">
              <Checkbox
                id={`type-${type}`}
                checked={transmissionType === type}
                onCheckedChange={() => handleTransmissionChange(type)}
                className="rounded text-primary focus:ring-primary h-4 w-4"
              />
              <Label
                htmlFor={`type-${type}`}
                className="ml-2 text-sm text-neutral-600"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">
          Fuel Type
        </h4>
        <div className="space-y-2">
          {["Diesel", "Gasoline", "Electric"].map((type) => (
            <div key={type} className="flex items-center">
              <Checkbox
                id={`fuel-${type}`}
                checked={fuelType === type}
                onCheckedChange={() => handleFuelTypeChange(type)}
                className="rounded text-primary focus:ring-primary h-4 w-4"
              />
              <Label
                htmlFor={`type-${type}`}
                className="ml-2 text-sm text-neutral-600"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">
          Price Range
        </h4>
        <div className="px-2">
          <Slider
            defaultValue={[0, 200]}
            max={200}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-neutral-500">€{priceRange[0]}</span>
            <span className="text-xs text-neutral-500">€{priceRange[1]}+</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2">
          Passenger Capacity
        </h4>
        <div className="space-y-2">
          {[
            { id: "2", label: "2-4 Passengers" },
            { id: "5", label: "5-6 Passengers" },
            { id: "7", label: "7+ Passengers" },
          ].map((capacity) => (
            <div key={capacity.id} className="flex items-center">
              <Checkbox
                id={`capacity-${capacity.id}`}
                checked={passengerCapacity === capacity.id}
                onCheckedChange={() =>
                  handlePassengerCapacityChange(capacity.id)
                }
                className="rounded text-primary focus:ring-primary h-4 w-4"
              />
              <Label
                htmlFor={`capacity-${capacity.id}`}
                className="ml-2 text-sm text-neutral-600"
              >
                {capacity.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={applyFilters}
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium rounded-md px-4 py-2 text-center shadow-sm transition duration-300 ease-in-out"
      >
        Apply Filters
      </Button>
    </div>
  );
}
