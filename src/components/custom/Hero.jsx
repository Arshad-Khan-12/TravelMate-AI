import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-4 md:mx-20 lg:mx-56 gap-6 md:gap-9 mt-10 md:mt-20">
      <h1 className="text-[#ffb339] leading-tight text-2xl md:text-4xl lg:text-[50px] font-extrabold text-center">
        Your AI-Powered Travel Companion:
      </h1>
      <h1 className="text-2xl md:text-4xl lg:text-[50px] font-extrabold text-center leading-tight">
        Plan Smarter, Explore More, and Enjoy
      </h1>
      <h1 className="text-2xl md:text-4xl lg:text-[50px] font-extrabold text-center leading-tight">
        Every Moment!
      </h1>
      <p className="text-sm md:text-base lg:text-lg text-center text-gray-600">
        Skip the stress of planning—let AI create your perfect itinerary, so you
        can focus on making memories
      </p>
      <Link to={"/create-trip"}>
        <Button className="mt-4 md:mt-6 lg:mt-8">Plan Your Trip</Button>
      </Link>
    </div>
  );
}

export default Hero;
