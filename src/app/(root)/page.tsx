"use client";
import HeroSection from "@/components/home/HeroSection";
import ExtraInfo from "@/components/home/ExtraInfo";
import FeaturedCars from "@/components/home/FeaturedCars";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FAQ from "@/components/home/FAQ";
import OurLocations from "@/components/home/OurLocations";
import { useStore } from "@/store/useStore";
import { getCars } from "@/lib/actions/rental.actions";
import { toast } from "sonner";
import { useEffect } from "react";

export default function Home() {
  const setGlobalCars = useStore((state) => state.setCars);

  const getCarList = (params = {}) => {
    getCars(params)
      .then((data) => {
        setGlobalCars(data);
      })
      .catch(() => {
        toast.error("Error occurred!");
      });
  };

  useEffect(() => {
    getCarList({});
  }, []);

  return (
    <>
      <HeroSection />
      <ExtraInfo />
      <FeaturedCars />
      <WhyChooseUs />
      {/*<Testimonials />*/}
      <OurLocations />
      <FAQ />
    </>
  );
}
