import React from "react";
import Image from "next/image";
import moment from "moment";

export const ForcastCard = ({ day, icon, description, temp }) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <div className="relative 2xl:w-[5dvw] xl:w-[5dvw] lg:w-[5dvw] md:portrait:w-[10dvw] w-[15dvw] 2xl:h-[5dvw] xl:h-[5dvw] lg:h-[5dvw] md:portrait:h-[10dvw] h-[15dvw]">
        <Image
          alt="weather.com"
          className="w-full h-full object-contain"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          fill
          loading="lazy"
        />
      </div>
      <div className="flex-1 flex justify-between items-center">
        <div>
          <h4 className="2xl:text-[1.5dvw] xl:text-[1.5dvw] lg:text-[1.5dvw] md:portrait:text-[4dvw] text-[4.5dvw] 2xl:leading-[2dvw] xl:leading-[2dvw] lg:leading-[2dvw] md:portrait:leading-[5dvw] leading-[6dvw] font-[500] mainFont">
            {moment(day).format("dddd")}
          </h4>
          <p className="2xl:text-[.9dvw] xl:text-[.9dvw] lg:text-[.9dvw] md:portrait:text-[2.2dvw] text-[3dvw] text-gray-400 font-[400]">{description}</p>
        </div>
        <h5 className="mainFont 2xl:text-[1.5dvw] xl:text-[1.5dvw] lg:text-[1.5dvw] md:portrait:text-[4dvw] text-[4.5dvw] font-[500]">{temp}&#176;</h5>
      </div>
    </div>
  );
};
