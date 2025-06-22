"use client";

import { timeSlots } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PickupTimeSelectProps {
  value: string;
  onChange: (time: string) => void;
}

export function TimeSelect({ value, onChange }: PickupTimeSelectProps) {
  return (
    <div className="w-full">
      <Select
        value={value}
        onValueChange={(val) => {
          onChange(val);
        }}
      >
        <SelectTrigger className="w-full border-0 shadow-none focus:ring-0">
          <SelectValue placeholder="Select time" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] overflow-y-auto">
          {timeSlots.map((time, index) => (
            <SelectItem key={index} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
