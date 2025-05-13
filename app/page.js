"use client";
import { Droplets, Locate, Search, Wind } from "lucide-react";
import Image from "next/image";
import moment from "moment";

import { useEffect, useMemo, useState } from "react";

import { getWeatherData } from "@/utils/fetchApi";
import { ForcastCard } from "@/component/ForcastCard";
import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [weatherForcast, setWeatherForcast] = useState();
  const [getLocationState, setGetLocationState] = useState(false);

  // get weather forcast...
  // const getForcast = async () => {
  //   try {
  //     const weatherData = await getWeatherData(
  //       userInput ? userInput : "Asansol"
  //     );
  //     setWeatherForcast(weatherData);
  //     // console.log(weatherData);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const getCurrentLocation = () => {
    setGetLocationState(false);
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // You can now call your weather API with lat/lon

          const weatherData = await getWeatherData("", {
            lat: latitude,
            lon: longitude,
          });

          setWeatherForcast(weatherData);
          if (weatherData) {
            setGetLocationState(true);
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setGetLocationState(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };
  useMemo(() => {
    getCurrentLocation();
  }, []);

  const handleSearch = async () => {
    if (!userInput) {
      toast.error("Please enter a location");
      getCurrentLocation();
      return;
    }
    const weatherData = await getWeatherData(userInput);

    if (weatherData.errorMessage) {
      getCurrentLocation();
      return;
    }
    setWeatherForcast(weatherData);
    setGetLocationState(true);
  };

  return (
    <>
      <Head>
        <title>Realtime Weather App</title>
      </Head>
      <div className="bg-[var(--background) flex flex-col gap-6 min-h-[100dvh] text-[var(--textColor)] p-6">
        <>
          <div className=" flex flex-col-reverse 2xl:flex-row xl:flex-row lg:flex-row md:portrait:flex-row  justify-center items-center gap-6">
            <div className="2xl:w-[25%] xl:w-[25%] lg:w-[25%] md:portrait:w-[40%] w-full bg-[#eeeeee]/10 rounded-md flex justify-center items-center px-2">
              <input
                className="w-full bg-transparent mainFont border-none outline-none rounded-md 2xl:text-[1.2dvw] xl:text-[1.2dvw] lg:text-[1.2dvw] md:portrait:text-[2.2dvw] text-[3.5dvw] px-4 py-1.5"
                placeholder="Search location..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button
                onClick={handleSearch}
                className="shrink-0 px-1 cursor-pointer"
              >
                <Search />
              </button>
            </div>
            <div className="flex justify-center items-center gap-2">
              <span>
                <Locate />
              </span>
              <p className="capitalize mainFont font-[500] 2xl:text-[1.3dvw] xl:text-[1.3dvw] lg:text-[1.3dvw] md:portrait:text-[3dvw] text-[4dvw] ">
                {weatherForcast?.city.name}
              </p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <p className="font-[500] 2xl:text-[1.2dvw] xl:text-[1.2dvw] lg:text-[1.2dvw] md:portrait:text-[2.2dvw] text-[3.5dvw] mainFont">
                {moment(weatherForcast?.forcast[0].dt_txt).format("lll")}
              </p>
            </div>
          </div>
          {getLocationState && (
            <div className="w-full min-h-[60dvh] flex flex-col 2xl:flex-row xl:flex-row lg:flex-row md:portrait:flex-col justify-between items-center gap-8  my-auto">
              <div className="flex-1 w-full shrink-0  flex justify-start items-center h-full p-4">
                <div className="w-full flex flex-col gap-8">
                  <div>
                    <h2 className="relative 2xl:text-[8dvw] xl:text-[8dvw] lg:text-[8dvw] md:portrait:text-[12dvw] text-[16dvw] mainFont 2xl:leading-[9dvw] xl:leading-[9dvw] lg:leading-[9dvw] md:portrait:leading-[13dvw] leading-[17dvw] ">
                      {weatherForcast?.forcast[0].main.temp}
                      <span className="absolute -top-[2dvw] text-[1.4dvw] ">
                        &#8451;
                      </span>
                    </h2>
                    <p className="2xl:text-[2.5dvw] xl:text-[2.5dvw] lg:text-[2.5dvw] md:portrait:text-[5dvw] text-[6dvw] mainFont capitalize">
                      {weatherForcast?.forcast[0].weather[0].description}
                    </p>
                  </div>
                  <div className="flex justify-around items-center w-full">
                    <div className="flex flex-col gap-1 justify-center items-center">
                      <span className="flex justify-start items-center gap-2 paraFont">
                        <Wind /> Wind
                      </span>
                      <h4 className=" 2xl:text-[2dvw] xl:text-[2dvw] lg:text-[2dvw] md:portrait:text-[4dvw] text-[5dvw] mainFont">
                        {weatherForcast?.forcast[0].wind.speed}km/h
                      </h4>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1">
                      <span className="flex justify-start items-center gap-2 paraFont">
                        <Droplets /> Humidity
                      </span>
                      <h4 className="2xl:text-[2dvw] xl:text-[2dvw] lg:text-[2dvw] md:portrait:text-[4dvw] text-[5dvw] mainFont">
                        {weatherForcast?.forcast[0].main.humidity}%
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="2xl:w-[45%] xl:w-[45%] lg:w-[45%] md:portrait:w-[45%] w-full shrink-0 relative flex justify-center items-center h-full p-4">
                <div className="relative 2xl:w-[25dvw] xl:w-[25dvw] lg:w-[25dvw] md:portrait:w-[25dvw] w-[45dvw] 2xl:h-[25dvw] xl:h-[25dvw] lg:h-[25dvw] md:portrait:h-[25dvw] h-[40dvw]">
                  <Image
                    alt="weather.com"
                    className="w-full h-full object-contain"
                    src={`https://openweathermap.org/img/wn/${weatherForcast?.forcast[0].weather[0].icon}@2x.png`}
                    fill
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex-1 w-full shrink-0  h-full p-4">
                <div className="border border-white/50 backdrop-blur-xl flex flex-col gap-8 bg-transparent rounded-xl p-4 ">
                  {weatherForcast?.forcast.map((cur, id) => (
                    <ForcastCard
                      key={id}
                      icon={cur.weather[0].icon}
                      day={cur.dt_txt}
                      description={cur.weather[0].description}
                      temp={cur.main.temp}
                    />
                  ))}

                  {/* <div key={id} className="flex justify-center items-center gap-4">
              <div className="relative w-[5dvw] h-[5dvw]">
                <Image
                  alt="weather.com"
                  className="w-full h-full object-contain"
                  src={`https://openweathermap.org/img/wn/${cur.weather[0].icon}@2x.png`}
                  fill
                  loading="lazy"
                />
              </div>
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <h4 className="text-[1.5dvw] leading-[2dvw] font-[500] mainFont">
                    {moment(cur.dt_txt).format("dddd")}
                  </h4>
                  <p className="text-[.9dvw] text-gray-400 font-[400]">
                    {cur.weather[0].description}
                  </p>
                </div>
                <h5 className="mainFont text-[1.5dvw] font-[500]">
                  {cur.main.temp}&#176;
                </h5>
              </div>
            </div> */}
                </div>
              </div>
            </div>
          )}
        </>
      </div>

      <ToastContainer />
    </>
  );
}
