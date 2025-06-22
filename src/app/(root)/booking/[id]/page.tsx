"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import BookingCalendar from "@/components/booking/BookingCalendar";
import CarDetails from "@/components/booking/CarDetails";
import BookingConfirmation from "@/components/booking/BookingConfirmation";
import { differenceInDays, format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/useStore";
import { Skeleton } from "@/components/ui/skeleton";
import { createBooking } from "@/lib/actions/rental.actions";
import {
  decryptId,
  locations,
  validateEmail,
  validateGeneralPhone,
} from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function Booking() {
  const cars = useStore((state) => state.cars);
  const [car, setCar] = useState<Car | null>(null);
  const [searchParams, setSearchParams] = useState(null);
  const params = useParams();
  const carId = decryptId(params.id);
  const router = useRouter();

  const initialLocationId = searchParams?.get("locationId");
  const initialStartDate = searchParams?.get("start");
  const initialEndDate = searchParams?.get("end");

  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    initialLocationId ? initialLocationId : null,
  );

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const from = initialStartDate ? new Date(initialStartDate) : now;
    const to = initialEndDate ? new Date(initialEndDate) : tomorrow;

    return { from, to };
  });

  // Add customer information state for guest bookings
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    confirm: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams(params);
  }, []);

  useEffect(() => {
    if (carId && cars?.length > 0) {
      const car = cars.find((car: Car) => car.id == carId);
      setCar(car);
    } else {
      console.log("Car not found");
    }
  }, [carId, cars]);

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range);
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocationId(value);
  };

  const handleSubmitBooking = () => {
    if (!selectedLocationId || !carId) {
      toast("Incomplete details", {
        description: "Please select a pickup location to continue.",
      });
      return;
    }

    if (!customerInfo.fullName || !customerInfo.email || !customerInfo.phone) {
      toast("Customer information required", {
        description:
          "Please provide your contact information to complete the booking.",
      });
      return;
    }

    if (!validateEmail(customerInfo.email)) {
      toast("Correct email required", {
        description:
          "Please provide your correct email to complete the booking.",
      });
      return;
    }

    if (!validateGeneralPhone(customerInfo.phone)) {
      toast("Correct phone number required", {
        description:
          "Please provide your correct phone number to complete the booking.",
      });
      return;
    }

    if (!customerInfo.confirm) {
      toast("Driving license required", {
        description: "You cannot book a rental car without a driving license.",
      });
      return;
    }

    const days = differenceInDays(dateRange.to, dateRange.from) || 1;
    const pricePerDay = car?.pricePerDay || 0;
    const price = days * pricePerDay;
    const taxes = price * 0.0825;
    const totalPrice = price + taxes;

    // Since we're not using authentication, we'll use a default user ID (1)
    const bookingData = {
      customerName: customerInfo.fullName,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      location: selectedLocationId,
      carId: carId,
      startDate: format(dateRange.from, "yyyy-MM-dd HH:mm:ss"),
      endDate: format(dateRange.to, "yyyy-MM-dd HH:mm:ss"),
      calculatedPrice: totalPrice * 100, // Convert to string as required by the schema
      status: "PENDING",
    };

    createBooking(bookingData)
      .then(() => {
        toast.success("Booking created successfully");
        router.push(`/cars`);
      })
      .catch(() => {
        toast.error("Error occurred!");
      });
  };

  if (cars.length === 0) {
    return Array(3)
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
      ));
  }
  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">
          Car Not Found
        </h2>
        <p className="text-neutral-600 mb-6">
          The car you are trying to book is not available.
        </p>
        <Button onClick={() => router.push("/cars")}>
          View Available Cars
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">
              Complete Your Booking
            </h1>
            <p className="text-neutral-600">
              Follow the steps below to book your car.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-medium text-neutral-800 mb-4">
                    Select Pickup Location
                  </h2>
                  {locations && locations.length > 0 ? (
                    <Select
                      value={selectedLocationId?.toString()}
                      onValueChange={handleLocationChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem
                            key={location.id}
                            value={location.id.toString()}
                          >
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-neutral-600">Loading locations...</p>
                  )}
                </CardContent>
              </Card>
              {/* Select Dates */}
              <BookingCalendar
                onRangeChange={handleDateRangeChange}
                startDate={initialStartDate}
                endDate={initialEndDate}
              />
              {/* Car Details */}
              <CarDetails car={car} />
              {/* Customer Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-medium text-neutral-800 mb-4">
                    Your Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="John Doe"
                        value={customerInfo.fullName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setCustomerInfo({
                            ...customerInfo,
                            fullName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type={"email"}
                        placeholder="john@example.com"
                        value={customerInfo.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setCustomerInfo({
                            ...customerInfo,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="+1 (555) 123-4567"
                        value={customerInfo.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setCustomerInfo({
                            ...customerInfo,
                            phone: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="flex gap-2 align-items-center">
                      <Checkbox
                        checked={customerInfo.confirm}
                        onCheckedChange={(checked: boolean) =>
                          setCustomerInfo({
                            ...customerInfo,
                            confirm: checked,
                          })
                        }
                        required
                      />

                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        I confirm that I possess a valid driving license
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="lg:col-span-4">
              {selectedLocationId ? (
                <BookingConfirmation
                  car={car}
                  locationId={selectedLocationId}
                  dateRange={dateRange}
                  onSubmit={handleSubmitBooking}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
