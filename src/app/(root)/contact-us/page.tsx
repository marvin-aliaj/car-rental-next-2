"use client";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import * as React from "react";

const ContactPage = () => {
  return (
    <div className="bg-gray-50 -mt-[4rem]">
      <div
        className="h-100 md:h-[600px] relative bg-cover bg-center"
        style={{
          backgroundImage: "url('/tirana-map-dark.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary/100"></div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
            <div className="max-w-7xl mx-auto px-4 mt-[4rem] sm:px-6 lg:px-8 w-full">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Contact <span className="bg-primary px-2">Us</span>
              </h1>
              <p className="text-white/90 mt-2 max-w-lg">
                Get in touch with our team for any inquiries or support
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white rounded-lg text-center -mt-16 md:-mt-35 relative z-10 p-6">
            <div className="flex flex-wrap gap-5 justify-center items-center pb-20">
              <span>[ How to find us ]</span>
              <div className="relative w-fit h-fit text-white flex flex-col items-start justify-center px-10 py-5">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Tirana Airport (TIA)</h3>
                    <p className="text-sm">Rinas, Tirana 1504, Albania</p>
                  </div>
                </div>

                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
              </div>
              <div className="relative w-fit h-fit text-white flex flex-col items-start justify-center px-10 py-5">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Durrës City Center</h3>
                    <p className="text-sm">
                      Sheshi Liria, Durrës 2001, Albania
                    </p>
                  </div>
                </div>

                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
              </div>
              <div className="relative w-fit h-fit text-white flex flex-col items-start justify-center px-10 py-5">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span>+355 68 409 3623</span>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span>reservation@goldcarsalbania.com</span>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-3" />
                  <span>24/7 Customer Support</span>
                </div>

                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
              </div>
            </div>
            <h1 className="text-white text-4xl md:text-7xl font-bold italic">
              Step In. <span className="bg-primary px-2"> Ride Out.</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
