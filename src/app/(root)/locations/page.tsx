"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import * as React from "react";

const LocationsPage = () => {
  const locations = [
    {
      id: "durres",
      name: "Durrës",
      address: "Wemis Agency, Rruga Tema, Durrës",
      hours: "Mon-Sun: 6:00 AM - 11:00 PM",
      phone: "+355 69 394 6666",
      perks: ["Downtown location", "Beach proximity", "Long-term discounts"],
    },
  ];
  return (
    <div className="bg-gray-50 -mt-[4rem]">
      <div
        className="h-100 md:h-[600px] relative bg-cover bg-center"
        style={{
          backgroundImage: "url('/tirana-map.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary/100"></div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
            <div className="max-w-7xl mx-auto px-4 mt-[4rem] sm:px-6 lg:px-8 w-full">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Our <span className="bg-primary px-2">Locations</span>
              </h1>
              <p className="text-white/90 mt-2 max-w-lg">
                Convenient pickup points across Albania with premium service
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white rounded-lg text-center -mt-16 md:-mt-35 relative z-10 p-6">
            <div className="flex flex-wrap gap-10 justify-center items-center pb-20">
              <span>[ Our Locations in Albania ]</span>
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="relative w-84 h-40 text-white flex flex-col items-start justify-center px-10"
                >
                  <h2 className="text-lg font-bold text-white">
                    {location.name}
                  </h2>
                  <div className="flex items-start text-sm">
                    <MapPin className="text-primary h-4 w-4 mt-0.5 mr-3 flex-shrink-0" />
                    <p>{location.address}</p>
                  </div>
                  <div className="flex items-start text-sm">
                    <Clock className="text-primary h-4 w-4 mt-0.5 mr-3 flex-shrink-0" />
                    <p>{location.hours}</p>
                  </div>
                  <div className="flex items-start text-sm">
                    <Phone className="text-primary h-4 w-4 mt-0.5 mr-3 flex-shrink-0" />
                    <p>{location.phone}</p>
                  </div>

                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
                </div>
              ))}
            </div>
            <h1 className="text-white text-4xl md:text-7xl font-bold italic">
              Arrive in <span className="bg-primary px-2">Style.</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
