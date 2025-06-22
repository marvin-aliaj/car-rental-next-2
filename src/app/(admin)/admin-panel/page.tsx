"use client";

import { useEffect, useState } from "react";
import { format, subDays } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { FaCalendar } from "react-icons/fa";
import { getBookings } from "@/lib/actions/rental.actions";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { locations } from "@/lib/utils";
import "react-day-picker/dist/style.css";

type Booking = {
  id: string;
  customerName: string;
  customerPhone: string;
  location: string;
  car: Car;
  startDate: Date;
  endDate: Date;
  status: "confirmed" | "pending" | "cancelled";
  calculatedPrice: number;
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleSelect = (range: DateRange | undefined) => {
    if (range === undefined) {
      setDateRange({ from: undefined, to: undefined });
      return;
    }
    setDateRange({ from: range.from, to: range.to });
  };

  useEffect(() => {
    setLoading(true);
    getBookings({ startDate: dateRange.from, endDate: dateRange.to })
      .then((data) => {
        setBookings(data);
        setFilteredBookings(data);
      })
      .catch((e) => {
        toast.error(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dateRange]);

  useEffect(() => {
    let results = bookings;
    if (statusFilter !== "all") {
      results = results.filter((booking) => booking.status === statusFilter);
    }
    setFilteredBookings(results);
  }, [bookings, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Bookings Management</h1>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="md:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
        >
          <FaCalendar />
          <span>Filters</span>
        </button>
      </div>

      {/* Filters - Desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md"
            >
              <FaCalendar />
              <span>
                {dateRange.from ? format(dateRange.from, "MMM dd, yyyy") : ""} -{" "}
                {dateRange.to ? format(dateRange.to, "MMM dd, yyyy") : ""}
              </span>
            </button>
            {showDatePicker && (
              <div className="absolute z-10 mt-2 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  numberOfMonths={2}
                  className="rounded-md border"
                  classNames={{
                    months: "flex justify-center gap-20",
                    month: "w-[280px]",
                  }}
                  onSelect={handleSelect}
                />
              </div>
            )}
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Filters - Mobile */}
      {mobileFiltersOpen && (
        <div className="md:hidden bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Date Range
              </label>
              <DayPicker
                mode="range"
                selected={dateRange}
                className="rounded-md border"
                classNames={{
                  months: "flex justify-center gap-20",
                  month: "w-[280px]",
                }}
                onSelect={handleSelect}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md"
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Skeleton className="w-full h-10" />
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
        ) : filteredBookings.length === 0 ? (
          <div className="p-8 text-center">No bookings found</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-scroll">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Car Model
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pickup
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Return
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    {/*<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">*/}
                    {/*  Actions*/}
                    {/*</th>*/}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.customerPhone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.car.brand} {booking.car.model}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {locations.find((l) => l.id === booking.location).name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(booking.startDate, "MMM dd")} -{" "}
                        {format(booking.endDate, "MMM dd, yyyy")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(booking.startDate, "HH:mm")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(booking.endDate, "HH:mm")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            booking.status,
                          )}`}
                        >
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        € {booking.calculatedPrice / 100}
                      </td>
                      {/*<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">*/}
                      {/*  <button className="text-blue-600 hover:text-blue-900 mr-3">*/}
                      {/*    Edit*/}
                      {/*  </button>*/}
                      {/*  <button className="text-red-600 hover:text-red-900">*/}
                      {/*    Cancel*/}
                      {/*  </button>*/}
                      {/*</td>*/}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{booking.customerName}</h3>
                      <p className="text-sm text-gray-500">
                        {booking.car.brand} {booking.car.model}
                      </p>
                    </div>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        booking.status,
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="mt-2 text-sm">
                    <p className="text-gray-500">
                      {format(booking.startDate, "MMM dd")} -{" "}
                      {format(booking.endDate, "MMM dd, yyyy")}
                    </p>
                    <p className="font-medium mt-1">
                      € {booking.calculatedPrice / 100}
                    </p>
                  </div>

                  {/*<div className="mt-3 flex justify-end space-x-3">*/}
                  {/*  <button className="text-sm text-blue-600 hover:text-blue-900">*/}
                  {/*    Edit*/}
                  {/*  </button>*/}
                  {/*  <button className="text-sm text-red-600 hover:text-red-900">*/}
                  {/*    Cancel*/}
                  {/*  </button>*/}
                  {/*</div>*/}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
