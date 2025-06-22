"use client";
import CountUp from "react-countup";

export default function ExtraInfo() {
  return (
    <section className="bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-white rounded-lg text-center -mt-16 md:-mt-24 relative z-10 p-6">
          <h1 className="text-white tracking-wider text-4xl md:text-7xl font-bold pb-20">
            First In Class Traveling
          </h1>
          <div className="flex flex-wrap gap-5 justify-center items-center pb-20">
            <span>[ Top Tier Albania Rentals ]</span>
            <div className="relative w-64 h-40 text-white flex items-center justify-center">
              <span className="text-primary text-7xl font-bold">
                <CountUp duration={2.25} end={4} />
              </span>
              <span className="absolute bottom-4 text-white text-sm left-1/2 -translate-x-1/2">
                years on the market
              </span>

              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
            </div>
            <div className="relative w-64 h-40 text-white flex items-center justify-center">
              <span className="text-primary text-7xl font-bold">
                <CountUp duration={2.25} end={3} suffix={"k+"} />
              </span>
              <span className="absolute bottom-4 text-white text-sm left-1/2 -translate-x-1/2">
                happy customers
              </span>

              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
            </div>
            <div className="relative w-64 h-40 text-white flex items-center justify-center">
              <span className="text-primary text-7xl font-bold">
                <CountUp duration={2.25} end={20} suffix={"+"} />
              </span>
              <span className="absolute bottom-4 text-white text-sm left-1/2 -translate-x-1/2">
                different vehicles
              </span>

              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
            </div>
          </div>
          <h1 className="text-white text-4xl md:text-7xl font-bold italic">
            Rent. Ride. <span className="bg-primary px-2">Enjoy.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
