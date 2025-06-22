"use client";
import { differenceInDays, format } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { locations } from "@/lib/utils";

interface BookingConfirmationProps {
  car: Car;
  locationId: string;
  dateRange: { from: Date; to: Date };
  onSubmit: () => void;
}

export default function BookingConfirmation({
  car,
  locationId,
  dateRange,
  onSubmit,
}: BookingConfirmationProps) {
  const location = locations.find((l) => l.id === locationId);

  // Calculate number of days
  const days =
    dateRange.from && dateRange.to
      ? Math.max(1, differenceInDays(dateRange.to, dateRange.from))
      : 0;

  // Calculate total price
  const basePrice = car ? Number(car.pricePerDay) * days : 0;
  const taxes = basePrice * 0.0825; // Example: 8.25% tax
  const totalPrice = basePrice + taxes;

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-neutral-800 mb-4">
          Booking Summary
        </h3>
        <>
          <div className="mb-6">
            <h4 className="font-medium text-neutral-900">
              {car?.brand} {car?.model}
            </h4>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-neutral-500">Pick-up</p>
                <p className="font-medium text-neutral-800">
                  {dateRange.from
                    ? format(dateRange.from, "EEE, MMM d, yyyy, HH:mm")
                    : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-500">Location</p>
                <p className="font-medium text-neutral-800">
                  {location?.name || ""}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="text-sm text-neutral-500">Return</p>
                <p className="font-medium text-neutral-800">
                  {dateRange.to
                    ? format(dateRange.to, "EEE, MMM d, yyyy, HH:mm")
                    : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-500">Duration</p>
                <p className="font-medium text-neutral-800">
                  {days} {days === 1 ? "day" : "days"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-4">
            <div className="flex justify-between mb-2">
              <p className="text-neutral-600">
                Base Price ({days} {days === 1 ? "day" : "days"} × $
                {car?.pricePerDay}/day)
              </p>
              <p className="font-medium text-neutral-800">
                €{basePrice.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-neutral-600">Taxes & Fees</p>
              <p className="font-medium text-neutral-800">
                €{taxes.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <p className="text-neutral-900">Total</p>
              <p className="text-primary">€{totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </>
      </CardContent>
      <CardFooter className="grid grid-rows-2 bg-neutral-50 p-6 border-t border-neutral-200">
        <Button
          onClick={onSubmit}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium rounded-md px-6 py-3 text-center shadow-md transition duration-300 ease-in-out"
        >
          Complete Booking
        </Button>
        <p className="text-xs text-neutral-500 text-center mt-2">
          By proceeding, you agree to our Terms and Conditions.
        </p>
      </CardFooter>
    </Card>
  );
}
