"use client";
import Map from "../map";
import {
  faPlaneDeparture,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function OurLocations() {
  return (
    <section className="py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h2 className="text-3xl text-dark font-bold mb-4">
              Where can you find us
            </h2>
            <p className="text-dark text-lg mb-8">
              Our locations are close to the largest airport and port in
              Albania.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/locations">
                <div className="grid bg-black hover:bg-black/80 hover:cursor-pointer text-white py-3 px-6 rounded-lg transition duration-300">
                  <div className="text-xs">Find us in</div>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon
                      className="align-bottom"
                      icon={faPlaneDeparture}
                    />
                    <div className="text-lg font-semibold">Tirana Airport</div>
                  </div>
                </div>
              </Link>
              <Link href="/locations">
                <div className="grid bg-black hover:bg-black/80 hover:cursor-pointer text-white py-3 px-6 rounded-lg transition duration-300">
                  <div className="text-xs">Find us in</div>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faUmbrellaBeach} />
                    <div className="text-lg font-semibold">
                      <p>Durr&euml;s</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center">
            <div className="grid w-full">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
