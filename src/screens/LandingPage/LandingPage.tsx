import React from "react";
import { HeroSection } from "./sections/HeroSection";
import { NavigationFooterSection } from "./sections/NavigationFooterSection";
import { OurSpacesSection } from "./sections/OurSpacesSection";
import { ReserveSpaceSection } from "./sections/ReserveSpaceSection";
import { ReviewsSection } from "./sections/ReviewsSection/ReviewsSection";

export const LandingPage = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col items-center w-full">
      <div className="bg-white w-full max-w-[1280px]">
        <HeroSection />
        <OurSpacesSection />
        <ReserveSpaceSection />
        <ReviewsSection />
        <NavigationFooterSection />
      </div>
    </div>
  );
};
