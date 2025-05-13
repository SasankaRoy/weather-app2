import axios from "axios";
import { toast } from "react-toastify";

export const getWeatherData = async (location, geolocation) => {
  console.log(location, geolocation,'line 4');
 
  try {
    if (location) {
      const getData = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER__APIKEY}`
      );
        console.log(getData?.data);
      const filteredData = [];

      getData?.data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (item.dt_txt.includes("12:00:00")) {
          filteredData.push(item);
        }
      });

      return {
        forcast: filteredData,
        city: { ...getData?.data.city },
      };
    } else {
      const getData = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${geolocation.lat}&lon=${geolocation.lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER__APIKEY}`
      );
      const filteredData = [];
      //   console.log(getData?.data);

      getData?.data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (item.dt_txt.includes("12:00:00")) {
          filteredData.push(item);
        }
      });

      return {
        forcast: filteredData,
        city: { ...getData?.data.city },
      };
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.message)
    return{
        forcast:[],
        city:{},
        errorMessage:error.response.data.message
    }
  }
};
