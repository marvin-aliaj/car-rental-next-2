import { FaDollarSign, FaHeadset, FaMapMarkerAlt } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Link from "next/link";

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-neutral-100 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-white rounded-lg text-center -mt-16 md:-mt-22 relative z-10 p-6">
          <h1 className="text-white tracking-wider text-4xl md:text-7xl font-bold pb-20">
            Why <span className="bg-primary px-2">Choose Us</span>
          </h1>
          <div className="flex flex-wrap gap-5 justify-center items-center pb-20 w-full">
            <span className="w-xs">
              [ Enjoy Peace Of Mind as all vehicles come fully insured ]
            </span>
            <div className="relative flex flex-col gap-2 w-64 h-40 text-white items-center justify-center">
              <span className="text-primary text-7xl font-bold">
                <FaDollarSign />
              </span>
              <span className=" bottom-4 text-white text-sm px-4">
                Competitive pricing with no hidden fees. We guarantee the best
                rates.
              </span>

              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
            </div>
            <div className="relative flex flex-col gap-2 w-64 h-40 text-white items-center justify-center">
              <span className="text-primary text-7xl font-bold">
                <FaHeadset />
              </span>
              <span className=" bottom-4 text-white text-sm px-4">
                Our customer service is available round the clock to assist you.
              </span>

              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
            </div>
            <div className="relative flex flex-col gap-2 w-64 h-40 text-white items-center justify-center">
              <span className="text-primary text-7xl font-bold">
                <FaMapMarkerAlt />
              </span>
              <span className=" bottom-4 text-white text-sm px-4">
                Located at the airport, our service ensures fast pick-up and
                drop-off.
              </span>

              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
            </div>
          </div>
          <Link href={`/cars`}>
            <div className="relative flex flex-col gap-2 w-fit h-fit p-3 text-white transition duration-300 transform hover:cursor-pointer hover:scale-105">
              <div className="flex items-center justify-center">
                <span className="bottom-4 text-white text-sm px-4">
                  Book car now
                </span>
                <FaArrowUpRightFromSquare />
              </div>

              <div className="absolute top-0 left-0 w-full h-3 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-0 right-0 w-4 h-3 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-4 h-3 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-full h-3 border-b-2 border-r-2 border-white"></div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
