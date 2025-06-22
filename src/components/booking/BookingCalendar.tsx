"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { TimeSelect } from "@/components/booking/TimeSelect";

interface BookingCalendarProps {
  onRangeChange: (range: { from: Date; to: Date }) => void;
  startDate: Date;
  endDate: Date;
}

export default function BookingCalendar({
  onRangeChange,
  startDate,
  endDate,
}: BookingCalendarProps) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [date, setDate] = useState<DateRange>({
    from: startDate ? startDate : today,
    to: endDate ? endDate : tomorrow,
  });
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnTime, setReturnTime] = useState("13:00");

  const handleTimeChange = (prop, time) => {
    switch (prop) {
      case "pickup":
        setPickupTime(time);
        handleSelect(date, time, returnTime);
        break;
      case "return":
        setReturnTime(time);
        handleSelect(date, pickupTime, time);
        break;
    }
  };

  const handleSelect = (range: DateRange, pickupTime_, returnTime_) => {
    if (range === undefined) {
      setDate({ from: undefined, to: undefined });
      return;
    }
    const [pickupHour, pickupMinute] = pickupTime_.split(":").map(Number);
    const [returnHour, returnMinute] = returnTime_.split(":").map(Number);
    if (range?.from && range?.to) {
      const pickupDate = range.from;
      pickupDate.setHours(pickupHour, pickupMinute);
      const returnDate = range.to;
      returnDate.setHours(returnHour, returnMinute);

      setDate({ from: range.from, to: range.to });
      onRangeChange({ from: pickupDate, to: returnDate });
    } else {
      setDate(range);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-neutral-800">
            Select Rental Dates
          </h3>
          <div className="text-neutral-600 text-sm">
            {date.from && date.to && (
              <span>
                {format(date.from, "MMM dd, yyyy")} -{" "}
                {format(date.to, "MMM dd, yyyy")}
              </span>
            )}
          </div>
        </div>
        <div className="[&_.rdp-months]:gap-12">
          {" "}
          <div className="block sm:hidden">
            <DayPicker
              mode="range"
              selected={date}
              numberOfMonths={1}
              disabled={{ before: today }}
              onSelect={(e) => handleSelect(e, pickupTime, returnTime)}
              className="rounded-md border"
              classNames={{
                months: "flex justify-center",
              }}
            />
          </div>
          {/* For screens sm and up: 2 months */}
          <div className="hidden sm:block">
            <DayPicker
              mode="range"
              selected={date}
              numberOfMonths={2}
              disabled={{ before: today }}
              onSelect={(e) => handleSelect(e, pickupTime, returnTime)}
              className="rounded-md border"
              classNames={{
                months: "flex justify-center gap-20",
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mt-4"></div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Time
                </label>
                <div>
                  <TimeSelect
                    value={pickupTime}
                    onChange={(time) => {
                      handleTimeChange("pickup", time);
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Return Time
                </label>
                <div>
                  <TimeSelect
                    value={returnTime}
                    onChange={(time) => {
                      handleTimeChange("return", time);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
