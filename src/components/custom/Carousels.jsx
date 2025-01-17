import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Carousels = () => {
  return (
    <div className="h-64 w-[40%] flex items-center justify-center bg-red-200">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="h-64 w-[40%] flex items-center justify-center">
              <img src="/TravelMate AI.png" alt="carousel" />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Carousels;
