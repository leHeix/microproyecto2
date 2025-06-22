import React from "react";
import { HeroSection } from "./sections/HeroSection";
import { OurSpacesSection } from "./sections/OurSpacesSection";
import { ReserveSpaceSection } from "./sections/ReserveSpaceSection";
import { ReviewsSection } from "./sections/ReviewsSection/ReviewsSection";
import { NavigationFooter } from "../../NavigationFooter";

export const LandingPage = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col items-center w-full">
      <div className="bg-white w-full max-w-[1280px]">
        <HeroSection />
        <OurSpacesSection />
        <ReserveSpaceSection />
        <ReviewsSection />
      </div>
    </div>
  );
};
